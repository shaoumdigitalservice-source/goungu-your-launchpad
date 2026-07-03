import { useEffect, useRef, useState } from "react";
import { ClipboardList, Users, Calendar, MessageSquare, User, Loader2, Mail, Phone, MapPin, Plus, Check, X, Trash2, Send } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { getMesJeunes, Jeune, getMesRendezVousMentor, creerRendezVous, changerStatutRendezVous, supprimerRendezVous, RendezVous } from "@/api/mentorApi";
import { getConversation, envoyerMessage, Message } from "@/api/messagesApi";

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

export const MentorAgenda = () => {
  const [jeunes, setJeunes] = useState<Jeune[]>([]);
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [afficherForm, setAfficherForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [jeuneId, setJeuneId] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [sujet, setSujet] = useState("");
  const [notes, setNotes] = useState("");

  const charger = async () => {
    setLoading(true);
    try {
      const [j, r] = await Promise.all([getMesJeunes(), getMesRendezVousMentor()]);
      setJeunes(j);
      setRdvs(r);
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
    if (!jeuneId || !date || !heure || !sujet) return;
    setSubmitting(true);
    try {
      const dateHeure = `${date}T${heure}:00`;
      await creerRendezVous({ jeuneId: Number(jeuneId), dateHeure, sujet, notes: notes || undefined });
      setJeuneId(""); setDate(""); setHeure(""); setSujet(""); setNotes("");
      setAfficherForm(false);
      charger();
    } catch (e: any) {
      alert(e.message || "Erreur lors de la création");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatut = async (id: number, statut: string) => {
    try {
      await changerStatutRendezVous(id, statut);
      charger();
    } catch (e: any) {
      alert(e.message || "Erreur");
    }
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer ce rendez-vous ?")) return;
    try {
      await supprimerRendezVous(id);
      charger();
    } catch (e: any) {
      alert(e.message || "Erreur");
    }
  };

  return (
    <ProtectedRoute roles={["mentor", "admin"]}>
      <EspaceLayout title="Agenda" role="Mentor" items={items}>
        <Section
          title="Rendez-vous"
          action={
            jeunes.length > 0 && (
              <button
                onClick={() => setAfficherForm(!afficherForm)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
              >
                <Plus className="h-4 w-4" /> Nouveau rendez-vous
              </button>
            )
          }
        >
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
            <Placeholder label="Vous devez avoir au moins un jeune assigné pour planifier un rendez-vous" />
          )}

          {!loading && !erreur && afficherForm && jeunes.length > 0 && (
            <form onSubmit={handleCreer} className="bg-muted/40 border rounded-2xl p-5 mb-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">Jeune *</label>
                  <select value={jeuneId} onChange={(e) => setJeuneId(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm">
                    <option value="">Sélectionner...</option>
                    {jeunes.map((j) => (
                      <option key={j.id} value={j.id}>{j.prenom} {j.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Sujet *</label>
                  <input value={sujet} onChange={(e) => setSujet(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm" placeholder="Point d'étape mensuel" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Date *</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Heure *</label>
                  <input type="time" value={heure} onChange={(e) => setHeure(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Notes (facultatif)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm" />
              </div>
              <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition disabled:opacity-60">
                {submitting ? "Création..." : "Créer le rendez-vous"}
              </button>
            </form>
          )}

          {!loading && !erreur && rdvs.length === 0 && (
            <Placeholder label="Aucun rendez-vous planifié" />
          )}

          {!loading && !erreur && rdvs.length > 0 && (
            <div className="space-y-3">
              {rdvs.map((r) => (
                <div key={r.id} className="bg-background border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{r.sujet}</h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUT_STYLES[r.statut]}`}>
                          {STATUT_LABELS[r.statut]}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Avec {r.jeunePrenom} {r.jeuneNom} · {new Date(r.dateHeure).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                      </p>
                      {r.notes && <p className="text-sm text-muted-foreground mt-1">{r.notes}</p>}
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      {r.statut === "PLANIFIE" && (
                        <>
                          <button onClick={() => handleStatut(r.id, "TERMINE")} title="Marquer terminé" className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition">
                            <Check className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleStatut(r.id, "ANNULE")} title="Annuler" className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition">
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleSupprimer(r.id)} title="Supprimer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

export const MentorMessages = () => {
  const [jeunes, setJeunes] = useState<Jeune[]>([]);
  const [loadingJeunes, setLoadingJeunes] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const [jeuneActifId, setJeuneActifId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [texte, setTexte] = useState("");
  const [envoi, setEnvoi] = useState(false);

  const finDesMessagesRef = useRef<HTMLDivElement>(null);
  const dernierNombreMessages = useRef(0);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await getMesJeunes();
        setJeunes(data);
        if (data.length > 0) setJeuneActifId(data[0].id);
      } catch (e: any) {
        setErreur(e.message || "Erreur lors du chargement");
      } finally {
        setLoadingJeunes(false);
      }
    };
    charger();
  }, []);

  const chargerMessages = async (silencieux = false) => {
    if (!jeuneActifId) return;
    if (!silencieux) setLoadingMessages(true);
    try {
      const data = await getConversation(jeuneActifId);
      setMessages(data);
    } catch (e: any) {
      if (!silencieux) setErreur(e.message || "Erreur lors du chargement des messages");
    } finally {
      if (!silencieux) setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (!jeuneActifId) return;
    setMessages([]);
    chargerMessages();

    const interval = setInterval(() => chargerMessages(true), 7000);
    return () => clearInterval(interval);
  }, [jeuneActifId]);

  useEffect(() => {
    if (messages.length > dernierNombreMessages.current) {
      finDesMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    dernierNombreMessages.current = messages.length;
  }, [messages]);

  const handleEnvoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texte.trim() || !jeuneActifId) return;
    setEnvoi(true);
    try {
      await envoyerMessage(jeuneActifId, texte.trim());
      setTexte("");
      await chargerMessages(true);
    } catch (e: any) {
      alert(e.message || "Erreur lors de l'envoi");
    } finally {
      setEnvoi(false);
    }
  };

  const jeuneActif = jeunes.find((j) => j.id === jeuneActifId);

  return (
    <ProtectedRoute roles={["mentor", "admin"]}>
      <EspaceLayout title="Messagerie" role="Mentor" items={items}>
        <Section title="Discuter avec vos jeunes">
          {loadingJeunes && (
            <div className="flex items-center gap-2 text-muted-foreground py-10 justify-center">
              <Loader2 className="animate-spin" size={20} /> Chargement...
            </div>
          )}

          {erreur && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-4 text-center">
              {erreur}
            </div>
          )}

          {!loadingJeunes && !erreur && jeunes.length === 0 && (
            <Placeholder label="Aucun jeune ne vous a encore été assigné" />
          )}

          {!loadingJeunes && !erreur && jeunes.length > 0 && (
            <div className="grid md:grid-cols-[220px_1fr] gap-5 h-[600px]">
              <div className="border rounded-2xl overflow-y-auto bg-background">
                {jeunes.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => setJeuneActifId(j.id)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b last:border-b-0 transition ${
                      jeuneActifId === j.id ? "bg-primary/10" : "hover:bg-muted"
                    }`}
                  >
                    <div className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center text-xs font-display shrink-0">
                      {j.prenom?.[0]}{j.nom?.[0]}
                    </div>
                    <span className="text-sm font-medium truncate">{j.prenom} {j.nom}</span>
                  </button>
                ))}
              </div>

              <div className="border rounded-2xl bg-background flex flex-col overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <h3 className="font-semibold text-sm">
                    {jeuneActif ? `${jeuneActif.prenom} ${jeuneActif.nom}` : "Sélectionnez une conversation"}
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {loadingMessages && (
                    <div className="flex items-center gap-2 text-muted-foreground justify-center py-6">
                      <Loader2 className="animate-spin" size={18} /> Chargement...
                    </div>
                  )}

                  {!loadingMessages && messages.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Aucun message pour l'instant. Lancez la conversation !
                    </p>
                  )}

                  {!loadingMessages &&
                    messages.map((m) => {
                      const estMoi = m.expediteurId !== jeuneActifId;
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
            </div>
          )}
        </Section>
      </EspaceLayout>
    </ProtectedRoute>
  );
};