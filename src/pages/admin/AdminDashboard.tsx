import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCandidatures, getMessagesContact, changerStatutCandidature, marquerMessageLu, isLoggedIn } from "@/lib/adminApi";
import AdminLayout from "@/components/admin/AdminLayout";
import { Users, Mail, Clock } from "lucide-react";

interface Candidature {
  id: number;
  name: string;
  email: string;
  phone: string;
  programme: string;
  motivation: string;
  statut: string;
  createdAt: string;
}

interface MessageContact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  lu: boolean;
  createdAt: string;
}

const AdminDashboard = () => {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [messages, setMessages] = useState<MessageContact[]>([]);
  const [onglet, setOnglet] = useState<"candidatures" | "messages">("candidatures");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/admin/login");
      return;
    }
    chargerDonnees();
  }, []);

  const chargerDonnees = async () => {
    setLoading(true);
    try {
      const [cands, msgs] = await Promise.all([getCandidatures(), getMessagesContact()]);
      setCandidatures(cands);
      setMessages(msgs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatut = async (id: number, statut: string) => {
    await changerStatutCandidature(id, statut);
    chargerDonnees();
  };

  const handleLu = async (id: number) => {
    await marquerMessageLu(id);
    chargerDonnees();
  };

  if (loading) {
    return (
      <AdminLayout title="Vue d'ensemble">
        <p className="text-muted-foreground">Chargement...</p>
      </AdminLayout>
    );
  }

  const enAttente = candidatures.filter((c) => c.statut === "EN_ATTENTE").length;
  const nonLus = messages.filter((m) => !m.lu).length;

  return (
    <AdminLayout title="Vue d'ensemble">
      {/* Stats cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{candidatures.length}</div>
              <div className="text-xs text-muted-foreground">Candidatures totales</div>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-700" />
            </div>
            <div>
              <div className="text-2xl font-bold">{enAttente}</div>
              <div className="text-xs text-muted-foreground">En attente</div>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{nonLus}</div>
              <div className="text-xs text-muted-foreground">Messages non lus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setOnglet("candidatures")}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${onglet === "candidatures" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          Candidatures ({candidatures.length})
        </button>
        <button
          onClick={() => setOnglet("messages")}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${onglet === "messages" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          Messages ({nonLus} non lus)
        </button>
      </div>

      {onglet === "candidatures" && (
        <div className="space-y-3">
          {candidatures.length === 0 && <p className="text-muted-foreground">Aucune candidature.</p>}
          {candidatures.map((c) => (
            <div key={c.id} className="bg-card border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.email} · {c.phone}</p>
                  <p className="text-sm mt-1"><strong>Programme :</strong> {c.programme}</p>
                  {c.motivation && <p className="text-sm mt-1 text-muted-foreground">{c.motivation}</p>}
                  <p className="text-xs text-muted-foreground mt-2">{new Date(c.createdAt).toLocaleString("fr-FR")}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    c.statut === "ACCEPTEE" ? "bg-green-100 text-green-700" :
                    c.statut === "REFUSEE" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {c.statut}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleStatut(c.id, "ACCEPTEE")} className="text-xs px-3 py-1.5 rounded-full bg-green-600 text-white">Accepter</button>
                    <button onClick={() => handleStatut(c.id, "REFUSEE")} className="text-xs px-3 py-1.5 rounded-full bg-red-600 text-white">Refuser</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {onglet === "messages" && (
        <div className="space-y-3">
          {messages.length === 0 && <p className="text-muted-foreground">Aucun message.</p>}
          {messages.map((m) => (
            <div key={m.id} className={`bg-card border rounded-xl p-5 ${!m.lu ? "border-primary" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold">{m.name} {!m.lu && <span className="text-xs text-primary ml-2">● Nouveau</span>}</h3>
                  <p className="text-sm text-muted-foreground">{m.email}</p>
                  <p className="text-sm mt-1"><strong>{m.subject}</strong></p>
                  <p className="text-sm mt-1 text-muted-foreground">{m.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(m.createdAt).toLocaleString("fr-FR")}</p>
                </div>
                {!m.lu && (
                  <button onClick={() => handleLu(m.id)} className="text-xs px-3 py-1.5 rounded-full bg-primary text-primary-foreground whitespace-nowrap">
                    Marquer lu
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;