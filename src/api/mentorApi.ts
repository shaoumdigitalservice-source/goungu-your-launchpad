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

export interface RendezVous {
  id: number;
  mentorId: number;
  jeuneId: number;
  dateHeure: string;
  sujet: string;
  notes?: string;
  statut: "PLANIFIE" | "TERMINE" | "ANNULE";
  jeunePrenom?: string;
  jeuneNom?: string;
}

export async function getMesRendezVousMentor(): Promise<RendezVous[]> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/rendez-vous/mentor`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer vos rendez-vous");
  return res.json();
}

export async function creerRendezVous(data: { jeuneId: number; dateHeure: string; sujet: string; notes?: string }): Promise<RendezVous> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/rendez-vous`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de la création du rendez-vous");
  }
  return res.json();
}

export async function changerStatutRendezVous(id: number, statut: string): Promise<RendezVous> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/rendez-vous/${id}/statut`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ statut }),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut");
  return res.json();
}

export async function supprimerRendezVous(id: number): Promise<void> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/rendez-vous/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
}
