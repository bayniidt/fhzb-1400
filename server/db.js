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
const insertContent = db.prepare('INSERT OR IGNORE INTO site_content (key, value_zh, value_en, type, module) VALUES (?, ?, ?, ?, ?)');
const seeds = [
  // 1. Home
  ['hero_title_1', '资本遇见雄心', 'Capital meets Ambition', 'text', 'home'],
  ['hero_title_2', '我们共筑峰峦', 'Building Summits Together', 'text', 'home'],
  ['hero_btn_1', '成为生态伙伴', 'Join the Ecosystem', 'text', 'home'],
  ['hero_btn_2', '探索资本路径', 'Explore Capital Paths', 'text', 'home'],
  ['hero_bg_video', '/fhzb/videos/背景_6.mp4', '/fhzb/videos/背景_6.mp4', 'media', 'home'],
  ['manifesto_title', '峰壑宣言', 'Peak & Valley Manifesto', 'text', 'home'],
  ['manifesto_content_1', '真正的资本', 'True capital', 'text', 'home'],
  ['manifesto_content_2', '是产业文明的加速器', 'accelerates industrial civilization', 'text', 'home'],
  ['manifesto_content_3', '而非收割器', 'instead of harvesting it', 'text', 'home'],
  ['manifesto_bg_image', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'home'],

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

  // 5. Alliance
  ['all_hero_title', '共筑峰峦', 'Alliance', 'text', 'alliance'],
  ['all_hero_bg', '/fhzb/videos/背景_2.mp4', '/fhzb/videos/背景_2.mp4', 'media', 'alliance'],

  // 6. Vision
  ['vis_hero_title', '峰壑视野', 'Vision', 'text', 'vision'],
  ['vis_hero_bg', '/fhzb/videos/背景_3.mp4', '/fhzb/videos/背景_3.mp4', 'media', 'vision'],

  // 7. Digital/Omega
  ['ome_hero_title', '数字峰壑', 'Digital', 'text', 'omega'],
  ['ome_hero_bg', '/fhzb/videos/背景_1.mp4', '/fhzb/videos/背景_1.mp4', 'media', 'omega'],
];
seeds.forEach(s => insertContent.run(...s));

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

module.exports = db;
