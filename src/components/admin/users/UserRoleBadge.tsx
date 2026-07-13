interface Props {
  role: string;
}

const ROLE_STYLES: Record<string, string> = {
  admin: "bg-red-100 text-red-700 border-red-200",
  mentor: "bg-green-100 text-green-700 border-green-200",
  jeune: "bg-blue-100 text-blue-700 border-blue-200",
  parent: "bg-purple-100 text-purple-700 border-purple-200",
  formateur: "bg-orange-100 text-orange-700 border-orange-200",
};

export default function UserRoleBadge({ role }: Props) {
  const cls = ROLE_STYLES[role] ?? "bg-muted text-foreground/70 border-border";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {role}
    </span>
  );
}