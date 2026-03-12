const mysql = require('mysql2/promise');
require('dotenv').config();

const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'betterlife_db'
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
    },
    {
        name: 'Ir DEKEY MOLO Blaise',
        role_fr: 'Coordonnateur National',
        bio_fr: "Assure la coordination globale des activités de l'ONG au niveau national.",
        email: 'coordination@betterlife-ong.org',
        photo_path: '/team/blaise.jpg',
        expertise: ['Coordination', 'Stratégie', 'Management'],
        sort_order: 2,
    },
    {
        name: 'Mme YANGA LUBULU Déborah',
        role_fr: 'Secrétaire Administative',
        bio_fr: "Assure le support administratif et la gestion documentaire de l'organisation.",
        email: 'secretariat@betterlife-ong.org',
        photo_path: '/team/deborah.jpg',
        expertise: ['Administration', 'Organisation', 'Secrétariat'],
        sort_order: 3,
    },
    {
        name: 'LUMUMBA MPUMPU Nathan',
        role_fr: 'Directeur Communication',
        bio_fr: "Pilote la stratégie de communication et la visibilité des actions de l'ONG.",
        email: 'betterlifeorg@gmail.com',
        photo_path: '/team/nathan.jpg',
        expertise: ['Communication', 'Marketing', 'Relations Publiques'],
        sort_order: 4,
    },
    {
        name: 'Mme MPOYI NGALULA Sarah',
        role_fr: 'Directrice RH',
        bio_fr: 'Gère le capital humain, le recrutement et le développement des compétences.',
        email: 'rh@betterlife-ong.org',
        photo_path: '/team/sarah.jpg',
        expertise: ['Ressources Humaines', 'Recrutement', 'Formation'],
        sort_order: 5,
    },
    {
        name: 'Mme LUTONADIO NSIMBA Florence',
        role_fr: 'Directrice Financière',
        bio_fr: 'Supervise la gestion financière, budgétaire et comptable de Better Life.',
        email: 'compta@betterlife-ong.org',
        photo_path: '/team/florence.jpg',
        expertise: ['Finance', 'Comptabilité', 'Audit', 'Gestion'],
        sort_order: 6,
    },
    {
        name: 'Mme META NYEMABU Ornella',
        role_fr: 'Gestionnaire de Projet',
        bio_fr: "Responsable de la planification, de l'exécution et du suivi des projets de l'ONG.",
        email: 'gestionprojet@betterlife-ong.org',
        photo_path: '/team/ornella.jpg',
        expertise: ['Gestion de Projet', 'Planification', 'Suivi & Évaluation'],
        sort_order: 7,
    },
    {
        name: 'Mme BAKAKUWA NGALULA Marceline',
        role_fr: 'Directrice Technique',
        bio_fr: 'Supervise les aspects techniques et scientifiques des programmes.',
        email: 'dt@betterlife-ong.org',
        photo_path: '/team/marceline.jpg',
        expertise: ['Expertise Technique', 'Agronomie', 'Environnement'],
        sort_order: 8,
    }
];

const DEFAULT_DELEGATES = [
    {
        name: 'Justin Ngandu',
        province: 'Grand Katanga',
        role: 'Délégué Provincial',
        bio_fr: "Supervise les actions de Better Life dans la région du Grand Katanga, avec un focus sur le développement durable et l'agriculture.",
        expertise: ['Développement', 'Coordination', 'Agriculture'],
        email: 'admin-lushi@betterlife-ong.org',
    },
    {
        name: 'Gilbert Ifambe',
        province: 'Kongo Central',
        role: 'Délégué Provincial',
        bio_fr: 'Coordination des programmes environnementaux et agricoles dans la province du Kongo Central.',
        expertise: ['Environnement', 'Gestion', 'Développement'],
        email: 'boma@betterlife-ong.org',
    },
    {
        name: 'À préciser',
        province: 'Grand Bandundu',
        role: 'Délégué Provincial',
        bio_fr: 'Responsable de la mise en oeuvre des initiatives communautaires dans la région du Grand Bandundu.',
        expertise: ['Communauté', 'Agriculture', 'Projets'],
        email: 'grad-bandundu@betterlife-ong.org',
    },
    {
        name: 'À préciser',
        province: 'Grand Oriental',
        role: 'Délégué Provincial',
        bio_fr: 'Supervise le développement des programmes de conservation et de sécurité alimentaire dans le Grand Oriental.',
        expertise: ['Conservation', 'Sécurité Alimentaire', 'Terrain'],
        email: 'grand-oriental@betterlife-ong.org',
    },
    {
        name: 'À préciser',
        province: 'Grand Kasaï',
        role: 'Délégué Provincial',
        bio_fr: 'Coordination des actions de reboisement et de soutien aux agriculteurs dans la zone du Grand Kasaï.',
        expertise: ['Reboisement', 'Soutien Agricole', 'Impact'],
        email: 'grand-kasai@betterlife-ong.org',
    }
];

async function resetTeam() {
    let connection;
    try {
        connection = await mysql.createConnection(DB_CONFIG);
        console.log('--- Nettoyage de la base ---');

        // Supprimer les tables existantes pour repartir de zéro
        await connection.execute('DROP TABLE IF EXISTS team_members');
        await connection.execute('DROP TABLE IF EXISTS delegates');

        console.log('--- Recréation des tables ---');

        await connection.execute(`
            CREATE TABLE team_members (
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

        await connection.execute(`
            CREATE TABLE delegates (
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

        console.log('--- Seeding Team Members ---');
        for (const member of DEFAULT_TEAM_MEMBERS) {
            await connection.execute(
                `INSERT INTO team_members (name, role_fr, bio_fr, email, photo_path, expertise, sort_order, is_active)
                 VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)`,
                [
                    member.name,
                    member.role_fr,
                    member.bio_fr,
                    member.email,
                    member.photo_path || null,
                    JSON.stringify(member.expertise || []),
                    member.sort_order || 0,
                ]
            );
        }

        console.log('--- Seeding Delegates ---');
        for (const delegate of DEFAULT_DELEGATES) {
            await connection.execute(
                `INSERT INTO delegates (name, province, role, bio_fr, expertise, email, is_active)
                 VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
                [
                    delegate.name,
                    delegate.province,
                    delegate.role,
                    delegate.bio_fr,
                    JSON.stringify(delegate.expertise || []),
                    delegate.email,
                ]
            );
        }

        console.log('--- RESTAURATION TERMINÉE ---');
    } catch (err) {
        console.error('Erreur:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

resetTeam();
