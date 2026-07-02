import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AppRole = "jeune" | "parent" | "mentor" | "formateur" | "admin";

interface UtilisateurInfo {
  email: string;
  prenom: string;
  nom: string;
  role: AppRole;
}

interface AuthCtx {
  user: UtilisateurInfo | null;
  roles: AppRole[];
  loading: boolean;
  signOut: () => void;
  refreshRoles: () => Promise<void>;
}

const API_BASE_URL = "http://localhost:8082/api";
const Ctx = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UtilisateurInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const chargerProfil = async () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/utilisateurs/moi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Token invalide");
      const data = await res.json();
      setUser(data);
    } catch {
      localStorage.removeItem("user_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargerProfil();
  }, []);

  const refreshRoles = async () => {
    await chargerProfil();
  };

  const signOut = () => {
    localStorage.removeItem("user_token");
    setUser(null);
  };

  const roles: AppRole[] = user ? [user.role] : [];

  return (
    <Ctx.Provider value={{ user, roles, loading, signOut, refreshRoles }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
};

export const defaultDashboardPath = (roles: AppRole[]): string => {
  if (roles.includes("admin")) return "/espace/admin";
  if (roles.includes("formateur")) return "/espace/formateur";
  if (roles.includes("mentor")) return "/espace/mentor";
  if (roles.includes("parent")) return "/espace/parent";
  return "/espace/jeune";
};
