import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiFetch } from "@/lib/apiFetch";

export type AppRole = "jeune" | "parent" | "mentor" | "formateur" | "admin";

interface UtilisateurInfo {
  email: string;
  prenom: string;
  nom: string;
  role: AppRole;
  telephone?: string;
  ville?: string;
  dateNaissance?: string;
  bio?: string;
}

interface AuthCtx {
  user: UtilisateurInfo | null;
  roles: AppRole[];
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UtilisateurInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Le token vit dans un cookie httpOnly envoyé automatiquement par le navigateur
  // (apiFetch -> credentials: "include") : il n'y a plus rien à lire en JS ici,
  // on tente juste l'appel et un 401 signifie "pas connecté".
  const chargerProfil = async () => {
    try {
      const res = await apiFetch("/utilisateurs/moi");
      if (!res.ok) throw new Error("Non authentifié");
      const data = await res.json();
      setUser(data);
    } catch {
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

  const signOut = async () => {
    try {
      await apiFetch("/session/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
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
