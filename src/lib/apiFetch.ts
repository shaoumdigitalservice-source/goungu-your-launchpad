import { API_BASE_URL } from "@/lib/apiConfig";

// Wrapper fetch unique pour tous les appels au backend : préfixe l'URL et envoie
// systématiquement le cookie de session httpOnly (credentials: "include") au lieu
// de construire un header Authorization à partir d'un token lu en localStorage.
export function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  // Content-Type auto uniquement pour un corps JSON (string) : un FormData (upload
  // de fichier) doit garder le Content-Type multipart à boundary auto-généré par
  // le navigateur, qu'on casserait en le fixant nous-mêmes à application/json.
  const contentTypeHeader =
    typeof options.body === "string" ? { "Content-Type": "application/json" } : {};

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...contentTypeHeader,
      ...options.headers,
    },
  });
}
