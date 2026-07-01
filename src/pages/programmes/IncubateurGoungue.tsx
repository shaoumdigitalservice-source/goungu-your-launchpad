import { Link } from "react-router-dom";
import { Rocket, Lightbulb, Users, Target, Handshake, LineChart, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import incubImg from "@/assets/incubateur-goungue.jpg";

const etapes = [
  { icon: Lightbulb, title: "Idéation", desc: "Ateliers de design thinking et validation du problème auprès des premiers clients." },
  { icon: Target, title: "Prototypage", desc: "Passage du concept au MVP en 8 semaines, accompagné par nos mentors produit." },
  { icon: Users, title: "Structuration", desc: "Formalisation juridique, gouvernance, culture d'équipe et premiers recrutements." },
  { icon: LineChart, title: "Traction", desc: "Marketing, ventes, mesure d'impact et préparation aux premières levées." },
  { icon: Handshake, title: "Réseau", desc: "Accès à un écosystème d'investisseurs, partenaires publics et clients grand compte." },
  { icon: Rocket, title: "Scale", desc: "Feuille de route croissance, expansion sous-régionale et suivi post-incubation." },
];

const IncubateurGoungue = () => (
  <Layout>
    <PageHero
      eyebrow="Incubateur Goungué"
      title="Incubateur Goungué — de l'idée à l'impact."
      description="Un parcours d'incubation de 9 mois pour les porteurs de projets à fort impact social, économique ou éducatif au Sénégal. Formation, mentorat, financement d'amorçage et mise en réseau."
      image={incubImg}
    >
      <Link to="/inscription" className="px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">Candidater à la prochaine promo</Link>
      <Link to="/contact" className="px-6 py-3.5 rounded-full border border-foreground/20 font-semibold hover:bg-foreground/5 transition">En savoir plus</Link>
    </PageHero>

    <section className="pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Le parcours</span>
          <h2 className="font-display text-3xl lg:text-4xl mt-3">Six étapes, un objectif : lancer et durer.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {etapes.map((e, i) => (
            <div key={e.title} className="rounded-2xl border bg-card p-7 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center">
                  <e.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="font-display text-xl">{e.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl overflow-hidden ring-soft">
          <img src={incubImg} alt="Séance de travail à l'incubateur Goungué" loading="lazy" width={1024} height={1024} className="w-full h-[400px] object-cover" />
        </div>
        <div>
          <h2 className="font-display text-4xl">Ce que reçoit chaque cohorte.</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>• 9 mois d'accompagnement intensif, hybride présentiel/distanciel</li>
            <li>• Un mentor senior référent et un pool d'experts sectoriels</li>
            <li>• Un bureau à Kepar gi et l'accès à nos infrastructures</li>
            <li>• Une bourse d'amorçage et une mise en relation avec des investisseurs</li>
            <li>• L'intégration à vie à la communauté des alumni Goungué</li>
          </ul>
          <Link to="/inscription" className="inline-flex items-center gap-2 mt-6 text-primary font-semibold">
            Postuler maintenant <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default IncubateurGoungue;