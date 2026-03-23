const mysql = require('mysql2/promise');
require('dotenv').config();
const { HERO_SLIDES } = require('./heroSlidesSeed');

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'betterlife_db',
};

async function main() {
  const connection = await mysql.createConnection(DB_CONFIG);
  console.log('[RESTORE] Connected to MySQL for hero slide restore.');

  try {
    await connection.beginTransaction();

    for (const slide of HERO_SLIDES) {
      const [matches] = await connection.execute(
        `SELECT id
         FROM hero_slides
         WHERE position = ? OR LOWER(image_url) = LOWER(?)
         ORDER BY CASE WHEN position = ? THEN 0 ELSE 1 END, id ASC`,
        [slide.position, slide.image_url, slide.position]
      );

      const keeperId = matches[0]?.id || null;
      const payload = [
        slide.position,
        slide.image_url,
        slide.alt_fr,
        slide.alt_en,
        slide.alt_es,
        slide.alt_sw,
        slide.title_fr,
        slide.title_en,
        slide.title_es,
        slide.title_sw,
        slide.description_fr,
        slide.description_en,
        slide.description_es,
        slide.description_sw,
        true,
      ];

      if (keeperId) {
        await connection.execute(
          `UPDATE hero_slides
           SET position = ?, image_url = ?,
               alt_fr = ?, alt_en = ?, alt_es = ?, alt_sw = ?,
               title_fr = ?, title_en = ?, title_es = ?, title_sw = ?,
               description_fr = ?, description_en = ?, description_es = ?, description_sw = ?,
               is_active = ?
           WHERE id = ?`,
          [...payload, keeperId]
        );

        const duplicateIds = matches
          .slice(1)
          .map((row) => row.id)
          .filter((id) => id !== keeperId);

        if (duplicateIds.length > 0) {
          await connection.execute(
            `DELETE FROM hero_slides WHERE id IN (${duplicateIds
              .map(() => '?')
              .join(', ')})`,
            duplicateIds
          );
        }
      } else {
        await connection.execute(
          `INSERT INTO hero_slides (
             position, image_url,
             alt_fr, alt_en, alt_es, alt_sw,
             title_fr, title_en, title_es, title_sw,
             description_fr, description_en, description_es, description_sw,
             is_active
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          payload
        );
      }
    }

    const [duplicates] = await connection.execute(
      `SELECT id, position
       FROM hero_slides
       WHERE position BETWEEN 1 AND 9
       ORDER BY position ASC, id ASC`
    );

    const seenPositions = new Set();
    const duplicateIds = [];

    duplicates.forEach((row) => {
      if (seenPositions.has(row.position)) {
        duplicateIds.push(row.id);
        return;
      }
      seenPositions.add(row.position);
    });

    if (duplicateIds.length > 0) {
      await connection.execute(
        `DELETE FROM hero_slides WHERE id IN (${duplicateIds
          .map(() => '?')
          .join(', ')})`,
        duplicateIds
      );
    }

    await connection.commit();
    console.log(
      `[RESTORE] Restored ${HERO_SLIDES.length} canonical hero slides in DB.`
    );
  } catch (error) {
    await connection.rollback();
    console.error('[RESTORE] Hero slide restore failed:', error.message);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error('[RESTORE] Unexpected error:', error.message);
  process.exitCode = 1;
});
