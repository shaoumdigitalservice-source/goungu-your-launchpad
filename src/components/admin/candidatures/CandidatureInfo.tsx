import { CandidatureApi } from "@/services/candidatures.service";

interface Props {
  candidature: CandidatureApi;
}

const fallback = (v?: string | null) => (v && v.trim() ? v : "Non renseigné");

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-xl border bg-background p-3">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm break-words">{fallback(value)}</div>
    </div>
  );
}

export default function CandidatureInfo({ candidature }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label="Nom" value={candidature.name} />
      <Field label="Email" value={candidature.email} />
      <Field label="Téléphone" value={candidature.phone} />
      <Field label="Programme" value={candidature.programme} />
    </div>
  );
}