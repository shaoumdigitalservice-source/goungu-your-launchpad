import { API_BASE_URL } from "@/lib/apiConfig";

export interface Evenement {
  id: number;
  titre: string;
  description?: string;
  dateEvenement: string;
  lieu: string;
  actif: boolean;
  createdAt: string;
}

// Alias conforme au sprint GNG-EVENT-001
export type EvenementAdmin = Evenement;

export interface EvenementInput {
  titre: string;
  description?: string;
  dateEvenement: string;
  lieu: string;
  actif: boolean;
}

const authHeaders = () => {
  const token = localStorage.getItem("user_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

class EvenementApiError extends Error {
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
  throw new EvenementApiError(res.status, message);
};

export async function listerEvenementsAdmin(): Promise<Evenement[]> {
  const res = await fetch(`${API_BASE_URL}/evenements/admin`, {
    headers: authHeaders(),
  });
  await gererErreur(res, "Erreur lors du chargement des événements");
  return res.json();
}

// Alias public conforme à la nomenclature du sprint
export const listerEvenements = listerEvenementsAdmin;

export async function creerEvenement(data: EvenementInput): Promise<Evenement> {
  const res = await fetch(`${API_BASE_URL}/evenements`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  await gererErreur(res, "Erreur lors de la création de l'événement");
  return res.json();
}

export async function modifierEvenement(
  id: number,
  data: EvenementInput
): Promise<Evenement> {
  const res = await fetch(`${API_BASE_URL}/evenements/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  await gererErreur(res, "Erreur lors de la modification de l'événement");
  return res.json();
}

export async function supprimerEvenement(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/evenements/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  await gererErreur(res, "Erreur lors de la suppression de l'événement");
}
