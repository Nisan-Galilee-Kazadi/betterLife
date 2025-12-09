import { useEffect, useState } from 'react'
import { NavLink, Routes, Route, Link, useLocation } from 'react-router-dom'
import logoOfficial from './images/cropped-Logo-betterlife-officiel.png'
import logoWhite from './images/Logo-betterlife-officiel-Blanc-300x300.png'

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

function Shell({ children }) {
  const [showTopBar, setShowTopBar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current < 10) {
        setShowTopBar(true)
        setMobileOpen(false)
      } else if (current > lastScrollY + 4) {
        setShowTopBar(false)
      } else if (current < lastScrollY - 4) {
        setShowTopBar(true)
      }
      setLastScrollY(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const handler = () => setIsDesktop(media.matches)
    handler()
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileOpen(false)
  }, [location.pathname])

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/domaines', label: 'Domaines d’action' },
    { to: '/projets', label: 'Projets' },
    { to: '/rejoindre', label: 'Rejoindre' },
    { to: '/blog', label: 'Actualités' },
    { to: '/contact', label: 'Contact' },
  ]

  const headerHeight = isDesktop ? (showTopBar ? 88 : 68) : 64

  return (
    <div className="bg-slate-50 text-slate-900">
      {isDesktop && (
        <div
          className={`fixed top-0 z-30 w-full transition-transform duration-200 ${
            showTopBar ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ backgroundColor: '#0f70b7' }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-sm text-white">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold">+225 00 00 00 00</span>
              <span className="hidden h-3 w-px bg-white/50 sm:block" />
              <span className="font-semibold">contact@betterlife.ci</span>
            </div>
            <div className="text-xs text-white/80">Disponible du lundi au vendredi</div>
          </div>
        </div>
      )}

      <header
        className="sticky z-20 border-b border-slate-200 bg-white/90 backdrop-blur transition-all duration-200"
        style={{ top: isDesktop && showTopBar ? 32 : 0 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoOfficial} alt="Better Life" className="h-12 w-auto" />
          </Link>
          <nav className="hidden flex-wrap items-center gap-2 text-sm md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    'nav-link rounded-lg px-3 py-1.5 font-semibold transition',
                    isActive
                      ? 'bg-sky-50 text-slate-900 is-active'
                      : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
              style={{ backgroundColor: '#63b32e' }}
            >
              Faire un don
            </Link>
            <button
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 text-slate-800 shadow-sm transition hover:bg-slate-100 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Ouvrir le menu"
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-2">
                <span className="block h-0.5 w-7 bg-slate-800" />
                <span className="block h-0.5 w-7 bg-slate-800" />
                <span className="block h-0.5 w-7 bg-slate-800" />
              </div>
            </button>
          </div>
        </div>
        <div
          className={`md:hidden overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur transition-all duration-200 ${
            mobileOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    'nav-link rounded-lg px-3 py-2 font-semibold transition',
                    isActive
                      ? 'bg-sky-50 text-slate-900 is-active'
                      : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
              style={{ backgroundColor: '#63b32e' }}
            >
              Faire un don
            </Link>
          </div>
        </div>
      </header>
      <div style={{ paddingTop: headerHeight }} className="transition-[padding-top] duration-200">
        {children}
      </div>
      <footer className="border-t border-slate-200" style={{ backgroundColor: '#0f70b7' }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 text-sm text-white md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={logoWhite} alt="Better Life" className="h-12 w-auto" />
              <span className="font-semibold">Better Life</span>
            </div>
            <p className="text-white/80">
              Construire un impact durable : cacao responsable, reboisement, projets communautaires.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Liens rapides</p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-white">
                Accueil
              </Link>
              <Link to="/domaines" className="hover:text-white">
                Domaines d’action
              </Link>
              <Link to="/projets" className="hover:text-white">
                Projets
              </Link>
              <Link to="/blog" className="hover:text-white">
                Actualités
              </Link>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Domaines</p>
            <div className="flex flex-col gap-2">
              <span>Culture de Cacaoyer</span>
              <span>Reboisement & Environnement</span>
              <span>Crédit Carbone</span>
              <span>Projets Communautaires</span>
              <span>Contrats de Préachat</span>
              <span>Équipements Agricoles</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Newsletter</p>
            <p className="text-white/80">Recevez nos actualités et opportunités.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="email@exemple.com"
                className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 outline-none focus:border-white focus:bg-white/15"
              />
              <button
                className="w-full rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-90"
                style={{ backgroundColor: '#63b32e' }}
              >
                S’inscrire
              </button>
            </div>
            <div className="text-white/80">
              <div>Tél : +225 00 00 00 00</div>
              <div>Email : contact@betterlife.ci</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 bg-black/10">
          <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-white/70">
            © {new Date().getFullYear()} Better Life — Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}

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
              Ensemble, nous développons des filières cacao responsables, protégeons les forêts et
              renforçons les projets communautaires pour un impact durable.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                to="/contact"
              >
                Nous contacter
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-sky-200 hover:text-sky-700"
                to="/domaines"
              >
                Découvrir nos actions
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="space-y-4">
              <SectionTitle kicker="Vision, Mission, Valeurs" title="Notre cap">
                Nous croyons en une agriculture régénérative, un cacao traçable et des communautés autonomes.
                Chaque action est guidée par la transparence, l’impact social et le respect de l’environnement.
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
                Résumé du projet, localisation, partenaires et indicateurs clés (bénéficiaires, hectares, tonnes
                de cacao, arbres plantés).
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RejoindrePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <SectionTitle kicker="Rejoindre le mouvement" title="3 portes d’entrée" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {joinCards.map((card) => (
          <div
            key={card.title}
            className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-lg font-semibold text-slate-900">{card.title}</p>
            <p className="mt-2 flex-1 text-sm text-slate-600">{card.desc}</p>
            <button className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-700">
              En savoir plus
            </button>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Pour les producteurs</p>
          <p className="mt-2 text-sm text-slate-600">
            Coaching, intrants, équipements partagés, primes qualité et traçabilité.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Pour les partenaires</p>
          <p className="mt-2 text-sm text-slate-600">
            Co-création de programmes carbone, reboisement, filières durables et reporting ESG.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Pour les bénévoles / stagiaires</p>
          <p className="mt-2 text-sm text-slate-600">
            Support terrain, communication, data, cartographie, animation de formations.
          </p>
        </div>
      </div>
    </div>
  )
}

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

function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
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
    </div>
  )
}

function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<AccueilPage />} />
        <Route path="/domaines" element={<DomainesPage />} />
        <Route path="/projets" element={<ProjetsPage />} />
        <Route path="/rejoindre" element={<RejoindrePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Shell>
  )
}

export default App
