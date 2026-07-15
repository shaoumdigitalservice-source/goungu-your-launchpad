import { Users as UsersIcon } from "lucide-react";
import { UserApi } from "@/services/users.service";

interface Props {
  user: UserApi;
  allUsers: UserApi[];
}

export default function UserParentSection({ user, allUsers }: Props) {
  const parent =
    user.parentId != null ? allUsers.find((u) => u.id === user.parentId) : null;

  if (!parent) {
    return (
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">
        Aucun parent associé
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <UsersIcon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">Parent associé</div>
        <div className="font-medium text-sm truncate">
          {parent.prenom} {parent.nom}
        </div>
        <div className="text-xs text-muted-foreground truncate">{parent.email}</div>
      </div>
    </div>
  );
}