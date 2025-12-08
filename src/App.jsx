const services = [
  {
    title: 'Culture de Cacaoyer',
    desc: 'Production, encadrement des producteurs, formation, suivi des plantations, valorisation locale…',
  },
  {
    title: 'Reboisement & Environnement',
    desc: 'Programmes de reboisement, restauration des sols, lutte contre la déforestation…',
  },
  {
    title: 'Crédit Carbone',
    desc: 'Introduction au marché carbone, méthode de calcul, accompagnement, certificats…',
  },
  {
    title: 'Projets Communautaires',
    desc: 'Santé, éducation, accès à l’eau, développement rural participatif…',
  },
  {
    title: 'Contrats de Préachat de Cacao',
    desc: 'Modèle, partenaires, garanties aux producteurs, fonctionnement…',
  },
  {
    title: 'Équipements Agricoles',
    desc: 'Location, vente, maintenance, accompagnement à l’utilisation…',
  },
]

const joinCards = [
  { title: 'Producteurs', desc: 'Accompagnement technique, accès aux intrants, valorisation des récoltes.' },
  { title: 'Partenaires', desc: 'ONG, entreprises, bailleurs : co-construction de projets à impact.' },
  { title: 'Bénévoles / Stagiaires', desc: 'Opérations terrain, logistique, communication, recherche.' },
]

const blogItems = [
  { title: 'Programme cacao durable 2025', tag: 'Formation', date: 'Jan 2025' },
  { title: 'Lancement d’un nouveau projet communautaire', tag: 'Communauté', date: 'Dec 2024' },
  { title: 'Guide pratique crédit carbone', tag: 'Carbone', date: 'Nov 2024' },
]

function SectionTitle({ kicker, title, children }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">{kicker}</p>
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      {children ? <div className="text-lg text-slate-600">{children}</div> : null}
    </div>
  )
}

function App() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <header className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Better Life</p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Accompagner les communautés rurales pour un cacao durable et une nature préservée
              </h1>
              <p className="text-lg text-slate-600">
                Ensemble, nous développons des filières cacao responsables, protégeons les forêts et
                renforçons les projets communautaires pour un impact durable.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                  href="#contact"
                >
                  Nous contacter
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:text-sky-700"
                  href="#domaines"
                >
                  Découvrir nos actions
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <div className="space-y-4">
                <SectionTitle kicker="Vision, Mission, Valeurs" title="Notre cap">
                  Nous croyons en une agriculture régénérative, un cacao traçable et des communautés
                  autonomes. Chaque action est guidée par la transparence, l’impact social et le respect
                  de l’environnement.
                </SectionTitle>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-800">Mot du fondateur</p>
                  <p className="mt-2">
                    “Better Life est née de la volonté d’apporter aux producteurs les moyens de prospérer
                    tout en protégeant les forêts. Rejoignez ce mouvement pour bâtir une filière durable.”
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sky-600">Fondateur / Coordonnateur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="domaines" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <SectionTitle kicker="Nos domaines d’action" title="6 leviers d’impact" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-lg font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projets" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionTitle kicker="Nos projets" title="En cours et réalisés">
            Présentation synthétique des projets, leurs localisations et retours d’expérience.
          </SectionTitle>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-800">Carte / Zones d’intervention</p>
              <div className="mt-3 h-64 rounded-2xl border border-dashed border-slate-300 bg-white/60" />
              <p className="mt-3 text-sm text-slate-600">
                Intègre ici une carte interactive (Leaflet, Mapbox ou iframe) pour situer les projets.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Témoignages / reportages</p>
                <button className="text-xs font-semibold text-sky-600 hover:text-sky-700">Voir tout</button>
              </div>
              <div className="mt-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    Témoignage ou photo reportage #{i} — ajoute les retours des producteurs ou partenaires.
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rejoindre" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <SectionTitle kicker="Rejoindre le mouvement" title="3 portes d’entrée" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {joinCards.map((card) => (
            <div
              key={card.title}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-lg font-semibold text-slate-900">{card.title}</p>
              <p className="mt-2 flex-1 text-sm text-slate-600">{card.desc}</p>
              <button className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-700">
                En savoir plus
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="blog" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <SectionTitle kicker="Actualités / Blog" title="Articles et annonces" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">{item.tag}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                <p className="mt-3 text-sm text-slate-600">
                  Ajoute ici l’extrait, les médias (photo/vidéo) et le lien vers l’article complet.
                </p>
                <button className="mt-4 text-sm font-semibold text-sky-600 hover:text-sky-700">
                  Lire l’article
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-slate-50"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <SectionTitle kicker="Contact & suivi" title="Restons en lien">
                Formulaire de contact, coordonnées et inscription newsletter.
              </SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-800">Adresse / Téléphone</p>
                  <p className="mt-2 text-sm text-slate-600">Ajoute ici l’adresse, le téléphone, WhatsApp…</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-800">Réseaux sociaux</p>
                  <p className="mt-2 text-sm text-slate-600">Liens vers LinkedIn, Facebook, Instagram, YouTube…</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-800">Newsletter / Rendez-vous</p>
                <p className="mt-2 text-sm text-slate-600">
                  Place un champ email ou un lien de prise de rendez-vous (Calendly, formulaire…).
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Formulaire de contact</p>
              <form className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-600">Nom</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-sky-100 focus:border-sky-300 focus:ring-2"
                      type="text"
                      placeholder="Nom complet"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-600">Email</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-sky-100 focus:border-sky-300 focus:ring-2"
                      type="email"
                      placeholder="email@exemple.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-600">Message</label>
                  <textarea
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-sky-100 focus:border-sky-300 focus:ring-2"
                    rows="4"
                    placeholder="Décris ton besoin : producteurs, partenariat, bénévolat…"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
