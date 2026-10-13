# SDK 原生 API 示例

**SDK Example: Text Inspector** 展示选区读取、文档元数据与定位。**SDK Example: TODO Navigator** 展示原生搜索、会话高亮、版本校验定位与面板恢复。它们是可运行的开发示例，不属于默认 Marketplace 产品目录，也不是主仓 CI 的业务依赖。

示例位于 `examples/`，使用 SDK 0.3.1 和 native API 0.3。需要时注册各自的 metadata，或从各自 namespaced Release 安装本地包。不要通过默认 Discover 列表寻找它们。

```sh
npm run ci
node tools/marketplace.cjs release kmerdan.text-inspector/v0.1.1 /tmp/text-inspector-release
node tools/marketplace.cjs release kmerdan.todo-navigator/v0.1.1 /tmp/todo-navigator-release
```

SDK URL 与完整性 hash 在各示例 package-lock.json 中锁定。注册不执行代码。权限和 API 限制见 [SDK Phase B 指南](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.3.1/docs/PhaseB.zh-CN.md) 和 [类别/所有权](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.3.1/docs/PluginLifecycle.zh-CN.md)。
