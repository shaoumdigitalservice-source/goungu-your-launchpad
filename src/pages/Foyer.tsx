import { Link } from "react-router-dom";
import { GraduationCap, Heart, BookOpen, MessageCircle, Users, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import foyerImg from "@/assets/foyer.jpg";

const services = [
  { icon: Users, title: "Mentorat", desc: "Un référent dédié par jeune, à long terme, pour ne jamais rompre le lien." },
  { icon: BookOpen, title: "Soutien éducatif", desc: "Accompagnement scolaire, salles d'études, ressources pédagogiques." },
  { icon: MessageCircle, title: "Médiation familiale", desc: "Espaces sécurisés de dialogue parents-enfants animés par des médiateurs." },
  { icon: GraduationCap, title: "Orientation", desc: "Bilans réguliers, conseils, mise en relation avec écoles et entreprises." },
  { icon: Heart, title: "Accompagnement psychosocial", desc: "Consultations confidentielles avec psychologues partenaires." },
];

const Foyer = () => (
  <Layout>
    <PageHero
      eyebrow="Foyer Goungué"
      title="Un foyer, pas un guichet. La continuité d'une présence."
      description="Après l'incubation, l'aventure continue. Le Foyer Goungué est l'espace de vie, de mentorat et de ressources pour celles et ceux qui ont fait le chemin avec nous."
      image={foyerImg}
    >
      <Link to="/inscription" className="px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">Rejoindre le foyer</Link>
      <Link to="/contact" className="px-6 py-3.5 rounded-full border border-foreground/20 font-semibold hover:bg-foreground/5 transition">Visiter nos locaux</Link>
    </PageHero>

    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <div key={s.title} className="rounded-2xl border bg-card p-7 hover-lift">
            <div className="h-12 w-12 rounded-2xl bg-secondary text-secondary-foreground grid place-items-center mb-4">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl overflow-hidden ring-soft">
          <img src={foyerImg} alt="Intérieur du Foyer Goungué" loading="lazy" className="w-full h-[400px] object-cover" />
        </div>
        <div>
          <h2 className="font-display text-4xl">Un lieu où l'on revient.</h2>
          <p className="text-muted-foreground mt-4">Bibliothèque, salle d'études, espace d'écoute, salles d'ateliers, jardin : chaque détail a été pensé pour offrir aux jeunes et aux familles un cocon d'apprentissage et de vie.</p>
          <Link to="/communaute" className="inline-flex items-center gap-2 mt-6 text-primary font-semibold">
            Voir les prochains événements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Foyer;