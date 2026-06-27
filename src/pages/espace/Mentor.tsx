import { User, Users, Calendar, ClipboardList, MessageSquare } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";

const items = [
  { to: "/espace/mentor", label: "Tableau de bord", icon: ClipboardList },
  { to: "/espace/mentor/jeunes", label: "Mes jeunes", icon: Users },
  { to: "/espace/mentor/agenda", label: "Agenda", icon: Calendar },
  { to: "/espace/mentor/messages", label: "Messagerie", icon: MessageSquare },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Mentor = () => (
  <ProtectedRoute roles={["mentor", "admin"]}>
    <EspaceLayout title="Espace Mentor" role="Mentor" items={items}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Jeunes suivis" value="0" />
        <StatCard label="Sessions ce mois" value="0" />
        <StatCard label="Notes en attente" value="0" />
        <StatCard label="Ateliers à venir" value="0" />
      </div>

      <Section title="Mes jeunes" action={<Placeholder label="Affectation à venir" />}>
        <div className="text-sm text-muted-foreground">Aucun jeune ne vous est encore assigné. Les attributions seront effectuées par l'équipe Goungué après votre validation.</div>
      </Section>

      <Section title="Agenda">
        <Placeholder label="Calendrier intelligent en préparation" />
      </Section>
    </EspaceLayout>
  </ProtectedRoute>
);

export default Mentor;