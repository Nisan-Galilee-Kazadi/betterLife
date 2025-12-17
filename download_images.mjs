import fs from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import path from 'path';

// Helper to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const images = [
    // Elevage
    { keyword: 'cattle,cows', path: 'src/pages/Actions/elevages/images/hero_gros_betail.jpg' },
    { keyword: 'snake,reptile', path: 'src/pages/Actions/elevages/images/hero_serpents.jpg' },
    { keyword: 'german_shepherd', path: 'src/pages/Actions/elevages/images/hero_chiens.jpg' },
    { keyword: 'beekeeper,honey', path: 'src/pages/Actions/elevages/images/hero_apiculture.jpg' },
    { keyword: 'fish_farm,aquaculture', path: 'src/pages/Actions/elevages/images/hero_pisciculture.jpg' },

    // Communautaire
    { keyword: 'rural_house,africa', path: 'src/pages/Actions/Communautaire/images/hero_habitation.jpg' },
    { keyword: 'dirt_road,africa', path: 'src/pages/Actions/Communautaire/images/hero_routes.jpg' },
    { keyword: 'classroom,school,africa', path: 'src/pages/Actions/Communautaire/images/hero_education.jpg' },
    { keyword: 'solar_panel,village', path: 'src/pages/Actions/Communautaire/images/hero_energie.jpg' },
    { keyword: 'doctor,hospital,africa', path: 'src/pages/Actions/Communautaire/images/hero_sante.jpg' },

    // Environement
    { keyword: 'forest,sunlight', path: 'src/pages/Actions/Environement/images/hero_protection_foret.jpg' },
    { keyword: 'planting_trees', path: 'src/pages/Actions/Environement/images/hero_eco_kelasi.jpg' },
    { keyword: 'forest,gloomy', path: 'src/pages/Actions/Environement/images/hero_credit_carbone.jpg' }, // nature
];

const downloadImage = async (keyword, filepath) => {
    const dirname = path.dirname(filepath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }

    const url = `https://loremflickr.com/1920/1080/${keyword}?random=${Math.floor(Math.random() * 1000)}`;
    console.log(`Downloading ${keyword} to ${filepath}...`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
            return;
        }
        const stream = fs.createWriteStream(filepath);
        await pipeline(Readable.fromWeb(response.body), stream);
        console.log(`Saved ${filepath}`);
    } catch (error) {
        console.error(`Error downloading ${keyword}:`, error.message);
    }
};

(async () => {
    console.log("Starting downloads...");
    // Run in parallel chunks or sequence? Sequence to be nice to service.
    for (const img of images) {
        await downloadImage(img.keyword, img.path);
        await wait(1000); // 1s delay
    }
    console.log("All done.");
})();
