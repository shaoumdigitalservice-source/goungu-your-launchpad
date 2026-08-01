import { apiFetch } from "@/lib/apiFetch";

export interface RessourcePublique {
  id: number;
  titre: string;
  description?: string;
  type: "FICHIER" | "LIEN";
  url: string;
  nomFichier?: string;
  ordreAffichage: number;
  categorie?: string;
}

export async function listerRessourcesPubliques(): Promise<RessourcePublique[]> {
  const res = await apiFetch("/ressources");
  if (!res.ok) throw new Error("Erreur lors du chargement des ressources");
  return res.json();
}
