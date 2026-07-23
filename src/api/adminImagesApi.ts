import { API_BASE_URL } from "@/lib/apiConfig";

export interface ImageSite {
  id: number;
  cle: string;
  url: string;
  createdAt?: string;
}

const authHeader = () => {
  const token = localStorage.getItem("user_token");
  return { Authorization: `Bearer ${token}` };
};

class ImageApiError extends Error {
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
  else if (res.status >= 500) message = "Erreur serveur, veuillez réessayer plus tard.";
  throw new ImageApiError(res.status, message);
};

export async function listerImages(): Promise<ImageSite[]> {
  const res = await fetch(`${API_BASE_URL}/images`);
  await gererErreur(res, "Erreur lors du chargement des images");
  return res.json();
}

export async function uploaderImage(cle: string, fichier: File): Promise<ImageSite> {
  const formData = new FormData();
  formData.append("cle", cle);
  formData.append("fichier", fichier);
  const res = await fetch(`${API_BASE_URL}/images`, {
    method: "POST",
    headers: authHeader(),
    body: formData,
  });
  await gererErreur(res, "Erreur lors de l'upload de l'image");
  return res.json();
}