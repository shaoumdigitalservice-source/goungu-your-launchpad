import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout from "../EspaceLayout";
import { adminNavItems } from "../AdminPages";
import { getErrorMessage } from "@/lib/utils";
import {
  listerMessagesContact,
  marquerMessageLu,
  MessageContact,
} from "@/api/adminContactApi";
import { Loader2, AlertCircle, MailOpen, Mail, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function AdminContact() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [selection, setSelection] = useState<MessageContact | null>(null);
  const [marquageEnCours, setMarquageEnCours] = useState<number | null>(null);

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
      const data = await listerMessagesContact();
      setMessages(data);
    } catch (e) {
      setErreur(getErrorMessage(e, "Erreur lors du chargement des messages"));
      const status = (e as { status?: number } | null)?.status;
      if (status === 401) navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const marquerLu = async (m: MessageContact) => {
    if (m.lu) return;
    setMarquageEnCours(m.id);
    try {
      const maj = await marquerMessageLu(m.id);
      setMessages((prev) => prev.map((x) => (x.id === m.id ? maj : x)));
      if (selection?.id === m.id) setSelection(maj);
      toast.success("Message marqué comme lu");
    } catch (e) {
      gererErreurApi(e, "Erreur lors du marquage");
    } finally {
      setMarquageEnCours(null);
    }
  };

  const messagesTries = [...messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const nonLus = messages.filter((m) => !m.lu).length;

  return (
    <ProtectedRoute roles={["admin"]}>
      <EspaceLayout title="Messages de contact" role="admin" items={adminNavItems}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Messages de contact</h1>
            {nonLus > 0 && <Badge variant="default">{nonLus} non lu{nonLus > 1 ? "s" : ""}</Badge>}
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

          {!loading && !erreur && messagesTries.length === 0 && (
            <div className="border rounded-lg py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <Inbox size={32} />
              <div className="text-sm">Aucun message pour le moment.</div>
            </div>
          )}

          {!loading && !erreur && messagesTries.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Statut</TableHead>
                    <TableHead>Expéditeur</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messagesTries.map((m) => (
                    <TableRow key={m.id} className={m.lu ? "" : "font-medium"}>
                      <TableCell>
                        {m.lu ? (
                          <MailOpen size={16} className="text-muted-foreground" />
                        ) : (
                          <Mail size={16} className="text-primary" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </TableCell>
                      <TableCell className="text-sm">{m.subject}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(m.createdAt).toLocaleString("fr-FR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost" onClick={() => setSelection(m)}>
                            Voir
                          </Button>
                          {!m.lu && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => marquerLu(m)}
                              disabled={marquageEnCours === m.id}
                            >
                              {marquageEnCours === m.id && (
                                <Loader2 className="animate-spin mr-1" size={12} />
                              )}
                              Marquer lu
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <Dialog open={!!selection} onOpenChange={(o) => !o && setSelection(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{selection?.subject}</DialogTitle>
                <DialogDescription>
                  De {selection?.name} — {selection?.email}
                </DialogDescription>
              </DialogHeader>
              <div className="text-sm whitespace-pre-wrap">{selection?.message}</div>
              <DialogFooter>
                {selection && !selection.lu && (
                  <Button
                    onClick={() => marquerLu(selection)}
                    disabled={marquageEnCours === selection.id}
                  >
                    {marquageEnCours === selection.id && (
                      <Loader2 className="animate-spin mr-2" size={14} />
                    )}
                    Marquer comme lu
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelection(null)}>
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </EspaceLayout>
    </ProtectedRoute>
  );
}