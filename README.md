# react-iconfont-cli

> 本仓库是 [react-iconfont-cli](https://github.com/iconfont-cli/react-iconfont-cli) 的维护分支。原仓库长期缺少维护后，我们接管并持续迭代，欢迎通过 Issue 和 PR 提供反馈。

将 iconfont.cn 的图标资源转换为 React 组件，无字体依赖，支持多色图标与自动化生成。

![icons](./images/icons.png)

## 特性

- 纯组件渲染，不依赖字体文件，体积更小
- 支持单色与多色图标，并可通过参数自定义颜色
- 自动生成图标组件，支持 JavaScript 与 TypeScript 输出

## 快速开始

### 1. 安装

```bash
# Yarn
yarn add @sj-distributor/react-iconfont-cli --dev

# pnpm
pnpm install @sj-distributor/react-iconfont-cli --save-dev
```

### 2. 初始化配置

```bash
npx sj-iconfont-init
```

执行后会在项目根目录生成 `iconfont.json`：

```json
{
  "symbol_url": "请参考 README.md，复制官网提供的 JS 链接",
  "use_typescript": false,
  "save_dir": "./src/components/iconfont",
  "trim_icon_prefix": "icon",
  "unit": "px",
  "default_icon_size": 18,
  "can_import_react": true
}
```

### 3. 生成图标组件

```bash
npx sj-iconfont-h5
```

生成完成后请检查 `save_dir` 对应目录。输出结构可参考 [snapshots](./snapshots)。

## 配置项说明

| 字段                | 类型      | 默认值                      | 说明                                                                       |
| ------------------- | --------- | --------------------------- | -------------------------------------------------------------------------- |
| `symbol_url`        | `string`  | -                           | iconfont 官网提供的 JS 地址，必须是 `.js` 结尾                             |
| `use_typescript`    | `boolean` | `false`                     | 是否生成 TypeScript 组件。`true` 生成 `.tsx`，`false` 生成 `.js` + `.d.ts` |
| `save_dir`          | `string`  | `./src/components/iconfont` | 图标组件输出目录。每次生成前会清空该目录                                   |
| `trim_icon_prefix`  | `string`  | `icon`                      | 去除图标名前缀，仅对汇总 `Icon` 组件的 `name` 参数生效                     |
| `unit`              | `string`  | `px`                        | 图标尺寸单位，常见值如 `px`、`rem`                                         |
| `default_icon_size` | `number`  | `18`                        | 每个图标组件的默认尺寸                                                     |
| `can_import_react`  | `boolean` | `true`                      | 是否在生成文件中显式导入 `React`                                           |

`symbol_url` 获取示例：

- 请在 iconfont 项目中复制官方生成的 JS 链接，而不是 CSS 链接。
- 你也可以先用这个地址进行测试：`http://at.alicdn.com/t/font_1373348_ghk94ooopqr.js`

![symbol-url](./images/symbol-url.png)

## 使用方式

支持两种引入方式。

### 1. 使用汇总 Icon 组件

```tsx
import React from "react";
import IconFont from "../src/iconfont";

export const App = () => {
  return (
    <div>
      <IconFont name="alipay" size={20} />
      <IconFont name="wechat" />
    </div>
  );
};
```

### 2. 使用单个图标组件

按需引入可避免未使用图标被打包进应用。

```tsx
import React from "react";
import IconAlipay from "../src/iconfont/IconAlipay";
import IconWechat from "../src/iconfont/IconWechat";

export const App = () => {
  return (
    <div>
      <IconAlipay size={20} />
      <IconWechat />
    </div>
  );
};
```

## 图标样式

### 图标尺寸

每个图标默认尺寸来自 `default_icon_size`，可通过 `size` 覆盖：

```tsx
<IconFont name="alipay" size={20} />
```

![default-color-icon](./images/default-color-icon.png)

### 图标单色

传入字符串颜色时，图标会按单色渲染：

```tsx
<IconFont name="alipay" color="green" />
```

![one-color-icon](./images/one-color-icon.png)

### 图标多色

传入颜色数组时，按路径顺序替换图标颜色：

```tsx
<IconFont name="alipay" color={["green", "orange"]} />
```

颜色数量与顺序需参考具体图标组件中的路径定义。

![multi-color-icon](./images/multi-color-icon.png)

### 与文字并排

图标容器默认是块级效果，建议使用 `flex` 对齐文本：

```jsx
<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
  <span>Hello</span>
  <IconFont name="alipay" />
</div>
```

### 点击交互

不要直接把 SVG 图标作为交互控件。SVG 本身不是原生按钮，直接使用时还需要自行实现焦点、键盘操作、控件角色和可访问名称。

汇总 `IconFont` 组件检测到 `onClick` 后，会自动渲染一个原生 `button`，并将内部 SVG 标记为装饰元素；没有 `onClick` 时仍然只渲染 SVG：

```tsx
const handleIconClick = () => {
  console.log("icon clicked");
};

<IconFont
  name="alipay"
  aria-label="打开支付宝"
  onClick={handleIconClick}
  buttonProps={{
    className: "icon-button",
    disabled: false,
  }}
/>;
```

`buttonProps` 用于设置外层按钮的属性；`className`、`style` 等普通图标属性仍应用到内部 SVG。按钮默认为 `type="button"`，并进行最小样式重置：背景透明、无边框、无内边距，同时移除浏览器原生按钮外观。除此之外不附带布局、尺寸或颜色样式，调用方可以使用普通 CSS、CSS Modules 或 Tailwind CSS 自行控制。需要覆盖重置项时，可通过 `buttonProps.style` 设置。原生按钮已经支持 Enter/Space 键盘操作，因此不需要额外添加 `onKeyDown`。

交互模式下，顶层的 `aria-*`、`role` 和 `tabIndex` 会自动应用到外层按钮，不会留在已隐藏的 SVG 上。除 `aria-label` 和 `onClick` 外，也可以通过 `buttonProps` 设置按钮属性；同名属性以 `buttonProps` 为准。

调用方自定义按钮样式时，应保留清晰的键盘焦点状态，并根据适用的 WCAG 等级确保足够的点击区域和间距。

按需引入的单图标组件始终只渲染 SVG。如需交互，请由调用方显式包裹按钮：

```tsx
<button type="button" onClick={handleIconClick} aria-label="打开支付宝">
  <IconAlipay aria-hidden="true" />
</button>
```

## 无障碍支持（WCAG）

无障碍属性添加在最终生成的单图标 SVG 上。重新运行生成命令后，现有调用无需修改即可获得默认的可访问名称。

将生成类似下面的 SVG：

```html
<svg role="img" aria-label="alipay" focusable="false">...</svg>
```

默认的 `aria-label` 是本包提供的兜底值：它根据去除前缀后的图标名生成，并将连字符、下划线和驼峰命名转换为空格。例如 `arrow-left` 会生成 `aria-label="arrow left"`。

本包无法判断图标在具体页面中的含义和语言。调用方应根据实际语境覆盖默认标签：

```tsx
<IconFont name="alipay" aria-label="支付宝" />
```

如果图标只是装饰，或者所在按钮、链接已经有可访问名称，可以显式隐藏图标，避免读屏软件重复朗读：

```tsx
<button type="button" aria-label="关闭">
  <IconFont name="close" aria-hidden="true" />
</button>
```

## 更新图标

当 iconfont 项目图标有变更时，更新 `iconfont.json` 中的 `symbol_url` 后重新生成：

```bash
npx sj-iconfont-h5
```

## 常见问题

### 1. 提示找不到 iconfont.json

请先在项目根目录执行：

```bash
npx sj-iconfont-init
```

### 2. 多色图标变成单色

如果 `color` 传入的是字符串而不是数组，多色图标会按单色模式渲染。

### 3. 图标没有更新

请确认 `symbol_url` 已替换为最新链接，并再次执行生成命令。

欢迎使用，期待你的反馈与建议。
