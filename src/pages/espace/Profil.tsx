import { useEffect, useState } from "react";
import { Loader2, Save, User } from "lucide-react";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import { useAuth, defaultDashboardPath } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/lib/apiConfig";

const items = [
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Profil = () => {
  const { user, roles, refreshRoles } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ prenom: "", nom: "", telephone: "", ville: "", dateNaissance: "", bio: "" });

  useEffect(() => {
    if (!user) return;
    setForm({
      prenom: user.prenom ?? "",
      nom: user.nom ?? "",
      telephone: user.telephone ?? "",
      ville: user.ville ?? "",
      dateNaissance: user.dateNaissance ?? "",
      bio: user.bio ?? "",
    });
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("user_token");
      const res = await fetch(`${API_BASE_URL}/utilisateurs/moi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      await refreshRoles();
      toast.success("Profil mis à jour");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const role = roles[0] ?? "jeune";

  return (
    <ProtectedRoute>
      <EspaceLayout title="Mon profil" role={role} items={items}>
        {loading ? (
          <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <Section title="Informations personnelles">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Prénom" value={form.prenom} onChange={(v) => setForm({ ...form, prenom: v })} />
              <Field label="Nom" value={form.nom} onChange={(v) => setForm({ ...form, nom: v })} />
              <Field label="Téléphone" value={form.telephone} onChange={(v) => setForm({ ...form, telephone: v })} />
              <Field label="Ville" value={form.ville} onChange={(v) => setForm({ ...form, ville: v })} />
              <Field label="Date de naissance" value={form.dateNaissance} onChange={(v) => setForm({ ...form, dateNaissance: v })} type="date" />
              <Field label="Email" value={user?.email ?? ""} onChange={() => {}} disabled />
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium mb-1 block">Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex items-center gap-3 mt-5">
              <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Enregistrer
              </button>
              <a href={defaultDashboardPath(roles)} className="text-sm text-muted-foreground hover:text-foreground">Retour à mon espace</a>
            </div>
          </Section>
        )}
      </EspaceLayout>
    </ProtectedRoute>
  );
};

const Field = ({ label, value, onChange, disabled, type = "text" }: { label: string; value: string; onChange: (v: string) => void; disabled?: boolean; type?: string }) => (
  <div>
    <label className="text-xs font-medium mb-1 block">{label}</label>
    <input type={type} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60" />
  </div>
);

export default Profil;
