import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticlesAdmin, creerArticle, supprimerArticle, isLoggedIn } from "@/lib/adminApi";
import AdminLayout from "@/components/admin/AdminLayout";

interface Article {
  id: number;
  titre: string;
  categorie: string;
  contenu: string;
  imageUrl: string;
  tempsLecture: string;
  publie: boolean;
  createdAt: string;
}

const AdminBlog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    titre: "", categorie: "", contenu: "", imageUrl: "", tempsLecture: "5 min", publie: true,
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
      const data = await getArticlesAdmin();
      setArticles(data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreer = async (e: React.FormEvent) => {
    e.preventDefault();
    await creerArticle(form);
    setForm({ titre: "", categorie: "", contenu: "", imageUrl: "", tempsLecture: "5 min", publie: true });
    setShowForm(false);
    charger();
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    await supprimerArticle(id);
    charger();
  };

  if (loading) {
    return (
      <AdminLayout title="Blog">
        <p className="text-muted-foreground">Chargement...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Gestion du Blog">
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
        >
          {showForm ? "Annuler" : "+ Nouvel article"}
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
            type="text" required placeholder="Catégorie (ex: Mentorat)"
            value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm"
          />
          <textarea
            required rows={5} placeholder="Contenu de l'article"
            value={form.contenu} onChange={(e) => setForm({ ...form, contenu: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm resize-none"
          />
          <input
            type="text" placeholder="URL de l'image (ex: /uploads/xxx.jpg)"
            value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm"
          />
          <input
            type="text" placeholder="Temps de lecture (ex: 5 min)"
            value={form.tempsLecture} onChange={(e) => setForm({ ...form, tempsLecture: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border bg-background text-sm"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox" checked={form.publie}
              onChange={(e) => setForm({ ...form, publie: e.target.checked })}
            />
            Publier immédiatement
          </label>
          <button type="submit" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
            Créer l'article
          </button>
        </form>
      )}

      <div className="space-y-3">
        {articles.length === 0 && <p className="text-muted-foreground">Aucun article.</p>}
        {articles.map((a) => (
          <div key={a.id} className="bg-card border rounded-xl p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{a.titre}</h3>
                {!a.publie && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Brouillon</span>}
              </div>
              <p className="text-sm text-muted-foreground">{a.categorie} · {a.tempsLecture}</p>
              <p className="text-xs text-muted-foreground mt-2">{new Date(a.createdAt).toLocaleString("fr-FR")}</p>
            </div>
            <button
              onClick={() => handleSupprimer(a.id)}
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

export default AdminBlog;