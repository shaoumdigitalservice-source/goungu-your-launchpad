import { API_BASE_URL } from "@/lib/apiConfig";

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
  mentorPrenom?: string;
  mentorNom?: string;
}

export async function getRendezVousEnfant(): Promise<RendezVous[]> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/rendez-vous/parent`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer les rendez-vous");
  return res.json();
}
