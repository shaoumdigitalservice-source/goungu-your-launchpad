import { useEffect, useState } from "react";
import { GraduationCap, Users, BookOpen, Calendar, User, Loader2, FileText, Link as LinkIcon, Download } from "lucide-react";
import ComingSoon from "./ComingSoon";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { listerRessourcesPubliques, RessourcePublique } from "@/api/ressourcesApi";

const items = [
  { to: "/espace/formateur", label: "Tableau de bord", icon: GraduationCap },
  { to: "/espace/formateur/cohortes", label: "Cohortes", icon: Users },
  { to: "/espace/formateur/modules", label: "Modules", icon: BookOpen },
  { to: "/espace/formateur/agenda", label: "Agenda", icon: Calendar },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const API_ORIGIN = "http://localhost:8082";

export const FormateurCohortes = () => <ComingSoon title="Cohortes" role="Formateur" roles={["formateur", "admin"]} items={items} pageLabel="Cohortes" />;

export const FormateurModules = () => {
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
    <ProtectedRoute roles={["formateur", "admin"]}>
      <EspaceLayout title="Modules" role="Formateur" items={items}>
        <Section title="Modules de formation">
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
          {!loading && !erreur && ressources.length === 0 && (
            <Placeholder label="Aucun module pour le moment" />
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

export const FormateurAgenda = () => <ComingSoon title="Agenda" role="Formateur" roles={["formateur", "admin"]} items={items} pageLabel="Agenda" />;
