import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import logoLight from "@/assets/logo-light.jpeg";
import logoDark from "@/assets/logo-dark.jpeg";

const navLinks = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Services", path: "/services" },
  { label: "Programme", path: "/programme" },
  { label: "Témoignages", path: "/temoignages" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const logo = theme === "alt" ? logoDark : logoLight;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="GOUNGUÉ" className="h-10 w-10 rounded-full object-cover" />
          <span className="text-xl font-bold tracking-tight text-foreground">GOUNGUÉ</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
            aria-label="Changer de thème"
          >
            <Palette className="h-5 w-5 text-foreground" />
          </button>

          <Link
            to="/inscription"
            className="hidden lg:inline-flex px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            S'inscrire
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-t px-4 pb-4 animate-fade-up">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                location.pathname === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/inscription"
            onClick={() => setIsOpen(false)}
            className="block mt-2 text-center px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
          >
            S'inscrire
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
