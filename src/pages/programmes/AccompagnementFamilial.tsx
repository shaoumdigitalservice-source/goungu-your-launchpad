import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/hero-premium.jpg";

const objectifs = [
  "Restaurer le dialogue entre parents et adolescents",
  "Mettre en place un cadre familial stable et bienveillant",
  "Identifier et désamorcer les sources de conflit",
  "Construire un projet familial commun",
];

const beneficiaires = [
  "Familles en situation de tension ou de rupture de dialogue",
  "Jeunes en décrochage scolaire ou en errance",
  "Parents isolés cherchant un soutien éducatif",
  "Fratries vivant un évènement de vie difficile",
];

const resultats = [
  "Diagnostic familial partagé",
  "Plan d'action concret et signé",
  "Suivi mensuel sur 6 mois minimum",
  "Accès à l'ensemble des outils Goungué",
];

const AccompagnementFamilial = () => (
  <Layout>
    <PageHero
      eyebrow="Accompagnement Familial"
      title="Quand la famille avance ensemble, le jeune avance plus loin."
      description="Un dispositif sur mesure d'écoute, de médiation et de coaching familial pensé pour rétablir la confiance et l'élan collectif."
      image={heroImg}
    >
      <Link to="/inscription?programme=famille" className="px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">
        Demander un accompagnement
      </Link>
    </PageHero>

    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-5">
        {[
          { title: "Objectifs", items: objectifs },
          { title: "Bénéficiaires", items: beneficiaires },
          { title: "Résultats attendus", items: resultats },
        ].map((b) => (
          <div key={b.title} className="rounded-3xl border bg-card p-8">
            <h3 className="font-display text-2xl">{b.title}</h3>
            <ul className="mt-5 space-y-3">
              {b.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" /> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-3xl bg-ink p-10 lg:p-14 flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="font-display text-3xl">Chaque famille mérite un cadre pour respirer.</h2>
            <p className="opacity-80 mt-2">Notre équipe de psychologues et médiateurs vous accompagne en toute confidentialité.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover-lift">
            Nous écrire <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default AccompagnementFamilial;