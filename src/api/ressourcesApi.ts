const API_BASE_URL = "http://localhost:8082/api";

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
  const res = await fetch(`${API_BASE_URL}/ressources`);
  if (!res.ok) throw new Error("Erreur lors du chargement des ressources");
  return res.json();
}
