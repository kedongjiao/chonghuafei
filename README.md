# 实验四 · 充话费页面的设计与实现

这是一个 HarmonyOS Stage 模型应用。它提供默认联系人、九档充值金额和手机号校验。充值结果通过鸿蒙系统 Toast 显示，整个流程在本地模拟。

## 在 DevEco Studio 中运行

1. 使用 DevEco Studio 打开本仓库的项目根目录，并安装 HarmonyOS 5.0.5（API 17）SDK。
2. 同步项目，选择 `entry` 模块。连接可用的 HarmonyOS 设备或使用模拟器。如目标需要签名，可在项目的 Signing Configs 中启用自动签名。
3. 点击 Run。点击「默认联系人」填入李小红和号码 `12399939999`，选择「500元」，再点击底部「充值」。

## 验收步骤

| 操作 | 预期结果 |
| --- | --- |
| 点击「默认联系人」 | 页面显示李小红和 `12399939999` |
| 输入不足 11 位、超过 11 位或含字母的号码后充值 | 提示「请输入正确的手机号」 |
| 输入有效号码但未选择金额 | 提示「请选择充值金额」 |
| 使用默认号码，选择「500元」后充值 | 提示「12399939999：成功充值500元！」 |

## 双向调用

- 网页调用应用。ArkUI 使用 `javaScriptProxy()` 暴露 `jsbridgeHandle.getContact()`，网页点击「默认联系人」时读取姓名和号码。
- 应用调用网页。原生充值按钮通过 `WebviewController.runJavaScript('recharge()')` 获取网页校验结果，在应用侧显示 Toast。
- HTML、CSS 和 JavaScript 位于 `entry/src/main/resources/rawfile/`。这些文件根据实验 PDF 的示意图重新编写。
