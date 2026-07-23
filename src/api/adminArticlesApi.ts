import { API_BASE_URL } from "@/lib/apiConfig";

export interface Article {
  id: number;
  titre: string;
  categorie: string;
  contenu?: string;
  imageUrl?: string;
  tempsLecture?: string;
  publie: boolean;
  createdAt: string;
}

export interface ArticleInput {
  titre: string;
  categorie: string;
  contenu?: string;
  imageUrl?: string;
  tempsLecture?: string;
  publie: boolean;
}

const authHeaders = () => {
  const token = localStorage.getItem("user_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

class ArticleApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const gererErreur = async (res: Response, fallback: string) => {
  if (res.ok) return;
  let message = fallback;
  try {
    const txt = await res.text();
    if (txt) message = txt;
  } catch {
    // ignore
  }
  if (res.status === 401) message = "Session expirée, veuillez vous reconnecter.";
  else if (res.status === 403) message = "Accès refusé : action réservée aux administrateurs.";
  else if (res.status === 404) message = "Article introuvable.";
  else if (res.status >= 500) message = "Erreur serveur, veuillez réessayer plus tard.";
  throw new ArticleApiError(res.status, message);
};

export async function listerArticlesAdmin(): Promise<Article[]> {
  const res = await fetch(`${API_BASE_URL}/articles/admin`, {
    headers: authHeaders(),
  });
  await gererErreur(res, "Erreur lors du chargement des articles");
  return res.json();
}

export async function creerArticle(data: ArticleInput): Promise<Article> {
  const res = await fetch(`${API_BASE_URL}/articles`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  await gererErreur(res, "Erreur lors de la création de l'article");
  return res.json();
}

export async function modifierArticle(id: number, data: ArticleInput): Promise<Article> {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  await gererErreur(res, "Erreur lors de la modification de l'article");
  return res.json();
}

export async function supprimerArticle(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  await gererErreur(res, "Erreur lors de la suppression de l'article");
}