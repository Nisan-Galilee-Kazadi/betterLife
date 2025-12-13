import { Routes, Route, useLocation } from "react-router-dom";
import { Shell } from "./components/Shell";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Rejoindre } from "./pages/Rejoindre";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Donation } from "./pages/Donation";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { LanguageProvider } from "./contexts/LanguageContext";

// About Pages
import { Mission } from "./pages/about/Mission";
import { Team } from "./pages/about/Team";
import { Partners } from "./pages/about/Partners";

// Services Pages
import { ServiceAgriculture } from "./pages/services/Agriculture";
import { ServiceReboisement } from "./pages/services/Reboisement";
import { ServiceBiodiversite } from "./pages/services/Biodiversite";
import { ServiceCommunautaire } from "./pages/services/Communautaire";
import { ServiceElevage } from "./pages/services/Elevage";

// Offres and Projets removed

// Blog Pages
import { BlogNews } from "./pages/blog/News";
import { BlogGallery } from "./pages/blog/Gallery";

function App() {
  const location = useLocation();

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
          <Route
            path="/Services/agriculture"
            element={<ServiceAgriculture />}
          />
          <Route
            path="/Services/reboisement"
            element={<ServiceReboisement />}
          />
          <Route
            path="/Services/biodiversite"
            element={<ServiceBiodiversite />}
          />
          <Route
            path="/Services/communautaire"
            element={<ServiceCommunautaire />}
          />
          <Route path="/Services/elevage" element={<ServiceElevage />} />

          {/* Offres and Projets removed */}

          {/* Media/Blog Submenus */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/news" element={<BlogNews />} />
          <Route path="/blog/gallery" element={<BlogGallery />} />

          <Route path="/rejoindre" element={<Rejoindre />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Shell>
    </LanguageProvider>
  );
}

export default App;
