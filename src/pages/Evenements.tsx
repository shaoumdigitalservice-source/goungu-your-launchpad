import { useEffect, useState } from "react";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import { listerEvenementsPublics, EvenementPublic } from "@/api/evenementsApi";
import { getErrorMessage } from "@/lib/utils";

const Evenements = () => {
  const [evenements, setEvenements] = useState<EvenementPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      try {
        const data = await listerEvenementsPublics();
        setEvenements(data);
      } catch (e) {
        setErreur(getErrorMessage(e, "Erreur lors du chargement"));
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  return (
    <Layout>
      <PageHero
        eyebrow="Agenda Goungué"
        title="Nos prochains événements."
        description="Ateliers, rencontres, cérémonies : suivez les temps forts de la communauté Goungué."
      />
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-10 justify-center">
              <Loader2 className="animate-spin" size={20} /> Chargement des événements...
            </div>
          )}

          {erreur && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-4 text-center">
              {erreur}
            </div>
          )}

          {!loading && !erreur && evenements.length === 0 && (
            <Placeholder label="Aucun événement prévu pour le moment" />
          )}

          {!loading && !erreur && evenements.length > 0 && (
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {evenements.map((e) => {
                const date = new Date(e.dateEvenement);
                return (
                  <article key={e.id} className="group rounded-2xl border bg-card p-7 hover-lift flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-11 w-11 rounded-2xl bg-foreground text-background grid place-items-center">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">
                        {date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-display text-lg flex-1">{e.titre}</h3>
                    {e.description && (
                      <p className="text-sm text-muted-foreground mt-2">{e.description}</p>
                    )}
                    <div className="mt-4 pt-4 border-t space-y-1.5">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {date.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {e.lieu}
                      </p>
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

export default Evenements;
