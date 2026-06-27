import { User, Users, FileText, Library, Calendar, BarChart3, ShieldCheck, Megaphone } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";

const items = [
  { to: "/espace/admin", label: "Vue d'ensemble", icon: BarChart3 },
  { to: "/espace/admin/utilisateurs", label: "Utilisateurs", icon: Users },
  { to: "/espace/admin/candidatures", label: "Candidatures", icon: FileText },
  { to: "/espace/admin/programmes", label: "Programmes", icon: Megaphone },
  { to: "/espace/admin/ressources", label: "Ressources", icon: Library },
  { to: "/espace/admin/evenements", label: "Événements", icon: Calendar },
  { to: "/espace/admin/securite", label: "Rôles & sécurité", icon: ShieldCheck },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Admin = () => (
  <ProtectedRoute roles={["admin"]}>
    <EspaceLayout title="Tableau de bord administrateur" role="Admin" items={items}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Utilisateurs" value="—" hint="Tous rôles" />
        <StatCard label="Candidatures" value="—" hint="À traiter" />
        <StatCard label="Mentors actifs" value="—" />
        <StatCard label="Ressources" value="—" />
      </div>
      <Section title="Statistiques en temps réel">
        <Placeholder label="Tableau analytique à venir" />
      </Section>
      <Section title="Activité récente">
        <Placeholder label="Journal d'activité à connecter" />
      </Section>
    </EspaceLayout>
  </ProtectedRoute>
);

export default Admin;