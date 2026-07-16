import { useEffect, useRef, useState } from "react";
import { MoreVertical, Eye, Check, X } from "lucide-react";

interface Props {
  onView?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export default function CandidaturesActionsMenu({
  onView,
  onAccept,
  onReject,
}: Props = {}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

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
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onView?.();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted"
          >
            <Eye className="h-4 w-4" />
            Voir la candidature
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onAccept?.();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted"
          >
            <Check className="h-4 w-4" />
            Accepter
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onReject?.();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
            Refuser
          </button>
        </div>
      )}
    </div>
  );
}