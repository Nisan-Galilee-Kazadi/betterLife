/**
 * BetterLife Backend API - MySQL + Traduction Automatique
 * ======================================================
 */

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'https://betterlife-ong.org',
    'https://www.betterlife-ong.org'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy not allowed'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'frontend', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Configuration multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Seules les images sont autorisées'), false);
    }
});

// Database configuration
const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'betterlife_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: '+00:00'
};

const DEFAULT_TEAM_MEMBERS = [
    {
        name: 'Ir KILUNGU KASONGO Bernard',
        role_fr: 'Délégué National',
        bio_fr: "Représente l'organisation et supervise les délégations provinciales.",
        email: 'bernardkilungu@betterlife-ong.org',
        photo_path: '/team/bernard.jpg',
        expertise: ['Relations Institutionnelles', 'Leadership', 'Développement'],
        sort_order: 1,
    }
];

// Helper to parse JSON fields safely
function parseExpertise(field) {
    if (!field) return [];
    if (typeof field === 'string') {
        try {
            return JSON.parse(field);
        } catch (e) {
            console.warn('[WARN] Failed to parse expertise string:', field);
            return [];
        }
    }
    return Array.isArray(field) ? field : [];
}

let db;
let lastDbError = null;

process.on('uncaughtException', (err) => {
    console.error('[CRITICAL] Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('[CRITICAL] Unhandled Rejection at:', promise, 'reason:', reason);
});

async function ensureColumn(tableName, columnName, definition) {
    try {
        const [rows] = await db.execute(
            `SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
            [DB_CONFIG.database, tableName, columnName]
        );
        if (!rows[0]?.count) {
            await db.execute(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
        }
    } catch (e) {
        console.warn(`[WARN] Could not ensure column ${columnName} in ${tableName}:`, e.message);
    }
}

async function initializeDatabase() {
    try {
        console.log('[DB] Connecting to MySQL...');
        db = mysql.createPool(DB_CONFIG);
        db.on('error', (err) => {
            console.error('[DB] Pool unexpected error:', err);
        });

        // Test connection
        const conn = await db.getConnection();
        console.log('[DB] Successfully connected to Pool');
        conn.release();

        // Create Tables
        await db.execute(`
            CREATE TABLE IF NOT EXISTS hero_slides (
                id INT PRIMARY KEY AUTO_INCREMENT,
                position INT NOT NULL,
                image_url VARCHAR(500) NOT NULL,
                alt_fr VARCHAR(255),
                title_fr VARCHAR(255) NOT NULL,
                description_fr TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS team_members (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                role_fr VARCHAR(100) NOT NULL,
                role_en VARCHAR(100),
                role_es VARCHAR(100),
                role_sw VARCHAR(100),
                bio_fr TEXT,
                bio_en TEXT,
                bio_es TEXT,
                bio_sw TEXT,
                email VARCHAR(100),
                phone VARCHAR(50),
                expertise JSON,
                photo_path VARCHAR(255),
                sort_order INT DEFAULT 0,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS delegates (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                province VARCHAR(100) NOT NULL,
                role VARCHAR(100) DEFAULT 'Délégué Provincial',
                bio_fr TEXT,
                bio_en TEXT,
                bio_es TEXT,
                bio_sw TEXT,
                expertise JSON,
                email VARCHAR(100),
                phone VARCHAR(50),
                photo_path VARCHAR(255),
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(50),
                subject VARCHAR(200),
                message TEXT NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                status VARCHAR(30) DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await ensureColumn('contact_messages', 'reply_message', 'TEXT NULL');
        await ensureColumn('contact_messages', 'replied_at', 'TIMESTAMP NULL');
        await ensureColumn('contact_messages', 'replied_by', 'VARCHAR(100) NULL');

        // Views
        const views = [
            { name: 'active_statistics', query: 'CREATE OR REPLACE VIEW active_statistics AS SELECT * FROM statistics WHERE is_active = 1' },
            { name: 'active_testimonials', query: 'CREATE OR REPLACE VIEW active_testimonials AS SELECT * FROM testimonials WHERE is_active = 1' },
            { name: 'published_blog_posts', query: 'CREATE OR REPLACE VIEW published_blog_posts AS SELECT * FROM blog_posts WHERE is_published = 1' }
        ];

        for (const view of views) {
            try {
                await db.execute(`DROP VIEW IF EXISTS ${view.name}`);
                await db.execute(view.query);
            } catch (vErr) {
                console.warn(`[WARN] View ${view.name} creation skipped:`, vErr.message);
            }
        }

        console.log('[DB] Initialization complete');
    } catch (error) {
        console.error('[DB] Error during initialization:', error.message);
        throw error;
    }
}

// Routes
const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => res.json({ status: 'ok', db: !!db }));
apiRouter.get('/debug', (req, res) => res.json({
    env: process.env.NODE_ENV,
    db_connected: !!db,
    db_config: { host: DB_CONFIG.host, user: DB_CONFIG.user, database: DB_CONFIG.database }
}));

// Admin Auth
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'BetterLife2025';
const JWT_SECRET = process.env.JWT_SECRET || 'betterlife_super_secret_key_2025';

apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
        return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, error: 'Identifiants invalides' });
});

apiRouter.get('/verify-token', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ valid: false });
    try {
        const payload = jwt.verify(auth.split(' ')[1], JWT_SECRET);
        res.json({ valid: true, user: payload });
    } catch (e) { res.status(401).json({ valid: false }); }
});

// Statistics
apiRouter.get('/statistics', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM statistics WHERE is_active = 1 ORDER BY id');
        res.json(rows);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// Team
apiRouter.get('/team', async (req, res) => {
    try {
        const lang = req.query.lang || 'fr';
        const [rows] = await db.execute('SELECT * FROM team_members WHERE is_active = TRUE ORDER BY sort_order');
        res.json(rows.map(m => ({
            id: m.id,
            name: m.name,
            role: m[`role_${lang}`] || m.role_fr,
            bio: m[`bio_${lang}`] || m.bio_fr,
            email: m.email,
            photo_path: m.photo_path,
            expertise: parseExpertise(m.expertise)
        })));
    } catch (error) { res.status(500).json({ error: error.message }); }
});

apiRouter.get('/team/admin', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM team_members ORDER BY sort_order, id');
        res.json(rows.map(m => ({ ...m, expertise: parseExpertise(m.expertise) })));
    } catch (error) { res.status(500).json({ error: error.message }); }
});

apiRouter.post('/team', async (req, res) => {
    try {
        const { name, role_fr, role_en, role_es, role_sw, bio_fr, bio_en, bio_es, bio_sw, email, phone, photo_path, expertise = [], sort_order = 0, is_active = true } = req.body;
        const [result] = await db.execute(
            `INSERT INTO team_members (name, role_fr, role_en, role_es, role_sw, bio_fr, bio_en, bio_es, bio_sw, email, phone, photo_path, expertise, sort_order, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, role_fr, role_en || null, role_es || null, role_sw || null, bio_fr || null, bio_en || null, bio_es || null, bio_sw || null, email || null, phone || null, photo_path || null, JSON.stringify(expertise || []), sort_order, !!is_active]
        );
        res.json({ success: true, id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

apiRouter.put('/team/:id', async (req, res) => {
    try {
        const { name, role_fr, role_en, role_es, role_sw, bio_fr, bio_en, bio_es, bio_sw, email, phone, photo_path, expertise = [], sort_order = 0, is_active = true } = req.body;
        await db.execute(
            `UPDATE team_members SET name = ?, role_fr = ?, role_en = ?, role_es = ?, role_sw = ?, bio_fr = ?, bio_en = ?, bio_es = ?, bio_sw = ?, email = ?, phone = ?, photo_path = ?, expertise = ?, sort_order = ?, is_active = ? WHERE id = ?`,
            [name, role_fr, role_en || null, role_es || null, role_sw || null, bio_fr || null, bio_en || null, bio_es || null, bio_sw || null, email || null, phone || null, photo_path || null, JSON.stringify(expertise || []), sort_order, !!is_active, req.params.id]
        );
        res.json({ success: true });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

apiRouter.delete('/team/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM team_members WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// Delegates
apiRouter.get('/delegates', async (req, res) => {
    try {
        const lang = req.query.lang || 'fr';
        const [rows] = await db.execute('SELECT * FROM delegates WHERE is_active = TRUE ORDER BY province');
        res.json(rows.map(d => ({
            id: d.id,
            name: d.name,
            province: d.province,
            role: d.role,
            bio: d[`bio_${lang}`] || d.bio_fr,
            email: d.email,
            photo_path: d.photo_path,
            expertise: parseExpertise(d.expertise)
        })));
    } catch (error) { res.status(500).json({ error: error.message }); }
});

apiRouter.get('/delegates/admin', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM delegates ORDER BY province, id');
        res.json(rows.map(d => ({ ...d, expertise: parseExpertise(d.expertise) })));
    } catch (error) { res.status(500).json({ error: error.message }); }
});

apiRouter.post('/delegates', async (req, res) => {
    try {
        const { name, province, role, bio_fr, bio_en, bio_es, bio_sw, expertise = [], email, phone, photo_path, is_active = true } = req.body;
        const [result] = await db.execute(
            `INSERT INTO delegates (name, province, role, bio_fr, bio_en, bio_es, bio_sw, expertise, email, phone, photo_path, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, province, role || 'Délégué Provincial', bio_fr || null, bio_en || null, bio_es || null, bio_sw || null, JSON.stringify(expertise || []), email || null, phone || null, photo_path || null, !!is_active]
        );
        res.json({ success: true, id: result.insertId });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

apiRouter.put('/delegates/:id', async (req, res) => {
    try {
        const { name, province, role, bio_fr, bio_en, bio_es, bio_sw, expertise = [], email, phone, photo_path, is_active = true } = req.body;
        await db.execute(
            `UPDATE delegates SET name = ?, province = ?, role = ?, bio_fr = ?, bio_en = ?, bio_es = ?, bio_sw = ?, expertise = ?, email = ?, phone = ?, photo_path = ?, is_active = ? WHERE id = ?`,
            [name, province, role || 'Délégué Provincial', bio_fr || null, bio_en || null, bio_es || null, bio_sw || null, JSON.stringify(expertise || []), email || null, phone || null, photo_path || null, !!is_active, req.params.id]
        );
        res.json({ success: true });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

apiRouter.delete('/delegates/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM delegates WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// Blog
apiRouter.get('/blog/posts', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC');
        res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Upload
apiRouter.post('/upload/image', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file received' });
    res.json({ success: true, image_url: `/uploads/${req.file.filename}` });
});

// Contact
apiRouter.post('/contact-messages', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await db.execute(`INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`, [name, email, message]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.use('/api', apiRouter);

// Frontend static
const frontendPath = path.join(__dirname, '..', 'betterlife-ong.org');
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    app.get('*', (req, res) => {
        if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not Found' });
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => res.json({ message: "BetterLife Backend is running" }));
}

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start
async function start() {
    try {
        await initializeDatabase();
        app.listen(PORT, () => console.log(`[START] Server running on port ${PORT}`));
    } catch (e) {
        console.error('[START] Fatal start error:', e.message);
        // Fallback start without DB
        app.listen(PORT, () => console.log(`[START] Server running on port ${PORT} (SANS DATABASE)`));
    }
}

start();
