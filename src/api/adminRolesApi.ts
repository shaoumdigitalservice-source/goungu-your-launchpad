import { apiFetch } from "@/lib/apiFetch";

export type StatsRoles = Record<string, number>;

export async function statsParRole(): Promise<StatsRoles> {
  const res = await apiFetch("/utilisateurs/stats-roles");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
