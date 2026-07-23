import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import { getErrorMessage } from "@/lib/utils";
import { listerImages, uploaderImage, ImageSite } from "@/api/adminImagesApi";
import { API_ORIGIN } from "@/lib/apiConfig";
import { Loader2, Upload, AlertCircle, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminImagesSite() {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [cle, setCle] = useState("");
  const [fichier, setFichier] = useState<File | null>(null);
  const [envoi, setEnvoi] = useState(false);

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
      const data = await listerImages();
      setImages(data);
    } catch (e) {
      setErreur(getErrorMessage(e, "Erreur lors du chargement des images"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const soumettre = async () => {
    if (!cle.trim() || !fichier) {
      toast.error("La clé et le fichier sont obligatoires");
      return;
    }
    setEnvoi(true);
    try {
      await uploaderImage(cle.trim(), fichier);
      toast.success("Image téléversée");
      setCle("");
      setFichier(null);
      setDialogOuvert(false);
      charger();
    } catch (e) {
      gererErreurApi(e, "Erreur lors de l'upload");
    } finally {
      setEnvoi(false);
    }
  };

  const urlAbsolue = (u: string) => (u.startsWith("http") ? u : `${API_ORIGIN}${u}`);

  return (
    <ProtectedRoute roles={["admin"]}>
      <EspaceLayout title="Images du site" role="admin" items={adminNavItems}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Images du site</h1>
            <Button onClick={() => setDialogOuvert(true)} size="sm" className="gap-1.5">
              <Upload size={16} /> Téléverser
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

          {!loading && !erreur && images.length === 0 && (
            <div className="border rounded-lg py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <ImageIcon size={32} />
              <div className="text-sm">Aucune image téléversée.</div>
            </div>
          )}

          {!loading && !erreur && images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="border rounded-lg overflow-hidden bg-background">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img src={urlAbsolue(img.url)} alt={img.cle} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 text-xs">
                    <div className="font-medium truncate">{img.cle}</div>
                    <div className="text-muted-foreground truncate">{img.url}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Dialog open={dialogOuvert} onOpenChange={setDialogOuvert}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Téléverser une image</DialogTitle>
                <DialogDescription>Choisissez une clé et un fichier image.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="img-cle">Clé</Label>
                  <Input id="img-cle" value={cle} onChange={(e) => setCle(e.target.value)} placeholder="ex: hero-accueil" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="img-fichier">Fichier</Label>
                  <Input
                    id="img-fichier"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFichier(e.target.files?.[0] ?? null)}
                  />
                  {fichier && <div className="text-xs text-muted-foreground">{fichier.name}</div>}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOuvert(false)} disabled={envoi}>
                  Annuler
                </Button>
                <Button onClick={soumettre} disabled={!cle.trim() || !fichier || envoi}>
                  {envoi && <Loader2 className="animate-spin mr-2" size={14} />}
                  Téléverser
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </EspaceLayout>
    </ProtectedRoute>
  );
}