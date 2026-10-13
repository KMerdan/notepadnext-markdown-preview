# Native enhancements

Text Inspector 和 TODO Navigator 使用已发布的 SDK 0.3.0，以及 Notepad Next ++ 的 native API 0.3。通过默认 Marketplace repo URL 注册，在 Discover 中安装；更新在 Installed 中完成。无需填写开发 Git ref。

```sh
npm run ci
node tools/marketplace.cjs release kmerdan.text-inspector/v0.1.0 /tmp/text-inspector-release
node tools/marketplace.cjs release kmerdan.todo-navigator/v0.1.0 /tmp/todo-navigator-release
```

SDK URL 和完整性 hash 在各插件 package-lock.json 中锁定。包有独立的版本和 namespaced Release；注册不执行代码。开发、权限和 API 限制见 [SDK Phase B 指南](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.3.0/docs/PhaseB.zh-CN.md)。面板位置、查询和滚动由通用宿主热更新恢复。
