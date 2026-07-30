import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Sparkles, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import quartierImg from "@/assets/defarat-quartier.jpg";

const facts = [
  { icon: Users, label: "Public", value: "Jeunes volontaires de 15 à 25 ans" },
  { icon: Sparkles, label: "Format", value: "Actions communautaires de terrain" },
  { icon: Calendar, label: "Contexte", value: "En lien avec JOJ Dakar 2026" },
];

const objectifs = [
  "Organiser le nettoyage régulier des espaces publics",
  "Assurer l'entretien léger des infrastructures communales",
  "Développer le verdissement des quartiers",
  "Renforcer la sécurité communautaire",
  "Prévenir la délinquance et les violences",
  "Promouvoir le civisme",
  "Créer une dynamique locale d'engagement citoyen",
  "Valoriser le volontariat des jeunes",
];

const acteurs = [
  "Goungué Incub",
  "Communes",
  "Préfecture",
  "Jeunes bénévoles",
  "Délégués de quartier",
  "ASC",
  "Associations de femmes",
  "Bajenu Gox",
  "Établissements scolaires",
  "Entreprises locales",
  "Forces de défense et de sécurité",
  "Services d'hygiène",
  "Services des eaux et forêts",
  "Médias",
];

const SamaGoxSamaYitte = () => (
  <Layout>
    <PageHero
      eyebrow="Mon quartier, mon engagement"
      title="Sama gox, sama yitte"
      description="Une initiative citoyenne qui fait des jeunes les acteurs principaux de l'amélioration du cadre de vie dans leur quartier, en lien avec la préparation des Jeux Olympiques de la Jeunesse (JOJ Dakar 2026)."
      image={quartierImg}
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
        <div className="max-w-2xl mb-10">
          <span className="text-sm uppercase tracking-[0.18em] text-primary font-semibold">Objectifs</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-3">Un quartier plus propre, plus sûr, plus solidaire.</h2>
        </div>
        <div className="bg-card border rounded-2xl p-6">
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {objectifs.map((o) => (
              <li key={o} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/85 leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-8">
          <span className="text-sm uppercase tracking-[0.18em] text-primary font-semibold">Acteurs impliqués</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-3">Une mobilisation collective du quartier.</h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {acteurs.map((a) => (
            <span key={a} className="rounded-full border bg-card px-4 py-2 text-sm font-semibold">
              {a}
            </span>
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

export default SamaGoxSamaYitte;
