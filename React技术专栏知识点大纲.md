# React 技术专栏知识点大纲

> 本大纲用于组织 React 深度技术文章。内容以现代 React、TypeScript 和生产级 Web 工程为主，涉及框架内部实现时应标注 React、构建工具与运行环境版本。

## 一、JavaScript 与 TypeScript 基础

### 1. JavaScript 执行模型

- Execution Context
- Lexical Environment
- Scope Chain
- Closure
- `this` 绑定
- Prototype Chain
- Property Descriptor
- Module Scope
- ESM 与 CommonJS
- Tree Shaking 边界

### 2. Event Loop 与异步

- Call Stack
- Task / Microtask
- Promise 状态与链式调用
- `async` / `await`
- Timer
- DOM Event
- Fetch 生命周期
- AbortController
- 异步竞态
- 并发限制
- Web Worker

### 3. TypeScript 类型系统

- Structural Typing
- Type Inference
- Union / Intersection
- Discriminated Union
- Generic
- Conditional Type
- Mapped Type
- Template Literal Type
- Type Narrowing
- Variance
- `unknown` / `any` / `never`
- 类型守卫
- 类型断言边界
- Runtime Validation

## 二、React 核心模型

### 1. 声明式 UI

- UI 作为 State 的函数
- Component
- Element
- JSX 转换
- Props
- State
- 单向数据流
- Composition
- Controlled / Uncontrolled
- Component Identity

### 2. Render 与 Commit

- Trigger
- Render Phase
- Reconciliation
- Commit Phase
- DOM Mutation
- Layout Effect
- Passive Effect
- Browser Paint
- Render Purity
- Strict Mode
- 可中断渲染边界

### 3. Fiber

- Fiber Node
- Current Tree
- Work-in-progress Tree
- Fiber Root
- `beginWork`
- `completeWork`
- Double Buffering
- Lanes
- Update Queue
- Scheduler
- Time Slicing
- Bailout
- 版本相关实现边界

### 4. Reconciliation

- Element Type
- `key`
- 同层比较
- 列表插入与移动
- State 保留与重置
- 条件渲染位置
- Fragment Key
- 不稳定 Key
- 重建成本

## 三、组件与状态设计

### 1. 状态分类

- Ephemeral State
- Component State
- Page State
- Application State
- Server State
- URL State
- Form State
- Single Source of Truth
- Derived State
- 状态提升
- 状态下沉

### 2. 不可变更新

- Reference Equality
- Shallow Copy
- Structural Sharing
- 数组更新
- 嵌套对象更新
- Normalized State
- Immer 边界
- 大对象复制成本

### 3. UI 状态机

- Idle / Loading / Success / Error
- Stale + Refreshing
- Discriminated Union
- 非法状态
- 状态转换
- Side Effect
- Command / Event / State
- Optimistic State
- Rollback

### 4. 组件 API 设计

- Props 最小化
- Boolean Trap
- Compound Components
- Render Props
- Headless Components
- Controlled State
- Slot
- Context API
- Ref API
- 组件所有权
- 可访问性契约

## 四、Hooks

### 1. Hooks 运行机制

- Hook 调用顺序
- Fiber Hook List
- Dispatcher
- Update Queue
- 闭包快照
- Rules of Hooks
- Strict Mode 双重调用
- 自定义 Hook

### 2. `useState` 与 `useReducer`

- Lazy Initializer
- Functional Update
- Batching
- State Snapshot
- Object.is
- Reducer Purity
- Action 设计
- 状态重置

### 3. `useEffect`

- Synchronization
- Dependency Array
- Cleanup
- Stale Closure
- Race Condition
- AbortController
- 订阅释放
- Strict Mode 重执行
- Effect 拆分
- 不需要 Effect 的场景

### 4. `useLayoutEffect` 与浏览器绘制

- DOM Mutation 后执行
- Browser Paint 前执行
- Layout Measurement
- 同步阻塞
- SSR Warning
- Flicker
- `requestAnimationFrame`

### 5. Memoization

- `memo`
- `useMemo`
- `useCallback`
- Reference Stability
- Dependency 成本
- 缓存失效
- React Compiler 边界
- 过度 Memoization

### 6. Ref

- `useRef`
- DOM Ref
- Mutable Escape Hatch
- Callback Ref
- Ref Cleanup
- `forwardRef`
- Imperative Handle
- Ref 与状态的边界

## 五、并发 React 与异步 UI

### 1. 并发渲染

- Interruptible Render
- Priority
- Lanes
- Transition
- Urgent / Non-urgent Update
- Render Restart
- Tear-free UI
- Commit 原子性

### 2. Transition

- `startTransition`
- `useTransition`
- Pending State
- Input Responsiveness
- Transition 中的异步边界
- 与防抖的区别
- 与数据请求库协作

### 3. Deferred Value

- `useDeferredValue`
- Stale Content
- Background Render
- Suspense 协作
- CPU 密集筛选
- 不替代网络防抖

### 4. Suspense

- Suspense Boundary
- Fallback
- Reveal Strategy
- Nested Boundary
- SuspenseList 适用性
- Code Splitting
- Data Suspense
- Error Boundary
- SSR Streaming

## 六、Context 与状态管理

### 1. Context

- Provider
- Consumer
- Context 传播
- Provider Value 稳定性
- Context 粒度
- 默认值陷阱
- 模块边界
- 测试替换

### 2. 外部 Store 协议

- `useSyncExternalStore`
- Snapshot
- Subscribe
- Concurrent Rendering 一致性
- Server Snapshot
- Tear 防护
- Store 生命周期

### 3. 状态管理选型

- Local State
- Context + Reducer
- Redux Toolkit
- Zustand
- MobX
- XState
- 原子化状态
- 复杂度
- 性能
- 可测试性
- 团队约束

### 4. Redux

- Store
- Reducer
- Dispatch
- Middleware
- Selector
- Normalization
- Redux Toolkit
- Async Thunk
- RTK Query
- DevTools
- 不可变更新

## 七、Server State 与请求治理

### 1. 数据请求

- Fetch
- AbortController
- Request / Response
- HTTP Error
- JSON Validation
- Authentication
- Retry
- Timeout
- Request Deduplication
- Race Condition

### 2. Query Cache

- Query Key
- Stale Time
- Garbage Collection Time
- In-flight Deduplication
- Background Refetch
- Invalidation
- Dependent Query
- Parallel Query
- Pagination
- Infinite Query
- Prefetch

### 3. Mutation

- Mutation State
- Optimistic Update
- Rollback
- Invalidation
- Idempotency Key
- Duplicate Submission
- Offline Mutation
- Conflict Resolution

### 4. React Query / SWR

- Server State 边界
- Cache 生命周期
- Stale-while-revalidate
- Suspense 集成
- SSR Hydration
- 错误重试
- Window Focus Refetch
- 网络恢复刷新

## 八、表单

### 1. 表单状态

- Controlled Input
- Uncontrolled Input
- Default Value
- Dirty / Touched
- Sync Validation
- Async Validation
- Cross-field Validation
- Submit State
- Reset

### 2. 表单工程

- React Hook Form
- Formik 边界
- Schema Validation
- Zod
- Server Error Mapping
- Dynamic Fields
- Field Array
- 大型表单性能
- 草稿保存
- 防重复提交

## 九、路由与 URL 状态

### 1. 客户端路由

- History API
- Route Matching
- Nested Route
- Layout Route
- Route Params
- Search Params
- Navigation State
- Loader / Action
- Error Boundary

### 2. 路由工程

- Authentication Guard
- Permission
- Deep Link
- Redirect Loop
- Scroll Restoration
- Unsaved Changes
- Route-level Code Splitting
- Prefetch
- Navigation Race

## 十、性能优化

### 1. 性能方法

- Performance Budget
- User-centric Metrics
- React Profiler
- Browser Performance Panel
- CPU Throttling
- Network Throttling
- P50/P95/P99
- 单变量实验
- 性能回归

### 2. Web Vitals

- LCP
- INP
- CLS
- TTFB
- FCP
- Field / Lab Data
- PerformanceObserver
- Attribution
- 长任务

### 3. React 渲染性能

- Unnecessary Render
- State Colocation
- Component Split
- Memoization
- Stable Props
- Context Update
- Selector
- Expensive Calculation
- Profiler Flamegraph

### 4. 列表与大数据

- Virtualization
- Windowing
- Overscan
- Dynamic Height
- Stable Key
- Incremental Rendering
- Pagination
- Worker 计算

### 5. 资源与网络

- Code Splitting
- Dynamic Import
- Bundle Analysis
- Preload / Prefetch
- Image Optimization
- Font Loading
- HTTP Cache
- CDN
- Compression
- Third-party Script

## 十一、服务端渲染与 React Server Components

### 1. 渲染策略

- CSR
- SSR
- SSG
- ISR
- Streaming SSR
- Edge Runtime
- 适用场景与成本

### 2. Hydration

- Server HTML
- Client Hydration
- Hydration Mismatch
- Selective Hydration
- Event Replay
- 时间、随机数和 Locale
- Browser-only API

### 3. React Server Components

- Server / Client Component Boundary
- Flight Protocol 概念
- Data Fetching
- Serialization Boundary
- Bundle Reduction
- Server Action
- Cache
- 安全边界
- 框架相关实现

### 4. Next.js 工程

- App Router
- Layout
- Route Handler
- Middleware
- Metadata
- Dynamic Rendering
- Cache / Revalidation
- Loading / Error Boundary
- Deployment Runtime
- 版本相关行为

## 十二、DOM、浏览器与样式

### 1. 浏览器渲染

- DOM / CSSOM
- Style Calculation
- Layout
- Paint
- Composite
- Forced Synchronous Layout
- Layer
- Animation

### 2. 事件系统

- Event Propagation
- Capture / Bubble
- Synthetic Event
- Event Delegation
- Passive Listener
- Pointer Event
- Keyboard Event
- Composition Event

### 3. 样式方案

- CSS Modules
- CSS-in-JS
- Utility CSS
- Design Token
- Theme
- Runtime / Build-time CSS
- Critical CSS
- Style Isolation
- SSR 支持

## 十三、可访问性与国际化

### 1. Accessibility

- Semantic HTML
- ARIA
- Accessible Name
- Keyboard Navigation
- Focus Management
- Focus Trap
- Screen Reader
- Dynamic Content Announcement
- Color Contrast
- Reduced Motion

### 2. Internationalization

- Locale
- Message Catalog
- ICU Message
- Plural
- Date / Number / Currency
- Time Zone
- RTL
- Dynamic Locale
- Translation Fallback
- SSR Locale Detection

## 十四、测试

### 1. 单元与组件测试

- Vitest / Jest
- React Testing Library
- User-centric Query
- `userEvent`
- `act`
- Async Assertion
- Fake Timer
- Hook Test
- Mock / Fake

### 2. 集成与 E2E

- Playwright
- Cypress 边界
- API Mock
- MSW
- Authentication State
- Visual Regression
- Accessibility Test
- Flaky Test
- Trace / Screenshot / Video

### 3. 测试策略

- Test Pyramid
- Contract Test
- Critical User Journey
- Concurrent UI
- Suspense
- Error Boundary
- Race Condition
- Performance Test

## 十五、工程化

### 1. 构建工具

- Vite
- Webpack
- Rspack
- Turbopack
- Babel
- SWC
- esbuild
- Module Resolution
- Source Map
- HMR

### 2. 代码质量

- ESLint
- Type-aware Lint
- Prettier
- Type Check
- Dependency Boundary
- Circular Dependency
- Dead Code
- Bundle Budget
- CI Quality Gate

### 3. Monorepo

- Workspace
- pnpm
- Nx
- Turborepo
- Package Boundary
- Task Graph
- Remote Cache
- Versioning
- Changesets
- Internal Package

### 4. 发布与可观测性

- Environment Configuration
- Source Map Upload
- Error Monitoring
- Web Vitals
- Trace
- Feature Flag
- Canary Release
- Rollback
- CSP Reporting

## 十六、架构设计

### 1. 前端分层

- Presentation
- Application
- Domain
- Infrastructure
- Feature First
- Dependency Inversion
- DTO / Entity / ViewModel
- Error Boundary
- 架构裁剪

### 2. 模块化

- Feature Module
- Shared Kernel
- Design System
- Public API
- Route Contract
- Cross-module Communication
- Circular Dependency
- Independent Test
- Incremental Migration

### 3. Micro Frontend

- Runtime Integration
- Build-time Integration
- Module Federation
- Routing Ownership
- State Isolation
- Style Isolation
- Dependency Sharing
- Version Compatibility
- Deployment Independence
- 适用边界

### 4. Design System

- Design Token
- Component Contract
- Variant
- Accessibility
- Theme
- Documentation
- Storybook
- Visual Regression
- Versioning
- Breaking Change

## 十七、安全

### 1. Web 安全

- XSS
- CSRF
- CSP
- Trusted Types
- CORS
- SameSite Cookie
- Token Storage
- Clickjacking
- Open Redirect
- Prototype Pollution

### 2. React 安全边界

- JSX Escape
- `dangerouslySetInnerHTML`
- URL Validation
- Third-party HTML Sanitization
- Server Component Data Exposure
- Source Map
- Dependency Supply Chain
- Secret in Client Bundle

## 十八、系统设计主题

### 1. 高性能信息流

- Feed Pagination
- Virtual List
- Image Pipeline
- Optimistic Interaction
- Cache Consistency
- Prefetch
- Web Vitals

### 2. 实时协作

- WebSocket
- Presence
- Optimistic Update
- Conflict Resolution
- Operation ID
- Reconnect
- Offline Queue

### 3. 中后台系统

- Permission Model
- Dynamic Route
- Schema-driven Form
- Large Table
- Query State
- Audit Log
- Multi-tenant

### 4. 渐进迁移

- Legacy React Upgrade
- Class to Function Component
- State Library Migration
- CSR to SSR
- JavaScript to TypeScript
- Micro Frontend 边界
- 灰度与回滚
