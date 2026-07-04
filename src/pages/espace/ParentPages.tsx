import { useEffect, useState } from "react";
import { HeartHandshake, Users, BookOpen, FileText, Calendar, User, Loader2, Mail, Phone, MapPin, Link as LinkIcon, Download } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { getMonEnfant, Enfant, getRendezVousEnfant, RendezVous } from "@/api/parentApi";
import { listerRessourcesPubliques, RessourcePublique } from "@/api/ressourcesApi";
import { API_ORIGIN } from "@/lib/apiConfig";

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

export const ParentRdv = () => {
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await getRendezVousEnfant();
        setRdvs(data);
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
      <EspaceLayout title="Rendez-vous" role="Parent" items={items}>
        <Section title={`Rendez-vous du mentor${rdvs.length > 0 ? ` (${rdvs.length})` : ""}`}>
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
                    Avec {r.mentorPrenom} {r.mentorNom} (mentor de {r.jeunePrenom}) · {new Date(r.dateHeure).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
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

export const ParentDocuments = () => {
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
    <ProtectedRoute roles={["parent", "admin"]}>
      <EspaceLayout title="Documents" role="Parent" items={items}>
        <Section title="Documents utiles">
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
            <Placeholder label="Aucun document pour le moment" />
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

export const ParentParentalite = () => {
  const [ressources, setRessources] = useState<RessourcePublique[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await listerRessourcesPubliques();
        const filtrees = data.filter((r) => r.categorie === "parentalite");
        setRessources([...filtrees].sort((a, b) => a.ordreAffichage - b.ordreAffichage));
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
      <EspaceLayout title="Parentalité positive" role="Parent" items={items}>
        <Section title="Ressources parentalité positive">
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
            <Placeholder label="Aucune ressource de parentalité pour le moment" />
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
