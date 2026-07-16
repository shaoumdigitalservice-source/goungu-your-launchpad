import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, AlertTriangle } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "@/pages/espace/EspaceLayout";
import { adminNavItems } from "@/pages/espace/AdminPages";
import {
  fetchCandidatures,
  CandidatureApi,
  CandidaturesServiceError,
} from "@/services/candidatures.service";
import CandidaturesTable from "@/components/admin/candidatures/CandidaturesTable";
import CandidaturesSearch from "@/components/admin/candidatures/CandidaturesSearch";
import CandidaturesFilter from "@/components/admin/candidatures/CandidaturesFilter";
import CandidaturesLoading from "@/components/admin/candidatures/CandidaturesLoading";
import CandidaturesEmpty from "@/components/admin/candidatures/CandidaturesEmpty";

export default function CandidaturesPage() {
  const navigate = useNavigate();
  const [candidatures, setCandidatures] = useState<CandidatureApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("TOUS");

  const load = async () => {
    setLoading(true);
    setErrorStatus(null);
    try {
      const data = await fetchCandidatures();
      setCandidatures(data);
    } catch (e) {
      const status = e instanceof CandidaturesServiceError ? e.status : 500;
      if (status === 401) {
        navigate("/auth");
        return;
      }
      setErrorStatus(status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return candidatures.filter((c) => {
      if (statut !== "TOUS" && c.statut !== statut) return false;
      if (!s) return true;
      return (
        c.name?.toLowerCase().includes(s) ||
        c.email?.toLowerCase().includes(s) ||
        c.phone?.toLowerCase().includes(s)
      );
    });
  }, [candidatures, search, statut]);

  return (
    <ProtectedRoute roles={["admin"]}>
      <EspaceLayout title="Candidatures" role="admin" items={adminNavItems}>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Consultez toutes les candidatures reçues.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <CandidaturesSearch value={search} onChange={setSearch} />
            <CandidaturesFilter value={statut} onChange={setStatut} />
          </div>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </button>
        </div>

        {loading && <CandidaturesLoading />}

        {!loading && errorStatus === 403 && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 text-destructive p-6 text-sm">
            Accès réservé aux administrateurs.
          </div>
        )}

        {!loading && errorStatus !== null && errorStatus !== 403 && (
          <div className="rounded-2xl border p-6 flex flex-col items-center text-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div className="font-medium">Une erreur est survenue</div>
            <div className="text-sm text-muted-foreground">
              Impossible de charger les candidatures.
            </div>
            <button
              type="button"
              onClick={load}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
            >
              <RefreshCw className="h-4 w-4" />
              Réessayer
            </button>
          </div>
        )}

        {!loading && errorStatus === null && filtered.length === 0 && (
          <CandidaturesEmpty />
        )}

        {!loading && errorStatus === null && filtered.length > 0 && (
          <CandidaturesTable candidatures={filtered} />
        )}
      </EspaceLayout>
    </ProtectedRoute>
  );
}