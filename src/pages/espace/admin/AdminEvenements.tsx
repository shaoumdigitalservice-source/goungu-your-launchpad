import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import { getErrorMessage } from "@/lib/utils";
import {
  listerEvenementsAdmin,
  creerEvenement,
  modifierEvenement,
  supprimerEvenement,
  Evenement,
  EvenementInput,
} from "@/api/adminEvenementsApi";
import { Loader2, Trash2, Plus, Pencil, MapPin, Calendar, CalendarX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

const VIDE: EvenementInput = {
  titre: "",
  description: "",
  dateEvenement: "",
  lieu: "",
  actif: true,
};

export default function AdminEvenements() {
  const navigate = useNavigate();
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const [formOuvert, setFormOuvert] = useState(false);
  const [idEnEdition, setIdEnEdition] = useState<number | null>(null);
  const [form, setForm] = useState<EvenementInput>(VIDE);
  const [envoi, setEnvoi] = useState(false);

  const [aSupprimer, setASupprimer] = useState<Evenement | null>(null);
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
      const data = await listerEvenementsAdmin();
      setEvenements(data);
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
        toast.success("Événement mis à jour");
      } else {
        const cree = await creerEvenement(form);
        setEvenements((prev) => [...prev, cree]);
        toast.success("Événement créé");
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
      await supprimerEvenement(aSupprimer.id);
      setEvenements((prev) => prev.filter((e) => e.id !== aSupprimer.id));
      toast.success("Événement supprimé");
      setASupprimer(null);
    } catch (e) {
      gererErreurApi(e, "Erreur lors de la suppression");
    } finally {
      setSuppressionEnCours(false);
    }
  };

  const evenementsTries = [...evenements].sort(
    (a, b) =>
      new Date(a.dateEvenement).getTime() - new Date(b.dateEvenement).getTime()
  );

  const formValide = !!form.titre && !!form.lieu && !!form.dateEvenement;

  return (
    <ProtectedRoute roles={["admin"]}>
    <EspaceLayout title="Événements" role="admin" items={adminNavItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gestion des événements</h1>
          <Button onClick={ouvrirCreation} size="sm" className="gap-1.5">
            <Plus size={16} /> Nouvel événement
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

        {!loading && !erreur && evenementsTries.length === 0 && (
          <div className="border rounded-lg py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <CalendarX size={32} />
            <div className="text-sm">Aucun événement pour le moment.</div>
            <Button size="sm" variant="outline" onClick={ouvrirCreation} className="mt-2 gap-1.5">
              <Plus size={14} /> Créer le premier événement
            </Button>
          </div>
        )}

        {!loading && !erreur && evenementsTries.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evenementsTries.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.titre}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(e.dateEvenement).toLocaleString("fr-FR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} />
                        {e.lieu}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={e.actif ? "default" : "secondary"}>
                        {e.actif ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => ouvrirEdition(e)}
                          aria-label="Modifier"
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setASupprimer(e)}
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
              <DialogTitle>
                {idEnEdition ? "Modifier l'événement" : "Nouvel événement"}
              </DialogTitle>
              <DialogDescription>
                Renseignez les informations de l'événement.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="ev-titre">Titre</Label>
                <Input
                  id="ev-titre"
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-date">Date et heure</Label>
                <Input
                  id="ev-date"
                  type="datetime-local"
                  value={form.dateEvenement}
                  onChange={(e) => setForm({ ...form, dateEvenement: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-lieu">Lieu</Label>
                <Input
                  id="ev-lieu"
                  value={form.lieu}
                  onChange={(e) => setForm({ ...form, lieu: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="ev-desc">Description</Label>
                <Textarea
                  id="ev-desc"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between rounded-md border p-3">
                <div>
                  <Label htmlFor="ev-actif" className="cursor-pointer">
                    Visible publiquement
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Les événements inactifs restent invisibles côté public.
                  </p>
                </div>
                <Switch
                  id="ev-actif"
                  checked={form.actif}
                  onCheckedChange={(v) => setForm({ ...form, actif: v })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={fermerForm} disabled={envoi}>
                Annuler
              </Button>
              <Button onClick={soumettre} disabled={envoi || !formValide}>
                {envoi && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {idEnEdition ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={!!aSupprimer}
          onOpenChange={(o) => !o && !suppressionEnCours && setASupprimer(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer cet événement ?</AlertDialogTitle>
              <AlertDialogDescription>
                L'événement « {aSupprimer?.titre} » sera définitivement supprimé.
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={suppressionEnCours}>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  confirmerSuppression();
                }}
                disabled={suppressionEnCours}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {suppressionEnCours && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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