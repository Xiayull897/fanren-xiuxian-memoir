/**
 * 境界时间线渲染模块
 * 监听 character-loaded 事件，渲染时间线
 */

(function () {
  document.addEventListener('character-loaded', function (e) {
    renderTimeline(e.detail);
    renderRelationships(e.detail);
    renderQuotes(e.detail);
  });

  function renderTimeline(data) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    // 构建时间线条目：境界突破 + 机缘 + 事件
    const items = buildTimelineItems(data);

    container.innerHTML = `
      <section class="timeline-section">
        <h2 class="timeline-title">修仙之路</h2>
        <div class="timeline">
          ${items.map(item => renderTimelineNode(item, data.color)).join('')}
        </div>
      </section>
    `;
  }

  function buildTimelineItems(data) {
    const items = [];

    // 将 realmHistory、fortunes、events 合并，按境界排序
    const realmOrder = ['凡人', '练气', '筑基', '结丹', '元婴', '化神', '炼虚', '合体', '大乘', '渡劫'];

    data.realmHistory.forEach(r => {
      items.push({
        type: 'realm',
        realm: r.realm,
        realmIndex: realmOrder.indexOf(r.realm),
        cosmicScale: r.cosmicScale,
        description: r.event,
        chapter: r.chapter,
        episode: r.episode,
      });
    });

    data.fortunes.forEach(f => {
      items.push({
        type: 'fortune',
        title: f.name,
        realm: f.realm,
        realmIndex: realmOrder.indexOf(f.realm),
        description: f.description,
        significance: f.significance,
      });
    });

    data.events.forEach(ev => {
      items.push({
        type: 'event',
        title: ev.name,
        realm: ev.realm,
        realmIndex: realmOrder.indexOf(ev.realm),
        description: ev.description,
        significance: ev.significance,
      });
    });

    // 按境界索引降序（从低到高 → 时间线从上到下是从凡人到高阶）
    items.sort((a, b) => (a.realmIndex - b.realmIndex));

    return items;
  }

  function renderTimelineNode(item, charColor) {
    if (item.type === 'realm') {
      const scale = getCosmicScale(item.cosmicScale);
      return `
        <div class="timeline-node realm-breakthrough"
             style="--node-accent: ${scale.accent}; --node-glow: ${scale.accent}44; --node-gradient: ${scale.gradient};">
          <div class="node-header">
            <span class="node-realm" style="color: ${scale.accent};">${scale.icon} ${item.realm}</span>
            <span class="node-badge" style="background: ${scale.accent};">境界突破</span>
          </div>
          <p class="node-description">${item.description}</p>
          <div class="node-meta">
            <span>📖 ${item.chapter}</span>
            <span>📺 ${item.episode}</span>
            <span>🌐 ${scale.label}</span>
          </div>
        </div>
      `;
    }

    if (item.type === 'fortune' || item.type === 'event') {
      const tagClass = item.type === 'fortune' ? 'fortune' : 'event';
      const tagLabel = item.type === 'fortune' ? '机缘' : '事件';
      const accentColor = item.type === 'fortune' ? 'var(--gold)' : '#8ac';
      return `
        <div class="timeline-node event-node ${tagClass}"
             style="--node-accent: ${accentColor};">
          <span class="event-tag ${tagClass}">${tagLabel}</span>
          <div class="node-header">
            <span class="node-realm" style="color: ${charColor};">${item.title}</span>
            ${item.significance ? `<span class="node-badge" style="background: ${charColor};">${item.significance}</span>` : ''}
          </div>
          <p class="node-description">${item.description}</p>
          <div class="node-meta">
            <span>📌 ${item.realm}时期</span>
          </div>
        </div>
      `;
    }

    return '';
  }

  function renderRelationships(data) {
    const container = document.getElementById('relationships-container');
    if (!container || !data.relationships.length) return;

    container.innerHTML = `
      <section class="timeline-section">
        <h2 class="timeline-title">人物关系</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
          ${data.relationships.map(r => `
            <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:14px 16px;">
              <div style="font-weight:600;color:${data.color};margin-bottom:4px;">${r.name}</div>
              <div style="font-size:0.8rem;color:var(--gold);">${r.relation}</div>
              <div style="font-size:0.8rem;color:var(--text-dim);margin-top:4px;">${r.note}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderQuotes(data) {
    const container = document.getElementById('quotes-container');
    if (!container || !data.quotes.length) return;

    container.innerHTML = `
      <section class="timeline-section">
        <h2 class="timeline-title">经典台词</h2>
        ${data.quotes.map(q => `
          <blockquote style="
            margin-bottom:16px;
            padding:16px 20px;
            background:var(--bg-card);
            border-left:3px solid ${data.color};
            border-radius:0 var(--radius-sm) var(--radius-sm) 0;
            font-family:var(--font-display);
            font-size:1.05rem;
            font-style:italic;
            color:var(--text-primary);
          ">
            "${q.text}"
            <footer style="margin-top:8px;font-size:0.8rem;font-style:normal;color:var(--text-dim);">${q.context}</footer>
          </blockquote>
        `).join('')}
      </section>
    `;
  }
})();
