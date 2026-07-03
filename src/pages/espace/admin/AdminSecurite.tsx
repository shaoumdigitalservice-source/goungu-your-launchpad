import { useEffect, useState } from "react";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import { statsParRole, StatsRoles } from "@/api/adminRolesApi";
import { Loader2, ShieldCheck, GraduationCap, Users2, Heart, User } from "lucide-react";

const ROLES_INFO: Record<
  string,
  { label: string; icon: React.ComponentType<{ size?: number | string; className?: string }>; couleur: string }
> = {
  admin: { label: "Administrateurs", icon: ShieldCheck, couleur: "text-red-600 bg-red-50" },
  formateur: { label: "Formateurs", icon: GraduationCap, couleur: "text-purple-600 bg-purple-50" },
  mentor: { label: "Mentors", icon: Users2, couleur: "text-blue-600 bg-blue-50" },
  parent: { label: "Parents", icon: Heart, couleur: "text-pink-600 bg-pink-50" },
  jeune: { label: "Jeunes", icon: User, couleur: "text-green-600 bg-green-50" },
};

const ORDRE = ["admin", "formateur", "mentor", "parent", "jeune"];

export default function AdminSecurite() {
  const [stats, setStats] = useState<StatsRoles>({});
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const charger = async () => {
      setLoading(true);
      setErreur(null);
      try {
        const data = await statsParRole();
        setStats(data);
      } catch (e: any) {
        setErreur(e.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  const total = Object.values(stats).reduce((acc, n) => acc + n, 0);

  return (
    <EspaceLayout title="Rôles & sécurité" role="admin" items={adminNavItems}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Rôles & sécurité</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Répartition des comptes par rôle sur la plateforme.
        </p>

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin" size={18} /> Chargement...
          </div>
        )}

        {erreur && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            {erreur}
          </div>
        )}

        {!loading && !erreur && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {ORDRE.map((role) => {
                const info = ROLES_INFO[role];
                const count = stats[role] || 0;
                const Icon = info.icon;
                return (
                  <div
                    key={role}
                    className="border rounded-2xl p-5 bg-background flex items-center gap-4"
                  >
                    <div className={`rounded-full p-3 ${info.couleur}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="font-display text-3xl">{count}</div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {info.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-background border rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Total des comptes
              </div>
              <div className="font-display text-3xl">{total}</div>
              <p className="text-sm text-muted-foreground mt-3">
                Pour modifier le rôle d'un utilisateur ou en supprimer un, rendez-vous
                dans la section{" "}
                <a href="/espace/admin/utilisateurs" className="text-primary hover:underline">
                  Utilisateurs
                </a>
                .
              </p>
            </div>
          </>
        )}
      </div>
    </EspaceLayout>
  );
}