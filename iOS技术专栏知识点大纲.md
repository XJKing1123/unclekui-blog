# iOS 技术专栏知识点大纲

> 本大纲用于组织 iOS 深度技术文章，重点覆盖 Swift、UIKit、SwiftUI、Apple 平台运行机制、架构、性能、安全、测试与发布工程。涉及系统 API、编译器、运行时或平台行为时，应标注 Xcode、Swift、SDK、最低部署版本、设备与验证日期。

## 一、Swift 语言基础

### 1. 类型系统

- Value Type 与 Reference Type
- `struct`、`class`、`enum`
- Optional 与 Optional Chaining
- Generic 与 Generic Constraint
- Protocol 与 Protocol Composition
- Associated Type
- Existential Type 与 `any`
- Opaque Type 与 `some`
- Type Erasure
- Variance 边界
- Access Control
- Property Wrapper
- Result Builder

### 2. 值语义与所有权

- Copy-on-write
- Identity 与 Equality
- Mutation 与 `inout`
- Heap、Stack 与优化边界
- ARC（Automatic Reference Counting）
- Strong、Weak 与 Unowned
- Retain Cycle
- Closure Capture List
- Ownership、Borrowing 与 Consuming
- Exclusivity Enforcement
- 生命周期与析构

### 3. 错误处理

- `Error` 协议
- `throws`、`try` 与 `catch`
- Typed Throws 的版本边界
- `Result`
- Optional 与 Error 的语义差异
- 错误转换与上下文保留
- CancellationError
- `fatalError`、Assertion 与 Precondition
- 可恢复错误与程序员错误

## 二、Swift 编译与运行时

### 1. 编译管线

- Swift Source
- AST
- SIL（Swift Intermediate Language）
- LLVM IR
- Machine Code
- Module Interface
- Incremental Compilation
- Whole-module Optimization
- Link-time Optimization
- Debug 与 Release 差异
- Build Setting 对产物的影响

### 2. 类型与调用派发

- Static Dispatch
- Virtual Dispatch
- Witness Table
- Protocol Witness
- Objective-C Message Dispatch
- Dynamic Replacement
- Inlining 与 Specialization
- Existential Container
- Metadata
- ABI Stability
- Module Stability

### 3. Objective-C Runtime

- `isa` 与 Class Object
- Method List
- Selector 与 IMP
- Message Sending
- Method Cache
- Category
- Associated Object
- Method Swizzling 风险
- KVC 与 KVO
- Runtime Introspection
- Swift 与 Objective-C 互操作边界

### 4. Mach-O 与动态链接

- Mach-O Header
- Load Command
- Segment 与 Section
- Symbol Table
- Static Library 与 Dynamic Library
- Framework 与 XCFramework
- dyld
- Symbol Binding
- Code Signing
- ASLR
- dSYM 与符号化

## 三、iOS 应用与进程模型

### 1. 应用启动

- Process Creation
- dyld Loading
- Runtime Initialization
- `main`
- `UIApplicationMain`
- App Delegate
- Scene Delegate
- SwiftUI `App`
- Pre-main 与 Post-main
- Cold、Warm 与 Resume Launch
- 首帧与首个可交互帧

### 2. 应用生命周期

- App State
- Scene State
- Active、Inactive 与 Background
- Multi-window
- Background Time
- Suspension
- Termination
- State Restoration
- Memory Warning
- Protected Data Availability
- 生命周期事件的幂等处理

### 3. 后台执行

- Background Task
- `BGAppRefreshTask`
- `BGProcessingTask`
- Background URLSession
- Background Audio
- Location Update
- Push Notification
- Silent Push
- 系统调度与配额
- Expiration Handler
- 任务恢复与数据一致性

### 4. 沙盒与系统边界

- App Sandbox
- Container
- Bundle 与 Data Container
- App Group
- Entitlement
- Capability
- Extension Process
- XPC 概念
- Keychain Access Group
- File Protection
- Privacy Manifest

## 四、UIKit 核心机制

### 1. 视图与控制器

- `UIView`
- `UIViewController`
- View Hierarchy
- Controller Containment
- Presentation
- Navigation
- Trait Collection
- Safe Area
- Layout Guide
- View 生命周期
- Appearance Callback

### 2. 事件与响应链

- Run Loop 输入源
- Touch Delivery
- Hit Testing
- Gesture Recognizer
- Responder Chain
- Target-action
- Control Event
- First Responder
- Keyboard Event
- Pointer 与 Focus
- 事件冲突和协调

### 3. Auto Layout

- Constraint Equation
- Intrinsic Content Size
- Content Hugging
- Compression Resistance
- Priority
- Ambiguous Layout
- Unsatisfiable Constraint
- Layout Pass
- `updateConstraints`
- `layoutSubviews`
- Self-sizing Cell
- 性能与调试方法

### 4. 列表与数据源

- UITableView 与 UICollectionView
- Cell Reuse
- Prefetching
- Diffable Data Source
- Snapshot Identity
- Compositional Layout
- Batch Update
- Self-sizing
- 图片加载与取消
- 滚动状态保留
- 大数据集性能

## 五、SwiftUI 核心机制

### 1. 声明式模型

- View 是值描述
- View Identity
- Structural Identity
- Explicit Identity
- View Tree
- Environment
- Modifier
- Result Builder
- Conditional Content
- 生命周期与可见性边界

### 2. 状态与数据流

- `@State`
- `@Binding`
- `@Environment`
- Observation
- `@Observable`
- `@StateObject` 与 `@ObservedObject` 的版本背景
- Single Source of Truth
- Derived State
- State Ownership
- 状态初始化与重建
- 异步状态竞态

### 3. 更新与布局

- Dependency Tracking
- Body Evaluation
- Diffing
- Transaction
- Layout Proposal
- Size Response
- Alignment
- Preference
- Geometry
- Animation Transaction
- 无效更新定位

### 4. 导航与 UIKit 互操作

- NavigationStack
- NavigationPath
- Typed Destination
- Deep Link
- Sheet 与 Full-screen Cover
- State Restoration
- `UIViewRepresentable`
- `UIViewControllerRepresentable`
- Coordinator
- 生命周期同步
- 渐进式迁移

## 六、渲染与图形系统

### 1. Core Animation

- Layer Tree
- Model Layer 与 Presentation Layer
- Transaction
- Implicit Animation
- Explicit Animation
- Layout、Display 与 Commit
- Render Server
- Offscreen Rendering
- Rasterization
- Mask、Shadow 与 Blend
- 动画中断与状态一致性

### 2. 图形与媒体

- Core Graphics
- Core Image
- Metal
- Texture
- Command Buffer
- Display Link
- ImageIO
- Color Space
- HDR 与 Wide Color
- 像素尺寸与逻辑尺寸
- GPU Capture

### 3. 帧性能

- 屏幕刷新率
- 60 Hz、120 Hz 与帧预算
- Main Thread
- Render Loop
- CPU 与 GPU 瓶颈
- Hitch
- Commit 延迟
- 滚动卡顿
- Animation Hitches
- Instruments 测量
- 真机 Release 配置验证

## 七、并发与异步

### 1. GCD 与 Run Loop

- Serial 与 Concurrent Queue
- Main Queue
- Sync 与 Async
- QoS
- Dispatch Group
- Semaphore
- Barrier
- Dispatch Source
- Run Loop Mode
- Timer
- Deadlock 与 Priority Inversion

### 2. Swift Concurrency

- `async` / `await`
- Structured Concurrency
- Task Tree
- Child Task
- Task Group
- Unstructured Task
- Detached Task
- Cancellation
- Task Priority
- Continuation
- AsyncSequence

### 3. Actor 隔离

- Actor
- MainActor
- Global Actor
- Isolation Domain
- `Sendable`
- Data Race Safety
- Reentrancy
- Nonisolated
- 跨隔离调用
- Objective-C 回调桥接
- 编译语言模式差异

### 4. 并发工程实践

- UI 更新隔离
- 请求取消
- 搜索防抖
- 重复提交治理
- Token 刷新合并
- Actor 重入竞态
- Continuation 单次恢复
- Callback 桥接
- 并发测试
- Thread Sanitizer

## 八、网络与数据传输

### 1. URL Loading System

- URLSession
- URLRequest
- URLSessionTask
- Delegate
- Session Configuration
- Connection Pool
- HTTP/2 与 HTTP/3 的系统协商
- Cache Policy
- Cookie
- Authentication Challenge
- Background Transfer

### 2. 请求治理

- API Client 分层
- Request Builder
- Response Validation
- Typed Error
- Retry 与 Backoff
- Idempotency
- Timeout
- Cancellation
- Token Refresh Single-flight
- Rate Limit
- 弱网与离线状态

### 3. 安全传输

- App Transport Security
- TLS
- Trust Evaluation
- Certificate Pinning 代价
- Client Certificate
- Secret 管理
- 敏感日志脱敏
- Replay Attack
- Request Signing
- Network Extension 边界

## 九、存储与数据一致性

### 1. 本地存储选择

- UserDefaults
- File System
- Keychain
- SQLite
- Core Data
- SwiftData
- Cache
- 数据规模与查询模式
- 安全等级
- 生命周期与迁移成本

### 2. Core Data 与 SwiftData

- Model
- Persistent Store
- Context
- Object Identity
- Faulting
- Fetch
- Relationship
- Save
- Merge Policy
- Concurrency
- Batch Operation
- Persistent History

### 3. 数据迁移与一致性

- Schema Version
- Lightweight Migration
- Custom Migration
- Atomic Write
- Transaction
- Conflict Resolution
- Cache Invalidation
- Offline-first
- Optimistic Update
- Sync State Machine
- 数据损坏恢复

## 十、架构与状态设计

### 1. 分层与依赖

- Presentation
- Domain
- Data
- Dependency Rule
- Repository
- Use Case
- Dependency Injection
- Composition Root
- Module Boundary
- Public API
- 循环依赖治理

### 2. UI 架构模式

- MVC
- MVVM
- Coordinator
- Redux / Unidirectional Data Flow
- The Composable Architecture 概念
- VIPER 的适用边界
- 状态所有权
- Side Effect
- Navigation State
- 测试替身
- 团队复杂度成本

### 3. 状态建模

- Domain State 与 View State
- Persistent、Session 与 Ephemeral State
- Loading / Content / Empty / Error
- State Machine
- Impossible State
- Derived State
- Event 与 Command
- Reducer
- 异步结果过期
- 乐观更新与回滚

## 十一、模块化与依赖管理

### 1. 模块边界

- Feature Module
- Core Module
- Interface Module
- Dependency Graph
- Access Control
- Resource Bundle
- 模块间导航
- 跨模块通信
- Build Time
- Ownership

### 2. Swift Package Manager

- Package Manifest
- Product 与 Target
- Source Dependency
- Binary Target
- Resource
- Version Requirement
- Lockfile
- Build Tool Plugin
- Macro Target
- 依赖供应链安全

### 3. 二进制与兼容性

- Static 与 Dynamic Linking
- Framework
- XCFramework
- ABI 与 API Compatibility
- Library Evolution
- Symbol Visibility
- Size Cost
- Startup Cost
- Debug Symbol
- Distribution 策略

## 十二、音视频与相机

### 1. AVFoundation

- Asset
- Player Item
- AVPlayer
- Timebase
- Buffering
- Seek
- Playback State
- Interruption
- Route Change
- Background Playback
- DRM 与 FairPlay 边界

### 2. Capture Pipeline

- Capture Session
- Input
- Output
- Preview Layer
- Photo Capture
- Video Data Output
- Audio Session
- Permission
- Session Interruption
- 前后台切换
- 资源释放

### 3. 媒体工程实践

- 播放状态机
- 首帧时间
- 卡顿率
- 缓冲策略
- 音画同步
- 远程控制
- Now Playing
- Picture in Picture
- 编解码能力协商
- 真机功耗测量

## 十三、系统能力与扩展

### 1. Notification 与 Deep Link

- APNs
- Device Token
- Notification Service Extension
- Notification Content Extension
- Authorization
- Foreground Presentation
- Universal Link
- Custom URL Scheme
- Route Validation
- 冷启动路由恢复

### 2. App Extension

- WidgetKit
- Share Extension
- Live Activities
- App Intents
- Extension Lifecycle
- Memory Limit
- Shared Container
- Timeline
- Host Communication
- 数据新鲜度

### 3. 权限与隐私

- Purpose String
- Authorization State
- Limited Access
- Tracking Transparency
- Privacy Nutrition Label
- Privacy Manifest
- Required Reason API
- 数据最小化
- 撤销授权后的降级
- 审核合规

## 十四、安全工程

### 1. 威胁模型

- Asset、Actor 与 Trust Boundary
- Device Compromise
- Man-in-the-middle
- Credential Theft
- Tampering
- Replay
- Injection
- Social Engineering
- Client 不可信边界
- 服务端强制校验

### 2. 数据与凭证保护

- Keychain
- Secure Enclave
- Data Protection Class
- LocalAuthentication
- Token 生命周期
- 密钥轮换
- Clipboard 风险
- Screenshot 风险
- Backup 边界
- 日志与崩溃数据脱敏

### 3. 二进制与供应链

- Code Signing
- Provisioning Profile
- Entitlement 审计
- Dependency Pinning
- SBOM
- Secret Scanning
- Binary Inspection
- Jailbreak 检测局限
- Anti-debugging 局限
- 安全响应与版本撤回

## 十五、性能与能耗

### 1. 测量方法

- Release 配置
- 目标真机
- 基线与对照组
- Signpost
- MetricKit
- XCTest Metric
- Instruments
- Time Profiler
- Allocations
- System Trace
- 可复现实验记录

### 2. 启动性能

- Pre-main
- Dynamic Library Loading
- Static Initializer
- Post-main
- Scene Construction
- 首帧
- 首个可交互帧
- MetricKit Launch Metric
- Organizer Metrics
- 延迟初始化
- 回归阈值

### 3. 内存

- Memory Footprint
- Heap Allocation
- Retain Cycle
- Autorelease Pool
- Image Memory
- Cache Policy
- Memory Pressure
- Jetsam
- Leaks Instrument
- Memory Graph
- 峰值与稳态

### 4. 能耗与网络

- CPU Wakeup
- Timer Coalescing
- Background Activity
- Radio Tail Energy
- Batch Request
- Location Accuracy
- Animation Cost
- Thermal State
- Low Power Mode
- Energy Log
- 场景化验证

## 十六、稳定性与可观测性

### 1. Crash 与 Hang

- Mach Exception
- Signal
- Swift Runtime Trap
- Objective-C Exception
- Watchdog Termination
- Main-thread Hang
- OOM 与 Jetsam
- Crash Log
- Symbolication
- 根因聚类

### 2. 监控体系

- Crash-free User / Session
- Hang Rate
- Launch Metric
- Scroll Hitch
- Network Failure
- Business SLI
- Trace ID
- Breadcrumb
- Sampling
- Privacy 与数据质量

### 3. 故障治理

- Release Health
- Feature Flag
- Staged Rollout
- Kill Switch
- Configuration Rollback
- Incident Severity
- Triage
- Root Cause Analysis
- Action Item
- 回归验证

## 十七、测试体系

### 1. 单元与集成测试

- XCTest
- Swift Testing
- Test Lifecycle
- Async Test
- Deterministic Clock
- Dependency Injection
- Mock、Stub、Fake 与 Spy
- URLProtocol Stub
- Database Test
- 并发与取消测试
- Failure Diagnostics

### 2. UI 测试

- XCUITest
- Accessibility Identifier
- Launch Argument
- Launch Environment
- Page Object
- Synchronization
- Deep Link 测试入口
- Permission Dialog
- Screenshot
- Flaky Test 治理

### 3. 质量策略

- Test Pyramid
- Contract Test
- Snapshot Test
- Property-based Test
- Performance Test
- Regression Suite
- Test Plan
- Device Matrix
- Coverage 的边界
- 线上指标验证

## 十八、构建、签名与发布

### 1. Xcode 构建系统

- Project 与 Workspace
- Target
- Scheme
- Build Configuration
- Build Setting
- Build Phase
- Dependency Analysis
- Derived Data
- Compilation Cache
- Build Log 分析

### 2. 签名与制品

- Certificate
- Private Key
- App ID
- Provisioning Profile
- Entitlement
- Development 与 Distribution
- Archive
- Export
- IPA
- dSYM
- 自动签名与手动签名

### 3. CI/CD 与发布

- Clean Build Environment
- Dependency Cache
- Secret 管理
- Automated Test
- Static Analysis
- Code Signing Automation
- TestFlight
- App Store Connect
- Phased Release
- Version 与 Build Number
- Rollback 限制与止损策略

## 十九、国际化与无障碍

### 1. 国际化

- String Catalog
- Locale
- Plural
- Format Style
- Date、Number 与 Currency
- Right-to-left Layout
- Dynamic Content
- 本地化资源回退
- 截断测试
- 伪本地化

### 2. Accessibility

- VoiceOver
- Accessibility Label
- Trait
- Value 与 Hint
- Focus Order
- Dynamic Type
- Reduce Motion
- Increase Contrast
- Switch Control
- Accessibility Inspector
- 自动化审计边界

## 二十、系统设计与面试主线

### 1. 典型系统设计

- Feed
- Chat
- 电商列表与详情
- 离线阅读
- 图片管线
- 音视频播放器
- 地图与定位
- 推送与 Deep Link
- 多账号体系
- 大型模块化应用

### 2. 方案评估维度

- 正确性
- 生命周期
- 并发安全
- 性能与能耗
- 可测试性
- 可观测性
- 安全与隐私
- 向后兼容
- 团队认知成本
- 迁移与维护成本

### 3. 回答方法

- 明确目标与约束
- 区分公开契约和内部实现
- 画出对象、线程与数据流
- 描述正常、异常和取消路径
- 给出备选方案及代价
- 用指标建立性能基线
- 说明版本和平台边界
- 设计测试与灰度验证
- 用线上反馈闭环

## 建议专栏阅读路径

1. 先掌握 Swift 类型、内存、编译与并发模型。
2. 再理解应用生命周期、UIKit、SwiftUI 与渲染管线。
3. 进入网络、存储、状态设计、架构与模块化。
4. 补齐音视频、系统能力、安全与隐私边界。
5. 最后用性能、稳定性、测试和发布体系形成工程闭环。

> 大纲中的内部机制会随 Swift、Xcode 和 iOS SDK 演进。写作时应优先依据公开 API 契约；分析实现细节时，需要固定版本并通过当前编译器产物、系统文档、源码或 Instruments 结果交叉验证。
