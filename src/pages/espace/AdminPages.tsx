import { BarChart3, Users, FileText, Megaphone, Library, Calendar, ShieldCheck, User } from "lucide-react";
import ComingSoon from "./ComingSoon";

export const adminNavItems = [
  { to: "/espace/admin", label: "Vue d'ensemble", icon: BarChart3 },
  { to: "/espace/admin/utilisateurs", label: "Utilisateurs", icon: Users },
  { to: "/espace/admin/candidatures", label: "Candidatures", icon: FileText },
  { to: "/espace/admin/programmes", label: "Programmes", icon: Megaphone },
  { to: "/espace/admin/ressources", label: "Ressources", icon: Library },
  { to: "/espace/admin/evenements", label: "Événements", icon: Calendar },
  { to: "/espace/admin/securite", label: "Rôles & sécurité", icon: ShieldCheck },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

export const AdminUtilisateurs = () => <ComingSoon title="Utilisateurs" role="Admin" roles={["admin"]} items={adminNavItems} pageLabel="Utilisateurs" />;
export const AdminCandidatures = () => <ComingSoon title="Candidatures" role="Admin" roles={["admin"]} items={adminNavItems} pageLabel="Candidatures" />;
export const AdminProgrammesEspace = () => <ComingSoon title="Programmes" role="Admin" roles={["admin"]} items={adminNavItems} pageLabel="Programmes" />;
export const AdminRessources = () => <ComingSoon title="Ressources" role="Admin" roles={["admin"]} items={adminNavItems} pageLabel="Ressources" />;
export const AdminEvenements = () => <ComingSoon title="Événements" role="Admin" roles={["admin"]} items={adminNavItems} pageLabel="Événements" />;
export const AdminSecurite = () => <ComingSoon title="Rôles & sécurité" role="Admin" roles={["admin"]} items={adminNavItems} pageLabel="Rôles & sécurité" />;
