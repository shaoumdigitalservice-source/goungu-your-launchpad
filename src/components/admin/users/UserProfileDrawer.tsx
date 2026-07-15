import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  UserApi,
  UsersServiceError,
  fetchUserById,
} from "@/services/users.service";
import UserProfileHeader from "./UserProfileHeader";
import UserInfoSection from "./UserInfoSection";
import UserMentorSection from "./UserMentorSection";
import UserParentSection from "./UserParentSection";
import UserActivityPlaceholder from "./UserActivityPlaceholder";

interface Props {
  open: boolean;
  userId: number | null;
  fallbackUser?: UserApi | null;
  allUsers: UserApi[];
  onOpenChange: (open: boolean) => void;
}

export default function UserProfileDrawer({
  open,
  userId,
  fallbackUser,
  allUsers,
  onOpenChange,
}: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserApi | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const load = async () => {
    if (userId == null) return;
    setLoading(true);
    setErrorStatus(null);
    try {
      const data = await fetchUserById(userId);
      setUser(data);
    } catch (e) {
      const status = e instanceof UsersServiceError ? e.status : 500;
      if (status === 401) {
        navigate("/auth");
        return;
      }
      if (fallbackUser) {
        setUser(fallbackUser);
        setErrorStatus(null);
      } else {
        setErrorStatus(status);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && userId != null) {
      setUser(null);
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-none sm:w-[60vw] lg:w-[40vw] p-0 flex flex-col"
      >
        <div className="p-5 overflow-y-auto flex-1">
          {loading && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && errorStatus !== null && (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div className="font-medium">Une erreur est survenue</div>
              <div className="text-sm text-muted-foreground">
                Impossible de charger la fiche de l'utilisateur.
              </div>
              <button
                type="button"
                onClick={load}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
              >
                <RefreshCw className="h-4 w-4" />
                Réessayer
              </button>
            </div>
          )}

          {!loading && errorStatus === null && user && (
            <div className="space-y-5">
              <UserProfileHeader user={user} onClose={() => onOpenChange(false)} />

              <Tabs defaultValue="infos" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="infos">Informations</TabsTrigger>
                  <TabsTrigger value="encadrement">Encadrement</TabsTrigger>
                  <TabsTrigger value="activite">Activité</TabsTrigger>
                </TabsList>

                <TabsContent value="infos" className="pt-4">
                  <UserInfoSection user={user} />
                </TabsContent>

                <TabsContent value="encadrement" className="pt-4 space-y-3">
                  <UserMentorSection user={user} allUsers={allUsers} />
                  <UserParentSection user={user} allUsers={allUsers} />
                </TabsContent>

                <TabsContent value="activite" className="pt-4">
                  <UserActivityPlaceholder />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}