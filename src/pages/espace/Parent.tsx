import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, BookOpen, Calendar, HeartHandshake, Users, FileText, Loader2, MapPin } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { getMonEnfant, Enfant, getRendezVousEnfant, RendezVous } from "@/api/parentApi";

const items = [
  { to: "/espace/parent", label: "Tableau de bord", icon: HeartHandshake },
  { to: "/espace/parent/suivi", label: "Suivi du jeune", icon: Users },
  { to: "/espace/parent/parentalite", label: "Parentalité positive", icon: BookOpen },
  { to: "/espace/parent/documents", label: "Documents", icon: FileText },
  { to: "/espace/parent/rdv", label: "Rendez-vous", icon: Calendar },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Parent = () => {
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const charger = async () => {
      const [enfantsRes, rdvsRes] = await Promise.allSettled([getMonEnfant(), getRendezVousEnfant()]);
      if (enfantsRes.status === "fulfilled") setEnfants(enfantsRes.value);
      if (rdvsRes.status === "fulfilled") setRdvs(rdvsRes.value);
      setLoading(false);
    };
    charger();
  }, []);

  const rdvsPlanifies = rdvs.filter((r) => r.statut === "PLANIFIE");
  const rdvsTermines = rdvs.filter((r) => r.statut === "TERMINE");
  const prochainRdv = [...rdvsPlanifies].sort(
    (a, b) => new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime()
  )[0];

  return (
    <ProtectedRoute roles={["parent", "admin"]}>
      <EspaceLayout title="Tableau de bord parental" role="Parent" items={items}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Jeunes suivis" value={loading ? "—" : String(enfants.length)} />
          <StatCard label="RDV planifiés" value={loading ? "—" : String(rdvsPlanifies.length)} />
          <StatCard label="RDV terminés" value={loading ? "—" : String(rdvsTermines.length)} />
          <StatCard label="Modules parentalité" value="6" hint="Parcours complet" />
        </div>

        <Section
          title="Suivi du jeune"
          action={
            <Link to="/espace/parent/suivi" className="text-xs font-semibold text-primary hover:underline">
              Voir tout
            </Link>
          }
        >
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-6 justify-center">
              <Loader2 className="animate-spin" size={18} /> Chargement...
            </div>
          )}
          {!loading && enfants.length === 0 && <Placeholder label="Aucun jeune rattaché à votre compte pour le moment" />}
          {!loading && enfants.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {enfants.map((e) => (
                <div key={e.id} className="p-4 rounded-xl bg-section-alt">
                  <div className="font-display text-lg">{e.prenom} {e.nom}</div>
                  {e.ville && (
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {e.ville}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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

        <Section
          title="Prochain rendez-vous"
          action={
            <Link to="/espace/parent/rdv" className="text-xs font-semibold text-primary hover:underline">
              Voir tout
            </Link>
          }
        >
          {!loading && !prochainRdv && <Placeholder label="Aucun rendez-vous planifié pour le moment" />}
          {!loading && prochainRdv && (
            <div className="p-4 rounded-xl bg-section-alt">
              <div className="text-sm font-semibold">{prochainRdv.sujet}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(prochainRdv.dateHeure).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}
                {prochainRdv.mentorPrenom && ` · avec ${prochainRdv.mentorPrenom} ${prochainRdv.mentorNom}`}
              </div>
            </div>
          )}
        </Section>
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export default Parent;
