import { UserApi } from "@/services/users.service";
import UserRoleBadge from "./UserRoleBadge";
import UsersActionsMenu from "./UsersActionsMenu";

interface Props {
  users: UserApi[];
  onChangeRole?: (user: UserApi) => void;
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

export default function UsersTable({ users, onChangeRole }: Props) {
  const hasDateInscription = users.some((u) => !!u.dateInscription);

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
              {hasDateInscription && (
                <td className="p-3">{formatDate(u.dateInscription)}</td>
              )}
              <td className="p-3 text-right">
                <UsersActionsMenu onChangeRole={() => onChangeRole?.(u)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}