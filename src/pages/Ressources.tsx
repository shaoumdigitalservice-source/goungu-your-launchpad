import { FileText, Video, BookOpen, Download, Headphones } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";

const items = [
  { icon: FileText, type: "Guide", title: "Bien accompagner son adolescent face aux réseaux sociaux", tag: "Parents" },
  { icon: Video, type: "Vidéo", title: "Découvrir les métiers de la santé au Sénégal", tag: "Jeunes" },
  { icon: BookOpen, type: "Formation", title: "Communication non-violente en famille — Niveau 1", tag: "Parents" },
  { icon: Headphones, type: "Podcast", title: "Voix Goungué — Saison 1, 6 épisodes", tag: "Tous" },
  { icon: FileText, type: "Outil", title: "Carnet du Passeport Avenir (modèle imprimable)", tag: "Jeunes" },
  { icon: Video, type: "Vidéo", title: "Choisir sa filière au lycée : 5 questions à se poser", tag: "Jeunes" },
  { icon: FileText, type: "Guide", title: "Détecter les signes du décrochage scolaire", tag: "Parents" },
  { icon: BookOpen, type: "Formation", title: "Initiation à la médiation familiale", tag: "Mentors" },
];

const Ressources = () => (
  <Layout>
    <PageHero
      eyebrow="Centre de Ressources"
      title="Une bibliothèque vivante pour jeunes, parents et mentors."
      description="Guides, vidéos, formations, outils téléchargeables : tout ce que nous mettons à votre disposition pour grandir ensemble."
    />

    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Placeholder label="Catalogue à enrichir" />
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <article key={i} className="group rounded-2xl border bg-card p-7 hover-lift flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="h-11 w-11 rounded-2xl bg-foreground text-background grid place-items-center"><it.icon className="h-5 w-5" /></div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-primary">{it.type}</span>
              </div>
              <h3 className="font-display text-lg flex-1">{it.title}</h3>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Public : {it.tag}</span>
                <button className="inline-flex items-center gap-1 font-semibold text-primary group-hover:gap-2 transition-all">
                  Accéder <Download className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Ressources;