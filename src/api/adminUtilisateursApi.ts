import { apiFetch } from "@/lib/apiFetch";

export interface UtilisateurAdmin {
  id: number;
  email: string;
  prenom: string;
  nom: string;
  role: string;
  telephone?: string;
  ville?: string;
  dateNaissance?: string;
  bio?: string;
  mentorId?: number | null;
  parentId?: number | null;
}

export async function listerUtilisateurs(): Promise<UtilisateurAdmin[]> {
  const res = await apiFetch("/utilisateurs");
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function changerRoleUtilisateur(
  id: number,
  role: string
): Promise<UtilisateurAdmin> {
  const res = await apiFetch(`/utilisateurs/${id}/role`, {
    method: "PUT",
    body: JSON.stringify({ role }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function supprimerUtilisateur(id: number): Promise<void> {
  const res = await apiFetch(`/utilisateurs/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(await res.text());
  }
}

export async function assignerMentor(
  id: number,
  mentorId: number | null
): Promise<UtilisateurAdmin> {
  const res = await apiFetch(`/utilisateurs/${id}/mentor`, {
    method: "PUT",
    body: JSON.stringify({ mentorId }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function assignerParent(
  id: number,
  parentId: number | null
): Promise<UtilisateurAdmin> {
  const res = await apiFetch(`/utilisateurs/${id}/parent`, {
    method: "PUT",
    body: JSON.stringify({ parentId }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
