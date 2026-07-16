interface Props {
  value: string;
  onChange: (v: string) => void;
}

const OPTIONS = [
  { value: "TOUS", label: "Tous" },
  { value: "EN_ATTENTE", label: "EN_ATTENTE" },
  { value: "ACCEPTEE", label: "ACCEPTEE" },
  { value: "REFUSEE", label: "REFUSEE" },
];

export default function CandidaturesFilter({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}