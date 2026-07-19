import { useEffect, useState } from "react";
import { Sparkles, Target, FileBadge, Compass, MessageCircle, BookOpen, User, Loader2, Calendar } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { getMesRendezVousJeune, RendezVous } from "@/api/rendezVousJeuneApi";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

const items = [
  { to: "/espace/jeune", label: "Tableau de bord", icon: Sparkles },
  { to: "/espace/jeune/parcours", label: "Mon parcours", icon: Target },
  { to: "/espace/jeune/passeport", label: "Passeport Avenir", icon: FileBadge },
  { to: "/espace/jeune/orientation", label: "Orientation", icon: Compass },
  { to: "/espace/jeune/mentor", label: "Mon mentor", icon: MessageCircle },
  { to: "/espace/jeune/rdv", label: "Rendez-vous", icon: Calendar },
  { to: "/espace/jeune/ressources", label: "Ressources", icon: BookOpen },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const STATUT_STYLES: Record<string, string> = {
  PLANIFIE: "bg-yellow-100 text-yellow-700",
  TERMINE: "bg-green-100 text-green-700",
  ANNULE: "bg-red-100 text-red-700",
};

const STATUT_LABELS: Record<string, string> = {
  PLANIFIE: "Planifié",
  TERMINE: "Terminé",
  ANNULE: "Annulé",
};

export const JeuneRendezVous = () => {
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const charger = async () => {
    setLoading(true);
    try {
      const data = await getMesRendezVousJeune();
      setRdvs(data);
      setErreur(null);
    } catch (e) {
      const msg = getErrorMessage(e, "Erreur lors du chargement");
      setErreur(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  return (
    <ProtectedRoute roles={["jeune", "admin"]}>
      <EspaceLayout title="Mes rendez-vous" role="Jeune" items={items}>
        <Section title={`Rendez-vous avec mon mentor${rdvs.length > 0 ? ` (${rdvs.length})` : ""}`}>
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-10 justify-center">
              <Loader2 className="animate-spin" size={20} /> Chargement...
            </div>
          )}
          {erreur && !loading && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-4 text-center">
              {erreur}
            </div>
          )}
          {!loading && !erreur && rdvs.length === 0 && (
            <Placeholder label="Aucun rendez-vous planifié pour le moment" />
          )}
          {!loading && !erreur && rdvs.length > 0 && (
            <div className="space-y-3">
              {rdvs.map((r) => (
                <div key={r.id} className="bg-background border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{r.sujet}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUT_STYLES[r.statut]}`}>
                      {STATUT_LABELS[r.statut]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(r.dateHeure).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                  </p>
                  {r.notes && <p className="text-sm text-muted-foreground mt-1">{r.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </Section>
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export default JeuneRendezVous;