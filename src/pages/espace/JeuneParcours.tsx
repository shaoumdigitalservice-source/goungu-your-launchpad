import { useEffect, useRef, useState } from "react";
import { Sparkles, Target, FileBadge, Compass, MessageCircle, BookOpen, User, FileText, Link as LinkIcon, Download, Loader2, Mail, Phone, UserCircle2, Send, CalendarCheck, UserPlus, Plus, Trash2, Award, Briefcase, Calendar } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { listerRessourcesPubliques, RessourcePublique } from "@/api/ressourcesApi";
import { getMonMentor, MonMentor } from "@/api/mentorApi";
import { getConversation, envoyerMessage, Message } from "@/api/messagesApi";
import { toast } from "sonner";
import { getMonParcours, EtapeParcours } from "@/api/parcoursApi";
import { getMonPasseport, ajouterEntreePasseport, supprimerEntreePasseport, PasseportEntree } from "@/api/passeportApi";
import { API_ORIGIN } from "@/lib/apiConfig";
import { getErrorMessage } from "@/lib/utils";

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

export const JeuneParcours = () => {
  const [etapes, setEtapes] = useState<EtapeParcours[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await getMonParcours();
        setEtapes(data);
      } catch (e) {
        setErreur(getErrorMessage(e, "Erreur lors du chargement"));
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  const iconePour = (type: string) => (type === "INSCRIPTION" ? UserPlus : CalendarCheck);

  return (
    <ProtectedRoute roles={["jeune", "admin"]}>
      <EspaceLayout title="Mon parcours" role="Jeune" items={items}>
        <Section title="Votre chemin chez Goungué">
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

          {!loading && !erreur && etapes.length === 0 && (
            <Placeholder label="Votre parcours commence ici — revenez après votre premier rendez-vous" />
          )}

          {!loading && !erreur && etapes.length > 0 && (
            <div className="relative pl-8">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-8">
                {etapes.map((e, i) => {
                  const Icon = iconePour(e.type);
                  return (
                    <div key={i} className="relative">
                      <div className="absolute -left-8 top-0 h-8 w-8 rounded-full bg-foreground text-background grid place-items-center">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="bg-background border rounded-2xl p-5">
                        <p className="text-xs text-muted-foreground mb-1">
                          {new Date(e.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                        <h3 className="font-display text-base">{e.titre}</h3>
                        {e.description && (
                          <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Section>
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export const JeunePasseport = () => {
  const [entrees, setEntrees] = useState<PasseportEntree[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const [showFormCompetence, setShowFormCompetence] = useState(false);
  const [showFormRealisation, setShowFormRealisation] = useState(false);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const charger = async () => {
    try {
      const data = await getMonPasseport();
      setEntrees(data);
    } catch (e) {
      setErreur(getErrorMessage(e, "Erreur lors du chargement"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const competences = entrees.filter((e) => e.type === "COMPETENCE");
  const realisations = entrees.filter((e) => e.type === "REALISATION");

  const handleAjouter = async (type: "COMPETENCE" | "REALISATION", e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;
    setSubmitting(true);
    try {
      await ajouterEntreePasseport({ type, titre: titre.trim(), description: description.trim() || undefined });
      setTitre("");
      setDescription("");
      setShowFormCompetence(false);
      setShowFormRealisation(false);
      await charger();
    } catch (e) {
      alert(getErrorMessage(e, "Erreur"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer cette entrée ?")) return;
    try {
      await supprimerEntreePasseport(id);
      await charger();
    } catch (e) {
      alert(getErrorMessage(e, "Erreur"));
    }
  };

  return (
    <ProtectedRoute roles={["jeune", "admin"]}>
      <EspaceLayout title="Passeport Avenir" role="Jeune" items={items}>
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

        {!loading && !erreur && (
          <>
            <Section
              title="Mes compétences"
              action={
                <button
                  onClick={() => setShowFormCompetence(!showFormCompetence)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
                >
                  <Plus className="h-4 w-4" /> Ajouter
                </button>
              }
            >
              {showFormCompetence && (
                <form onSubmit={(e) => handleAjouter("COMPETENCE", e)} className="mb-5 p-5 rounded-2xl border bg-section-alt space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Compétence *</label>
                    <input value={titre} onChange={(e) => setTitre(e.target.value)} required placeholder="Ex : Prise de parole en public" className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Détails (optionnel)</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    Ajouter
                  </button>
                </form>
              )}

              {competences.length === 0 ? (
                <Placeholder label="Aucune compétence ajoutée pour le moment" />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {competences.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl border bg-background flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-lg bg-foreground text-background grid place-items-center shrink-0">
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{c.titre}</h4>
                          {c.description && <p className="text-xs text-muted-foreground mt-1">{c.description}</p>}
                        </div>
                      </div>
                      <button onClick={() => handleSupprimer(c.id)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground shrink-0">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            <Section
              title="Mes réalisations"
              action={
                <button
                  onClick={() => setShowFormRealisation(!showFormRealisation)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
                >
                  <Plus className="h-4 w-4" /> Ajouter
                </button>
              }
            >
              {showFormRealisation && (
                <form onSubmit={(e) => handleAjouter("REALISATION", e)} className="mb-5 p-5 rounded-2xl border bg-section-alt space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Réalisation *</label>
                    <input value={titre} onChange={(e) => setTitre(e.target.value)} required placeholder="Ex : Organisation d'un atelier CV" className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Description (optionnel)</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    Ajouter
                  </button>
                </form>
              )}

              {realisations.length === 0 ? (
                <Placeholder label="Aucune réalisation ajoutée pour le moment" />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {realisations.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl border bg-background flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-lg bg-foreground text-background grid place-items-center shrink-0">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{r.titre}</h4>
                          {r.description && <p className="text-xs text-muted-foreground mt-1">{r.description}</p>}
                        </div>
                      </div>
                      <button onClick={() => handleSupprimer(r.id)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground shrink-0">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </>
        )}
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export const JeuneOrientation = () => {
  const [ressources, setRessources] = useState<RessourcePublique[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await listerRessourcesPubliques();
        const filtrees = data.filter((r) => r.categorie === "orientation");
        setRessources([...filtrees].sort((a, b) => a.ordreAffichage - b.ordreAffichage));
      } catch (e) {
        setErreur(getErrorMessage(e, "Erreur lors du chargement"));
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  return (
    <ProtectedRoute roles={["jeune", "admin"]}>
      <EspaceLayout title="Orientation" role="Jeune" items={items}>
        <Section title="Pistes d'orientation">
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
            <Placeholder label="Aucune piste d'orientation pour le moment" />
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

export const JeuneMentor = () => {
  const [mentor, setMentor] = useState<MonMentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [texte, setTexte] = useState("");
  const [envoi, setEnvoi] = useState(false);

  const finDesMessagesRef = useRef<HTMLDivElement>(null);
  const dernierNombreMessages = useRef(0);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await getMonMentor();
        setMentor(data);
      } catch (e) {
        setErreur(getErrorMessage(e, "Erreur lors du chargement"));
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  const chargerMessages = async (silencieux = false) => {
    if (!mentor?.id) return;
    if (!silencieux) setLoadingMessages(true);
    try {
      const data = await getConversation(mentor.id);
      setMessages(data);
    } catch {
      // silencieux
    } finally {
      if (!silencieux) setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (!mentor?.assigne || !mentor.id) return;
    chargerMessages();
    const interval = setInterval(() => chargerMessages(true), 7000);
    return () => clearInterval(interval);
  }, [mentor?.id]);

  useEffect(() => {
    if (messages.length > dernierNombreMessages.current) {
      finDesMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    dernierNombreMessages.current = messages.length;
  }, [messages]);

  const handleEnvoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texte.trim() || !mentor?.id) return;
    setEnvoi(true);
    try {
      await envoyerMessage(mentor.id, texte.trim());
      setTexte("");
      await chargerMessages(true);
      toast.success("Message envoyé");
    } catch (e) {
      toast.error(getErrorMessage(e, "Erreur lors de l'envoi"));
    } finally {
      setEnvoi(false);
    }
  };

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
            <>
              <div className="flex flex-col sm:flex-row items-start gap-6 bg-background border rounded-2xl p-6 mb-6">
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

              <div className="border rounded-2xl bg-background flex flex-col overflow-hidden h-[500px]">
                <div className="px-4 py-3 border-b">
                  <h3 className="font-semibold text-sm">Discuter avec {mentor.prenom}</h3>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {loadingMessages && (
                    <div className="flex items-center gap-2 text-muted-foreground justify-center py-6">
                      <Loader2 className="animate-spin" size={18} /> Chargement...
                    </div>
                  )}

                  {!loadingMessages && messages.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Aucun message pour l'instant. Dites bonjour !
                    </p>
                  )}

                  {!loadingMessages &&
                    messages.map((m) => {
                      const estMoi = m.expediteurId !== mentor.id;
                      return (
                        <div key={m.id} className={`flex ${estMoi ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                              estMoi
                                ? "bg-primary text-primary-foreground rounded-br-sm"
                                : "bg-muted text-foreground rounded-bl-sm"
                            }`}
                          >
                            <p>{m.contenu}</p>
                            <p className={`text-[10px] mt-1 ${estMoi ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              {new Date(m.dateEnvoi).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  <div ref={finDesMessagesRef} />
                </div>

                <form onSubmit={handleEnvoyer} className="border-t p-3 flex items-center gap-2">
                  <input
                    value={texte}
                    onChange={(e) => setTexte(e.target.value)}
                    placeholder="Écrire un message..."
                    className="flex-1 px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    disabled={envoi || !texte.trim()}
                    className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </>
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
      } catch (e) {
        setErreur(getErrorMessage(e, "Erreur lors du chargement"));
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
