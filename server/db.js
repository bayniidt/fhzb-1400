const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value_zh TEXT,
    value_en TEXT,
    type TEXT DEFAULT 'text',
    module TEXT
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    title_zh TEXT,
    title_en TEXT,
    desc_zh TEXT,
    desc_en TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text_zh TEXT,
    text_en TEXT,
    display_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS gateways (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_zh TEXT,
    title_en TEXT,
    sub_zh TEXT,
    sub_en TEXT,
    image_url TEXT,
    href TEXT,
    display_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS navigation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_zh TEXT,
    name_en TEXT,
    href TEXT,
    display_order INTEGER DEFAULT 0,
    parent_id INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS contact_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT, -- 'phone', 'email', 'address'
    value TEXT,
    label_zh TEXT,
    label_en TEXT
  );
`);

// Seed initial content if empty or missing keys
const seeds = [
  // 1. Home - Banner
  ['home_banner_title_1', '资本遇见雄心', 'Capital meets Ambition', 'text', 'home'],
  ['home_banner_title_2', '我们共筑峰峦', 'Building Summits Together', 'text', 'home'],
  ['home_banner_btn_1', '成为生态伙伴', 'Join the Ecosystem', 'text', 'home'],
  ['home_banner_btn_2', '探索资本路径', 'Explore Capital Paths', 'text', 'home'],
  ['home_banner_video', '/fhzb/videos/背景_6.mp4', '/fhzb/videos/背景_6.mp4', 'media', 'home'],
  
  // 1. Home - Manifesto
  ['home_manifesto_title', '峰壑宣言', 'Peak & Valley Manifesto', 'text', 'home'],
  ['home_manifesto_content_1', '真正的资本', 'True capital', 'text', 'home'],
  ['home_manifesto_content_2', '是产业文明的加速器', 'accelerates industrial civilization', 'text', 'home'],
  ['home_manifesto_content_3', '而非收割器', 'instead of harvesting it', 'text', 'home'],
  ['home_manifesto_video', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'home'],

  // 1. Home - Hub
  ['home_hub_title', '核心价值枢纽', 'Core Value Hub', 'text', 'home'],
  ['home_hub_item1_title', '立足高远', 'Visionary Reach', 'text', 'home'],
  ['home_hub_item1_subtitle', '洞察产业趋势与国家战略。', 'Insights into industry trends and national strategy.', 'text', 'home'],
  ['home_hub_item1_image', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],
  ['home_hub_item2_title', '根系中国，培育创新“沃土”', 'Rooted in China, cultivating innovation', 'text', 'home'],
  ['home_hub_item2_image', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],
  ['home_hub_item3_title', '播种硬核，耕耘未来', 'Plant hard power, cultivate the future', 'text', 'home'],
  ['home_hub_item3_image', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],
  
  // 1. Home - News
  ['home_news_left_tag', 'GALAXY NETWORK', 'GALAXY NETWORK', 'text', 'home'],
  ['home_news_left_title', '峰壑星系网络', 'Galaxy Network', 'text', 'home'],
  ['home_news_left_desc', '总部中央战略指挥与全国区域俱乐部节点交汇的广袤版图。', 'A vast map where the central strategic command of the headquarters meets the nodes of regional clubs across the country.', 'text', 'home'],
  ['home_news_left_btn', '进入星系地图', 'Enter Galaxy Map', 'text', 'home'],
  ['home_news_right_tag', 'LATEST UPDATES', 'LATEST UPDATES', 'text', 'home'],
  ['home_news_right_title', '最新动态', 'News', 'text', 'home'],

  // 1. Home - Question
  ['home_ascent_title', '开启攀登之路', 'Start Your Ascent', 'text', 'home'],
  ['home_ascent_video', '/fhzb/videos/背景_1.mp4', '/fhzb/videos/背景_1.mp4', 'media', 'home'],

  // 2. Philosophy
  ['phi_hero_title', '平原思维与峰峦思维', 'Linear Mindset', 'text', 'philosophy'],
  ['phi_hero_bg', '/fhzb/videos/股市_3.jpg', '/fhzb/videos/股市_3.jpg', 'media', 'philosophy'],
  ['phi_mission_content', '赋能实体产业攀登资本峰峦，守护长期价值穿越时代周期。', 'Empowering industries to climb capital summits, safeguarding long-term value through through historical cycles.', 'text', 'philosophy'],
  ['phi_vision_content', '成为全球创新经济体中，最具信任感的产业资本共生平台。', 'To become the most trusted industrial capital synergy platform in the global innovation economy.', 'text', 'philosophy'],
  
  // 3. Capital O.S.
  ['os_hero_title', '攀登系统', 'Operating System', 'text', 'os'],
  ['os_hero_subtitle', '我们不依赖运气或直觉。峰壑资本通过一套闭环的资本操作系统，驱动实业与资本的确定性增长。', 'We don’t rely on luck or intuition. FH Capital is driven by a closed-loop Capital Operating System, driving deterministic growth.', 'text', 'os'],
  ['os_hero_bg', '/fhzb/videos/股市_2.jpg', '/fhzb/videos/股市_2.jpg', 'media', 'os'],

  // 4. Galaxy
  ['gal_hero_title', '总部 · 中央引擎', 'HQ · Central Engine', 'text', 'galaxy'],
  ['gal_hero_subtitle', '并非简单的发号施令，而是向整张生态星系高频倾泻算力、共识与资源。', 'Not just giving orders, but continuously pouring computing power, consensus, and resources into the entire ecosystem galaxy.', 'text', 'galaxy'],
  ['gal_hero_bg', '/fhzb/videos/背景图_4.jpg', '/fhzb/videos/背景图_4.jpg', 'media', 'galaxy'],
];

const insertOrUpdate = db.prepare(`
  INSERT INTO site_content (key, value_zh, value_en, type, module) 
  VALUES (?, ?, ?, ?, ?)
  ON CONFLICT(key) DO UPDATE SET
    value_zh = excluded.value_zh,
    value_en = excluded.value_en
  WHERE site_content.value_zh IS NULL OR site_content.value_zh = ''
`);

seeds.forEach(s => insertOrUpdate.run(...s));

// Seed initial navigation if empty
const navCount = db.prepare('SELECT COUNT(*) as count FROM navigation').get();
if (navCount.count === 0) {
  const insertNav = db.prepare('INSERT INTO navigation (name_zh, name_en, href, display_order) VALUES (?, ?, ?, ?)');
  insertNav.run('首页', 'Home', '/', 1);
  insertNav.run('峰壑哲学', 'Philosophy', '/philosophy', 2);
  insertNav.run('资本系统', 'Capital O.S.', '/os', 3);
  insertNav.run('峰壑星系', 'Galaxy', '/galaxy', 4);
  insertNav.run('共筑峰峦', 'Alliance', '/alliance', 5);
  insertNav.run('峰壑视野', 'Vision', '/vision', 6);
  insertNav.run('数字峰壑', 'Digital', '/omega', 7);
}

// Seed initial contact info if empty
const contactCount = db.prepare('SELECT COUNT(*) as count FROM contact_info').get();
if (contactCount.count === 0) {
  const insertContact = db.prepare('INSERT INTO contact_info (type, value, label_zh, label_en) VALUES (?, ?, ?, ?)');
  insertContact.run('phone', '17858452245', '联系电话', 'Phone');
  insertContact.run('email', 'contact@fhzb.com', '电子邮箱', 'Email');
}

// Seed initial news if empty
const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get();
if (newsCount.count === 0) {
  const insertNews = db.prepare('INSERT INTO news (date, title_zh, title_en, desc_zh, desc_en) VALUES (?, ?, ?, ?, ?)');
  insertNews.run('2026.04', '深创投集团多名女性投资人荣登清科投资界、单...', 'Female Investors Honored', '近日，多家股权投资服务机构相继发布女性投资人榜单，深创投多名女性投资人进入榜单。', 'Several female investors from Shenzhen Capital Group were included in the list.');
  insertNews.run('2026.03', '生态基金规模破百亿，跨越重要里程碑', 'Eco-Fund Exceeds 10 Billion', '近日，多家股权投资机构相继发布年度报告，峰壑体系基金规模正式突破百亿大关。', 'The FH system fund scale has officially exceeded the 10 billion mark.');
  insertNews.run('2026.02', '华东大区俱乐部正式启幕，极核模式加速', 'East China Club Officially Opens', '战略指挥部与区域节点深度互动，赋能长三角高价值产业链发展。', 'Strategic headquarters interact deeply with regional nodes, empowering high-value industrial chains.');
}

console.log('Database initialized successfully.');

module.exports = db;
