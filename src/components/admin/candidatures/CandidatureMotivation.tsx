interface Props {
  motivation?: string | null;
}

export default function CandidatureMotivation({ motivation }: Props) {
  const value = motivation && motivation.trim() ? motivation : "Non renseigné";
  return (
    <div className="rounded-2xl border bg-background p-5">
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
        Motivation
      </div>
      <p className="text-[0.95rem] leading-7 whitespace-pre-wrap break-words text-foreground">
        {value}
      </p>
    </div>
  );
}