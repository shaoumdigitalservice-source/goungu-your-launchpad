import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Compass, BookOpen, MessageCircle, Sparkles, Target, FileBadge, GraduationCap, Award, Loader2, UserPlus, CalendarCheck, Calendar } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section, StatCard } from "./EspaceLayout";
import Placeholder from "@/components/Placeholder";
import { useAuth } from "@/contexts/AuthContext";
import { getMonParcours, EtapeParcours } from "@/api/parcoursApi";
import { getMonPasseport, PasseportEntree } from "@/api/passeportApi";
import { getMonMentor, MonMentor } from "@/api/mentorApi";

const items = [
  { to: "/espace/jeune", label: "Tableau de bord", icon: Sparkles },
  { to: "/espace/jeune/parcours", label: "Mon parcours", icon: Target },
  { to: "/espace/jeune/passeport", label: "Passeport Avenir", icon: FileBadge },
  { to: "/espace/jeune/orientation", label: "Orientation", icon: Compass },
  { to: "/espace/jeune/mentor", label: "Mon mentor", icon: MessageCircle },
  { to: "/espace/jeune/rdv", label: "Rendez-vous", icon: Calendar },
  { to: "/espace/jeune/ressources", label: "Ressources", icon: BookOpen },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Jeune = () => {
  const { user } = useAuth();
  const [etapes, setEtapes] = useState<EtapeParcours[]>([]);
  const [passeport, setPasseport] = useState<PasseportEntree[]>([]);
  const [mentor, setMentor] = useState<MonMentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const charger = async () => {
      const [etapesRes, passeportRes, mentorRes] = await Promise.allSettled([
        getMonParcours(),
        getMonPasseport(),
        getMonMentor(),
      ]);
      if (etapesRes.status === "fulfilled") setEtapes(etapesRes.value);
      if (passeportRes.status === "fulfilled") setPasseport(passeportRes.value);
      if (mentorRes.status === "fulfilled") setMentor(mentorRes.value);
      setLoading(false);
    };
    charger();
  }, []);

  const competences = passeport.filter((p) => p.type === "COMPETENCE").length;
  const realisations = passeport.filter((p) => p.type === "REALISATION").length;
  const dernieresEtapes = [...etapes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  const iconePour = (type: string) => (type === "INSCRIPTION" ? UserPlus : CalendarCheck);

  return (
    <ProtectedRoute roles={["jeune", "admin"]}>
      <EspaceLayout title={`Bonjour ${user?.prenom ?? ""} 👋`} role="Jeune" items={items}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Étapes de parcours" value={loading ? "—" : String(etapes.length)} />
          <StatCard label="Compétences" value={loading ? "—" : String(competences)} hint="Passeport Avenir" />
          <StatCard label="Réalisations" value={loading ? "—" : String(realisations)} hint="Passeport Avenir" />
          <StatCard label="Mentor" value={loading ? "—" : mentor?.assigne ? "Attribué" : "En attente"} />
        </div>

        <Section
          title="Mon parcours"
          action={
            <Link to="/espace/jeune/parcours" className="text-xs font-semibold text-primary hover:underline">
              Voir tout
            </Link>
          }
        >
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-6 justify-center">
              <Loader2 className="animate-spin" size={18} /> Chargement...
            </div>
          )}
          {!loading && dernieresEtapes.length === 0 && (
            <Placeholder label="Votre parcours commence ici — revenez après votre premier rendez-vous" />
          )}
          {!loading && dernieresEtapes.length > 0 && (
            <ol className="space-y-3">
              {dernieresEtapes.map((e, i) => {
                const Icon = iconePour(e.type);
                return (
                  <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-section-alt">
                    <span className="h-7 w-7 rounded-full grid place-items-center bg-foreground text-background">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className="text-sm font-medium">{e.titre}</span>
                      <span className="block text-xs text-muted-foreground">
                        {new Date(e.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </Section>

        <div className="grid lg:grid-cols-2 gap-6">
          <Section title="Passeport Avenir" action={<Award className="h-4 w-4 text-secondary" />}>
            <p className="text-sm text-muted-foreground mb-3">Document numérique regroupant vos talents, votre orientation et vos compétences.</p>
            {!loading && competences + realisations === 0 ? (
              <Placeholder label="Ajoutez vos premières compétences et réalisations" />
            ) : (
              <Link to="/espace/jeune/passeport" className="text-sm font-semibold text-primary hover:underline">
                {competences} compétence{competences > 1 ? "s" : ""} · {realisations} réalisation{realisations > 1 ? "s" : ""} →
              </Link>
            )}
          </Section>
          <Section title="Mon mentor" action={<GraduationCap className="h-4 w-4 text-primary" />}>
            <p className="text-sm text-muted-foreground mb-3">Profil, messagerie et rendez-vous avec votre mentor désigné.</p>
            {!loading && !mentor?.assigne && <Placeholder label="Attribution en cours" />}
            {!loading && mentor?.assigne && (
              <Link to="/espace/jeune/mentor" className="text-sm font-semibold text-primary hover:underline">
                {mentor.prenom} {mentor.nom} →
              </Link>
            )}
          </Section>
        </div>
      </EspaceLayout>
    </ProtectedRoute>
  );
};

export default Jeune;
