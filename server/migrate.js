const db = require('./db');

console.log('Migrating site_content keys...');

const migrations = [
  ['hero_title_1', 'home_banner_title_1'],
  ['hero_title_2', 'home_banner_title_2'],
  ['hero_btn_1', 'home_banner_btn_1'],
  ['hero_btn_2', 'home_banner_btn_2'],
  ['hero_bg_video', 'home_banner_video'],
  ['manifesto_title', 'home_manifesto_title'],
  ['manifesto_content_1', 'home_manifesto_content_1'],
  ['manifesto_content_2', 'home_manifesto_content_2'],
  ['manifesto_content_3', 'home_manifesto_content_3'],
  ['manifesto_bg_image', 'home_manifesto_video']
];

db.transaction(() => {
  migrations.forEach(([oldKey, newKey]) => {
    const oldRow = db.prepare('SELECT * FROM site_content WHERE key = ?').get(oldKey);
    const newRow = db.prepare('SELECT * FROM site_content WHERE key = ?').get(newKey);
    
    if (oldRow && !newRow) {
      // Just rename if new doesn't exist
      db.prepare('UPDATE site_content SET key = ?, module = ? WHERE key = ?').run(newKey, 'home', oldKey);
    } else if (oldRow && newRow) {
      // If both exist, take the one with content, then delete old
      const valueZh = oldRow.value_zh || newRow.value_zh;
      const valueEn = oldRow.value_en || newRow.value_en;
      db.prepare('UPDATE site_content SET value_zh = ?, value_en = ?, module = ? WHERE key = ?').run(valueZh, valueEn, 'home', newKey);
      db.prepare('DELETE FROM site_content WHERE key = ?').run(oldKey);
    }
  });
  
  // Also ensure other keys have modules
  db.prepare("UPDATE site_content SET module = 'philosophy' WHERE key LIKE 'phi_%'").run();
  db.prepare("UPDATE site_content SET module = 'os' WHERE key LIKE 'os_%'").run();
  db.prepare("UPDATE site_content SET module = 'galaxy' WHERE key LIKE 'gal_%'").run();
  db.prepare("UPDATE site_content SET module = 'alliance' WHERE key LIKE 'all_%'").run();
  db.prepare("UPDATE site_content SET module = 'vision' WHERE key LIKE 'vis_%'").run();
  db.prepare("UPDATE site_content SET module = 'omega' WHERE key LIKE 'ome_%'").run();
})();

console.log('Migration complete.');
process.exit(0);
