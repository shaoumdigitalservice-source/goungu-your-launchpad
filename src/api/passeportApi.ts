import { apiFetch } from "@/lib/apiFetch";

export interface PasseportEntree {
  id: number;
  jeuneId: number;
  type: "COMPETENCE" | "REALISATION";
  titre: string;
  description?: string;
  createdAt: string;
}

export async function getMonPasseport(): Promise<PasseportEntree[]> {
  const res = await apiFetch("/passeport/mon-passeport");
  if (!res.ok) throw new Error("Impossible de récupérer votre passeport");
  return res.json();
}

export async function ajouterEntreePasseport(data: { type: string; titre: string; description?: string }): Promise<PasseportEntree> {
  const res = await apiFetch("/passeport", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Erreur lors de l'ajout");
  }
  return res.json();
}

export async function supprimerEntreePasseport(id: number): Promise<void> {
  const res = await apiFetch(`/passeport/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
}
