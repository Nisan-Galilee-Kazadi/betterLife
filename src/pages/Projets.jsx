import SectionTitle from '../components/SectionTitle.jsx'

function ProjetsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
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
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Projet #{i}</p>
              <p className="mt-2 text-sm text-slate-600">
                Résumé du projet, localisation, partenaires et indicateurs clés (bénéficiaires, hectares, tonnes de
                cacao, arbres plantés).
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjetsPage

