const API_BASE_URL = "http://localhost:8082/api";

export interface Enfant {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  ville?: string;
}

export async function getMonEnfant(): Promise<Enfant[]> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/utilisateurs/mon-enfant`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer les infos de votre enfant");
  return res.json();
}
