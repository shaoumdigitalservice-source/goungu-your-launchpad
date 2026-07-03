import { useEffect, useState } from "react";
import { Sparkles, Target, FileBadge, Compass, MessageCircle, BookOpen, User, FileText, Link as LinkIcon, Download, Loader2, Mail, Phone, UserCircle2 } from "lucide-react";
import ComingSoon from "./ComingSoon";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { listerRessourcesPubliques, RessourcePublique } from "@/api/ressourcesApi";
import { getMonMentor, MonMentor } from "@/api/mentorApi";

const items = [
  { to: "/espace/jeune", label: "Tableau de bord", icon: Sparkles },
  { to: "/espace/jeune/parcours", label: "Mon parcours", icon: Target },
  { to: "/espace/jeune/passeport", label: "Passeport Avenir", icon: FileBadge },
  { to: "/espace/jeune/orientation", label: "Orientation", icon: Compass },
  { to: "/espace/jeune/mentor", label: "Mon mentor", icon: MessageCircle },
  { to: "/espace/jeune/ressources", label: "Ressources", icon: BookOpen },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const API_ORIGIN = "http://localhost:8082";

export const JeuneParcours = () => <ComingSoon title="Mon parcours" role="Jeune" roles={["jeune", "admin"]} items={items} pageLabel="Mon parcours" />;
export const JeunePasseport = () => <ComingSoon title="Passeport Avenir" role="Jeune" roles={["jeune", "admin"]} items={items} pageLabel="Passeport Avenir" />;
export const JeuneOrientation = () => <ComingSoon title="Orientation" role="Jeune" roles={["jeune", "admin"]} items={items} pageLabel="Orientation" />;

export const JeuneMentor = () => {
  const [mentor, setMentor] = useState<MonMentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await getMonMentor();
        setMentor(data);
      } catch (e: any) {
        setErreur(e.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  return (
    <ProtectedRoute roles={["jeune", "admin"]}>
      <EspaceLayout title="Mon mentor" role="Jeune" items={items}>
        <Section title="Votre mentor Goungué">
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

          {!loading && !erreur && mentor && !mentor.assigne && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <UserCircle2 className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="font-semibold mb-1">Aucun mentor assigné</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Aucun mentor ne vous a encore été assigné. L'équipe Goungué y travaille — revenez bientôt !
              </p>
            </div>
          )}

          {!loading && !erreur && mentor && mentor.assigne && (
            <div className="flex flex-col sm:flex-row items-start gap-6 bg-background border rounded-2xl p-6">
              <div className="h-16 w-16 rounded-2xl bg-foreground text-background grid place-items-center text-xl font-display shrink-0">
                {mentor.prenom?.[0]}{mentor.nom?.[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl">{mentor.prenom} {mentor.nom}</h3>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mt-1">Mentor Goungué</p>

                {mentor.bio && <p className="text-sm text-muted-foreground mt-3">{mentor.bio}</p>}

                <div className="mt-4 space-y-2">
                  {mentor.email && (
                    <a href={`mailto:${mentor.email}`} className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition">
                      <Mail className="h-4 w-4" /> {mentor.email}
                    </a>
                  )}
                  {mentor.telephone && (
                    <a href={`tel:${mentor.telephone}`} className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition">
                      <Phone className="h-4 w-4" /> {mentor.telephone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </Section>
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export const JeuneRessources = () => {
  const [ressources, setRessources] = useState<RessourcePublique[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await listerRessourcesPubliques();
        setRessources([...data].sort((a, b) => a.ordreAffichage - b.ordreAffichage));
      } catch (e: any) {
        setErreur(e.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  return (
    <ProtectedRoute roles={["jeune", "admin"]}>
      <EspaceLayout title="Ressources" role="Jeune" items={items}>
        <Section title="Bibliothèque de ressources">
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-10 justify-center">
              <Loader2 className="animate-spin" size={20} /> Chargement des ressources...
            </div>
          )}

          {erreur && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-4 text-center">
              {erreur}
            </div>
          )}

          {!loading && !erreur && ressources.length === 0 && (
            <Placeholder label="Aucune ressource pour le moment" />
          )}

          {!loading && !erreur && ressources.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ressources.map((r) => {
                const Icon = r.type === "FICHIER" ? FileText : LinkIcon;
                const href = r.url.startsWith("/uploads") ? `${API_ORIGIN}${r.url}` : r.url;
                return (
                  <article key={r.id} className="group rounded-2xl border bg-background p-6 hover-lift flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-xl bg-foreground text-background grid place-items-center">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">
                        {r.type === "FICHIER" ? "Document" : "Lien"}
                      </span>
                    </div>
                    <h3 className="font-display text-base flex-1">{r.titre}</h3>
                    {r.description && (
                      <p className="text-sm text-muted-foreground mt-2">{r.description}</p>
                    )}
                    <div className="mt-4 flex items-center justify-end text-sm">
                      <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary group-hover:gap-2 transition-all">
                        {r.type === "FICHIER" ? "Télécharger" : "Accéder"} <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Section>
      </EspaceLayout>
    </ProtectedRoute>
  );
};
