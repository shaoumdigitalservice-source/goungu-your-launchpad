import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Stethoscope, Code2, Hammer, Sprout, GraduationCap, Camera, Briefcase, Microscope } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";

const metiers = [
  { icon: Stethoscope, name: "Santé & soins", desc: "Infirmier, sage-femme, aide-soignant, kinésithérapeute." },
  { icon: Code2, name: "Numérique & data", desc: "Développeur, data analyst, designer UX, cybersécurité." },
  { icon: Hammer, name: "Métiers techniques", desc: "Électricien, plombier, maçon, technicien solaire." },
  { icon: Sprout, name: "Agriculture & agro-tech", desc: "Maraîcher, agronome, transformation alimentaire." },
  { icon: GraduationCap, name: "Éducation", desc: "Enseignant, éducateur spécialisé, formateur." },
  { icon: Camera, name: "Création & culture", desc: "Photographe, vidéaste, designer, artisan d'art." },
  { icon: Briefcase, name: "Entrepreneuriat", desc: "Commerce, finance, gestion de projet, économie sociale." },
  { icon: Microscope, name: "Sciences & ingénierie", desc: "Ingénieur, chercheur, technicien laboratoire." },
];

const Orientation = () => {
  const [q, setQ] = useState("");
  const filtered = metiers.filter((m) => m.name.toLowerCase().includes(q.toLowerCase()) || m.desc.toLowerCase().includes(q.toLowerCase()));

  return (
    <Layout>
      <PageHero
        eyebrow="Centre d'Orientation"
        title="Découvrir les métiers. Choisir sa voie. Avancer avec sens."
        description="Explorez des fiches métiers, identifiez les secteurs porteurs au Sénégal et obtenez des recommandations personnalisées."
      >
        <Link to="/orientation#quiz" className="px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover-lift">Faire le quiz d'orientation</Link>
      </PageHero>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 max-w-xl rounded-full border bg-card px-5 py-3 ring-soft">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un métier, un secteur..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((m) => (
              <div key={m.name} className="rounded-2xl border bg-card p-6 hover-lift">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-3">
                  <m.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">Aucun métier trouvé.</div>
            )}
          </div>
        </div>
      </section>

      <section id="quiz" className="py-16 bg-section-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 lg:p-14 flex items-center justify-between flex-wrap gap-6">
            <div>
              <h2 className="font-display text-3xl">Quiz d'orientation Goungué</h2>
              <p className="opacity-90 mt-2 max-w-xl">15 questions pour explorer vos talents, vos valeurs et trois pistes de métiers qui pourraient vous correspondre.</p>
              <Placeholder label="Quiz interactif à connecter" />
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover-lift">
              Démarrer le quiz <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orientation;