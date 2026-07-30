export const SITE = {
  title: '奎叔技术笔记',
  shortTitle: '奎叔笔记',
  description: '面向 Flutter、iOS、React 与 Web3 工程师的深度技术专栏，记录框架原理、性能、架构、安全与稳定性实践。',
  author: {
    name: '奎叔',
    role: 'Flutter / iOS / React / Web3 Engineer',
    bio: '持续记录可验证、可落地的 Flutter、iOS、React、Web3 与软件工程实践。',
    email: 'JKingx1123@gmail.com',
    avatar: '/author-placeholder.png',
  },
  nav: [
    { label: '首页', href: '/' },
    { label: '专栏', href: '/series' },
    { label: '知识地图', href: '/knowledge-map' },
    { label: '文章', href: '/posts' },
    { label: '关于', href: '/about' },
  ],
} as const;

export const SERIES = {
  ios: {
    name: 'iOS 工程实践',
    description: '深入 Swift、UIKit、SwiftUI、系统运行机制、架构、性能、安全与 App 工程治理。',
  },
  web3: {
    name: 'Web3 工程实践',
    description: '从区块链、EVM 和智能合约出发，构建安全、可验证、可观测的 DApp 与链上协议。',
  },
  react: {
    name: 'React 工程实践',
    description: '深入 React 渲染机制、Hooks、状态与数据流、性能、服务端渲染和大型前端工程治理。',
  },
  dart: {
    name: 'Dart 语言与运行时',
    description: '深入 Dart 类型系统、异步模型、编译管线、运行时与内存管理。',
  },
  'state-management': {
    name: '状态与数据流',
    description: '围绕状态建模、数据流向、并发一致性与界面响应构建可预测的 Flutter 应用。',
  },
  networking: {
    name: '网络与请求治理',
    description: '治理请求生命周期、认证刷新、重试、幂等性与弱网环境下的数据一致性。',
  },
  'framework-internals': {
    name: '框架原理',
    description: '从三棵树、渲染管线到混合开发，理解 Flutter 的运行机制。',
  },
  'rendering-painting': {
    name: '渲染与绘制',
    description: '深入帧调度、布局、绘制、图层合成与栅格化，建立可验证的 Flutter 渲染性能模型。',
  },
  'performance-reliability': {
    name: '性能与稳定性',
    description: '用指标、Trace 和故障闭环建设可观测、可恢复的客户端。',
  },
  security: {
    name: '客户端安全',
    description: '从威胁模型出发，建立输入、凭证、存储和运行环境的纵深防御。',
  },
  engineering: {
    name: '工程架构',
    description: '围绕模块边界、依赖管理和本地化建设可持续演进的工程体系。',
  },
} as const;

export type SeriesKey = keyof typeof SERIES;

export const COLUMNS = {
  flutter: {
    name: 'Flutter 工程实践',
    description: '深入 Flutter 框架原理、状态与数据流、性能、架构、安全和工程治理。',
  },
  ios: SERIES.ios,
  react: SERIES.react,
  web3: SERIES.web3,
} as const;

export type ColumnKey = keyof typeof COLUMNS;
