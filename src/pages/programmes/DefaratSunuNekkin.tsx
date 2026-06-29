import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Users,
  HeartHandshake,
  MessageCircle,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Compass,
  Crown,
  Award,
  Medal,
  Trophy,
  FileText,
  LayoutDashboard,
  Home,
  Baby,
  UserCheck,
  Building2,
  Landmark,
  Handshake,
  ChevronDown,
} from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/defarat-hero.jpg";
import conseilImg from "@/assets/defarat-conseil.jpg";
import coachingImg from "@/assets/defarat-coaching.jpg";
import campImg from "@/assets/camp-lac-rose.jpg";
import parentImg from "@/assets/parentalite.jpg";
import heroPremium from "@/assets/hero-premium.jpg";
import { Tent } from "lucide-react";

const volets = [
  {
    to: "/programmes/camp-lac-rose",
    title: "Camp de Vacances d'Incubation Sociale",
    tag: "Volet jeunes · 15 jours",
    icon: Tent,
    img: campImg,
    desc: "Une immersion de 15 jours au Lac Rose pour se comprendre, se reconstruire, se projeter et se réconcilier avec sa famille.",
  },
  {
    to: "/programmes/parentalite-positive",
    title: "Parentalité Positive",
    tag: "Volet parents · 6 modules",
    icon: HeartHandshake,
    img: parentImg,
    desc: "Un parcours pour les parents : comprendre l'adolescence, communiquer, accompagner les choix d'avenir.",
  },
  {
    to: "/programmes/accompagnement-familial",
    title: "Accompagnement Familial",
    tag: "Volet familles · suivi",
    icon: Users,
    img: heroPremium,
    desc: "Médiation, écoute, ateliers conjoints parents-enfants pour rétablir la cohésion et la confiance.",
  },
];

const defis = [
  { title: "Affaiblissement des liens familiaux", desc: "Les rythmes modernes éloignent les générations et fragilisent la transmission." },
  { title: "Difficultés éducatives", desc: "Parents et enfants peinent à trouver un langage commun face aux nouveaux défis." },
  { title: "Conflits familiaux", desc: "Tensions, ruptures, malentendus s'installent faute d'espaces de dialogue." },
  { title: "Perte des valeurs", desc: "L'érosion des repères affaiblit la cohésion et la responsabilité partagée." },
  { title: "Manque de dialogue", desc: "La parole circule peu : les non-dits prennent la place de la concertation." },
  { title: "Faible implication communautaire", desc: "Les familles s'isolent là où elles devraient se renforcer collectivement." },
];

const objectifs = [
  { icon: ShieldCheck, title: "Renforcer la gouvernance familiale", desc: "Installer des règles claires, partagées et respectées au sein du foyer." },
  { icon: MessageCircle, title: "Développer le dialogue familial", desc: "Faire de la parole un outil quotidien de compréhension et de décision." },
  { icon: Sparkles, title: "Promouvoir les valeurs citoyennes", desc: "Transmettre le sens du bien commun, du respect et de la responsabilité." },
  { icon: GraduationCap, title: "Améliorer l'éducation des enfants", desc: "Accompagner les parents dans une éducation positive et exigeante." },
  { icon: HeartHandshake, title: "Renforcer la cohésion sociale", desc: "Tisser des liens solides entre familles, quartiers et communautés." },
  { icon: Compass, title: "Accompagner le développement", desc: "Soutenir les familles dans la construction d'un projet de vie durable." },
];

const piliers = [
  { icon: ShieldCheck, title: "Gouvernance familiale", desc: "Structurer la vie du foyer autour de valeurs et de règles partagées." },
  { icon: Users, title: "Conseils de famille", desc: "Des rendez-vous réguliers pour décider et avancer ensemble." },
  { icon: HeartHandshake, title: "Coaching des familles", desc: "Un accompagnement personnalisé par un facilitateur formé." },
  { icon: GraduationCap, title: "Formation des parents", desc: "Outils concrets pour éduquer, dialoguer et accompagner." },
  { icon: Crown, title: "Leadership familial", desc: "Renforcer le rôle moteur des parents et des aînés." },
  { icon: Sparkles, title: "Participation citoyenne", desc: "Faire de chaque famille un acteur de la vie communautaire." },
  { icon: Building2, title: "Développement communautaire", desc: "Connecter les familles aux dynamiques locales et nationales." },
];

const etapes = [
  "Adhésion de la famille",
  "Diagnostic familial",
  "Formation",
  "Conseils de famille",
  "Coaching personnalisé",
  "Suivi des engagements",
  "Évaluation",
  "Labellisation",
];

const labels = [
  {
    icon: Medal,
    name: "Famille Engagée",
    level: "Bronze",
    accent: "from-amber-700/20 to-amber-900/10 text-amber-800",
    criteres: "Adhésion officielle, première formation suivie, premier conseil de famille tenu.",
    avantages: "Reconnaissance locale, kit d'adhésion, accès à la plateforme.",
  },
  {
    icon: Award,
    name: "Famille Performante",
    level: "Argent",
    accent: "from-slate-400/30 to-slate-600/10 text-slate-700",
    criteres: "6 mois d'engagement, conseils de famille réguliers, plan d'action mis en œuvre.",
    avantages: "Mise en avant communale, ateliers avancés, mentorat dédié.",
  },
  {
    icon: Trophy,
    name: "Famille Exemplaire",
    level: "Or",
    accent: "from-secondary/30 to-secondary/10 text-secondary",
    criteres: "1 an d'engagement, résultats mesurables, contribution à la communauté.",
    avantages: "Distinction nationale, accès aux instances consultatives, visibilité médiatique.",
  },
  {
    icon: Crown,
    name: "Keuru Njariñ",
    level: "Excellence",
    accent: "from-primary/30 to-primary/10 text-primary",
    criteres: "Modèle inspirant, transmission active, accompagnement d'autres familles.",
    avantages: "Reconnaissance officielle de l'État et des partenaires, ambassade communautaire.",
  },
];

const outils = [
  { title: "Charte nationale des familles", desc: "Le socle commun de valeurs et d'engagements partagés." },
  { title: "Acte d'engagement familial", desc: "L'engagement formel de la famille au sein du programme." },
  { title: "Fiche d'adhésion", desc: "Le document d'entrée structurant le parcours familial." },
  { title: "Code de conduite", desc: "Les règles de fonctionnement entre familles, facilitateurs et partenaires." },
  { title: "Autorisation de protection des données", desc: "Le consentement éclairé pour le suivi numérique." },
  { title: "Attestation de participation", desc: "Le justificatif officiel délivré à chaque étape clé." },
];

const beneficiaires = [
  { icon: Home, label: "Familles" },
  { icon: Baby, label: "Enfants" },
  { icon: UserCheck, label: "Jeunes" },
  { icon: Users, label: "Femmes" },
  { icon: Building2, label: "Collectivités territoriales" },
  { icon: Landmark, label: "État" },
  { icon: Handshake, label: "Partenaires" },
];

const stats = [
  { value: "10 000+", label: "Familles accompagnées" },
  { value: "25 000+", label: "Conseils de famille réalisés" },
  { value: "500+", label: "Facilitateurs formés" },
  { value: "120+", label: "Communes partenaires" },
  { value: "3 500+", label: "Labels attribués" },
];

const faq = [
  { q: "Qui peut rejoindre DEFARAT SUNU NEKKIN ?", a: "Toute famille résidant au Sénégal, quel que soit son lieu, sa religion ou sa composition, peut adhérer au programme." },
  { q: "Le programme est-il payant ?", a: "L'adhésion est libre et gratuite. Certaines formations spécialisées peuvent faire l'objet d'une contribution symbolique." },
  { q: "Combien de temps dure l'engagement ?", a: "L'adhésion est annuelle et renouvelable. Le parcours de labellisation se construit progressivement." },
  { q: "Comment se déroulent les Conseils de Famille ?", a: "Ce sont des rencontres régulières, animées avec des outils simples fournis par le programme, qui favorisent dialogue et décisions partagées." },
  { q: "Mon entreprise ou ma commune peut-elle devenir partenaire ?", a: "Oui. Les collectivités, institutions et entreprises peuvent rejoindre le programme via la plateforme communale." },
  { q: "Comment les données des familles sont-elles protégées ?", a: "Toutes les données sont collectées avec consentement et traitées dans le respect strict de la réglementation en vigueur." },
];

const DefaratSunuNekkin = () => (
  <Layout>
    <PageHero
      eyebrow="DEFARAT SUNU NEKKIN"
      title="Refaire notre manière d'être, ensemble."
      description="Un programme national de gouvernance familiale et de cohésion sociale pour renforcer les familles, transmettre les valeurs et bâtir des communautés solides."
      image={heroImg}
    >
      <Link
        to="/inscription?programme=defarat-sunu-nekkin"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift"
      >
        Rejoindre le programme <ArrowRight className="h-4 w-4" />
      </Link>
      <a
        href="#telecharger"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-foreground/20 font-semibold hover:bg-foreground/5 transition"
      >
        <Download className="h-4 w-4" /> Télécharger la présentation
      </a>
    </PageHero>

    {/* 2. Pourquoi */}
    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Pourquoi ce programme ?</span>
          <h2 className="font-display text-4xl mt-3">Les défis auxquels DEFARAT SUNU NEKKIN répond.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {defis.map((d) => (
            <div key={d.title} className="rounded-2xl border bg-card p-6 hover-lift">
              <h3 className="font-display text-lg">{d.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. Objectifs */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Objectifs</span>
          <h2 className="font-display text-4xl mt-3">Six objectifs au service des familles et des communautés.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {objectifs.map((o) => (
            <div key={o.title} className="rounded-2xl border bg-card p-7 hover-lift">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-4">
                <o.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl">{o.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. Piliers */}
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Les piliers</span>
          <h2 className="font-display text-4xl mt-3">Sept piliers pour une famille forte et engagée.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {piliers.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-card p-6 hover-lift">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-background grid place-items-center mb-4">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 5. Fonctionnement */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Le fonctionnement</span>
            <h2 className="font-display text-4xl mt-3">Un parcours en huit étapes, clair et progressif.</h2>
          </div>
          <Placeholder label="Étapes susceptibles d'évoluer" />
        </div>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {etapes.map((e, i) => (
            <li key={e} className="relative rounded-2xl border bg-card p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Étape {i + 1}</div>
              <div className="font-display text-lg mt-1">{e}</div>
              {i < etapes.length - 1 && (
                <ChevronDown className="h-5 w-5 text-primary absolute -bottom-3 left-1/2 -translate-x-1/2 md:hidden" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* 6. Conseils de famille */}
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl overflow-hidden">
          <img src={conseilImg} alt="Conseil de famille en cours" loading="lazy" width={1280} height={896} className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Les Conseils de Famille</span>
          <h2 className="font-display text-4xl mt-3">Une parole structurée, des décisions partagées.</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Le Conseil de Famille est le cœur du programme : un espace régulier où chacun s'écoute, décide et s'engage.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { k: "Rôle", v: "Lieu de dialogue, de décision et de transmission des valeurs." },
              { k: "Fréquence", v: "Une rencontre mensuelle minimum, en présence de tous les membres." },
              { k: "Fonctionnement", v: "Ordre du jour partagé, parole circulaire, décisions consignées." },
              { k: "Outils", v: "Guide d'animation, carnet de famille, fiches d'engagement." },
              { k: "Bénéfices", v: "Cohésion, prévention des conflits, transmission, confiance retrouvée." },
            ].map((row) => (
              <div key={row.k} className="flex gap-4 rounded-xl bg-card border p-4">
                <div className="text-xs uppercase tracking-wider text-primary font-semibold w-32 shrink-0">{row.k}</div>
                <div className="text-sm text-foreground/80">{row.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* 7. Coaching */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Coaching des familles</span>
          <h2 className="font-display text-4xl mt-3">Un accompagnement humain, sur mesure.</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Chaque famille est unique. Nos facilitateurs formés accompagnent les familles dans la durée, avec discrétion et bienveillance.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {[
              "Accompagnement personnalisé",
              "Résolution des conflits",
              "Communication familiale",
              "Gestion financière familiale",
              "Éducation des enfants",
              "Préparation des jeunes à l'avenir",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                <span className="h-2 w-2 rounded-full bg-primary mt-2" />
                <span className="text-sm">{x}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2 rounded-3xl overflow-hidden">
          <img src={coachingImg} alt="Session de coaching familial" loading="lazy" width={1280} height={896} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    {/* 8. Labels */}
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Les Labels</span>
          <h2 className="font-display text-4xl mt-3">Quatre niveaux de reconnaissance pour valoriser l'engagement.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {labels.map((l) => (
            <div key={l.name} className="rounded-3xl border bg-card overflow-hidden hover-lift">
              <div className={`bg-gradient-to-br ${l.accent} p-8 grid place-items-center`}>
                <l.icon className="h-14 w-14" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Niveau {l.level}</div>
                <h3 className="font-display text-xl mt-1">{l.name}</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-primary font-semibold">Critères</div>
                    <p className="text-foreground/80 mt-1">{l.criteres}</p>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-primary font-semibold">Avantages</div>
                    <p className="text-foreground/80 mt-1">{l.avantages}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          Chaque label fait l'objet d'une reconnaissance officielle remise lors d'une cérémonie communale ou nationale.
        </p>
      </div>
    </section>

    {/* 9. Outils */}
    <section id="telecharger" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Les outils du programme</span>
          <h2 className="font-display text-4xl mt-3">Des documents officiels pour cadrer l'engagement.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {outils.map((o) => (
            <div key={o.title} className="rounded-2xl border bg-card p-6 flex gap-4 hover-lift">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg">{o.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 10. Plateforme communale */}
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Plateforme communale</span>
          <h2 className="font-display text-4xl mt-3">Une plateforme numérique au service des communes et des familles.</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            DEFARAT SUNU NEKKIN s'appuie sur un outil numérique moderne, accessible et sécurisé, pensé pour les facilitateurs locaux et les autorités communales.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              "Inscription des familles",
              "Suivi des engagements",
              "Tableaux de bord par commune",
              "Indicateurs d'impact",
              "Suivi des facilitateurs",
              "Remontée des données vers GOUNGUÉ",
            ].map((x) => (
              <li key={x} className="flex items-center gap-3">
                <LayoutDashboard className="h-4 w-4 text-primary" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Tableau de bord communal</div>
              <Placeholder label="Maquette" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "1 248", l: "Familles" },
                { v: "318", l: "Conseils" },
                { v: "42", l: "Facilitateurs" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-card border p-4">
                  <div className="font-display text-2xl">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {[72, 58, 41, 33].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-20 text-[11px] text-muted-foreground">Commune {i + 1}</div>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${w}%` }} />
                  </div>
                  <div className="text-[11px] text-muted-foreground w-8 text-right">{w}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 11. Bénéficiaires */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Les bénéficiaires</span>
          <h2 className="font-display text-4xl mt-3">Un programme qui rassemble tous les acteurs de la société.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {beneficiaires.map((b) => (
            <div key={b.label} className="rounded-2xl border bg-card p-5 text-center hover-lift">
              <div className="h-12 w-12 mx-auto rounded-2xl bg-primary/10 text-primary grid place-items-center mb-3">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{b.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 12. Impact */}
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Impact attendu</span>
            <h2 className="font-display text-4xl mt-3">Des chiffres au service d'une transformation durable.</h2>
          </div>
          <Placeholder label="Données prévisionnelles" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border bg-card p-6 text-center">
              <div className="font-display text-4xl text-primary">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 13. FAQ */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">FAQ</span>
        <h2 className="font-display text-4xl mt-3 mb-8">Vos questions, nos réponses.</h2>
        <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
              <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* 14. CTA */}
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 lg:p-14">
          <div className="max-w-3xl">
            <h3 className="font-display text-3xl lg:text-4xl leading-tight">
              Familles, communes, partenaires, institutions : rejoignez DEFARAT SUNU NEKKIN.
            </h3>
            <p className="opacity-90 mt-3 text-lg">
              Ensemble, refaisons notre manière d'être pour bâtir un Sénégal plus uni, plus juste et plus solidaire.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/inscription?programme=defarat-sunu-nekkin"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover-lift"
            >
              Rejoindre le programme <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-primary-foreground/30 font-semibold hover:bg-primary-foreground/10 transition"
            >
              Devenir partenaire
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default DefaratSunuNekkin;