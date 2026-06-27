import { User, Compass, BookOpen, MessageCircle, Sparkles, Target, FileBadge, GraduationCap, Award } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { useAuth } from "@/contexts/AuthContext";

const items = [
  { to: "/espace/jeune", label: "Tableau de bord", icon: Sparkles },
  { to: "/espace/jeune/parcours", label: "Mon parcours", icon: Target },
  { to: "/espace/jeune/passeport", label: "Passeport Avenir", icon: FileBadge },
  { to: "/espace/jeune/orientation", label: "Orientation", icon: Compass },
  { to: "/espace/jeune/mentor", label: "Mon mentor", icon: MessageCircle },
  { to: "/espace/jeune/ressources", label: "Ressources", icon: BookOpen },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Jeune = () => {
  const { user } = useAuth();
  return (
    <ProtectedRoute roles={["jeune", "admin"]}>
      <EspaceLayout title={`Bonjour ${user?.user_metadata?.first_name ?? ""} 👋`} role="Jeune" items={items}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Progression" value="42%" hint="Diagnostic en cours" />
          <StatCard label="Objectifs" value="3 / 8" hint="Cette saison" />
          <StatCard label="Compétences" value="7" hint="Acquises" />
          <StatCard label="Sessions mentor" value="2" hint="Ce mois" />
        </div>

        <Section title="Mon parcours" action={<Placeholder label="Bientôt connecté" />}>
          <ol className="space-y-3">
            {["Diagnostic initial", "Atelier découverte de soi", "Plan de progression", "Camp Lac Rose", "Restitution finale"].map((s, i) => (
              <li key={s} className="flex items-center gap-3 p-3 rounded-xl bg-section-alt">
                <span className={`h-7 w-7 rounded-full grid place-items-center text-xs font-bold ${i < 2 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/60"}`}>{i + 1}</span>
                <span className="text-sm font-medium">{s}</span>
              </li>
            ))}
          </ol>
        </Section>

        <div className="grid lg:grid-cols-2 gap-6">
          <Section title="Passeport Avenir" action={<Award className="h-4 w-4 text-secondary" />}>
            <p className="text-sm text-muted-foreground mb-3">Document numérique regroupant vos talents, votre orientation et vos compétences.</p>
            <Placeholder label="Sera généré après le diagnostic" />
          </Section>
          <Section title="Mon mentor" action={<GraduationCap className="h-4 w-4 text-primary" />}>
            <p className="text-sm text-muted-foreground mb-3">Profil, messagerie et rendez-vous avec votre mentor désigné.</p>
            <Placeholder label="Attribution en cours" />
          </Section>
        </div>
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export default Jeune;