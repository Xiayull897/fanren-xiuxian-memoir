/**
 * 储物袋交互模块
 * 处理首页储物袋点击 → 法宝飞出的交互
 */

(function () {
  let isOpen = false;
  let characterList = [];

  const bag = document.getElementById('bag');
  const hint = document.getElementById('bag-hint');
  const treasuresArea = document.getElementById('treasures');
  const filterBar = document.getElementById('filter-bar');

  /**
   * 初始化：预加载角色列表
   */
  async function init() {
    try {
      characterList = await loadCharacterIndex();
      renderFilters(characterList);
    } catch (err) {
      console.error('储物袋初始化失败:', err);
      hint.textContent = '加载失败，请刷新页面重试';
    }
  }

  /**
   * 生成筛选按钮
   */
  function renderFilters(characters) {
    const realms = [...new Set(characters.map(c => c.realm))];
    realms.forEach(realm => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.filter = realm;
      btn.textContent = realm;
      btn.addEventListener('click', () => filterTreasures(realm, btn));
      filterBar.appendChild(btn);
    });

    // 全部按钮事件
    filterBar.querySelector('[data-filter="all"]').addEventListener('click', function () {
      filterTreasures('all', this);
    });
  }

  /**
   * 筛选法宝
   */
  function filterTreasures(filter, activeBtn) {
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');

    const cards = treasuresArea.querySelectorAll('.treasure-card');
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.realm === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  /**
   * 储物袋点击事件
   */
  bag.addEventListener('click', async function () {
    if (isOpen) {
      closeBag();
    } else {
      await openBag();
    }
  });

  /**
   * 打开储物袋：动画 + 生成法宝
   */
  async function openBag() {
    isOpen = true;
    bag.classList.add('opened');
    bag.classList.remove('floating');
    hint.textContent = '点击法宝查看角色详情';

    // 确保数据已加载
    if (characterList.length === 0) {
      try {
        characterList = await loadCharacterIndex();
        renderFilters(characterList);
      } catch (err) {
        hint.textContent = '加载失败，请重试';
        return;
      }
    }

    // 清空旧法宝
    treasuresArea.innerHTML = '';

    // 依次生成法宝卡片，带延迟动画
    characterList.forEach((char, index) => {
      const card = createTreasureCard(char, index);
      treasuresArea.appendChild(card);

      // 延迟触发弹出动画
      setTimeout(() => {
        card.classList.add('animated', 'visible');
      }, 100 + index * 120);
    });

    // 显示筛选栏
    filterBar.classList.add('visible');
  }

  /**
   * 关闭储物袋
   */
  function closeBag() {
    isOpen = false;
    bag.classList.remove('opened');
    bag.classList.add('floating');
    hint.textContent = '点击储物袋，查看角色法宝';
    treasuresArea.innerHTML = '';
    filterBar.classList.remove('visible');
  }

  /**
   * 创建法宝卡片 DOM
   */
  function createTreasureCard(char, index) {
    const card = document.createElement('div');
    card.className = 'treasure-card';
    card.dataset.realm = char.realm;
    card.style.setProperty('--treasure-glow', char.color);
    card.style.animationDelay = `${index * 0.12}s`;

    const scale = getScaleByRealm(char.realm);

    card.innerHTML = `
      <span class="treasure-icon">${scale.icon}</span>
      <span class="treasure-name">${char.name}</span>
      <span class="treasure-realm">${char.realm}</span>
    `;

    // 点击法宝 → 跳转详情页
    card.addEventListener('click', () => {
      window.location.href = `character.html?id=${char.id}`;
    });

    return card;
  }

  // 启动
  init();
})();
