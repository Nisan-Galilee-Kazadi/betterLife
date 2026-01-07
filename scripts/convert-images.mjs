
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TARGET_DIRS = [
    'public/images',
    'src/assets',
    'src/images',
    'src/pages'
]; // Add directories to scan
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.jfif'];

async function convertImages() {
    const rootDir = path.resolve(__dirname, '..');

    console.log('🚀 Starting WebP conversion...');

    for (const dirRelative of TARGET_DIRS) {
        const dirPath = path.join(rootDir, dirRelative);

        try {
            await fs.access(dirPath);
        } catch {
            console.log(`⚠️  Directory not found, skipping: ${dirRelative}`);
            continue;
        }

        // Recursive function to walk directories
        async function walk(currentDir) {
            const entries = await fs.readdir(currentDir, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(currentDir, entry.name);

                if (entry.isDirectory()) {
                    await walk(fullPath);
                } else if (entry.isFile()) {
                    const ext = path.extname(entry.name);
                    const extLower = ext.toLowerCase();
                    if (EXTENSIONS.includes(extLower)) {
                        const webpPath = path.join(currentDir, path.basename(entry.name, ext) + '.webp');

                        // Check if WebP already exists (optional: skip if exists? or overwrite?)
                        // For now, let's regenerate to be safe or check dates. 
                        // Simple version: just convert.

                        try {
                            await sharp(fullPath)
                                .webp({ quality: 80 })
                                .toFile(webpPath);
                            console.log(`✅ Converted: ${entry.name} -> .webp`);
                        } catch (err) {
                            console.error(`❌ Failed to convert ${entry.name}:`, err.message);
                        }
                    }
                }
            }
        }

        console.log(`📂 Scanning directory: ${dirRelative}`);
        await walk(dirPath);
    }

    console.log('✨ WebP conversion complete!');
}

convertImages().catch(console.error);
