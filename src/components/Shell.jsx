import { useEffect, useState, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube, FaPlay } from 'react-icons/fa6'
import logoOfficial from '../images/cropped-Logo-betterlife-officiel.png'
import logoWhite from '../images/Logo-betterlife-officiel-Blanc-300x300.png'

const navigation = [
    { name: 'Accueil', to: '/' },
    {
        name: 'À Propos',
        to: '/about',
        children: [
            { name: 'Mission & Vision', to: '/about/mission' },
            { name: 'Notre Équipe', to: '/about/team' },
            { name: 'Partenaires', to: '/about/partners' },
        ],
    },
    {
        name: 'Nos Domaines',
        to: '/domaines',
        children: [
            { name: 'Agriculture Durable', to: '/domaines/agriculture' },
            { name: 'Reboisement', to: '/domaines/reboisement' },
            { name: 'Biodiversité', to: '/domaines/biodiversite' },
            { name: 'Projets Communautaires', to: '/domaines/communautaire' },
        ],
    },
    {
        name: 'Projets',
        to: '/projets',
        children: [
            {
                name: 'En cours',
                to: '/projets/en-cours',
                children: [
                    { name: 'Phase 1', to: '/projets/en-cours/phase1' },
                    { name: 'Phase 2', to: '/projets/en-cours/phase2' }
                ]
            },
            { name: 'Réalisés', to: '/projets/realises' },
        ],
    },
    {
        name: 'Média',
        to: '/blog',
        children: [
            { name: 'Actualités', to: '/blog/news' },
            { name: 'Galerie', to: '/blog/gallery' },
        ],
    },
    { name: 'Contact', to: '/contact' },
]

// Recursive NavItem Component
function NavItem({ item, depth = 0, isScrolled }) {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const ref = useRef(null)

    // Close dropdown if clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])

    const hasChildren = item.children && item.children.length > 0

    // Styles based on depth and scroll
    // Depth 0: Main Nav (Horizontal)
    // Depth 1: Standard Dropdown (Vertical, below parent)
    // Depth 2+: Flyout (Vertical, right of parent)

    const isActive = location.pathname.startsWith(item.to) && (item.to !== '/' || location.pathname === '/')

    // Text Colors
    let textColorClass = ''
    if (depth === 0) {
        if (isScrolled) {
            textColorClass = isActive ? 'text-[#63b32e]' : 'text-slate-700 hover:text-[#63b32e]'
        } else {
            textColorClass = isActive ? 'text-white' : 'text-white/90 hover:text-white'
        }
    } else {
        // Dropdown items
        textColorClass = isActive ? 'text-[#63b32e]' : 'text-slate-700 hover:text-[#63b32e]'
    }

    return (
        <div className="relative group" ref={ref}>
            <div className={`flex items-center ${depth === 0 ? 'gap-1' : 'justify-between w-full'}`}>
                <Link
                    to={item.to}
                    className={`block whitespace-nowrap py-2 text-sm font-semibold transition ${textColorClass} ${depth > 0 ? 'px-4 w-full' : 'px-3 rounded-sm'}`}
                >
                    {item.name}
                </Link>

                {hasChildren && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation() // Prevent link click if nested inside
                            setIsOpen(!isOpen)
                        }}
                        className={`p-1 transition-transform ${textColorClass} ${isOpen ? 'rotate-90' : ''}`}
                    >
                        <FaPlay className={`${depth === 0 ? 'h-2 w-2' : 'h-2 w-2'}`} />
                    </button>
                )}
            </div>

            {hasChildren && isOpen && (
                <div
                    className={`absolute z-50 min-w-[200px] border border-slate-100 bg-white py-2 shadow-xl ring-1 ring-black/5 rounded-xl
            ${depth === 0
                            ? 'left-0 top-full mt-2 origin-top-left' // L1 Dropdown
                            : 'left-full top-0 ml-1 origin-top-left' // L2+ Flyout
                        }`}
                >
                    {item.children.map((child) => (
                        <NavItem key={child.name} item={child} depth={depth + 1} isScrolled={true} /> // Children always "scrolled" style (white bg)
                    ))}
                </div>
            )}
        </div>
    )
}

// Mobile recursive nav item
function MobileNavItem({ item, level = 0, setMobileOpen }) {
    const [isOpen, setIsOpen] = useState(false)
    const hasChildren = item.children && item.children.length > 0
    const location = useLocation()
    const isActive = location.pathname.startsWith(item.to)

    return (
        <div className="border-b border-gray-50 last:border-0">
            <div className="flex items-center justify-between py-3 pr-4" style={{ paddingLeft: `${level * 16 + 16}px` }}>
                <Link
                    to={item.to}
                    className={`text-base font-semibold ${isActive ? 'text-[#63b32e]' : 'text-slate-800'}`}
                    onClick={() => {
                        if (!hasChildren) setMobileOpen(false)
                    }}
                >
                    {item.name}
                </Link>
                {hasChildren && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`p-2 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    >
                        <FaPlay className="h-3 w-3" />
                    </button>
                )}
            </div>
            {hasChildren && isOpen && (
                <div className="bg-slate-50">
                    {item.children.map(child => (
                        <MobileNavItem key={child.name} item={child} level={level + 1} setMobileOpen={setMobileOpen} />
                    ))}
                </div>
            )}
        </div>
    )
}

export function Shell({ children }) {
    const [showTopBar, setShowTopBar] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [mobileOpen, setMobileOpen] = useState(false)

    const location = useLocation()
    const isHome = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY
            const scrollingDown = current > lastScrollY && current > 0

            if (isHome) {
                if (current < 20) {
                    setShowTopBar(false)
                    setIsScrolled(false)
                } else {
                    setIsScrolled(true)
                    if (scrollingDown) {
                        setShowTopBar(false)
                    } else if (current < lastScrollY - 2) {
                        setShowTopBar(true)
                    }
                }
            } else {
                setIsScrolled(true)
                if (current < 20) {
                    setShowTopBar(true)
                } else if (scrollingDown) {
                    setShowTopBar(false)
                } else if (current < lastScrollY - 2) {
                    setShowTopBar(true)
                }
            }
            setLastScrollY(current)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY, isHome])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setMobileOpen(false)
        if (location.pathname !== '/') {
            setShowTopBar(true)
            setIsScrolled(true)
        } else {
            setShowTopBar(false)
            setIsScrolled(false)
        }
    }, [location.pathname])

    const headerBgClass = isScrolled ? 'bg-white shadow-md text-slate-800' : 'bg-transparent text-white'
    const logoSrc = isScrolled ? logoOfficial : logoWhite

    return (
        <div className="flex min-h-screen flex-col font-sans">
            {/* Top Bar */}
            <div
                className={`fixed top-0 z-40 w-full transition-transform duration-300 ${showTopBar ? 'translate-y-0' : '-translate-y-full'
                    }`}
                style={{ backgroundColor: '#63b32e' }}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs text-white lg:py-2 lg:text-sm">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="font-semibold hidden sm:inline">ByPass, C/ Mon-Ngafula</span>
                        <span className="hidden h-3 w-px bg-white/50 sm:block" />
                        <span className="font-semibold">info@betterlife-ong.org</span>
                    </div>
                    <div className="text-white/90">Engagés pour un avenir durable</div>
                </div>
            </div>

            {/* Navbar */}
            <header
                className={`fixed z-30 w-full transition-all duration-300 ${headerBgClass}`}
                style={{ top: showTopBar ? 32 : 0 }}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logoSrc} alt="Better Life" className="h-[0px] w-auto transition-all duration-300 sm:h-14" />
                    </Link>

                    {/* Desktop Nav - Recursive */}
                    <nav className="hidden items-center gap-2 lg:flex">
                        {navigation.map((item) => (
                            <NavItem key={item.name} item={item} isScrolled={isScrolled} />
                        ))}
                    </nav>

                    {/* Action / Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/contact"
                            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:brightness-110 lg:block ${isScrolled
                                ? 'bg-[#63b32e] text-white'
                                : 'bg-white text-[#63b32e] hover:bg-slate-100'
                                }`}
                        >
                            Faire un don
                        </Link>

                        <button
                            className={`lg:hidden ${isScrolled ? 'text-slate-800' : 'text-white'}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <span className="sr-only">Menu</span>
                            <div className="space-y-1.5">
                                <span className="block h-0.5 w-6 bg-current" />
                                <span className="block h-0.5 w-6 bg-current" />
                                <span className="block h-0.5 w-6 bg-current" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`absolute left-0 top-full w-full overflow-hidden bg-white shadow-xl transition-all duration-300 lg:hidden ${mobileOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="flex flex-col text-slate-800">
                        {navigation.map((item) => (
                            <MobileNavItem key={item.name} item={item} setMobileOpen={setMobileOpen} />
                        ))}
                        <div className="p-4">
                            <Link
                                to="/contact"
                                onClick={() => setMobileOpen(false)}
                                className="flex w-full items-center justify-center rounded-lg bg-[#63b32e] py-3 text-center font-bold text-white shadow-sm"
                            >
                                Faire un don
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className={`flex-grow ${isHome ? '' : 'pt-24 lg:pt-28'}`}>
                {children}
            </main>

            <footer className="bg-[#0f70b7] pt-16 pb-0 text-white">
                {/* Footer content preserved */}
                <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-4">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src={logoWhite} alt="Better Life" className="h-16 w-auto" />
                        </div>
                        <p className="text-white/80 leading-relaxed max-w-xs">
                            Protection de l'Environnement, Biodiversité, et Développement Durable en République Démocratique du Congo.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com/betterlife-ong" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"><FaFacebook className="h-5 w-5" /></a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"><FaLinkedin className="h-5 w-5" /></a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"><FaTwitter className="h-5 w-5" /></a>
                            <a href="https://youtube.com/@betterlife-ong" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"><FaYoutube className="h-5 w-5" /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">Navigation</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4">Accueil</Link></li>
                            <li><Link to="/about" className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4">À Propos</Link></li>
                            <li><Link to="/domaines" className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4">Nos Domaines</Link></li>
                            <li><Link to="/projets" className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4">Projets</Link></li>
                            <li><Link to="/contact" className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">Activités</h3>
                        <ul className="space-y-3">
                            <li><Link to="/domaines/agriculture" className="hover:text-white/80">Agriculture Durable</Link></li>
                            <li><Link to="/domaines/reboisement" className="hover:text-white/80">Reboisement & Climat</Link></li>
                            <li><Link to="/domaines/biodiversite" className="hover:text-white/80">Biodiversité</Link></li>
                            <li><Link to="/domaines/communautaire" className="hover:text-white/80">Projets Communautaires</Link></li>
                            <li><Link to="/domaines/elevage" className="hover:text-white/80">Élevage Responsable</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">Nous Contacter</h3>
                        <ul className="space-y-3 text-white/80">
                            <li className="flex gap-3">
                                <span className="font-semibold text-white">Adresse:</span>
                                <span>ByPass, C/ Mon-Ngafula,<br />Kinshasa, RDC</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-semibold text-white">Email:</span>
                                <span>info@betterlife-ong.org</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-semibold text-white">Tél:</span>
                                <span>+243 00 000 0000</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 bg-black/10">
                    <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-white/60">
                        <p>© {new Date().getFullYear()} Better Life ONG. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
