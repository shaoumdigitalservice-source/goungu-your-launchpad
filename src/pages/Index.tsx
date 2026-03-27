import { Link } from "react-router-dom";
import { ArrowRight, Users, Lightbulb, Rocket, Star, Target, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import heroBg from "@/assets/hero-bg.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const stats = [
  { value: "200+", label: "Jeunes accompagnés" },
  { value: "50+", label: "Projets incubés" },
  { value: "30+", label: "Mentors actifs" },
  { value: "95%", label: "Taux de satisfaction" },
];

const services = [
  { icon: Target, title: "Orientation", desc: "Trouvez votre voie grâce à un accompagnement personnalisé et des outils d'aide à la décision." },
  { icon: Lightbulb, title: "Accompagnement", desc: "De l'idée au projet concret : coaching, mentoring et formations pour entrepreneurs." },
  { icon: Rocket, title: "Incubation", desc: "Programme de 9 mois : pré-incubation, incubation et accélération de votre projet." },
];

const testimonials = [
  {
    name: "Fatou Diallo",
    role: "Entrepreneure, Promotion 2024",
    quote: "GOUNGUÉ m'a donné les outils et la confiance pour transformer mon idée en entreprise. Aujourd'hui, je dirige ma propre structure !",
    image: testimonial1,
  },
  {
    name: "Moussa Ndiaye",
    role: "Porteur de projet, Promotion 2024",
    quote: "Le programme d'incubation m'a permis de structurer mon projet et de trouver mes premiers clients. Un accompagnement humain et efficace.",
    image: testimonial2,
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            🌟 Incubateur & Accompagnement — Sénégal
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Inspire, Guide,{" "}
            <span className="text-gradient">Réussis</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
            GOUNGUÉ accompagne les jeunes et les femmes du Sénégal dans leur orientation, formation et entrepreneuriat. Votre réussite commence ici.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/inscription"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              Rejoindre le programme <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-foreground/20 text-foreground font-bold hover:bg-muted transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 bg-hero-gradient">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-primary-foreground">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-extrabold">{s.value}</div>
              <div className="text-sm mt-1 opacity-90">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Nos Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des solutions concrètes pour vous aider à réussir, de l'orientation à la création d'entreprise.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              <Link to="/services" className="inline-flex items-center gap-1 mt-5 text-primary text-sm font-semibold hover:gap-2 transition-all">
                Découvrir <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ils nous font confiance</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez les histoires inspirantes de ceux qui ont transformé leur avenir avec GOUNGUÉ.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed my-5 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" width={48} height={48} />
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <Heart className="h-10 w-10 opacity-80" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Prêt·e à écrire votre histoire ?</h2>
        <p className="max-w-lg mx-auto opacity-90 mb-8">
          Rejoignez GOUNGUÉ et bénéficiez d'un accompagnement sur mesure pour concrétiser votre projet.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/inscription"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-background text-foreground font-bold hover:opacity-90 transition-opacity"
          >
            Rejoindre le programme <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-primary-foreground/30 font-bold hover:bg-white/10 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>

    {/* Partners */}
    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <p className="text-sm text-muted-foreground font-medium mb-6">Ils soutiennent notre mission</p>
        <div className="flex flex-wrap justify-center gap-10 items-center opacity-50">
          <Users className="h-8 w-8" />
          <span className="font-bold text-lg">Partenaire 1</span>
          <span className="font-bold text-lg">Partenaire 2</span>
          <span className="font-bold text-lg">Partenaire 3</span>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
