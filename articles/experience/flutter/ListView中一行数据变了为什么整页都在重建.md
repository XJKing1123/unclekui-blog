---
title: "ListView 中一行数据变了，为什么整页都在重建？"
description: "解释 Flutter 列表中父级 setState 的重建范围，并说明如何通过状态下沉、按项订阅和稳定身份缩小更新成本。"
publishDate: 2026-07-31
updatedDate: 2026-07-31
tags: [Flutter, ListView, Rebuild, setState, 状态管理]
series: experience
order: 8
slug: flutter-list-item-update-and-page-rebuild
draft: false
---

# `ListView` 中一行数据变了，为什么整页都在重建？

列表里点了一行“完成”，日志却显示页面的 `build` 又执行了一次。打开重建统计后，屏幕上不少组件都在闪，看起来像是改一条数据，整页都重新画了一遍。

先别急着优化。这里经常混淆了两件事：父组件重新执行 `build`，以及整页重新布局、绘制和栅格化。

> 核心结论：如果列表数据由页面 State 持有，页面调用 `setState` 后重新执行 `build` 是正常行为。但 Rebuild 不等于整页完成 Relayout、Repaint 和 Raster，是否需要缩小范围要看实际帧耗时。

## 为什么父页面会重建

常见代码如下：

```dart
class _TaskPageState extends State<TaskPage> {
  final List<Task> _tasks = [];

  void toggleTask(int index) {
    setState(() {
      final task = _tasks[index];
      _tasks[index] = task.copyWith(completed: !task.completed);
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _tasks.length,
      itemBuilder: (context, index) {
        final task = _tasks[index];
        return TaskRow(
          key: ValueKey(task.id),
          task: task,
          onChanged: () => toggleTask(index),
        );
      },
    );
  }
}
```

`setState` 标记的是当前 `_TaskPageState`，不是 `_tasks[index]` 那一小块。所以下一帧中，页面的 `build` 会重新执行。

```mermaid
flowchart LR
    A[点击一行] --> B[修改页面中的 tasks]
    B --> C[页面 setState]
    C --> D[页面重新 build]
    D --> E[ListView 更新可见子项]
    E --> F[Element 对比新旧 Widget]
    F --> G[必要时更新布局或绘制]
```

Flutter 会复用能够匹配的 Element 和 RenderObject。没有变化的渲染属性，不一定继续触发布局或绘制。因此，页面打印了 `build` 日志，不等于整页重新渲染。

## `ListView.builder` 会把所有行都重建吗

`ListView.builder` 按需创建列表项，主要维护当前可见区域及附近缓存区域，不会因为列表有一万条数据就一次构建一万行。

父列表重建时，可见区域中的 `itemBuilder` 可能再次执行。成本主要取决于：

- 当前同时存在多少行；
- 每行的 `build` 是否轻量；
- 是否在 Build 中解析、排序或创建昂贵对象；
- 是否频繁触发布局、图片解码或复杂绘制。

一个几十行、每行结构简单的列表，即使父页面重建，也可能完全满足帧预算。

## 只把行拆成 Widget 还不够

把一行提取成 `TaskRow` 有利于职责和可读性，但不保证它不再重建。

父页面每次 `build` 都可能创建新的 `TaskRow` 配置。Flutter 会根据类型和 `Key` 匹配已有 Element，再决定如何更新。

要真正缩小通知范围，状态读取也要移动到行级边界，而不只是移动代码文件。

## 什么时候把更新缩小到一行

如果测量确认 Build 阶段确实过重，可以让每一行只订阅自己的状态。

下面用 `ValueNotifier` 展示最小思路：

```dart
class TaskRowController {
  TaskRowController(Task initial) : task = ValueNotifier(initial);

  final ValueNotifier<Task> task;

  void toggle() {
    final current = task.value;
    task.value = current.copyWith(completed: !current.completed);
  }

  void dispose() => task.dispose();
}

class TaskRow extends StatelessWidget {
  const TaskRow({
    required this.controller,
    super.key,
  });

  final TaskRowController controller;

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<Task>(
      valueListenable: controller.task,
      builder: (context, task, child) {
        return CheckboxListTile(
          value: task.completed,
          title: Text(task.title),
          onChanged: (_) => controller.toggle(),
        );
      },
    );
  }
}
```

此时某个 Controller 变化，主要更新对应的 `ValueListenableBuilder`。Controller 应由页面或更高层状态容器创建和释放，业务数据仍要按项目规则持久化。

Provider、Riverpod、BLoC 的选择器方案，本质也是让一行只订阅自己需要的数据。

## `Key` 能减少重建吗

`ValueKey(task.id)` 的主要作用是稳定列表项身份。插入、删除或排序后，Flutter 可以按业务 ID 匹配原来的 Element 和 State，避免状态错位。

它不是“禁止 Rebuild”的开关。索引也不适合作为会排序列表的身份，因为顺序变化后，同一索引可能已经对应另一条数据。

## 几个常见的错误优化

- 给每一行加 `RepaintBoundary`：它隔离的是重绘，不是 Rebuild，还可能增加 Layer 和内存成本。
- 把所有状态放进行内部：临时 UI 状态可以下沉，业务事实仍应有明确的数据源。
- 为了减少日志引入复杂框架：如果列表本来不卡，新增 Controller 和 Selector 只会增加维护成本。

## 一套实用的排查顺序

1. 在目标设备的 Profile 或 Release 模式复现。
2. 确认是否真的出现超出帧预算的慢帧。
3. 判断耗时在 Build、Layout、Paint 还是 Raster。
4. 如果 Build 过重，检查可见行数量和行内同步计算。
5. 先移除 Build 中的重复重活，再考虑按列表项订阅状态。
6. 为可插入、删除、排序的行提供稳定业务 `Key`。
7. 用同一数据量、设备和操作再次测量。

## 最后记住这几点

- 页面调用 `setState`，当前页面重新 `build` 是正常行为。
- Rebuild 不等于整页重新布局、绘制和栅格化。
- `ListView.builder` 主要构建可见区域及附近缓存项。
- 拆出行组件提升可维护性，但不会自动隔离状态通知。
- `Key` 管身份，Selector 或行级监听管更新范围。
- 列表不卡时，不要为了减少重建日志增加架构复杂度。

## 问答复盘

### Q1：父页面 `build` 执行了，是否代表每一行都重新绘制？

**答：** 不代表。Widget 配置会重新计算，但是否继续 Relayout 或 Repaint，要看对应渲染属性是否发生变化。

### Q2：`ListView.builder` 会一次构建全部数据吗？

**答：** 通常不会。它按需维护可见区域和附近缓存区域，具体范围受视口和缓存配置影响。

### Q3：把行提取成 StatelessWidget 就能避免重建吗？

**答：** 不能保证。要缩小更新范围，还要让行级组件只订阅自己的状态。

### Q4：给每一行加 `ValueKey` 能减少 Rebuild 吗？

**答：** 不能直接减少。`Key` 主要帮助 Flutter 在插入、删除和排序时匹配正确的 Element 与 State。

### Q5：业务状态适合全部放进列表项内部吗？

**答：** 不适合。临时 UI 状态可以下沉，业务事实仍应有明确的事实源，并与缓存和服务端保持一致。

### Q6：什么时候值得改成按行订阅？

**答：** 当目标设备的性能数据确认 Build 阶段过重，并且大量无关行确实被频繁更新时，再缩小订阅范围。
