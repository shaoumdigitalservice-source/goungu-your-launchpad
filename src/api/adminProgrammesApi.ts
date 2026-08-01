import { apiFetch } from "@/lib/apiFetch";

export interface Programme {
  id: number;
  titre: string;
  tag: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  actif: boolean;
  ordreAffichage: number;
  createdAt: string;
}

export interface ProgrammeInput {
  titre: string;
  tag: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  actif: boolean;
  ordreAffichage: number;
}

export async function listerProgrammesAdmin(): Promise<Programme[]> {
  const res = await apiFetch("/programmes/admin");
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function creerProgramme(
  data: ProgrammeInput
): Promise<Programme> {
  const res = await apiFetch("/programmes", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function modifierProgramme(
  id: number,
  data: ProgrammeInput
): Promise<Programme> {
  const res = await apiFetch(`/programmes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function supprimerProgramme(id: number): Promise<void> {
  const res = await apiFetch(`/programmes/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(await res.text());
  }
}
