import { UserApi } from "@/services/users.service";

interface Props {
  parent: UserApi;
  selected?: boolean;
  onClick?: () => void;
}

function initials(prenom: string, nom: string) {
  return `${(prenom?.[0] ?? "").toUpperCase()}${(nom?.[0] ?? "").toUpperCase()}`;
}

export default function ParentCard({ parent, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
        selected
          ? "border-primary bg-primary/5 ring-2 ring-primary/30"
          : "border-border hover:bg-muted"
      }`}
    >
      <div className="h-10 w-10 rounded-full bg-muted text-foreground/80 flex items-center justify-center text-xs font-semibold shrink-0">
        {initials(parent.prenom, parent.nom) || "?"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm truncate">
          {parent.prenom} {parent.nom}
        </div>
        <div className="text-xs text-muted-foreground truncate">{parent.email}</div>
        {parent.ville && (
          <div className="text-xs text-muted-foreground truncate">{parent.ville}</div>
        )}
      </div>
    </button>
  );
}