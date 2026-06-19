/**
 * 数据加载模块
 * 负责从 data/ 目录加载 JSON 和 Markdown 文件
 */

const DATA_BASE = 'data/characters/';

/**
 * 加载角色列表索引
 * @returns {Promise<Array>} 角色摘要数组
 */
async function loadCharacterIndex() {
  const res = await fetch(DATA_BASE + 'index.json');
  if (!res.ok) {
    throw new Error(`加载角色列表失败: HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * 加载单个角色的结构化数据
 * @param {string} id - 角色 ID，如 'hanli'
 * @returns {Promise<Object>} 角色 data.json 内容
 */
async function loadCharacterData(id) {
  const res = await fetch(`${DATA_BASE}${id}/data.json`);
  if (!res.ok) {
    throw new Error(`加载角色数据失败 (${id}): HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * 加载角色传记 Markdown
 * @param {string} id - 角色 ID
 * @returns {Promise<string>} Markdown 原文
 */
async function loadCharacterStory(id) {
  const res = await fetch(`${DATA_BASE}${id}/story.md`);
  if (!res.ok) {
    return ''; // story.md 可选
  }
  return res.text();
}

/**
 * 简易 Markdown → HTML 转换（仅处理本项目的有限格式）
 * @param {string} md - Markdown 源码
 * @returns {string} HTML 字符串
 */
function simpleMarkdownToHtml(md) {
  if (!md) return '';

  let html = md
    // 标题
    .replace(/^### (.+)$/gm, '<h3 class="story-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="story-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="story-h1">$1</h1>')
    // 列表
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // 粗体
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // 段落：连续的非空行
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul/])/gm, '');

  html = '<p>' + html + '</p>';
  // 清理空标签
  html = html.replace(/<(h[123]|ul|p)>\s*<\/\1>/g, '');
  html = html.replace(/<p>\s*<p>/g, '<p>');
  html = html.replace(/<\/p>\s*<\/p>/g, '</p>');

  return html;
}
