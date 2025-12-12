import { Routes, Route, useLocation } from 'react-router-dom'
import { Shell } from './components/Shell'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { Offres } from './pages/Offres'
import { Projets } from './pages/Projets'
import { Rejoindre } from './pages/Rejoindre'
import { Blog } from './pages/Blog'
import { Contact } from './pages/Contact'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { LanguageProvider } from './contexts/LanguageContext'

// About Pages
import { Mission } from './pages/about/Mission'
import { Team } from './pages/about/Team'
import { Partners } from './pages/about/Partners'

// Services Pages
import { ServiceAgriculture } from './pages/services/Agriculture'
import { ServiceReboisement } from './pages/services/Reboisement'
import { ServiceBiodiversite } from './pages/services/Biodiversite'
import { ServiceCommunautaire } from './pages/services/Communautaire'
import { ServiceElevage } from './pages/services/Elevage'

// Offres Pages
import { OffreAgriculture } from './pages/offres/Agriculture'
import { OffreApiculture } from './pages/offres/Apiculture'
import { OffreBancal } from './pages/offres/Bancal'
import { OffreChangement } from './pages/offres/Changement'

// Projets Pages
import { ProjetsEnCours } from './pages/projets/EnCours'
import { Phase1 } from './pages/projets/Phase1'
import { Phase2 } from './pages/projets/Phase2'
import { ProjetsRealises } from './pages/projets/Realises'

// Blog Pages
import { BlogNews } from './pages/blog/News'
import { BlogGallery } from './pages/blog/Gallery'

function App() {
  const location = useLocation()

  return (
    <LanguageProvider>
      <Shell key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* About Submenus */}
          <Route path="/about" element={<Mission />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/partners" element={<Partners />} />

          {/* Services Submenus */}
          <Route path="/Services" element={<Services />} />
          <Route path="/Services/agriculture" element={<ServiceAgriculture />} />
          <Route path="/Services/reboisement" element={<ServiceReboisement />} />
          <Route path="/Services/biodiversite" element={<ServiceBiodiversite />} />
          <Route path="/Services/communautaire" element={<ServiceCommunautaire />} />
          <Route path="/Services/elevage" element={<ServiceElevage />} />

          {/* Offres Submenus */}
          <Route path="/Offres" element={<Offres />} />
          <Route path="/Offres/agriculture" element={<OffreAgriculture />} />
          <Route path="/Offres/apiculture" element={<OffreApiculture />} />
          <Route path="/Offres/bancal" element={<OffreBancal />} />
          <Route path="/Offres/changement" element={<OffreChangement />} />

          {/* Projets Submenus */}
          <Route path="/projets" element={<Projets />} />
          <Route path="/projets/en-cours" element={<ProjetsEnCours />} />
          {/* Level 3 Projets */}
          <Route path="/projets/en-cours/phase1" element={<Phase1 />} />
          <Route path="/projets/en-cours/phase2" element={<Phase2 />} />

          <Route path="/projets/realises" element={<ProjetsRealises />} />

          {/* Media/Blog Submenus */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/news" element={<BlogNews />} />
          <Route path="/blog/gallery" element={<BlogGallery />} />

          <Route path="/rejoindre" element={<Rejoindre />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Shell>
    </LanguageProvider>
  )
}

export default App
