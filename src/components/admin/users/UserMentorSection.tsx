import { GraduationCap } from "lucide-react";
import { UserApi } from "@/services/users.service";

interface Props {
  user: UserApi;
  allUsers: UserApi[];
}

export default function UserMentorSection({ user, allUsers }: Props) {
  const mentor =
    user.mentorId != null ? allUsers.find((u) => u.id === user.mentorId) : null;

  if (!mentor) {
    return (
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">
        Aucun mentor assigné
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <GraduationCap className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">Mentor assigné</div>
        <div className="font-medium text-sm truncate">
          {mentor.prenom} {mentor.nom}
        </div>
        <div className="text-xs text-muted-foreground truncate">{mentor.email}</div>
      </div>
    </div>
  );
}