import { MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import ambassadeursImg from "@/assets/ambassadeurs.jpg";

const ambassadeurs = [
  { name: "Awa Sow", region: "Dakar", role: "Ambassadrice — Promotion 2023" },
  { name: "Cheikh Ba", region: "Saint-Louis", role: "Ambassadeur — Promotion 2022" },
  { name: "Mariama Diop", region: "Thiès", role: "Ambassadrice — Promotion 2024" },
  { name: "Ibrahima Sarr", region: "Ziguinchor", role: "Ambassadeur — Promotion 2023" },
  { name: "Khady Faye", region: "Kaolack", role: "Ambassadrice — Promotion 2024" },
  { name: "Modou Gueye", region: "Tambacounda", role: "Ambassadeur — Promotion 2022" },
];

const Ambassadeurs = () => (
  <Layout>
    <PageHero
      eyebrow="Réseau des Ambassadeurs Goungué"
      title="Des visages, des régions, une même conviction."
      description="Nos ambassadeurs sont d'anciens bénéficiaires devenus relais Goungué dans toutes les régions du Sénégal."
      image={ambassadeursImg}
    />

    <section className="pb-24">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="rounded-3xl border bg-card p-6 sticky top-24">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Carte du Sénégal</div>
            <h3 className="font-display text-2xl mt-2">11 régions couvertes</h3>
            <Placeholder label="Carte interactive à venir" />
            <div className="mt-4 aspect-[4/5] rounded-2xl bg-section-alt pattern-weave flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-10 w-10 mx-auto text-primary mb-3" />
                <p className="text-sm text-muted-foreground">Visualisation de la carte de couverture nationale<br />avec ambassadeurs par région.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          {ambassadeurs.map((a, i) => (
            <article key={i} className="rounded-2xl border bg-card p-6 hover-lift">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center font-display text-xl">
                {a.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display text-xl mt-4">{a.name}</h3>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{a.role}</div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" /> {a.region}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Ambassadeurs;