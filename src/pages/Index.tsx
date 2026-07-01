import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Heart, Compass, Briefcase, Users, Megaphone, Sparkles,
  PlayCircle, Quote, MapPin, CheckCircle2, Sparkle
} from "lucide-react";
import Layout from "@/components/Layout";
import Placeholder from "@/components/Placeholder";
import heroImg from "@/assets/hero-premium.jpg";
import { useImageSite } from "@/hooks/useImageSite";
import campImg from "@/assets/camp-lac-rose.jpg";
import parentImg from "@/assets/parentalite.jpg";
import ambassadeursImg from "@/assets/ambassadeurs.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const stats = [
  { value: "1 200+", label: "Jeunes accompagnés" },
  { value: "640", label: "Familles suivies" },
  { value: "85", label: "Mentors mobilisés" },
  { value: "32", label: "Programmes réalisés" },
  { value: "11/14", label: "Régions couvertes" },
];

const domains = [
  { icon: Heart, title: "Accompagnement psychosocial", desc: "Écoute, suivi individuel, ateliers de bien-être pour reconstruire confiance et estime de soi.", tone: "from-primary/20 to-primary/0" },
  { icon: Compass, title: "Orientation éducative", desc: "Bilan, projection scolaire, mentorat académique et préparation aux choix de filière.", tone: "from-secondary/20 to-secondary/0" },
  { icon: Briefcase, title: "Employabilité & métiers", desc: "Découverte des secteurs porteurs, stages, soft skills et insertion professionnelle.", tone: "from-accent/25 to-accent/0" },
  { icon: Users, title: "Renforcement des familles", desc: "Médiation, parentalité positive, ateliers de communication parents-enfants.", tone: "from-primary/20 to-primary/0" },
  { icon: Megaphone, title: "Leadership citoyen", desc: "Engagement communautaire, prise de parole, projets à impact dans les quartiers.", tone: "from-secondary/20 to-secondary/0" },
  { icon: Sparkles, title: "Innovation sociale", desc: "Incubation de projets utiles aux jeunes et aux familles, prototypage et financement.", tone: "from-accent/25 to-accent/0" },
];

const parcours = [
  { step: "01", title: "Admission", desc: "Candidature en ligne, dossier complet et premier échange." },
  { step: "02", title: "Diagnostic", desc: "Bilan global : scolaire, familial, psychosocial et professionnel." },
  { step: "03", title: "Incubation", desc: "Camp Lac Rose et ateliers thématiques sur 8 à 12 semaines." },
  { step: "04", title: "Plan personnel", desc: "Construction du Passeport Avenir et engagement individuel." },
  { step: "05", title: "Réconciliation familiale", desc: "Médiation et ateliers conjoints parents-enfants." },
  { step: "06", title: "Suivi post-incubation", desc: "Foyer Goungué : mentorat continu, ressources et entraide." },
];

const programmesPreview = [
  { tag: "Camp", title: "Camp de Vacances d'Incubation Sociale", desc: "15 jours immersifs au Lac Rose. Se comprendre, se reconstruire, se projeter, se réconcilier.", img: campImg, to: "/programmes/camp-lac-rose" },
  { tag: "Famille", title: "Parentalité Positive", desc: "6 modules pour outiller les parents face à l'adolescence, aux réseaux sociaux et à l'orientation.", img: parentImg, to: "/programmes/parentalite-positive" },
  { tag: "Réseau", title: "Ambassadeurs Goungué", desc: "Un réseau national de jeunes engagés, témoins et relais dans chaque région du Sénégal.", img: ambassadeursImg, to: "/ambassadeurs" },
];

const testimonials = [
  { name: "Fatou Diallo", role: "Bénéficiaire — Promotion 2024", quote: "J'ai retrouvé un cap, une confiance, et un mentor. Goungué a changé ma vie de famille autant que mon avenir scolaire.", image: testimonial1 },
  { name: "Moussa Ndiaye", role: "Parent accompagné", quote: "Les ateliers de parentalité positive nous ont aidés à rétablir un vrai dialogue avec notre fils.", image: testimonial2 },
];

const Index = () => {
  const heroImgDynamic = useImageSite("hero-accueil", heroImg);

  return (
  <Layout>
    {/* HERO */}
    <section className="relative pt-10 lg:pt-16 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkle className="h-3.5 w-3.5" /> Incubateur social · Sénégal
            </span>
            <h1 className="font-display font-medium text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.02] mt-5 text-foreground">
              Révéler le potentiel des jeunes.<br />
              Renforcer les familles.<br />
              <span className="text-gradient italic">Construire l'avenir.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              GOUNGUÉ Incub est une plateforme nationale d'accompagnement humain, psychosocial et professionnel.
              Une approche unique qui relie jeunes, parents et mentors autour d'un même chemin de vie.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inscription?profil=jeune" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">
                Je suis jeune <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/inscription?profil=parent" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-foreground/20 font-semibold hover:bg-foreground/5 transition">
                Je suis parent
              </Link>
              <Link to="/programmes" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-foreground font-semibold hover:text-primary transition">
                <PlayCircle className="h-5 w-5" /> Découvrir nos programmes
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                <img src={testimonial1} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-background" />
                <img src={testimonial2} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-background" />
                <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold ring-2 ring-background">+</div>
              </div>
              <span>Plus de 1 200 jeunes et 640 familles accompagnés à travers le Sénégal.</span>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up animate-fade-up-delay-2">
            <div className="relative">
              <div className="absolute -inset-3 bg-hero-gradient rounded-[2rem] opacity-30 blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden ring-soft">
                <img src={heroImgDynamic} alt="Mentor et jeune au Sénégal" width={1920} height={1080} className="w-full h-[420px] lg:h-[560px] object-cover" />
                <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent grid place-items-center">
                    <Quote className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-foreground">« Ici, on est écouté avant d'être orienté. »</div>
                    <div className="text-xs text-muted-foreground">Aïcha, 17 ans — Pikine <Placeholder /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* STATS */}
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-3xl bg-ink p-8 lg:p-12 ring-soft">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-display font-medium">Notre impact en chiffres</h2>
              <p className="text-sm opacity-70 mt-1">Mise à jour mensuelle — <Placeholder label="Chiffres à confirmer" /></p>
            </div>
            <Link to="/a-propos" className="text-sm opacity-80 hover:opacity-100 inline-flex items-center gap-1">
              Notre rapport annuel <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className={`animate-fade-up animate-fade-up-delay-${(i % 4) + 1}`}>
                <div className="text-3xl lg:text-5xl font-display font-medium">{s.value}</div>
                <div className="text-xs uppercase tracking-wider opacity-70 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* 6 DOMAINES */}
    <section className="py-16 lg:py-24 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Nos 6 domaines</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-3">Un accompagnement complet, du cœur à la carrière.</h2>
          <p className="mt-4 text-muted-foreground">Chaque jeune, chaque parent, chaque famille trouve chez Goungué une réponse personnalisée et humaine.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((d) => (
            <div key={d.title} className={`group relative overflow-hidden rounded-2xl border bg-card p-7 hover-lift`}>
              <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${d.tone}`} />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-foreground text-background grid place-items-center mb-5">
                  <d.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-display font-medium">{d.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PARCOURS GOUNGUÉ */}
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Parcours Goungué</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-3">Un chemin clair, six étapes humaines.</h2>
          </div>
          <Link to="/programmes" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Détail des programmes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {parcours.map((p, i) => (
              <div key={p.step} className="relative animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="relative z-10 h-12 w-12 rounded-full grid place-items-center font-display text-sm font-semibold bg-background border-2 border-primary text-primary">
                  {p.step}
                </div>
                <h3 className="mt-5 font-display text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* PROGRAMMES PHARES */}
    <section className="py-16 lg:py-24 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Programmes phares</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-3">Des expériences qui transforment.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {programmesPreview.map((p) => (
            <Link to={p.to} key={p.title} className="group rounded-2xl overflow-hidden bg-card border hover-lift block">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-primary mb-2">{p.tag}</span>
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-foreground group-hover:text-primary transition">
                  Découvrir <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* TEMOIGNAGES */}
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Témoignages</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-3">Des voix, des vies, des trajectoires.</h2>
            <p className="text-muted-foreground mt-4">Chaque histoire est unique. Toutes parlent d'écoute, de courage et de retrouvailles.</p>
            <Placeholder label="Témoignages à mettre à jour" />
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-card border p-7 hover-lift">
                <Quote className="h-6 w-6 text-primary mb-3" />
                <blockquote className="text-foreground italic leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="flex items-center gap-3 mt-5">
                  <img src={t.image} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* AMBASSADEURS BANNER */}
    <section className="py-16 lg:py-24 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden ring-soft">
            <img src={ambassadeursImg} alt="Ambassadeurs Goungué" loading="lazy" className="w-full h-[420px] object-cover" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Réseau des Ambassadeurs</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-3">Une voix Goungué dans chaque région.</h2>
            <p className="mt-4 text-muted-foreground">Nos ambassadeurs sont d'anciens bénéficiaires et engagés communautaires qui portent la voix de Goungué dans leur quartier, leur école et leur ville.</p>
            <ul className="mt-6 space-y-3">
              {["Témoignage et inspiration", "Détection de jeunes en besoin", "Animation d'ateliers locaux", "Veille terrain et reporting"].map((l) => (
                <li key={l} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" /> {l}
                </li>
              ))}
            </ul>
            <Link to="/ambassadeurs" className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">
              Rencontrer le réseau <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* CTA FINAL */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-hero-gradient text-primary-foreground p-10 lg:p-16">
          <div className="absolute inset-0 pattern-grain opacity-30" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl lg:text-5xl">Prêt à écrire votre prochain chapitre ?</h2>
            <p className="mt-4 opacity-90">Que vous soyez jeune, parent ou mentor : il existe une porte d'entrée chez Goungué qui vous correspond.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inscription" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover-lift">
                Candidater maintenant <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/40 font-semibold hover:bg-white/10 transition">
                <MapPin className="h-4 w-4" /> Nous rendre visite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
  );
};

export default Index;
