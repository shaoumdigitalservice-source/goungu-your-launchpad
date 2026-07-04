import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import {
  listerEvenementsAdmin,
  creerEvenement,
  modifierEvenement,
  supprimerEvenement,
  Evenement,
  EvenementInput,
} from "@/api/adminEvenementsApi";
import { Loader2, Trash2, Plus, X, Pencil, MapPin, Calendar } from "lucide-react";

const VIDE: EvenementInput = {
  titre: "",
  description: "",
  dateEvenement: "",
  lieu: "",
  actif: true,
};

export default function AdminEvenements() {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCoursId, setEnCoursId] = useState<number | null>(null);

  const [formOuvert, setFormOuvert] = useState(false);
  const [idEnEdition, setIdEnEdition] = useState<number | null>(null);
  const [form, setForm] = useState<EvenementInput>(VIDE);
  const [envoi, setEnvoi] = useState(false);

  const charger = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const data = await listerEvenementsAdmin();
      setEvenements(data);
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

  const ouvrirEdition = (e: Evenement) => {
    setIdEnEdition(e.id);
    setForm({
      titre: e.titre,
      description: e.description || "",
      dateEvenement: e.dateEvenement.slice(0, 16),
      lieu: e.lieu,
      actif: e.actif,
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
        const maj = await modifierEvenement(idEnEdition, form);
        setEvenements((prev) =>
          prev.map((e) => (e.id === idEnEdition ? maj : e))
        );
      } else {
        const cree = await creerEvenement(form);
        setEvenements((prev) => [...prev, cree]);
      }
      fermerForm();
    } catch (e: any) {
      alert(e.message || "Erreur lors de l'enregistrement");
    } finally {
      setEnvoi(false);
    }
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer définitivement cet événement ?")) return;
    setEnCoursId(id);
    try {
      await supprimerEvenement(id);
      setEvenements((prev) => prev.filter((e) => e.id !== id));
    } catch (e: any) {
      alert(e.message || "Erreur lors de la suppression");
    } finally {
      setEnCoursId(null);
    }
  };

  const evenementsTries = [...evenements].sort(
    (a, b) =>
      new Date(a.dateEvenement).getTime() - new Date(b.dateEvenement).getTime()
  );

  return (
    <ProtectedRoute roles={["admin"]}>
    <EspaceLayout title="Événements" role="admin" items={adminNavItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gestion des événements</h1>
          <button
            onClick={ouvrirCreation}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} /> Nouvel événement
          </button>
        </div>

        {formOuvert && (
          <div className="border rounded-lg p-5 mb-6 bg-background">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">
                {idEnEdition ? "Modifier l'événement" : "Nouvel événement"}
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
                <label className="text-xs font-medium block mb-1">Lieu</label>
                <input
                  value={form.lieu}
                  onChange={(e) => setForm({ ...form, lieu: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Date et heure</label>
                <input
                  type="datetime-local"
                  value={form.dateEvenement}
                  onChange={(e) => setForm({ ...form, dateEvenement: e.target.value })}
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
                  Visible publiquement
                </label>
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
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={soumettre}
                disabled={envoi || !form.titre || !form.lieu || !form.dateEvenement}
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

        {!loading && !erreur && evenementsTries.length === 0 && (
          <div className="text-muted-foreground text-sm">
            Aucun événement pour le moment.
          </div>
        )}

        {!loading && !erreur && evenementsTries.length > 0 && (
          <div className="space-y-3">
            {evenementsTries.map((e) => (
              <div
                key={e.id}
                className="border rounded-lg p-4 bg-background flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{e.titre}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        e.actif
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {e.actif ? "Actif" : "Inactif"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(e.dateEvenement).toLocaleString("fr-FR", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {e.lieu}
                    </span>
                  </div>
                  {e.description && (
                    <div className="text-sm text-muted-foreground">{e.description}</div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => ouvrirEdition(e)}
                    className="text-foreground/70 hover:text-foreground"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleSupprimer(e.id)}
                    disabled={enCoursId === e.id}
                    className="text-red-600 hover:text-red-800 disabled:opacity-40"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </EspaceLayout>
    </ProtectedRoute>
  );
}