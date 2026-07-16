interface Props {
  statut: string;
}

const STYLES: Record<string, string> = {
  EN_ATTENTE: "bg-orange-100 text-orange-700 border-orange-200",
  ACCEPTEE: "bg-green-100 text-green-700 border-green-200",
  REFUSEE: "bg-red-100 text-red-700 border-red-200",
};

export default function CandidatureBadge({ statut }: Props) {
  const cls = STYLES[statut] ?? "bg-muted text-foreground/70 border-border";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      {statut}
    </span>
  );
}