const DEFAULT_API_ORIGIN = "http://localhost:8082";

export const API_ORIGIN = import.meta.env.VITE_API_URL || DEFAULT_API_ORIGIN;
export const API_BASE_URL = `${API_ORIGIN}/api`;
