import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-4">GOUNGUÉ</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            Inspire, Guide, Réussis. Plateforme dédiée à l'orientation, la formation et l'accompagnement des jeunes et des femmes.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Navigation</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/" className="hover:opacity-100 transition-opacity">Accueil</Link>
            <Link to="/a-propos" className="hover:opacity-100 transition-opacity">À propos</Link>
            <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
            <Link to="/programme" className="hover:opacity-100 transition-opacity">Programme</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Programmes</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/services" className="hover:opacity-100 transition-opacity">Orientation</Link>
            <Link to="/services" className="hover:opacity-100 transition-opacity">Accompagnement</Link>
            <Link to="/programme" className="hover:opacity-100 transition-opacity">Incubation</Link>
            <Link to="/inscription" className="hover:opacity-100 transition-opacity">Inscription</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <a href="mailto:Incubgoungue@gmail.com" className="flex items-center gap-2 hover:opacity-100">
              <Mail className="h-4 w-4" /> Incubgoungue@gmail.com
            </a>
            <a href="tel:+221778641096" className="flex items-center gap-2 hover:opacity-100">
              <Phone className="h-4 w-4" /> 77 864 10 96
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Parcelles Assainies, Unité 13
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
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-60">
        © {new Date().getFullYear()} GOUNGUÉ. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
