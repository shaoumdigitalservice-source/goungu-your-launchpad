const DEFAULT_API_ORIGIN = "http://localhost:8082";

// VITE_API_URL non défini du tout -> repli sur le backend local par défaut.
// VITE_API_URL défini à une chaîne vide -> même origine que la page (déploiement
// mono-domaine avec proxy de chemin) : les URLs deviennent relatives ("/api", "/uploads/...").
export const API_ORIGIN =
  import.meta.env.VITE_API_URL !== undefined ? import.meta.env.VITE_API_URL : DEFAULT_API_ORIGIN;
export const API_BASE_URL = `${API_ORIGIN}/api`;
