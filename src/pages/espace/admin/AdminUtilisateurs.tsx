import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import { getErrorMessage } from "@/lib/utils";
import {
  listerUtilisateurs,
  changerRoleUtilisateur,
  supprimerUtilisateur,
  assignerMentor,
  assignerParent,
  UtilisateurAdmin,
} from "@/api/adminUtilisateursApi";
import { useAuth, AppRole } from "@/contexts/AuthContext";
import { Trash2, Loader2 } from "lucide-react";

const ROLES: AppRole[] = ["jeune", "parent", "mentor", "formateur", "admin"];

export default function AdminUtilisateurs() {
  const { user } = useAuth();
  const [utilisateurs, setUtilisateurs] = useState<UtilisateurAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCoursId, setEnCoursId] = useState<number | null>(null);

  const charger = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const data = await listerUtilisateurs();
      setUtilisateurs(data);
    } catch (e) {
      setErreur(getErrorMessage(e, "Erreur lors du chargement"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const handleChangerRole = async (id: number, role: string) => {
    setEnCoursId(id);
    try {
      const maj = await changerRoleUtilisateur(id, role);
      setUtilisateurs((prev) =>
        prev.map((u) => (u.id === id ? maj : u))
      );
    } catch (e) {
      alert(getErrorMessage(e, "Erreur lors du changement de rôle"));
    } finally {
      setEnCoursId(null);
    }
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer définitivement cet utilisateur ?")) return;
    setEnCoursId(id);
    try {
      await supprimerUtilisateur(id);
      setUtilisateurs((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      alert(getErrorMessage(e, "Erreur lors de la suppression"));
    } finally {
      setEnCoursId(null);
    }
  };

  const handleAssignerMentor = async (id: number, valeur: string) => {
    setEnCoursId(id);
    try {
      const maj = await assignerMentor(id, valeur ? Number(valeur) : null);
      setUtilisateurs((prev) => prev.map((u) => (u.id === id ? maj : u)));
    } catch (e) {
      alert(getErrorMessage(e, "Erreur lors de l'assignation du mentor"));
    } finally {
      setEnCoursId(null);
    }
  };

  const handleAssignerParent = async (id: number, valeur: string) => {
    setEnCoursId(id);
    try {
      const maj = await assignerParent(id, valeur ? Number(valeur) : null);
      setUtilisateurs((prev) => prev.map((u) => (u.id === id ? maj : u)));
    } catch (e) {
      alert(getErrorMessage(e, "Erreur lors de l'assignation du parent"));
    } finally {
      setEnCoursId(null);
    }
  };

  const mentors = utilisateurs.filter((u) => u.role === "mentor");
  const parents = utilisateurs.filter((u) => u.role === "parent");

  return (
    <ProtectedRoute roles={["admin"]}>
    <EspaceLayout title="Utilisateurs" role="admin" items={adminNavItems}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>

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
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  <th className="p-3">Nom</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Rôle</th>
                  <th className="p-3">Mentor</th>
                  <th className="p-3">Parent</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {utilisateurs.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">
                      {u.prenom} {u.nom}
                    </td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      <select
                        value={u.role}
                        disabled={enCoursId === u.id || u.email === user?.email}
                        onChange={(e) =>
                          handleChangerRole(u.id, e.target.value)
                        }
                        className="border rounded-md px-2 py-1 bg-background"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      {u.role === "jeune" ? (
                        <select
                          value={u.mentorId ?? ""}
                          disabled={enCoursId === u.id}
                          onChange={(e) => handleAssignerMentor(u.id, e.target.value)}
                          className="border rounded-md px-2 py-1 bg-background"
                        >
                          <option value="">— Aucun —</option>
                          {mentors.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.prenom} {m.nom}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-3">
                      {u.role === "jeune" ? (
                        <select
                          value={u.parentId ?? ""}
                          disabled={enCoursId === u.id}
                          onChange={(e) => handleAssignerParent(u.id, e.target.value)}
                          className="border rounded-md px-2 py-1 bg-background"
                        >
                          <option value="">— Aucun —</option>
                          {parents.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.prenom} {p.nom}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleSupprimer(u.id)}
                        disabled={
                          enCoursId === u.id || u.email === user?.email
                        }
                        className="text-red-600 hover:text-red-800 disabled:opacity-40"
                        title={
                          u.email === user?.email
                            ? "Vous ne pouvez pas vous supprimer"
                            : "Supprimer"
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </EspaceLayout>
    </ProtectedRoute>
  );
}