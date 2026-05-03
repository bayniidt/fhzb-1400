const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || path.resolve(__dirname, 'database.sqlite');
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

  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    is_super_admin INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    role_label_zh TEXT NOT NULL,
    role_label_en TEXT NOT NULL,
    submitter_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    company_or_org TEXT,
    region TEXT,
    summary TEXT,
    details_json TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    admin_note TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial content
const seeds = [
  // 1. Home
  ['home_banner_title_1', '资本遇见雄心', 'Capital meets Ambition', 'text', 'home'],
  ['home_banner_title_2', '我们共筑巅峰', 'Building Summits Together', 'text', 'home'],
  ['home_banner_btn_1', '成为生态伙伴', 'Join the Ecosystem', 'text', 'home'],
  ['home_banner_btn_2', '探索资本路径', 'Explore Capital Paths', 'text', 'home'],
  ['home_banner_video', '/videos/背景_6.mp4', '/videos/背景_6.mp4', 'media', 'home'],

  ['home_manifesto_title', '巅峰宣言', 'Peak & Valley Manifesto', 'text', 'home'],
  ['home_manifesto_content_1', '真正的资本', 'True capital', 'text', 'home'],
  ['home_manifesto_content_2', '是产业文明的加速器', 'accelerates industrial civilization', 'text', 'home'],
  ['home_manifesto_content_3', '而非收割机', 'instead of harvesting it', 'text', 'home'],
  ['home_manifesto_video', '/videos/block-compressed.mp4', '/videos/block-compressed.mp4', 'media', 'home'],

  ['home_hub_title', '核心价值枢纽', 'Core Value Hub', 'text', 'home'],
  ['home_hub_item1_title', '立足高远', 'Visionary Reach', 'text', 'home'],
  ['home_hub_item1_subtitle', '洞察产业趋势与国家战略。', 'Insights into industry trends and national strategy.', 'text', 'home'],
  ['home_hub_item1_image', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],
  ['home_hub_item2_title', '根系中国，培育创新“沃土”', 'Rooted in China, cultivating innovation', 'text', 'home'],
  ['home_hub_item2_image', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],
  ['home_hub_item3_title', '播种硬核，耕耘未来', 'Plant hard power, cultivate the future', 'text', 'home'],
  ['home_hub_item3_image', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],

  ['home_news_left_tag', 'GALAXY NETWORK', 'GALAXY NETWORK', 'text', 'home'],
  ['home_news_left_title', '巅峰星系网络', 'Galaxy Network', 'text', 'home'],
  ['home_news_left_desc', '总部中央战略指挥与全国区域俱乐部节点交汇的广袤版图。', 'A vast map where the central strategic command of the headquarters meets the nodes of regional clubs across the country.', 'text', 'home'],
  ['home_news_left_btn', '进入星系地图', 'Enter Galaxy Map', 'text', 'home'],
  ['home_news_right_tag', 'LATEST UPDATES', 'LATEST UPDATES', 'text', 'home'],
  ['home_news_right_title', '最新动态', 'News', 'text', 'home'],

  ['home_ascent_title', '开启攀登之路', 'Start Your Ascent', 'text', 'home'],
  ['home_ascent_video', '/videos/背景_1.mp4', '/videos/背景_1.mp4', 'media', 'home'],

  // 2. Philosophy
  ['phi_hero_title', '平原思维与巅峰思维', 'Linear Mindset', 'text', 'philosophy'],
  ['phi_hero_bg', '/videos/股市_3.jpg', '/videos/股市_3.jpg', 'media', 'philosophy'],
  ['phi_mission_content', '赋能实体产业攀登资本巅峰，守护长期价值穿越时代周期。', 'Empowering industries to climb capital summits, safeguarding long-term value through through historical cycles.', 'text', 'philosophy'],
  ['phi_vision_content', '成为全球创新经济中，最具信任感的产业资本共生平台。', 'To become the most trusted industrial capital synergy platform in the global innovation economy.', 'text', 'philosophy'],

  // 3. Capital O.S.
  ['os_hero_title', '攀登系统', 'Operating System', 'text', 'os'],
  ['os_hero_subtitle', '我们不依赖运气或直觉。巅峰资本通过一套闭环的资本操作系统，驱动实业与资本的确定性增长。', 'We don’t rely on luck or intuition. FH Capital is driven by a closed-loop Capital Operating System, driving deterministic growth.', 'text', 'os'],
  ['os_hero_bg', '/videos/股市_2.jpg', '/videos/股市_2.jpg', 'media', 'os'],

  // 4. Galaxy
  ['gal_hero_title', '总部 · 中央引擎', 'HQ · Central Engine', 'text', 'galaxy'],
  ['gal_hero_subtitle', '并非简单的发号施令，而是向整张生态星系高频倾注算力、共识与资源。', 'Not just giving orders, but continuously pouring computing power, consensus, and resources into the entire ecosystem galaxy.', 'text', 'galaxy'],
  ['gal_hero_bg', '/videos/背景图4.jpg', '/videos/背景图4.jpg', 'media', 'galaxy'],

  // Philosophy - Values
  ['phi_val1_title', '专业极客', 'Professional Geek', 'text', 'philosophy'],
  ['phi_val1_desc', '以极致的专业精神对待尽调与风控，绝不用情绪做决策。', 'Uncompromising professionalism in due diligence and risk control, never making decisions based on emotions.', 'text', 'philosophy'],
  ['phi_val2_title', '生态共建', 'Ecosystem Builder', 'text', 'philosophy'],
  ['phi_val2_desc', '打破资本孤岛，与实业者、区域合伙人结成生死同盟。', 'Breaking capital silos, forming life-and-death alliances with industrialists and regional partners.', 'text', 'philosophy'],
  ['phi_val3_title', '伙伴优先', 'Partners First', 'text', 'philosophy'],
  ['phi_val3_desc', '在任何利益冲突面前，保障生态网络中伙伴的优先权益。', 'Prioritizing the rights and interests of partners in the ecosystem network before any conflicts of interest.', 'text', 'philosophy'],
  ['phi_val4_title', '行诺致远', 'Integrity for Longevity', 'text', 'philosophy'],
  ['phi_val4_desc', '不作无法兑现的收益担保，一旦承诺必用全部身家背书。', 'Never make unrealistic promises; once committed, back it with everything we have.', 'text', 'philosophy'],

  // Philosophy - Core Concepts
  ['phi_core1_title', '闭环交付文化', 'Closed-loop Culture', 'text', 'philosophy'],
  ['phi_core1_desc', '规划·执行·反馈·闭环。没有终点的许诺皆为虚妄。', 'Plan, Execute, Feedback, Close. Promises without results are illusions.', 'text', 'philosophy'],
  ['phi_core1_video', '/videos/batch-compressed.mp4', '/videos/batch-compressed.mp4', 'media', 'philosophy'],
  ['phi_core2_title', '第一性原理思维', 'First Principles', 'text', 'philosophy'],
  ['phi_core2_desc', '回归事物本质。剥离行业经验与跟风情绪，回归事物最硬核的本质属性。', 'Return to the essence of things. Strip away industry experience and emotion to find the core attributes.', 'text', 'philosophy'],
  ['phi_core2_video', '/videos/block-compressed.mp4', '/videos/block-compressed.mp4', 'media', 'philosophy'],
  ['phi_core3_title', '全球化智慧文化', 'Global Intelligence', 'text', 'philosophy'],
  ['phi_core3_desc', '国际格局+本土深耕。拥有俯瞰周期的国际格局，更能俯身执行本土的泥泞深耕。', 'Global perspective + local deep-rooting. International vision with local execution.', 'text', 'philosophy'],
  ['phi_core3_video', '/videos/背景_3.mp4', '/videos/背景_3.mp4', 'media', 'philosophy'],

  // OS Stages and remaining items...
  // (后续内容同理，请确认所有中文文案准确性)
];

const insertOrUpdate = db.prepare(`
  INSERT INTO site_content (key, value_zh, value_en, type, module) 
  VALUES (?, ?, ?, ?, ?)
  ON CONFLICT(key) DO UPDATE SET
    value_zh = excluded.value_zh,
    value_en = excluded.value_en
`);

seeds.forEach(s => insertOrUpdate.run(...s));

// Seed navigation
const navCount = db.prepare('SELECT COUNT(*) as count FROM navigation').get();
if (navCount.count === 0) {
  const insertNav = db.prepare('INSERT INTO navigation (name_zh, name_en, href, display_order) VALUES (?, ?, ?, ?)');
  insertNav.run('首页', 'Home', '/', 1);
  insertNav.run('巅峰哲学', 'Philosophy', '/philosophy', 2);
  insertNav.run('资本系统', 'Capital O.S.', '/os', 3);
  insertNav.run('巅峰星系', 'Galaxy', '/galaxy', 4);
  insertNav.run('共筑巅峰', 'Alliance', '/alliance', 5);
  insertNav.run('巅峰视野', 'Vision', '/vision', 6);
  insertNav.run('数字巅峰', 'Digital', '/omega', 7);
}

// Seed contact
const contactCount = db.prepare('SELECT COUNT(*) as count FROM contact_info').get();
if (contactCount.count === 0) {
  const insertContact = db.prepare('INSERT INTO contact_info (type, value, label_zh, label_en) VALUES (?, ?, ?, ?)');
  insertContact.run('phone', '13681660460', '联系电话', 'Phone');
  insertContact.run('email', 'zhenyongwv@hotmail.com', '电子邮箱', 'Email');
}

// Seed news
const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get();
if (newsCount.count === 0) {
  const insertNews = db.prepare('INSERT INTO news (date, title_zh, title_en, desc_zh, desc_en) VALUES (?, ?, ?, ?, ?)');
  insertNews.run('2026.04', '深创投集团多名女性投资人荣登清科投资界...', 'Female Investors Honored', '近日，多家股权投资服务机构相继发布女性投资人榜单，深创投多名女性投资人进入榜单。', 'Several female investors from Shenzhen Capital Group were included in the list.');
  insertNews.run('2026.03', '生态基金规模破百亿，跨越重要里程碑', 'Eco-Fund Exceeds 10 Billion', '近日，多家股权投资机构相继发布年度报告，巅峰体系基金规模正式突破百亿大关。', 'The FH system fund scale has officially exceeded the 10 billion mark.');
}

// Seed super admin
const adminCount = db.prepare("SELECT COUNT(*) as count FROM members WHERE phone = '17858452245'").get();
if (adminCount.count === 0) {
  db.prepare("INSERT INTO members (name, phone, is_super_admin) VALUES (?, ?, ?)").run('超级管理员', '17858452245', 1);
}

console.log('Database initialized successfully.');
module.exports = db;