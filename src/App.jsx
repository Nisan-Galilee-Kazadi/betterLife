import { Routes, Route } from 'react-router-dom'
import { Shell } from './components/Shell'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { Projets } from './pages/Projets'
import { Rejoindre } from './pages/Rejoindre'
import { Blog } from './pages/Blog'
import { Contact } from './pages/Contact'
import { PlaceholderPage } from './pages/PlaceholderPage'

function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* About Submenus */}
        <Route path="/about" element={<PlaceholderPage />} />
        <Route path="/about/mission" element={<PlaceholderPage />} />
        <Route path="/about/team" element={<PlaceholderPage />} />
        <Route path="/about/partners" element={<PlaceholderPage />} />

        {/* Services Submenus */}
        <Route path="/Services" element={<Services />} />
        <Route path="/Services/agriculture" element={<PlaceholderPage />} />
        <Route path="/Services/reboisement" element={<PlaceholderPage />} />
        <Route path="/Services/biodiversite" element={<PlaceholderPage />} />
        <Route path="/Services/communautaire" element={<PlaceholderPage />} />
        <Route path="/Services/elevage" element={<PlaceholderPage />} />

        {/* Projets Submenus */}
        <Route path="/projets" element={<Projets />} />
        <Route path="/projets/en-cours" element={<PlaceholderPage />} />
        {/* Level 3 Projets */}
        <Route path="/projets/en-cours/phase1" element={<PlaceholderPage />} />
        <Route path="/projets/en-cours/phase2" element={<PlaceholderPage />} />

        <Route path="/projets/realises" element={<PlaceholderPage />} />

        {/* Media/Blog Submenus */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/news" element={<PlaceholderPage />} />
        <Route path="/blog/gallery" element={<PlaceholderPage />} />

        <Route path="/rejoindre" element={<Rejoindre />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Shell>
  )
}

export default App
