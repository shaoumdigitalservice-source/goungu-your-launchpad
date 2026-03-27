import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const testimonials = [
  {
    name: "Fatou Diallo",
    role: "Entrepreneure, Promotion 2024",
    quote: "GOUNGUÉ m'a donné les outils et la confiance pour transformer mon idée en entreprise. Aujourd'hui, je dirige ma propre structure et j'emploie 3 personnes !",
    image: testimonial1,
    before: "Étudiante sans orientation claire",
    after: "Fondatrice d'une entreprise de cosmétiques naturels",
  },
  {
    name: "Moussa Ndiaye",
    role: "Porteur de projet, Promotion 2024",
    quote: "Le programme d'incubation m'a permis de structurer mon projet et de trouver mes premiers clients. Un accompagnement humain et efficace.",
    image: testimonial2,
    before: "Idée de projet non structurée",
    after: "Startup tech avec 100+ utilisateurs",
  },
  {
    name: "Aminata Sow",
    role: "Femme entrepreneure, Promotion 2023",
    quote: "Grâce au mentorat et aux formations, j'ai pu lancer mon activité de transformation alimentaire. GOUNGUÉ a changé ma vie.",
    image: testimonial1,
    before: "Femme au foyer cherchant à entreprendre",
    after: "Chef d'entreprise avec un chiffre d'affaires en croissance",
  },
];

const Testimonials = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="text-gradient">Success Stories</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Des parcours inspirants qui témoignent de l'impact de GOUNGUÉ.
          </p>
        </div>

        <div className="space-y-10 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card border rounded-2xl p-8 md:p-10">
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-lg leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4 mb-6">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover" loading="lazy" width={56} height={56} />
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-destructive/5 rounded-xl p-4">
                  <div className="text-xs font-semibold text-destructive mb-1">AVANT</div>
                  <p className="text-sm">{t.before}</p>
                </div>
                <div className="bg-secondary/10 rounded-xl p-4">
                  <div className="text-xs font-semibold text-secondary mb-1">APRÈS</div>
                  <p className="text-sm">{t.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/inscription" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
            Écrire votre propre histoire <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Testimonials;
