import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  CandidatureApi,
  CandidaturesServiceError,
  rejectCandidature,
} from "@/services/candidatures.service";

interface Props {
  open: boolean;
  candidature: CandidatureApi | null;
  onOpenChange: (open: boolean) => void;
  onRejected?: (updated: CandidatureApi) => void;
}

export default function RejectCandidatureDialog({
  open,
  candidature,
  onOpenChange,
  onRejected,
}: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!candidature?.id || loading) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await rejectCandidature(candidature.id);
      const next: CandidatureApi = {
        ...candidature,
        ...updated,
        statut: "REFUSEE",
      };
      onRejected?.(next);
      toast({
        title: "Candidature refusée",
        description: "La candidature a été refusée avec succès.",
      });
      onOpenChange(false);
    } catch (e) {
      const err = e as CandidaturesServiceError;
      const status = err?.status ?? 500;
      if (status === 401) {
        navigate("/auth");
        return;
      }
      if (status === 403) {
        setError("Vous n'avez pas les droits nécessaires.");
      } else if (status === 404) {
        setError("Cette candidature n'existe plus.");
      } else if (status === 400) {
        setError(err?.message?.trim() || "Requête invalide.");
      } else {
        setError("Une erreur serveur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (loading) return;
        if (!o) setError(null);
        onOpenChange(o);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Refuser cette candidature ?</DialogTitle>
          <DialogDescription>
            Cette action modifiera le statut de la candidature. Voulez-vous
            continuer ?
          </DialogDescription>
        </DialogHeader>

        {candidature && (
          <div className="rounded-xl border bg-muted/40 px-3 py-2 text-sm">
            <div className="font-medium">{candidature.name || "—"}</div>
            <div className="text-muted-foreground text-xs">
              {candidature.email}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 text-destructive p-3 text-sm">
            {error}
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl border text-sm font-medium hover:bg-muted disabled:opacity-60"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleConfirm}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
            Refuser
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}