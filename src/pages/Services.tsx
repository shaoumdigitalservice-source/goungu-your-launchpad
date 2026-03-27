import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Lightbulb, Rocket, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Orientation",
    desc: "Nous aidons les jeunes à trouver leur voie grâce à un accompagnement personnalisé.",
    features: ["Bilan de compétences", "Exploration des métiers", "Aide à la prise de décision", "Orientation académique et professionnelle"],
  },
  {
    icon: Lightbulb,
    title: "Accompagnement Entrepreneurial",
    desc: "De l'idée au projet concret, nous vous guidons à chaque étape.",
    features: ["Coaching individuel", "Mentoring par des experts", "Business model canvas", "Stratégie de lancement"],
  },
  {
    icon: Rocket,
    title: "Programme d'Incubation",
    desc: "Un programme structuré de 9 mois pour accélérer votre projet.",
    features: ["Pré-incubation (3 mois)", "Incubation (3 mois)", "Accélération (3 mois)", "Accès au financement"],
  },
];

const Services = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Nos <span className="text-gradient">Services</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Des solutions adaptées pour chaque étape de votre parcours.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((s, i) => (
            <div key={s.title} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">{s.desc}</p>
                <ul className="space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`bg-section-alt rounded-2xl p-12 flex items-center justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <s.icon className="h-24 w-24 text-primary/20" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/inscription" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
            Rejoindre le programme <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
