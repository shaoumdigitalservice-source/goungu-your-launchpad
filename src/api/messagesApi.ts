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

export async function getConversation(autreUserId: number): Promise<Message[]> {
  const res = await fetch(`${API_BASE_URL}/messages/conversation/${autreUserId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Impossible de charger la conversation");
  }
  return res.json();
}

export async function envoyerMessage(destinataireId: number, contenu: string): Promise<Message> {
  const res = await fetch(`${API_BASE_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ destinataireId, contenu }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de l'envoi du message");
  }
  return res.json();
}
