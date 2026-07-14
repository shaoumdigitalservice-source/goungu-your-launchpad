import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import UserRoleBadge from "./UserRoleBadge";
import {
  UserApi,
  UserRole,
  UsersServiceError,
  updateUserRole,
} from "@/services/users.service";

const ROLE_OPTIONS: UserRole[] = ["admin", "jeune", "mentor", "parent", "formateur"];

interface Props {
  open: boolean;
  user: UserApi | null;
  onOpenChange: (open: boolean) => void;
  onUpdated: (u: UserApi) => void;
}

export default function ChangeRoleDialog({ open, user, onOpenChange, onUpdated }: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | "">("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) setRole(user.role as UserRole);
  }, [user]);

  if (!user) return null;

  const hasChange = role && role !== user.role;

  const handleSave = async () => {
    if (!hasChange || saving) return;
    setSaving(true);
    try {
      const updated = await updateUserRole(user.id, role as UserRole);
      onUpdated(updated);
      toast({ title: "Le rôle a été modifié avec succès." });
      onOpenChange(false);
    } catch (e) {
      const status = e instanceof UsersServiceError ? e.status : 500;
      if (status === 401) {
        navigate("/auth");
        return;
      }
      const messages: Record<number, string> = {
        403: "Vous n'avez pas les permissions nécessaires.",
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

  return (
    <Dialog open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier le rôle</DialogTitle>
          <DialogDescription>
            Choisissez le nouveau rôle de cet utilisateur.
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
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Nouveau rôle</label>
            <Select
              value={role || undefined}
              onValueChange={(v) => setRole(v as UserRole)}
              disabled={saving}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Attention : le changement de rôle modifie immédiatement les droits d'accès de
              cet utilisateur sur la plateforme.
            </p>
          </div>
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
            disabled={!hasChange || saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Enregistrer
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}