const mysql = require('mysql2/promise');
require('dotenv').config();

const pages = [
  {
    slug: 'about/mission',
    title_fr: 'Notre Mission',
    title_en: 'Our Mission',
    subtitle_fr: "Protéger l'environnement et promouvoir un monde meilleur pour les générations futures",
    subtitle_en: 'Protecting the environment and promoting a better world for future generations',
    content_fr: `
<div class="space-y-12">
    <section>
        <h2 class="text-3xl font-bold text-[#0f70b7] mb-6">Notre Vision</h2>
        <p class="text-xl text-slate-700 font-semibold mb-4">Un Monde Meilleur pour Tous</p>
        <p class="text-lg text-slate-600 italic">"Nous imaginons un monde où l'harmonie entre l'homme et la nature est restaurée, où chaque communauté a accès à une alimentation saine et à un environnement préservé."</p>
        <p class="mt-4 text-slate-600 leading-relaxed">Better Life s'engage à créer un impact positif et durable en République Démocratique du Congo et au-delà, en plaçant la protection de l'environnement et le bien-être des communautés au cœur de toutes nos actions.</p>
    </section>

    <div class="grid md:grid-cols-2 gap-8 my-12">
        <div class="p-8 bg-green-50 rounded-3xl border border-green-100">
            <h3 class="text-2xl font-bold text-[#63b32e] mb-4">Agir pour le Changement</h3>
            <p class="text-slate-700 leading-relaxed">Nous œuvrons quotidiennement pour la protection de l'environnement, la conservation de la biodiversité et la promotion de la sécurité alimentaire.</p>
        </div>
        <div class="p-8 bg-blue-50 rounded-3xl border border-blue-100">
            <h3 class="text-2xl font-bold text-[#0f70b7] mb-4">Impact Durable</h3>
            <p class="text-slate-700 leading-relaxed">À travers des programmes innovants et participatifs, nous mobilisons les communautés locales pour créer un changement positif et durable qui bénéficie à tous.</p>
        </div>
    </div>

    <section>
        <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center">Nos Valeurs Fondamentales</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="p-6 bg-white shadow-md rounded-2xl border border-slate-100 transition hover:shadow-lg">
                <h4 class="font-bold text-[#63b32e] text-lg mb-2">Microcrédit</h4>
                <p class="text-sm text-slate-600">Accompagnement financier et technique pour le développement d'activités génératrices de revenus.</p>
            </div>
            <div class="p-6 bg-white shadow-md rounded-2xl border border-slate-100 transition hover:shadow-lg">
                <h4 class="font-bold text-[#0f70b7] text-lg mb-2">Formation</h4>
                <p class="text-sm text-slate-600">Développement des compétences techniques et entrepreneuriales pour les jeunes et les femmes.</p>
            </div>
            <div class="p-6 bg-white shadow-md rounded-2xl border border-slate-100 transition hover:shadow-lg">
                <h4 class="font-bold text-[#63b32e] text-lg mb-2">Eau Potable</h4>
                <p class="text-sm text-slate-600">Installation de forages et systèmes d'adduction d'eau dans les communautés rurales.</p>
            </div>
            <div class="p-6 bg-white shadow-md rounded-2xl border border-slate-100 transition hover:shadow-lg">
                <h4 class="font-bold text-[#0f70b7] text-lg mb-2">Agroécologie</h4>
                <p class="text-sm text-slate-600">Formation aux techniques d'agroécologie et d'agroforesterie pour une production durable.</p>
            </div>
            <div class="p-6 bg-white shadow-md rounded-2xl border border-slate-100 transition hover:shadow-lg">
                <h4 class="font-bold text-[#63b32e] text-lg mb-2">Nutrition</h4>
                <p class="text-sm text-slate-600">Programmes de nutrition et de diversification alimentaire pour lutter contre la malnutrition.</p>
            </div>
            <div class="p-6 bg-white shadow-md rounded-2xl border border-slate-100 transition hover:shadow-lg">
                <h4 class="font-bold text-[#0f70b7] text-lg mb-2">Autonomie</h4>
                <p class="text-sm text-slate-600">Programmes spécifiques pour renforcer le leadership et l'indépendance économique des femmes.</p>
            </div>
        </div>
    </section>
</div>
`,
    is_active: 1,
    sort_order: 1
  },
  {
    slug: 'Actions/agriculture',
    title_fr: 'Agriculture Durable',
    title_en: 'Sustainable Agriculture',
    subtitle_fr: "Promotion d'une agriculture intelligente face au climat et respectueuse de la biodiversité",
    subtitle_en: 'Promoting climate-smart agriculture that respects biodiversity',
    content_fr: `
<div class="space-y-12">
    <div class="prose prose-lg max-w-none text-slate-600">
        <p>L'agriculture est le pilier de l'économie congolaise et le socle de la sécurité alimentaire. Chez Better Life, nous transformons les pratiques traditionnelles en systèmes durables et productifs.</p>
    </div>

    <div class="grid md:grid-cols-3 gap-8 my-12">
        <div class="bg-slate-50 p-6 rounded-2xl text-center">
            <h4 class="text-4xl font-bold text-[#63b32e] mb-2">1200+</h4>
            <p class="text-sm font-semibold text-slate-500 uppercase">Agriculteurs formés</p>
        </div>
        <div class="bg-slate-50 p-6 rounded-2xl text-center">
            <h4 class="text-4xl font-bold text-[#0f70b7] mb-2">+40%</h4>
            <p class="text-sm font-semibold text-slate-500 uppercase">Augmentation rendement</p>
        </div>
        <div class="bg-slate-50 p-6 rounded-2xl text-center">
            <h4 class="text-4xl font-bold text-[#63b32e] mb-2">-85%</h4>
            <p class="text-sm font-semibold text-slate-500 uppercase">Usage pesticides</p>
        </div>
    </div>

    <section>
        <h2 class="text-3xl font-bold text-slate-900 mb-6">Nos Filières d'Excellence</h2>
        <div class="space-y-4">
            <div class="flex items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div class="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-4 font-bold">C</div>
                <div>
                    <h4 class="font-bold">Cacao Criollo</h4>
                    <p class="text-sm text-slate-500">Valorisation de la variété la plus rare et la plus prisée au monde.</p>
                </div>
            </div>
            <div class="flex items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div class="w-12 h-12 rounded-full bg-brown-100 text-amber-900 flex items-center justify-center mr-4 font-bold">K</div>
                <div>
                    <h4 class="font-bold">Café Arabica</h4>
                    <p class="text-sm text-slate-500">Production d'excellence sur les hautes terres du Congo.</p>
                </div>
            </div>
            <div class="flex items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div class="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4 font-bold">T</div>
                <div>
                    <h4 class="font-bold">Théiers & Arboriculture</h4>
                    <p class="text-sm text-slate-500">Diversification des cultures pour une résilience économique accrue.</p>
                </div>
            </div>
        </div>
    </section>

    <div class="bg-gradient-to-br from-[#0f70b7] to-[#63b32e] rounded-3xl p-8 text-white">
        <h3 class="text-2xl font-bold mb-4">Témoignage de Jean K.</h3>
        <p class="italic text-lg mb-4">"Grâce à la formation en agroforesterie, j'ai non seulement augmenté ma production de cacao, mais j'ai aussi sécurisé mes terres pour mes enfants."</p>
        <p class="font-bold">- Agriculteur partenaire</p>
    </div>
</div>
`,
    is_active: 1,
    sort_order: 2
  },
  {
    slug: 'Actions/elevage',
    title_fr: 'Élevage & Pastoralisme',
    title_en: 'Livestock & Pastoralism',
    subtitle_fr: "Développement de systèmes d'élevage modernes et durables pour la sécurité alimentaire",
    subtitle_en: 'Developing modern and sustainable livestock systems for food security',
    content_fr: `
<div class="space-y-12">
    <section>
        <h2 class="text-3xl font-bold text-[#0f70b7] mb-6">Élevage Moderne et Responsable</h2>
        <p class="text-lg text-slate-600 leading-relaxed">Nous développons des méthodes d'élevage qui allient productivité, bien-être animal et respect de l'environnement pour une sécurité alimentaire durable.</p>
    </section>

    <div class="grid sm:grid-cols-2 gap-6 my-12">
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h4 class="text-xl font-bold text-[#63b32e] mb-2">Élevage Canin</h4>
            <p class="text-sm text-slate-500">Élevage professionnel pour la sécurité et l'assistance.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h4 class="text-xl font-bold text-[#0f70b7] mb-2">Gros Bétail</h4>
            <p class="text-sm text-slate-500">Bovins axés sur la qualité de la viande et du lait.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h4 class="text-xl font-bold text-[#63b32e] mb-2">Apiculture</h4>
            <p class="text-sm text-slate-500">Production de miel biologique et préservation des abeilles.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h4 class="text-xl font-bold text-[#0f70b7] mb-2">Pisciculture</h4>
            <p class="text-sm text-slate-500">Élevage durable de poissons d'eau douce.</p>
        </div>
    </div>

    <section class="bg-slate-50 p-8 rounded-3xl border border-slate-200">
        <h3 class="text-2xl font-bold text-slate-900 mb-6 text-center">Appui aux Éleveurs</h3>
        <ul class="grid md:grid-cols-2 gap-4">
            <li class="flex items-center gap-3"><span class="w-2 h-2 bg-[#63b32e] rounded-full"></span> Santé Animale & Vaccination</li>
            <li class="flex items-center gap-3"><span class="w-2 h-2 bg-[#63b32e] rounded-full"></span> Amélioration Génétique</li>
            <li class="flex items-center gap-3"><span class="w-2 h-2 bg-[#63b32e] rounded-full"></span> Formation en Gestion</li>
            <li class="flex items-center gap-3"><span class="w-2 h-2 bg-[#63b32e] rounded-full"></span> Infrastructures Modernes</li>
        </ul>
    </section>
</div>
`,
    is_active: 1,
    sort_order: 3
  },
  {
    slug: 'Actions/environement',
    title_fr: 'Environnement & Climat',
    title_en: 'Environment & Climate',
    subtitle_fr: "Protéger notre cadre de vie et nos ressources naturelles",
    subtitle_en: 'Protecting our environment and natural resources',
    content_fr: `
<div class="space-y-12">
    <section>
        <h2 class="text-3xl font-bold text-green-700 mb-6">Actions pour l'Environnement</h2>
        <p class="text-lg text-slate-600 leading-relaxed">Des initiatives concrètes pour préserver la nature et promouvoir un mode de vie durable en harmonie avec les écosystèmes du Congo.</p>
    </section>

    <div class="grid md:grid-cols-2 gap-8 my-12">
        <div class="relative overflow-hidden group rounded-3xl">
            <div class="p-8 bg-gradient-to-br from-green-500 to-green-700 text-white h-full transition group-hover:scale-105 duration-500">
                <h3 class="text-2xl font-bold mb-4">Protection des Forêts</h3>
                <p class="text-green-50">Lutte contre la déforestation et le braconnage à travers des patrouilles d'éco-gardes et la cartographie participative.</p>
            </div>
        </div>
        <div class="relative overflow-hidden group rounded-3xl">
            <div class="p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white h-full transition group-hover:scale-105 duration-500">
                <h3 class="text-2xl font-bold mb-4">Crédit Carbone</h3>
                <p class="text-blue-50">Valoriser la séquestration de carbone pour générer des revenus durables pour les communautés locales.</p>
            </div>
        </div>
    </div>

    <section class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-slate-900 mb-12">Notre Impact Environnemental</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
                <p class="text-4xl font-bold text-[#63b32e] mb-1">450k</p>
                <p class="text-xs text-slate-500 uppercase tracking-widest font-bold">Arbres plantés</p>
            </div>
            <div>
                <p class="text-4xl font-bold text-[#0f70b7] mb-1">85%</p>
                <p class="text-xs text-slate-500 uppercase tracking-widest font-bold">Taux survie</p>
            </div>
            <div>
                <p class="text-4xl font-bold text-[#63b32e] mb-1">-30%</p>
                <p class="text-xs text-slate-500 uppercase tracking-widest font-bold">Émissions CO2</p>
            </div>
            <div>
                <p class="text-4xl font-bold text-[#0f70b7] mb-1">10k</p>
                <p class="text-xs text-slate-500 uppercase tracking-widest font-bold">Enfants sensibilisés</p>
            </div>
        </div>
    </section>
</div>
`,
    is_active: 1,
    sort_order: 4
  },
  {
    slug: 'Actions/mecanisation',
    title_fr: 'Mécanisation Agricole',
    title_en: 'Agricultural Mechanization',
    subtitle_fr: "Moderniser pour une agriculture performante et compétitive",
    subtitle_en: 'Modernizing for high-performance and competitive agriculture',
    content_fr: `
<div class="space-y-12">
    <section>
        <h2 class="text-3xl font-bold text-[#0f70b7] mb-6">L'Avenir est à la Mécanisation</h2>
        <p class="text-lg text-slate-600 leading-relaxed">Nous facilitons l'accès aux équipements modernes pour augmenter la productivité tout en réduisant la pénibilité du travail agricole.</p>
    </section>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-12">
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <h4 class="text-3xl font-bold text-[#63b32e]">200+</h4>
            <p class="text-xs font-bold text-slate-400 mt-2">Tracteurs déployés</p>
        </div>
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <h4 class="text-3xl font-bold text-[#0f70b7]">1000+</h4>
            <p class="text-xs font-bold text-slate-400 mt-2">Hectares labourés</p>
        </div>
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <h4 class="text-3xl font-bold text-[#63b32e]">50+</h4>
            <p class="text-xs font-bold text-slate-400 mt-2">Ateliers mobiles</p>
        </div>
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <h4 class="text-3xl font-bold text-[#0f70b7]">500+</h4>
            <p class="text-xs font-bold text-slate-400 mt-2">Opérateurs formés</p>
        </div>
    </div>

    <section class="space-y-8">
        <div class="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl shadow-xl ring-1 ring-slate-900/5">
            <div class="w-full md:w-1/3">
                <h3 class="text-2xl font-bold text-slate-900 mb-4">Maintenance & Réparation</h3>
                <p class="text-slate-600">Un service technique de proximité pour assurer la longévité de vos équipements agricoles.</p>
            </div>
            <div class="w-full md:w-2/3 grid grid-cols-2 gap-4">
                <div class="p-4 bg-blue-50 rounded-xl text-blue-700 font-bold text-center italic">Service 24/7</div>
                <div class="p-4 bg-green-50 rounded-xl text-green-700 font-bold text-center italic">Pièces d'origine</div>
            </div>
        </div>
    </section>
</div>
`,
    is_active: 1,
    sort_order: 5
  },
  {
    slug: 'Actions/communautaire',
    title_fr: 'Développement Communautaire',
    title_en: 'Community Development',
    subtitle_fr: "Autonomiser les communautés pour un avenir durable",
    subtitle_en: 'Empowering communities for a sustainable future',
    content_fr: `
<div class="space-y-12">
    <section>
        <h2 class="text-3xl font-bold text-[#63b32e] mb-6">Au cœur des communautés locales</h2>
        <p class="text-lg text-slate-600 leading-relaxed">Nous travaillons main dans la main avec les communautés pour développer des solutions durables qui améliorent les conditions de vie tout en préservant l'environnement.</p>
    </section>

    <div class="grid md:grid-cols-2 gap-12 items-center my-16">
        <div>
            <h3 class="text-2xl font-bold text-slate-900 mb-6">Autonomisation des Femmes</h3>
            <p class="text-slate-600 mb-6">Nous croyons que l'autonomisation des femmes est la clé du développement. Nos programmes renforcent leur leadership et leur indépendance économique.</p>
            <ul class="space-y-3">
                <li class="flex items-center gap-3"><span class="text-green-500">✔</span> 2,000+ Femmes formées</li>
                <li class="flex items-center gap-3"><span class="text-green-500">✔</span> 300+ Micro-entreprises créées</li>
                <li class="flex items-center gap-3"><span class="text-green-500">✔</span> 85% Taux de réussite</li>
            </ul>
        </div>
        <div class="bg-gradient-to-r from-[#63b32e] to-[#0f70b7] p-1 rounded-3xl shadow-2xl">
            <div class="bg-white p-8 rounded-[1.4rem]">
                <p class="italic text-slate-600 mb-4 text-center">"Grâce à la formation en entrepreneuriat, j'ai pu créer ma petite entreprise et subvenir aux besoins de ma famille."</p>
                <p class="text-center font-bold text-[#0f70b7]">- Marie K., Bénéficiaire</p>
            </div>
        </div>
    </div>

    <section>
        <h2 class="text-3xl font-bold text-slate-900 mb-8 text-center uppercase tracking-tighter">Histoires de Succès</h2>
        <div class="grid gap-6 md:grid-cols-3">
            <div class="p-6 bg-slate-50 rounded-2xl">
                <h4 class="font-bold mb-2">L'école de l'espoir à Kibumba</h4>
                <p class="text-xs text-slate-500 italic">500 enfants scolarisés, 15 enseignants formés.</p>
            </div>
            <div class="p-6 bg-slate-50 rounded-2xl">
                <h4 class="font-bold mb-2">Source de vie à Tshikapa</h4>
                <p class="text-xs text-slate-500 italic">3,000 bénéficiaires, 5 points d'eau installés.</p>
            </div>
            <div class="p-6 bg-slate-50 rounded-2xl">
                <h4 class="font-bold mb-2">Femmes de Goma</h4>
                <p class="text-xs text-slate-500 italic">200 femmes formées, 150 entreprises lancées.</p>
            </div>
        </div>
    </section>
</div>
`,
    is_active: 1,
    sort_order: 6
  }
];

async function seed() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'betterlife_db'
    });

    console.log('Pushing real content to pages...');

    for (const page of pages) {
      const [existing] = await connection.execute('SELECT id FROM pages WHERE slug = ?', [page.slug]);
      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO pages (slug, title_fr, title_en, subtitle_fr, subtitle_en, content_fr, is_active, sort_order) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [page.slug, page.title_fr, page.title_en, page.subtitle_fr, page.subtitle_en, page.content_fr || null, page.is_active, page.sort_order]
        );
        console.log(`Created page with content: ${page.slug}`);
      } else {
        await connection.execute(
          `UPDATE pages SET title_fr = ?, title_en = ?, subtitle_fr = ?, subtitle_en = ?, content_fr = ?, is_active = ?, sort_order = ? WHERE slug = ?`,
          [page.title_fr, page.title_en, page.subtitle_fr, page.subtitle_en, page.content_fr || null, page.is_active, page.sort_order, page.slug]
        );
        console.log(`Updated content for: ${page.slug}`);
      }
    }

    console.log('Content push complete!');
  } catch (error) {
    console.error('Error during content push:', error);
  } finally {
    if (connection) await connection.end();
  }
}

seed();
