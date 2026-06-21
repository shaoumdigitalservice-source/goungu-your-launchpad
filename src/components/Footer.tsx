import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="bg-ink py-20">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h3 className="text-2xl font-display font-semibold mb-3">GOUNGUÉ <span className="opacity-60 text-sm font-sans align-middle">Incub</span></h3>
          <p className="text-sm opacity-80 leading-relaxed max-w-xs">
            Révéler le potentiel des jeunes. Renforcer les familles.
            Construire l'avenir d'un Sénégal solidaire.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Réseau social" className="h-9 w-9 rounded-full border border-white/20 grid place-items-center hover:bg-white/10 transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-70">Plateforme</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/" className="hover:opacity-100 transition-opacity">Accueil</Link>
            <Link to="/a-propos" className="hover:opacity-100 transition-opacity">À propos</Link>
            <Link to="/programmes" className="hover:opacity-100 transition-opacity">Programmes</Link>
            <Link to="/foyer" className="hover:opacity-100 transition-opacity">Foyer Goungué</Link>
            <Link to="/ambassadeurs" className="hover:opacity-100 transition-opacity">Ambassadeurs</Link>
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-70">Ressources</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/orientation" className="hover:opacity-100 transition-opacity">Orientation</Link>
            <Link to="/ressources" className="hover:opacity-100 transition-opacity">Bibliothèque</Link>
            <Link to="/communaute" className="hover:opacity-100 transition-opacity">Communauté</Link>
            <Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link>
            <Link to="/inscription" className="hover:opacity-100 transition-opacity">Candidater</Link>
          </div>
        </div>
        <div className="md:col-span-4">
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-70">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-90">
            <a href="mailto:Incubgoungue@gmail.com" className="flex items-center gap-2 hover:opacity-100">
              <Mail className="h-4 w-4" /> Incubgoungue@gmail.com
            </a>
            <a href="tel:+221778641096" className="flex items-center gap-2 hover:opacity-100">
              <Phone className="h-4 w-4" /> 77 864 10 96
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Parcelles Assainies, Unité 13 — Dakar
            </span>
            <a
              href="https://wa.me/221778641096"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-100"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-3 justify-between items-center text-xs opacity-60">
        <span>© {new Date().getFullYear()} GOUNGUÉ Incub. Tous droits réservés.</span>
        <span>Inspire · Guide · Réussis — Sénégal</span>
      </div>
    </div>
  </footer>
);

export default Footer;
