import { Link } from "react-router-dom";
import { ArrowUpRight, Tent, HeartHandshake, Home, Users, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import campImg from "@/assets/camp-lac-rose.jpg";
import parentImg from "@/assets/parentalite.jpg";
import foyerImg from "@/assets/foyer.jpg";
import heroImg from "@/assets/hero-premium.jpg";
import defaratImg from "@/assets/defarat-hero.jpg";

const programs = [
  { to: "/programmes/camp-lac-rose", title: "Camp de Vacances d'Incubation Sociale", tag: "15 jours · Lac Rose", icon: Tent, img: campImg,
    desc: "Une immersion de 15 jours pour se comprendre, se reconstruire, se projeter et se réconcilier avec soi-même et sa famille." },
  { to: "/programmes/parentalite-positive", title: "Parentalité Positive", tag: "6 modules · 3 mois", icon: HeartHandshake, img: parentImg,
    desc: "Un parcours pour les parents : comprendre l'adolescence, communiquer, accompagner les choix d'avenir." },
  { to: "/programmes/accompagnement-familial", title: "Accompagnement Familial", tag: "Suivi individualisé", icon: Users, img: heroImg,
    desc: "Médiation, écoute, ateliers conjoints parents-enfants pour rétablir la cohésion et la confiance." },
  { to: "/programmes/defarat-sunu-nekkin", title: "Defarat Sunu Nekkin", tag: "Programme national", icon: ShieldCheck, img: defaratImg,
    desc: "Gouvernance familiale et cohésion sociale : un programme national pour renforcer les familles et les communautés." },
  { to: "/foyer", title: "Foyer Goungué", tag: "Post-incubation", icon: Home, img: foyerImg,
    desc: "Un espace de continuité : mentorat, soutien éducatif, médiation et accompagnement psychosocial." },
];

const ProgrammesIndex = () => (
  <Layout>
    <PageHero
      eyebrow="Nos programmes"
      title="Quatre chemins, une même promesse : grandir ensemble."
      description="Chaque programme Goungué répond à un besoin précis. Ensemble, ils forment un parcours cohérent et profondément humain pour les jeunes et les familles du Sénégal."
      image={heroImg}
    />
    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-6">
        {programs.map((p) => (
          <Link key={p.to} to={p.to} className="group rounded-3xl overflow-hidden border bg-card hover-lift block">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary">
                  <p.icon className="h-4 w-4" /> {p.tag}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
              </div>
              <h2 className="font-display text-2xl">{p.title}</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  </Layout>
);

export default ProgrammesIndex;