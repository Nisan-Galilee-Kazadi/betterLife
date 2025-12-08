function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
              BetterLife
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Tailwind est prêt, le reste t&apos;appartient
            </h1>
            <p className="text-lg text-slate-600">
              Remplace cette section par ta page d’accueil. Ajoute librement tes
              composants, sections et CTA en t’appuyant sur les classes
              utilitaires Tailwind.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">
                  Points de départ
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>• Crée tes sections dans `src/App.jsx`</li>
                  <li>• Ajoute tes styles globaux dans `src/index.css`</li>
                  <li>• Les assets statiques vont dans `public/`</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">
                  Ressources rapides
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>
                    <a
                      className="text-sky-600 hover:text-sky-700"
                      href="https://tailwindcss.com/docs/utility-first"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Guide Tailwind
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sky-600 hover:text-sky-700"
                      href="https://vitejs.dev/guide/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Guide Vite
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
