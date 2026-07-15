import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import UserRoleBadge from "./UserRoleBadge";
import ParentSelector from "./ParentSelector";
import {
  UserApi,
  UsersServiceError,
  assignParent,
} from "@/services/users.service";

interface Props {
  open: boolean;
  user: UserApi | null;
  allUsers: UserApi[];
  onOpenChange: (open: boolean) => void;
  onUpdated: (u: UserApi) => void;
}

export default function AssignParentDialog({
  open,
  user,
  allUsers,
  onOpenChange,
  onUpdated,
}: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && user) {
      setSelectedId(user.parentId ?? null);
      setSearch("");
    }
  }, [open, user]);

  if (!user) return null;

  const parents = allUsers.filter((u) => u.role === "parent");
  const currentParent = parents.find((p) => p.id === user.parentId) || null;

  const handleSave = async () => {
    if (selectedId == null || saving) return;
    setSaving(true);
    try {
      const updated = await assignParent(user.id, selectedId);
      onUpdated(updated);
      toast({ title: "Parent associé avec succès." });
      onOpenChange(false);
    } catch (e) {
      const status = e instanceof UsersServiceError ? e.status : 500;
      if (status === 401) {
        navigate("/auth");
        return;
      }
      const messages: Record<number, string> = {
        403: "Accès refusé.",
        404: "Utilisateur introuvable.",
        500: "Erreur serveur.",
      };
      toast({
        title: "Erreur",
        description: messages[status] ?? "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedId != null && !saving) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <DialogContent
        className="sm:max-w-lg max-sm:h-screen max-sm:max-h-screen max-sm:rounded-none max-sm:w-screen max-sm:max-w-none"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Associer un parent</DialogTitle>
          <DialogDescription>
            Sélectionnez le parent responsable de ce jeune.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-xl border bg-muted/30 p-3 space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Nom complet : </span>
              <span className="font-medium">
                {user.prenom} {user.nom}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Email : </span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Rôle actuel :</span>
              <UserRoleBadge role={user.role} />
            </div>
            <div>
              <span className="text-muted-foreground">Parent actuel : </span>
              <span className="font-medium">
                {currentParent
                  ? `${currentParent.prenom} ${currentParent.nom}`
                  : "Non associé"}
              </span>
            </div>
          </div>

          <ParentSelector
            parents={parents}
            search={search}
            onSearchChange={setSearch}
            selectedId={selectedId}
            onSelect={setSelectedId}
            autoFocus={open}
          />
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className="px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={selectedId == null || saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Associer
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}