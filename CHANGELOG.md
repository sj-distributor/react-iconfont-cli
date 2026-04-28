# Changelog

# v2.4.2

## 中文

### 修复内容

- 修复了单色模式下多 path 图标细节丢失的问题。
- 调整为：`getIconColor` 新增 `primaryColor` 参数，单色时非首层 path 回退到主色而非各层独立的默认色。
- 保持数组颜色模式逻辑不变：按索引取色，索引不存在时回退默认色。

### 影响范围

- 带有背景底与前景细节的多路径图标（如部分 SNG 官方 icon）在单色场景下不再显示为纯色块。
- 现有多色配置行为不变。
- 无破坏性变更。

### 升级建议

- 建议升级到此版本，以获得更一致的图标渲染表现。

---

## English

### Fixes

- Fixed an issue where multi-path icons lost detail in single-color mode.
- Updated behavior: `getIconColor` now accepts a `primaryColor` parameter, so non-first paths fall back to the primary color instead of their own defaults when a single color is passed.
- Kept array color behavior unchanged: colors are resolved by index, with default fallback when an index is missing.

### Impact

- Multi-path icons with background layers and foreground details (e.g., some official SNG icons) no longer render as solid blocks in single-color scenarios.
- Existing multi-color behavior remains unchanged.
- No breaking changes.

### Upgrade Note

- Upgrading to this version is recommended for more consistent icon rendering.

---

# v2.4.1

## 中文

### 修复内容

- 修复了单色配置下颜色覆盖所有 path 的问题。
- 调整为：当 color 为字符串时，仅第一个 path 使用该颜色，其余 path 回退为默认色。
- 保持数组颜色模式逻辑不变：按索引取色，索引不存在时回退默认色。

### 影响范围

- 多路径图标在单色场景下的渲染更符合预期。
- 现有多色配置行为不变。
- 无破坏性变更。

### 升级建议

- 建议升级到此版本，以获得更一致的图标渲染表现。

---

## English

### Fixes

- Fixed an issue where a single color value was applied to all paths.
- Updated behavior: when color is a string, only the first path uses that color, while other paths fall back to the default color.
- Kept array color behavior unchanged: colors are resolved by index, with default fallback when an index is missing.

### Impact

- Improves rendering consistency for multi-path icons in single-color scenarios.
- Existing multi-color behavior remains unchanged.
- No breaking changes.

### Upgrade Note

- Upgrading to this version is recommended for more consistent icon rendering.
