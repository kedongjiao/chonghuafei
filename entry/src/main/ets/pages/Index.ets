import { webview } from '@kit.ArkWeb';

class Contact {
  private readonly tel: string;
  private readonly name: string;

  constructor(tel: string, name: string) {
    this.tel = tel;
    this.name = name;
  }

  getContact(): string {
    return this.tel + '_' + this.name;
  }
}

@Entry
@Component
struct Index {
  private controller: webview.WebviewController = new webview.WebviewController();
  private contact: Contact = new Contact('12399939999', '李小红');
  @State private pageReady: boolean = false;
  @State private submitting: boolean = false;

  private async recharge(): Promise<void> {
    this.submitting = true;
    let message: string = '暂时无法充值，请重试';

    try {
      const result: string = await this.controller.runJavaScript('recharge()');
      if (result) {
        message = JSON.parse(result) as string;
      }
    } catch (error) {
      // Keep the fallback message when ArkWeb does not return a valid result.
    } finally {
      this.submitting = false;
    }

    this.getUIContext().getPromptAction().showToast({ message });
  }

  build() {
    Column() {
      Web({
        src: $rawfile('index.html'),
        controller: this.controller
      })
        .javaScriptAccess(true)
        .javaScriptProxy({
          object: this.contact,
          name: 'jsbridgeHandle',
          methodList: ['getContact'],
          controller: this.controller
        })
        .onPageBegin(() => {
          this.pageReady = false;
        })
        .onPageEnd(() => {
          this.pageReady = true;
        })
        .width('100%')
        .layoutWeight(1)

      Button('充值')
        .width('100%')
        .constraintSize({ maxWidth: 520 })
        .height(48)
        .margin({ top: 16, bottom: 20 })
        .fontSize(16)
        .fontColor(Color.White)
        .backgroundColor('#0558F2')
        .enabled(this.pageReady && !this.submitting)
        .onClick(() => {
          this.recharge();
        })
    }
    .width('100%')
    .height('100%')
    .padding({ left: 20, right: 20 })
    .backgroundColor(Color.White)
  }
}
