import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Rocket, Users, DollarSign, TrendingUp } from "lucide-react";

const phases = [
  {
    icon: BookOpen,
    title: "Pré-incubation",
    duration: "3 mois",
    desc: "Validation de l'idée, étude de marché et construction du modèle économique.",
    items: ["Ateliers de créativité", "Étude de faisabilité", "Business Model Canvas", "Pitch initial"],
  },
  {
    icon: Users,
    title: "Incubation",
    duration: "3 mois",
    desc: "Développement du produit, premiers clients et structuration de l'entreprise.",
    items: ["Prototype / MVP", "Acquisition clients", "Mentorat individuel", "Formation gestion"],
  },
  {
    icon: Rocket,
    title: "Accélération",
    duration: "3 mois",
    desc: "Croissance, levée de fonds et passage à l'échelle.",
    items: ["Stratégie de croissance", "Recherche de financement", "Pitch investisseurs", "Mise en réseau"],
  },
];

const advantages = [
  { icon: Users, label: "Coaching personnalisé" },
  { icon: Award, label: "Mentoring expert" },
  { icon: DollarSign, label: "Accès au financement" },
  { icon: TrendingUp, label: "Mise en réseau" },
];

const Programme = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Programme d'<span className="text-gradient">Incubation</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            9 mois pour transformer votre idée en entreprise viable. Un parcours structuré, un accompagnement humain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {phases.map((p, i) => (
            <div key={p.title} className="bg-card border rounded-2xl p-8 relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                Phase {i + 1}
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <p.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-1">{p.title}</h3>
              <p className="text-primary text-sm font-semibold mb-3">{p.duration}</p>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-hero-gradient text-primary-foreground rounded-2xl p-10 md:p-14 text-center">
          <h2 className="text-2xl font-bold mb-8">Les avantages du programme</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-3">
                <a.icon className="h-8 w-8" />
                <span className="text-sm font-semibold">{a.label}</span>
              </div>
            ))}
          </div>
          <Link
            to="/inscription"
            className="inline-flex items-center gap-2 mt-10 px-7 py-3.5 rounded-full bg-background text-foreground font-bold hover:opacity-90 transition-opacity"
          >
            Postuler maintenant <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Programme;
