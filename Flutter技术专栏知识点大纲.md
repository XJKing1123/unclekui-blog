# Flutter 技术专栏知识点大纲

## 一、Dart 语言基础

### 1. 基础语法

- 变量与常量：`var`、`final`、`const`、`late`
- 内置数据类型
- 运算符与级联操作符
- 条件、循环与模式分支
- 函数、可选参数、命名参数、默认参数
- 匿名函数与闭包
- 词法作用域
- `typedef` 函数类型别名
- 库、包、导入与导出
- 私有成员与库级可见性

### 2. 类型系统

- 静态类型与类型推断
- `dynamic`、`Object`、`Object?`、`Never`、`Null`
- 健全空安全
- 类型提升与流程分析
- `is`、`is!`、`as`
- 泛型类与泛型方法
- 泛型约束
- 协变、逆变与不变
- `covariant` 关键字
- 函数类型的子类型关系

### 3. 面向对象

- 类与对象
- 构造函数
- 命名构造函数
- 工厂构造函数
- 重定向构造函数
- 常量构造函数
- 初始化列表
- Getter 与 Setter
- 继承与方法重写
- 抽象类与接口
- `interface`、`base`、`final`、`sealed`
- Mixin 与 `on` 约束
- Extension Method
- Extension Type
- 操作符重载
- `identical`、`==` 与 `hashCode`
- 不可变对象

### 4. Dart 3 语言特性

- Records
- Patterns
- Object Pattern
- List Pattern
- Map Pattern
- Record Pattern
- `if-case`
- `switch` 表达式
- Guard Clause
- Sealed Class 穷尽检查

### 5. 元编程与代码生成

- Annotation
- Builder
- SourceGen
- build_runner
- json_serializable
- freezed
- 代码生成缓存
- 增量构建
- 宏能力与适用边界

## 二、Dart 异步与并发

### 1. 事件循环

- 同步调用栈
- Event Queue
- Microtask Queue
- Microtask 与 Event 执行顺序
- `scheduleMicrotask`
- `Future.microtask`
- `Timer.run`
- Microtask 饥饿

### 2. Future

- Future 状态模型
- `async` 与 `await`
- Future continuation
- `then`、`catchError`、`whenComplete`
- Future 错误传播
- `Future.wait`
- `Future.any`
- Future 超时
- Future 取消
- 异步请求竞态

### 3. Stream

- Stream 生命周期
- Single-subscription Stream
- Broadcast Stream
- StreamController
- StreamSubscription
- 同步流与异步流
- `async*`、`yield`、`yield*`
- pause、resume、cancel
- 背压与缓冲
- Stream 错误处理
- debounce、throttle
- merge、concat、switchMap

### 4. Isolate

- Isolate 内存模型
- 独立 Heap 与 Event Loop
- SendPort 与 ReceivePort
- Isolate 消息约束
- `Isolate.spawn`
- `Isolate.run`
- `compute`
- 常驻 Worker Isolate
- `TransferableTypedData`
- CPU 密集与 I/O 密集任务
- Isolate 启动与通信成本

### 5. Dart 运行时

- Dart VM
- Kernel IR
- JIT 编译
- AOT 编译
- Debug、Profile、Release
- 热重载
- 热重启
- Tree Shaking
- 对象分配
- 分代垃圾回收
- 闭包捕获与对象生命周期

## 三、Flutter 框架基础

### 1. Flutter 架构

- Framework
- Engine
- Embedder
- Dart Runtime
- Skia
- Impeller
- 平台线程模型
- Flutter 应用启动流程
- Binding 初始化
- `runApp`
- 首帧调度

### 2. Widget

- Widget 的配置本质
- Widget 不可变性
- StatelessWidget
- StatefulWidget
- ProxyWidget
- InheritedWidget
- RenderObjectWidget
- Widget 创建与更新
- `const Widget`
- Widget 拆分原则

### 3. Element

- Element Tree
- BuildContext 与 Element
- ComponentElement
- StatelessElement
- StatefulElement
- ProxyElement
- InheritedElement
- RenderObjectElement
- Element mount
- Element update
- Element activate/deactivate
- Element unmount
- Dirty Element
- Element 复用

### 4. RenderObject

- RenderObject Tree
- RenderBox
- RenderSliver
- RenderObject 创建与更新
- Layout
- Paint
- Hit Test
- Semantics
- ParentData
- PipelineOwner
- Relayout Boundary
- Repaint Boundary

### 5. 三棵树协作

- Widget、Element、RenderObject 对应关系
- Widget 更新匹配规则
- Widget Diff
- Element 复用与替换
- Build 与 Render 更新
- Rebuild、Relayout、Repaint 的区别
- State 保存位置

## 四、生命周期与上下文

### 1. StatefulWidget 生命周期

- `createState`
- `initState`
- `didChangeDependencies`
- `build`
- `didUpdateWidget`
- `setState`
- `reassemble`
- `deactivate`
- `dispose`
- `mounted`
- 订阅与取消订阅
- 异步回调安全

### 2. BuildContext

- Context 的树位置含义
- 祖先查找
- Inherited 依赖注册
- Builder 的作用
- Context 层级错误
- 异步间隙后的 Context
- 跨层保存 Context 的风险

### 3. Key

- Key 的更新匹配作用
- LocalKey
- ValueKey
- ObjectKey
- UniqueKey
- GlobalKey
- GlobalObjectKey
- 列表状态错位
- GlobalKey Reparent
- Key 的性能与维护成本

### 4. 应用生命周期

- AppLifecycleState
- resumed
- inactive
- hidden
- paused
- detached
- WidgetsBindingObserver
- 前后台状态保存
- 进程终止与恢复
- RestorationScope
- RestorableProperty

## 五、布局系统

### 1. Box Constraints

- Constraints go down
- Sizes go up
- Parents set positions
- Tight Constraints
- Loose Constraints
- Bounded Constraints
- Unbounded Constraints
- BoxConstraints
- ConstrainedBox
- SizedBox
- UnconstrainedBox
- OverflowBox
- LimitedBox
- FractionallySizedBox

### 2. Flex 布局

- Row
- Column
- Flex
- Expanded
- Flexible
- Spacer
- Flex 两阶段布局
- 主轴与交叉轴
- 剩余空间分配
- Flex Overflow
- 无界约束中的 Expanded

### 3. 常用布局

- Align
- Center
- Padding
- Container
- DecoratedBox
- Stack
- Positioned
- Wrap
- Flow
- Table
- AspectRatio
- FittedBox
- Baseline
- CustomSingleChildLayout
- CustomMultiChildLayout

### 4. 测量与响应式布局

- MediaQuery
- LayoutBuilder
- OrientationBuilder
- IntrinsicWidth
- IntrinsicHeight
- Intrinsic 测量成本
- SafeArea
- 设备像素比
- 动态字体
- 手机、平板、桌面断点
- 折叠屏与 DisplayFeature

## 六、滚动系统与 Sliver

### 1. 滚动基础

- Scrollable
- Viewport
- ScrollPosition
- ScrollController
- ScrollPhysics
- ScrollNotification
- PrimaryScrollController
- PageStorage
- 滚动位置恢复
- Overscroll
- ScrollBehavior

### 2. 列表与网格

- ListView
- ListView.builder
- ListView.separated
- GridView
- PageView
- ReorderableListView
- 懒构建
- 子节点回收
- itemExtent
- prototypeItem
- KeepAlive
- AutomaticKeepAliveClientMixin

### 3. Sliver

- SliverConstraints
- SliverGeometry
- CustomScrollView
- SliverList
- SliverFixedExtentList
- SliverGrid
- SliverAppBar
- SliverPersistentHeader
- SliverToBoxAdapter
- SliverFillRemaining
- SliverPadding
- SliverMultiBoxAdaptor
- Sliver Child Delegate
- CacheExtent

### 4. 复杂滚动

- NestedScrollView
- SliverOverlapAbsorber
- SliverOverlapInjector
- TabBarView 滚动协调
- 吸顶 Header
- 下拉刷新
- 上拉分页
- 多列表滚动同步

## 七、渲染与绘制

### 1. 帧流水线

- VSync
- SchedulerBinding
- Frame Callback
- Animate
- Build
- Layout
- Paint
- Compositing
- Raster
- 60 Hz / 90 Hz / 120 Hz 帧预算
- UI Thread
- Raster Thread

### 2. Painting

- PaintingContext
- Canvas
- Paint
- Path
- Clip
- Transform
- DisplayList
- CustomPainter
- `shouldRepaint`
- 自定义命中测试
- 自定义绘制 Semantics

### 3. Layer 与合成

- Layer Tree
- ContainerLayer
- OffsetLayer
- TransformLayer
- OpacityLayer
- ClipLayer
- PictureLayer
- PlatformViewLayer
- Retained Rendering
- Raster Cache
- Layer 复用
- Layer 合成成本

### 4. 渲染性能

- RepaintBoundary
- saveLayer
- Opacity
- BackdropFilter
- ImageFilter
- Clip 成本
- 阴影成本
- Shader Compilation Jank
- Skia 渲染管线
- Impeller 渲染管线
- Metal、Vulkan、OpenGL

### 5. 自定义渲染

- SingleChildRenderObjectWidget
- MultiChildRenderObjectWidget
- RenderBox 自定义布局
- RenderSliver 自定义滚动
- ParentDataWidget
- RenderObject 属性更新
- markNeedsLayout
- markNeedsPaint
- markNeedsSemanticsUpdate

## 八、状态管理

### 1. 状态设计

- Ephemeral State
- Page State
- Application State
- Server State
- Single Source of Truth
- Derived State
- 状态提升
- 状态下沉
- 不可变状态
- UI 状态机
- Sealed State
- Side Effect

### 2. Flutter 原生方案

- setState
- ValueNotifier
- ChangeNotifier
- Listenable
- AnimatedBuilder
- ValueListenableBuilder
- InheritedWidget
- InheritedNotifier
- InheritedModel

### 3. Provider

- Provider 原理
- MultiProvider
- ChangeNotifierProvider
- FutureProvider
- StreamProvider
- ProxyProvider
- `read`
- `watch`
- `select`
- Provider 生命周期

### 4. Riverpod

- ProviderContainer
- Ref
- Provider
- StateProvider
- NotifierProvider
- AsyncNotifierProvider
- StreamProvider
- FutureProvider
- autoDispose
- keepAlive
- family
- invalidate / refresh
- Provider Override
- Provider Observer

### 5. BLoC 与响应式架构

- Cubit
- BLoC
- Event
- State
- BlocBuilder
- BlocListener
- BlocSelector
- Event Transformer
- concurrent
- sequential
- restartable
- droppable
- UI State 与副作用分离

### 6. 其他方案

- Redux
- MobX
- GetX
- Signals
- 状态管理方案选型
- 状态管理迁移
- 状态调试与追踪

## 九、路由与导航

### 1. Navigator 1.0

- Navigator
- Route
- MaterialPageRoute
- CupertinoPageRoute
- push / pop
- pushReplacement
- pushAndRemoveUntil
- popUntil
- 路由返回值
- RouteSettings
- RouteObserver
- Hero Route Transition
- 嵌套 Navigator

### 2. Navigator 2.0 / Router

- Page
- Router
- RouteInformationProvider
- RouteInformationParser
- RouterDelegate
- BackButtonDispatcher
- 声明式路由状态
- URL 同步
- 浏览器历史
- go_router
- auto_route

### 3. Deep Link

- URI 解析
- Scheme Link
- Universal Link
- Android App Link
- 冷启动深链
- 热启动深链
- 鉴权后目标恢复
- 参数校验
- 深链安全
- 路由状态恢复

## 十、网络与数据层

### 1. 网络基础

- HttpClient
- package:http
- Dio
- GET、POST、PUT、PATCH、DELETE
- Header、Cookie、Multipart
- 请求超时
- 请求取消
- Interceptor
- 代理与抓包
- HTTPS / TLS
- HTTP/2 与连接复用

### 2. 网络架构

- API Client
- RemoteDataSource
- Repository
- DTO
- Domain Model
- Error Model
- Result 类型
- 请求日志
- Correlation ID
- 网络状态监听

### 3. 请求治理

- 重复请求去重
- 请求竞态
- 幂等性
- 指数退避
- Jitter
- Retry-After
- Token 刷新
- Single-flight
- 请求排队与重放
- 401 无限循环防护
- 限流与熔断

### 4. JSON 与序列化

- dart:convert
- 手写 fromJson/toJson
- json_serializable
- freezed
- Null 与缺失字段
- 未知枚举
- Schema 兼容
- 大 JSON 解析
- Isolate 解析

### 5. 缓存

- Cache First
- Network First
- Stale While Revalidate
- Write Through
- Write Behind
- TTL
- ETag
- Last-Modified
- LRU
- 缓存 Key
- 缓存击穿
- 缓存污染
- 用户缓存隔离

### 6. 实时通信

- WebSocket
- 心跳
- 连接超时
- 断线重连
- 网络切换
- 消息顺序
- 消息去重
- 补偿拉取
- SSE
- MQTT

## 十一、本地存储与离线能力

### 1. 存储方案

- shared_preferences
- flutter_secure_storage
- 文件存储
- SQLite
- Drift
- Hive
- Isar
- ObjectBox
- 存储方案选型

### 2. 数据库

- Schema
- CRUD
- 索引
- 事务
- 查询计划
- WAL
- 批量写入
- 分页查询
- N+1 查询
- 数据库并发
- Schema Migration
- 历史版本升级测试

### 3. 离线优先

- Local Source of Truth
- Operation Log
- Pending Mutation
- 乐观更新
- 失败回滚
- 幂等操作 ID
- 后台同步
- 数据新鲜度
- 同步进度
- 同步失败恢复

### 4. 数据冲突

- Last-Write-Wins
- 服务端版本号
- 乐观锁
- 字段级合并
- Tombstone
- 版本向量
- CRDT
- 人工冲突解决

## 十二、平台交互与插件

### 1. Platform Channel

- BinaryMessenger
- MethodChannel
- EventChannel
- BasicMessageChannel
- StandardMessageCodec
- StandardMethodCodec
- 消息序列化
- 线程切换
- PlatformException
- Channel 生命周期

### 2. Pigeon

- Host API
- Flutter API
- 类型安全接口
- 异步调用
- 错误映射
- API 版本演进
- 多平台生成代码

### 3. FFI

- dart:ffi
- C ABI
- DynamicLibrary
- Native Symbol
- Pointer
- Struct
- Allocator
- 内存所有权
- NativeFinalizer
- 阻塞 FFI 调用
- FFI 与 Isolate
- ABI 打包

### 4. Plugin

- Flutter Plugin 结构
- Federated Plugin
- Platform Interface
- Android 插件
- iOS 插件
- Web 插件
- Desktop 插件
- 插件注册
- 多 Engine 支持
- 插件测试与发布

### 5. 原生视图与混合工程

- PlatformView
- AndroidView
- UiKitView
- Texture
- Hybrid Composition
- Virtual Display
- 手势与焦点
- PlatformView 性能
- Add-to-App
- FlutterEngine
- FlutterEngineGroup
- Engine 预热与缓存
- 原生/Flutter 路由协作

## 十三、动画与交互

### 1. 动画基础

- Animation
- AnimationController
- Tween
- Curve
- Ticker
- VSync
- 隐式动画
- 显式动画
- AnimatedWidget
- AnimatedBuilder
- TweenAnimationBuilder
- 动画状态监听
- 动画资源释放

### 2. 动画进阶

- 多 Tween 编排
- Interval
- TweenSequence
- Staggered Animation
- Physics Simulation
- Hero
- Overlay 动画
- 页面转场
- Transform 动画
- 布局动画
- 动画性能

### 3. Pointer 与手势

- Pointer Event
- Hit Test
- HitTestBehavior
- PointerRouter
- GestureDetector
- GestureRecognizer
- Gesture Arena
- 手势冲突
- RawGestureDetector
- 自定义 GestureRecognizer
- IgnorePointer
- AbsorbPointer
- ModalBarrier

### 4. Focus 与输入

- FocusNode
- FocusScope
- FocusManager
- FocusTraversalPolicy
- TextField
- TextEditingController
- InputFormatter
- 软键盘 Insets
- Shortcuts
- Actions
- Intent
- 桌面快捷键

## 十四、图片、音视频与资源

### 1. 图片

- ImageProvider
- AssetImage
- NetworkImage
- FileImage
- MemoryImage
- ImageStream
- ImageCache
- 图片解码
- cacheWidth / cacheHeight
- 设备像素比
- 图片预加载
- 图片占位与失败
- 大图内存
- SVG
- WebP / AVIF

### 2. 字体与资源

- Asset Bundle
- pubspec 资源声明
- 自定义字体
- 字体回退
- 字体子集化
- 动态资源
- 多分辨率资源
- Package Asset
- 资源加载性能

### 3. 音视频

- 音视频播放器状态机
- Texture 渲染
- 首帧与缓冲
- Seek
- 后台播放
- 音频焦点
- 生命周期
- 播放缓存
- 多清晰度
- DRM
- 相机预览
- 录音与录像

## 十五、性能优化

### 1. 性能方法

- 性能指标定义
- Profile 模式
- 目标设备基准
- 帧预算
- 平均值与 P95/P99
- 单变量实验
- 性能预算
- 性能回归

### 2. DevTools

- Performance View
- Frame Chart
- Timeline
- CPU Profiler
- Memory View
- Heap Snapshot
- Allocation Profile
- Retaining Path
- Network View
- App Size Tool
- Inspector
- Repaint Rainbow
- Track Widget Builds
- Track Layouts
- Track Paints

### 3. 渲染性能

- Build 优化
- Rebuild 范围
- Layout 优化
- Intrinsic 测量
- Paint 优化
- RepaintBoundary
- Layer 数量
- Raster Cache
- Shader
- saveLayer
- 图片解码

### 4. 列表性能

- 懒构建
- itemExtent
- prototypeItem
- CacheExtent
- KeepAlive
- 图片复用
- 分页预取
- 滚动位置
- 复杂 Item 拆分

### 5. 启动性能

- 冷启动
- 热启动
- TTID
- TTFD
- Engine 初始化
- 插件初始化
- Dart 初始化
- 首屏依赖
- 延迟初始化
- 并行初始化
- `deferFirstFrame`

### 6. 内存性能

- 对象分配
- GC
- 内存泄漏
- Controller/Subscription 泄漏
- 闭包捕获
- 图片缓存
- 业务缓存
- 页面残留
- OOM

### 7. 包体积

- Dart AOT Snapshot
- Native Library
- Asset 分析
- ABI 拆分
- 字体子集
- 图片压缩
- Tree Shaking Icons
- 第三方 SDK 治理
- Debug Symbol

## 十六、测试与质量

### 1. Unit Test

- Test 生命周期
- Arrange-Act-Assert
- Matcher
- 异步测试
- 异常测试
- Mock
- Fake
- Stub
- fakeAsync
- 覆盖率

### 2. Widget Test

- WidgetTester
- Finder
- pump
- pumpWidget
- pumpAndSettle
- 手势模拟
- 文本输入
- 动画时间推进
- Provider 测试
- Router 测试
- Semantics 测试

### 3. Golden Test

- Golden File
- 像素对比
- 字体稳定性
- 多尺寸
- 多主题
- 平台差异
- Golden 更新流程

### 4. Integration Test

- integration_test
- 端到端流程
- 插件测试
- 真机与模拟器
- 测试数据隔离
- 稳定等待
- 截图与日志证据
- 性能 Trace

### 5. 测试架构

- 测试金字塔
- 可测试依赖注入
- 时间与随机数注入
- 网络替身
- 数据库测试
- Contract Test
- 性能测试
- 回归测试

## 十七、工程化与发布

### 1. 项目结构

- Feature First
- Layer First
- 模块边界
- 公共 API
- Design System
- 资源管理
- 环境隔离
- 代码所有权

### 2. 依赖管理

- pubspec.yaml
- pubspec.lock
- Semantic Versioning
- hosted/git/path 依赖
- dependency_overrides
- 依赖升级
- 依赖冲突
- 依赖健康度
- License
- 安全漏洞

### 3. 静态质量

- dart format
- dart analyze
- Lints
- Custom Lint
- 依赖边界检查
- 复杂度检查
- Dead Code
- CI 质量门禁

### 4. 构建配置

- Debug/Profile/Release
- Flavor
- Android Build Variant
- iOS Scheme/Configuration
- dart-define
- 运行时远端配置
- 代码生成
- 构建缓存
- 可重复构建

### 5. CI/CD

- Format
- Analyze
- Unit/Widget Test
- Integration Test
- Build
- 签名
- 制品管理
- 自动发布
- 灰度发布
- Feature Flag
- 回滚
- 性能门禁
- 包体门禁

### 6. 应用发布

- Android 签名
- iOS 证书与 Provisioning Profile
- App Store / Play Store
- 版本号与构建号
- 混淆
- Debug Symbol
- 崩溃符号化
- 隐私声明
- 权限合规
- 多渠道打包

## 十八、架构设计

### 1. 分层架构

- Presentation
- Application / UseCase
- Domain
- Data
- Repository Pattern
- Dependency Inversion
- DTO / Entity / ViewData
- Mapper
- Error Boundary
- 架构裁剪

### 2. 模块化

- 业务模块划分
- 基础设施模块
- 公共组件模块
- 路由契约
- 模块通信
- 循环依赖
- API 稳定性
- 独立测试
- 渐进式拆分
- Monorepo

### 3. 依赖注入

- Constructor Injection
- Service Locator
- DI Container
- Singleton
- Lazy Singleton
- Factory
- Scope
- 页面生命周期 Scope
- 测试 Override

### 4. 设计原则

- SOLID
- Composition over Inheritance
- Separation of Concerns
- Single Source of Truth
- Unidirectional Data Flow
- Immutability
- Fail Fast
- Graceful Degradation
- KISS
- YAGNI

### 5. 系统设计主题

- 高性能信息流
- 即时通讯
- 电商下单
- 搜索系统
- 音视频应用
- 地图应用
- 离线笔记
- 动态化页面
- 多租户应用
- 大型多团队应用
- 灰度与实验系统
- 客户端配置中心

## 十九、安全

### 1. 客户端安全

- 威胁模型
- Keychain / Keystore
- Secure Storage
- Token 安全
- 本地数据库加密
- 日志脱敏
- 截图保护
- 剪贴板风险
- Root/Jailbreak 检测
- 代码混淆
- 反调试边界

### 2. 网络安全

- HTTPS
- TLS 信任链
- Certificate Pinning
- Public Key Pinning
- 证书轮换
- 中间人攻击
- 重放攻击
- 请求签名
- 时间戳与 Nonce

### 3. 输入与链接安全

- Deep Link 校验
- WebView URL 白名单
- JavaScript Bridge
- XSS
- 文件访问
- 混合内容
- 输入验证
- 敏感权限

## 二十、可访问性与国际化

### 1. Accessibility

- Semantics Tree
- Semantics Label
- Role 与 State
- MergeSemantics
- ExcludeSemantics
- 阅读顺序
- 屏幕阅读器
- 动态字体
- 颜色对比度
- 触控尺寸
- Reduce Motion
- 键盘导航

### 2. 国际化

- Locale
- Localizations
- gen_l10n
- ARB
- 复数规则
- 性别规则
- 日期与时间
- 数字与货币
- RTL
- Directionality
- 文案长度适配
- 动态切换语言

## 二十一、多平台开发

### 1. Android

- Gradle
- Manifest
- Activity/Fragment 集成
- 权限
- 通知
- 后台任务
- 前台服务
- Deep Link
- App Bundle
- R8/ProGuard

### 2. iOS

- Xcode
- CocoaPods / Swift Package Manager
- Info.plist
- AppDelegate/SceneDelegate
- 权限
- Push Notification
- Background Mode
- Universal Link
- 签名与证书
- App Store 审核

### 3. Web

- Web Renderer
- CanvasKit / SkWasm
- Browser History
- URL Strategy
- 首屏加载
- SEO 边界
- PWA
- Service Worker
- CORS
- 浏览器存储
- 键盘与鼠标

### 4. Desktop

- Window 管理
- 多窗口
- Menu
- 系统托盘
- 文件选择
- 拖放
- 键盘快捷键
- 沙箱权限
- 应用签名
- 自动更新

## 二十二、稳定性与可观测性

### 1. 异常处理

- FlutterError
- PlatformDispatcher Error
- Zone
- Isolate Error
- PlatformException
- Native Crash
- 异常分级
- 用户兜底页
- 错误恢复

### 2. 日志

- 结构化日志
- Log Level
- Correlation ID
- 隐私脱敏
- 日志采样
- 本地日志轮转
- 远端日志上报

### 3. 监控

- Crash-Free Rate
- ANR
- 启动时间
- 帧率与卡顿率
- 内存与 OOM
- 网络成功率
- 核心业务成功率
- 版本与设备分布
- 告警

### 4. Trace 与治理

- 分布式 Trace
- 用户行为链路
- 网络请求链路
- 性能 Trace
- SLO
- Error Budget
- Feature Flag
- 灰度
- 熔断
- 降级
- 回滚
- 故障复盘

## 二十三、Flutter 源码专题

- `runApp` 启动调用链
- Binding 初始化调用链
- `setState` 到 `performRebuild`
- Widget 更新与 Element 协调
- InheritedWidget 依赖注册与通知
- `markNeedsLayout` 传播
- PipelineOwner `flushLayout`
- `markNeedsPaint` 与 `flushPaint`
- 一帧调度调用链
- Pointer Event 分发
- Hit Test 调用链
- Gesture Arena 调用链
- Navigator Push/Pop 调用链
- Overlay 挂载机制
- Scrollable 与 ScrollPosition
- SliverList 子节点创建与回收
- ImageProvider 加载与缓存
- Hero 动画调用链
- Platform Channel 消息链路
- Semantics Tree 构建

