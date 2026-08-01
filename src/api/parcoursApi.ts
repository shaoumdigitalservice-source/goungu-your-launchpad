import { apiFetch } from "@/lib/apiFetch";

export interface EtapeParcours {
  type: "INSCRIPTION" | "RENDEZ_VOUS";
  titre: string;
  date: string;
  description?: string;
}

export async function getMonParcours(): Promise<EtapeParcours[]> {
  const res = await apiFetch("/utilisateurs/mon-parcours");
  if (!res.ok) throw new Error("Impossible de récupérer votre parcours");
  return res.json();
}
