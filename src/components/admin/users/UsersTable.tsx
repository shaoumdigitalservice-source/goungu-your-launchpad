import { UserApi } from "@/services/users.service";
import UserRoleBadge from "./UserRoleBadge";
import UsersActionsMenu from "./UsersActionsMenu";

interface Props {
  users: UserApi[];
  allUsers?: UserApi[];
  onViewProfile?: (user: UserApi) => void;
  onChangeRole?: (user: UserApi) => void;
  onAssignMentor?: (user: UserApi) => void;
  onAssignParent?: (user: UserApi) => void;
}

function initials(prenom: string, nom: string) {
  return `${(prenom?.[0] ?? "").toUpperCase()}${(nom?.[0] ?? "").toUpperCase()}`;
}

function formatDate(d?: string | null) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("fr-FR");
  } catch {
    return "—";
  }
}

export default function UsersTable({
  users,
  allUsers,
  onViewProfile,
  onChangeRole,
  onAssignMentor,
  onAssignParent,
}: Props) {
  const hasDateInscription = users.some((u) => !!u.dateInscription);
  const mentorLookup = allUsers ?? users;
  const getMentorName = (mentorId: number | null) => {
    if (mentorId == null) return null;
    const m = mentorLookup.find((u) => u.id === mentorId);
    return m ? `${m.prenom} ${m.nom}` : null;
  };
  const getParentName = (parentId: number | null) => {
    if (parentId == null) return null;
    const p = mentorLookup.find((u) => u.id === parentId);
    return p ? `${p.prenom} ${p.nom}` : null;
  };

  return (
    <div className="overflow-x-auto rounded-2xl border bg-background">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="p-3 w-12"></th>
            <th className="p-3">Prénom</th>
            <th className="p-3">Nom</th>
            <th className="p-3">Email</th>
            <th className="p-3">Téléphone</th>
            <th className="p-3">Ville</th>
            <th className="p-3">Rôle</th>
            <th className="p-3">Mentor</th>
            <th className="p-3">Parent</th>
            {hasDateInscription && <th className="p-3">Date d'inscription</th>}
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">
                <div className="h-9 w-9 rounded-full bg-muted text-foreground/80 flex items-center justify-center text-xs font-semibold">
                  {initials(u.prenom, u.nom) || "?"}
                </div>
              </td>
              <td className="p-3">{u.prenom}</td>
              <td className="p-3">{u.nom}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.telephone || "—"}</td>
              <td className="p-3">{u.ville || "—"}</td>
              <td className="p-3">
                <UserRoleBadge role={u.role} />
              </td>
              <td className="p-3">
                {(() => {
                  const name = getMentorName(u.mentorId);
                  if (name) {
                    return <span className="text-sm">{name}</span>;
                  }
                  return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-muted text-foreground/70 border-border">
                      Non assigné
                    </span>
                  );
                })()}
              </td>
              <td className="p-3">
                {(() => {
                  const name = getParentName(u.parentId);
                  if (name) {
                    return <span className="text-sm">{name}</span>;
                  }
                  return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-muted text-foreground/70 border-border">
                      Non associé
                    </span>
                  );
                })()}
              </td>
              {hasDateInscription && (
                <td className="p-3">{formatDate(u.dateInscription)}</td>
              )}
              <td className="p-3 text-right">
                <UsersActionsMenu
                  onViewProfile={() => onViewProfile?.(u)}
                  onChangeRole={() => onChangeRole?.(u)}
                  onAssignMentor={() => onAssignMentor?.(u)}
                  canAssignMentor={u.role === "jeune"}
                  onAssignParent={() => onAssignParent?.(u)}
                  canAssignParent={u.role === "jeune"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}