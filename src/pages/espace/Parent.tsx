import { User, BookOpen, Calendar, HeartHandshake, Users, FileText } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";

const items = [
  { to: "/espace/parent", label: "Tableau de bord", icon: HeartHandshake },
  { to: "/espace/parent/suivi", label: "Suivi du jeune", icon: Users },
  { to: "/espace/parent/parentalite", label: "Parentalité positive", icon: BookOpen },
  { to: "/espace/parent/documents", label: "Documents", icon: FileText },
  { to: "/espace/parent/rdv", label: "Rendez-vous", icon: Calendar },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Parent = () => (
  <ProtectedRoute roles={["parent", "admin"]}>
    <EspaceLayout title="Tableau de bord parental" role="Parent" items={items}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Jeunes suivis" value="1" />
        <StatCard label="Progression moyenne" value="58%" />
        <StatCard label="Modules complétés" value="2 / 6" />
        <StatCard label="RDV planifiés" value="1" />
      </div>

      <Section title="Suivi du jeune" action={<Placeholder label="Bientôt connecté" />}>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-section-alt">
            <div className="text-xs text-muted-foreground">Activités réalisées</div>
            <div className="font-display text-2xl mt-1">7</div>
          </div>
          <div className="p-4 rounded-xl bg-section-alt">
            <div className="text-xs text-muted-foreground">Dernière évaluation</div>
            <div className="font-display text-2xl mt-1">B+</div>
          </div>
        </div>
      </Section>

      <Section title="Modules Parentalité Positive">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {["Comprendre l'adolescence", "Communication familiale", "Discipline positive", "Réseaux sociaux", "Orientation", "Prévention des risques"].map((m) => (
            <div key={m} className="p-4 rounded-xl border bg-background">
              <BookOpen className="h-4 w-4 text-primary mb-2" />
              <div className="text-sm font-semibold">{m}</div>
              <div className="text-xs text-muted-foreground mt-1">6 chapitres</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Prochains rendez-vous">
        <Placeholder label="Réservation bientôt disponible" />
      </Section>
    </EspaceLayout>
  </ProtectedRoute>
);

export default Parent;