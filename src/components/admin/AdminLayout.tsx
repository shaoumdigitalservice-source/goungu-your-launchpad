import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, BookOpen, Users, LogOut, Menu, X, Image } from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/adminApi";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const navItems = [
  { label: "Vue d'ensemble", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Blog", path: "/admin/blog", icon: BookOpen },
  { label: "Programmes", path: "/admin/programmes", icon: FileText },
  { label: "Images", path: "/admin/images", icon: Image },
];

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r min-h-screen sticky top-0">
        <div className="p-6 border-b">
          <h2 className="font-display text-xl font-bold">GOUNGUÉ</h2>
          <p className="text-xs text-muted-foreground">Espace Administration</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Sidebar - mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">GOUNGUÉ</h2>
            <button onClick={() => setSidebarOpen(false)}><X className="h-6 w-6" /></button>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground/70"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive w-full"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-h-screen">
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;