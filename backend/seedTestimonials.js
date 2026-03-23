/**
 * Seed testimonials from hardcoded translation data into the database.
 * Only inserts if the testimonials table is empty.
 */
async function seedTestimonials(db) {
    try {
        const [existing] = await db.execute('SELECT COUNT(*) as count FROM testimonials');
        if (existing[0].count > 0) {
            console.log('[SEED] Testimonials already seeded, skipping.');
            return;
        }

        const testimonials = [
            {
                name: 'Mr. KABAMBA KABAMBA Chrétien',
                location: 'partenaire de Better Life (LOMAMI)',
                role: 'Partenaire',
                short_quote_fr: "Grâce à Better Life, nous soutenons l'agriculture pérenne, le reboisement et le développement social dans plusieurs régions du Congo. Nos projets visent à améliorer les conditions de vie des communautés, en particulier l'accès à l'éducation et aux soins de santé.",
                full_quote_fr: "Nous avons constaté les conditions de vie difficiles dans de nombreuses régions du Congo : manque d'eau potable, écoles inadéquates, accès limité aux soins de santé. Face à ces défis, nous menons un plaidoyer pour que les bailleurs de fonds, nationaux et internationaux, soutiennent nos projets visant à améliorer le développement social et économique des communautés, rurales et urbaines.\n\nAvec Better Life, nous intervenons dans plusieurs domaines : agriculture pérenne (cultures de cacahuètes), reboisement, protection des tourbières et mobilisation de fonds. Cette approche polyvalente nous permet de répondre de manière concrète aux besoins de la population et de soutenir des initiatives durables.",
                image_path: '/images/temoignages/Mr chretien.webp',
                video_url: 'https://youtu.be/nEwJognetC0',
                rating: 5,
                is_featured: true,
                is_active: true,
                sort_order: 1
            },
            {
                name: 'Mr. MWAMBA SELEMANI Gérard',
                location: 'partenaire de Better Life (HAUT-KATANGA)',
                role: 'Partenaire',
                short_quote_fr: "À Moubambé, nous avons lancé le projet \"Zéro enfant dans les mines\", combinant agriculture pérenne et accès à l'éducation. Grâce à Better Life, les enfants quittent les mines pour étudier et la communauté adopte des pratiques durables.",
                full_quote_fr: "À Moubambé, une région reculée du Haut-Katanga, nous avons initié un projet agricole pérenne en collaboration avec Better Life. La population, auparavant dépendante de l'exploitation minière artisanale, a été sensibilisée à l'agriculture durable. Nous avons mis en place des pépinières et mobilisé la communauté locale pour que les enfants puissent quitter les mines et accéder à l'éducation.\n\nLe projet \"Zéro enfant dans les mines\" prévoit également la construction d'écoles et de centres de formation professionnelle pour les jeunes adultes. Ce témoignage illustre comment l'engagement collectif et l'accompagnement technique peuvent transformer durablement la vie des communautés rurales.",
                image_path: '/images/temoignages/Mr Gerard.webp',
                video_url: 'https://youtu.be/JCMOtc03cdo',
                rating: 5,
                is_featured: true,
                is_active: true,
                sort_order: 2
            },
            {
                name: "Mr L'Abbé Aimé",
                location: 'Caritas Développement (Boma)',
                role: 'Partenaire religieux',
                short_quote_fr: "Le diocèse de Boma et la Caritas s'associent à Better Life pour reconstruire 12 écoles détruites par des intempéries dans la forêt du Mayombe. Ce projet vital vise à sécuriser l'éducation de nos enfants grâce à des infrastructures modernes incluant forages, énergie solaire et sanitaires.",
                full_quote_fr: "C'est M. Abbé Aimé du diocèse de Boma et la Caritas Développement. Je suis là parce que la Caritas est pour le bien-être de la population. Nous sommes très ancrés dans les projets sociaux. Nous avons perdu beaucoup d'écoles au nombre de 67 et il y a eu aussi mort d'hommes. Des élèves se sont retrouvés coincés sous les décombres. Et voilà qui a motivé que nous puissions monter un projet de reconstruction de 12 écoles et qui demandent une délocalisation. Parce que c'était les écoles les plus touchées. Ceux qui avaient construit les écoles auparavant n'avaient pas d'expérience sur le choix du terrain. C'était des écoles parfois à proximité de grandes forêts parce que nous sommes dans la forêt vierge du Mayombe. Alors ce qui fait que dans des tempêtes, il y a eu des arbres qui ont emporté parfois toutes les écoles. Les écoles se sont écroulées et nous avons perdu 23 élèves.\n\nLorsque nous avons partagé l'expérience avec notre partenaire Better Life, ils nous ont dit de soumissionner. Voilà ce qui nous a mené à soumissionner en faveur de ces communautés qui sont dans la forêt, parfois à accessibilité difficile, d'avoir quand même des infrastructures de base adéquates. Le coût par école est autour de 240 000 dollars parce qu'il est prévu d'y mettre l'équipement nécessaire : forage d'eau, énergie solaire et sanitaires. Pensez aussi à nos communautés très enclavées dans la grande forêt du Mayombe.",
                image_path: "/images/temoignages/Mr L'Abbée.png",
                video_url: 'https://www.youtube.com/watch?v=fbZJ_Gtrk4k',
                rating: 5,
                is_featured: true,
                is_active: true,
                sort_order: 3
            },
            {
                name: 'Maitre Falonne Kazadi',
                location: 'partenaire de Better Life (KINSHASA)',
                role: 'Partenaire juridique',
                short_quote_fr: "Dans le groupement Mubambe, nous œuvrons pour sortir les enfants des mines artisanales vers le chemin de l'école. À travers le projet « Zéro enfant dans les mines », nous plaidons pour un accès universel à l'éducation et à la santé, garantissant ainsi les droits fondamentaux de chaque enfant.",
                full_quote_fr: "Nous faisons nos activités agricoles dans le groupement Mubambe qui regorge pratiquement 18 villages dans lesquels nous avons fait un constat : il y a une forte présence des enfants dans les mines artisanales. Après avoir fait le monitoring, nous avons compris qu'il y a une question de santé publique et aussi, pour faire sortir les enfants des mines, nous avons proposé la construction d'écoles. Avec nos sensibilisations dans le village, nous avons compris que c'est par manque d'infrastructures que les enfants se retrouvent dans les mines. C'est comme ça que nous avons soumissionné à ce projet.\n\nL'objectif principal est de sortir les enfants des mines. Notre projet est intitulé « Zéro enfant dans les mines ». Répondre à ce projet, c'est donner l'accès à la santé et également l'accès à l'éducation qui sont des droits fondamentaux reconnus d'une manière universelle en faveur de l'être humain. J'adresse un appel pressant aux bailleurs de fonds et aux décideurs pour soutenir cette cause primordiale.",
                image_path: '/images/temoignages/Maitre Falonne.png',
                video_url: 'https://www.youtube.com/watch?v=VIKoUEBqgI0',
                rating: 5,
                is_featured: true,
                is_active: true,
                sort_order: 4
            }
        ];

        for (const t of testimonials) {
            await db.execute(
                `INSERT INTO testimonials (name, location, role, short_quote_fr, full_quote_fr, image_path, video_url, rating, is_featured, is_active, sort_order)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [t.name, t.location, t.role, t.short_quote_fr, t.full_quote_fr, t.image_path, t.video_url, t.rating, t.is_featured, t.is_active, t.sort_order]
            );
        }

        console.log(`[SEED] ${testimonials.length} testimonials seeded successfully.`);
    } catch (error) {
        console.error('[SEED] Error seeding testimonials:', error.message);
    }
}

module.exports = { seedTestimonials };
