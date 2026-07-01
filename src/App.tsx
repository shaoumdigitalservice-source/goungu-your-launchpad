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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminProgrammes from "./pages/admin/AdminProgrammes";
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
import Ambassadeurs from "./pages/Ambassadeurs";
import Communaute from "./pages/Communaute";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Jeune from "./pages/espace/Jeune";
import Parent from "./pages/espace/Parent";
import Mentor from "./pages/espace/Mentor";
import Formateur from "./pages/espace/Formateur";
import Admin from "./pages/espace/Admin";
import Profil from "./pages/espace/Profil";

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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/espace/jeune" element={<Jeune />} />
            <Route path="/espace/parent" element={<Parent />} />
            <Route path="/espace/mentor" element={<Mentor />} />
            <Route path="/espace/formateur" element={<Formateur />} />
            <Route path="/espace/admin" element={<Admin />} />
            <Route path="/espace/profil" element={<Profil />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/programmes" element={<AdminProgrammes />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
