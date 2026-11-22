# 实验四 · 充话费页面的设计与实现

这是一个 HarmonyOS Stage 模型应用。它提供默认联系人、九档充值金额和手机号校验。充值结果通过鸿蒙系统 Toast 显示，整个流程在本地模拟。

## 在 DevEco Studio 中运行

1. 使用 DevEco Studio 26.0.0 打开本仓库的项目根目录。编译使用 DevEco Studio 内置的 HarmonyOS SDK，应用的最低兼容版本为实验要求的 5.0.5（API 17）。
2. 同步项目，选择 `entry` 模块。连接可用的 HarmonyOS 设备或使用模拟器。如目标需要签名，可在项目的 Signing Configs 中启用自动签名。
3. 点击 Run。点击「默认联系人」填入李小红和号码 `123 9993 9999`，选择「500元」，再点击底部「充值」。

## 验收步骤

| 操作 | 预期结果 |
| --- | --- |
| 点击「默认联系人」 | 页面显示李小红和 `123 9993 9999` |
| 输入不足 11 位、超过 11 位或含字母的号码后充值 | 提示「请输入正确的手机号」 |
| 输入有效号码但未选择金额 | 提示「请选择充值金额」 |
| 使用默认号码，选择「500元」后充值 | 提示「123 9993 9999：成功充值500元！」 |

## 双向调用

- 网页调用应用。ArkUI 使用 `javaScriptProxy()` 暴露 `jsbridgeHandle.getContact()`，网页点击「默认联系人」时读取姓名和号码。
- 应用调用网页。原生充值按钮通过 `WebviewController.runJavaScript('recharge()')` 获取网页校验结果，在应用侧显示 Toast。
- 实验资源包按原目录结构放在 `entry/src/main/resources/rawfile/`，包含 `index.html`、`css/main.css`、`img/ic_contacts.svg` 和 `js/index.js`。网页沿用资源包的布局和图标，手机号校验按去除显示空格后的 11 位数字判断。
