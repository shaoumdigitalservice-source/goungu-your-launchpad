const API_BASE_URL = "http://localhost:8082/api";

export interface Candidature {
  id: number;
  name: string;
  email: string;
  phone: string;
  programme: string;
  motivation: string;
  statut: "EN_ATTENTE" | "ACCEPTEE" | "REFUSEE";
  createdAt: string;
}

const authHeaders = () => {
  const token = localStorage.getItem("user_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function listerCandidatures(): Promise<Candidature[]> {
  const res = await fetch(`${API_BASE_URL}/candidatures`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function changerStatutCandidature(
  id: number,
  statut: string
): Promise<Candidature> {
  const res = await fetch(
    `${API_BASE_URL}/candidatures/${id}/statut?statut=${statut}`,
    {
      method: "PUT",
      headers: authHeaders(),
    }
  );
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
