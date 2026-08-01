import { apiFetch } from "@/lib/apiFetch";

export interface EvenementPublic {
  id: number;
  titre: string;
  description?: string;
  dateEvenement: string;
  lieu: string;
}

export async function listerEvenementsPublics(): Promise<EvenementPublic[]> {
  const res = await apiFetch("/evenements");
  if (!res.ok) throw new Error("Erreur lors du chargement des événements");
  return res.json();
}
