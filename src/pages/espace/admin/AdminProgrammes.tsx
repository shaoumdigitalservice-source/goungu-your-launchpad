import { useEffect, useState } from "react";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import {
  listerProgrammesAdmin,
  creerProgramme,
  modifierProgramme,
  supprimerProgramme,
  Programme,
  ProgrammeInput,
} from "@/api/adminProgrammesApi";
import { Loader2, Pencil, Trash2, Plus, X } from "lucide-react";

const VIDE: ProgrammeInput = {
  titre: "",
  tag: "",
  slug: "",
  description: "",
  imageUrl: "",
  actif: true,
  ordreAffichage: 0,
};

export default function AdminProgrammes() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCoursId, setEnCoursId] = useState<number | null>(null);

  const [formOuvert, setFormOuvert] = useState(false);
  const [idEnEdition, setIdEnEdition] = useState<number | null>(null);
  const [form, setForm] = useState<ProgrammeInput>(VIDE);
  const [envoi, setEnvoi] = useState(false);

  const charger = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const data = await listerProgrammesAdmin();
      setProgrammes(data);
    } catch (e: any) {
      setErreur(e.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const ouvrirCreation = () => {
    setIdEnEdition(null);
    setForm(VIDE);
    setFormOuvert(true);
  };

  const ouvrirEdition = (p: Programme) => {
    setIdEnEdition(p.id);
    setForm({
      titre: p.titre,
      tag: p.tag,
      slug: p.slug,
      description: p.description || "",
      imageUrl: p.imageUrl || "",
      actif: p.actif,
      ordreAffichage: p.ordreAffichage,
    });
    setFormOuvert(true);
  };

  const fermerForm = () => {
    setFormOuvert(false);
    setIdEnEdition(null);
    setForm(VIDE);
  };

  const soumettre = async () => {
    setEnvoi(true);
    try {
      if (idEnEdition) {
        const maj = await modifierProgramme(idEnEdition, form);
        setProgrammes((prev) =>
          prev.map((p) => (p.id === idEnEdition ? maj : p))
        );
      } else {
        const cree = await creerProgramme(form);
        setProgrammes((prev) => [...prev, cree]);
      }
      fermerForm();
    } catch (e: any) {
      alert(e.message || "Erreur lors de l'enregistrement");
    } finally {
      setEnvoi(false);
    }
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer définitivement ce programme ?")) return;
    setEnCoursId(id);
    try {
      await supprimerProgramme(id);
      setProgrammes((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      alert(e.message || "Erreur lors de la suppression");
    } finally {
      setEnCoursId(null);
    }
  };

  return (
    <EspaceLayout title="Programmes" role="admin" items={adminNavItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gestion des programmes</h1>
          <button
            onClick={ouvrirCreation}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} /> Nouveau programme
          </button>
        </div>

        {formOuvert && (
          <div className="border rounded-lg p-5 mb-6 bg-background">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">
                {idEnEdition ? "Modifier le programme" : "Nouveau programme"}
              </h2>
              <button onClick={fermerForm} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium block mb-1">Titre</label>
                <input
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Tag</label>
                <input
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  placeholder="ex: 15 jours · Lac Rose"
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="ex: camp-lac-rose"
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Image (URL)</label>
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Ordre d'affichage</label>
                <input
                  type="number"
                  value={form.ordreAffichage}
                  onChange={(e) =>
                    setForm({ ...form, ordreAffichage: Number(e.target.value) })
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  id="actif"
                  checked={form.actif}
                  onChange={(e) => setForm({ ...form, actif: e.target.checked })}
                />
                <label htmlFor="actif" className="text-sm">
                  Programme actif (visible publiquement)
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={soumettre}
                disabled={envoi || !form.titre || !form.tag || !form.slug}
                className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                {envoi ? "Enregistrement..." : idEnEdition ? "Enregistrer" : "Créer"}
              </button>
              <button
                onClick={fermerForm}
                className="text-sm px-4 py-2 rounded-md border hover:bg-muted"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

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
                  <th className="p-3">Titre</th>
                  <th className="p-3">Tag</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {programmes
                  .sort((a, b) => a.ordreAffichage - b.ordreAffichage)
                  .map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-3 font-medium">{p.titre}</td>
                      <td className="p-3 text-muted-foreground">{p.tag}</td>
                      <td className="p-3 text-muted-foreground">{p.slug}</td>
                      <td className="p-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            p.actif
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {p.actif ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => ouvrirEdition(p)}
                            className="text-foreground/70 hover:text-foreground"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleSupprimer(p.id)}
                            disabled={enCoursId === p.id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-40"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </EspaceLayout>
  );
}