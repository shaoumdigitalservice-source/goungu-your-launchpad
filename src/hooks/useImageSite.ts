import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8082";

export function useImageSite(cle: string, fallback: string): string {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/images/${cle}`)
      .then((res) => {
        if (!res.ok) throw new Error("Image non trouvée");
        return res.json();
      })
      .then((data) => {
        setUrl(`${API_BASE_URL}${data.url}`);
      })
      .catch(() => {
        // Si l'image n'existe pas encore côté backend, on garde le fallback statique
        setUrl(fallback);
      });
  }, [cle, fallback]);

  return url;
}