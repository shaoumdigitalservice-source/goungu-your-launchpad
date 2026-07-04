const API_BASE_URL = "http://localhost:8082/api";

export interface PasseportEntree {
  id: number;
  jeuneId: number;
  type: "COMPETENCE" | "REALISATION";
  titre: string;
  description?: string;
  createdAt: string;
}

function getToken(): string | null {
  return localStorage.getItem("user_token");
}

export async function getMonPasseport(): Promise<PasseportEntree[]> {
  const res = await fetch(`${API_BASE_URL}/passeport/mon-passeport`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer votre passeport");
  return res.json();
}

export async function ajouterEntreePasseport(data: { type: string; titre: string; description?: string }): Promise<PasseportEntree> {
  const res = await fetch(`${API_BASE_URL}/passeport`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de l'ajout");
  }
  return res.json();
}

export async function supprimerEntreePasseport(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/passeport/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
}
