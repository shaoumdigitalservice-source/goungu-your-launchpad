import { API_BASE_URL } from "@/lib/apiConfig";

export interface UserApi {
  id: number;
  email: string;
  prenom: string;
  nom: string;
  role: string;
  telephone: string | null;
  ville: string | null;
  dateNaissance: string | null;
  bio: string | null;
  mentorId: number | null;
  parentId: number | null;
  dateInscription?: string | null;
}

export class UsersServiceError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function fetchUsers(): Promise<UserApi[]> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/utilisateurs`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  if (!res.ok) {
    throw new UsersServiceError(res.status, await res.text().catch(() => ""));
  }
  return res.json();
}

export type UserRole = "admin" | "jeune" | "mentor" | "parent" | "formateur";

export async function updateUserRole(id: number, role: UserRole): Promise<UserApi> {
  const token = localStorage.getItem("user_token");
  const res = await fetch(`${API_BASE_URL}/utilisateurs/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) {
    throw new UsersServiceError(res.status, await res.text().catch(() => ""));
  }
  return res.json();
}