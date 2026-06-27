import { User, GraduationCap, Users, BookOpen, Calendar } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";

const items = [
  { to: "/espace/formateur", label: "Tableau de bord", icon: GraduationCap },
  { to: "/espace/formateur/cohortes", label: "Cohortes", icon: Users },
  { to: "/espace/formateur/modules", label: "Modules", icon: BookOpen },
  { to: "/espace/formateur/agenda", label: "Agenda", icon: Calendar },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Formateur = () => (
  <ProtectedRoute roles={["formateur", "admin"]}>
    <EspaceLayout title="Espace Formateur" role="Formateur" items={items}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Cohortes actives" value="0" />
        <StatCard label="Apprenants" value="0" />
        <StatCard label="Modules" value="0" />
        <StatCard label="Évaluations" value="0" />
      </div>
      <Section title="Mes modules"><Placeholder label="Bientôt disponible" /></Section>
      <Section title="Mes cohortes"><Placeholder label="Bientôt disponible" /></Section>
    </EspaceLayout>
  </ProtectedRoute>
);

export default Formateur;