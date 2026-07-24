import { useEffect, useState } from "react";
import { listerEvenementsPublics, EvenementPublic } from "@/api/evenementsApi";

interface Props {
  onHeightChange?: (h: number) => void;
}

const EventsTicker = ({ onHeightChange }: Props) => {
  const [events, setEvents] = useState<EvenementPublic[]>([]);

  useEffect(() => {
    let cancelled = false;
    listerEvenementsPublics()
      .then((data) => {
        if (cancelled) return;
        const now = new Date();
        const futurs = data
          .filter((e) => new Date(e.dateEvenement).getTime() > now.getTime())
          .sort(
            (a, b) =>
              new Date(a.dateEvenement).getTime() -
              new Date(b.dateEvenement).getTime()
          );
        setEvents(futurs);
      })
      .catch(() => {
        // silencieux
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (onHeightChange) onHeightChange(events.length > 0 ? 36 : 0);
  }, [events.length, onHeightChange]);

  if (events.length === 0) return null;

  const formatEvent = (e: EvenementPublic) => {
    const d = new Date(e.dateEvenement);
    const date = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
    return `${e.titre} — ${date} — ${e.lieu}`;
  };

  const items = [...events, ...events];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 overflow-hidden bg-primary text-primary-foreground text-xs flex items-center border-b border-primary/20"
      role="region"
      aria-label="Prochains événements"
    >
      <div className="flex whitespace-nowrap animate-events-ticker">
        {items.map((e, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6">
            <span>{formatEvent(e)}</span>
            <span aria-hidden="true">•</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes events-ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-events-ticker {
          animation: events-ticker-scroll 40s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default EventsTicker;