import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import { getErrorMessage } from "@/lib/utils";
import {
  listerRessources,
  creerLienRessource,
  creerRessourceFichier,
  modifierRessource,
  supprimerRessource,
  RessourceAdmin,
  RessourceLienInput,
} from "@/api/adminRessourcesApi";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  FileText,
  Link as LinkIcon,
  AlertCircle,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FormState = RessourceLienInput;

const formVide: FormState = {
  titre: "",
  description: "",
  url: "",
  categorie: "",
  actif: true,
  ordreAffichage: 0,
};

type FichierFormState = {
  titre: string;
  description: string;
  categorie: string;
  actif: boolean;
  ordreAffichage: number;
  fichier: File | null;
};

const fichierFormVide: FichierFormState = {
  titre: "",
  description: "",
  categorie: "",
  actif: true,
  ordreAffichage: 0,
  fichier: null,
};

const EXTENSIONS_AUTORISEES =
  ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.mp4";

export default function AdminRessources() {
  const navigate = useNavigate();
  const [ressources, setRessources] = useState<RessourceAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const [dialogueOuvert, setDialogueOuvert] = useState(false);
  const [enEdition, setEnEdition] = useState<RessourceAdmin | null>(null);
  const [form, setForm] = useState<FormState>(formVide);
  const [envoi, setEnvoi] = useState(false);
  const [modeCreation, setModeCreation] = useState<"lien" | "fichier">("lien");
  const [fichierForm, setFichierForm] =
    useState<FichierFormState>(fichierFormVide);
  const [uploadEnCours, setUploadEnCours] = useState(false);

  const [suppressionCible, setSuppressionCible] =
    useState<RessourceAdmin | null>(null);
  const [suppressionEnCours, setSuppressionEnCours] = useState(false);

  const gererErreurAuth = (e: unknown) => {
    const status = (e as { status?: number })?.status;
    if (status === 401) {
      navigate("/auth");
      return true;
    }
    return false;
  };

  const charger = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const data = await listerRessources();
      setRessources(data);
    } catch (e) {
      if (gererErreurAuth(e)) return;
      setErreur(getErrorMessage(e, "Erreur lors du chargement des ressources"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const ouvrirCreation = () => {
    setEnEdition(null);
    setForm(formVide);
    setFichierForm(fichierFormVide);
    setModeCreation("lien");
    setDialogueOuvert(true);
  };

  const ouvrirEdition = (r: RessourceAdmin) => {
    setEnEdition(r);
    setForm({
      titre: r.titre,
      description: r.description ?? "",
      url: r.url,
      categorie: r.categorie ?? "",
      actif: r.actif,
      ordreAffichage: r.ordreAffichage,
    });
    setModeCreation("lien");
    setDialogueOuvert(true);
  };

  const soumettre = async () => {
    if (!form.titre.trim() || !form.url.trim()) {
      toast.error("Le titre et l'URL sont obligatoires");
      return;
    }
    setEnvoi(true);
    try {
      const payload: RessourceLienInput = {
        titre: form.titre.trim(),
        description: form.description?.trim() || undefined,
        url: form.url.trim(),
        categorie: form.categorie?.trim() || undefined,
        actif: form.actif,
        ordreAffichage: Number(form.ordreAffichage) || 0,
      };
      if (enEdition) {
        const maj = await modifierRessource(enEdition.id, payload);
        setRessources((prev) => prev.map((x) => (x.id === maj.id ? maj : x)));
        toast.success("Ressource modifiée");
      } else {
        const creee = await creerLienRessource(payload);
        setRessources((prev) => [...prev, creee]);
        toast.success("Ressource créée");
      }
      setDialogueOuvert(false);
    } catch (e) {
      if (gererErreurAuth(e)) return;
      toast.error(getErrorMessage(e, "Erreur lors de l'enregistrement"));
    } finally {
      setEnvoi(false);
    }
  };

  const soumettreFichier = async () => {
    if (!fichierForm.titre.trim()) {
      toast.error("Le titre est obligatoire");
      return;
    }
    if (!fichierForm.fichier) {
      toast.error("Veuillez sélectionner un fichier");
      return;
    }
    setUploadEnCours(true);
    try {
      const fd = new FormData();
      fd.append("titre", fichierForm.titre.trim());
      if (fichierForm.description.trim())
        fd.append("description", fichierForm.description.trim());
      if (fichierForm.categorie.trim())
        fd.append("categorie", fichierForm.categorie.trim());
      fd.append("actif", String(fichierForm.actif));
      fd.append("ordreAffichage", String(Number(fichierForm.ordreAffichage) || 0));
      fd.append("fichier", fichierForm.fichier);

      const creee = await creerRessourceFichier(fd);
      setRessources((prev) => [...prev, creee]);
      toast.success("Fichier téléversé avec succès");
      setFichierForm(fichierFormVide);
      setDialogueOuvert(false);
      // Rafraîchir la liste depuis le serveur pour rester cohérent
      charger();
    } catch (e) {
      if (gererErreurAuth(e)) return;
      const status = (e as { status?: number })?.status;
      let msg = getErrorMessage(e, "Erreur lors de l'upload du fichier");
      if (status === 415 || status === 400) {
        msg = "Format de fichier refusé ou requête invalide.";
      }
      toast.error(msg);
    } finally {
      setUploadEnCours(false);
    }
  };

  const confirmerSuppression = async () => {
    if (!suppressionCible) return;
    setSuppressionEnCours(true);
    try {
      await supprimerRessource(suppressionCible.id);
      setRessources((prev) => prev.filter((r) => r.id !== suppressionCible.id));
      toast.success("Ressource supprimée");
      setSuppressionCible(null);
    } catch (e) {
      if (gererErreurAuth(e)) return;
      toast.error(getErrorMessage(e, "Erreur lors de la suppression"));
    } finally {
      setSuppressionEnCours(false);
    }
  };

  const listeTriee = [...ressources].sort(
    (a, b) => a.ordreAffichage - b.ordreAffichage
  );

  return (
    <ProtectedRoute roles={["admin"]}>
      <EspaceLayout title="Ressources" role="admin" items={adminNavItems}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold">Gestion des ressources</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Créez et administrez les liens partagés dans le centre de
                ressources.
              </p>
            </div>
            <Button onClick={ouvrirCreation} className="gap-1.5">
              <Plus size={16} /> Nouvelle ressource
            </Button>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-10 justify-center">
              <Loader2 className="animate-spin" size={18} /> Chargement...
            </div>
          )}

          {!loading && erreur && (
            <div className="border border-destructive/30 bg-destructive/5 text-destructive rounded-md p-4 flex items-start gap-3">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="font-medium">Impossible de charger les ressources</div>
                <div className="text-sm opacity-90">{erreur}</div>
              </div>
              <Button variant="outline" size="sm" onClick={charger}>
                Réessayer
              </Button>
            </div>
          )}

          {!loading && !erreur && listeTriee.length === 0 && (
            <div className="border rounded-lg p-10 text-center bg-background">
              <p className="text-muted-foreground mb-4">
                Aucune ressource pour le moment.
              </p>
              <Button onClick={ouvrirCreation} className="gap-1.5">
                <Plus size={16} /> Créer la première ressource
              </Button>
            </div>
          )}

          {!loading && !erreur && listeTriee.length > 0 && (
            <div className="border rounded-lg overflow-hidden bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Ordre</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listeTriee.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">
                        <div>{r.titre}</div>
                        {r.description && (
                          <div className="text-xs text-muted-foreground truncate max-w-md">
                            {r.description}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          {r.type === "FICHIER" ? (
                            <FileText size={14} />
                          ) : (
                            <LinkIcon size={14} />
                          )}
                          {r.type === "FICHIER" ? "Fichier" : "Lien"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.categorie || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={r.actif ? "default" : "secondary"}>
                          {r.actif ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {r.ordreAffichage}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => ouvrirEdition(r)}
                            aria-label="Modifier"
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSuppressionCible(r)}
                            aria-label="Supprimer"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <Dialog open={dialogueOuvert} onOpenChange={setDialogueOuvert}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {enEdition ? "Modifier la ressource" : "Nouvelle ressource"}
              </DialogTitle>
              <DialogDescription>
                Créez ou modifiez une ressource de type lien. L'upload de
                fichiers sera disponible prochainement.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="grid gap-1.5">
                <Label htmlFor="ressource-titre">Titre</Label>
                <Input
                  id="ressource-titre"
                  value={form.titre}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, titre: e.target.value }))
                  }
                  placeholder="Titre de la ressource"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="ressource-description">Description</Label>
                <Textarea
                  id="ressource-description"
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={2}
                  placeholder="Description courte"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="ressource-url">URL</Label>
                <Input
                  id="ressource-url"
                  value={form.url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, url: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="ressource-categorie">Catégorie</Label>
                  <Input
                    id="ressource-categorie"
                    value={form.categorie ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, categorie: e.target.value }))
                    }
                    placeholder="Ex: Guides, Vidéos..."
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="ressource-ordre">Ordre d'affichage</Label>
                  <Input
                    id="ressource-ordre"
                    type="number"
                    value={form.ordreAffichage}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        ordreAffichage: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <Label htmlFor="ressource-actif" className="cursor-pointer">
                    Visible publiquement
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Si désactivé, la ressource n'apparaîtra pas sur le site.
                  </p>
                </div>
                <Switch
                  id="ressource-actif"
                  checked={form.actif}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, actif: v }))
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogueOuvert(false)}
                disabled={envoi}
              >
                Annuler
              </Button>
              <Button onClick={soumettre} disabled={envoi}>
                {envoi ? (
                  <>
                    <Loader2 className="animate-spin mr-1.5" size={14} />
                    Enregistrement...
                  </>
                ) : enEdition ? (
                  "Enregistrer"
                ) : (
                  "Créer"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={!!suppressionCible}
          onOpenChange={(open) => !open && setSuppressionCible(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer la ressource ?</AlertDialogTitle>
              <AlertDialogDescription>
                {suppressionCible &&
                  `« ${suppressionCible.titre} » sera définitivement supprimée. Cette action est irréversible.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={suppressionEnCours}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  confirmerSuppression();
                }}
                disabled={suppressionEnCours}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {suppressionEnCours ? "Suppression..." : "Supprimer"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </EspaceLayout>
    </ProtectedRoute>
  );
}