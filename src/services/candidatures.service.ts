import { API_BASE_URL } from "@/lib/apiConfig";

export type CandidatureStatut = "EN_ATTENTE" | "ACCEPTEE" | "REFUSEE" | string;

export interface CandidatureApi {
  id?: number;
  name: string;
  email: string;
  phone: string;
  programme: string;
  motivation?: string;
  statut: CandidatureStatut;
}

export class CandidaturesServiceError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function fetchCandidatures(): Promise<CandidatureApi[]> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/candidatures`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  if (!res.ok) {
    throw new CandidaturesServiceError(res.status, await res.text().catch(() => ""));
  }
  return res.json();
}

export async function fetchCandidatureById(id: number): Promise<CandidatureApi> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/candidatures/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  if (!res.ok) {
    throw new CandidaturesServiceError(res.status, await res.text().catch(() => ""));
  }
  return res.json();
}

export async function acceptCandidature(id: number): Promise<CandidatureApi> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(
    `${API_BASE_URL}/candidatures/${id}/statut?statut=ACCEPTEE`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token ?? ""}`,
      },
    }
  );
  if (!res.ok) {
    throw new CandidaturesServiceError(
      res.status,
      await res.text().catch(() => "")
    );
  }
  return res.json().catch(() => ({} as CandidatureApi));
}