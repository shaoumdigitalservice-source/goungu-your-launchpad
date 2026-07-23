import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import { getErrorMessage } from "@/lib/utils";
import {
  listerArticlesAdmin,
  creerArticle,
  modifierArticle,
  supprimerArticle,
  Article,
  ArticleInput,
} from "@/api/adminArticlesApi";
import { Loader2, Plus, Pencil, Trash2, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VIDE: ArticleInput = {
  titre: "",
  categorie: "",
  contenu: "",
  imageUrl: "",
  tempsLecture: "5 min",
  publie: true,
};

export default function AdminArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [formOuvert, setFormOuvert] = useState(false);
  const [idEnEdition, setIdEnEdition] = useState<number | null>(null);
  const [form, setForm] = useState<ArticleInput>(VIDE);
  const [envoi, setEnvoi] = useState(false);
  const [aSupprimer, setASupprimer] = useState<Article | null>(null);
  const [suppressionEnCours, setSuppressionEnCours] = useState(false);

  const gererErreurApi = (e: unknown, fallback: string) => {
    const message = getErrorMessage(e, fallback);
    const status = (e as { status?: number } | null)?.status;
    if (status === 401) {
      toast.error(message);
      navigate("/auth");
      return;
    }
    toast.error(message);
  };

  const charger = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const data = await listerArticlesAdmin();
      setArticles(data);
    } catch (e) {
      const message = getErrorMessage(e, "Erreur lors du chargement");
      setErreur(message);
      const status = (e as { status?: number } | null)?.status;
      if (status === 401) navigate("/auth");
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

  const ouvrirEdition = (a: Article) => {
    setIdEnEdition(a.id);
    setForm({
      titre: a.titre,
      categorie: a.categorie,
      contenu: a.contenu ?? "",
      imageUrl: a.imageUrl ?? "",
      tempsLecture: a.tempsLecture ?? "5 min",
      publie: a.publie,
    });
    setFormOuvert(true);
  };

  const fermerForm = () => {
    setFormOuvert(false);
    setIdEnEdition(null);
    setForm(VIDE);
  };

  const soumettre = async () => {
    if (!form.titre.trim() || !form.categorie.trim()) {
      toast.error("Le titre et la catégorie sont obligatoires");
      return;
    }
    setEnvoi(true);
    try {
      if (idEnEdition) {
        const maj = await modifierArticle(idEnEdition, form);
        setArticles((prev) => prev.map((a) => (a.id === idEnEdition ? maj : a)));
        toast.success("Article mis à jour");
      } else {
        const cree = await creerArticle(form);
        setArticles((prev) => [...prev, cree]);
        toast.success("Article créé");
      }
      fermerForm();
    } catch (e) {
      gererErreurApi(e, "Erreur lors de l'enregistrement");
    } finally {
      setEnvoi(false);
    }
  };

  const confirmerSuppression = async () => {
    if (!aSupprimer) return;
    setSuppressionEnCours(true);
    try {
      await supprimerArticle(aSupprimer.id);
      setArticles((prev) => prev.filter((a) => a.id !== aSupprimer.id));
      toast.success("Article supprimé");
      setASupprimer(null);
    } catch (e) {
      gererErreurApi(e, "Erreur lors de la suppression");
    } finally {
      setSuppressionEnCours(false);
    }
  };

  const formValide = !!form.titre.trim() && !!form.categorie.trim();

  return (
    <ProtectedRoute roles={["admin"]}>
      <EspaceLayout title="Articles" role="admin" items={adminNavItems}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Gestion des articles</h1>
            <Button onClick={ouvrirCreation} size="sm" className="gap-1.5">
              <Plus size={16} /> Nouvel article
            </Button>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground py-8">
              <Loader2 className="animate-spin" size={18} /> Chargement...
            </div>
          )}

          {!loading && erreur && (
            <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 text-destructive p-3 mb-4">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <div className="text-sm flex-1">{erreur}</div>
              <Button size="sm" variant="outline" onClick={charger}>
                Réessayer
              </Button>
            </div>
          )}

          {!loading && !erreur && articles.length === 0 && (
            <div className="border rounded-lg py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <FileText size={32} />
              <div className="text-sm">Aucun article pour le moment.</div>
              <Button size="sm" variant="outline" onClick={ouvrirCreation} className="mt-2 gap-1.5">
                <Plus size={14} /> Créer le premier article
              </Button>
            </div>
          )}

          {!loading && !erreur && articles.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Créé le</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.titre}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.categorie}</TableCell>
                      <TableCell>
                        <Badge variant={a.publie ? "default" : "secondary"}>
                          {a.publie ? "Publié" : "Brouillon"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {a.createdAt ? new Date(a.createdAt).toLocaleDateString("fr-FR") : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="ghost" onClick={() => ouvrirEdition(a)} aria-label="Modifier">
                            <Pencil size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setASupprimer(a)}
                            className="text-destructive hover:text-destructive"
                            aria-label="Supprimer"
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

          <Dialog open={formOuvert} onOpenChange={(o) => (o ? setFormOuvert(true) : fermerForm())}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{idEnEdition ? "Modifier l'article" : "Nouvel article"}</DialogTitle>
                <DialogDescription>Renseignez les informations de l'article.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="art-titre">Titre</Label>
                  <Input
                    id="art-titre"
                    value={form.titre}
                    onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="art-cat">Catégorie</Label>
                  <Input
                    id="art-cat"
                    value={form.categorie}
                    onChange={(e) => setForm({ ...form, categorie: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="art-contenu">Contenu</Label>
                  <Textarea
                    id="art-contenu"
                    rows={6}
                    value={form.contenu ?? ""}
                    onChange={(e) => setForm({ ...form, contenu: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="art-image">URL de l'image</Label>
                  <Input
                    id="art-image"
                    value={form.imageUrl ?? ""}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="art-temps">Temps de lecture</Label>
                  <Input
                    id="art-temps"
                    value={form.tempsLecture ?? ""}
                    onChange={(e) => setForm({ ...form, tempsLecture: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    id="art-publie"
                    checked={form.publie}
                    onCheckedChange={(v) => setForm({ ...form, publie: v })}
                  />
                  <Label htmlFor="art-publie">Publié</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={fermerForm} disabled={envoi}>
                  Annuler
                </Button>
                <Button onClick={soumettre} disabled={!formValide || envoi}>
                  {envoi && <Loader2 className="animate-spin mr-2" size={14} />}
                  {idEnEdition ? "Enregistrer" : "Créer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog open={!!aSupprimer} onOpenChange={(o) => !o && setASupprimer(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer cet article ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={suppressionEnCours}>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={confirmerSuppression} disabled={suppressionEnCours}>
                  {suppressionEnCours && <Loader2 className="animate-spin mr-2" size={14} />}
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </EspaceLayout>
    </ProtectedRoute>
  );
}