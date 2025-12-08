import SectionTitle from '../components/SectionTitle.jsx'

function AccueilPage() {
  return (
    <div className="bg-gradient-to-br from-sky-50 via-white to-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Better Life</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Accompagner les communautés rurales pour un cacao durable et une nature préservée
            </h1>
            <p className="text-lg text-slate-600">
              Ensemble, nous développons des filières cacao responsables, protégeons les forêts et renforçons les
              projets communautaires pour un impact durable.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                href="/contact"
              >
                Nous contacter
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:text-sky-700"
                href="/domaines"
              >
                Découvrir nos actions
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="space-y-4">
              <SectionTitle kicker="Vision, Mission, Valeurs" title="Notre cap">
                Nous croyons en une agriculture régénérative, un cacao traçable et des communautés autonomes. Chaque
                action est guidée par la transparence, l’impact social et le respect de l’environnement.
              </SectionTitle>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-800">Mot du fondateur</p>
                <p className="mt-2">
                  “Better Life est née de la volonté d’apporter aux producteurs les moyens de prospérer tout en
                  protégeant les forêts. Rejoignez ce mouvement pour bâtir une filière durable.”
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sky-600">Fondateur / Coordonnateur</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Vision</p>
            <p className="mt-2 text-sm text-slate-600">
              Un cacao traçable qui finance la reforestation et améliore la vie des producteurs.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Mission</p>
            <p className="mt-2 text-sm text-slate-600">
              Former, équiper et rémunérer justement les producteurs tout en protégeant les forêts.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Valeurs</p>
            <p className="mt-2 text-sm text-slate-600">Transparence, impact social, régénération des écosystèmes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccueilPage

