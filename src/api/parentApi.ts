import { apiFetch } from "@/lib/apiFetch";

export interface Enfant {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  ville?: string;
}

export async function getMonEnfant(): Promise<Enfant[]> {
  const res = await apiFetch("/utilisateurs/mon-enfant");
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
  const res = await apiFetch("/rendez-vous/parent");
  if (!res.ok) throw new Error("Impossible de récupérer les rendez-vous");
  return res.json();
}
