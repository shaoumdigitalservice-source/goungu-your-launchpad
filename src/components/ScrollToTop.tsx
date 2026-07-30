import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Si l'URL contient une ancre (#quelque-chose), laisser le
      // navigateur/le code existant gérer le scroll vers cette ancre,
      // ne pas forcer le retour en haut dans ce cas.
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
