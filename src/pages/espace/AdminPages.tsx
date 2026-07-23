import { BarChart3, Users, FileText, Megaphone, Library, Calendar, ShieldCheck, User, Newspaper, Image as ImageIcon, Mail } from "lucide-react";

export const adminNavItems = [
  { to: "/espace/admin", label: "Vue d'ensemble", icon: BarChart3 },
  { to: "/espace/admin/utilisateurs", label: "Utilisateurs", icon: Users },
  { to: "/espace/admin/candidatures", label: "Candidatures", icon: FileText },
  { to: "/espace/admin/programmes", label: "Programmes", icon: Megaphone },
  { to: "/espace/admin/articles", label: "Articles", icon: Newspaper },
  { to: "/espace/admin/ressources", label: "Ressources", icon: Library },
  { to: "/espace/admin/evenements", label: "Événements", icon: Calendar },
  { to: "/espace/admin/images", label: "Images du site", icon: ImageIcon },
  { to: "/espace/admin/contact", label: "Messages contact", icon: Mail },
  { to: "/espace/admin/securite", label: "Rôles & sécurité", icon: ShieldCheck },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];
