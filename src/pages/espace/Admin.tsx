import { useEffect, useState } from "react";
import { User, Users, FileText, Library, Calendar, BarChart3, ShieldCheck, Megaphone } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { statsParRole } from "@/api/adminRolesApi";
import { listerCandidatures } from "@/api/adminCandidaturesApi";
import { listerRessourcesAdmin } from "@/api/adminRessourcesApi";

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

const Admin = () => {
  const [totalUtilisateurs, setTotalUtilisateurs] = useState<string>("—");
  const [candidaturesATraiter, setCandidaturesATraiter] = useState<string>("—");
  const [mentorsActifs, setMentorsActifs] = useState<string>("—");
  const [totalRessources, setTotalRessources] = useState<string>("—");

  useEffect(() => {
    const charger = async () => {
      try {
        const stats = await statsParRole();
        const total = Object.values(stats).reduce((acc, n) => acc + n, 0);
        setTotalUtilisateurs(String(total));
        setMentorsActifs(String(stats["mentor"] || 0));
      } catch {
        // silencieux : les compteurs restent à "—"
      }

      try {
        const candidatures = await listerCandidatures();
        const enAttente = candidatures.filter((c) => c.statut === "EN_ATTENTE").length;
        setCandidaturesATraiter(String(enAttente));
      } catch {
        // silencieux
      }

      try {
        const ressources = await listerRessourcesAdmin();
        setTotalRessources(String(ressources.length));
      } catch {
        // silencieux
      }
    };
    charger();
  }, []);

  return (
    <ProtectedRoute roles={["admin"]}>
      <EspaceLayout title="Tableau de bord administrateur" role="Admin" items={items}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Utilisateurs" value={totalUtilisateurs} hint="Tous rôles" />
          <StatCard label="Candidatures" value={candidaturesATraiter} hint="À traiter" />
          <StatCard label="Mentors actifs" value={mentorsActifs} />
          <StatCard label="Ressources" value={totalRessources} />
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
};

export default Admin;