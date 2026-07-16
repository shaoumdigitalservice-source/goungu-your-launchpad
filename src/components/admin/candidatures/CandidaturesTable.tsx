import { CandidatureApi } from "@/services/candidatures.service";
import CandidatureBadge from "./CandidatureBadge";
import CandidaturesActionsMenu from "./CandidaturesActionsMenu";

interface Props {
  candidatures: CandidatureApi[];
  onView?: (c: CandidatureApi) => void;
  onAccept?: (c: CandidatureApi) => void;
}

export default function CandidaturesTable({ candidatures, onView, onAccept }: Props) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-2xl border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Téléphone</th>
              <th className="p-3">Programme</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidatures.map((c, i) => (
              <tr key={c.id ?? `${c.email}-${i}`} className="border-t">
                <td className="p-3">{c.name || "—"}</td>
                <td className="p-3">{c.email || "—"}</td>
                <td className="p-3">{c.phone || "—"}</td>
                <td className="p-3">{c.programme || "—"}</td>
                <td className="p-3">
                  <CandidatureBadge statut={c.statut} />
                </td>
                <td className="p-3 text-right">
                  <CandidaturesActionsMenu
                    onView={() => onView?.(c)}
                    onAccept={() => onAccept?.(c)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {candidatures.map((c, i) => (
          <div
            key={c.id ?? `${c.email}-${i}`}
            className="rounded-2xl border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-medium truncate">{c.name || "—"}</div>
                <div className="text-xs text-muted-foreground truncate">{c.email}</div>
                <div className="text-xs text-muted-foreground">{c.phone}</div>
              </div>
              <CandidaturesActionsMenu
                onView={() => onView?.(c)}
                onAccept={() => onAccept?.(c)}
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="text-sm">{c.programme || "—"}</div>
              <CandidatureBadge statut={c.statut} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}