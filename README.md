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
