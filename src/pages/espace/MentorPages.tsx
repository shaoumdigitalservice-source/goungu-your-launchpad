import { useEffect, useState } from "react";
import { ClipboardList, Users, Calendar, MessageSquare, User, Loader2, Mail, Phone, MapPin } from "lucide-react";
import ComingSoon from "./ComingSoon";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { getMesJeunes, Jeune } from "@/api/mentorApi";

const items = [
  { to: "/espace/mentor", label: "Tableau de bord", icon: ClipboardList },
  { to: "/espace/mentor/jeunes", label: "Mes jeunes", icon: Users },
  { to: "/espace/mentor/agenda", label: "Agenda", icon: Calendar },
  { to: "/espace/mentor/messages", label: "Messagerie", icon: MessageSquare },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

export const MentorJeunes = () => {
  const [jeunes, setJeunes] = useState<Jeune[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await getMesJeunes();
        setJeunes(data);
      } catch (e: any) {
        setErreur(e.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  return (
    <ProtectedRoute roles={["mentor", "admin"]}>
      <EspaceLayout title="Mes jeunes" role="Mentor" items={items}>
        <Section title={`Jeunes accompagnés${jeunes.length > 0 ? ` (${jeunes.length})` : ""}`}>
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

          {!loading && !erreur && jeunes.length === 0 && (
            <Placeholder label="Aucun jeune ne vous a encore été assigné" />
          )}

          {!loading && !erreur && jeunes.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jeunes.map((j) => (
                <div key={j.id} className="bg-background border rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-11 w-11 rounded-xl bg-foreground text-background grid place-items-center text-sm font-display shrink-0">
                      {j.prenom?.[0]}{j.nom?.[0]}
                    </div>
                    <div>
                      <h3 className="font-display text-base">{j.prenom} {j.nom}</h3>
                      {j.ville && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {j.ville}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-3">
                    <a href={`mailto:${j.email}`} className="flex items-center gap-2 text-xs text-foreground/80 hover:text-primary transition">
                      <Mail className="h-3.5 w-3.5" /> {j.email}
                    </a>
                    {j.telephone && (
                      <a href={`tel:${j.telephone}`} className="flex items-center gap-2 text-xs text-foreground/80 hover:text-primary transition">
                        <Phone className="h-3.5 w-3.5" /> {j.telephone}
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

export const MentorAgenda = () => <ComingSoon title="Agenda" role="Mentor" roles={["mentor", "admin"]} items={items} pageLabel="Agenda" />;
export const MentorMessages = () => <ComingSoon title="Messagerie" role="Mentor" roles={["mentor", "admin"]} items={items} pageLabel="Messagerie" />;
