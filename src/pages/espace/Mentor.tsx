import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Users, Calendar, ClipboardList, MessageSquare, Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { getMesJeunes, getMesRendezVousMentor, Jeune, RendezVous } from "@/api/mentorApi";

const items = [
  { to: "/espace/mentor", label: "Tableau de bord", icon: ClipboardList },
  { to: "/espace/mentor/jeunes", label: "Mes jeunes", icon: Users },
  { to: "/espace/mentor/agenda", label: "Agenda", icon: Calendar },
  { to: "/espace/mentor/messages", label: "Messagerie", icon: MessageSquare },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Mentor = () => {
  const [jeunes, setJeunes] = useState<Jeune[]>([]);
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const charger = async () => {
      const [jeunesRes, rdvsRes] = await Promise.allSettled([getMesJeunes(), getMesRendezVousMentor()]);
      if (jeunesRes.status === "fulfilled") setJeunes(jeunesRes.value);
      if (rdvsRes.status === "fulfilled") setRdvs(rdvsRes.value);
      setLoading(false);
    };
    charger();
  }, []);

  const maintenant = new Date();
  const rdvsCeMois = rdvs.filter((r) => {
    const d = new Date(r.dateHeure);
    return d.getMonth() === maintenant.getMonth() && d.getFullYear() === maintenant.getFullYear();
  });
  const prochainsRdv = [...rdvs]
    .filter((r) => r.statut === "PLANIFIE")
    .sort((a, b) => new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime())
    .slice(0, 3);

  return (
    <ProtectedRoute roles={["mentor", "admin"]}>
      <EspaceLayout title="Espace Mentor" role="Mentor" items={items}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Jeunes suivis" value={loading ? "—" : String(jeunes.length)} />
          <StatCard label="RDV ce mois" value={loading ? "—" : String(rdvsCeMois.length)} />
          <StatCard label="RDV planifiés" value={loading ? "—" : String(rdvs.filter((r) => r.statut === "PLANIFIE").length)} />
          <StatCard label="RDV terminés" value={loading ? "—" : String(rdvs.filter((r) => r.statut === "TERMINE").length)} />
        </div>

        <Section
          title="Mes jeunes"
          action={
            <Link to="/espace/mentor/jeunes" className="text-xs font-semibold text-primary hover:underline">
              Voir tout
            </Link>
          }
        >
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-6 justify-center">
              <Loader2 className="animate-spin" size={18} /> Chargement...
            </div>
          )}
          {!loading && jeunes.length === 0 && (
            <div className="text-sm text-muted-foreground">
              Aucun jeune ne vous est encore assigné. Les attributions seront effectuées par l'équipe Goungué après votre validation.
            </div>
          )}
          {!loading && jeunes.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {jeunes.map((j) => (
                <div key={j.id} className="p-4 rounded-xl bg-section-alt">
                  <div className="font-display text-lg">{j.prenom} {j.nom}</div>
                  {j.ville && <div className="text-xs text-muted-foreground mt-1">{j.ville}</div>}
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section
          title="Agenda"
          action={
            <Link to="/espace/mentor/agenda" className="text-xs font-semibold text-primary hover:underline">
              Voir tout
            </Link>
          }
        >
          {!loading && prochainsRdv.length === 0 && <Placeholder label="Aucun rendez-vous planifié pour le moment" />}
          {!loading && prochainsRdv.length > 0 && (
            <ol className="space-y-3">
              {prochainsRdv.map((r) => (
                <li key={r.id} className="p-3 rounded-xl bg-section-alt">
                  <div className="text-sm font-semibold">{r.sujet}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(r.dateHeure).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}
                    {r.jeunePrenom && ` · avec ${r.jeunePrenom} ${r.jeuneNom}`}
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

export default Mentor;
