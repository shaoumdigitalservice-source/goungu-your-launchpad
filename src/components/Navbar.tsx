import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Palette, ChevronDown, LogIn, LayoutDashboard, LogOut, User } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth, defaultDashboardPath } from "@/contexts/AuthContext";
import logoLight from "@/assets/logo-light.jpeg";
import logoDark from "@/assets/logo-dark.jpeg";

const navLinks: { label: string; path?: string; children?: { label: string; path: string; desc?: string }[] }[] = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  {
    label: "Programmes",
    children: [
      { label: "Vue d'ensemble", path: "/programmes", desc: "Nos programmes phares" },
      { label: "Defarat Sunu Nekkin", path: "/programmes/defarat-sunu-nekkin", desc: "Programme national — gouvernance familiale" },
      { label: "Kepar gi", path: "/programmes/kepar-gi", desc: "L'abri — suivi post-incubation" },
      { label: "Meñil War Wi", path: "/programmes/menil-war-wi", desc: "Résilience des entreprises" },
      { label: "Incubateur Goungué", path: "/programmes/incubateur-goungue", desc: "De l'idée à l'impact" },
    ],
  },
  {
    label: "Outils",
    children: [
      { label: "Centre d'Orientation", path: "/orientation", desc: "Fiches métiers & quiz" },
      { label: "Centre de Ressources", path: "/ressources", desc: "Bibliothèque numérique" },
      { label: "Ambassadeurs", path: "/ambassadeurs", desc: "Notre réseau au Sénégal" },
      { label: "Communauté", path: "/communaute", desc: "Événements & forums" },
      { label: "Événements", path: "/evenements", desc: "Nos prochains rendez-vous" },
    ],
  },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { user, roles, signOut } = useAuth();
  const location = useLocation();
  const logo = theme === "alt" ? logoDark : logoLight;
  const isActive = (path?: string) => path && (path === "/" ? location.pathname === "/" : location.pathname.startsWith(path));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="GOUNGUÉ" className="h-10 w-10 rounded-full object-cover ring-1 ring-border" />
          <div className="leading-tight">
            <span className="block text-base font-display font-semibold text-foreground">GOUNGUÉ</span>
            <span className="block text-[10px] tracking-[0.18em] uppercase text-muted-foreground">Incub · Sénégal</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => link.children ? (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className={`px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1 transition-colors ${
                link.children.some(c => isActive(c.path)) ? "text-primary" : "text-foreground/70 hover:text-foreground"
              }`}>
                {link.label} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openMenu === link.label && (
                <div className="absolute top-full left-0 pt-2 w-72 animate-fade-up">
                  <div className="glass rounded-2xl p-2 ring-soft">
                    {link.children.map((c) => (
                      <Link key={c.path} to={c.path} className="block px-3 py-2.5 rounded-xl hover:bg-primary/10 transition">
                        <div className="text-sm font-semibold text-foreground">{c.label}</div>
                        {c.desc && <div className="text-xs text-muted-foreground">{c.desc}</div>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.path}
              to={link.path!}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.path) ? "text-primary" : "text-foreground/70 hover:text-foreground"
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

          {user ? (
            <div className="hidden lg:flex items-center gap-1.5">
              <Link
                to={defaultDashboardPath(roles)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90"
              >
                <LayoutDashboard className="h-4 w-4" /> Mon espace
              </Link>
              <button
                onClick={signOut}
                className="p-2 rounded-full bg-muted hover:bg-destructive/10 transition-colors"
                aria-label="Déconnexion"
              >
                <LogOut className="h-4 w-4 text-foreground" />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-1.5">
              <Link
                to="/auth"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border font-medium text-sm hover:bg-muted transition-colors"
              >
                <LogIn className="h-4 w-4" /> Connexion
              </Link>
              <Link
                to="/inscription"
                className="inline-flex px-5 py-2 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-primary transition-colors"
              >
                Candidater
              </Link>
            </div>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-t px-4 pb-6 pt-2 animate-fade-up max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => link.children ? (
            <div key={link.label} className="py-2">
              <div className="px-4 pt-2 pb-1 text-[10px] tracking-widest uppercase text-muted-foreground">{link.label}</div>
              {link.children.map((c) => (
                <Link key={c.path} to={c.path} onClick={() => setIsOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-muted">
                  {c.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={link.path}
              to={link.path!}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                isActive(link.path) ? "bg-primary/10 text-primary" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to={defaultDashboardPath(roles)}
                onClick={() => setIsOpen(false)}
                className="block mt-4 text-center px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
              >
                Mon espace
              </Link>
              <button
                onClick={() => { setIsOpen(false); signOut(); }}
                className="block w-full mt-2 text-center px-5 py-3 rounded-full border text-sm"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block mt-4 text-center px-5 py-3 rounded-full border font-semibold text-sm"
              >
                Connexion / Inscription
              </Link>
              <Link
                to="/inscription"
                onClick={() => setIsOpen(false)}
                className="block mt-2 text-center px-5 py-3 rounded-full bg-foreground text-background font-semibold text-sm"
              >
                Candidater
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
