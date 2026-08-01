import { apiFetch } from "@/lib/apiFetch";

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
  const res = await apiFetch("/articles/admin");
  await gererErreur(res, "Erreur lors du chargement des articles");
  return res.json();
}

export async function creerArticle(data: ArticleInput): Promise<Article> {
  const res = await apiFetch("/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });
  await gererErreur(res, "Erreur lors de la création de l'article");
  return res.json();
}

export async function modifierArticle(id: number, data: ArticleInput): Promise<Article> {
  const res = await apiFetch(`/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  await gererErreur(res, "Erreur lors de la modification de l'article");
  return res.json();
}

export async function supprimerArticle(id: number): Promise<void> {
  const res = await apiFetch(`/articles/${id}`, { method: "DELETE" });
  await gererErreur(res, "Erreur lors de la suppression de l'article");
}
