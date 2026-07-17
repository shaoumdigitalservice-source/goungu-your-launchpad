import { API_BASE_URL } from "@/lib/apiConfig";

export interface Message {
  id: number;
  expediteurId: number;
  destinataireId: number;
  contenu: string;
  dateEnvoi: string;
  lu: boolean;
}

function getToken(): string | null {
  return localStorage.getItem("user_token");
}

async function gererErreur(res: Response, actionLabel: string): Promise<never> {
  let corps = "";
  try {
    corps = await res.text();
  } catch {
    corps = "";
  }

  switch (res.status) {
    case 400:
      throw new Error(corps || "Message invalide ou vide.");
    case 401:
      localStorage.removeItem("user_token");
      if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
        window.location.href = "/auth";
      }
      throw new Error("Session expirée. Veuillez vous reconnecter.");
    case 403:
      throw new Error("Conversation interdite : vous n'êtes pas lié à cet utilisateur.");
    case 500:
      throw new Error("Erreur serveur, veuillez réessayer plus tard.");
    default:
      throw new Error(corps || `${actionLabel} : erreur inattendue (${res.status}).`);
  }
}

export async function chargerConversation(autreUserId: number): Promise<Message[]> {
  const res = await fetch(`${API_BASE_URL}/messages/conversation/${autreUserId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) await gererErreur(res, "Chargement de la conversation");
  return res.json();
}

export async function envoyerMessage(destinataireId: number, contenu: string): Promise<Message> {
  const texte = contenu?.trim() ?? "";
  if (!texte) {
    throw new Error("Le message ne peut pas être vide.");
  }
  const res = await fetch(`${API_BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ destinataireId, contenu: texte }),
  });
  if (!res.ok) await gererErreur(res, "Envoi du message");
  return res.json();
}

// Alias de compatibilité avec l'ancien nommage.
export const getConversation = chargerConversation;