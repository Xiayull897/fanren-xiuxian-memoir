# 凡人修仙传 · 角色回忆录

一个记录动漫《凡人修仙传》角色生平的粉丝向回忆录/百科网站。

## 技术栈

- HTML5 + CSS3 + Vanilla JavaScript
- 纯静态网站，无需构建工具
- 数据存储在 JSON + Markdown 文件中

## 本地运行

直接用浏览器打开 `index.html` 即可。或使用任意静态服务器：

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

然后访问 `http://localhost:8080`

## 项目结构

```
├── index.html          # 首页（储物袋入口）
├── character.html      # 角色详情页
├── css/                # 样式文件
├── js/                 # 脚本文件
├── data/characters/    # 角色数据（JSON + MD）
└── assets/             # 图片、字体、图标
```

## 添加新角色

1. 复制 `data/characters/_template/` 到新文件夹
2. 编辑 `data.json` 填写角色信息
3. 编辑 `story.md` 填写角色传记
4. 在 `data/characters/index.json` 中添加条目

## 设计理念

- **储物袋交互**：点击储物袋 → 角色法宝飞出，贴合修仙世界观
- **游戏化时间线**：RPG 属性面板 + 纵向境界时间轴
- **境界 → 宇宙尺度映射**：凡人（地球三层）→ 练气（行星）→ 筑基（恒星系统）→ 结丹（星系）→ 元婴（本星系群）
