const API_BASE_URL = "http://localhost:8082/api";

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
