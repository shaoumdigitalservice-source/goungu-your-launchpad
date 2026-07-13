import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, AlertTriangle } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "@/pages/espace/EspaceLayout";
import { adminNavItems } from "@/pages/espace/AdminPages";
import { fetchUsers, UserApi, UsersServiceError } from "@/services/users.service";
import UsersTable from "@/components/admin/users/UsersTable";
import UsersSearch from "@/components/admin/users/UsersSearch";
import UsersFilter from "@/components/admin/users/UsersFilter";
import UsersEmptyState from "@/components/admin/users/UsersEmptyState";
import UsersLoading from "@/components/admin/users/UsersLoading";

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("tous");

  const load = async () => {
    setLoading(true);
    setErrorStatus(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      const status = e instanceof UsersServiceError ? e.status : 500;
      if (status === 401) {
        navigate("/auth");
        return;
      }
      setErrorStatus(status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return users.filter((u) => {
      if (role !== "tous" && u.role !== role) return false;
      if (!s) return true;
      return (
        u.prenom?.toLowerCase().includes(s) ||
        u.nom?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s)
      );
    });
  }, [users, search, role]);

  return (
    <ProtectedRoute roles={["admin"]}>
      <EspaceLayout title="Gestion des utilisateurs" role="admin" items={adminNavItems}>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Gérez les comptes des jeunes, mentors, parents, formateurs et administrateurs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <UsersSearch value={search} onChange={setSearch} />
            <UsersFilter value={role} onChange={setRole} />
          </div>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </button>
        </div>

        {loading && <UsersLoading />}

        {!loading && errorStatus === 403 && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 text-destructive p-6 text-sm">
            Accès réservé aux administrateurs.
          </div>
        )}

        {!loading && errorStatus !== null && errorStatus !== 403 && (
          <div className="rounded-2xl border p-6 flex flex-col items-center text-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div className="font-medium">Une erreur est survenue</div>
            <div className="text-sm text-muted-foreground">
              Impossible de charger la liste des utilisateurs.
            </div>
            <button
              type="button"
              onClick={load}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
            >
              <RefreshCw className="h-4 w-4" />
              Réessayer
            </button>
          </div>
        )}

        {!loading && errorStatus === null && filtered.length === 0 && <UsersEmptyState />}

        {!loading && errorStatus === null && filtered.length > 0 && (
          <UsersTable users={filtered} />
        )}
      </EspaceLayout>
    </ProtectedRoute>
  );
}