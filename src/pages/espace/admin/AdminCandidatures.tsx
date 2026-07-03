import { useEffect, useState } from "react";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import {
  listerCandidatures,
  changerStatutCandidature,
  Candidature,
} from "@/api/adminCandidaturesApi";
import { Loader2 } from "lucide-react";

const STATUTS = ["EN_ATTENTE", "ACCEPTEE", "REFUSEE"] as const;

const statutStyle = (statut: string) => {
  switch (statut) {
    case "ACCEPTEE":
      return "bg-green-100 text-green-700";
    case "REFUSEE":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const statutLabel = (statut: string) => {
  switch (statut) {
    case "ACCEPTEE":
      return "Acceptée";
    case "REFUSEE":
      return "Refusée";
    default:
      return "En attente";
  }
};

export default function AdminCandidatures() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCoursId, setEnCoursId] = useState<number | null>(null);
  const [filtre, setFiltre] = useState<string>("TOUS");

  const charger = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const data = await listerCandidatures();
      setCandidatures(data);
    } catch (e: any) {
      setErreur(e.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const handleChangerStatut = async (id: number, statut: string) => {
    setEnCoursId(id);
    try {
      const maj = await changerStatutCandidature(id, statut);
      setCandidatures((prev) =>
        prev.map((c) => (c.id === id ? maj : c))
      );
    } catch (e: any) {
      alert(e.message || "Erreur lors du changement de statut");
    } finally {
      setEnCoursId(null);
    }
  };

  const candidaturesAffichees =
    filtre === "TOUS"
      ? candidatures
      : candidatures.filter((c) => c.statut === filtre);

  return (
    <EspaceLayout title="Candidatures" role="admin" items={adminNavItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold">Gestion des candidatures</h1>
          <select
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
            className="border rounded-md px-3 py-1.5 bg-background text-sm"
          >
            <option value="TOUS">Tous les statuts</option>
            <option value="EN_ATTENTE">En attente</option>
            <option value="ACCEPTEE">Acceptées</option>
            <option value="REFUSEE">Refusées</option>
          </select>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin" size={18} /> Chargement...
          </div>
        )}

        {erreur && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            {erreur}
          </div>
        )}

        {!loading && !erreur && candidaturesAffichees.length === 0 && (
          <div className="text-muted-foreground text-sm">
            Aucune candidature à afficher.
          </div>
        )}

        {!loading && !erreur && candidaturesAffichees.length > 0 && (
          <div className="space-y-4">
            {candidaturesAffichees.map((c) => (
              <div
                key={c.id}
                className="border rounded-lg p-4 bg-background"
              >
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.email} · {c.phone}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statutStyle(
                      c.statut
                    )}`}
                  >
                    {statutLabel(c.statut)}
                  </span>
                </div>

                <div className="text-sm mb-2">
                  <span className="font-medium">Programme : </span>
                  {c.programme}
                </div>

                {c.motivation && (
                  <div className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">
                    {c.motivation}
                  </div>
                )}

                <div className="text-xs text-muted-foreground mb-3">
                  Reçue le {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                </div>

                <div className="flex gap-2">
                  {STATUTS.filter((s) => s !== c.statut).map((s) => (
                    <button
                      key={s}
                      disabled={enCoursId === c.id}
                      onClick={() => handleChangerStatut(c.id, s)}
                      className="text-xs px-3 py-1.5 rounded-md border hover:bg-muted disabled:opacity-40"
                    >
                      Marquer {statutLabel(s).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </EspaceLayout>
  );
}