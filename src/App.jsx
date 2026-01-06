import { Routes, Route, useLocation } from "react-router-dom";
import { Shell } from "./components/Shell";
import { Home } from "./pages/Home";
import { Actions } from "./pages/Actions";
import { Rejoindre } from "./pages/Rejoindre";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Donation } from "./pages/Donation";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { Conditions } from "./pages/Conditions";
import { EmploiStage } from "./pages/EmploiStage";
import { CareerForm } from "./pages/CareerForm";
import { LanguageProvider } from "./contexts/LanguageContext";

// About Pages
import { Mission } from "./pages/about/Mission";
import { Team } from "./pages/about/Team";
import { Partners } from "./pages/about/Partners";

// Actions Pages
import { ActionsAgriculture } from "./pages/Actions/Agriculture";
import { ActionsEnvironement } from "./pages/Actions/Environement";
import { ActionsMecanisation } from "./pages/Actions/Mecanisation";
import { ActionsCommunautaire } from "./pages/Actions/Communautaire";
import { ActionsElevage } from "./pages/Actions/Elevage";

// Agriculture Sub-pages
import Cacao from "./pages/Actions/agriculture/cacao";
import Cafe from "./pages/Actions/agriculture/cafe";
import Theier from "./pages/Actions/agriculture/theier";
import CotonCaoutchouc from "./pages/Actions/agriculture/coton-caoutchouc";
import Arboriculture from "./pages/Actions/agriculture/arboriculture";
import PlantesMedicinales from "./pages/Actions/agriculture/plantes-medecinales";

// Mecanisation Sub-pages
import Tracteur from "./pages/Actions/Mecanisation/tracteur";
import Accessoires from "./pages/Actions/Mecanisation/accessoires";
import AutresMecanisation from "./pages/Actions/Mecanisation/autres";

// Elevage Sub-pages
import GrosBetail from "./pages/Actions/elevages/gros-betail";
import Apiculture from "./pages/Actions/elevages/apiculture";
import Pisciculture from "./pages/Actions/elevages/pisciculture";
import Chiens from "./pages/Actions/elevages/chiens";
import Serpents from "./pages/Actions/elevages/serpents";

// Communautaire Sub-pages
import Sante from "./pages/Actions/Communautaire/sante";
import Energie from "./pages/Actions/Communautaire/energie";
import Education from "./pages/Actions/Communautaire/education";
import RoutesDesserte from "./pages/Actions/Communautaire/routes-desserte";
import Habitation from "./pages/Actions/Communautaire/habitation";

// environement Sub-pages
import ProtectionForet from "./pages/Actions/Environement/protection-foret";
import CreditCarbone from "./pages/Actions/Environement/credit-carbone";
import EcoKelasi from "./pages/Actions/Environement/eco-kelasi";


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

          {/* Actions Submenus */}
          <Route path="/Actions" element={<Actions />} />
          <Route path="/Actions/agriculture" element={<ActionsAgriculture />} />

          {/* Agriculture Sub-pages */}
          <Route path="/Actions/agriculture/cacao" element={<Cacao />} />
          <Route path="/Actions/agriculture/cafe" element={<Cafe />} />
          <Route path="/Actions/agriculture/theier" element={<Theier />} />
          <Route path="/Actions/agriculture/coton-caoutchouc" element={<CotonCaoutchouc />} />
          <Route path="/Actions/agriculture/arboriculture" element={<Arboriculture />} />
          <Route path="/Actions/agriculture/plantes-medicinales" element={<PlantesMedicinales />} />

          <Route
            path="/Actions/Environement"
            element={<ActionsEnvironement />}
          />
          <Route path="/Actions/environement/protection-foret" element={<ProtectionForet />} />
          <Route path="/Actions/environement/credit-carbone" element={<CreditCarbone />} />
          <Route path="/Actions/environement/eco-kelasi" element={<EcoKelasi />} />

          <Route
            path="/Actions/Mecanisation"
            element={<ActionsMecanisation />}
          />
          <Route path="/Actions/mecanisation/tracteur" element={<Tracteur />} />
          <Route path="/Actions/mecanisation/accessoires" element={<Accessoires />} />
          <Route path="/Actions/mecanisation/autres" element={<AutresMecanisation />} />

          <Route
            path="/Actions/communautaire"
            element={<ActionsCommunautaire />}
          />
          <Route path="/Actions/communautaire/sante" element={<Sante />} />
          <Route path="/Actions/communautaire/energie" element={<Energie />} />
          <Route path="/Actions/communautaire/education" element={<Education />} />
          <Route path="/Actions/communautaire/routes-desserte" element={<RoutesDesserte />} />
          <Route path="/Actions/communautaire/habitation" element={<Habitation />} />

          <Route path="/Actions/elevage" element={<ActionsElevage />} />
          <Route path="/Actions/elevage/gros-betail" element={<GrosBetail />} />
          <Route path="/Actions/elevage/apiculture" element={<Apiculture />} />
          <Route path="/Actions/elevage/pisciculture" element={<Pisciculture />} />
          <Route path="/Actions/elevage/chiens" element={<Chiens />} />
          <Route path="/Actions/elevage/serpents" element={<Serpents />} />


          {/* Media/Blog Submenus */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/news" element={<BlogNews />} />
          <Route path="/blog/gallery" element={<BlogGallery />} />

          <Route path="/rejoindre" element={<Rejoindre />} />
          <Route path="/emplois-stages" element={<EmploiStage />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/emplois-stages/emploi" element={<CareerForm />} />
          <Route path="/emplois-stages/stage" element={<CareerForm />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Shell>
    </LanguageProvider>
  );
}

export default App;
