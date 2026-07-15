import { BookOpen, FileText, CalendarDays, Calendar, Folder } from "lucide-react";

const cards = [
  { icon: BookOpen, label: "Programmes" },
  { icon: FileText, label: "Candidatures" },
  { icon: CalendarDays, label: "Sessions" },
  { icon: Calendar, label: "Événements" },
  { icon: Folder, label: "Ressources" },
];

export default function UserActivityPlaceholder() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border p-4 opacity-60 cursor-not-allowed bg-muted/30"
          aria-disabled="true"
        >
          <div className="flex items-center gap-2">
            <c.icon className="h-4 w-4 text-muted-foreground" />
            <div className="font-medium text-sm">{c.label}</div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Disponible prochainement.
          </div>
        </div>
      ))}
    </div>
  );
}