import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, KeyRound, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { API_BASE_URL } from "@/lib/apiConfig";
const passwordSchema = z.string().min(6, "6 caractères minimum").max(72);

const ReinitialiserMotDePasse = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Lien invalide ou incomplet");
      return;
    }

    setSubmitting(true);
    try {
      passwordSchema.parse(password);
      if (password !== confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }

      const res = await fetch(`${API_BASE_URL}/utilisateurs/reinitialiser-mot-de-passe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, nouveauMotDePasse: password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Ce lien est invalide ou a expiré");
      }

      toast.success("Mot de passe réinitialisé avec succès");
      navigate("/auth");
    } catch (err: unknown) {
      const m = err instanceof z.ZodError ? err.errors[0].message : err instanceof Error ? err.message : "Erreur";
      toast.error(m);
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <Layout>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 max-w-md text-center">
            <h1 className="font-display text-3xl lg:text-4xl mb-2">Lien invalide</h1>
            <p className="text-muted-foreground text-sm mb-6">
              Ce lien de réinitialisation est incomplet ou incorrect.
            </p>
            <Link to="/mot-de-passe-oublie" className="underline text-sm">
              Faire une nouvelle demande
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl lg:text-4xl mb-2">Nouveau mot de passe</h1>
            <p className="text-muted-foreground text-sm">
              Choisissez un nouveau mot de passe pour votre compte.
            </p>
          </div>

          <div className="bg-card border rounded-2xl p-6 lg:p-8 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium mb-1 block">Nouveau mot de passe *</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="6 caractères minimum"
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">Confirmer le mot de passe *</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Retapez le mot de passe"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                Réinitialiser le mot de passe
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            <Link to="/auth" className="underline inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Retour à la connexion
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ReinitialiserMotDePasse;
