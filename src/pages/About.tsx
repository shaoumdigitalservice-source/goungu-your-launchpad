import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Star, Target, Users } from "lucide-react";
import teamImg from "@/assets/about-team.jpg";

const values = [
  { icon: Target, title: "Humanité", desc: "Chaque parcours est unique. Nous accompagnons avec bienveillance et respect." },
  { icon: Star, title: "Excellence", desc: "Nous visons l'excellence dans chaque programme et chaque interaction." },
  { icon: Users, title: "Communauté", desc: "Ensemble, nous construisons un réseau solidaire d'entrepreneurs." },
  { icon: Eye, title: "Innovation", desc: "Des méthodes modernes adaptées aux réalités locales africaines." },
];

const About = () => (
  <Layout>
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            À propos de <span className="text-gradient">GOUNGUÉ</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            GOUNGUÉ est né de la conviction que chaque jeune et chaque femme mérite un accompagnement de qualité pour réaliser son potentiel. Notre mission : inspirer, guider et accompagner vers la réussite.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <img src={teamImg} alt="L'équipe GOUNGUÉ" className="rounded-2xl shadow-lg w-full object-cover h-80" loading="lazy" width={1280} height={720} />
          <div>
            <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Offrir aux jeunes et aux femmes du Sénégal un cadre d'accompagnement personnalisé — de l'orientation au lancement de leur projet entrepreneurial. Nous croyons en une Afrique portée par sa jeunesse.
            </p>
            <h2 className="text-2xl font-bold mb-4">Notre Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              Devenir le premier incubateur de référence au Sénégal pour l'accompagnement humain des jeunes et des femmes, en créant un écosystème d'innovation et de solidarité.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Nos Valeurs</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v) => (
            <div key={v.title} className="bg-card border rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/inscription" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
            Rejoindre le programme <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
