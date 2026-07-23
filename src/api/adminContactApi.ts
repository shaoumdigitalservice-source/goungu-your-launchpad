import { API_BASE_URL } from "@/lib/apiConfig";

export interface MessageContact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  lu: boolean;
  createdAt: string;
}

const authHeaders = () => {
  const token = localStorage.getItem("user_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

class ContactApiError extends Error {
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
  else if (res.status === 404) message = "Message introuvable.";
  else if (res.status >= 500) message = "Erreur serveur, veuillez réessayer plus tard.";
  throw new ContactApiError(res.status, message);
};

export async function listerMessagesContact(): Promise<MessageContact[]> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    headers: authHeaders(),
  });
  await gererErreur(res, "Erreur lors du chargement des messages");
  return res.json();
}

export async function marquerMessageLu(id: number): Promise<MessageContact> {
  const res = await fetch(`${API_BASE_URL}/contact/${id}/lu`, {
    method: "PUT",
    headers: authHeaders(),
  });
  await gererErreur(res, "Erreur lors du marquage comme lu");
  return res.json();
}