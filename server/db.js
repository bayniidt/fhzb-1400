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
  ['phi_core1_video', '/fhzb/videos/batch-compressed.mp4', '/fhzb/videos/batch-compressed.mp4', 'media', 'philosophy'],
  ['phi_core2_title', '第一性原理思维', 'First Principles', 'text', 'philosophy'],
  ['phi_core2_desc', '回归事物本质。剥离行业经验与跟风情绪，回归事物最硬核的本质属性。', 'Return to the essence of things. Strip away industry experience and emotion to find the core attributes.', 'text', 'philosophy'],
  ['phi_core2_video', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'philosophy'],
  ['phi_core3_title', '全球化智慧文化', 'Global Intelligence', 'text', 'philosophy'],
  ['phi_core3_desc', '国际格局+本土深耕。拥有俯视周期的国际格局，更能俯身执行本土的泥泞深耕。', 'Global perspective + local deep-rooting. International vision with local execution.', 'text', 'philosophy'],
  ['phi_core3_video', '/fhzb/videos/背景_3.mp4', '/fhzb/videos/背景_3.mp4', 'media', 'philosophy'],

  // Philosophy - Cultural Symbols
  ['phi_cultural_video', '/fhzb/videos/footer-compressed.mp4', '/fhzb/videos/footer-compressed.mp4', 'media', 'philosophy'],

  // Philosophy - Founder Letter
  ['phi_letter_bg', 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=2000&q=80', 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=2000&q=80', 'media', 'philosophy'],

  // OS - Stage 1 (融)
  ['os_stage1_title', '第一性原理：如何测绘产业根基', 'First Principles: Mapping Industrial Foundations', 'text', 'os'],
  ['os_stage1_desc', '摒弃项目制散养，通过超10亿级基石基金锁定产业筹码，确保资本在不确定周期中的绝对掌控力。', 'Rejecting project-based decentralization, locking industrial chips with 1B+ cornerstone fund.', 'text', 'os'],
  ['os_stage1_video', '/fhzb/videos/batch-compressed.mp4', '/fhzb/videos/batch-compressed.mp4', 'media', 'os'],

  // OS - Stage 2 (投)
  ['os_stage2_title', '第一性原理：标注资本等高线', 'First Principles: Marking Capital Contours', 'text', 'os'],
  ['os_stage2_desc', '穿透PPT与财务修饰，直抵技术底层与产业终局。我们不听故事，只推演生产力爆发的数学基准。', 'Penetrating PPT and financial window-dressing to reach the tech bottom layer and industrial endgame.', 'text', 'os'],
  ['os_stage2_video', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'os'],

  // OS - Stage 3 (管)
  ['os_stage3_title', '沉浸式赋能：模型重构', 'Immersive Empowerment: Re-modeling', 'text', 'os'],
  ['os_stage3_desc', '派驻"影子CEO"级合伙人，在组织治理、极核裂变与资本路径上进行手术刀式干预，纠偏航向。', 'Deploying "Shadow CEO" level partners for surgical intervention in organizational governance.', 'text', 'os'],
  ['os_stage3_video', '/fhzb/videos/global-compressed.mp4', '/fhzb/videos/global-compressed.mp4', 'media', 'os'],

  // OS - Stage 4 (退)
  ['os_stage4_title', '登阶升维：跨区域裂变', 'Upgrade: Cross-border Fission', 'text', 'os'],
  ['os_stage4_desc', '不仅是拿钱离场。通过合伙人系统，将被投企业转化为新的生态节点，实现从孤岛到版图的升维。', 'Portfolio companies transform into new ecosystem nodes, upgrading from "islands" to "territories".', 'text', 'os'],
  ['os_stage4_video', '/fhzb/videos/footer-compressed.mp4', '/fhzb/videos/footer-compressed.mp4', 'media', 'os'],

  // OS - Commitments
  ['os_commitment_1_value', '100%', '100%', 'text', 'os'],
  ['os_commitment_1_detail', '真实案例：某硬科技企业通过 OKR 极核对齐实现 200% 增长', 'Case Study: Tech firm achieved 200% growth via OKR alignment', 'text', 'os'],
  ['os_commitment_2_value', '24%', '24%', 'text', 'os'],
  ['os_commitment_2_detail', '劣后级资金保障，已为 12 位 LP 成功对冲周期风险', 'Junior tranche protection: Hedged risks for 12+ LPs', 'text', 'os'],
  ['os_commitment_3_value', '24%', '24%', 'text', 'os'],
  ['os_commitment_3_detail', '脱敏数据：过去 5 年所有回购协议均 100% 履行', 'Data: 100% fulfillment of buyback agreements over 5 years', 'text', 'os'],
  ['os_commitment_4_value', '100%', '100%', 'text', 'os'],
  ['os_commitment_4_detail', '确定性路径：目前在管项目 IPO 申报通过率领先行业', 'Deterministic Path: Leading industry in IPO approval rates', 'text', 'os'],
  ['os_workflow_bg', '/fhzb/videos/工作流背景.jpg', '/fhzb/videos/工作流背景.jpg', 'media', 'os'],

  // Galaxy - HQ Roles
  ['gal_hq_role1_title', '标准制定者', 'Standards Architect', 'text', 'galaxy'],
  ['gal_hq_role1_desc', '构建资本准入与模型审计的终极标尺，确保整张星系图谱的无缝融合与代码统一。', 'Constructing ultimate benchmarks for capital entry and model audits.', 'text', 'galaxy'],
  ['gal_hq_role2_title', '资源赋能者', 'Resource Enabler', 'text', 'galaxy'],
  ['gal_hq_role2_desc', '自顶向下倾泻极核级产业资源、并购模型与大体量基石基金阵列。', 'Pouring down industry resources, M&A models, and massive cornerstone fund arrays.', 'text', 'galaxy'],
  ['gal_hq_role3_title', '生态连接者', 'Ecosystem Connector', 'text', 'galaxy'],
  ['gal_hq_role3_desc', '打破信息孤岛，撮合跨界共生，成为创新经济网络中的超级路由器。', 'Breaking information silos, matching cross-border synergies as a super router.', 'text', 'galaxy'],
  ['gal_hq_role4_title', '品牌塑造者', 'Brand Shaper', 'text', 'galaxy'],
  ['gal_hq_role4_desc', '为矩阵内的标的公司打上代表了绝对信任与顶级专业度的白名单烙印。', 'Branding portfolio companies with absolute trust and top-tier professionalism.', 'text', 'galaxy'],
  ['gal_hq_role5_title', '风险守护者', 'Risk Guardian', 'text', 'galaxy'],
  ['gal_hq_role5_desc', '悬崖边的最后一道保险带，以极端悲观主义视角预判周期危机并对冲闭环。', 'The final safety belt, predicting and hedging systemic crises with extreme realism.', 'text', 'galaxy'],

  // Galaxy - Regions
  ['gal_region1_name', '华南极核 / 深圳', 'South China / Shenzhen', 'text', 'galaxy'],
  ['gal_region1_label', '大湾区资本枢纽', 'GBA Capital Hub', 'text', 'galaxy'],
  ['gal_region2_name', '华东极核 / 上海', 'East China / Shanghai', 'text', 'galaxy'],
  ['gal_region2_label', '长三角生态动脉', 'YRD Ecosystem Artery', 'text', 'galaxy'],
  ['gal_region3_name', '西南极核 / 成都', 'Southwest / Chengdu', 'text', 'galaxy'],
  ['gal_region3_label', '新质生产力跳板', 'Productivity Lever', 'text', 'galaxy'],
  ['gal_region4_name', '华北前哨 / 北京', 'North China / Beijing', 'text', 'galaxy'],
  ['gal_region4_label', '政商顶层架构矩阵', 'Policy Matrix', 'text', 'galaxy'],
  ['gal_region_map_bg', '/fhzb/videos/背景图_3.jpg', '/fhzb/videos/背景图_3.jpg', 'media', 'galaxy'],
  ['gal_synergy_bg', '/fhzb/videos/协同网络背景.jpg', '/fhzb/videos/协同网络背景.jpg', 'media', 'galaxy'],

  // Galaxy - CTA
  ['gal_cta_title', '占领极点，', 'Capture the core,', 'text', 'galaxy'],
  ['gal_cta_subtitle', '点亮下一个星区。', 'ignite the next sector.', 'text', 'galaxy'],
  ['gal_cta_desc', '区域独家席位稀缺。\n只寻找具有深厚产业底盘与极客风范的同路人。', 'Exclusive regional seats are scarce.\nSeeking partners with deep industrial roots and geek spirit.', 'text', 'galaxy'],
  ['gal_cta_bg', '/fhzb/videos/cta背景.jpg', '/fhzb/videos/cta背景.jpg', 'media', 'galaxy'],

  // Alliance - Clusters
  ['all_hero_title', '共筑峰峦', 'Alliance', 'text', 'alliance'],
  ['all_hero_bg', '/fhzb/videos/股市_1.jpg', '/fhzb/videos/股市_1.jpg', 'media', 'alliance'],
  ['all_cluster1_video', '/fhzb/videos/batch-compressed.mp4', '/fhzb/videos/batch-compressed.mp4', 'media', 'alliance'],
  ['all_cluster2_video', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'alliance'],
  ['all_cluster3_video', '/fhzb/videos/global-compressed.mp4', '/fhzb/videos/global-compressed.mp4', 'media', 'alliance'],
  ['all_cluster4_video', '/fhzb/videos/banner-m.mp4', '/fhzb/videos/banner-m.mp4', 'media', 'alliance'],
  ['all_cta_bg', '/fhzb/videos/alliance_cta_bg.jpg', '/fhzb/videos/alliance_cta_bg.jpg', 'media', 'alliance'],

  // Vision - Hero
  ['vis_hero_title', '峰壑视野', 'Summit Insights', 'text', 'vision'],
  ['vis_hero_bg', '/fhzb/videos/背景图_5.jpg', '/fhzb/videos/背景图_5.jpg', 'media', 'vision'],

  // Vision
  ['vis_doc_cover', '/fhzb/videos/背景图_2.jpg', '/fhzb/videos/背景图_2.jpg', 'media', 'vision'],
  ['vis_doc_video', '/fhzb/videos/纪录片.mp4', '/fhzb/videos/纪录片.mp4', 'media', 'vision'],
  ['vis_summit_bg', '/fhzb/videos/股市_5.jpg', '/fhzb/videos/股市_5.jpg', 'media', 'vision'],
  ['vis_summit_quote', '我们要的不是短期的账面浮盈，而是要在这片不确定的土壤里，钉下一片能抵御10级风暴的防风林。', 'What we seek is not short-term paper profit, but to plant a windbreak that can withstand a stage-10 storm.', 'text', 'vision'],

  // Vision - Columns
  ['vis_col1_title', '别再沉迷PPT估值：产业周期下行的三大破局点', 'Stop PPT Valuations: Three Breakout Points in Downturn Cycles', 'text', 'vision'],
  ['vis_col1_type', '深度阅读 & 播客', 'Long Read & Podcast', 'text', 'vision'],
  ['vis_col1_author', '首席尽调官', 'Chief Due Diligence Officer', 'text', 'vision'],
  ['vis_col2_title', '从流量生意到生态门槛：如何构建真正的资本护城河？', 'From Traffic to Ecosystem: Building True Capital Moats', 'text', 'vision'],
  ['vis_col2_type', '播客解读', 'Podcast Analysis', 'text', 'vision'],
  ['vis_col2_author', '极核合伙人', 'Core Partner', 'text', 'vision'],

  // Vision - Reports
  ['vis_report1_title', '资本路径重构：新质生产力上市合规全周期', 'Capital Path Reconstruction: IPO Compliance Cycle for New Productivity', 'text', 'vision'],
  ['vis_report1_year', '2026', '2026', 'text', 'vision'],
  ['vis_report1_cover', '/fhzb/videos/股市_2.jpg', '/fhzb/videos/股市_2.jpg', 'media', 'vision'],
  ['vis_report2_title', '穿越死亡谷：被投企业失败模型及风控止损研究', 'Through Death Valley: Failure Models and Risk Control Research', 'text', 'vision'],
  ['vis_report2_year', '2025', '2025', 'text', 'vision'],
  ['vis_report2_cover', '/fhzb/videos/股市_3.jpg', '/fhzb/videos/股市_3.jpg', 'media', 'vision'],
  ['vis_report3_title', '区域深耕：合伙人生态网络极核裂变模型分析', 'Regional Depth: Fission Model Analysis of Partner Ecosystems', 'text', 'vision'],
  ['vis_report3_year', '2025', '2025', 'text', 'vision'],
  ['vis_report3_cover', '/fhzb/videos/股市_4.jpg', '/fhzb/videos/股市_4.jpg', 'media', 'vision'],

  // Vision - News
  ['vis_news1_title', '峰壑资本宣告旗下首支超10亿级基石盲池基金封闭完毕。', 'Fenghe Capital announces the closing of its first Billion-level blind pool fund.', 'text', 'vision'],
  ['vis_news1_date', 'MAR 12, 2026', 'MAR 12, 2026', 'text', 'vision'],
  ['vis_news1_source', '彭博商业评论', 'Bloomberg Business', 'text', 'vision'],
  ['vis_news2_title', '专访峰壑创始人：在平原上狂奔的时代结束，登峰才刚刚开始。', 'Interview with Founder: The era of running on plains is over; the climb has just begun.', 'text', 'vision'],
  ['vis_news2_date', 'FEB 08, 2026', 'FEB 08, 2026', 'text', 'vision'],
  ['vis_news2_source', '顶流财经周刊', 'Leading Finance Weekly', 'text', 'vision'],
  ['vis_news3_title', '重构区域生态圈层：华东与跨广深两大极核俱乐部同日挂牌。', 'Restructuring Regional Ecosystems: East China and GBA Clubs launched on the same day.', 'text', 'vision'],
  ['vis_news3_date', 'JAN 21, 2026', 'JAN 21, 2026', 'text', 'vision'],
  ['vis_news3_source', '官方新闻公告', 'Official Announcement', 'text', 'vision'],

  // Omega - Hero
  ['ome_hero_title', '峰壑数据看板', 'OMEGA PROGRAM', 'text', 'omega'],
  ['ome_hero_bg', '/fhzb/videos/背景图_3.jpg', '/fhzb/videos/背景图_3.jpg', 'media', 'omega'],

  // Omega
  ['ome_stat1_value', '300+', '300+', 'text', 'omega'],
  ['ome_stat1_label', '生态总规模', 'Invested Projects', 'text', 'omega'],
  ['ome_stat2_value', '50+', '50+', 'text', 'omega'],
  ['ome_stat2_label', '覆盖行业', 'Public Companies', 'text', 'omega'],
  ['ome_stat3_value', '15+', '15+', 'text', 'omega'],
  ['ome_stat3_label', '区域网络活跃度', 'Years of Experience', 'text', 'omega'],
  ['ome_nft_bg', '/fhzb/videos/背景图_4.jpg', '/fhzb/videos/背景图_4.jpg', 'media', 'omega'],
  ['ome_nft_title', '数字通行证', 'Digital Pass', 'text', 'omega'],
  ['ome_nft_desc', '为会员、合伙人发行的基于区块链的数字身份/勋章，享受多重生态特权。', 'Blockchain-based digital identities for members and partners with exclusive ecological privileges.', 'text', 'omega'],
  ['ome_archive_step1_title', '项目发起', 'Initiation', 'text', 'omega'],
  ['ome_archive_step1_desc', '原始想法验证与种子轮融资存证', 'Idea validation & Seed funding', 'text', 'omega'],
  ['ome_archive_step2_title', '关键里程碑', 'Milestone', 'text', 'omega'],
  ['ome_archive_step2_desc', '核心产品发布与首批用户突破', 'MVP launch & Initial user growth', 'text', 'omega'],
  ['ome_archive_step3_title', '资本加速', 'Acceleration', 'text', 'omega'],
  ['ome_archive_step3_desc', 'A轮融资完成与生态资源对齐', 'Series A & Eco alignment', 'text', 'omega'],
  ['ome_archive_step4_title', '登峰上市', 'IPO / Exit', 'text', 'omega'],
  ['ome_archive_step4_desc', '敲钟仪式记录与长期价值证明', 'Listing & Long-term value', 'text', 'omega'],
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
