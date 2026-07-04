import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, GraduationCap, Users, BookOpen, Calendar, Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { getMesCohortes, getMesSessions, Cohorte, SessionFormation } from "@/api/formateurApi";
import { listerRessourcesPubliques } from "@/api/ressourcesApi";

const items = [
  { to: "/espace/formateur", label: "Tableau de bord", icon: GraduationCap },
  { to: "/espace/formateur/cohortes", label: "Cohortes", icon: Users },
  { to: "/espace/formateur/modules", label: "Modules", icon: BookOpen },
  { to: "/espace/formateur/agenda", label: "Agenda", icon: Calendar },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Formateur = () => {
  const [cohortes, setCohortes] = useState<Cohorte[]>([]);
  const [sessions, setSessions] = useState<SessionFormation[]>([]);
  const [nbModules, setNbModules] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const charger = async () => {
      const [cohortesRes, sessionsRes, ressourcesRes] = await Promise.allSettled([
        getMesCohortes(),
        getMesSessions(),
        listerRessourcesPubliques(),
      ]);
      if (cohortesRes.status === "fulfilled") setCohortes(cohortesRes.value);
      if (sessionsRes.status === "fulfilled") setSessions(sessionsRes.value);
      if (ressourcesRes.status === "fulfilled") setNbModules(ressourcesRes.value.length);
      setLoading(false);
    };
    charger();
  }, []);

  const apprenants = new Set(cohortes.flatMap((c) => c.jeuneIds)).size;
  const prochainesSessions = [...sessions]
    .filter((s) => s.statut === "PLANIFIE")
    .sort((a, b) => new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime())
    .slice(0, 3);

  return (
    <ProtectedRoute roles={["formateur", "admin"]}>
      <EspaceLayout title="Espace Formateur" role="Formateur" items={items}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Cohortes actives" value={loading ? "—" : String(cohortes.length)} />
          <StatCard label="Apprenants" value={loading ? "—" : String(apprenants)} />
          <StatCard label="Modules" value={loading ? "—" : String(nbModules)} />
          <StatCard label="Sessions planifiées" value={loading ? "—" : String(sessions.filter((s) => s.statut === "PLANIFIE").length)} />
        </div>

        <Section
          title="Mes cohortes"
          action={
            <Link to="/espace/formateur/cohortes" className="text-xs font-semibold text-primary hover:underline">
              Voir tout
            </Link>
          }
        >
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-6 justify-center">
              <Loader2 className="animate-spin" size={18} /> Chargement...
            </div>
          )}
          {!loading && cohortes.length === 0 && <Placeholder label="Créez votre première cohorte pour regrouper vos jeunes" />}
          {!loading && cohortes.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {cohortes.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-section-alt">
                  <div className="font-display text-lg">{c.nom}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.membres.length} membre{c.membres.length > 1 ? "s" : ""}</div>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section
          title="Prochaines sessions"
          action={
            <Link to="/espace/formateur/agenda" className="text-xs font-semibold text-primary hover:underline">
              Voir tout
            </Link>
          }
        >
          {!loading && prochainesSessions.length === 0 && <Placeholder label="Aucune session planifiée pour le moment" />}
          {!loading && prochainesSessions.length > 0 && (
            <ol className="space-y-3">
              {prochainesSessions.map((s) => (
                <li key={s.id} className="p-3 rounded-xl bg-section-alt">
                  <div className="text-sm font-semibold">{s.titre}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(s.dateHeure).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Section>
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export default Formateur;
