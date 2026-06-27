import { useEffect, useState } from "react";
import { Loader2, Save, User } from "lucide-react";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import { useAuth, defaultDashboardPath } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const items = [
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

const Profil = () => {
  const { user, roles } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", city: "", birth_date: "", bio: "" });

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) {
        setForm({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          phone: data.phone ?? "",
          city: data.city ?? "",
          birth_date: data.birth_date ?? "",
          bio: data.bio ?? "",
        });
      }
      setLoading(false);
    });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...form,
      birth_date: form.birth_date || null,
    });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profil mis à jour");
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
              <Field label="Prénom" value={form.first_name} onChange={(v) => setForm({ ...form, first_name: v })} />
              <Field label="Nom" value={form.last_name} onChange={(v) => setForm({ ...form, last_name: v })} />
              <Field label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <Field label="Ville" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
              <Field label="Date de naissance" value={form.birth_date} onChange={(v) => setForm({ ...form, birth_date: v })} type="date" />
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