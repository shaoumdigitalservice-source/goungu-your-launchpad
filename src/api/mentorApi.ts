const API_BASE_URL = "http://localhost:8082/api";

export interface MonMentor {
  assigne: boolean;
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  bio?: string;
}

export async function getMonMentor(): Promise<MonMentor> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/utilisateurs/mon-mentor`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer les infos du mentor");
  return res.json();
}

export interface Jeune {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  ville?: string;
}

export async function getMesJeunes(): Promise<Jeune[]> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/utilisateurs/mes-jeunes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer la liste de vos jeunes");
  return res.json();
}
