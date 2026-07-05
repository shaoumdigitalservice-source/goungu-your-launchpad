import { API_BASE_URL } from "@/lib/apiConfig";

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

const authHeaders = () => {
  const token = localStorage.getItem("user_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function listerUtilisateurs(): Promise<UtilisateurAdmin[]> {
  const res = await fetch(`${API_BASE_URL}/utilisateurs`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function changerRoleUtilisateur(
  id: number,
  role: string
): Promise<UtilisateurAdmin> {
  const res = await fetch(`${API_BASE_URL}/utilisateurs/${id}/role`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ role }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function supprimerUtilisateur(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/utilisateurs/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
}

export async function assignerMentor(
  id: number,
  mentorId: number | null
): Promise<UtilisateurAdmin> {
  const res = await fetch(`${API_BASE_URL}/utilisateurs/${id}/mentor`, {
    method: "PUT",
    headers: authHeaders(),
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
  const res = await fetch(`${API_BASE_URL}/utilisateurs/${id}/parent`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ parentId }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
