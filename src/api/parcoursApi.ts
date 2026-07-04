import { API_BASE_URL } from "@/lib/apiConfig";

export interface EtapeParcours {
  type: "INSCRIPTION" | "RENDEZ_VOUS";
  titre: string;
  date: string;
  description?: string;
}

export async function getMonParcours(): Promise<EtapeParcours[]> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/utilisateurs/mon-parcours`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer votre parcours");
  return res.json();
}
