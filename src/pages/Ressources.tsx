import { useEffect, useState } from "react";
import { FileText, Link as LinkIcon, Download, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import { listerRessourcesPubliques, RessourcePublique } from "@/api/ressourcesApi";
import { API_ORIGIN } from "@/lib/apiConfig";

const Ressources = () => {
  const [ressources, setRessources] = useState<RessourcePublique[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await listerRessourcesPubliques();
        setRessources(
          [...data].sort((a, b) => a.ordreAffichage - b.ordreAffichage)
        );
      } catch (e: any) {
        setErreur(e.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  return (
    <Layout>
      <PageHero
        eyebrow="Centre de Ressources"
        title="Une bibliothèque vivante pour jeunes, parents et mentors."
        description="Guides, vidéos, formations, outils téléchargeables : tout ce que nous mettons à votre disposition pour grandir ensemble."
      />
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-10 justify-center">
              <Loader2 className="animate-spin" size={20} /> Chargement des ressources...
            </div>
          )}

          {erreur && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-4 text-center">
              {erreur}
            </div>
          )}

          {!loading && !erreur && ressources.length === 0 && (
            <Placeholder label="Catalogue à enrichir" />
          )}

          {!loading && !erreur && ressources.length > 0 && (
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ressources.map((r) => {
                const Icon = r.type === "FICHIER" ? FileText : LinkIcon;
                const href = r.url.startsWith("/uploads")
                  ? `${API_ORIGIN}${r.url}`
                  : r.url;
                return (
                  <article
                    key={r.id}
                    className="group rounded-2xl border bg-card p-7 hover-lift flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-11 w-11 rounded-2xl bg-foreground text-background grid place-items-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">
                        {r.type === "FICHIER" ? "Document" : "Lien"}
                      </span>
                    </div>
                    <h3 className="font-display text-lg flex-1">{r.titre}</h3>
                    {r.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {r.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-end text-sm">
                      
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-primary group-hover:gap-2 transition-all"
                      >
                        {r.type === "FICHIER" ? "Télécharger" : "Accéder"}{" "}
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Ressources;