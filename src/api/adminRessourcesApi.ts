import { API_BASE_URL } from "@/lib/apiConfig";

export interface Ressource {
  id: number;
  titre: string;
  description?: string;
  type: "FICHIER" | "LIEN";
  url: string;
  nomFichier?: string;
  categorie?: string;
  actif: boolean;
  ordreAffichage: number;
  createdAt: string;
}

// Alias conforme au sprint GNG-RES-001
export type RessourceAdmin = Ressource;

export interface RessourceLienInput {
  titre: string;
  description?: string;
  url: string;
  categorie?: string;
  actif: boolean;
  ordreAffichage: number;
}

const authHeader = () => {
  const token = localStorage.getItem("user_token");
  return { Authorization: `Bearer ${token}` };
};

const authHeaders = () => ({
  ...authHeader(),
  "Content-Type": "application/json",
});

class RessourceApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const gererErreur = async (res: Response, actionFallback: string) => {
  if (res.ok) return;
  let message = actionFallback;
  try {
    const txt = await res.text();
    if (txt) message = txt;
  } catch {
    // ignore
  }
  if (res.status === 401) message = "Session expirée, veuillez vous reconnecter.";
  else if (res.status === 403) message = "Accès refusé : action réservée aux administrateurs.";
  else if (res.status >= 500) message = "Erreur serveur, veuillez réessayer plus tard.";
  throw new RessourceApiError(res.status, message);
};

export async function listerRessourcesAdmin(): Promise<Ressource[]> {
  const res = await fetch(`${API_BASE_URL}/ressources/admin`, {
    headers: authHeader(),
  });
  await gererErreur(res, "Erreur lors du chargement des ressources");
  return res.json();
}

// Alias public conforme à la nomenclature du sprint
export const listerRessources = listerRessourcesAdmin;

export async function creerRessourceLien(data: RessourceLienInput): Promise<Ressource> {
  const res = await fetch(`${API_BASE_URL}/ressources/lien`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  await gererErreur(res, "Erreur lors de la création de la ressource");
  return res.json();
}

export const creerLienRessource = creerRessourceLien;

export async function creerRessourceFichier(
  titre: string,
  description: string,
  actif: boolean,
  ordreAffichage: number,
  fichier: File
): Promise<Ressource> {
  const formData = new FormData();
  formData.append("titre", titre);
  formData.append("description", description);
  formData.append("actif", String(actif));
  formData.append("ordreAffichage", String(ordreAffichage));
  formData.append("fichier", fichier);

  const res = await fetch(`${API_BASE_URL}/ressources/fichier`, {
    method: "POST",
    headers: authHeader(),
    body: formData,
  });
  await gererErreur(res, "Erreur lors de l'upload du fichier");
  return res.json();
}

export async function modifierRessource(
  id: number,
  data: RessourceLienInput
): Promise<Ressource> {
  const res = await fetch(`${API_BASE_URL}/ressources/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  await gererErreur(res, "Erreur lors de la modification de la ressource");
  return res.json();
}

export async function supprimerRessource(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/ressources/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  await gererErreur(res, "Erreur lors de la suppression de la ressource");
}
