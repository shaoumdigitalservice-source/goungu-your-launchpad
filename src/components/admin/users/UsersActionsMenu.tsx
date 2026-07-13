import { useEffect, useRef, useState } from "react";
import { MoreVertical, Eye, UserCog, GraduationCap, Users as UsersIcon, Trash2 } from "lucide-react";

export default function UsersActionsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const items = [
    { icon: Eye, label: "Voir le profil" },
    { icon: UserCog, label: "Modifier le rôle" },
    { icon: GraduationCap, label: "Assigner un mentor" },
    { icon: UsersIcon, label: "Associer un parent" },
    { icon: Trash2, label: "Supprimer", danger: true },
  ];

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-lg hover:bg-muted text-foreground/70"
        aria-label="Actions"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-52 rounded-xl border bg-background shadow-lg z-20 py-1">
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              disabled
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-not-allowed opacity-70 hover:bg-muted ${
                it.danger ? "text-destructive" : ""
              }`}
              title="Bientôt disponible"
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}