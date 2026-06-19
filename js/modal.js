/**
 * 角色详情弹窗
 * — 渲染属性面板/境界时间线/法宝功法/关系网络/经典台词
 */
window.CharacterModal = (function() {
  var overlay, panel, contentEl, closeBtn;
  var currentId = null;

  function init() {
    overlay = document.getElementById('modal-overlay');
    panel = document.getElementById('modal-panel');
    contentEl = document.getElementById('modal-content');
    closeBtn = document.getElementById('modal-close');

    closeBtn.addEventListener('click', close);
    overlay.querySelector('.modal-backdrop').addEventListener('click', close);
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && currentId) close();
    });

    // 监听光球点击
    window.addEventListener('orb-click', function(e) {
      open(e.detail.id);
    });

    // 阻止弹窗内部点击冒泡
    panel.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  function open(id) {
    var detail = window.CHARACTER_DETAIL[id];
    if (!detail) return;

    currentId = id;

    var ch = null;
    for (var i = 0; i < window.CHARACTER_INDEX.length; i++) {
      if (window.CHARACTER_INDEX[i].id === id) { ch = window.CHARACTER_INDEX[i]; break; }
    }

    var color = detail.color || '#c9a84c';

    var html = '';

    // 头部
    html += '<div class="modal-header">';
    html += '<div class="modal-avatar-placeholder" style="border-color:' + color + ';color:' + color + '">' + detail.name.charAt(0) + '</div>';
    html += '<div class="modal-header-info">';
    html += '<h2 class="modal-name" style="color:' + color + '">' + detail.name + '</h2>';
    html += '<p class="modal-alias">' + (detail.alias || []).join(' · ') + '</p>';
    if (detail.description) {
      html += '<p class="modal-description">' + detail.description + '</p>';
    }
    html += '</div></div>';

    // 统计面板
    html += '<div class="modal-stats">';
    html += statItem('境界', detail.realm, true);
    html += statItem('宗门', detail.affiliation);
    html += statItem('灵根', detail.spiritualRoot);
    html += statItem('配音演员', detail.voiceActorCn, true);
    html += '</div>';

    // 境界时间线
    if (detail.realmHistory && detail.realmHistory.length > 0) {
      html += '<h3 class="modal-section-title">修仙之路</h3>';
      html += '<div class="timeline-list">';
      for (var j = 0; j < detail.realmHistory.length; j++) {
        var rh = detail.realmHistory[j];
        html += '<div class="timeline-node">';
        html += '<div class="timeline-realm">' + rh.realm + ' — ' + (rh.cosmicScale || '') + '</div>';
        html += '<div class="timeline-event">' + rh.event + '</div>';
        html += '</div>';
      }
      html += '</div>';
    }

    // 法宝功法
    if (detail.treasures && detail.treasures.length > 0) {
      html += '<h3 class="modal-section-title">法宝功法</h3>';
      html += '<div class="treasure-grid">';
      for (var t = 0; t < detail.treasures.length; t++) {
        var tr = detail.treasures[t];
        html += '<div class="treasure-card">';
        html += '<div class="treasure-name">' + tr.name + '</div>';
        html += '<div class="treasure-rarity">' + (tr.rarity || '') + '</div>';
        if (tr.description) {
          html += '<div class="treasure-desc">' + tr.description + '</div>';
        }
        html += '</div>';
      }
      html += '</div>';
    }

    // 机缘事件
    var fortunes = detail.fortunes || [];
    var events = detail.events || [];
    var allEvents = fortunes.concat(events);
    if (allEvents.length > 0) {
      html += '<h3 class="modal-section-title">机缘与事件</h3>';
      html += '<div class="event-grid">';
      for (var ev = 0; ev < allEvents.length; ev++) {
        var e = allEvents[ev];
        html += '<div class="event-card">';
        html += '<div class="event-name">' + e.name + '</div>';
        html += '<div class="event-type">' + (e.type || '') + ' · ' + (e.realm || '') + '</div>';
        html += '<div class="event-desc">' + e.description + '</div>';
        html += '</div>';
      }
      html += '</div>';
    }

    // 关系网络
    if (detail.relationships && detail.relationships.length > 0) {
      html += '<h3 class="modal-section-title">人物关系</h3>';
      html += '<div class="relation-list">';
      for (var r = 0; r < detail.relationships.length; r++) {
        var rel = detail.relationships[r];
        html += '<div class="relation-item">';
        html += '<span class="relation-name">' + rel.name + '</span>';
        html += '<span class="relation-type">' + rel.relation + '</span>';
        html += '<span class="relation-note">' + (rel.note || '') + '</span>';
        html += '</div>';
      }
      html += '</div>';
    }

    // 经典台词
    if (detail.quotes && detail.quotes.length > 0) {
      html += '<h3 class="modal-section-title">经典台词</h3>';
      html += '<div class="quote-list">';
      for (var q = 0; q < detail.quotes.length; q++) {
        var quote = detail.quotes[q];
        html += '<div class="quote-item" style="border-left-color:' + color + '">';
        html += '<div class="quote-text">"' + quote.text + '"</div>';
        html += '<div class="quote-context">— ' + (quote.context || '') + '</div>';
        html += '</div>';
      }
      html += '</div>';
    }

    contentEl.innerHTML = html;
    panel.scrollTop = 0;
    overlay.classList.add('active');
  }

  function close() {
    overlay.classList.remove('active');
    currentId = null;
  }

  function statItem(label, value, highlight) {
    return '<div class="stat-item">' +
      '<span class="stat-label">' + label + '</span>' +
      '<span class="stat-value' + (highlight ? ' highlight' : '') + '">' + (value || '—') + '</span>' +
      '</div>';
  }

  return { init: init, open: open, close: close };
})();
