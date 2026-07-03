import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { getImages, uploaderImage, isLoggedIn } from "@/lib/adminApi";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageSite {
  id: number;
  cle: string;
  nomFichier: string;
  url: string;
  updatedAt: string;
}

const CLES_CONNUES = [
  { cle: "hero", label: "Image principale (Hero)" },
  { cle: "defarat-hero", label: "Defarat - Bannière" },
  { cle: "defarat-coaching", label: "Defarat - Coaching" },
  { cle: "defarat-conseil", label: "Defarat - Conseil" },
];

const AdminImages = () => {
  const [images, setImages] = useState<ImageSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingCle, setUploadingCle] = useState<string | null>(null);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const chargerImages = () => {
    setLoading(true);
    getImages()
      .then((data) => setImages(data))
      .catch(() => setErreur("Impossible de charger les images"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/admin/login");
      return;
    }
    chargerImages();
  }, []);

  const trouverImage = (cle: string) => images.find((img) => img.cle === cle);

  const handleUpload = async (cle: string, fichier: File) => {
    setUploadingCle(cle);
    setErreur("");
    try {
      await uploaderImage(cle, fichier);
      chargerImages();
    } catch (e) {
      setErreur("Erreur lors de l'upload de l'image");
    } finally {
      setUploadingCle(null);
    }
  };

  return (
    <AdminLayout title="Images du site">
      {erreur && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {erreur}
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLES_CONNUES.map(({ cle, label }) => {
            const image = trouverImage(cle);
            const isUploading = uploadingCle === cle;

            return (
              <div key={cle} className="bg-card border rounded-xl overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  {image ? (
                    <img
                      src={`http://localhost:8082${image.url}`}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <p className="text-sm font-medium">Upload en cours...</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-sm mb-1">{label}</p>
                  <p className="text-xs text-muted-foreground mb-3">Clé : {cle}</p>
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer hover:bg-muted transition-colors">
                    <Upload className="h-4 w-4" />
                    {image ? "Remplacer" : "Ajouter une image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                      onChange={(e) => {
                        const fichier = e.target.files?.[0];
                        if (fichier) handleUpload(cle, fichier);
                      }}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminImages;
