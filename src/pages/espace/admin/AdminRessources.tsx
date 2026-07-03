import { useEffect, useState } from "react";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import {
  listerRessourcesAdmin,
  creerRessourceLien,
  creerRessourceFichier,
  modifierRessource,
  supprimerRessource,
  Ressource,
} from "@/api/adminRessourcesApi";
import { Loader2, Trash2, Plus, X, Link as LinkIcon, FileText } from "lucide-react";

export default function AdminRessources() {
  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCoursId, setEnCoursId] = useState<number | null>(null);

  const [formOuvert, setFormOuvert] = useState(false);
  const [modeForm, setModeForm] = useState<"LIEN" | "FICHIER">("LIEN");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [fichier, setFichier] = useState<File | null>(null);
  const [ordreAffichage, setOrdreAffichage] = useState(0);
  const [actif, setActif] = useState(true);
  const [envoi, setEnvoi] = useState(false);

  const charger = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const data = await listerRessourcesAdmin();
      setRessources(data);
    } catch (e: any) {
      setErreur(e.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setUrl("");
    setFichier(null);
    setOrdreAffichage(0);
    setActif(true);
    setModeForm("LIEN");
  };

  const ouvrirCreation = () => {
    resetForm();
    setFormOuvert(true);
  };

  const fermerForm = () => {
    setFormOuvert(false);
    resetForm();
  };

  const soumettre = async () => {
    setEnvoi(true);
    try {
      let creee: Ressource;
      if (modeForm === "LIEN") {
        creee = await creerRessourceLien({
          titre,
          description,
          url,
          actif,
          ordreAffichage,
        });
      } else {
        if (!fichier) {
          alert("Veuillez sélectionner un fichier");
          setEnvoi(false);
          return;
        }
        creee = await creerRessourceFichier(
          titre,
          description,
          actif,
          ordreAffichage,
          fichier
        );
      }
      setRessources((prev) => [...prev, creee]);
      fermerForm();
    } catch (e: any) {
      alert(e.message || "Erreur lors de l'enregistrement");
    } finally {
      setEnvoi(false);
    }
  };

  const handleToggleActif = async (r: Ressource) => {
    setEnCoursId(r.id);
    try {
      const maj = await modifierRessource(r.id, {
        titre: r.titre,
        description: r.description,
        url: r.url,
        actif: !r.actif,
        ordreAffichage: r.ordreAffichage,
      });
      setRessources((prev) => prev.map((x) => (x.id === r.id ? maj : x)));
    } catch (e: any) {
      alert(e.message || "Erreur lors de la mise à jour");
    } finally {
      setEnCoursId(null);
    }
  };

  const handleSupprimer = async (id: number) => {
    if (!confirm("Supprimer définitivement cette ressource ?")) return;
    setEnCoursId(id);
    try {
      await supprimerRessource(id);
      setRessources((prev) => prev.filter((r) => r.id !== id));
    } catch (e: any) {
      alert(e.message || "Erreur lors de la suppression");
    } finally {
      setEnCoursId(null);
    }
  };

  return (
    <EspaceLayout title="Ressources" role="admin" items={adminNavItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gestion des ressources</h1>
          <button
            onClick={ouvrirCreation}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} /> Nouvelle ressource
          </button>
        </div>

        {formOuvert && (
          <div className="border rounded-lg p-5 mb-6 bg-background">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Nouvelle ressource</h2>
              <button onClick={fermerForm} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setModeForm("LIEN")}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border ${
                  modeForm === "LIEN" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <LinkIcon size={14} /> Lien externe
              </button>
              <button
                onClick={() => setModeForm("FICHIER")}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border ${
                  modeForm === "FICHIER" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <FileText size={14} /> Fichier à uploader
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium block mb-1">Titre</label>
                <input
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Ordre d'affichage</label>
                <input
                  type="number"
                  value={ordreAffichage}
                  onChange={(e) => setOrdreAffichage(Number(e.target.value))}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>

              {modeForm === "LIEN" ? (
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium block mb-1">URL</label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                  />
                </div>
              ) : (
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium block mb-1">Fichier</label>
                  <input
                    type="file"
                    onChange={(e) => setFichier(e.target.files?.[0] || null)}
                    className="w-full text-sm"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="text-xs font-medium block mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="actif"
                  checked={actif}
                  onChange={(e) => setActif(e.target.checked)}
                />
                <label htmlFor="actif" className="text-sm">
                  Visible publiquement
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={soumettre}
                disabled={envoi || !titre || (modeForm === "LIEN" ? !url : !fichier)}
                className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                {envoi ? "Enregistrement..." : "Créer"}
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

        {!loading && !erreur && ressources.length === 0 && (
          <div className="text-muted-foreground text-sm">
            Aucune ressource pour le moment.
          </div>
        )}

        {!loading && !erreur && ressources.length > 0 && (
          <div className="space-y-3">
            {ressources
              .sort((a, b) => a.ordreAffichage - b.ordreAffichage)
              .map((r) => (
                <div
                  key={r.id}
                  className="border rounded-lg p-4 bg-background flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    {r.type === "FICHIER" ? (
                      <FileText size={18} className="text-muted-foreground mt-0.5" />
                    ) : (
                      <LinkIcon size={18} className="text-muted-foreground mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">{r.titre}</div>
                      {r.description && (
                        <div className="text-sm text-muted-foreground">{r.description}</div>
                      )}
                      
                      <a
                        href={
                          r.url.startsWith("/uploads")
                            ? `http://localhost:8082${r.url}`
                            : r.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        {r.type === "FICHIER" ? r.nomFichier : r.url}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleActif(r)}
                      disabled={enCoursId === r.id}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full disabled:opacity-40 ${
                        r.actif
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {r.actif ? "Actif" : "Inactif"}
                    </button>
                    <button
                      onClick={() => handleSupprimer(r.id)}
                      disabled={enCoursId === r.id}
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
  );
}