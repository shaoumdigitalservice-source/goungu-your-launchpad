import { useEffect, useState } from "react";
import { HeartHandshake, Users, BookOpen, FileText, Calendar, User, Loader2, Mail, Phone, MapPin } from "lucide-react";
import ComingSoon from "./ComingSoon";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { getMonEnfant, Enfant } from "@/api/parentApi";

const items = [
  { to: "/espace/parent", label: "Tableau de bord", icon: HeartHandshake },
  { to: "/espace/parent/suivi", label: "Suivi du jeune", icon: Users },
  { to: "/espace/parent/parentalite", label: "Parentalité positive", icon: BookOpen },
  { to: "/espace/parent/documents", label: "Documents", icon: FileText },
  { to: "/espace/parent/rdv", label: "Rendez-vous", icon: Calendar },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

export const ParentSuivi = () => {
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await getMonEnfant();
        setEnfants(data);
      } catch (e: any) {
        setErreur(e.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  return (
    <ProtectedRoute roles={["parent", "admin"]}>
      <EspaceLayout title="Suivi du jeune" role="Parent" items={items}>
        <Section title={`Vos enfants${enfants.length > 0 ? ` (${enfants.length})` : ""}`}>
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-10 justify-center">
              <Loader2 className="animate-spin" size={20} /> Chargement...
            </div>
          )}

          {erreur && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-4 text-center">
              {erreur}
            </div>
          )}

          {!loading && !erreur && enfants.length === 0 && (
            <Placeholder label="Aucun enfant ne vous est encore associé" />
          )}

          {!loading && !erreur && enfants.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enfants.map((e) => (
                <div key={e.id} className="bg-background border rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-11 w-11 rounded-xl bg-foreground text-background grid place-items-center text-sm font-display shrink-0">
                      {e.prenom?.[0]}{e.nom?.[0]}
                    </div>
                    <div>
                      <h3 className="font-display text-base">{e.prenom} {e.nom}</h3>
                      {e.ville && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {e.ville}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-3">
                    <a href={`mailto:${e.email}`} className="flex items-center gap-2 text-xs text-foreground/80 hover:text-primary transition">
                      <Mail className="h-3.5 w-3.5" /> {e.email}
                    </a>
                    {e.telephone && (
                      <a href={`tel:${e.telephone}`} className="flex items-center gap-2 text-xs text-foreground/80 hover:text-primary transition">
                        <Phone className="h-3.5 w-3.5" /> {e.telephone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export const ParentParentalite = () => <ComingSoon title="Parentalité positive" role="Parent" roles={["parent", "admin"]} items={items} pageLabel="Parentalité positive" />;
export const ParentDocuments = () => <ComingSoon title="Documents" role="Parent" roles={["parent", "admin"]} items={items} pageLabel="Documents" />;
export const ParentRdv = () => <ComingSoon title="Rendez-vous" role="Parent" roles={["parent", "admin"]} items={items} pageLabel="Rendez-vous" />;
