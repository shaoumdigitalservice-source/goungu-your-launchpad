import { API_BASE_URL } from "@/lib/apiConfig";

export interface SessionFormation {
  id: number;
  formateurId: number;
  titre: string;
  dateHeure: string;
  description?: string;
  statut: "PLANIFIE" | "TERMINE" | "ANNULE";
}

function getToken(): string | null {
  return localStorage.getItem("user_token");
}

export async function getMesSessions(): Promise<SessionFormation[]> {
  const res = await fetch(`${API_BASE_URL}/sessions-formation/mes-sessions`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer vos sessions");
  return res.json();
}

export async function creerSession(data: { titre: string; dateHeure: string; description?: string }): Promise<SessionFormation> {
  const res = await fetch(`${API_BASE_URL}/sessions-formation`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de la création");
  }
  return res.json();
}

export async function changerStatutSession(id: number, statut: string): Promise<SessionFormation> {
  const res = await fetch(`${API_BASE_URL}/sessions-formation/${id}/statut`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ statut }),
  });
  if (!res.ok) throw new Error("Erreur lors du changement de statut");
  return res.json();
}

export async function supprimerSession(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/sessions-formation/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
}

export interface Jeune {
  id: number;
  prenom: string;
  nom: string;
  email: string;
}

export interface Cohorte {
  id: number;
  formateurId: number;
  nom: string;
  description?: string;
  jeuneIds: number[];
  membres: Jeune[];
}

export async function getMesCohortes(): Promise<Cohorte[]> {
  const res = await fetch(`${API_BASE_URL}/cohortes/mes-cohortes`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer vos cohortes");
  return res.json();
}

export async function getJeunesDisponibles(): Promise<Jeune[]> {
  const res = await fetch(`${API_BASE_URL}/cohortes/jeunes-disponibles`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer les jeunes disponibles");
  return res.json();
}

export async function creerCohorte(data: { nom: string; description?: string }): Promise<Cohorte> {
  const res = await fetch(`${API_BASE_URL}/cohortes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de la création de la cohorte");
  }
  return res.json();
}

export async function gererMembreCohorte(id: number, jeuneId: number, action: "ajouter" | "retirer"): Promise<Cohorte> {
  const res = await fetch(`${API_BASE_URL}/cohortes/${id}/membres`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ jeuneId, action }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de la mise à jour des membres");
  }
  return res.json();
}

export async function supprimerCohorte(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/cohortes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de la cohorte");
}
