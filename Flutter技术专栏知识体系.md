# Flutter 技术专栏知识体系

> 一套可直接拆分为深度技术文章的 Flutter 内容地图  
> 推荐读者：具备基础 Dart/Flutter 开发经验，希望系统理解框架原理与工程实践的开发者

---

## 一、专栏定位与写作原则

### 1. 专栏目标

这套专栏不以 API 罗列为目标，而是回答四类问题：

1. **它是什么**：概念、职责和适用范围。
2. **它为什么这样设计**：底层机制和设计权衡。
3. **它在真实项目中如何使用**：模式、代码和工程实践。
4. **它什么时候会失效**：边界、反例、性能成本和替代方案。

### 2. 每篇深度文章的建议结构

```text
问题背景 → 最小示例 → 核心概念 → 源码/运行机制
→ 常见误区 → 工程实践 → 性能或测试验证 → 总结与延伸
```

建议每篇文章至少包含：

- 一个明确的问题场景。
- 一张结构图、流程图或时序图。
- 一个最小可运行示例。
- 一个真实工程案例或错误案例。
- 一段源码调用链或底层机制分析。
- 一组可复现的验证步骤。
- 3～5 个延伸问题。

### 3. 内容分层标记

| 标记 | 定位 | 写作重点 |
|---|---|---|
| L1 基础 | 建立正确心智模型 | 概念、API、最小示例 |
| L2 进阶 | 理解机制和边界 | 原理、源码、常见误区 |
| L3 深度 | 解决复杂工程问题 | 性能、架构、跨平台、治理 |

---

# 系列 01：Dart 语言基础与设计

## 01. Dart 类型系统全景：从类型推断到运行时检查 `L1`

- 类型推断、静态类型与运行时类型。
- `var`、`final`、`const`、`dynamic`、`Object?` 的区别。
- 类型提升、类型测试与强制转换。
- 泛型、泛型约束和类型擦除问题。
- 可验证实验：比较静态错误与运行时类型错误。

## 02. 健全空安全的底层逻辑 `L2`

- `T`、`T?`、`Never`、`Null` 的类型关系。
- 流程分析如何完成类型提升。
- `late`、`late final` 的实现语义和运行时成本。
- `!` 操作符为什么是风险转移而不是问题修复。
- 与旧版非空安全库互操作时的边界。

## 03. Dart 对象模型：一切皆对象意味着什么 `L1`

- 类、实例、字段、Getter、Setter 和操作符重载。
- 命名构造函数、工厂构造函数和重定向构造函数。
- 初始化列表与对象创建顺序。
- `identical`、`==` 与 `hashCode` 契约。
- 常量对象规范化。

## 04. Dart 3 类修饰符设计：interface、base、final、sealed `L2`

- 类修饰符解决的库边界问题。
- 继承、实现和混入能力矩阵。
- `sealed class` 与代数数据类型。
- 如何用穷尽匹配建模 UI 状态。
- 公共 Package API 应如何选择修饰符。

## 05. Mixin、Extension 与代码复用边界 `L2`

- Mixin 的线性化和方法冲突。
- `on` 约束的作用。
- Extension 的静态分派规则。
- Extension Type 的使用场景。
- 继承、组合、Mixin、Extension 的选择标准。

## 06. Dart 模式匹配与 Records 深入解析 `L2`

- Record 的结构类型和命名字段。
- Object、List、Map、Record Pattern。
- `if-case`、`switch` 表达式和守卫条件。
- 解构在 JSON 解析与状态机中的应用。
- 穷尽检查的实现价值。

## 07. Dart 泛型与型变 `L3`

- 协变、逆变和不变的直观解释。
- Dart 泛型为何默认协变。
- 函数参数和返回值的型变。
- `covariant` 关键字的运行时检查成本。
- 设计通用组件 API 时如何避免类型陷阱。

## 08. Dart 元编程与代码生成 `L2`

- 注解、Builder、SourceGen、build_runner 的协作关系。
- 代码生成图和增量构建。
- `json_serializable`、`freezed` 的实现思路。
- 宏能力的版本现状与适用边界。
- 生成代码的 CI、缓存和版本治理。

---

# 系列 02：Dart 异步、并发与运行时

## 09. Dart 事件循环：Microtask 与 Event Queue `L2`

- Isolate 内部的事件循环模型。
- 同步栈、Microtask、Event 的执行顺序。
- `Future()`、`Future.microtask()`、`scheduleMicrotask()`、`Timer.run()` 对比。
- Microtask 饥饿如何导致 UI 卡顿。
- 编写可重复的执行顺序实验。

## 10. Future 的状态、组合与错误传播 `L2`

- Future 完成模型和 continuation。
- `async/await` 的语法转换思路。
- `then`、`catchError`、`whenComplete` 的传播规则。
- `Future.wait` 的错误与清理行为。
- 超时、取消协议与过期结果淘汰。

## 11. Stream 完整指南：从单订阅到广播流 `L2`

- Stream、Subscription、Controller 的职责。
- Single-subscription 与 Broadcast。
- 同步流与异步流的重入风险。
- `async*`、`yield`、`yield*`。
- pause、resume、cancel 与资源释放。

## 12. 响应式流操作：debounce、throttle、switchMap `L2`

- 时间类操作符的语义差异。
- 搜索场景中的请求竞态。
- 合并、切换、串联和并发处理。
- 错误流与重试流设计。
- RxDart 与原生 Stream 的取舍。

## 13. Isolate 深入：消息传递与并行计算 `L3`

- Isolate 独立堆与无共享可变内存模型。
- `SendPort`、`ReceivePort` 和消息约束。
- `Isolate.run`、`compute` 与常驻 Worker。
- 消息复制和 `TransferableTypedData`。
- CPU 密集与 I/O 密集任务如何选择。

## 14. Dart VM：JIT、AOT 与编译流水线 `L3`

- Kernel IR、JIT、AOT 的角色。
- Debug、Profile、Release 差异。
- 热重载、热重启和完整重启。
- Tree Shaking 的静态可达性基础。
- 为什么 Debug 性能不能代表线上性能。

## 15. Dart 内存管理与垃圾回收 `L3`

- 堆、栈、对象分配与引用关系。
- 分代垃圾回收的基本思路。
- 短生命周期对象为何通常便宜。
- 闭包捕获和对象生命周期延长。
- 使用 DevTools 分析 Allocation 和 Retaining Path。

---

# 系列 03：Flutter 框架核心原理

## 16. 从 runApp 开始：Flutter 应用启动链路 `L2`

- Binding 初始化。
- Root Widget 如何挂载。
- Engine、Framework 与 Embedder 的职责。
- 首帧调度和首屏可见时间。
- `deferFirstFrame` 的适用场景。

## 17. Widget 为什么设计成不可变对象 `L2`

- Widget 是配置而不是视图实例。
- 不可变性与声明式 UI。
- Widget 高频创建的真实成本。
- `const Widget` 能优化什么、不能优化什么。
- Widget 拆分对性能和可维护性的影响。

## 18. Element Tree：Flutter 框架真正的骨架 `L3`

- Element 的挂载、更新、激活、停用和卸载。
- ComponentElement、RenderObjectElement。
- BuildContext 为什么就是 Element 接口。
- Dirty Element 如何进入构建队列。
- Element 复用对 State 保持的影响。

## 19. RenderObject Tree：布局和绘制的执行者 `L3`

- RenderObject 的职责。
- RenderBox 与 Sliver 两套布局协议。
- `markNeedsLayout`、`markNeedsPaint` 传播。
- Relayout Boundary 和 Repaint Boundary。
- 自定义 RenderObject 的最小实现。

## 20. Flutter 三棵树如何协作 `L2`

- Widget、Element、RenderObject 的映射关系。
- StatelessWidget 与 StatefulWidget 的 Element 差异。
- 为什么一次 Rebuild 不等于全量 Layout 或 Paint。
- 配置更新如何落到 RenderObject 属性。
- 使用源码调用链验证更新过程。

## 21. Key 的工作原理与列表状态错位 `L2`

- Widget 更新匹配算法。
- ValueKey、ObjectKey、UniqueKey。
- GlobalKey 注册和 Reparent。
- 有状态列表重排的错误案例。
- Key 使用过多或不稳定的副作用。

## 22. StatefulWidget 生命周期完整解析 `L2`

- `createState` 到 `dispose` 的完整过程。
- `initState`、`didChangeDependencies`、`didUpdateWidget` 职责。
- `deactivate` 与 `dispose` 的本质差异。
- 订阅对象切换的正确模板。
- 异步回调与 `mounted`。

## 23. BuildContext 的本质和常见陷阱 `L2`

- Context 表示树中位置。
- 祖先查找和依赖注册。
- 为什么刚创建的 Provider 或 Scaffold 可能查找不到。
- 异步间隙后的 Context 安全。
- 跨层保存 Context 为什么危险。

## 24. InheritedWidget 的依赖传播机制 `L3`

- InheritedElement 如何保存依赖者。
- `dependOnInheritedWidgetOfExactType` 做了什么。
- `updateShouldNotify` 的职责。
- `InheritedModel` 的 Aspect 更新。
- Provider、Theme、MediaQuery 的实现联系。

## 25. Binding 家族与 Flutter 调度中枢 `L3`

- ServicesBinding、GestureBinding、SchedulerBinding。
- PaintingBinding、RendererBinding、WidgetsBinding。
- Binding Mixin 的初始化次序。
- 帧回调、平台事件和渲染管线如何汇合。
- 自定义 Binding 的边界和风险。

---

# 系列 04：布局系统与 Sliver

## 26. Flutter Box Constraints 完整心智模型 `L1`

- Constraints go down, sizes go up, parents set positions。
- Tight、Loose、Bounded、Unbounded。
- `BoxConstraints` 的合法范围。
- `SizedBox`、`ConstrainedBox`、`UnconstrainedBox` 对比。
- 用约束推导常见布局结果。

## 27. Row、Column 与 Flex 布局算法 `L2`

- Flex 两阶段布局。
- `Expanded` 与 `Flexible`。
- `mainAxisSize`、对齐和剩余空间。
- Row 中文本溢出的原因。
- 无界主轴中 Expanded 报错的原理。

## 28. Stack、Positioned 与 Overlay `L2`

- Stack 如何测量非定位和定位子节点。
- Positioned 的约束组合。
- OverlayEntry 的挂载与生命周期。
- 弹窗、菜单、Tooltip 的定位。
- OverlayPortal 与传统 Overlay 的选择。

## 29. Intrinsic 测量为什么昂贵 `L3`

- IntrinsicWidth/Height 解决什么问题。
- 额外测量如何形成多次遍历。
- 长列表中的潜在 `O(N²)` 成本。
- Baseline 布局的测量代价。
- 可替代的固定尺寸和约束设计。

## 30. Sliver 协议入门：为什么列表不是普通 Box `L2`

- SliverConstraints 与 SliverGeometry。
- 可视区域、滚动偏移和缓存区域。
- `CustomScrollView` 如何组合 Sliver。
- `SliverList`、`SliverGrid`、`SliverToBoxAdapter`。
- Box 世界和 Sliver 世界如何转换。

## 31. SliverList 懒加载与子节点回收 `L3`

- SliverMultiBoxAdaptorElement。
- Child Delegate 和按需创建。
- KeepAlive Bucket。
- `addAutomaticKeepAlives` 与内存成本。
- `itemExtent`、`prototypeItem` 如何降低布局成本。

## 32. NestedScrollView 与复杂吸顶布局 `L3`

- 外部和内部 ScrollPosition 协调。
- SliverOverlapAbsorber/Injector。
- TabBarView 独立滚动位置。
- 常见跳动、位置丢失和刷新冲突。
- 何时应重新设计滚动结构。

## 33. 响应式与自适应布局 `L2`

- MediaQuery 与 LayoutBuilder 的区别。
- 基于约束而不是设备名称设计断点。
- 手机、平板、桌面和折叠屏。
- SafeArea、DisplayFeature 和窗口变化。
- 大屏导航模式和信息密度。

---

# 系列 05：渲染、合成与图形

## 34. Flutter 一帧是如何生成的 `L3`

- VSync、Frame Callback 与 PipelineOwner。
- Animate、Build、Layout、Paint、Composite、Raster。
- UI Thread 与 Raster Thread。
- 60 Hz、90 Hz、120 Hz 帧预算。
- Frame Chart 如何对应各阶段。

## 35. PaintingContext 与 DisplayList `L3`

- RenderObject 的 Paint 过程。
- Canvas 操作如何被记录。
- DisplayList 的作用。
- 绘制顺序、坐标变换和裁剪。
- 自定义绘制的重绘判断。

## 36. Layer Tree 与合成原理 `L3`

- OffsetLayer、TransformLayer、OpacityLayer 等常见 Layer。
- Framework Layer Tree 与 Engine Layer Tree。
- Layer 复用和 retained rendering。
- Layer 太多为什么也会变慢。
- DevTools 中如何观察 Layer。

## 37. RepaintBoundary 的收益与代价 `L3`

- Repaint Boundary 如何截断脏标记传播。
- Raster Cache 的可能收益。
- 高频变化内容为什么不一定适合缓存。
- Layer、显存和合成成本。
- 用 Repaint Rainbow 做实验。

## 38. Skia 与 Impeller 渲染后端 `L3`

- Flutter Framework、Engine 与渲染后端关系。
- Skia 的即时着色器编译问题。
- Impeller 的预编译管线设计。
- Metal、Vulkan、OpenGL 后端差异。
- 不同 Flutter 版本和平台需以实际文档与测量为准。

## 39. saveLayer、Opacity 与模糊为何昂贵 `L3`

- 离屏缓冲的基本过程。
- 像素读写、内存带宽和合成成本。
- BackdropFilter 与 ImageFilter。
- Clip、阴影和透明叠加。
- 引擎优化存在时，如何避免机械化结论。

## 40. CustomPainter 深入实践 `L2`

- `paint` 与 `shouldRepaint`。
- Canvas 状态栈、Path、Paint。
- 坐标系统和设备像素比。
- 命中测试和 Semantics。
- 将高频绘制与稳定 UI 隔离。

## 41. 自定义 RenderObject：突破组合式 Widget 边界 `L3`

- 何时组合 Widget 已无法满足需求。
- RenderObjectWidget、Element、RenderObject 配套关系。
- 属性更新、布局、绘制和命中测试。
- ParentData 和多子节点容器。
- 正确性测试与性能验证。

---

# 系列 06：状态管理与应用架构

## 42. Flutter 状态应该如何分类 `L1`

- Ephemeral、Page、Application、Server State。
- 状态所有权与生命周期。
- Derived State 和 Single Source of Truth。
- 为什么服务器缓存不应简单等同于全局状态。
- 状态下沉和状态提升的选择。

## 43. setState 的源码机制与适用边界 `L2`

- `setState`、`markNeedsBuild`、Dirty Element。
- 同一帧多次调用的合并行为。
- 为什么回调不能返回 Future。
- 如何拆分局部重建。
- 何时升级到独立状态层。

## 44. ValueNotifier 与 ChangeNotifier `L2`

- Listenable 协议。
- 监听注册、通知和释放。
- 通知过程中增删监听者的边界。
- ValueNotifier 对可变对象的陷阱。
- Selector 和细粒度状态拆分。

## 45. Provider 原理与工程实践 `L2`

- Provider 与 InheritedWidget 的关系。
- `read`、`watch`、`select`。
- Provider 生命周期和惰性创建。
- MultiProvider 不是运行时容器层级消失。
- 常见循环依赖和过度全局化。

## 46. Riverpod 依赖图与生命周期 `L2`

- ProviderContainer 和 Ref。
- `watch`、`read`、`listen`。
- autoDispose、keepAlive、family。
- 异步 Provider 与缓存失效。
- Provider Observer、测试覆盖和 Override。

## 47. BLoC/Cubit 与事件驱动状态机 `L2`

- Event → Handler → State。
- Cubit 与 BLoC 的选择。
- 状态不可变和可比较性。
- Side Effect 与 UI State 分离。
- Event Transformer 的并发语义。

## 48. 用 sealed class 建模可靠 UI 状态 `L2`

- Loading、Data、Empty、Error。
- Initial Loading 与 Refreshing 的差异。
- 保留旧数据时的错误展示。
- 避免多个 Boolean 产生非法组合。
- 使用模式匹配实现穷尽渲染。

## 49. Clean Architecture 在 Flutter 中的适用边界 `L3`

- Presentation、Application、Domain、Data。
- 依赖倒置和 Repository Contract。
- DTO、Entity、ViewData 是否都需要分离。
- 空壳 UseCase 和过度抽象。
- 根据业务复杂度裁剪架构层次。

## 50. 模块化 Flutter 应用设计 `L3`

- 按 Feature 而不是文件类型组织。
- 模块公共 API 和内部实现。
- 路由契约与跨模块通信。
- Design System 与公共基础设施。
- 依赖规则、代码所有权和自动化检查。

## 51. 依赖注入与对象生命周期 `L2`

- 构造函数注入、容器注入和 Service Locator。
- Singleton、Lazy Singleton、Factory、Scope。
- 测试 Override 和替身。
- 隐式依赖为什么降低可维护性。
- 页面 Scope 和应用 Scope 的边界。

---

# 系列 07：导航、生命周期与多端适配

## 52. Navigator 1.0 路由栈原理 `L1`

- Route、Overlay、NavigatorState。
- push、pop、replace、removeUntil。
- 路由结果返回。
- RouteObserver 与页面可见生命周期。
- 嵌套 Navigator 的路由栈。

## 53. Router 与声明式导航 `L3`

- RouteInformation、Parser、Delegate。
- Page 与 Route 的关系。
- URL 和应用导航状态同步。
- BackButtonDispatcher。
- Router 封装库隐藏了哪些复杂度。

## 54. Deep Link 完整工程链路 `L2`

- URI 注册、解析和安全校验。
- 冷启动与热启动。
- 鉴权后恢复目标。
- 版本不兼容和页面不存在。
- Universal Link / App Link 配置与验证。

## 55. Flutter 应用生命周期 `L2`

- resumed、inactive、hidden、paused、detached。
- WidgetsBindingObserver。
- 摄像头、音视频、位置和动画暂停。
- 进程被杀与关键状态持久化。
- 不同平台生命周期差异。

## 56. 状态恢复 Restoration `L3`

- RestorationScope 和 Restoration ID。
- RestorableProperty。
- Navigator 状态恢复。
- UI 状态恢复与业务数据恢复的区别。
- Android/iOS 进程恢复测试。

## 57. Flutter Web 渲染与浏览器适配 `L3`

- CanvasKit/SkWasm 与 HTML 相关演进。
- URL、浏览器历史和刷新。
- SEO、首屏、字体和资源加载。
- 键盘、鼠标、右键和文本选择。
- Web 平台能力和安全边界。

## 58. Flutter Desktop 工程要点 `L2`

- 窗口管理、多窗口和菜单。
- 键盘快捷键、焦点、鼠标和拖放。
- 文件系统权限和沙箱。
- 桌面布局密度。
- 安装、签名与自动更新。

---

# 系列 08：网络、数据与离线能力

## 59. Flutter 网络层的完整设计 `L2`

- Client、Interceptor、Repository 分层。
- 超时、取消、错误映射。
- 请求 ID、日志和 Trace。
- DTO 与领域模型。
- Dio 与原生 HTTP Client 的选择。

## 60. Token 刷新的并发治理 `L3`

- 多请求同时 401 的刷新风暴。
- Single-flight 刷新。
- 待重放请求队列。
- 刷新失败退出登录。
- 防止无限重试和 Token 覆盖竞态。

## 61. 网络重试的正确设计 `L2`

- 幂等性与可重试操作。
- 指数退避和 jitter。
- `Retry-After`。
- 前后台切换与网络恢复。
- 重试预算和服务端压力。

## 62. 客户端缓存策略全解 `L2`

- Cache First、Network First。
- Stale While Revalidate。
- TTL、ETag、Last-Modified。
- 缓存 Key 和用户隔离。
- 缓存击穿、污染和淘汰。

## 63. JSON 序列化与大数据解析 `L2`

- 手写解析与代码生成。
- 缺失字段、Null、未知枚举。
- Schema 兼容。
- 大 JSON 的帧耗时测量。
- Isolate 解析的收益与消息成本。

## 64. SQLite/Drift 深度实践 `L3`

- Schema、索引、事务和查询计划。
- WAL 与并发访问。
- Migration 和历史版本升级测试。
- 分页、批量写入、N+1。
- 数据库性能监控。

## 65. 离线优先架构 `L3`

- Local Source of Truth。
- Operation Log 和 Pending Mutation。
- 幂等 ID、重试和同步状态。
- 乐观更新与失败回滚。
- 数据新鲜度的 UI 表达。

## 66. 离线冲突与数据一致性 `L3`

- Last-Write-Wins。
- 服务端版本号和乐观锁。
- 字段级合并。
- Tombstone 删除。
- CRDT 的适用条件与成本。

## 67. WebSocket 实时通信 `L3`

- 连接、心跳、超时、断线重连。
- 指数退避和网络切换。
- 消息序列号、去重、补偿拉取。
- 前后台生命周期。
- WebSocket 与普通 HTTP 状态统一。

---

# 系列 09：平台通道、插件与原生融合

## 68. Flutter Platform Channel 原理 `L2`

- Dart、Engine、Platform 的消息链路。
- MethodChannel、EventChannel、BasicMessageChannel。
- Codec 编解码。
- 线程和生命周期。
- 结构化错误处理。

## 69. Pigeon 类型安全平台通信 `L2`

- Schema 定义和代码生成。
- Host API 与 Flutter API。
- 异步结果和错误。
- API 版本演进。
- 多端实现一致性。

## 70. 高频原生数据传输优化 `L3`

- Channel 序列化成本。
- 批处理与二进制协议。
- Texture 和 Platform View。
- FFI 与共享内存思路。
- 性能基准设计。

## 71. Flutter FFI 完整指南 `L3`

- C ABI、DynamicLibrary、符号绑定。
- Struct、Pointer、Allocator。
- 内存所有权和 NativeFinalizer。
- 阻塞调用与 Worker Isolate。
- Android/iOS/Desktop ABI 打包。

## 72. 编写一个高质量 Flutter Plugin `L3`

- Federated Plugin 架构。
- Platform Interface。
- 多平台注册与默认实现。
- 生命周期和多 Engine。
- Example、测试、版本兼容和发布。

## 73. PlatformView 的原理与性能代价 `L3`

- Android View / UIKit View 嵌入。
- 混合合成和纹理合成。
- 手势、焦点和无障碍。
- Layer 与帧同步成本。
- 地图、WebView、视频场景的选择。

## 74. Add-to-App 混合工程 `L3`

- FlutterEngine 创建、预热和缓存。
- 原生与 Flutter 路由协作。
- 插件注册和生命周期。
- FlutterEngineGroup。
- 多团队构建产物和版本治理。

---

# 系列 10：性能与稳定性

## 75. Flutter 性能分析方法论 `L2`

- 从用户问题到量化指标。
- Profile 模式与目标设备。
- 单变量实验和前后对比。
- 平均值、P95、P99 与长尾。
- 性能预算和持续监控。

## 76. DevTools Performance 面板实战 `L2`

- Frame Chart 和 Timeline Events。
- UI/Raster 超时区分。
- Track Widget Builds / Layouts / Paints。
- CPU Profiler。
- 导出 Trace 与复现报告。

## 77. Flutter 列表性能优化 `L2`

- Builder、Sliver 和回收。
- itemExtent、prototypeItem。
- 图片解码和预取。
- KeepAlive 成本。
- 分页、防重与滚动位置。

## 78. Flutter 图片内存与缓存 `L3`

- 压缩文件大小与解码内存的区别。
- 设备像素比和目标解码尺寸。
- ImageProvider、ImageStream、ImageCache。
- 缓存上限与淘汰。
- OOM 案例分析。

## 79. Flutter 启动性能优化 `L3`

- 冷启动、热启动。
- TTID 与 TTFD。
- Engine、插件、Dart 初始化。
- 首屏依赖并行化和延迟初始化。
- 启动画面、首帧和可交互时间。

## 80. Flutter 内存泄漏定位实战 `L3`

- Heap Snapshot 和 Diff。
- Retaining Path。
- Controller、Subscription、Closure、Cache。
- 页面反复进出的验证方法。
- 自动化泄漏回归思路。

## 81. Flutter 包体积优化 `L2`

- App Size Tool。
- Dart AOT Snapshot、Native Library、Asset。
- ABI 拆分、字体子集和图片格式。
- Tree Shaking Icons。
- 第三方 SDK 体积治理。

## 82. 卡顿案例：UI Thread 与 Raster Thread `L3`

- UI 超时的典型调用栈。
- Raster 超时的典型图形操作。
- GC、图片解码和 Shader。
- 120 Hz 下的帧预算。
- 完整诊断报告如何写。

## 83. Flutter 崩溃与异常治理 `L3`

- Framework Error、Isolate Error、Native Crash。
- `FlutterError.onError`、PlatformDispatcher。
- Zone 的边界。
- 符号表、混淆和堆栈还原。
- Crash-Free、版本分布与灰度止损。

## 84. 可观测性：日志、指标与 Trace `L3`

- 结构化日志与隐私脱敏。
- 用户动作到网络请求的关联 ID。
- 性能、错误、业务指标。
- 分布式 Trace 接入思路。
- 采样、成本和数据治理。

---

# 系列 11：动画、交互与多媒体

## 85. Flutter 动画体系总览 `L1`

- Tween、Animation、Controller、Curve。
- 隐式动画与显式动画。
- Ticker 和 VSync。
- AnimatedWidget 与 AnimatedBuilder。
- 动画生命周期和资源释放。

## 86. 动画性能与编排 `L2`

- Transform 与布局属性动画。
- 稳定子树复用。
- 多动画 Interval 和 Sequence。
- 页面不可见时暂停。
- 使用 Timeline 验证动画性能。

## 87. Hero 动画原理 `L2`

- Hero Tag 匹配。
- Overlay Flight。
- FlightShuttleBuilder。
- 嵌套 Navigator。
- 图片加载和目标布局变化。

## 88. Flutter 手势竞技场 `L3`

- Pointer Event 和 Hit Test。
- GestureRecognizer。
- Gesture Arena 胜负规则。
- 父子手势冲突。
- 自定义手势识别器。

## 89. HitTest、IgnorePointer 与 AbsorbPointer `L2`

- 命中测试路径。
- HitTestBehavior。
- IgnorePointer 和 AbsorbPointer 的区别。
- ModalBarrier。
- 手势穿透问题排查。

## 90. Focus、键盘与快捷键系统 `L2`

- FocusNode、FocusScope。
- Focus Traversal。
- Shortcuts、Actions、Intent。
- 软键盘和 Insets。
- 桌面端键盘体验。

## 91. Flutter 音视频架构 `L3`

- 播放器状态机。
- Texture 渲染。
- 缓冲、首帧、Seek 和后台播放。
- 生命周期和音频焦点。
- DRM、缓存和多清晰度的系统边界。

---

# 系列 12：测试、质量与工程化

## 92. Flutter Unit Test 设计 `L1`

- Arrange、Act、Assert。
- 纯逻辑和状态转换。
- Mock、Fake、Stub。
- 时间、随机数、网络的可注入性。
- 测试行为而不是私有实现。

## 93. Widget Test 深度实践 `L2`

- WidgetTester 和 Finder。
- pump、pumpWidget、pumpAndSettle。
- 推进动画和虚拟时间。
- Provider/Router 注入。
- 异步 UI 测试稳定性。

## 94. Golden Test 的价值与治理 `L2`

- 像素回归适合什么。
- 字体、平台和渲染差异。
- 固定测试环境。
- 多尺寸和主题矩阵。
- Golden 更新审查流程。

## 95. Integration Test 与端到端测试 `L2`

- 真实应用链路。
- 插件和平台交互。
- 测试数据隔离。
- 稳定等待和失败证据。
- 数量、速度和维护成本。

## 96. Flutter 性能自动化测试 `L3`

- 启动、滚动和内存基准。
- Timeline 数据提取。
- 基准设备和噪声控制。
- 性能阈值与回归判断。
- CI 中的性能门禁。

## 97. Flutter CI/CD 完整实践 `L2`

- Format、Analyze、Test、Build。
- 缓存 SDK、依赖和构建产物。
- Flavor 和环境配置。
- 签名、制品和发布渠道。
- 灰度、监控和自动回滚。

## 98. Dart 静态分析与代码规范 `L2`

- analyzer 和 lints。
- 自定义分析规则。
- 依赖边界自动检查。
- Warning 与 CI 门禁。
- 规则升级和历史代码治理。

## 99. Flutter Package 设计与发布 `L2`

- Library API 设计。
- SemVer 和 Changelog。
- 平台支持声明。
- Example、文档和测试。
- Breaking Change 与迁移指南。

## 100. 大型 Flutter 项目的依赖治理 `L3`

- 版本锁定和升级策略。
- 依赖健康度评估。
- Fork、Patch、Override 的边界。
- 安全漏洞和许可证。
- SDK 升级的兼容性矩阵。

---

# 系列 13：安全、可访问性与国际化

## 101. Flutter 客户端安全基础 `L2`

- 客户端威胁模型。
- Keychain/Keystore 和安全存储。
- 日志、截图、剪贴板和本地文件。
- Root/Jailbreak 检测的局限。
- 客户端不能保守真正机密。

## 102. TLS 与证书绑定 `L3`

- TLS 解决什么问题。
- 系统信任链。
- Certificate/Public Key Pinning。
- 证书轮换和灾难恢复。
- 代理调试与生产安全的平衡。

## 103. WebView 安全清单 `L3`

- JavaScript 开关和 JS Bridge。
- URL 白名单与导航拦截。
- Cookie、文件访问和混合内容。
- XSS、重定向和深链联动。
- 第三方页面隔离。

## 104. Flutter 可访问性体系 `L2`

- Semantics Tree。
- 标签、角色、状态和操作。
- 阅读顺序与 Merge/Exclude Semantics。
- 屏幕阅读器测试。
- 自动化无障碍检查。

## 105. 动态字体与无障碍布局 `L2`

- TextScaler。
- 固定高度导致的截断。
- 触控尺寸和对比度。
- Reduce Motion。
- 大字体下的响应式策略。

## 106. Flutter 国际化与本地化 `L2`

- ARB、gen_l10n、Locale Resolution。
- 复数、性别、日期、数字和货币。
- RTL 布局和 Directionality。
- 文案长度与布局。
- 动态语言切换和资源拆分。

---

# 系列 14：源码研读与综合实战

## 107. 如何阅读 Flutter Framework 源码 `L2`

- 从公开 API 向下追踪。
- 用调用栈定位入口。
- 区分 Framework、Engine、Embedder。
- 编写最小实验验证源码结论。
- 避免把具体版本实现误当稳定契约。

## 108. 源码解析：setState 到 build `L3`

- State.setState。
- Element.markNeedsBuild。
- BuildOwner.scheduleBuildFor。
- buildScope 和 performRebuild。
- Widget 更新与子 Element 协调。

## 109. 源码解析：布局脏标记传播 `L3`

- markNeedsLayout。
- Relayout Boundary。
- PipelineOwner.flushLayout。
- Parent Uses Size。
- 为什么某些尺寸变化会向上传播。

## 110. 源码解析：手势从 Pointer 到回调 `L3`

- 平台 PointerData。
- PointerRouter。
- HitTestResult。
- GestureArenaManager。
- Recognizer 回调触发。

## 111. 实战：设计一个高性能信息流 `L3`

- Cursor 分页和请求防重。
- Sliver 列表和滚动位置。
- 图片尺寸、缓存和预取。
- 点赞乐观更新。
- 曝光统计和性能指标。

## 112. 实战：设计离线可用的笔记应用 `L3`

- Local Source of Truth。
- 操作日志和后台同步。
- 冲突解决和删除墓碑。
- 编辑器草稿恢复。
- 加密、迁移和同步可观测性。

## 113. 实战：设计即时通讯客户端 `L3`

- 消息状态机。
- WebSocket、补偿拉取和重连。
- 本地数据库索引。
- 去重、顺序和幂等。
- 附件上传、已读和推送联动。

## 114. 实战：大型 Flutter App 模块化演进 `L3`

- 单体项目的症状。
- 业务模块边界。
- 路由和依赖契约。
- 渐进式迁移而非一次性重写。
- 构建时间、所有权和发布治理。

## 115. 实战：一次完整的 Flutter 卡顿排查 `L3`

- 建立复现条件。
- 采集 Frame、CPU、Memory、Raster 数据。
- 构建根因假设。
- 单变量优化。
- 前后对比、设备矩阵与回归测试。

## 116. 实战：Flutter 线上稳定性体系 `L3`

- Crash、ANR、Flutter Error、业务错误。
- 日志、指标、Trace 和关联 ID。
- Feature Flag、灰度和回滚。
- SLO 与错误预算。
- 故障复盘和预防机制。

---

# 建议发布路线

## 第一阶段：建立读者基础认知

建议优先发布 15 篇主干文章：

1. Dart 事件循环。
2. Future 与错误传播。
3. Isolate。
4. Flutter 三棵树。
5. Element Tree。
6. StatefulWidget 生命周期。
7. BuildContext。
8. Flutter 约束系统。
9. 一帧如何生成。
10. setState 源码机制。
11. InheritedWidget。
12. 状态分类。
13. 网络层设计。
14. Flutter 性能分析方法论。
15. DevTools Performance 实战。

## 第二阶段：形成专栏技术深度

- RenderObject、Sliver、Layer、Impeller。
- Riverpod/BLoC 并发和生命周期。
- 离线优先、Token 刷新、WebSocket。
- Platform Channel、FFI、PlatformView。
- 内存、启动、图片与 Raster 优化。

## 第三阶段：建立差异化内容

- Flutter Framework 源码调用链。
- 高性能信息流、即时通讯、离线笔记等完整案例。
- 大型项目模块化、依赖治理和稳定性体系。
- 基于真实 Trace、Heap Snapshot、Benchmark 的性能案例。

---

# 文章选题管理模板

```markdown
## 文章标题

- 系列：
- 难度：L1 / L2 / L3
- 前置知识：
- 目标读者：
- 核心问题：
- 一句话结论：

### 必须讲透

- [ ] 核心概念
- [ ] 底层机制
- [ ] 关键源码链路
- [ ] 常见误区
- [ ] 工程边界

### 内容素材

- 最小示例：
- 错误示例：
- 流程图/时序图：
- DevTools/Benchmark：
- 真实案例：

### 验证

- 测试方法：
- 目标平台和 Flutter 版本：
- 预期结果：
- 反例与限制：

### 延伸阅读

- 上一篇：
- 下一篇：
- 官方文档/源码：
```

---

# 专栏质量检查清单

- [ ] 标题描述具体问题，不使用空泛的“全面解析”。
- [ ] 开头给出读者能感知的场景和明确结论。
- [ ] 区分稳定 API 契约与特定版本内部实现。
- [ ] 源码分析标注 Flutter/Dart 版本和文件位置。
- [ ] 代码可以独立运行，不省略决定结论的关键部分。
- [ ] 性能结论包含设备、构建模式、刷新率和测量工具。
- [ ] 不把相关性当因果，不用单次截图证明普遍结论。
- [ ] 同时说明方案收益、成本、失效条件和替代方案。
- [ ] 图表服务于机制解释，不为装饰而添加。
- [ ] 结尾给出可继续探索的问题和上下篇关系。

---

> 这套知识体系共包含 **14 个系列、116 个可独立成文的主题**。实际写作时不需要严格按编号发布，但应让每篇文章能够链接到其前置知识和后续主题，最终形成可导航的知识网络。
