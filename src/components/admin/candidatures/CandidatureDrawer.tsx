import { useEffect, useState } from "react";
import { AlertTriangle, Check, RefreshCw, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CandidatureApi,
  CandidaturesServiceError,
  fetchCandidatureById,
} from "@/services/candidatures.service";
import CandidatureHeader from "./CandidatureHeader";
import CandidatureInfo from "./CandidatureInfo";
import CandidatureMotivation from "./CandidatureMotivation";

interface Props {
  open: boolean;
  candidatureId: number | null;
  fallbackCandidature?: CandidatureApi | null;
  onOpenChange: (open: boolean) => void;
}

export default function CandidatureDrawer({
  open,
  candidatureId,
  fallbackCandidature,
  onOpenChange,
}: Props) {
  const navigate = useNavigate();
  const [candidature, setCandidature] = useState<CandidatureApi | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const load = async () => {
    if (!candidatureId) return;
    setLoading(true);
    setErrorStatus(null);
    try {
      const data = await fetchCandidatureById(candidatureId);
      setCandidature(data);
    } catch (e) {
      const status = e instanceof CandidaturesServiceError ? e.status : 500;
      if (status === 401) {
        navigate("/auth");
        return;
      }
      setErrorStatus(status);
      if (fallbackCandidature) setCandidature(fallbackCandidature);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && candidatureId) {
      setCandidature(fallbackCandidature ?? null);
      load();
    } else if (!open) {
      setCandidature(null);
      setErrorStatus(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, candidatureId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto p-0">
        <div className="p-5 sm:p-6 space-y-5">
          {loading && !candidature && (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          )}

          {!loading && errorStatus === 404 && !candidature && (
            <div className="rounded-2xl border p-6 flex flex-col items-center text-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div className="font-medium">Candidature introuvable</div>
              <div className="text-sm text-muted-foreground">
                Cette candidature n'existe plus ou a été supprimée.
              </div>
            </div>
          )}

          {!loading && errorStatus === 403 && !candidature && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 text-destructive p-6 text-sm">
              Accès réservé aux administrateurs.
            </div>
          )}

          {!loading &&
            errorStatus !== null &&
            errorStatus !== 404 &&
            errorStatus !== 403 &&
            !candidature && (
              <div className="rounded-2xl border p-6 flex flex-col items-center text-center gap-3">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <div className="font-medium">Une erreur est survenue</div>
                <div className="text-sm text-muted-foreground">
                  Impossible de charger la candidature.
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

          {candidature && (
            <>
              <CandidatureHeader candidature={candidature} />
              <CandidatureMotivation motivation={candidature.motivation} />
              <CandidatureInfo candidature={candidature} />

              <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  disabled
                  title="Bientôt disponible"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium opacity-60 cursor-not-allowed"
                >
                  <X className="h-4 w-4" />
                  Refuser
                </button>
                <button
                  type="button"
                  disabled
                  title="Bientôt disponible"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium opacity-60 cursor-not-allowed"
                >
                  <Check className="h-4 w-4" />
                  Accepter
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}