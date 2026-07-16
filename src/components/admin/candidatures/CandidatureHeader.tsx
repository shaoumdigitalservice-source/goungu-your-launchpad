import { CandidatureApi } from "@/services/candidatures.service";
import CandidatureBadge from "./CandidatureBadge";

interface Props {
  candidature: CandidatureApi;
}

const fallback = (v?: string | null) => (v && v.trim() ? v : "Non renseigné");

export default function CandidatureHeader({ candidature }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-lg font-semibold truncate">
            {fallback(candidature.name)}
          </div>
          <div className="text-sm text-muted-foreground truncate">
            {fallback(candidature.email)}
          </div>
          <div className="text-sm text-muted-foreground">
            {fallback(candidature.phone)}
          </div>
        </div>
        <CandidatureBadge statut={candidature.statut} />
      </div>
      <div className="rounded-xl border bg-muted/40 px-3 py-2 text-sm">
        <span className="text-muted-foreground">Programme demandé : </span>
        <span className="font-medium">{fallback(candidature.programme)}</span>
      </div>
    </div>
  );
}