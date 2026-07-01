import { Link } from "react-router-dom";
import { ShieldCheck, HeartHandshake, Timer, Sprout, TrendingUp, Users, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import menilImg from "@/assets/menil-war-wi.jpg";

const piliers = [
  { icon: ShieldCheck, title: "Supporter les difficultés", desc: "Diagnostic 360°, cellule d'écoute et plans de redressement pour les entreprises en tension." },
  { icon: HeartHandshake, title: "Endurer les épreuves", desc: "Coaching de dirigeants, mentorat pair-à-pair et soutien psychologique dédié aux entrepreneurs." },
  { icon: Timer, title: "Patience face aux contraintes", desc: "Feuilles de route long terme, jalons trimestriels et discipline d'exécution partagée." },
  { icon: Sprout, title: "Résister aux aléas", desc: "Gestion de trésorerie, diversification, plans de continuité et mise en réseau stratégique." },
];

const services = [
  { icon: TrendingUp, title: "Audit & diagnostic", desc: "État des lieux financier, opérationnel et humain de l'entreprise en 3 semaines." },
  { icon: Users, title: "Cellule de résilience", desc: "Un binôme coach + expert-métier mobilisé sur 6 à 12 mois auprès du dirigeant." },
  { icon: HeartHandshake, title: "Communauté de pairs", desc: "Cercles mensuels entre dirigeants pour partager les épreuves et les solutions." },
];

const MenilWarWi = () => (
  <Layout>
    <PageHero
      eyebrow="Meñil War Wi"
      title="Meñil War Wi — tenir bon, ensemble."
      description="Un programme d'accompagnement des entreprises sénégalaises pour supporter les difficultés, endurer les épreuves, faire preuve de patience face aux contraintes et résister aux aléas."
      image={menilImg}
    >
      <Link to="/inscription" className="px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">Candidater</Link>
      <Link to="/contact" className="px-6 py-3.5 rounded-full border border-foreground/20 font-semibold hover:bg-foreground/5 transition">Parler à un conseiller</Link>
    </PageHero>

    <section className="pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Les 4 piliers</span>
          <h2 className="font-display text-3xl lg:text-4xl mt-3">Quatre postures pour traverser les tempêtes.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {piliers.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-card p-7 hover-lift">
              <div className="h-12 w-12 rounded-2xl bg-secondary text-secondary-foreground grid place-items-center mb-4">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-5">
        {services.map((s) => (
          <div key={s.title} className="rounded-2xl bg-card border p-7 hover-lift">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-4">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl overflow-hidden ring-soft">
          <img src={menilImg} alt="Coaching d'entreprise Meñil War Wi" loading="lazy" width={1024} height={1024} className="w-full h-[400px] object-cover" />
        </div>
        <div>
          <h2 className="font-display text-4xl">Pour qui&nbsp;?</h2>
          <p className="text-muted-foreground mt-4">TPE et PME sénégalaises confrontées à un ralentissement, un choc externe ou une phase de transformation. Meñil War Wi s'adresse aux dirigeants prêts à travailler leur résilience en équipe et sur la durée.</p>
          <Link to="/inscription" className="inline-flex items-center gap-2 mt-6 text-primary font-semibold">
            Déposer ma candidature <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default MenilWarWi;