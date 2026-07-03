const API_BASE_URL = "http://localhost:8082/api";

export interface Evenement {
  id: number;
  titre: string;
  description?: string;
  dateEvenement: string;
  lieu: string;
  actif: boolean;
  createdAt: string;
}

export interface EvenementInput {
  titre: string;
  description?: string;
  dateEvenement: string;
  lieu: string;
  actif: boolean;
}

const authHeaders = () => {
  const token = localStorage.getItem("user_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function listerEvenementsAdmin(): Promise<Evenement[]> {
  const res = await fetch(`${API_BASE_URL}/evenements/admin`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function creerEvenement(data: EvenementInput): Promise<Evenement> {
  const res = await fetch(`${API_BASE_URL}/evenements`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function modifierEvenement(
  id: number,
  data: EvenementInput
): Promise<Evenement> {
  const res = await fetch(`${API_BASE_URL}/evenements/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function supprimerEvenement(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/evenements/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
}
