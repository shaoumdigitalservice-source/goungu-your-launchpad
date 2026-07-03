import { useEffect, useState } from "react";
import { GraduationCap, Users, BookOpen, Calendar, User, Loader2, FileText, Link as LinkIcon, Download, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";
import ComingSoon from "./ComingSoon";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { listerRessourcesPubliques, RessourcePublique } from "@/api/ressourcesApi";
import { getMesSessions, creerSession, changerStatutSession, supprimerSession, SessionFormation } from "@/api/formateurApi";

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

export const FormateurAgenda = () => {
  const [sessions, setSessions] = useState<SessionFormation[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [titre, setTitre] = useState("");
  const [dateHeure, setDateHeure] = useState("");
  const [description, setDescription] = useState("");

  const charger = async () => {
    setLoading(true);
    try {
      const data = await getMesSessions();
      setSessions(data);
    } catch (e: any) {
      setErreur(e.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const handleCreer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await creerSession({ titre, dateHeure, description });
      setTitre("");
      setDateHeure("");
      setDescription("");
      setShowForm(false);
      await charger();
    } catch (e: any) {
      alert(e.message || "Erreur");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatut = async (id: number, statut: string) => {
    try {
      await changerStatutSession(id, statut);
      await charger();
    } catch (e: any) {
      alert(e.message || "Erreur");
    }
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer cette session ?")) return;
    try {
      await supprimerSession(id);
      await charger();
    } catch (e: any) {
      alert(e.message || "Erreur");
    }
  };

  const statutStyle: Record<string, string> = {
    PLANIFIE: "bg-blue-50 text-blue-700 border-blue-200",
    TERMINE: "bg-green-50 text-green-700 border-green-200",
    ANNULE: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <ProtectedRoute roles={["formateur", "admin"]}>
      <EspaceLayout title="Agenda" role="Formateur" items={items}>
        <Section
          title="Mes sessions de formation"
          action={
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4" /> Nouvelle session
            </button>
          }
        >
          {showForm && (
            <form onSubmit={handleCreer} className="mb-6 p-5 rounded-2xl border bg-section-alt space-y-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Titre *</label>
                <input value={titre} onChange={(e) => setTitre(e.target.value)} required className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Date et heure *</label>
                <input type="datetime-local" value={dateHeure} onChange={(e) => setDateHeure(e.target.value)} required className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Créer
              </button>
            </form>
          )}

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

          {!loading && !erreur && sessions.length === 0 && (
            <Placeholder label="Aucune session planifiée" />
          )}

          {!loading && !erreur && sessions.length > 0 && (
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="p-4 rounded-xl border bg-background flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{s.titre}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statutStyle[s.statut]}`}>
                        {s.statut}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(s.dateHeure).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                    </p>
                    {s.description && <p className="text-xs text-muted-foreground mt-1">{s.description}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {s.statut === "PLANIFIE" && (
                      <>
                        <button onClick={() => handleStatut(s.id, "TERMINE")} title="Marquer terminé" className="p-2 rounded-lg hover:bg-green-50 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleStatut(s.id, "ANNULE")} title="Annuler" className="p-2 rounded-lg hover:bg-red-50 text-red-600">
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button onClick={() => handleSupprimer(s.id)} title="Supprimer" className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                      <Trash2 className="h-4 w-4" />
                    </button>
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
