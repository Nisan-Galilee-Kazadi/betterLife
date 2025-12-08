import SectionTitle from '../components/SectionTitle.jsx'
import { services } from '../data/content.js'

function DomainesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <SectionTitle kicker="Nos domaines d’action" title="6 leviers d’impact" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item) => (
          <div
            key={item.title}
            className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-lg font-semibold text-slate-900">{item.title}</p>
            <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Programmes phares</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Parcelles pilotes agroforestières</li>
            <li>• Formations bonnes pratiques agricoles</li>
            <li>• Restauration de sols et haies vives</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Impact attendu</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Augmenter les rendements et les revenus</li>
            <li>• Stocker du carbone via reboisement</li>
            <li>• Réduire la déforestation locale</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DomainesPage

