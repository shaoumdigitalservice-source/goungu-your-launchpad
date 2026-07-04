import { API_BASE_URL } from "@/lib/apiConfig";

export type StatsRoles = Record<string, number>;

const authHeader = () => {
  const token = localStorage.getItem("user_token");
  return { Authorization: `Bearer ${token}` };
};

export async function statsParRole(): Promise<StatsRoles> {
  const res = await fetch(`${API_BASE_URL}/utilisateurs/stats-roles`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
