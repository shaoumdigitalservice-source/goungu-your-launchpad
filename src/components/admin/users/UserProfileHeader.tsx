import { X } from "lucide-react";
import { UserApi } from "@/services/users.service";
import UserRoleBadge from "./UserRoleBadge";

interface Props {
  user: UserApi;
  onClose: () => void;
}

function initials(prenom: string, nom: string) {
  return `${(prenom?.[0] ?? "").toUpperCase()}${(nom?.[0] ?? "").toUpperCase()}`;
}

export default function UserProfileHeader({ user, onClose }: Props) {
  return (
    <div className="flex items-start justify-between gap-3 pb-4 border-b">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-14 w-14 rounded-full bg-muted text-foreground/80 flex items-center justify-center text-sm font-semibold shrink-0">
          {initials(user.prenom, user.nom) || "?"}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-base truncate">
            {user.prenom} {user.nom}
          </div>
          <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          <div className="mt-1">
            <UserRoleBadge role={user.role} />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="p-2 rounded-lg hover:bg-muted text-foreground/70"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}