import { apiFetch } from "@/lib/apiFetch";

export interface SessionFormation {
  id: number;
  formateurId: number;
  titre: string;
  dateHeure: string;
  description?: string;
  statut: "PLANIFIE" | "TERMINE" | "ANNULE";
}

export async function getMesSessions(): Promise<SessionFormation[]> {
  const res = await apiFetch("/sessions-formation/mes-sessions");
  if (!res.ok) throw new Error("Impossible de récupérer vos sessions");
  return res.json();
}

export async function creerSession(data: { titre: string; dateHeure: string; description?: string }): Promise<SessionFormation> {
  const res = await apiFetch("/sessions-formation", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de la création");
  }
  return res.json();
}

export async function changerStatutSession(id: number, statut: string): Promise<SessionFormation> {
  const res = await apiFetch(`/sessions-formation/${id}/statut`, {
    method: "PUT",
    body: JSON.stringify({ statut }),
  });
  if (!res.ok) throw new Error("Erreur lors du changement de statut");
  return res.json();
}

export async function supprimerSession(id: number): Promise<void> {
  const res = await apiFetch(`/sessions-formation/${id}`, { method: "DELETE" });
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
  const res = await apiFetch("/cohortes/mes-cohortes");
  if (!res.ok) throw new Error("Impossible de récupérer vos cohortes");
  return res.json();
}

export async function getJeunesDisponibles(): Promise<Jeune[]> {
  const res = await apiFetch("/cohortes/jeunes-disponibles");
  if (!res.ok) throw new Error("Impossible de récupérer les jeunes disponibles");
  return res.json();
}

export async function creerCohorte(data: { nom: string; description?: string }): Promise<Cohorte> {
  const res = await apiFetch("/cohortes", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de la création de la cohorte");
  }
  return res.json();
}

export async function gererMembreCohorte(id: number, jeuneId: number, action: "ajouter" | "retirer"): Promise<Cohorte> {
  const res = await apiFetch(`/cohortes/${id}/membres`, {
    method: "PUT",
    body: JSON.stringify({ jeuneId, action }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de la mise à jour des membres");
  }
  return res.json();
}

export async function supprimerCohorte(id: number): Promise<void> {
  const res = await apiFetch(`/cohortes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur lors de la suppression de la cohorte");
}
