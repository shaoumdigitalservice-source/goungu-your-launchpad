import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { KeyRound, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

const passwordSchema = z.string().min(8, "8 caractères minimum").max(72);

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // The recovery link sets a session via the hash; supabase auto-handles it.
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        toast.error("Lien invalide ou expiré");
        navigate("/auth");
      } else {
        setReady(true);
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      passwordSchema.parse(password);
      if (password !== confirm) throw new Error("Les mots de passe ne correspondent pas");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Mot de passe mis à jour");
      navigate("/espace/jeune");
    } catch (err: unknown) {
      const m = err instanceof z.ZodError ? err.errors[0].message : err instanceof Error ? err.message : "Erreur";
      toast.error(m);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl mb-2">Nouveau mot de passe</h1>
            <p className="text-muted-foreground text-sm">Choisissez un mot de passe sécurisé.</p>
          </div>
          {ready && (
            <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-6 lg:p-8 space-y-4">
              <div>
                <label className="text-xs font-medium mb-1 block">Nouveau mot de passe *</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Confirmer *</label>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                Mettre à jour
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ResetPassword;