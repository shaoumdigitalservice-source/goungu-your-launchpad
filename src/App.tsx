import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";

import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import NotFound from "./pages/NotFound";
import ProgrammesIndex from "./pages/programmes/ProgrammesIndex";
import DalaluJubbanti from "./pages/programmes/DalaluJubbanti";
import Parentalite from "./pages/programmes/Parentalite";
import AccompagnementFamilial from "./pages/programmes/AccompagnementFamilial";
import DefaratSunuNekkin from "./pages/programmes/DefaratSunuNekkin";
import KeparGi from "./pages/programmes/KeparGi";
import MenilWarWi from "./pages/programmes/MenilWarWi";
import IncubateurGoungue from "./pages/programmes/IncubateurGoungue";
import DoolelWajurYi from "./pages/programmes/DoolelWajurYi";
import SamaGoxSamaYitte from "./pages/programmes/SamaGoxSamaYitte";
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
          <ScrollToTop />
          <AuthProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/programmes" element={<ProgrammesIndex />} />
            <Route path="/programmes/dalalu-jubbanti" element={<DalaluJubbanti />} />
            <Route path="/programmes/camp-lac-rose" element={<Navigate to="/programmes/dalalu-jubbanti" replace />} />
            <Route path="/programmes/parentalite-positive" element={<Parentalite />} />
            <Route path="/programmes/accompagnement-familial" element={<AccompagnementFamilial />} />
            <Route path="/programmes/defarat-sunu-nekkin" element={<DefaratSunuNekkin />} />
            <Route path="/programmes/kepar-gi" element={<KeparGi />} />
            <Route path="/programmes/menil-war-wi" element={<MenilWarWi />} />
            <Route path="/programmes/incubateur-goungue" element={<IncubateurGoungue />} />
            <Route path="/programmes/doolel-wajur-yi" element={<DoolelWajurYi />} />
            <Route path="/programmes/sama-gox-sama-yitte" element={<SamaGoxSamaYitte />} />
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
            
            <Route path="/temoignages" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription" element={<Inscription />} />
            {/* Auth & espaces */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
            <Route path="/reinitialiser-mot-de-passe" element={<ReinitialiserMotDePasse />} />
            <Route path="/espace/jeune" element={<ProtectedRoute roles={["jeune"]}><Jeune /></ProtectedRoute>} />
            <Route path="/espace/parent" element={<ProtectedRoute roles={["parent"]}><Parent /></ProtectedRoute>} />
            <Route path="/espace/mentor" element={<ProtectedRoute roles={["mentor"]}><Mentor /></ProtectedRoute>} />
            <Route path="/espace/formateur" element={<ProtectedRoute roles={["formateur"]}><Formateur /></ProtectedRoute>} />
            <Route path="/espace/admin" element={<ProtectedRoute roles={["admin"]}><Admin /></ProtectedRoute>} />
            <Route path="/espace/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
            <Route path="/espace/jeune/parcours" element={<ProtectedRoute roles={["jeune"]}><JeuneParcours /></ProtectedRoute>} />
            <Route path="/espace/jeune/passeport" element={<ProtectedRoute roles={["jeune"]}><JeunePasseport /></ProtectedRoute>} />
            <Route path="/espace/jeune/orientation" element={<ProtectedRoute roles={["jeune"]}><JeuneOrientation /></ProtectedRoute>} />
            <Route path="/espace/jeune/mentor" element={<ProtectedRoute roles={["jeune"]}><JeuneMentor /></ProtectedRoute>} />
            <Route path="/espace/jeune/rdv" element={<ProtectedRoute roles={["jeune"]}><JeuneRendezVous /></ProtectedRoute>} />
            <Route path="/espace/jeune/ressources" element={<ProtectedRoute roles={["jeune"]}><JeuneRessources /></ProtectedRoute>} />
            <Route path="/espace/parent/suivi" element={<ProtectedRoute roles={["parent"]}><ParentSuivi /></ProtectedRoute>} />
            <Route path="/espace/parent/parentalite" element={<ProtectedRoute roles={["parent"]}><ParentParentalite /></ProtectedRoute>} />
            <Route path="/espace/parent/documents" element={<ProtectedRoute roles={["parent"]}><ParentDocuments /></ProtectedRoute>} />
            <Route path="/espace/parent/rdv" element={<ProtectedRoute roles={["parent"]}><ParentRdv /></ProtectedRoute>} />
            <Route path="/espace/mentor/jeunes" element={<ProtectedRoute roles={["mentor"]}><MentorJeunes /></ProtectedRoute>} />
            <Route path="/espace/mentor/agenda" element={<ProtectedRoute roles={["mentor"]}><MentorAgenda /></ProtectedRoute>} />
            <Route path="/espace/mentor/messages" element={<ProtectedRoute roles={["mentor"]}><MentorMessages /></ProtectedRoute>} />
            <Route path="/espace/formateur/cohortes" element={<ProtectedRoute roles={["formateur"]}><FormateurCohortes /></ProtectedRoute>} />
            <Route path="/espace/formateur/modules" element={<ProtectedRoute roles={["formateur"]}><FormateurModules /></ProtectedRoute>} />
            <Route path="/espace/formateur/agenda" element={<ProtectedRoute roles={["formateur"]}><FormateurAgenda /></ProtectedRoute>} />
            <Route path="/espace/admin/utilisateurs" element={<ProtectedRoute roles={["admin"]}><AdminUtilisateursReel /></ProtectedRoute>} />
            <Route path="/espace/admin/candidatures" element={<ProtectedRoute roles={["admin"]}><AdminCandidaturesReel /></ProtectedRoute>} />
            <Route path="/espace/admin/programmes" element={<ProtectedRoute roles={["admin"]}><AdminProgrammesReel /></ProtectedRoute>} />
            <Route path="/espace/admin/ressources" element={<ProtectedRoute roles={["admin"]}><AdminRessourcesReel /></ProtectedRoute>} />
            <Route path="/espace/admin/evenements" element={<ProtectedRoute roles={["admin"]}><AdminEvenementsReel /></ProtectedRoute>} />
            <Route path="/espace/admin/securite" element={<ProtectedRoute roles={["admin"]}><AdminSecuriteReel /></ProtectedRoute>} />
            <Route path="/espace/admin/articles" element={<ProtectedRoute roles={["admin"]}><AdminArticlesReel /></ProtectedRoute>} />
            <Route path="/espace/admin/images" element={<ProtectedRoute roles={["admin"]}><AdminImagesReel /></ProtectedRoute>} />
            <Route path="/espace/admin/contact" element={<ProtectedRoute roles={["admin"]}><AdminContactReel /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
