import { apiFetch } from "@/lib/apiFetch";
import type { RendezVous } from "@/api/mentorApi";

export type { RendezVous } from "@/api/mentorApi";

export async function getMesRendezVousJeune(): Promise<RendezVous[]> {
  const res = await apiFetch("/rendez-vous/jeune");
  if (!res.ok) throw new Error("Impossible de récupérer vos rendez-vous");
  return res.json();
}
