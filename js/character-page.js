/**
 * 角色详情页渲染模块
 * 读取 URL 参数 ?id=xxx，加载对应角色数据，渲染属性面板
 */

(function () {
  const app = document.getElementById('character-app');
  const breadcrumbName = document.getElementById('breadcrumb-name');

  async function init() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
      app.innerHTML = '<div class="character-page"><p style="text-align:center;color:var(--text-dim);padding:80px 20px;">未指定角色 — 请从首页选择一位角色</p></div>';
      return;
    }

    try {
      const [data, story] = await Promise.all([
        loadCharacterData(id),
        loadCharacterStory(id),
      ]);

      document.title = `${data.name} — 凡人修仙传 · 角色回忆录`;
      breadcrumbName.textContent = data.name;
      renderCharacterPage(data, story);
    } catch (err) {
      console.error('加载角色失败:', err);
      app.innerHTML = `<div class="character-page"><p style="text-align:center;color:#c44;padding:80px 20px;">加载失败：${err.message}</p></div>`;
    }
  }

  function renderCharacterPage(data, storyMd) {
    const scale = getScaleByRealm(data.realm.name);

    const aliasesHtml = data.alias.length
      ? `<div class="character-aliases">${data.alias.map(a => `<span>${a}</span>`).join('')}</div>`
      : '';

    const voiceHtml = data.voiceActor.cn
      ? `<span><strong>CV：</strong>${data.voiceActor.cn}</span>`
      : '';

    const affiliationHtml = data.affiliation
      ? `<span><strong>宗门：</strong>${data.affiliation}</span>`
      : '';

    const rootHtml = data.spiritualRoot
      ? `<span><strong>灵根：</strong>${data.spiritualRoot}</span>`
      : '';

    const treasuresHtml = data.treasures.length ? `
      <div class="treasure-grid">
        <div class="treasure-grid-title">⚔️ 法宝 / 功法</div>
        ${data.treasures.map(t => `
          <div class="treasure-item">
            <span class="treasure-rarity">${t.rarity}</span>
            <span class="treasure-item-name">${t.name}</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    const storyHtml = storyMd
      ? `<section class="story-section"><div class="story-content">${simpleMarkdownToHtml(storyMd)}</div></section>`
      : '';

    app.innerHTML = `
      <div class="character-page">
        <div class="stat-panel">
          <div class="stat-panel-header" style="--cosmic-gradient: ${scale.gradient};">
            <h1 class="character-name" style="--char-color: ${data.color}; --char-glow: ${data.color}44;">${data.name}</h1>
            ${aliasesHtml}
            <div class="character-title-line">
              <span><strong>境界：</strong>${data.realm.name}</span>
              ${voiceHtml}
              ${affiliationHtml}
              ${rootHtml}
            </div>
          </div>

          <div class="cosmic-indicator">
            <span class="cosmic-indicator-icon">${scale.icon}</span>
            <span class="cosmic-indicator-label">宇宙视野</span>
            <span class="cosmic-indicator-scale" style="--char-color: ${data.color};">${scale.label}</span>
          </div>

          <div class="stat-grid">
            <div class="stat-item">
              <span class="stat-label">当前修为</span>
              <span class="stat-value">${data.realm.name}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">宗门势力</span>
              <span class="stat-value">${data.affiliation || '暂无'}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">灵根资质</span>
              <span class="stat-value">${data.spiritualRoot || '暂无'}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">配音演员</span>
              <span class="stat-value">${data.voiceActor.cn || '待补充'}</span>
            </div>
          </div>

          ${treasuresHtml}
        </div>

        ${storyHtml}

        <div id="timeline-container"></div>
        <div id="relationships-container"></div>
        <div id="quotes-container"></div>
      </div>
    `;

    // 触发后续组件渲染（使用自定义事件解耦）
    document.dispatchEvent(new CustomEvent('character-loaded', { detail: data }));
  }

  init();
})();
