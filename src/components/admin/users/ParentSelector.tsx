import { useEffect, useMemo, useRef } from "react";
import { Search } from "lucide-react";
import { UserApi } from "@/services/users.service";
import ParentCard from "./ParentCard";

interface Props {
  parents: UserApi[];
  search: string;
  onSearchChange: (v: string) => void;
  selectedId: number | null;
  onSelect: (id: number) => void;
  autoFocus?: boolean;
}

export default function ParentSelector({
  parents,
  search,
  onSearchChange,
  selectedId,
  onSelect,
  autoFocus,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    const onlyParents = parents.filter((p) => p.role === "parent");
    if (!s) return onlyParents;
    return onlyParents.filter(
      (p) =>
        p.prenom?.toLowerCase().includes(s) ||
        p.nom?.toLowerCase().includes(s) ||
        p.email?.toLowerCase().includes(s)
    );
  }, [parents, search]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par prénom, nom ou email…"
          className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
        {filtered.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-6">
            Aucun parent trouvé.
          </div>
        ) : (
          filtered.map((p) => (
            <ParentCard
              key={p.id}
              parent={p}
              selected={selectedId === p.id}
              onClick={() => onSelect(p.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}