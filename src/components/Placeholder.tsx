import { Sparkles } from "lucide-react";

/** Badge discret marquant les contenus à remplacer par les vraies données. */
export const Placeholder = ({ label = "À personnaliser" }: { label?: string }) => (
  <span
    title="Donnée fictive — à remplacer par votre contenu réel"
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 text-[10px] font-medium uppercase tracking-wider text-accent-foreground/80 border border-accent/30"
  >
    <Sparkles className="h-2.5 w-2.5" /> {label}
  </span>
);

export default Placeholder;