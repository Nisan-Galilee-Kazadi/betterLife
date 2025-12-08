import SectionTitle from '../components/SectionTitle.jsx'
import { blogItems } from '../data/content.js'

function BlogPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6 sm:py-10">
        <SectionTitle kicker="Actualités / Blog" title="Articles et annonces" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogItems.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">{item.tag}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{item.date}</p>
              <p className="mt-3 text-sm text-slate-600">
                Ajoute ici l’extrait, les médias (photo/vidéo) et le lien vers l’article complet.
              </p>
              <button className="mt-4 text-sm font-semibold text-sky-600 hover:text-sky-700">Lire l’article</button>
            </article>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Interviews & vidéos</p>
            <p className="mt-2 text-sm text-slate-600">
              Place ici les ressources média : témoignages producteurs, partenaires, coulisses terrain.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Campagnes en cours</p>
            <p className="mt-2 text-sm text-slate-600">
              Annonces d’événements, collectes de fonds, journées de reboisement, formations ouvertes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

