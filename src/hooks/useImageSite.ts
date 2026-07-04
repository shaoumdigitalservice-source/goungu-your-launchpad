import { useEffect, useState } from "react";
import { API_BASE_URL, API_ORIGIN } from "@/lib/apiConfig";

export function useImageSite(cle: string, fallback: string): string {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    fetch(`${API_BASE_URL}/images/${cle}`)
      .then((res) => {
        if (!res.ok) throw new Error("Image non trouvée");
        return res.json();
      })
      .then((data) => {
        setUrl(`${API_ORIGIN}${data.url}`);
      })
      .catch(() => {
        // Si l'image n'existe pas encore côté backend, on garde le fallback statique
        setUrl(fallback);
      });
  }, [cle, fallback]);

  return url;
}