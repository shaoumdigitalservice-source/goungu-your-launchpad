import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Programme from "./pages/Programme";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import NotFound from "./pages/NotFound";
import ProgrammesIndex from "./pages/programmes/ProgrammesIndex";
import CampLacRose from "./pages/programmes/CampLacRose";
import Parentalite from "./pages/programmes/Parentalite";
import AccompagnementFamilial from "./pages/programmes/AccompagnementFamilial";
import DefaratSunuNekkin from "./pages/programmes/DefaratSunuNekkin";
import KeparGi from "./pages/programmes/KeparGi";
import MenilWarWi from "./pages/programmes/MenilWarWi";
import IncubateurGoungue from "./pages/programmes/IncubateurGoungue";
import Orientation from "./pages/Orientation";
import Ressources from "./pages/Ressources";
import Evenements from "./pages/Evenements";
import Ambassadeurs from "./pages/Ambassadeurs";
import Communaute from "./pages/Communaute";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import MotDePasseOublie from "./pages/MotDePasseOublie";
import ReinitialiserMotDePasse from "./pages/ReinitialiserMotDePasse";
import Jeune from "./pages/espace/Jeune";
import Parent from "./pages/espace/Parent";
import Mentor from "./pages/espace/Mentor";
import Formateur from "./pages/espace/Formateur";
import Admin from "./pages/espace/Admin";
import Profil from "./pages/espace/Profil";
import { JeuneParcours, JeunePasseport, JeuneOrientation, JeuneMentor, JeuneRessources } from "./pages/espace/JeuneParcours";
import { JeuneRendezVous } from "./pages/espace/JeuneRendezVous";
import { ParentSuivi, ParentParentalite, ParentDocuments, ParentRdv } from "./pages/espace/ParentPages";
import { MentorJeunes, MentorAgenda, MentorMessages } from "./pages/espace/MentorPages";
import { FormateurCohortes, FormateurModules, FormateurAgenda } from "./pages/espace/FormateurPages";
import AdminUtilisateursReel from "./pages/espace/admin/AdminUtilisateurs";
import AdminCandidaturesReel from "./pages/espace/admin/AdminCandidatures";
import AdminProgrammesReel from "./pages/espace/admin/AdminProgrammes";
import AdminRessourcesReel from "./pages/espace/admin/AdminRessources";
import AdminEvenementsReel from "./pages/espace/admin/AdminEvenements";
import AdminSecuriteReel from "./pages/espace/admin/AdminSecurite";
import AdminArticlesReel from "./pages/espace/admin/AdminArticles";
import AdminImagesReel from "./pages/espace/admin/AdminImagesSite";
import AdminContactReel from "./pages/espace/admin/AdminContact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/programmes" element={<ProgrammesIndex />} />
            <Route path="/programmes/camp-lac-rose" element={<CampLacRose />} />
            <Route path="/programmes/parentalite-positive" element={<Parentalite />} />
            <Route path="/programmes/accompagnement-familial" element={<AccompagnementFamilial />} />
            <Route path="/programmes/defarat-sunu-nekkin" element={<DefaratSunuNekkin />} />
            <Route path="/programmes/kepar-gi" element={<KeparGi />} />
            <Route path="/programmes/menil-war-wi" element={<MenilWarWi />} />
            <Route path="/programmes/incubateur-goungue" element={<IncubateurGoungue />} />
            {/* Legacy alias */}
            <Route path="/foyer" element={<KeparGi />} />
            <Route path="/orientation" element={<Orientation />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/ambassadeurs" element={<Ambassadeurs />} />
            <Route path="/communaute" element={<Communaute />} />
            <Route path="/blog" element={<Blog />} />
            {/* Legacy aliases */}
            <Route path="/services" element={<Services />} />
            <Route path="/programme" element={<Programme />} />
            <Route path="/temoignages" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription" element={<Inscription />} />
            {/* Auth & espaces */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
            <Route path="/reinitialiser-mot-de-passe" element={<ReinitialiserMotDePasse />} />
            <Route path="/espace/jeune" element={<Jeune />} />
            <Route path="/espace/parent" element={<Parent />} />
            <Route path="/espace/mentor" element={<Mentor />} />
            <Route path="/espace/formateur" element={<Formateur />} />
            <Route path="/espace/admin" element={<Admin />} />
            <Route path="/espace/profil" element={<Profil />} />
            <Route path="/espace/jeune/parcours" element={<JeuneParcours />} />
            <Route path="/espace/jeune/passeport" element={<JeunePasseport />} />
            <Route path="/espace/jeune/orientation" element={<JeuneOrientation />} />
            <Route path="/espace/jeune/mentor" element={<JeuneMentor />} />
            <Route path="/espace/jeune/rdv" element={<JeuneRendezVous />} />
            <Route path="/espace/jeune/ressources" element={<JeuneRessources />} />
            <Route path="/espace/parent/suivi" element={<ParentSuivi />} />
            <Route path="/espace/parent/parentalite" element={<ParentParentalite />} />
            <Route path="/espace/parent/documents" element={<ParentDocuments />} />
            <Route path="/espace/parent/rdv" element={<ParentRdv />} />
            <Route path="/espace/mentor/jeunes" element={<MentorJeunes />} />
            <Route path="/espace/mentor/agenda" element={<MentorAgenda />} />
            <Route path="/espace/mentor/messages" element={<MentorMessages />} />
            <Route path="/espace/formateur/cohortes" element={<FormateurCohortes />} />
            <Route path="/espace/formateur/modules" element={<FormateurModules />} />
            <Route path="/espace/formateur/agenda" element={<FormateurAgenda />} />
            <Route path="/espace/admin/utilisateurs" element={<AdminUtilisateursReel />} />
            <Route path="/espace/admin/candidatures" element={<AdminCandidaturesReel />} />
            <Route path="/espace/admin/programmes" element={<AdminProgrammesReel />} />
            <Route path="/espace/admin/ressources" element={<AdminRessourcesReel />} />
            <Route path="/espace/admin/evenements" element={<AdminEvenementsReel />} />
            <Route path="/espace/admin/securite" element={<AdminSecuriteReel />} />
            <Route path="/espace/admin/articles" element={<AdminArticlesReel />} />
            <Route path="/espace/admin/images" element={<AdminImagesReel />} />
            <Route path="/espace/admin/contact" element={<AdminContactReel />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
