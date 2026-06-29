import { Link } from "react-router-dom";
import { ArrowUpRight, Home, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import foyerImg from "@/assets/foyer.jpg";
import heroImg from "@/assets/hero-premium.jpg";
import defaratImg from "@/assets/defarat-hero.jpg";

const mainProgram = {
  to: "/programmes/defarat-sunu-nekkin",
  title: "Defarat Sunu Nekkin",
  tag: "Programme national phare",
  icon: ShieldCheck,
  img: defaratImg,
  desc: "« Refaire notre manière d'être » — le programme national de gouvernance familiale et de cohésion sociale qui structure toute la démarche Goungué. Il intègre le Camp d'Incubation Sociale, la Parentalité Positive et l'Accompagnement Familial comme volets opérationnels.",
};

const complement = {
  to: "/foyer", title: "Foyer Goungué", tag: "Post-incubation", icon: Home, img: foyerImg,
  desc: "Un espace de continuité après les programmes : mentorat, soutien éducatif, médiation et accompagnement psychosocial.",
};

const ProgrammesIndex = () => (
  <Layout>
    <PageHero
      eyebrow="Nos programmes"
      title="Un programme national, une promesse : grandir ensemble."
      description="Defarat Sunu Nekkin est le programme national cadre de Goungué. Il regroupe l'ensemble de nos volets d'accompagnement pour les jeunes, les parents et les familles, et se prolonge par le Foyer Goungué."
      image={heroImg}
    />
    <section className="pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to={mainProgram.to} className="group rounded-3xl overflow-hidden border-2 border-primary/30 bg-card hover-lift block">
          <div className="grid md:grid-cols-2">
            <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
              <img src={mainProgram.img} alt={mainProgram.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary">
                  <mainProgram.icon className="h-4 w-4" /> {mainProgram.tag}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl">{mainProgram.title}</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">{mainProgram.desc}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>

    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">En complément</span>
          <h2 className="font-display text-3xl mt-3">Pour prolonger l'accompagnement.</h2>
        </div>
        <Link to={complement.to} className="group rounded-3xl overflow-hidden border bg-card hover-lift block md:grid md:grid-cols-2">
          <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
            <img src={complement.img} alt={complement.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary">
                <complement.icon className="h-4 w-4" /> {complement.tag}
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <h3 className="font-display text-2xl">{complement.title}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{complement.desc}</p>
          </div>
        </Link>
      </div>
    </section>
  </Layout>
);

export default ProgrammesIndex;