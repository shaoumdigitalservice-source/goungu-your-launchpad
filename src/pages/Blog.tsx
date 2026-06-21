import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import heroImg from "@/assets/hero-premium.jpg";
import campImg from "@/assets/camp-lac-rose.jpg";
import parentImg from "@/assets/parentalite.jpg";
import foyerImg from "@/assets/foyer.jpg";

const posts = [
  { img: heroImg, cat: "Mentorat", title: "Pourquoi le mentorat change tout pour un jeune en quête de repères", date: "12 juin 2026", min: "6 min" },
  { img: campImg, cat: "Camp 2025", title: "Retour sur 15 jours au Lac Rose : ce qu'ont vécu nos jeunes", date: "02 juin 2026", min: "8 min" },
  { img: parentImg, cat: "Parentalité", title: "Adolescence et réseaux sociaux : 7 conseils pour les parents", date: "20 mai 2026", min: "5 min" },
  { img: foyerImg, cat: "Foyer", title: "Le Foyer Goungué a un an : bilan et perspectives", date: "10 mai 2026", min: "4 min" },
];

const Blog = () => (
  <Layout>
    <PageHero
      eyebrow="Blog & Actualités"
      title="Histoires, conseils, regards sur la jeunesse africaine."
      description="Découvrez les voix Goungué : témoignages, analyses, reportages et conseils pratiques."
    />

    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <Placeholder label="Articles à publier" />
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="group rounded-3xl overflow-hidden border bg-card hover-lift">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  <span className="font-semibold text-primary">{p.cat}</span>
                  <span>{p.date} · {p.min}</span>
                </div>
                <h2 className="font-display text-2xl flex items-start justify-between gap-3">
                  {p.title}
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition mt-1" />
                </h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 flex items-center justify-between flex-wrap gap-6">
          <div>
            <h3 className="font-display text-2xl">Newsletter Goungué</h3>
            <p className="opacity-90 mt-1">Une fois par mois — conseils, opportunités et coulisses.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input type="email" required placeholder="votre@email.com" className="px-4 py-3 rounded-full bg-background text-foreground placeholder:text-muted-foreground text-sm w-full md:w-72 outline-none" />
            <button className="px-5 py-3 rounded-full bg-foreground text-background font-semibold text-sm">S'abonner</button>
          </form>
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;