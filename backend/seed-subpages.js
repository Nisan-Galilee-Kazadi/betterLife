const mysql = require('mysql2/promise');
require('dotenv').config();

const subPages = [
  {
    slug: 'Actions/agriculture/cacao',
    title_fr: 'Cacao Criollo',
    title_en: 'Criollo Cocoa',
    subtitle_fr: "L'Or Brun de la RDC - Une variété d'exception",
    subtitle_en: 'The Brown Gold of DRC - An exceptional variety',
    content_fr: `
<div class="space-y-12">
    <section class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="bg-amber-50 p-8 rounded-2xl border-2 border-amber-200">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Excellence Mondiale</h3>
            <p class="text-gray-700 text-sm leading-relaxed">Le Criollo est l'une des variétés de cacao les plus prestigieuses au monde, réputée pour ses arômes fins et complexes.</p>
        </div>
        <div class="bg-amber-50 p-8 rounded-2xl border-2 border-amber-200">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Demande Croissante</h3>
            <p class="text-gray-700 text-sm leading-relaxed">Prix 3 à 5 fois supérieurs au cacao conventionnel. Une opportunité économique exceptionnelle pour nos agriculteurs.</p>
        </div>
        <div class="bg-amber-50 p-8 rounded-2xl border-2 border-amber-200">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Développement Durable</h3>
            <p class="text-gray-700 text-sm leading-relaxed">La culture en agroforesterie préserve la biodiversité et régénère les sols face aux changements climatiques.</p>
        </div>
    </section>

    <section>
        <h2 class="text-3xl font-bold text-slate-900 mb-8">Les Avantages avec BetterLife</h2>
        <div class="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">1</div>
                <div>
                    <h4 class="font-bold mb-1">Formation Professionnelle</h4>
                    <p class="text-sm text-slate-600">Techniques modernes de culture, récolte et post-récolte. Taux de réussite de 95%.</p>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">2</div>
                <div>
                    <h4 class="font-bold mb-1">Plants Certifiés</h4>
                    <p class="text-sm text-slate-600">Fourniture de plants Criollo certifiés, génétiquement purs et adaptés aux conditions locales.</p>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">3</div>
                <div>
                    <h4 class="font-bold mb-1">Accès Marchés</h4>
                    <p class="text-sm text-slate-600">Connexion directe avec les acheteurs européens. Prix minimum garanti 30% au-dessus du marché.</p>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">4</div>
                <div>
                    <h4 class="font-bold mb-1">Suivi Technique</h4>
                    <p class="text-sm text-slate-600">Nos agronomes visitent vos plantations chaque mois pour un accompagnement permanent.</p>
                </div>
            </div>
        </div>
    </section>

    <div class="bg-gradient-to-r from-amber-600 to-green-600 p-12 rounded-3xl text-white text-center">
        <h2 class="text-3xl font-bold mb-4">Rejoignez la Révolution du Cacao</h2>
        <p class="text-xl opacity-90 mb-8">Devenez partenaire BetterLife et transformez votre avenir agricole</p>
        <a href="/rejoindre" class="inline-block bg-white text-amber-700 px-8 py-3 rounded-full font-bold">Devenir Partenaire</a>
    </div>
</div>
`
  },
  {
    slug: 'Actions/agriculture/cafe',
    title_fr: 'Café Arabica',
    title_en: 'Arabica Coffee',
    subtitle_fr: "L'excellence des hautes terres - Saveurs du Congo",
    subtitle_en: 'Highland excellence - Flavors of Congo',
    content_fr: `
<div class="space-y-12">
    <p class="text-lg text-slate-600">Notre programme café focus sur l'Arabica de haute altitude, reconnu pour sa finesse et ses notes acidulées uniques au monde.</p>
    <div class="grid md:grid-cols-2 gap-8 my-12">
        <div class="bg-slate-50 p-8 rounded-2xl">
            <h4 class="font-bold text-xl mb-4 text-[#0f70b7]">Qualité Supérieure</h4>
            <ul class="space-y-2 text-sm">
                <li>• Altitude > 1200m</li>
                <li>• Traitement lavé</li>
                <li>• Séchage sur lits africains</li>
                <li>• Score SCA 85+</li>
            </ul>
        </div>
        <div class="bg-slate-50 p-8 rounded-2xl">
            <h4 class="font-bold text-xl mb-4 text-[#63b32e]">Impact Social</h4>
            <ul class="space-y-2 text-sm">
                <li>• 300T Export annuel</li>
                <li>• 800+ Familles soutenues</li>
                <li>• Prime de qualité aux producteurs</li>
                <li>• Accès aux soins et éducation</li>
            </ul>
        </div>
    </div>
</div>
`
  },
  {
    slug: 'Actions/environement/protection-foret',
    title_fr: 'Protection des Forêts',
    title_en: 'Forest Protection',
    subtitle_fr: "Sauvegarder les poumons de la planète",
    subtitle_en: 'Protecting the planet\'s lungs',
    content_fr: `
<div class="space-y-12">
    <div class="prose prose-lg max-w-none text-slate-600">
        <p>Le bassin du Congo est le deuxième poumon vert du monde. Sa protection est une priorité absolue pour l'équilibre climatique mondial.</p>
    </div>
    <div class="grid md:grid-cols-2 gap-4">
        <div class="p-6 bg-green-50 border border-green-200 rounded-xl">
            <h4 class="font-bold mb-2">Patrouilles Éco-gardes</h4>
            <p class="text-sm">Surveillance active contre le braconnage et l'exploitation forestière illégale.</p>
        </div>
        <div class="p-6 bg-green-50 border border-green-200 rounded-xl">
            <h4 class="font-bold mb-2">Cartographie Participative</h4>
            <p class="text-sm">Implication des communautés locales dans la définition des zones de conservation.</p>
        </div>
    </div>
</div>
`
  },
  {
    slug: 'Actions/communautaire/sante',
    title_fr: 'Santé Communautaire',
    title_en: 'Community Health',
    subtitle_fr: "L'accès aux soins de base pour tous",
    subtitle_en: 'Access to basic healthcare for all',
    content_fr: `
<div class="space-y-12">
    <p class="text-lg text-slate-600">Le bien-être des populations est indissociable du développement durable. Nous agissons pour rapprocher les soins des plus vulnérables.</p>
    <div class="grid md:grid-cols-2 gap-8">
        <section>
            <h3 class="text-2xl font-bold mb-6 text-[#0f70b7]">Nos Actions Santé</h3>
            <ul class="space-y-4">
                <li class="p-4 bg-blue-50 rounded-lg"><strong>Cliniques Mobiles :</strong> Soins dans les zones enclavées.</li>
                <li class="p-4 bg-blue-50 rounded-lg"><strong>Vaccination :</strong> Campagnes de prévention infantiles.</li>
                <li class="p-4 bg-blue-50 rounded-lg"><strong>Santé Maternelle :</strong> Accompagnement des futures mamans.</li>
            </ul>
        </section>
        <section class="flex items-center justify-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div class="text-center">
                <p class="text-5xl font-bold text-[#0f70b7] mb-2">10k+</p>
                <p class="font-bold text-slate-500 uppercase">Patients soignés</p>
            </div>
        </section>
    </div>
</div>
`
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

    console.log('Seeding subpages content...');

    for (const page of subPages) {
      const [existing] = await connection.execute('SELECT id FROM pages WHERE slug = ?', [page.slug]);
      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO pages (slug, title_fr, title_en, subtitle_fr, subtitle_en, content_fr, is_active, sort_order) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [page.slug, page.title_fr, page.title_en, page.subtitle_fr, page.subtitle_en, page.content_fr || null, 1, 10]
        );
        console.log(`Created subpage: ${page.slug}`);
      } else {
        await connection.execute(
          `UPDATE pages SET title_fr = ?, title_en = ?, subtitle_fr = ?, subtitle_en = ?, content_fr = ? WHERE slug = ?`,
          [page.title_fr, page.title_en, page.subtitle_fr, page.subtitle_en, page.content_fr || null, page.slug]
        );
        console.log(`Updated subpage: ${page.slug}`);
      }
    }

    console.log('Subpages seeding complete!');
  } catch (error) {
    console.error('Error during subpages seeding:', error);
  } finally {
    if (connection) await connection.end();
  }
}

seed();
