#!/usr/bin/env node

const mysql = require("mysql2/promise");
require("dotenv").config();

const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "betterlife_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+00:00",
};

async function setupMediaPage() {
  const pool = mysql.createPool(DB_CONFIG);
  let connection;

  try {
    connection = await pool.getConnection();

    console.log("[SETUP] Creating Media page...");

    // Create Media page
    const [mediaResult] = await connection.execute(`
            INSERT INTO pages (
                slug, 
                parent_id,
                title_fr, 
                title_en, 
                title_es, 
                title_sw,
                subtitle_fr,
                content_fr,
                meta_description_fr,
                is_active, 
                sort_order,
                menu_label_fr,
                menu_label_en,
                menu_label_es,
                menu_label_sw,
                show_in_menu
            ) VALUES (
                'media',
                NULL,
                'Médias',
                'Media',
                'Medios',
                'Media',
                'Découvrez nos actualités et galerie',
                '<p>Explorez nos contenus multimédias</p>',
                'Découvrez nos médias et actualités',
                TRUE,
                4,
                'Médias',
                'Media',
                'Medios',
                'Media',
                FALSE
            )
        `);

    const mediaPageId = mediaResult.insertId;
    console.log(`[SETUP] ✓ Media page created with ID: ${mediaPageId}`);

    // Update News page to be child of Media (if exists)
    const [newsCheck] = await connection.execute(
      "SELECT id FROM pages WHERE LOWER(slug) = LOWER(?)",
      ["news"],
    );

    if (newsCheck.length > 0) {
      await connection.execute("UPDATE pages SET parent_id = ? WHERE id = ?", [
        mediaPageId,
        newsCheck[0].id,
      ]);
      console.log(`[SETUP] ✓ News page linked to Media as child`);
    } else {
      console.log(`[SETUP] ⚠ News page not found in database`);
    }

    // Update Gallery page to be child of Media (if exists)
    const [galleryCheck] = await connection.execute(
      "SELECT id FROM pages WHERE LOWER(slug) = LOWER(?)",
      ["gallery"],
    );

    if (galleryCheck.length > 0) {
      await connection.execute("UPDATE pages SET parent_id = ? WHERE id = ?", [
        mediaPageId,
        galleryCheck[0].id,
      ]);
      console.log(`[SETUP] ✓ Gallery page linked to Media as child`);
    } else {
      console.log(`[SETUP] ⚠ Gallery page not found in database`);
    }

    console.log("[SETUP] ✅ Media page setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[SETUP] ❌ Error:", error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

setupMediaPage();
