/**
 * 境界 → 宇宙尺度映射配置
 * 用于视觉渲染：背景渐变、节点颜色、指示器
 */
const COSMIC_SCALES = {
  '地球三层（地壳）': {
    level: 0,
    label: '地壳',
    gradient: 'linear-gradient(135deg, #2d1a0a 0%, #5a3020 50%, #8b4513 100%)',
    accent: '#c4621e',
    icon: '🌋',
  },
  '地球三层（地幔）': {
    level: 0.5,
    label: '地幔',
    gradient: 'linear-gradient(135deg, #5a3020 0%, #b8450e 50%, #ff6a1a 100%)',
    accent: '#e0551e',
    icon: '🔥',
  },
  '地球三层（地核）': {
    level: 0.8,
    label: '地核',
    gradient: 'linear-gradient(135deg, #b8450e 0%, #ff5500 50%, #ffcc00 100%)',
    accent: '#ff6600',
    icon: '💎',
  },
  '行星': {
    level: 1,
    label: '练气 · 行星',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #2a6090 100%)',
    accent: '#4a90d9',
    icon: '🪐',
  },
  '恒星系统': {
    level: 2,
    label: '筑基 · 恒星系统',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1040 50%, #f0a030 100%)',
    accent: '#f0a030',
    icon: '☀️',
  },
  '星系': {
    level: 3,
    label: '结丹 · 星系',
    gradient: 'linear-gradient(135deg, #050520 0%, #200840 50%, #9060d0 100%)',
    accent: '#9060d0',
    icon: '🌌',
  },
  '本星系群': {
    level: 4,
    label: '元婴 · 本星系群',
    gradient: 'linear-gradient(135deg, #020210 0%, #100830 50%, #e060c0 100%)',
    accent: '#c060a0',
    icon: '🫧',
  },
  '超星系团': {
    level: 5,
    label: '大乘 · 超星系团',
    gradient: 'linear-gradient(135deg, #000010 0%, #050430 50%, #f0e0ff 100%)',
    accent: '#d0b0f0',
    icon: '✨',
  },
};

/**
 * 根据 cosmicScale 字符串获取配置
 * @param {string} scaleKey - 如 '恒星系统'
 * @returns {object} 对应的尺度配置，找不到返回默认值
 */
function getCosmicScale(scaleKey) {
  return COSMIC_SCALES[scaleKey] || {
    level: 0,
    label: scaleKey || '未知',
    gradient: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
    accent: '#888',
    icon: '❓',
  };
}

/**
 * 获取当前境界对应的最高宇宙尺度
 * @param {string} realmName - 境界名，如 '大乘'
 * @returns {object} 最高匹配的尺度配置
 */
function getScaleByRealm(realmName) {
  const map = {
    '凡人': '地球三层（地壳）',
    '练气': '行星',
    '筑基': '恒星系统',
    '结丹': '星系',
    '元婴': '本星系群',
    '化神': '超星系团',
    '炼虚': '超星系团',
    '合体': '超星系团',
    '大乘': '超星系团',
    '渡劫': '超星系团',
    '真仙': '超星系团',
  };
  return getCosmicScale(map[realmName] || '');
}
