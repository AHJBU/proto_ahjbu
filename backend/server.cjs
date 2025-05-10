// Simple Express server for blog API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createMySQLConnection } = require('../src/utils/mysql.cjs');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Get all blog posts
app.get('/api/blog', async (req, res) => {
  try {
    const conn = await createMySQLConnection();
    const [rows] = await conn.execute('SELECT * FROM blog_posts ORDER BY created_at DESC');
    await conn.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog post
app.get('/api/blog/:id', async (req, res) => {
  try {
    const conn = await createMySQLConnection();
    const [rows] = await conn.execute('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);
    await conn.end();
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new blog post
app.post('/api/blog', async (req, res) => {
  const { title, content, author, cover_image, video_url, album, quote, youtube_url } = req.body;
  try {
    const conn = await createMySQLConnection();
    const [result] = await conn.execute(
      'INSERT INTO blog_posts (title, content, author, cover_image, video_url, album, quote, youtube_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
      [title, content, author, cover_image, video_url, JSON.stringify(album), quote, youtube_url]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update blog post
app.put('/api/blog/:id', async (req, res) => {
  const { title, content, author, cover_image, video_url, album, quote, youtube_url } = req.body;
  try {
    const conn = await createMySQLConnection();
    await conn.execute(
      'UPDATE blog_posts SET title=?, content=?, author=?, cover_image=?, video_url=?, album=?, quote=?, youtube_url=? WHERE id=?',
      [title, content, author, cover_image, video_url, JSON.stringify(album), quote, youtube_url, req.params.id]
    );
    await conn.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete blog post
app.delete('/api/blog/:id', async (req, res) => {
  try {
    const conn = await createMySQLConnection();
    await conn.execute('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
    await conn.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// جلب إعدادات الموقع
app.get('/api/settings', async (req, res) => {
  try {
    const conn = await createMySQLConnection();
    const [rows] = await conn.execute('SELECT * FROM site_settings LIMIT 1');
    await conn.end();
    if (rows.length === 0) return res.status(404).json({});
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// تحديث إعدادات الموقع
app.put('/api/settings', async (req, res) => {
  const settings = req.body;
  try {
    const conn = await createMySQLConnection();
    const fields = Object.keys(settings).map(key => `${key}=?`).join(', ');
    const values = [...Object.values(settings)];
    await conn.execute(`UPDATE site_settings SET ${fields} WHERE id=1`, values);
    const [rows] = await conn.execute('SELECT * FROM site_settings LIMIT 1');
    await conn.end();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const fs = require('fs');

// تحديث جميع متغيرات الموقع (all_site_variables.json)
app.put('/api/site-variables', (req, res) => {
  try {
    const filePath = __dirname + '/../public/all_site_variables.json';
    let existing = {};
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        existing = {};
      }
    }
    // دمج القديم مع الجديد (الجديد يطغى)
    const merged = { ...existing, ...req.body };
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Blog API server running on http://localhost:${PORT}`);
});
