import { Calendar, MapPin, Users } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";

const events = [
  { date: "12 sept.", title: "Forum des métiers — Dakar", place: "Foyer Goungué", type: "Forum" },
  { date: "28 sept.", title: "Atelier parentalité positive", place: "Pikine, Centre culturel", type: "Atelier" },
  { date: "10 oct.", title: "Conférence : adolescents & écrans", place: "Université CAD", type: "Conférence" },
  { date: "25 oct.", title: "Restitution Camp Lac Rose 2026", place: "Lac Rose", type: "Événement" },
  { date: "08 nov.", title: "Rencontre des Ambassadeurs", place: "Thiès", type: "Réseau" },
  { date: "22 nov.", title: "Forum entrepreneuriat jeunes", place: "Dakar", type: "Forum" },
];

const Communaute = () => (
  <Layout>
    <PageHero
      eyebrow="Communauté Goungué"
      title="Apprendre ensemble, célébrer ensemble, grandir ensemble."
      description="Événements, ateliers, conférences, forums : une vie communautaire active toute l'année."
    />

    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl">Prochains événements</h2>
          <Placeholder label="Agenda à connecter" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e, i) => (
            <article key={i} className="rounded-2xl border bg-card p-7 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-display text-primary">{e.date}</div>
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded-full bg-foreground text-background">{e.type}</span>
              </div>
              <h3 className="font-display text-xl">{e.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                <MapPin className="h-4 w-4" /> {e.place}
              </div>
              <button className="mt-5 w-full px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-primary transition">
                S'inscrire à l'événement
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-section-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-3xl bg-ink p-10 lg:p-14 flex items-center justify-between flex-wrap gap-6">
          <div>
            <Users className="h-8 w-8 opacity-80 mb-3" />
            <h2 className="font-display text-3xl">Rejoindre le forum Goungué</h2>
            <p className="opacity-80 mt-2 max-w-xl">Un espace réservé aux jeunes, parents et mentors pour échanger, poser des questions et s'entraider.</p>
          </div>
          <button className="px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover-lift">Demander un accès</button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Communaute;