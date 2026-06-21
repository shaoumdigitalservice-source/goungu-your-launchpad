import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import parentImg from "@/assets/parentalite.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const modules = [
  { n: "01", title: "Comprendre l'adolescence", desc: "Les transformations physiques, émotionnelles et sociales du jeune adolescent." },
  { n: "02", title: "Communication familiale", desc: "Écouter sans juger, parler sans blesser. Outils concrets de communication non-violente." },
  { n: "03", title: "Discipline positive", desc: "Poser un cadre clair, ferme et bienveillant, sans humiliation ni violence." },
  { n: "04", title: "Réseaux sociaux & écrans", desc: "Accompagner son adolescent dans son usage du numérique sans diaboliser." },
  { n: "05", title: "Orientation scolaire & projet de vie", desc: "Aider son enfant à choisir sa voie sans imposer un destin." },
  { n: "06", title: "Prévention des risques", desc: "Addictions, violences, grossesses précoces : reconnaître et intervenir tôt." },
];

const faqs = [
  { q: "À qui s'adresse ce programme ?", a: "À tous les parents d'enfants âgés de 10 à 20 ans, quelle que soit leur situation familiale ou socio-économique." },
  { q: "Combien de temps dure le programme ?", a: "Le parcours s'étale sur 3 mois, avec un module par semaine en présentiel ou en visio." },
  { q: "Est-ce payant ?", a: "Une participation symbolique est demandée. Des bourses sont disponibles pour les familles à faible revenu." },
  { q: "Comment s'inscrire ?", a: "Via le formulaire de candidature en ligne. Un entretien préalable est ensuite proposé." },
];

const Parentalite = () => (
  <Layout>
    <PageHero
      eyebrow="Programme de Parentalité Positive"
      title="Devenir un parent qui écoute, comprend et accompagne."
      description="Un parcours de 6 modules conçu avec des psychologues, éducateurs et parents pour outiller les familles face aux défis d'aujourd'hui."
      image={parentImg}
    >
      <Link to="/inscription?programme=parentalite" className="px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">
        Rejoindre la prochaine cohorte
      </Link>
    </PageHero>

    <section className="pb-20">
      <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-5">
        {modules.map((m) => (
          <div key={m.n} className="rounded-2xl border bg-card p-7 hover-lift">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-display text-3xl text-primary">{m.n}</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Module {m.n}</span>
            </div>
            <h3 className="font-display text-2xl">{m.title}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">FAQ</span>
          <h2 className="font-display text-4xl mt-3">Vos questions, nos réponses.</h2>
        </div>
        <div className="md:col-span-7">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border bg-card px-5 py-1">
                <AccordionTrigger className="font-display text-lg text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  </Layout>
);

export default Parentalite;