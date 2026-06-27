import { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogOut, User, Home, LayoutDashboard } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { AppRole, useAuth } from "@/contexts/AuthContext";
import logoLight from "@/assets/logo-light.jpeg";
import logoDark from "@/assets/logo-dark.jpeg";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Props {
  title: string;
  role: AppRole | string;
  items: NavItem[];
  children: ReactNode;
}

const EspaceLayout = ({ title, role, items, children }: Props) => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const logo = theme === "alt" ? logoDark : logoLight;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-section-alt">
      <aside className="lg:w-64 lg:min-h-screen border-r bg-background lg:sticky lg:top-0 flex lg:flex-col">
        <div className="flex items-center justify-between lg:justify-start gap-2.5 p-4 border-b">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="GOUNGUÉ" className="h-9 w-9 rounded-full object-cover ring-1 ring-border" />
            <div className="leading-tight">
              <div className="text-sm font-display font-semibold">GOUNGUÉ</div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground">{role}</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 flex lg:flex-col gap-1 overflow-x-auto">
          {items.map((it) => {
            const active = location.pathname === it.to;
            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t hidden lg:block">
          <div className="px-3 py-2 mb-2">
            <div className="text-xs text-muted-foreground">Connecté en tant que</div>
            <div className="text-sm font-medium truncate">{user?.email}</div>
          </div>
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-foreground/70 hover:bg-muted">
            <Home className="h-4 w-4" /> Retour au site
          </Link>
          <button onClick={signOut} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-10 max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Espace {role}</div>
            <h1 className="font-display text-2xl lg:text-3xl">{title}</h1>
          </div>
          <button onClick={signOut} className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-destructive border border-destructive/30">
            <LogOut className="h-3.5 w-3.5" /> Sortir
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default EspaceLayout;

export const StatCard = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="bg-background border rounded-2xl p-5">
    <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className="font-display text-3xl mt-1.5">{value}</div>
    {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
  </div>
);

export const Section = ({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) => (
  <section className="bg-background border rounded-2xl p-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-display text-lg">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);