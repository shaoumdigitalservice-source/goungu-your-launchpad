import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Users,
  Sparkles,
  HeartPulse,
  Wallet,
  Brain,
  HandHeart,
  Laptop,
  GraduationCap,
} from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import parentsImg from "@/assets/defarat-parents.jpg";

const facts = [
  { icon: Users, label: "Public", value: "Parents et tuteurs des jeunes accompagnés" },
  { icon: Sparkles, label: "Format", value: "Ateliers, cliniques, coaching" },
  { icon: Calendar, label: "Fréquence", value: "Activités mensuelles à annuelles" },
];

const axes = [
  { icon: GraduationCap, title: "Renforcement des compétences parentales" },
  { icon: Wallet, title: "Autonomisation économique" },
  { icon: HeartPulse, title: "Santé et bien-être familial" },
  { icon: Brain, title: "Accompagnement psychosocial" },
  { icon: HandHeart, title: "Développement communautaire" },
  { icon: Laptop, title: "Accompagnement numérique" },
];

const activites = [
  { nom: "Académie des Parents", freq: "Mensuelle" },
  { nom: "Café des Parents", freq: "Deux fois par mois" },
  { nom: "Cliniques familiales", freq: "Hebdomadaire" },
  { nom: "Coaching économique", freq: "Sur rendez-vous" },
  { nom: "Caravane Defarat Sunu Nekkin", freq: "Trimestrielle" },
  { nom: "Journée Famille & Bien-être", freq: "Trimestrielle" },
  { nom: "Foire des initiatives familiales", freq: "Annuelle" },
  { nom: "Prix des Familles Inspirantes", freq: "Annuelle" },
];

const DoolelWajurYi = () => (
  <Layout>
    <PageHero
      eyebrow="Accompagnement des parents"
      title="Doolel wajur yi"
      description="L'accompagnement des parents est conçu comme un levier de renforcement du bien-être familial, de la résilience économique et de la réussite éducative des enfants."
      image={parentsImg}
    />

    <section className="pb-16">
      <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl border bg-card p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center shrink-0">
              <f.icon className="h-5 w-5" />
            </div>
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
          <span className="text-sm uppercase tracking-[0.18em] text-primary font-semibold">Les six axes</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-3">Six axes d'accompagnement des parents.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {axes.map((a) => (
            <div key={a.title} className="rounded-2xl border bg-card p-7 hover-lift">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-background grid place-items-center mb-4">
                <a.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">{a.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-sm uppercase tracking-[0.18em] text-primary font-semibold">Activités phares</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-3">Un rythme d'activités tout au long de l'année.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {activites.map((a) => (
            <div key={a.nom} className="rounded-2xl border bg-card p-6 flex items-center justify-between gap-4">
              <div className="font-display text-xl">{a.nom}</div>
              <span className="text-xs uppercase tracking-wider font-semibold rounded-full bg-primary/10 text-primary px-3 py-1.5 whitespace-nowrap">
                {a.freq}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to="/programmes/defarat-sunu-nekkin" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
          <ArrowLeft className="h-4 w-4" /> Retour à Defarat Sunu Nekkin
        </Link>
      </div>
    </section>
  </Layout>
);

export default DoolelWajurYi;
