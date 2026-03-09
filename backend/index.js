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

// Import des services de traduction (désactivé pour commencer)
// const { setupAutoTranslation } = require('../backend_translation_integration');

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
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration multer pour l'upload d'images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // En production sur cPanel, on utilise un chemin défini dans le .env
        // Sinon on utilise un chemin relatif par défaut
        const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'frontend', 'public', 'uploads');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Seules les images sont autorisées'), false);
        }
    }
});


// Configuration MySQL (sans database pour créer la DB)
const DB_CONFIG_WITHOUT_DB = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: '+00:00'
};

const DB_CONFIG = {
    ...DB_CONFIG_WITHOUT_DB,
    database: process.env.DB_NAME || 'betterlife_db'
};

// Connection MySQL et initialisation
let db;
let lastDbError = null;
async function initializeDatabase() {
    try {
        console.log('[INFO] Tentative de connexion MySQL...');
        console.log('[CONFIG] Configuration:', {
            host: DB_CONFIG.host,
            user: DB_CONFIG.user,
            database: DB_CONFIG.database,
            port: DB_CONFIG.port || 3306
        });


        // Essayer de se connecter au Pool de connexions
        try {
            if (db) await db.end(); // Fermer l'ancien s'il existe
            db = mysql.createPool(DB_CONFIG);

            // Tester la connexion au pool
            const conn = await db.getConnection();
            console.log('[SUCCESS] Connexion au Pool établie');
            conn.release();
            lastDbError = null;
        } catch (dbError) {
            db = null;
            console.error('[DB ERROR] Connexion au Pool échouée:', dbError.message);

            // Si la base n'existe pas, essayer de la créer
            if (dbError.code === 'ER_BAD_DB_ERROR') {
                console.log('[CREATE] Base de données inexistante, tentative de création...');
                try {
                    const tempConnection = await mysql.createConnection(DB_CONFIG_WITHOUT_DB);
                    await tempConnection.execute(
                        `CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
                    );
                    await tempConnection.end();

                    db = mysql.createPool(DB_CONFIG);
                    lastDbError = null;
                } catch (createError) {
                    db = null;
                    lastDbError = `CREATE_ERROR: ${createError.message}`;
                }
            } else {
                lastDbError = `${dbError.code}: ${dbError.message}`;
            }
        }


        console.log('[SUCCESS] MySQL Connected to betterlife_db');

        // S'assurer que les tables et vues essentielles existent
        try {
            // Table hero_slides
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

            // Vues (Peuvent manquer lors de l'import cPanel)
            const views = [
                {
                    name: 'active_statistics',
                    query: 'CREATE OR REPLACE VIEW active_statistics AS SELECT * FROM statistics WHERE is_active = 1'
                },
                {
                    name: 'active_testimonials',
                    query: 'CREATE OR REPLACE VIEW active_testimonials AS SELECT * FROM testimonials WHERE is_active = 1'
                },
                {
                    name: 'published_blog_posts',
                    query: 'CREATE OR REPLACE VIEW published_blog_posts AS SELECT * FROM blog_posts WHERE is_published = 1'
                }
            ];

            for (const view of views) {
                try {
                    await db.execute(view.query);
                } catch (viewErr) {
                    console.warn(`[WARN] Impossible de créer la vue ${view.name}:`, viewErr.message);
                }
            }

            console.log('[SUCCESS] Tables and Views checked/created');
        } catch (e) {
            console.error('[ERROR] Initialisation schéma a echoue:', e.message);
        }

        // Initialiser le système de traduction automatique (désactivé pour commencer)
        // setupAutoTranslation(app, db);

        return db;
    } catch (error) {
        console.error('[ERROR] MySQL Connection Error:', error.message);
        console.error('[DEBUG] Détails de l\'erreur:', {
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState,
            sqlMessage: error.sqlMessage
        });


        console.log('[HINT] Assurez-vous que :');
        console.log('   - XAMPP est démarré');
        console.log('   - MySQL fonctionne (port 3306)');
        console.log('   - L\'utilisateur root n\'a pas de mot de passe ou les credentials sont corrects');
        throw error;
    }
}

// =========================================
// ROUTES DE BASE ET DIAGNOSTIC
// =========================================
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.json({
        message: 'BetterLife API is live',
        db_connected: !!db,
        env: process.env.NODE_ENV,
        node_version: process.version
    });
});

apiRouter.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        db: !!db ? 'connected' : 'disconnected'
    });
});

// =========================================
// ROUTE AUTHENTIFICATION ADMIN
// =========================================

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'BetterLife2025';
const JWT_SECRET = process.env.JWT_SECRET || 'betterlife_super_secret_key_2025';

apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = jwt.sign(
            { username, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '8h' }
        );
        return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, error: 'Identifiants invalides' });
});

apiRouter.get('/verify-token', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ valid: false });
    }
    try {
        const payload = jwt.verify(auth.split(' ')[1], JWT_SECRET);
        res.json({ valid: true, user: payload });
    } catch (e) {
        res.status(401).json({ valid: false, error: e.message });
    }
});

apiRouter.get('/debug', (req, res) => {
    res.json({
        debug_version: "3.7 (Defensive DB Connect)",
        db_config: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password_length: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0,
            password_prefix_2char: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.substring(0, 2) : '',
            last_error: lastDbError
        },
        env_vars: {
            node_env: process.env.NODE_ENV,
            node_version: process.version
        }
    });
});

// =========================================
// API STATISTIQUES
// =========================================

apiRouter.get('/statistics', async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({
                error: 'Database not connected. Check /api/debug and server logs.',
                db_user: process.env.DB_USER
            });
        }

        let rows;
        try {
            // Dédupliquer par stat_key pour éviter les doublons en DB
            [rows] = await db.execute(
                'SELECT * FROM statistics WHERE is_active = 1 GROUP BY stat_key ORDER BY MIN(id)'
            );
        } catch (viewError) {
            console.warn('[WARN] Erreur requête statistics:', viewError.message);
            [rows] = await db.execute('SELECT * FROM statistics WHERE is_active = 1 ORDER BY id');
        }

        res.json(rows);
    } catch (error) {
        console.error('[ERROR] /api/statistics:', error.message);
        res.status(500).json({ error: error.message });
    }
});

apiRouter.put('/statistics/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const { value, label, suffix, color, icon, is_active } = req.body;

        console.log('[STATISTICS] Upsert:', key, { value, label });

        // UPDATE d'abord (stat_key existe déjà)
        const [updateResult] = await db.execute(
            `UPDATE statistics SET value = ?, label = ?, suffix = ?, color = ?, icon = ?, is_active = ?
             WHERE stat_key = ?`,
            [value, label || value, suffix || '', color || 'blue', icon || 'FaChartBar',
                is_active !== undefined ? (is_active ? 1 : 0) : 1, key]
        );

        if (updateResult.affectedRows === 0) {
            // Aucune ligne mise à jour → on insère
            console.log('[STATISTICS] Aucune ligne existante, INSERT...');
            await db.execute(
                `INSERT INTO statistics (stat_key, value, label, suffix, color, icon, is_active)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [key, value, label || value, suffix || '', color || 'blue', icon || 'FaChartBar', 1]
            );
            console.log('[STATISTICS] INSERT effectué');
        } else {
            console.log('[STATISTICS] UPDATE effectué:', updateResult.affectedRows, 'ligne(s)');
        }

        res.json({ success: true });
    } catch (error) {
        console.error('[STATISTICS] Error:', error);
        res.status(500).json({ error: error.message });
    }
});


// =========================================
// API PARTENAIRES
// =========================================

apiRouter.get('/partners', async (req, res) => {
    try {
        const region = req.query.region || 'all';
        const admin = req.query.admin === '1';
        let query, params;

        const whereActive = admin ? '' : 'WHERE is_active = TRUE ';
        if (region === 'all') {
            query = `SELECT * FROM partners ${whereActive}ORDER BY join_date DESC`;
            params = [];
        } else {
            query = `SELECT * FROM partners ${whereActive ? whereActive + 'AND region = ? ' : 'WHERE region = ? '}ORDER BY join_date DESC`;
            params = [region];
        }

        const [rows] = await db.execute(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.put('/partners/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact, region, type, title, company, category, is_active } = req.body;

        await db.execute(
            `UPDATE partners SET name = ?, contact = ?, region = ?, type = ?, title = ?, company = ?, category = ?, is_active = ?
             WHERE id = ?`,
            [name ?? '', contact ?? null, region ?? 'autres', type ?? 'Particulier', title ?? null, company ?? null, category ?? null, is_active ?? true, id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.get('/partners/progression', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM partner_progression ORDER BY year, month'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =========================================
// API BLOG
// =========================================

apiRouter.get('/blog/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute(
            'SELECT * FROM blog_posts WHERE id = ?',
            [id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Article non trouve' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =========================================
// API HERO SLIDES (Page d'accueil)
// =========================================

apiRouter.get('/hero-slides', async (req, res) => {
    try {
        const admin = req.query.admin === '1';
        const [rows] = await db.execute(
            admin
                ? 'SELECT * FROM hero_slides ORDER BY position, id'
                : 'SELECT * FROM hero_slides WHERE is_active = TRUE ORDER BY position, id'
        );

        // Pour l'instant, on renvoie uniquement la version FR
        const slides = rows.map(row => ({
            id: row.id,
            position: row.position,
            image_url: row.image_url,
            alt: row.alt_fr,
            title: row.title_fr,
            description: row.description_fr,
            is_active: !!row.is_active
        }));

        res.json(slides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.post('/hero-slides', async (req, res) => {
    try {
        const {
            position = 1,
            image_url,
            alt_fr,
            title_fr,
            description_fr,
            is_active = true,
        } = req.body;

        if (!image_url || !title_fr) {
            return res.status(400).json({ error: 'image_url et title_fr sont obligatoires' });
        }

        const [result] = await db.execute(
            `INSERT INTO hero_slides (position, image_url, alt_fr, title_fr, description_fr, is_active)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [position, image_url, alt_fr || null, title_fr, description_fr || null, is_active]
        );

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.put('/hero-slides/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            position,
            image_url,
            alt_fr,
            title_fr,
            description_fr,
            is_active,
        } = req.body;

        await db.execute(
            `UPDATE hero_slides
             SET position = COALESCE(?, position),
                 image_url = COALESCE(?, image_url),
                 alt_fr = COALESCE(?, alt_fr),
                 title_fr = COALESCE(?, title_fr),
                 description_fr = COALESCE(?, description_fr),
                 is_active = COALESCE(?, is_active)
             WHERE id = ?`,
            [position, image_url, alt_fr, title_fr, description_fr, is_active, id]
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.delete('/hero-slides/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.execute('DELETE FROM hero_slides WHERE id = ?', [id]);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =========================================
// API UPLOAD D'IMAGES
// =========================================

apiRouter.post('/upload/image', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucune image reçue' });
        }

        // Construire l'URL publique de l'image
        const imageUrl = `/uploads/${req.file.filename}`;

        res.json({
            success: true,
            image_url: imageUrl,
            filename: req.file.filename,
            size: req.file.size,
            message: 'Image uploadée avec succès'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.get('/blog/posts', async (req, res) => {
    try {
        const lang = req.query.lang || 'fr';
        const [rows] = await db.execute(
            'SELECT * FROM published_blog_posts ORDER BY published_at DESC'
        );

        // Retourner les données dans la langue demandée
        const postsInLang = rows.map(post => ({
            id: post.id,
            slug: post.slug,
            title: post[`title_${lang}`] || post.title_fr,
            excerpt: post[`excerpt_${lang}`] || post.excerpt_fr,
            content: post[`content_${lang}`] || post.content_fr,
            author: post.author,
            category: post.category,
            published_at: post.published_at,
            featured_image: post.featured_image
        }));

        res.json(postsInLang);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

function slugify(text) {
    return (text || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'article-' + Date.now();
}

apiRouter.post('/blog/posts', async (req, res) => {
    try {
        const {
            title_fr, content_fr, excerpt_fr,
            author = 'Équipe BetterLife',
            category = 'general'
        } = req.body;

        const slug = slugify(title_fr);

        const [result] = await db.execute(
            `INSERT INTO blog_posts
             (slug, title_fr, content_fr, excerpt_fr, author, category, is_published)
             VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
            [slug, title_fr, content_fr, excerpt_fr, author, category]
        );

        const postId = result.insertId;

        // Traduction automatique en arrière-plan (désactivée pour commencer)
        // setImmediate(async () => {
        //     try {
        //         if (title_fr) await translateContent('blog_post', postId, title_fr, 'title');
        //         if (content_fr) await translateContent('blog_post', postId, content_fr, 'content');
        //         if (excerpt_fr) await translateContent('blog_post', postId, excerpt_fr, 'excerpt');
        //     } catch (error) {
        //         console.error('Erreur traduction automatique:', error);
        //     }
        // });

        res.json({ success: true, id: postId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.put('/blog/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title_fr, content_fr, excerpt_fr, author, category } = req.body;

        await db.execute(
            'UPDATE blog_posts SET title_fr = ?, content_fr = ?, excerpt_fr = ?, author = ?, category = ? WHERE id = ?',
            [title_fr, content_fr, excerpt_fr, author || 'Equipe BetterLife', category || 'general', id]
        );

        // Traductions automatiques (désactivées pour commencer)
        // if (title_fr) await translateContent('blog_post', id, title_fr, 'title');
        // if (content_fr) await translateContent('blog_post', id, content_fr, 'content');
        // if (excerpt_fr) await translateContent('blog_post', id, excerpt_fr, 'excerpt');

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =========================================
// API TÉMOIGNAGES
// =========================================

apiRouter.get('/testimonials', async (req, res) => {
    try {
        const lang = req.query.lang || 'fr';
        const admin = req.query.admin === '1';

        let rows;
        try {
            const query = admin ? 'SELECT * FROM testimonials ORDER BY sort_order' : 'SELECT * FROM active_testimonials ORDER BY sort_order';
            [rows] = await db.execute(query);
        } catch (err) {
            console.warn('[WARN] Vue active_testimonials manquante, repli:', err.message);
            const query = admin ? 'SELECT * FROM testimonials ORDER BY sort_order' : 'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order';
            [rows] = await db.execute(query);
        }

        const testimonialsInLang = rows.map(testimonial => ({
            id: testimonial.id,
            name: testimonial.name,
            location: testimonial.location,
            short_quote: testimonial[`short_quote_${lang}`] || testimonial.short_quote_fr,
            full_quote: testimonial[`full_quote_${lang}`] || testimonial.full_quote_fr,
            image_path: testimonial.image_path,
            video_url: testimonial.video_url,
            rating: testimonial.rating
        }));

        res.json(testimonialsInLang);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.get('/testimonials/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
        if (!rows.length) return res.status(404).json({ error: 'Temoignage non trouve' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

apiRouter.put('/testimonials/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, role, short_quote_fr, full_quote_fr, video_url, rating, is_featured, sort_order, is_active } = req.body;

        await db.execute(
            `UPDATE testimonials SET name = ?, location = ?, role = ?, short_quote_fr = ?, full_quote_fr = ?, video_url = ?, rating = ?, is_featured = ?, sort_order = ?, is_active = ?
             WHERE id = ?`,
            [name ?? '', location ?? null, role ?? null, short_quote_fr ?? '', full_quote_fr ?? null, video_url ?? null, rating ?? 5, is_featured ?? false, sort_order ?? 0, is_active ?? true, id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =========================================
// API ÉQUIPE
// =========================================

apiRouter.get('/team', async (req, res) => {
    try {
        const lang = req.query.lang || 'fr';
        const [rows] = await db.execute(
            'SELECT * FROM team_members WHERE is_active = TRUE ORDER BY sort_order'
        );

        const teamInLang = rows.map(member => ({
            id: member.id,
            name: member.name,
            role: member[`role_${lang}`] || member.role_fr,
            bio: member[`bio_${lang}`] || member.bio_fr,
            email: member.email,
            photo_path: member.photo_path,
            expertise: member.expertise ? JSON.parse(member.expertise) : []
        }));

        res.json(teamInLang);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =========================================
// API DÉLÉGUÉS
// =========================================

app.get('/api/delegates', async (req, res) => {
    try {
        const lang = req.query.lang || 'fr';
        const [rows] = await db.execute(
            'SELECT * FROM delegates WHERE is_active = TRUE ORDER BY province'
        );

        const delegatesInLang = rows.map(delegate => ({
            id: delegate.id,
            name: delegate.name,
            province: delegate.province,
            role: delegate.role,
            bio: delegate[`bio_${lang}`] || delegate.bio_fr,
            email: delegate.email,
            photo_path: delegate.photo_path,
            expertise: delegate.expertise ? JSON.parse(delegate.expertise) : []
        }));

        res.json(delegatesInLang);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =========================================
// FONCTIONS UTILITAIRES (traduction désactivée pour commencer)
// =========================================

// async function createTranslationJobs(contentType, contentId, fieldName, sourceLang, sourceContent) {
//     const targetLangs = ['en', 'es', 'sw'];
//
//     for (const targetLang of targetLangs) {
//         try {
//             await db.execute(
//                 `INSERT INTO translation_jobs
//                  (content_type, content_id, field_name, source_lang, target_lang, source_content, priority)
//                  VALUES (?, ?, ?, ?, ?, ?, ?)
//                  ON DUPLICATE KEY UPDATE source_content = VALUES(source_content)`,
//                 [contentType, contentId, fieldName, sourceLang, targetLang, sourceContent, 'medium']
//             );
//         } catch (error) {
//             console.error(`Erreur création job traduction ${targetLang}:`, error.message);
//         }
//     }
// }
//
// async function translateContent(contentType, contentId, content, fieldName) {
//     const { translationService } = require('../auto_translation_service');
//
//     try {
//         console.log(`🔄 Traduction automatique: ${contentType} ${fieldName}`);
//
//         const translations = await translationService.translateToAllLanguages(content);
//
//         // Mettre à jour la base avec les traductions
//         for (const [lang, translatedText] of Object.entries(translations)) {
//             if (translatedText) {
//                 const field = `${fieldName}_${lang}`;
//                 await db.execute(
//                     `UPDATE ${contentType}s SET ${field} = ? WHERE id = ?`,
//                     [translatedText, contentId]
//                 );
//             }
//         }
//
//         console.log(`✅ Traductions terminées pour ${contentType} ${contentId}`);
//     } catch (error) {
//         console.error(`❌ Erreur traduction automatique:`, error.message);
//     }
// }

// =========================================
// ROUTES DE COMPATIBILITÉ (ancien système MongoDB)
// =========================================

apiRouter.get('/content/:pageId', async (req, res) => {
    try {
        // Mapper les anciens appels vers les nouvelles tables
        const { pageId } = req.params;
        let data;

        switch (pageId) {
            case 'statistics':
                const [stats] = await db.execute('SELECT * FROM active_statistics');
                data = { content: stats };
                break;
            case 'partners':
                const [partners] = await db.execute('SELECT * FROM partners WHERE is_active = TRUE');
                data = { content: partners };
                break;
            default:
                return res.status(404).json({ message: 'Page non trouvée' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Enregistrer le routeur sur les deux chemins possibles
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Gestion des erreurs globale
app.use((error, req, res, next) => {
    console.error('Erreur serveur:', error);
    res.status(500).json({
        error: 'Erreur interne du serveur',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Une erreur est survenue'
    });
});

// Démarrage du serveur
async function startServer() {
    try {
        console.log('[START] Initialisation du serveur...');

        // Initialisation DB (non-fatale pour éviter la 503 immédiate)
        initializeDatabase().catch(err => {
            console.error('[CRITICAL] Erreur lors de l\'initialisation DB:', err.message);
        });

        app.listen(PORT, () => {
            console.log(`[START] BetterLife API Server running on PORT ${PORT}`);
            console.log(`[ENV] Mode: ${process.env.NODE_ENV || 'development'}`);
            console.log(`[DB] Configured User: ${process.env.DB_USER}`);
        });
    } catch (error) {
        console.error('[ERROR] Erreur fatale au démarrage:', error.message);
        // On ne fait plus process.exit(1) pour laisser le serveur tenter de rester en vie
    }
}

startServer();
