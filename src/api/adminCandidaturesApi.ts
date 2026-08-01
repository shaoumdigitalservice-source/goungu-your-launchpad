import { apiFetch } from "@/lib/apiFetch";

export interface Candidature {
  id: number;
  name: string;
  email: string;
  phone: string;
  programme: string;
  motivation: string;
  statut: "EN_ATTENTE" | "ACCEPTEE" | "REFUSEE";
  createdAt: string;
}

export async function listerCandidatures(): Promise<Candidature[]> {
  const res = await apiFetch("/candidatures");
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function changerStatutCandidature(
  id: number,
  statut: string
): Promise<Candidature> {
  const res = await apiFetch(`/candidatures/${id}/statut?statut=${statut}`, {
    method: "PUT",
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
