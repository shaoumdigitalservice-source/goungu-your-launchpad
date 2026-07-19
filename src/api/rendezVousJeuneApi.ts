import { API_BASE_URL } from "@/lib/apiConfig";
import type { RendezVous } from "@/api/mentorApi";

export type { RendezVous } from "@/api/mentorApi";

export async function getMesRendezVousJeune(): Promise<RendezVous[]> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/rendez-vous/jeune`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer vos rendez-vous");
  return res.json();
}