/**
 * 凡人修仙传 — 角色数据（内联全局变量）
 *
 * 数据来源：百度百科 / Fandom Wiki / 萌娘百科
 * 配音演员：动画（动漫）版本
 * 图片：用户后续补充
 */

// ============================================================
// 角色索引
// ============================================================
window.CHARACTER_INDEX = [
  {
    id: 'hanli',
    name: '韩立',
    alias: ['韩跑跑', '韩老魔', '韩天尊'],
    color: '#2d8a56',
    realmLevel: 10,
    realm: '大乘',
    affiliation: '黄枫谷',
    summary: '出身平凡的农家少年，凭借掌天瓶踏上修仙之路，一步步走向巅峰。',
    image: 'images/characters/hanli.jpg'
  },
  {
    id: 'nangongwan',
    name: '南宫婉',
    alias: ['南宫仙子', '掩月宗长老'],
    color: '#d4e5f7',
    realmLevel: 8,
    realm: '化神',
    affiliation: '掩月宗',
    summary: '掩月宗大长老，修为高绝，与韩立历经生死终成道侣。',
    image: 'images/characters/nangongwan.jpg'
  },
  {
    id: 'ziling',
    name: '紫灵',
    alias: ['汪凝', '乱星海第一美女'],
    color: '#8b5cf6',
    realmLevel: 7,
    realm: '元婴',
    affiliation: '妙音门',
    summary: '乱星海第一美女，与韩立有不解之缘的红颜知己。',
    image: 'images/characters/ziling.jpg'
  },
  {
    id: 'mupeiling',
    name: '慕沛灵',
    alias: ['慕仙子'],
    color: '#e89090',
    realmLevel: 5,
    realm: '筑基',
    affiliation: '黄枫谷',
    summary: '黄枫谷弟子，性格温婉善良，是韩立早年的同门。',
    image: 'images/characters/mupeiling.jpg'
  },
  {
    id: 'yinyue',
    name: '银月',
    alias: ['银月仙子', '狼族圣女'],
    color: '#c0c0d0',
    realmLevel: 6,
    realm: '结丹',
    affiliation: '银月狼族',
    summary: '银月狼族圣女，身世神秘，拥有上古妖族的血脉。',
    image: 'images/characters/yinyue.jpg'
  },
  {
    id: 'wangchan',
    name: '王婵',
    alias: ['王仙子', '鬼灵门少主'],
    color: '#8b0000',
    realmLevel: 6,
    realm: '结丹',
    affiliation: '鬼灵门',
    summary: '鬼灵门少主，为达目的不择手段的狠辣角色。',
    image: 'images/characters/wangchan.jpg'
  }
];

// ============================================================
// 角色详情
// ============================================================
window.CHARACTER_DETAIL = {};

// --- 韩立 ---
window.CHARACTER_DETAIL.hanli = {
  id: 'hanli',
  name: '韩立',
  alias: ['韩跑跑', '韩老魔', '韩天尊'],
  color: '#2d8a56',
  realm: '大乘',
  realmLevel: 10,
  affiliation: '黄枫谷',
  spiritualRoot: '四灵根（伪灵根）',
  voiceActorCn: '钱文青',
  description: '出身平凡的农家少年，凭借掌天瓶踏上修仙之路。以"留得青山在"为信条，隐忍谨慎，步步为营，从一介凡人修炼至大乘境界，成为人界最强者之一。',

  realmHistory: [
    { realm: '凡人', event: '出身七玄门，以凡人之躯被墨大夫收为弟子，经历地壳般的基础锤炼', cosmicScale: '地球三层（地壳）' },
    { realm: '练气', event: '加入黄枫谷，正式踏入修仙之门，如同一颗初生的行星开始运转', cosmicScale: '行星' },
    { realm: '筑基', event: '成功筑基，在修仙界初露锋芒', cosmicScale: '恒星系统' },
    { realm: '结丹', event: '历经九死一生结成金丹，实力进入全新层次', cosmicScale: '星系' },
    { realm: '元婴', event: '元婴大成，成为人界顶尖修士，影响力跨越多个星域', cosmicScale: '本星系群' },
    { realm: '大乘', event: '踏入大乘境界，俯瞰苍生，准备迎接飞升之劫', cosmicScale: '超星系团' }
  ],

  treasures: [
    { name: '掌天瓶', rarity: '先天至宝', description: '可催熟灵药、加速修炼的神秘小瓶，韩立一生最大的机缘' },
    { name: '青竹蜂云剑', rarity: '本命法宝', description: '以万年青竹炼制，共七十二柄，威力无穷' },
    { name: '虚天鼎', rarity: '通天灵宝', description: '上古通天灵宝，可镇压万物' },
    { name: '风雷翅', rarity: '飞行法宝', description: '风雷双属性飞行法宝，速度极快' }
  ],

  fortunes: [
    { name: '获得掌天瓶', type: '机缘', description: '在七玄门后山意外获得神秘绿色小瓶，命运自此彻底改变', realm: '凡人', significance: '命运转折点' },
    { name: '大衍诀', type: '机缘', description: '获得大衍神君的传承功法，可修炼强大神识', realm: '结丹', significance: '核心功法' },
    { name: '青元剑诀', type: '机缘', description: '获得青元子传承的剑诀，剑道修为大进', realm: '筑基', significance: '剑道根基' }
  ],

  events: [
    { name: '七玄门入门', type: '事件', description: '被墨大夫收为弟子，在七玄门开始习武修身', realm: '凡人', significance: '故事起点' },
    { name: '智斗墨大夫', type: '事件', description: '识破墨大夫夺舍阴谋，反杀墨大夫', realm: '凡人', significance: '首次逆转' },
    { name: '乱星海冒险', type: '事件', description: '进入乱星海，获得大量修炼资源，实力飞速提升', realm: '结丹', significance: '重要转折' },
    { name: '抗击魔界入侵', type: '事件', description: '人界遭遇魔界入侵，韩立挺身而出，成为人界最强战力之一', realm: '元婴', significance: '英雄时刻' }
  ],

  relationships: [
    { name: '南宫婉', relation: '道侣', note: '掩月宗长老，与韩立历经生死，终成眷属' },
    { name: '紫灵', relation: '红颜知己', note: '乱星海第一美女，与韩立有不解之缘' },
    { name: '慕沛灵', relation: '同门', note: '黄枫谷同门师妹' },
    { name: '银月', relation: '旧识', note: '曾与韩立同行一段修仙之路' },
    { name: '大衍神君', relation: '师父（传承）', note: '留下大衍诀传承，对韩立影响深远' }
  ],

  quotes: [
    { text: '我韩立行事，只求问心无愧。', context: '面对质疑时的回答' },
    { text: '留得青山在，不怕没柴烧。', context: '韩立的人生信条' },
    { text: '修仙之路，本就是逆天而行。', context: '鼓励后辈时所说' },
    { text: '天若阻我，我便逆天！', context: '逆境中的宣言' }
  ]
};

// --- 南宫婉 ---
window.CHARACTER_DETAIL.nangongwan = {
  id: 'nangongwan',
  name: '南宫婉',
  alias: ['南宫仙子', '掩月宗长老'],
  color: '#d4e5f7',
  realm: '化神',
  realmLevel: 8,
  affiliation: '掩月宗',
  spiritualRoot: '天灵根',
  voiceActorCn: '李诗萌',
  description: '掩月宗大长老，修仙界赫赫有名的强者。容貌清冷绝美，气质如月宫仙子。与韩立因机缘相识，经历生死考验后结为道侣，是韩立一生中最重要的伴侣。',

  realmHistory: [
    { realm: '凡人', event: '出身世家，自幼展现过人修炼天赋', cosmicScale: '地球三层（地壳）' },
    { realm: '练气', event: '加入掩月宗，以天灵根之资迅速突破', cosmicScale: '行星' },
    { realm: '筑基', event: '筑基成功，展现非凡修炼天赋', cosmicScale: '恒星系统' },
    { realm: '结丹', event: '结丹成功，成为掩月宗最年轻的长老', cosmicScale: '星系' },
    { realm: '元婴', event: '元婴大成，执掌掩月宗', cosmicScale: '本星系群' },
    { realm: '化神', event: '突破化神，成为人界最强女修之一', cosmicScale: '超星系团' }
  ],

  treasures: [
    { name: '掩月轮', rarity: '本命法宝', description: '掩月宗镇宗之宝，月光属性的顶级法宝' },
    { name: '月华绫', rarity: '极品法器', description: '轻灵优雅的丝带状法器，攻防一体' },
    { name: '寒月珠', rarity: '通天灵宝', description: '蕴含月光精华的通天灵宝' }
  ],

  fortunes: [
    { name: '天灵根资质', type: '天赋', description: '天生拥有天灵根，修炼速度远超常人', realm: '凡人', significance: '天赋异禀' },
    { name: '掩月宗传承', type: '机缘', description: '获得掩月宗完整传承，奠定修炼根基', realm: '练气', significance: '修炼根基' }
  ],

  events: [
    { name: '与韩立初遇', type: '事件', description: '与韩立因机缘相识，命运从此交织', realm: '筑基', significance: '命运相遇' },
    { name: '生死与共', type: '事件', description: '与韩立共同经历多次生死考验', realm: '结丹', significance: '患难见真情' },
    { name: '结为道侣', type: '事件', description: '与韩立正式结为道侣，修仙路上不再孤单', realm: '元婴', significance: '终成眷属' }
  ],

  relationships: [
    { name: '韩立', relation: '道侣', note: '历经生死考验，终成眷属' },
    { name: '紫灵', relation: '相识', note: '与韩立的红颜知己友善相处' }
  ],

  quotes: [
    { text: '修仙之人，本就该一心向道。', context: '谈及修炼之道' },
    { text: '我南宫婉认定的事，从不会改变。', context: '面对质疑时的坚定' }
  ]
};

// --- 紫灵 ---
window.CHARACTER_DETAIL.ziling = {
  id: 'ziling',
  name: '紫灵',
  alias: ['汪凝', '乱星海第一美女'],
  color: '#8b5cf6',
  realm: '元婴',
  realmLevel: 7,
  affiliation: '妙音门',
  spiritualRoot: '三灵根',
  voiceActorCn: '刘蕊',
  description: '乱星海公认的第一美人，妙音门门主之女。容貌倾国倾城，才情出众。与韩立相识于微时，曾多次患难与共，是韩立修仙路上最重要的红颜知己之一。',

  realmHistory: [
    { realm: '凡人', event: '出生于妙音门，自幼受音乐与修炼双重熏陶', cosmicScale: '地球三层（地壳）' },
    { realm: '练气', event: '正式修炼，展现音律天赋', cosmicScale: '行星' },
    { realm: '筑基', event: '筑基成功，妙音门声名渐起', cosmicScale: '恒星系统' },
    { realm: '结丹', event: '在乱星海结丹成功，名动一方', cosmicScale: '星系' },
    { realm: '元婴', event: '元婴大成，成为乱星海顶级女修', cosmicScale: '本星系群' }
  ],

  treasures: [
    { name: '妙音琴', rarity: '本命法宝', description: '以音律入道的本命法宝，琴声可惑人心智' },
    { name: '紫云衣', rarity: '极品法器', description: '紫色云锦织就的防御法衣' }
  ],

  fortunes: [
    { name: '妙音门传承', type: '机缘', description: '获得妙音门音律修炼传承', realm: '练气', significance: '修炼根基' },
    { name: '乱星海机缘', type: '机缘', description: '在乱星海获得上古遗迹传承', realm: '结丹', significance: '重要突破' }
  ],

  events: [
    { name: '与韩立相识', type: '事件', description: '在妙音门与韩立初次相遇', realm: '筑基', significance: '命运交织' },
    { name: '共闯乱星海', type: '事件', description: '与韩立一同在乱星海探险', realm: '结丹', significance: '患难之交' }
  ],

  relationships: [
    { name: '韩立', relation: '红颜知己', note: '与韩立相识于微时，多次患难与共' },
    { name: '南宫婉', relation: '友善', note: '与韩立道侣南宫婉友善相处' }
  ],

  quotes: [
    { text: '有缘千里来相会，无缘对面不相逢。', context: '对命运感慨' },
    { text: '这一曲，只为你而弹。', context: '对韩立诉说情意' }
  ]
};

// --- 慕沛灵 ---
window.CHARACTER_DETAIL.mupeiling = {
  id: 'mupeiling',
  name: '慕沛灵',
  alias: ['慕仙子'],
  color: '#e89090',
  realm: '筑基',
  realmLevel: 5,
  affiliation: '黄枫谷',
  spiritualRoot: '三灵根',
  voiceActorCn: '乔苏',
  description: '黄枫谷弟子，性格温婉善良，是韩立早年在黄枫谷的同门师妹。对韩立心生敬佩，一直默默支持。虽修为不如韩立，却以真心待人，在韩立修仙之路上留下了温暖的一笔。',

  realmHistory: [
    { realm: '凡人', event: '出身普通家族，被黄枫谷收录', cosmicScale: '地球三层（地壳）' },
    { realm: '练气', event: '在黄枫谷开始修炼', cosmicScale: '行星' },
    { realm: '筑基', event: '筑基成功，成为黄枫谷正式弟子', cosmicScale: '恒星系统' }
  ],

  treasures: [
    { name: '红绫', rarity: '中品法器', description: '慕沛灵的本命法器，红色丝带攻防一体' }
  ],

  fortunes: [
    { name: '拜入黄枫谷', type: '机缘', description: '被选入黄枫谷修炼，改变命运', realm: '凡人', significance: '修炼之始' }
  ],

  events: [
    { name: '与韩立同门', type: '事件', description: '在黄枫谷成为韩立的同门师妹', realm: '练气', significance: '命运交集' },
    { name: '默默守望', type: '事件', description: '在韩立离开黄枫谷后，一直默默关注着他的消息', realm: '筑基', significance: '真心以待' }
  ],

  relationships: [
    { name: '韩立', relation: '同门师兄', note: '黄枫谷时期的同门师兄，心生敬佩' }
  ],

  quotes: [
    { text: '韩师兄，请一定要平安归来。', context: '韩立远行时的祝愿' }
  ]
};

// --- 银月 ---
window.CHARACTER_DETAIL.yinyue = {
  id: 'yinyue',
  name: '银月',
  alias: ['银月仙子', '狼族圣女'],
  color: '#c0c0d0',
  realm: '结丹',
  realmLevel: 6,
  affiliation: '银月狼族',
  spiritualRoot: '妖修（狼族血脉）',
  voiceActorCn: '青泯邑',
  description: '银月狼族圣女，拥有上古妖族的银月血脉。曾与韩立结伴同行，性格坚毅果敢，既有妖族的高傲，也有女性的柔情。在韩立的修仙之路上，是一道独特的银色月光。',

  realmHistory: [
    { realm: '凡人', event: '诞生于银月狼族，天生妖体', cosmicScale: '地球三层（地壳）' },
    { realm: '练气', event: '觉醒银月血脉，开始妖修之路', cosmicScale: '行星' },
    { realm: '筑基', event: '血脉进一步觉醒，实力大增', cosmicScale: '恒星系统' },
    { realm: '结丹', event: '结成妖丹，成为狼族圣女', cosmicScale: '星系' }
  ],

  treasures: [
    { name: '银月刃', rarity: '本命妖器', description: '以银月精华凝练的本命妖器，锋利无匹' },
    { name: '狼牙项链', rarity: '传承圣物', description: '银月狼族代代相传的圣物' }
  ],

  fortunes: [
    { name: '银月血脉觉醒', type: '血脉', description: '觉醒上古银月狼族血脉，修炼速度远超普通妖族', realm: '练气', significance: '天赋觉醒' }
  ],

  events: [
    { name: '与韩立同行', type: '事件', description: '在修仙之路上与韩立结伴同行一段时间', realm: '结丹', significance: '同路之人' }
  ],

  relationships: [
    { name: '韩立', relation: '旧识', note: '曾与韩立同行一段修仙之路，彼此信赖' }
  ],

  quotes: [
    { text: '狼族之人，从不会背弃同伴。', context: '表明忠诚' },
    { text: '即便是妖族，也有自己的骄傲。', context: '面对歧视时所说' }
  ]
};

// --- 王婵 ---
window.CHARACTER_DETAIL.wangchan = {
  id: 'wangchan',
  name: '王婵',
  alias: ['王仙子', '鬼灵门少主'],
  color: '#8b0000',
  realm: '结丹',
  realmLevel: 6,
  affiliation: '鬼灵门',
  spiritualRoot: '暗灵根（变异）',
  voiceActorCn: '刘三木',
  description: '鬼灵门少主，容貌出众却心狠手辣。为达目的不择手段，修炼鬼道功法，手段诡异莫测。与韩立多次交锋，是一个令人印象深刻的对手。',

  realmHistory: [
    { realm: '凡人', event: '出生于鬼灵门，自幼接触鬼道修炼', cosmicScale: '地球三层（地壳）' },
    { realm: '练气', event: '在鬼灵门正式修炼鬼道功法', cosmicScale: '行星' },
    { realm: '筑基', event: '筑基成功，成为鬼灵门核心弟子', cosmicScale: '恒星系统' },
    { realm: '结丹', event: '结成鬼丹，实力大增，成为鬼灵门少主', cosmicScale: '星系' }
  ],

  treasures: [
    { name: '鬼灵幡', rarity: '本命法宝', description: '鬼灵门传承法宝，可召唤万千阴魂' },
    { name: '噬魂珠', rarity: '极品法器', description: '可吞噬修士魂魄的阴毒法器' }
  ],

  fortunes: [
    { name: '暗灵根', type: '天赋', description: '拥有罕见的变异暗灵根，修炼鬼道功法事半功倍', realm: '凡人', significance: '天赋异禀' },
    { name: '鬼灵门少主之位', type: '机缘', description: '凭借修为和手段夺得少主之位', realm: '结丹', significance: '权势巅峰' }
  ],

  events: [
    { name: '与韩立交锋', type: '事件', description: '因利益冲突与韩立多次交手', realm: '结丹', significance: '宿敌相逢' }
  ],

  relationships: [
    { name: '韩立', relation: '宿敌', note: '与韩立多次交锋，各有胜负' }
  ],

  quotes: [
    { text: '修仙界本就是弱肉强食，谈何正义？', context: '为自己的行事方式辩护' },
    { text: '韩立……总有一天我会让你付出代价。', context: '与韩立交锋后的狠话' }
  ]
};

// ============================================================
// 境界 → 宇宙尺度映射
// ============================================================
window.REALM_SCALE_MAP = {
  '凡人': { level: 1, scale: '地球三层', visual: '地壳→地幔→地核' },
  '练气': { level: 2, scale: '行星', visual: '单一星球' },
  '筑基': { level: 3, scale: '恒星系统', visual: '行星绕恒星' },
  '结丹': { level: 4, scale: '星系', visual: '漩涡星系' },
  '元婴': { level: 5, scale: '本星系群', visual: '星系集群' },
  '化神': { level: 6, scale: '超星系团', visual: '星系长城' },
  '炼虚': { level: 7, scale: '可观测宇宙', visual: '宇宙网络' },
  '合体': { level: 8, scale: '多元宇宙', visual: '平行宇宙' },
  '大乘': { level: 9, scale: '大道之境', visual: '俯瞰苍生' },
  '渡劫': { level: 10, scale: '飞升之境', visual: '超脱三界' }
};

// ============================================================
// 3D 角色位置预设（境界越高，Y轴越高）
// ============================================================
(function computeOrbPositions() {
  var chars = window.CHARACTER_INDEX;
  var radius = 12;       // 轨道半径
  var baseY = -6;         // 最低境界的Y
  var maxY = 8;          // 最高境界的Y
  var minLevel = 5;      // 筑基
  var maxLevel = 10;     // 大乘

  chars.forEach(function(ch, i) {
    var angle = (i / chars.length) * Math.PI * 2;
    var t = (ch.realmLevel - minLevel) / (maxLevel - minLevel);
    ch.orbitAngle = angle;
    ch.orbitRadius = radius + (ch.realmLevel - minLevel) * 0.8;
    ch.position = {
      x: Math.cos(angle) * ch.orbitRadius,
      y: baseY + t * (maxY - baseY),
      z: Math.sin(angle) * ch.orbitRadius
    };
  });
})();
