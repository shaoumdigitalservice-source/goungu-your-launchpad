const API_BASE_URL = "http://localhost:8082/api";

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

const authHeaders = () => {
  const token = localStorage.getItem("user_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function listerProgrammesAdmin(): Promise<Programme[]> {
  const res = await fetch(`${API_BASE_URL}/programmes/admin`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function creerProgramme(
  data: ProgrammeInput
): Promise<Programme> {
  const res = await fetch(`${API_BASE_URL}/programmes`, {
    method: "POST",
    headers: authHeaders(),
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
  const res = await fetch(`${API_BASE_URL}/programmes/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function supprimerProgramme(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/programmes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
}
