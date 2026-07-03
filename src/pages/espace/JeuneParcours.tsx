import { useEffect, useRef, useState } from "react";
import { Sparkles, Target, FileBadge, Compass, MessageCircle, BookOpen, User, FileText, Link as LinkIcon, Download, Loader2, Mail, Phone, UserCircle2, Send } from "lucide-react";
import ComingSoon from "./ComingSoon";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { listerRessourcesPubliques, RessourcePublique } from "@/api/ressourcesApi";
import { getMonMentor, MonMentor } from "@/api/mentorApi";
import { getConversation, envoyerMessage, Message } from "@/api/messagesApi";

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
      } catch (e: any) {
        setErreur(e.message || "Erreur lors du chargement");
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
      // silencieux : on n'affiche pas d'erreur bloquante pour le chat
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
    } catch (e: any) {
      alert(e.message || "Erreur lors de l'envoi");
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