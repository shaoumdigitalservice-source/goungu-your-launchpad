import { API_BASE_URL } from "@/lib/apiConfig";

export async function login(email: string, motDePasse: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motDePasse }),
  });
  if (!response.ok) {
    throw new Error("Email ou mot de passe incorrect");
  }
  return response.json();
}

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("admin_token");
}

async function fetchAvecToken(url: string, options: RequestInit = {}) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401 || response.status === 403) {
    logout();
    window.location.href = "/admin/login";
    throw new Error("Session expirée");
  }
  return response;
}

export async function getCandidatures() {
  const res = await fetchAvecToken("/candidatures");
  return res.json();
}

export async function getMessagesContact() {
  const res = await fetchAvecToken("/contact");
  return res.json();
}

export async function changerStatutCandidature(id: number, statut: string) {
  const res = await fetchAvecToken(`/candidatures/${id}/statut?statut=${statut}`, {
    method: "PUT",
  });
  return res.json();
}

export async function marquerMessageLu(id: number) {
  const res = await fetchAvecToken(`/contact/${id}/lu`, {
    method: "PUT",
  });
  return res.json();
}

export async function getArticlesAdmin() {
  const res = await fetchAvecToken("/articles/admin");
  return res.json();
}

export async function creerArticle(data: {
  titre: string;
  categorie: string;
  contenu: string;
  imageUrl: string;
  tempsLecture: string;
  publie: boolean;
}) {
  const res = await fetchAvecToken("/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function supprimerArticle(id: number) {
  await fetchAvecToken(`/articles/${id}`, { method: "DELETE" });
}

export async function getProgrammesAdmin() {
  const res = await fetchAvecToken("/programmes/admin");
  return res.json();
}

export async function creerProgramme(data: {
  titre: string;
  tag: string;
  slug: string;
  description: string;
  imageUrl: string;
  actif: boolean;
  ordreAffichage: number;
}) {
  const res = await fetchAvecToken("/programmes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function supprimerProgramme(id: number) {
  await fetchAvecToken(`/programmes/${id}`, { method: "DELETE" });
}
export async function getImages() {
  const res = await fetchAvecToken("/images");
  return res.json();
}

export async function uploaderImage(cle: string, fichier: File) {
  const token = localStorage.getItem("admin_token");
  const formData = new FormData();
  formData.append("cle", cle);
  formData.append("fichier", fichier);

  const response = await fetch(`${API_BASE_URL}/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'upload");
  }
  return response.json();
}
