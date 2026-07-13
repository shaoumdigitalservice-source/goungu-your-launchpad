import { Users } from "lucide-react";

export default function UsersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
        <Users className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="font-medium">Aucun utilisateur trouvé</div>
      <div className="text-sm text-muted-foreground mt-1">
        Modifiez votre recherche ou vos filtres.
      </div>
    </div>
  );
}