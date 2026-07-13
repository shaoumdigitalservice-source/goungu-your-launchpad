interface Props {
  value: string;
  onChange: (v: string) => void;
}

const OPTIONS = [
  { value: "tous", label: "Tous" },
  { value: "admin", label: "Admin" },
  { value: "jeune", label: "Jeune" },
  { value: "mentor", label: "Mentor" },
  { value: "parent", label: "Parent" },
  { value: "formateur", label: "Formateur" },
];

export default function UsersFilter({ value, onChange }: Props) {
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