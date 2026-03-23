const HERO_SLIDES = [
    {
        position: 1,
        image_url: 'local:hero_biodiversity_premium',
        title_fr: "La protection de l'environnement et de la biodiversit\u00e9",
        description_fr:
            "Luttons contre la d\u00e9forestation et pr\u00e9servons les \u00e9cosyst\u00e8mes uniques de la RDC pour un monde meilleur.",
        title_en: 'Environmental Protection and Biodiversity',
        description_en:
            "Fighting deforestation and preserving the DRC's unique ecosystems for a better world.",
        title_es: 'Protecci\u00f3n del Medio Ambiente y la Biodiversidad',
        description_es:
            'Luchando contra la deforestaci\u00f3n y preservando los ecosistemas de la RDC para un futuro sostenible.',
        title_sw: 'Ulinzi wa Mazingira na Bioanuwai',
        description_sw:
            'Kupambana na ukataji miti na kuhifadhi mifumo ya kipekee ya DRC kwa ajili ya mustakabali endelevu.',
    },
    {
        position: 2,
        image_url: 'local:hero_food_security',
        title_fr: 'La s\u00e9curit\u00e9 alimentaire',
        description_fr:
            "Am\u00e9lioration de la production agricole et valorisation des cha\u00eenes locales pour nourrir nos populations.",
        title_en: 'Food Security',
        description_en:
            'Improving agricultural production and local value chains to sustainably feed our populations.',
        title_es: 'Seguridad Alimentaria',
        description_es:
            'Mejorando la producci\u00f3n agr\u00edcola y las cadenas de valor para alimentar a nuestras poblaciones.',
        title_sw: 'Usalama wa Chakula',
        description_sw:
            'Kuboresha uzalishaji wa kilimo na minyororo ya thamani ya ndani kulisha watu wetu kwa njia endelevu.',
    },
    {
        position: 3,
        image_url: 'local:hero_agriculture',
        title_fr: 'M\u00e9canisation agricole',
        description_fr:
            "Modernisation des pratiques et mise \u00e0 disposition d'\u00e9quipements adapt\u00e9s pour une agriculture performante.",
        title_en: 'Agricultural Mechanization',
        description_en:
            'Modernizing practices and providing adapted equipment for high-performance agriculture.',
        title_es: 'Mecanizaci\u00f3n Agr\u00edcola',
        description_es:
            'Modernizando las pr\u00e1cticas y proporcionando equipos adaptados para una agricultura eficiente.',
        title_sw: 'Umekanizaji wa Kilimo',
        description_sw:
            'Kukarabati mazoea na kutoa vifaa vinavyofaa kwa kilimo cha hali ya juu.',
    },
    {
        position: 4,
        image_url: 'local:heroImage6',
        title_fr: 'Projets communautaires',
        description_fr:
            'Services de base et activit\u00e9s g\u00e9n\u00e9ratrices de revenus pour le d\u00e9veloppement harmonieux de nos villages.',
        title_en: 'Community Projects',
        description_en:
            'Basic services and income-generating activities for the development of our villages.',
        title_es: 'Proyectos Comunitarios',
        description_es:
            'Servicios b\u00e1sicos y actividades generadoras de ingresos para el desarrollo de nuestras aldeas.',
        title_sw: 'Miradi ya Jamii',
        description_sw:
            'Huduma za msingi na shughuli zinazozalisha mapato kwa ajili ya maendeleo ya vijiji vyetu.',
    },
    {
        position: 5,
        image_url: 'local:heroImage7',
        title_fr: '\u00c9levage \u00e0 grande \u00e9chelle',
        description_fr:
            'Syst\u00e8mes modernes (bovin, caprin, porcin, avicole) et sant\u00e9 animale au coeur de notre expertise.',
        title_en: 'Large-Scale Livestock Farming',
        description_en:
            'Modern systems (bovine, caprine, porcine, poultry) and animal health at the heart of our expertise.',
        title_es: 'Ganader\u00eda a Gran Escala',
        description_es:
            'Sistemas modernos (bovino, caprino, porcino, av\u00edcola) y salud animal en el centro de nuestra experiencia.',
        title_sw: 'Ufugaji wa Wanyama wa Kiwango Kikubwa',
        description_sw:
            "Mifumo ya kisasa (ng'ombe, mbuzi, nguruwe, kuku) na afya ya wanyama katika moyo wa ujuzi wetu.",
    },
    {
        position: 6,
        image_url: 'local:heroImage8',
        title_fr: 'Agriculture',
        description_fr:
            "Promotion d'une agriculture durable avec focus sur le cacao Criollo, le caf\u00e9 Arabica et le th\u00e9ier.",
        title_en: 'Agriculture',
        description_en:
            'Promoting sustainable agriculture with a focus on Criollo cocoa, Arabica coffee, and tea.',
        title_es: 'Agricultura',
        description_es:
            'Promoviendo agricultura sostenible con enfoque en cacao Criollo, caf\u00e9 Ar\u00e1bica y t\u00e9.',
        title_sw: 'Kilimo',
        description_sw:
            'Kuchochea kilimo endelevu kikuzingatia kakao ya Criollo, kahawa ya Arabica, na chai.',
    },
    {
        position: 7,
        image_url: 'local:heroImage9',
        title_fr: 'Environnement',
        description_fr:
            'Proteger notre cadre de vie et nos ressources naturelles',
        title_en: 'Environmental Protection',
        description_en: 'Preserving our natural heritage for future generations',
        title_es: 'Medio Ambiente',
        description_es: 'Proteger nuestro entorno y recursos naturales',
        title_sw: 'Ulinzi wa Mazingira',
        description_sw: 'Kulinda urithi wetu wa asili kwa vizazi vijavyo',
    },
    {
        position: 8,
        image_url: 'local:heroImage10',
        title_fr: '\u00c9nergies Renouvelables',
        description_fr: 'Lumi\u00e8re et Force',
        title_en: 'Renewable Energy',
        description_en: 'Light and Power',
        title_es: 'Energ\u00edas Renovables',
        description_es: 'Luz sostenible',
        title_sw: 'Nishati Jadidifu',
        description_sw: 'Mwanga na Nguvu',
    },
    {
        position: 9,
        image_url: 'local:heroImage11',
        title_fr: 'Protection des For\u00eats',
        description_fr: 'Poumon de la plan\u00e8te',
        title_en: 'Forest Protection',
        description_en: 'Lungs of the planet',
        title_es: 'Protecci\u00f3n de los Bosques',
        description_es: 'Pulm\u00f3n del planeta',
        title_sw: 'Ulinzi wa Misitu',
        description_sw: 'Mapafu ya sayari',
    },
].map((slide) => ({
    ...slide,
    alt_fr: slide.title_fr,
    alt_en: slide.title_en,
    alt_es: slide.title_es,
    alt_sw: slide.title_sw,
}));

function quoteTableName(tableName) {
    return `\`${String(tableName).replace(/`/g, '')}\``;
}

function getHeroSlidesCreateTableSql(tableName = 'hero_slides', { ifNotExists = true } = {}) {
    const qualifiedName = quoteTableName(tableName);
    const createClause = ifNotExists ? 'CREATE TABLE IF NOT EXISTS' : 'CREATE TABLE';

    return `
        ${createClause} ${qualifiedName} (
            id INT PRIMARY KEY AUTO_INCREMENT,
            position INT NOT NULL,
            image_url VARCHAR(500) NOT NULL,
            alt_fr VARCHAR(255),
            alt_en VARCHAR(255),
            alt_es VARCHAR(255),
            alt_sw VARCHAR(255),
            title_fr VARCHAR(255) NOT NULL,
            title_en VARCHAR(255),
            title_es VARCHAR(255),
            title_sw VARCHAR(255),
            description_fr TEXT,
            description_en TEXT,
            description_es TEXT,
            description_sw TEXT,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY hero_slides_position_unique (position)
        )
    `;
}

async function insertHeroSlides(connection, tableName = 'hero_slides', slides = HERO_SLIDES) {
    const qualifiedName = quoteTableName(tableName);

    for (const slide of slides) {
        await connection.execute(
            `INSERT INTO ${qualifiedName} (
                position, image_url,
                alt_fr, alt_en, alt_es, alt_sw,
                title_fr, title_en, title_es, title_sw,
                description_fr, description_en, description_es, description_sw,
                is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                slide.position,
                slide.image_url,
                slide.alt_fr || null,
                slide.alt_en || null,
                slide.alt_es || null,
                slide.alt_sw || null,
                slide.title_fr,
                slide.title_en || null,
                slide.title_es || null,
                slide.title_sw || null,
                slide.description_fr || null,
                slide.description_en || null,
                slide.description_es || null,
                slide.description_sw || null,
                true,
            ]
        );
    }
}

async function seedHeroSlidesIfEmpty(connection, tableName = 'hero_slides') {
    const qualifiedName = quoteTableName(tableName);
    const [rows] = await connection.execute(`SELECT COUNT(*) AS count FROM ${qualifiedName}`);

    if (!rows[0]?.count) {
        await insertHeroSlides(connection, tableName);
        return true;
    }

    return false;
}

module.exports = {
    HERO_SLIDES,
    getHeroSlidesCreateTableSql,
    insertHeroSlides,
    seedHeroSlidesIfEmpty,
};
