const API_BASE_URL = "http://localhost:8082/api";

export interface Ressource {
  id: number;
  titre: string;
  description?: string;
  type: "FICHIER" | "LIEN";
  url: string;
  nomFichier?: string;
  actif: boolean;
  ordreAffichage: number;
  createdAt: string;
}

const authHeader = () => {
  const token = localStorage.getItem("user_token");
  return { Authorization: `Bearer ${token}` };
};

export async function listerRessourcesAdmin(): Promise<Ressource[]> {
  const res = await fetch(`${API_BASE_URL}/ressources/admin`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function creerRessourceLien(data: {
  titre: string;
  description?: string;
  url: string;
  actif: boolean;
  ordreAffichage: number;
}): Promise<Ressource> {
  const res = await fetch(`${API_BASE_URL}/ressources/lien`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

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
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function modifierRessource(
  id: number,
  data: {
    titre: string;
    description?: string;
    url: string;
    actif: boolean;
    ordreAffichage: number;
  }
): Promise<Ressource> {
  const res = await fetch(`${API_BASE_URL}/ressources/${id}`, {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function supprimerRessource(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/ressources/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error(await res.text());
}
