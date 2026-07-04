import { API_BASE_URL } from "@/lib/apiConfig";

export interface EvenementPublic {
  id: number;
  titre: string;
  description?: string;
  dateEvenement: string;
  lieu: string;
}

export async function listerEvenementsPublics(): Promise<EvenementPublic[]> {
  const res = await fetch(`${API_BASE_URL}/evenements`);
  if (!res.ok) throw new Error("Erreur lors du chargement des événements");
  return res.json();
}
