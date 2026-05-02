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

// Seed initial content if empty or missing keys
const seeds = [
  // 1. Home - Banner
  ['home_banner_title_1', '璧勬湰閬囪闆勫績', 'Capital meets Ambition', 'text', 'home'],
  ['home_banner_title_2', '鎴戜滑鍏辩瓚宄板肠', 'Building Summits Together', 'text', 'home'],
  ['home_banner_btn_1', '鎴愪负鐢熸€佷紮浼?, 'Join the Ecosystem', 'text', 'home'],
  ['home_banner_btn_2', '鎺㈢储璧勬湰璺緞', 'Explore Capital Paths', 'text', 'home'],
  ['home_banner_video', '/fhzb/videos/鑳屾櫙_6.mp4', '/fhzb/videos/鑳屾櫙_6.mp4', 'media', 'home'],
  
  // 1. Home - Manifesto
  ['home_manifesto_title', '宄板瀹ｈ█', 'Peak & Valley Manifesto', 'text', 'home'],
  ['home_manifesto_content_1', '鐪熸鐨勮祫鏈?, 'True capital', 'text', 'home'],
  ['home_manifesto_content_2', '鏄骇涓氭枃鏄庣殑鍔犻€熷櫒', 'accelerates industrial civilization', 'text', 'home'],
  ['home_manifesto_content_3', '鑰岄潪鏀跺壊鍣?, 'instead of harvesting it', 'text', 'home'],
  ['home_manifesto_video', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'home'],

  // 1. Home - Hub
  ['home_hub_title', '鏍稿績浠峰€兼灑绾?, 'Core Value Hub', 'text', 'home'],
  ['home_hub_item1_title', '绔嬭冻楂樿繙', 'Visionary Reach', 'text', 'home'],
  ['home_hub_item1_subtitle', '娲炲療浜т笟瓒嬪娍涓庡浗瀹舵垬鐣ャ€?, 'Insights into industry trends and national strategy.', 'text', 'home'],
  ['home_hub_item1_image', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],
  ['home_hub_item2_title', '鏍圭郴涓浗锛屽煿鑲插垱鏂扳€滄矁鍦熲€?, 'Rooted in China, cultivating innovation', 'text', 'home'],
  ['home_hub_item2_image', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],
  ['home_hub_item3_title', '鎾纭牳锛岃€曡€樻湭鏉?, 'Plant hard power, cultivate the future', 'text', 'home'],
  ['home_hub_item3_image', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200', 'media', 'home'],
  
  // 1. Home - News
  ['home_news_left_tag', 'GALAXY NETWORK', 'GALAXY NETWORK', 'text', 'home'],
  ['home_news_left_title', '宄板鏄熺郴缃戠粶', 'Galaxy Network', 'text', 'home'],
  ['home_news_left_desc', '鎬婚儴涓ぎ鎴樼暐鎸囨尌涓庡叏鍥藉尯鍩熶勘涔愰儴鑺傜偣浜ゆ眹鐨勫箍琚ょ増鍥俱€?, 'A vast map where the central strategic command of the headquarters meets the nodes of regional clubs across the country.', 'text', 'home'],
  ['home_news_left_btn', '杩涘叆鏄熺郴鍦板浘', 'Enter Galaxy Map', 'text', 'home'],
  ['home_news_right_tag', 'LATEST UPDATES', 'LATEST UPDATES', 'text', 'home'],
  ['home_news_right_title', '鏈€鏂板姩鎬?, 'News', 'text', 'home'],

  // 1. Home - Question
  ['home_ascent_title', '寮€鍚攢鐧讳箣璺?, 'Start Your Ascent', 'text', 'home'],
  ['home_ascent_video', '/fhzb/videos/鑳屾櫙_1.mp4', '/fhzb/videos/鑳屾櫙_1.mp4', 'media', 'home'],

  // 2. Philosophy
  ['phi_hero_title', '骞冲師鎬濈淮涓庡嘲宄︽€濈淮', 'Linear Mindset', 'text', 'philosophy'],
  ['phi_hero_bg', '/fhzb/videos/鑲″競_3.jpg', '/fhzb/videos/鑲″競_3.jpg', 'media', 'philosophy'],
  ['phi_mission_content', '璧嬭兘瀹炰綋浜т笟鏀€鐧昏祫鏈嘲宄︼紝瀹堟姢闀挎湡浠峰€肩┛瓒婃椂浠ｅ懆鏈熴€?, 'Empowering industries to climb capital summits, safeguarding long-term value through through historical cycles.', 'text', 'philosophy'],
  ['phi_vision_content', '鎴愪负鍏ㄧ悆鍒涙柊缁忔祹浣撲腑锛屾渶鍏蜂俊浠绘劅鐨勪骇涓氳祫鏈叡鐢熷钩鍙般€?, 'To become the most trusted industrial capital synergy platform in the global innovation economy.', 'text', 'philosophy'],
  
  // 3. Capital O.S.
  ['os_hero_title', '鏀€鐧荤郴缁?, 'Operating System', 'text', 'os'],
  ['os_hero_subtitle', '鎴戜滑涓嶄緷璧栬繍姘旀垨鐩磋銆傚嘲澹戣祫鏈€氳繃涓€濂楅棴鐜殑璧勬湰鎿嶄綔绯荤粺锛岄┍鍔ㄥ疄涓氫笌璧勬湰鐨勭‘瀹氭€у闀裤€?, 'We don鈥檛 rely on luck or intuition. FH Capital is driven by a closed-loop Capital Operating System, driving deterministic growth.', 'text', 'os'],
  ['os_hero_bg', '/fhzb/videos/鑲″競_2.jpg', '/fhzb/videos/鑲″競_2.jpg', 'media', 'os'],

  // 4. Galaxy
  ['gal_hero_title', '鎬婚儴 路 涓ぎ寮曟搸', 'HQ 路 Central Engine', 'text', 'galaxy'],
  ['gal_hero_subtitle', '骞堕潪绠€鍗曠殑鍙戝彿鏂戒护锛岃€屾槸鍚戞暣寮犵敓鎬佹槦绯婚珮棰戝€炬郴绠楀姏銆佸叡璇嗕笌璧勬簮銆?, 'Not just giving orders, but continuously pouring computing power, consensus, and resources into the entire ecosystem galaxy.', 'text', 'galaxy'],
  ['gal_hero_bg', '/fhzb/videos/鑳屾櫙鍥綺4.jpg', '/fhzb/videos/鑳屾櫙鍥綺4.jpg', 'media', 'galaxy'],

  // Philosophy - Values
  ['phi_val1_title', '涓撲笟鏋佸', 'Professional Geek', 'text', 'philosophy'],
  ['phi_val1_desc', '浠ユ瀬鑷寸殑涓撲笟绮剧瀵瑰緟灏借皟涓庨鎺э紝缁濅笉鐢ㄦ儏缁仛鍐崇瓥銆?, 'Uncompromising professionalism in due diligence and risk control, never making decisions based on emotions.', 'text', 'philosophy'],
  ['phi_val2_title', '鐢熸€佸叡寤?, 'Ecosystem Builder', 'text', 'philosophy'],
  ['phi_val2_desc', '鎵撶牬璧勬湰瀛ゅ矝锛屼笌瀹炰笟鑰呫€佸尯鍩熷悎浼欎汉缁撴垚鐢熸鍚岀洘銆?, 'Breaking capital silos, forming life-and-death alliances with industrialists and regional partners.', 'text', 'philosophy'],
  ['phi_val3_title', '浼欎即浼樺厛', 'Partners First', 'text', 'philosophy'],
  ['phi_val3_desc', '鍦ㄤ换浣曞埄鐩婂啿绐侀潰鍓嶏紝淇濋殰鐢熸€佺綉缁滀腑浼欎即鐨勪紭鍏堟潈鐩娿€?, 'Prioritizing the rights and interests of partners in the ecosystem network before any conflicts of interest.', 'text', 'philosophy'],
  ['phi_val4_title', '琛岃鑷磋繙', 'Integrity for Longevity', 'text', 'philosophy'],
  ['phi_val4_desc', '涓嶄綔鏃犳硶鍏戠幇鐨勬敹鐩婃媴淇濓紝涓€鏃︽壙璇哄繀鐢ㄥ叏閮ㄨ韩瀹惰儗涔︺€?, 'Never make unrealistic promises; once committed, back it with everything we have.', 'text', 'philosophy'],

  // Philosophy - Core Concepts
  ['phi_core1_title', '闂幆浜や粯鏂囧寲', 'Closed-loop Culture', 'text', 'philosophy'],
  ['phi_core1_desc', '瑙勫垝路鎵ц路鍙嶉路闂幆銆傛病鏈夌粓鐐圭殑璁歌鐨嗕负铏氬銆?, 'Plan, Execute, Feedback, Close. Promises without results are illusions.', 'text', 'philosophy'],
  ['phi_core1_video', '/fhzb/videos/batch-compressed.mp4', '/fhzb/videos/batch-compressed.mp4', 'media', 'philosophy'],
  ['phi_core2_title', '绗竴鎬у師鐞嗘€濈淮', 'First Principles', 'text', 'philosophy'],
  ['phi_core2_desc', '鍥炲綊浜嬬墿鏈川銆傚墺绂昏涓氱粡楠屼笌璺熼鎯呯华锛屽洖褰掍簨鐗╂渶纭牳鐨勬湰璐ㄥ睘鎬с€?, 'Return to the essence of things. Strip away industry experience and emotion to find the core attributes.', 'text', 'philosophy'],
  ['phi_core2_video', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'philosophy'],
  ['phi_core3_title', '鍏ㄧ悆鍖栨櫤鎱ф枃鍖?, 'Global Intelligence', 'text', 'philosophy'],
  ['phi_core3_desc', '鍥介檯鏍煎眬+鏈湡娣辫€曘€傛嫢鏈変刊瑙嗗懆鏈熺殑鍥介檯鏍煎眬锛屾洿鑳戒刊韬墽琛屾湰鍦熺殑娉ユ碁娣辫€曘€?, 'Global perspective + local deep-rooting. International vision with local execution.', 'text', 'philosophy'],
  ['phi_core3_video', '/fhzb/videos/鑳屾櫙_3.mp4', '/fhzb/videos/鑳屾櫙_3.mp4', 'media', 'philosophy'],

  // Philosophy - Cultural Symbols
  ['phi_cultural_video', '/fhzb/videos/footer-compressed.mp4', '/fhzb/videos/footer-compressed.mp4', 'media', 'philosophy'],

  // Philosophy - Founder Letter
  ['phi_letter_bg', 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=2000&q=80', 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=2000&q=80', 'media', 'philosophy'],

  // OS - Stage 1 (铻?
  ['os_stage1_title', '绗竴鎬у師鐞嗭細濡備綍娴嬬粯浜т笟鏍瑰熀', 'First Principles: Mapping Industrial Foundations', 'text', 'os'],
  ['os_stage1_desc', '鎽掑純椤圭洰鍒舵暎鍏伙紝閫氳繃瓒?0浜跨骇鍩虹煶鍩洪噾閿佸畾浜т笟绛圭爜锛岀‘淇濊祫鏈湪涓嶇‘瀹氬懆鏈熶腑鐨勭粷瀵规帉鎺у姏銆?, 'Rejecting project-based decentralization, locking industrial chips with 1B+ cornerstone fund.', 'text', 'os'],
  ['os_stage1_video', '/fhzb/videos/batch-compressed.mp4', '/fhzb/videos/batch-compressed.mp4', 'media', 'os'],

  // OS - Stage 2 (鎶?
  ['os_stage2_title', '绗竴鎬у師鐞嗭細鏍囨敞璧勬湰绛夐珮绾?, 'First Principles: Marking Capital Contours', 'text', 'os'],
  ['os_stage2_desc', '绌块€廝PT涓庤储鍔′慨楗帮紝鐩存姷鎶€鏈簳灞備笌浜т笟缁堝眬銆傛垜浠笉鍚晠浜嬶紝鍙帹婕旂敓浜у姏鐖嗗彂鐨勬暟瀛﹀熀鍑嗐€?, 'Penetrating PPT and financial window-dressing to reach the tech bottom layer and industrial endgame.', 'text', 'os'],
  ['os_stage2_video', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'os'],

  // OS - Stage 3 (绠?
  ['os_stage3_title', '娌夋蹈寮忚祴鑳斤細妯″瀷閲嶆瀯', 'Immersive Empowerment: Re-modeling', 'text', 'os'],
  ['os_stage3_desc', '娲鹃┗"褰卞瓙CEO"绾у悎浼欎汉锛屽湪缁勭粐娌荤悊銆佹瀬鏍歌鍙樹笌璧勬湰璺緞涓婅繘琛屾墜鏈垁寮忓共棰勶紝绾犲亸鑸悜銆?, 'Deploying "Shadow CEO" level partners for surgical intervention in organizational governance.', 'text', 'os'],
  ['os_stage3_video', '/fhzb/videos/global-compressed.mp4', '/fhzb/videos/global-compressed.mp4', 'media', 'os'],

  // OS - Stage 4 (閫€)
  ['os_stage4_title', '鐧婚樁鍗囩淮锛氳法鍖哄煙瑁傚彉', 'Upgrade: Cross-border Fission', 'text', 'os'],
  ['os_stage4_desc', '涓嶄粎鏄嬁閽辩鍦恒€傞€氳繃鍚堜紮浜虹郴缁燂紝灏嗚鎶曚紒涓氳浆鍖栦负鏂扮殑鐢熸€佽妭鐐癸紝瀹炵幇浠庡宀涘埌鐗堝浘鐨勫崌缁淬€?, 'Portfolio companies transform into new ecosystem nodes, upgrading from "islands" to "territories".', 'text', 'os'],
  ['os_stage4_video', '/fhzb/videos/footer-compressed.mp4', '/fhzb/videos/footer-compressed.mp4', 'media', 'os'],

  // OS - Commitments
  ['os_commitment_1_value', '100%', '100%', 'text', 'os'],
  ['os_commitment_1_detail', '鐪熷疄妗堜緥锛氭煇纭鎶€浼佷笟閫氳繃 OKR 鏋佹牳瀵归綈瀹炵幇 200% 澧為暱', 'Case Study: Tech firm achieved 200% growth via OKR alignment', 'text', 'os'],
  ['os_commitment_2_value', '24%', '24%', 'text', 'os'],
  ['os_commitment_2_detail', '鍔ｅ悗绾ц祫閲戜繚闅滐紝宸蹭负 12 浣?LP 鎴愬姛瀵瑰啿鍛ㄦ湡椋庨櫓', 'Junior tranche protection: Hedged risks for 12+ LPs', 'text', 'os'],
  ['os_commitment_3_value', '24%', '24%', 'text', 'os'],
  ['os_commitment_3_detail', '鑴辨晱鏁版嵁锛氳繃鍘?5 骞存墍鏈夊洖璐崗璁潎 100% 灞ヨ', 'Data: 100% fulfillment of buyback agreements over 5 years', 'text', 'os'],
  ['os_commitment_4_value', '100%', '100%', 'text', 'os'],
  ['os_commitment_4_detail', '纭畾鎬ц矾寰勶細鐩墠鍦ㄧ椤圭洰 IPO 鐢虫姤閫氳繃鐜囬鍏堣涓?, 'Deterministic Path: Leading industry in IPO approval rates', 'text', 'os'],
  ['os_workflow_bg', '/fhzb/videos/宸ヤ綔娴佽儗鏅?jpg', '/fhzb/videos/宸ヤ綔娴佽儗鏅?jpg', 'media', 'os'],

  // Galaxy - HQ Roles
  ['gal_hq_role1_title', '鏍囧噯鍒跺畾鑰?, 'Standards Architect', 'text', 'galaxy'],
  ['gal_hq_role1_desc', '鏋勫缓璧勬湰鍑嗗叆涓庢ā鍨嬪璁＄殑缁堟瀬鏍囧昂锛岀‘淇濇暣寮犳槦绯诲浘璋辩殑鏃犵紳铻嶅悎涓庝唬鐮佺粺涓€銆?, 'Constructing ultimate benchmarks for capital entry and model audits.', 'text', 'galaxy'],
  ['gal_hq_role2_title', '璧勬簮璧嬭兘鑰?, 'Resource Enabler', 'text', 'galaxy'],
  ['gal_hq_role2_desc', '鑷《鍚戜笅鍊炬郴鏋佹牳绾т骇涓氳祫婧愩€佸苟璐ā鍨嬩笌澶т綋閲忓熀鐭冲熀閲戦樀鍒椼€?, 'Pouring down industry resources, M&A models, and massive cornerstone fund arrays.', 'text', 'galaxy'],
  ['gal_hq_role3_title', '鐢熸€佽繛鎺ヨ€?, 'Ecosystem Connector', 'text', 'galaxy'],
  ['gal_hq_role3_desc', '鎵撶牬淇℃伅瀛ゅ矝锛屾挳鍚堣法鐣屽叡鐢燂紝鎴愪负鍒涙柊缁忔祹缃戠粶涓殑瓒呯骇璺敱鍣ㄣ€?, 'Breaking information silos, matching cross-border synergies as a super router.', 'text', 'galaxy'],
  ['gal_hq_role4_title', '鍝佺墝濉戦€犺€?, 'Brand Shaper', 'text', 'galaxy'],
  ['gal_hq_role4_desc', '涓虹煩闃靛唴鐨勬爣鐨勫叕鍙告墦涓婁唬琛ㄤ簡缁濆淇′换涓庨《绾т笓涓氬害鐨勭櫧鍚嶅崟鐑欏嵃銆?, 'Branding portfolio companies with absolute trust and top-tier professionalism.', 'text', 'galaxy'],
  ['gal_hq_role5_title', '椋庨櫓瀹堟姢鑰?, 'Risk Guardian', 'text', 'galaxy'],
  ['gal_hq_role5_desc', '鎮礀杈圭殑鏈€鍚庝竴閬撲繚闄╁甫锛屼互鏋佺鎮茶涓讳箟瑙嗚棰勫垽鍛ㄦ湡鍗辨満骞跺鍐查棴鐜€?, 'The final safety belt, predicting and hedging systemic crises with extreme realism.', 'text', 'galaxy'],

  // Galaxy - Regions
  ['gal_region1_name', '鍗庡崡鏋佹牳 / 娣卞湷', 'South China / Shenzhen', 'text', 'galaxy'],
  ['gal_region1_label', '澶ф咕鍖鸿祫鏈灑绾?, 'GBA Capital Hub', 'text', 'galaxy'],
  ['gal_region2_name', '鍗庝笢鏋佹牳 / 涓婃捣', 'East China / Shanghai', 'text', 'galaxy'],
  ['gal_region2_label', '闀夸笁瑙掔敓鎬佸姩鑴?, 'YRD Ecosystem Artery', 'text', 'galaxy'],
  ['gal_region3_name', '瑗垮崡鏋佹牳 / 鎴愰兘', 'Southwest / Chengdu', 'text', 'galaxy'],
  ['gal_region3_label', '鏂拌川鐢熶骇鍔涜烦鏉?, 'Productivity Lever', 'text', 'galaxy'],
  ['gal_region4_name', '鍗庡寳鍓嶅摠 / 鍖椾含', 'North China / Beijing', 'text', 'galaxy'],
  ['gal_region4_label', '鏀垮晢椤跺眰鏋舵瀯鐭╅樀', 'Policy Matrix', 'text', 'galaxy'],
  ['gal_region_map_bg', '/fhzb/videos/鑳屾櫙鍥綺3.jpg', '/fhzb/videos/鑳屾櫙鍥綺3.jpg', 'media', 'galaxy'],
  ['gal_synergy_bg', '/fhzb/videos/鍗忓悓缃戠粶鑳屾櫙.jpg', '/fhzb/videos/鍗忓悓缃戠粶鑳屾櫙.jpg', 'media', 'galaxy'],

  // Galaxy - CTA
  ['gal_cta_title', '鍗犻鏋佺偣锛?, 'Capture the core,', 'text', 'galaxy'],
  ['gal_cta_subtitle', '鐐逛寒涓嬩竴涓槦鍖恒€?, 'ignite the next sector.', 'text', 'galaxy'],
  ['gal_cta_desc', '鍖哄煙鐙甯綅绋€缂恒€俓n鍙鎵惧叿鏈夋繁鍘氫骇涓氬簳鐩樹笌鏋佸椋庤寖鐨勫悓璺汉銆?, 'Exclusive regional seats are scarce.\nSeeking partners with deep industrial roots and geek spirit.', 'text', 'galaxy'],
  ['gal_cta_bg', '/fhzb/videos/cta鑳屾櫙.jpg', '/fhzb/videos/cta鑳屾櫙.jpg', 'media', 'galaxy'],

  // Alliance - Clusters
  ['all_hero_title', '鍏辩瓚宄板肠', 'Alliance', 'text', 'alliance'],
  ['all_hero_bg', '/fhzb/videos/鑲″競_1.jpg', '/fhzb/videos/鑲″競_1.jpg', 'media', 'alliance'],
  ['all_cluster1_video', '/fhzb/videos/batch-compressed.mp4', '/fhzb/videos/batch-compressed.mp4', 'media', 'alliance'],
  ['all_cluster2_video', '/fhzb/videos/block-compressed.mp4', '/fhzb/videos/block-compressed.mp4', 'media', 'alliance'],
  ['all_cluster3_video', '/fhzb/videos/global-compressed.mp4', '/fhzb/videos/global-compressed.mp4', 'media', 'alliance'],
  ['all_cluster4_video', '/fhzb/videos/banner-m.mp4', '/fhzb/videos/banner-m.mp4', 'media', 'alliance'],
  ['all_cta_bg', '/fhzb/videos/alliance_cta_bg.jpg', '/fhzb/videos/alliance_cta_bg.jpg', 'media', 'alliance'],

  // Vision - Hero
  ['vis_hero_title', '宄板瑙嗛噹', 'Summit Insights', 'text', 'vision'],
  ['vis_hero_bg', '/fhzb/videos/鑳屾櫙鍥綺5.jpg', '/fhzb/videos/鑳屾櫙鍥綺5.jpg', 'media', 'vision'],

  // Vision
  ['vis_doc_cover', '/fhzb/videos/鑳屾櫙鍥綺2.jpg', '/fhzb/videos/鑳屾櫙鍥綺2.jpg', 'media', 'vision'],
  ['vis_doc_video', '/fhzb/videos/绾綍鐗?mp4', '/fhzb/videos/绾綍鐗?mp4', 'media', 'vision'],
  ['vis_summit_bg', '/fhzb/videos/鑲″競_5.jpg', '/fhzb/videos/鑲″競_5.jpg', 'media', 'vision'],
  ['vis_summit_quote', '鎴戜滑瑕佺殑涓嶆槸鐭湡鐨勮处闈㈡诞鐩堬紝鑰屾槸瑕佸湪杩欑墖涓嶇‘瀹氱殑鍦熷￥閲岋紝閽変笅涓€鐗囪兘鎶靛尽10绾ч鏆寸殑闃查鏋椼€?, 'What we seek is not short-term paper profit, but to plant a windbreak that can withstand a stage-10 storm.', 'text', 'vision'],

  // Vision - Columns
  ['vis_col1_title', '鍒啀娌夎糠PPT浼板€硷細浜т笟鍛ㄦ湡涓嬭鐨勪笁澶х牬灞€鐐?, 'Stop PPT Valuations: Three Breakout Points in Downturn Cycles', 'text', 'vision'],
  ['vis_col1_type', '娣卞害闃呰 & 鎾', 'Long Read & Podcast', 'text', 'vision'],
  ['vis_col1_author', '棣栧腑灏借皟瀹?, 'Chief Due Diligence Officer', 'text', 'vision'],
  ['vis_col2_title', '浠庢祦閲忕敓鎰忓埌鐢熸€侀棬妲涳細濡備綍鏋勫缓鐪熸鐨勮祫鏈姢鍩庢渤锛?, 'From Traffic to Ecosystem: Building True Capital Moats', 'text', 'vision'],
  ['vis_col2_type', '鎾瑙ｈ', 'Podcast Analysis', 'text', 'vision'],
  ['vis_col2_author', '鏋佹牳鍚堜紮浜?, 'Core Partner', 'text', 'vision'],

  // Vision - Reports
  ['vis_report1_title', '璧勬湰璺緞閲嶆瀯锛氭柊璐ㄧ敓浜у姏涓婂競鍚堣鍏ㄥ懆鏈?, 'Capital Path Reconstruction: IPO Compliance Cycle for New Productivity', 'text', 'vision'],
  ['vis_report1_year', '2026', '2026', 'text', 'vision'],
  ['vis_report1_cover', '/fhzb/videos/鑲″競_2.jpg', '/fhzb/videos/鑲″競_2.jpg', 'media', 'vision'],
  ['vis_report2_title', '绌胯秺姝讳骸璋凤細琚姇浼佷笟澶辫触妯″瀷鍙婇鎺ф鎹熺爺绌?, 'Through Death Valley: Failure Models and Risk Control Research', 'text', 'vision'],
  ['vis_report2_year', '2025', '2025', 'text', 'vision'],
  ['vis_report2_cover', '/fhzb/videos/鑲″競_3.jpg', '/fhzb/videos/鑲″競_3.jpg', 'media', 'vision'],
  ['vis_report3_title', '鍖哄煙娣辫€曪細鍚堜紮浜虹敓鎬佺綉缁滄瀬鏍歌鍙樻ā鍨嬪垎鏋?, 'Regional Depth: Fission Model Analysis of Partner Ecosystems', 'text', 'vision'],
  ['vis_report3_year', '2025', '2025', 'text', 'vision'],
  ['vis_report3_cover', '/fhzb/videos/鑲″競_4.jpg', '/fhzb/videos/鑲″競_4.jpg', 'media', 'vision'],

  // Vision - News
  ['vis_news1_title', '宄板璧勬湰瀹ｅ憡鏃椾笅棣栨敮瓒?0浜跨骇鍩虹煶鐩叉睜鍩洪噾灏侀棴瀹屾瘯銆?, 'Fenghe Capital announces the closing of its first Billion-level blind pool fund.', 'text', 'vision'],
  ['vis_news1_date', 'MAR 12, 2026', 'MAR 12, 2026', 'text', 'vision'],
  ['vis_news1_source', '褰崥鍟嗕笟璇勮', 'Bloomberg Business', 'text', 'vision'],
  ['vis_news2_title', '涓撹宄板鍒涘浜猴細鍦ㄥ钩鍘熶笂鐙傚鐨勬椂浠ｇ粨鏉燂紝鐧诲嘲鎵嶅垰鍒氬紑濮嬨€?, 'Interview with Founder: The era of running on plains is over; the climb has just begun.', 'text', 'vision'],
  ['vis_news2_date', 'FEB 08, 2026', 'FEB 08, 2026', 'text', 'vision'],
  ['vis_news2_source', '椤舵祦璐㈢粡鍛ㄥ垔', 'Leading Finance Weekly', 'text', 'vision'],
  ['vis_news3_title', '閲嶆瀯鍖哄煙鐢熸€佸湀灞傦細鍗庝笢涓庤法骞挎繁涓ゅぇ鏋佹牳淇变箰閮ㄥ悓鏃ユ寕鐗屻€?, 'Restructuring Regional Ecosystems: East China and GBA Clubs launched on the same day.', 'text', 'vision'],
  ['vis_news3_date', 'JAN 21, 2026', 'JAN 21, 2026', 'text', 'vision'],
  ['vis_news3_source', '瀹樻柟鏂伴椈鍏憡', 'Official Announcement', 'text', 'vision'],

  // Omega - Hero
  ['ome_hero_title', '宄板鏁版嵁鐪嬫澘', 'OMEGA PROGRAM', 'text', 'omega'],
  ['ome_hero_bg', '/fhzb/videos/鑳屾櫙鍥綺3.jpg', '/fhzb/videos/鑳屾櫙鍥綺3.jpg', 'media', 'omega'],

  // Omega
  ['ome_stat1_value', '300+', '300+', 'text', 'omega'],
  ['ome_stat1_label', '鐢熸€佹€昏妯?, 'Invested Projects', 'text', 'omega'],
  ['ome_stat2_value', '50+', '50+', 'text', 'omega'],
  ['ome_stat2_label', '瑕嗙洊琛屼笟', 'Public Companies', 'text', 'omega'],
  ['ome_stat3_value', '15+', '15+', 'text', 'omega'],
  ['ome_stat3_label', '鍖哄煙缃戠粶娲昏穬搴?, 'Years of Experience', 'text', 'omega'],
  ['ome_nft_bg', '/fhzb/videos/鑳屾櫙鍥綺4.jpg', '/fhzb/videos/鑳屾櫙鍥綺4.jpg', 'media', 'omega'],
  ['ome_nft_title', '鏁板瓧閫氳璇?, 'Digital Pass', 'text', 'omega'],
  ['ome_nft_desc', '涓轰細鍛樸€佸悎浼欎汉鍙戣鐨勫熀浜庡尯鍧楅摼鐨勬暟瀛楄韩浠?鍕嬬珷锛屼韩鍙楀閲嶇敓鎬佺壒鏉冦€?, 'Blockchain-based digital identities for members and partners with exclusive ecological privileges.', 'text', 'omega'],
  ['ome_archive_step1_title', '椤圭洰鍙戣捣', 'Initiation', 'text', 'omega'],
  ['ome_archive_step1_desc', '鍘熷鎯虫硶楠岃瘉涓庣瀛愯疆铻嶈祫瀛樿瘉', 'Idea validation & Seed funding', 'text', 'omega'],
  ['ome_archive_step2_title', '鍏抽敭閲岀▼纰?, 'Milestone', 'text', 'omega'],
  ['ome_archive_step2_desc', '鏍稿績浜у搧鍙戝竷涓庨鎵圭敤鎴风獊鐮?, 'MVP launch & Initial user growth', 'text', 'omega'],
  ['ome_archive_step3_title', '璧勬湰鍔犻€?, 'Acceleration', 'text', 'omega'],
  ['ome_archive_step3_desc', 'A杞瀺璧勫畬鎴愪笌鐢熸€佽祫婧愬榻?, 'Series A & Eco alignment', 'text', 'omega'],
  ['ome_archive_step4_title', '鐧诲嘲涓婂競', 'IPO / Exit', 'text', 'omega'],
  ['ome_archive_step4_desc', '鏁查挓浠紡璁板綍涓庨暱鏈熶环鍊艰瘉鏄?, 'Listing & Long-term value', 'text', 'omega'],
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
  insertNav.run('棣栭〉', 'Home', '/', 1);
  insertNav.run('宄板鍝插', 'Philosophy', '/philosophy', 2);
  insertNav.run('璧勬湰绯荤粺', 'Capital O.S.', '/os', 3);
  insertNav.run('宄板鏄熺郴', 'Galaxy', '/galaxy', 4);
  insertNav.run('鍏辩瓚宄板肠', 'Alliance', '/alliance', 5);
  insertNav.run('宄板瑙嗛噹', 'Vision', '/vision', 6);
  insertNav.run('鏁板瓧宄板', 'Digital', '/omega', 7);
}

// Seed initial contact info if empty
const contactCount = db.prepare('SELECT COUNT(*) as count FROM contact_info').get();
if (contactCount.count === 0) {
  const insertContact = db.prepare('INSERT INTO contact_info (type, value, label_zh, label_en) VALUES (?, ?, ?, ?)');
  insertContact.run('phone', '13681660460', '鑱旂郴鐢佃瘽', 'Phone');
  insertContact.run('email', 'zhenyongwv@hotmail.com', '鐢靛瓙閭', 'Email');
}

// Seed initial news if empty
const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get();
if (newsCount.count === 0) {
  const insertNews = db.prepare('INSERT INTO news (date, title_zh, title_en, desc_zh, desc_en) VALUES (?, ?, ?, ?, ?)');
  insertNews.run('2026.04', '娣卞垱鎶曢泦鍥㈠鍚嶅コ鎬ф姇璧勪汉鑽ｇ櫥娓呯鎶曡祫鐣屻€佸崟...', 'Female Investors Honored', '杩戞棩锛屽瀹惰偂鏉冩姇璧勬湇鍔℃満鏋勭浉缁у彂甯冨コ鎬ф姇璧勪汉姒滃崟锛屾繁鍒涙姇澶氬悕濂虫€ф姇璧勪汉杩涘叆姒滃崟銆?, 'Several female investors from Shenzhen Capital Group were included in the list.');
  insertNews.run('2026.03', '鐢熸€佸熀閲戣妯＄牬鐧句嚎锛岃法瓒婇噸瑕侀噷绋嬬', 'Eco-Fund Exceeds 10 Billion', '杩戞棩锛屽瀹惰偂鏉冩姇璧勬満鏋勭浉缁у彂甯冨勾搴︽姤鍛婏紝宄板浣撶郴鍩洪噾瑙勬ā姝ｅ紡绐佺牬鐧句嚎澶у叧銆?, 'The FH system fund scale has officially exceeded the 10 billion mark.');
  insertNews.run('2026.02', '鍗庝笢澶у尯淇变箰閮ㄦ寮忓惎骞曪紝鏋佹牳妯″紡鍔犻€?, 'East China Club Officially Opens', '鎴樼暐鎸囨尌閮ㄤ笌鍖哄煙鑺傜偣娣卞害浜掑姩锛岃祴鑳介暱涓夎楂樹环鍊间骇涓氶摼鍙戝睍銆?, 'Strategic headquarters interact deeply with regional nodes, empowering high-value industrial chains.');
}

// Seed super admin if not exists
const adminCount = db.prepare("SELECT COUNT(*) as count FROM members WHERE phone = '17858452245'").get();
if (adminCount.count === 0) {
  db.prepare("INSERT INTO members (name, phone, is_super_admin) VALUES (?, ?, ?)").run('瓒呯骇绠＄悊鍛?, '17858452245', 1);
}

console.log('Database initialized successfully.');

module.exports = db;

