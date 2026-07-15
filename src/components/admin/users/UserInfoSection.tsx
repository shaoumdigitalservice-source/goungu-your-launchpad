import { UserApi } from "@/services/users.service";

interface Props {
  user: UserApi;
}

function formatDate(d?: string | null) {
  if (!d) return null;
  try {
    return new Date(d).toLocaleDateString("fr-FR");
  } catch {
    return null;
  }
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="space-y-0.5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">
        {value && value.trim() !== "" ? value : (
          <span className="text-muted-foreground italic">Non renseigné</span>
        )}
      </div>
    </div>
  );
}

export default function UserInfoSection({ user }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Prénom" value={user.prenom} />
      <Field label="Nom" value={user.nom} />
      <Field label="Email" value={user.email} />
      <Field label="Téléphone" value={user.telephone} />
      <Field label="Ville" value={user.ville} />
      <Field label="Date de naissance" value={formatDate(user.dateNaissance)} />
      <div className="sm:col-span-2">
        <Field label="Bio" value={user.bio} />
      </div>
    </div>
  );
}