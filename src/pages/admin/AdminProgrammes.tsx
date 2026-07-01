import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProgrammesAdmin, creerProgramme, supprimerProgramme, isLoggedIn } from "@/lib/adminApi";
import AdminLayout from "@/components/admin/AdminLayout";

interface Programme {
  id: number;
  titre: string;
  tag: string;
  slug: string;
  description: string;
  imageUrl: string;
  actif: boolean;
  ordreAffichage: number;
  createdAt: string;
}

const AdminProgrammes = () => {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    titre: "", tag: "", slug: "", description: "", imageUrl: "", actif: true, ordreAffichage: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/admin/login");
      return;
    }
    charger();
  }, []);

  const charger = async () => {
    setLoading(true);
    try {
      const data = await getProgrammesAdmin();
      setProgrammes(data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreer = async (e: React.FormEvent) => {
    e.preventDefault();
    await creerProgramme(form);
    setForm({ titre: "", tag: "", slug: "", description: "", imageUrl: "", actif: true, ordreAffichage: 0 });
    setShowForm(false);
    charger();
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer ce programme ?")) return;
    await supprimerProgramme(id);
    charger();
  };

  if (loading) {
    return (
      <AdminLayout title="Programmes">
        <p className="text-muted-foreground">Chargement...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Gestion des Programmes">
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
        >
          {showForm ? "Annuler" : "+ Nouveau programme"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreer} className="bg-card border rounded-xl p-6 mb-6 space-y-4">
          <input
            type="text" required placeholder="Titre"
            value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm"
          />
          <input
            type="text" required placeholder="Tag (ex: 15 jours · Lac Rose)"
            value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm"
          />
          <input
            type="text" required placeholder="Slug (ex: camp-lac-rose)"
            value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm"
          />
          <textarea
            rows={4} placeholder="Description"
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm resize-none"
          />
          <input
            type="text" placeholder="URL de l'image"
            value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm"
          />
          <input
            type="number" placeholder="Ordre d'affichage"
            value={form.ordreAffichage} onChange={(e) => setForm({ ...form, ordreAffichage: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox" checked={form.actif}
              onChange={(e) => setForm({ ...form, actif: e.target.checked })}
            />
            Actif (visible sur le site)
          </label>
          <button type="submit" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
            Créer le programme
          </button>
        </form>
      )}

      <div className="space-y-3">
        {programmes.length === 0 && <p className="text-muted-foreground">Aucun programme.</p>}
        {programmes.map((p) => (
          <div key={p.id} className="bg-card border rounded-xl p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{p.titre}</h3>
                {!p.actif && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Inactif</span>}
              </div>
              <p className="text-sm text-muted-foreground">{p.tag} · slug: {p.slug}</p>
              <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
            </div>
            <button
              onClick={() => handleSupprimer(p.id)}
              className="text-xs px-3 py-1.5 rounded-full bg-red-600 text-white whitespace-nowrap"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminProgrammes;