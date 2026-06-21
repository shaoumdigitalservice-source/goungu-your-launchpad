import { Link } from "react-router-dom";
import { Sun, Heart, Compass, Users, ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import campImg from "@/assets/camp-lac-rose.jpg";

const piliers = [
  { icon: Heart, title: "Se comprendre", desc: "Mieux connaître ses émotions, ses besoins, ses blessures." },
  { icon: Sun, title: "Se reconstruire", desc: "Retrouver la confiance, restaurer l'estime de soi." },
  { icon: Compass, title: "Se projeter", desc: "Identifier ses talents, dessiner un avenir cohérent." },
  { icon: Users, title: "Se réconcilier", desc: "Renouer le dialogue avec la famille et la communauté." },
];

const timeline = [
  { day: "J1", t: "Arrivée & cercle d'accueil" },
  { day: "J2", t: "Atelier émotions & histoire de vie" },
  { day: "J3", t: "Découverte de soi : forces et fragilités" },
  { day: "J4", t: "Atelier estime de soi & corps" },
  { day: "J5", t: "Méditation pleine conscience" },
  { day: "J6", t: "Atelier confiance en groupe" },
  { day: "J7", t: "Journée famille — visite & médiation" },
  { day: "J8", t: "Découverte des métiers & projection" },
  { day: "J9", t: "Mentorat individuel" },
  { day: "J10", t: "Atelier orientation scolaire" },
  { day: "J11", t: "Construction du Passeport Avenir" },
  { day: "J12", t: "Préparation à la réconciliation familiale" },
  { day: "J13", t: "Cérémonie de pardon & dialogue" },
  { day: "J14", t: "Engagements et plan personnel" },
  { day: "J15", t: "Restitution publique & retour" },
];

const facts = [
  { icon: Calendar, label: "Durée", value: "15 jours en immersion" },
  { icon: MapPin, label: "Lieu", value: "Lac Rose, Dakar" },
  { icon: Clock, label: "Prochaine session", value: "Été 2026" },
];

const CampLacRose = () => (
  <Layout>
    <PageHero
      eyebrow="Camp de Vacances d'Incubation Sociale"
      title="15 jours pour se retrouver, se reconstruire et se réconcilier."
      description="Au bord du Lac Rose, dans un cadre apaisant, jeunes et mentors vivent une expérience humaine intense et structurante."
      image={campImg}
    >
      <Link to="/inscription?programme=camp" className="px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">
        Candidater au prochain camp
      </Link>
      <Link to="/contact" className="px-6 py-3.5 rounded-full border border-foreground/20 font-semibold hover:bg-foreground/5 transition">
        Poser une question
      </Link>
    </PageHero>

    <section className="pb-16">
      <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl border bg-card p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center"><f.icon className="h-5 w-5" /></div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</div>
              <div className="font-display text-lg">{f.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Les 4 piliers</span>
          <h2 className="font-display text-4xl mt-3">Un cadre simple, profond et structurant.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {piliers.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-card p-7 hover-lift">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-background grid place-items-center mb-4">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Programme jour par jour</span>
            <h2 className="font-display text-4xl mt-3">15 journées, un rythme pensé pour chaque étape.</h2>
          </div>
          <Placeholder label="Détails susceptibles d'évoluer" />
        </div>
        <ol className="relative border-l-2 border-dashed border-border ml-3 space-y-5">
          {timeline.map((t) => (
            <li key={t.day} className="pl-8 relative">
              <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-primary text-primary-foreground grid place-items-center text-[10px] font-bold">
                {t.day.replace("J", "")}
              </span>
              <div className="font-display text-lg">{t.t}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Jour {t.day.replace("J", "")}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 lg:p-14 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <h3 className="font-display text-3xl">Une session limitée à 30 jeunes par promotion.</h3>
            <p className="opacity-90 mt-2">Pré-inscriptions ouvertes — places attribuées sur dossier et entretien.</p>
          </div>
          <Link to="/inscription?programme=camp" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover-lift">
            Candidater <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default CampLacRose;