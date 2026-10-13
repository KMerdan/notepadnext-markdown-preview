# Native API 0.3 编辑增强插件

本开发分支增加 Text Inspector 和 TODO Navigator。Markdown / HTML 的 ID、来源、版本与 0.1 profile 保留。新插件需要支持 native API 0.3 的 Notepad Next ++ 开发构建；SDK 类型、协议和工具来自固定提交的 tarball，npm lockfile 记录 URL/integrity。正式 SDK 0.3 Release 发布后再独立升级依赖，不复制 SDK 源码。

## 本地开发与安装

```sh
npm --prefix plugins/text-inspector ci --ignore-scripts
npm --prefix plugins/text-inspector run build
npm --prefix plugins/text-inspector test
npm --prefix plugins/text-inspector run debug
npm --prefix plugins/text-inspector run package -- /absolute/new/output/inspector

npm --prefix plugins/todo-navigator ci --ignore-scripts
npm --prefix plugins/todo-navigator run build
npm --prefix plugins/todo-navigator test
npm --prefix plugins/todo-navigator run package -- /absolute/new/output/todo
```

注册本仓 repo URL 时，开发验证选择 Git ref `codex/sdk-phase-b`。注册只产生 Discover 条目；选择 Local Package 安装上述输出、启用，再从 Plugins 打开。新的独立 GitHub Releases 发布后才能使用在线 Install；源代码分支或 catalog 条目本身不是安装包。

Text Inspector 显示原始命令指向的选区、EOL、编码和缩进，采用 readRange 有界读取，Reveal 命令滚动定位。模拟 debug 只验证文本组合；真实焦点/选区/版本由编辑器验收。

TODO Navigator 使用原生字面量搜索、受限高亮和完整 HTML 面板。修改未保存正文刷新结果；点击结果使用 versioned reveal，不改用户书签。query/scroll 保存为 owned panel state，热更新后恢复，高亮由新会话重建并在验证后发布。业务 unit test 使用明确 mock；真实 native search / indicators / CSP / Dock 生命周期需要编辑器验证。

改源码后提高该插件的 package/manifest version，重新 build/package，更新 catalog，再在 Installed 中 Update。Reload 重启已安装的同版本副本。检查位置和 query/scroll 保留、旧高亮释放、stale results 被拒绝、停用/关闭/卸载不留标记、主窗口保持。

## 依赖与 CI

Marketplace CI 独立构建/测试/打包四个插件并核对 catalog。宿主只负责通用原生 API 与协议验收，插件业务测试不进入主仓必需 CI。SDK 负责类型、模板和开发工具。主应用、SDK、catalog 与插件版本独立升级。

[SDK Phase B 指南](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/69393865b9fafb2d724014174ffbbcf162e95b37/docs/PhaseB.zh-CN.md)，[发布操作](Releases.md)。任何已发布 tag/asset 保持不可变。
