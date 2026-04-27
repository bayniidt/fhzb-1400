const express = require('express');
const cors = require('cors');
const db = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/uploads');
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Cleanup function for media files
const deleteFile = async (filePath) => {
  if (!filePath) return;
  // Only delete if it's in our uploads folder
  if (filePath.startsWith('/uploads/')) {
    const fullPath = path.join(__dirname, '../public', filePath);
    try {
      if (await fs.pathExists(fullPath)) {
        await fs.remove(fullPath);
        console.log(`Deleted unused file: ${fullPath}`);
      }
    } catch (err) {
      console.error(`Error deleting file ${fullPath}:`, err);
    }
  }
};

// Upload Endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Delete Media Endpoint (explicit cleanup)
app.post('/api/media/cleanup', async (req, res) => {
  const { oldUrl } = req.body;
  await deleteFile(oldUrl);
  res.json({ success: true });
});

// Site Content Endpoints
app.get('/api/content', (req, res) => {
  const content = db.prepare('SELECT * FROM site_content').all();
  const result = {};
  content.forEach(item => {
    result[item.key] = { zh: item.value_zh, en: item.value_en, module: item.module };
  });
  res.json(result);
});

app.put('/api/content/:key', (req, res) => {
  const { key } = req.params;
  const { zh, en, module: passedModule, type: passedType } = req.body;
  
  // Get existing module and type if they exist
  const existing = db.prepare('SELECT module, type FROM site_content WHERE key = ?').get(key);
  const module = passedModule || (existing ? existing.module : 'home');
  const type = passedType || (existing ? existing.type : 'text');

  const update = db.prepare('INSERT OR REPLACE INTO site_content (key, value_zh, value_en, module, type) VALUES (?, ?, ?, ?, ?)');
  const result = update.run(key, zh, en, module, type);
  
  if (result.changes > 0) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// News Endpoints
app.get('/api/news', (req, res) => {
  const news = db.prepare('SELECT * FROM news ORDER BY created_at DESC').all();
  res.json(news);
});

app.post('/api/news', (req, res) => {
  const { date, title_zh, title_en, desc_zh, desc_en, image_url } = req.body;
  const insert = db.prepare('INSERT INTO news (date, title_zh, title_en, desc_zh, desc_en, image_url) VALUES (?, ?, ?, ?, ?, ?)');
  const result = insert.run(date, title_zh, title_en, desc_zh, desc_en, image_url);
  res.json({ id: result.lastInsertRowid });
});

app.put('/api/news/:id', (req, res) => {
  const { id } = req.params;
  const { date, title_zh, title_en, desc_zh, desc_en, image_url } = req.body;
  const update = db.prepare('UPDATE news SET date = ?, title_zh = ?, title_en = ?, desc_zh = ?, desc_en = ?, image_url = ? WHERE id = ?');
  update.run(date, title_zh, title_en, desc_zh, desc_en, image_url, id);
  res.json({ success: true });
});

app.delete('/api/news/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM news WHERE id = ?').run(id);
  res.json({ success: true });
});

// Questions Endpoints
app.get('/api/questions', (req, res) => {
  const questions = db.prepare('SELECT * FROM questions ORDER BY display_order ASC').all();
  res.json(questions);
});

app.post('/api/questions', (req, res) => {
  const { text_zh, text_en, display_order } = req.body;
  const insert = db.prepare('INSERT INTO questions (text_zh, text_en, display_order) VALUES (?, ?, ?)');
  const result = insert.run(text_zh, text_en, display_order);
  res.json({ id: result.lastInsertRowid });
});

app.put('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const { text_zh, text_en, display_order } = req.body;
  const update = db.prepare('UPDATE questions SET text_zh = ?, text_en = ?, display_order = ? WHERE id = ?');
  update.run(text_zh, text_en, display_order, id);
  res.json({ success: true });
});

app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM questions WHERE id = ?').run(id);
  res.json({ success: true });
});

// Navigation Endpoints
app.get('/api/navigation', (req, res) => {
  const nav = db.prepare('SELECT * FROM navigation ORDER BY display_order ASC').all();
  res.json(nav);
});

app.post('/api/navigation', (req, res) => {
  const { name_zh, name_en, href, display_order } = req.body;
  const insert = db.prepare('INSERT INTO navigation (name_zh, name_en, href, display_order) VALUES (?, ?, ?, ?)');
  const result = insert.run(name_zh, name_en, href, display_order);
  res.json({ id: result.lastInsertRowid });
});

app.put('/api/navigation/:id', (req, res) => {
  const { id } = req.params;
  const { name_zh, name_en, href, display_order } = req.body;
  const update = db.prepare('UPDATE navigation SET name_zh = ?, name_en = ?, href = ?, display_order = ? WHERE id = ?');
  update.run(name_zh, name_en, href, display_order, id);
  res.json({ success: true });
});

app.delete('/api/navigation/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM navigation WHERE id = ?').run(id);
  res.json({ success: true });
});

// Contact Endpoints
app.get('/api/contact', (req, res) => {
  const contact = db.prepare('SELECT * FROM contact_info').all();
  res.json(contact);
});

app.put('/api/contact/:id', (req, res) => {
  const { id } = req.params;
  const { value, label_zh, label_en } = req.body;
  const update = db.prepare('UPDATE contact_info SET value = ?, label_zh = ?, label_en = ? WHERE id = ?');
  update.run(value, label_zh, label_en, id);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
