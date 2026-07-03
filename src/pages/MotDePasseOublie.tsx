import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";

const API_BASE_URL = "http://localhost:8082/api";
const emailSchema = z.string().trim().email("Email invalide").max(255);

const MotDePasseOublie = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      emailSchema.parse(email);
      const res = await fetch(`${API_BASE_URL}/utilisateurs/mot-de-passe-oublie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Une erreur est survenue");
      setEnvoye(true);
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
            <h1 className="font-display text-3xl lg:text-4xl mb-2">Mot de passe oublié</h1>
            <p className="text-muted-foreground text-sm">
              Entrez votre email, nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          <div className="bg-card border rounded-2xl p-6 lg:p-8 space-y-4">
            {envoye ? (
              <div className="text-center py-4">
                <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Si un compte existe avec cet email, un lien de réinitialisation a été généré.
                  Vérifiez votre boîte de réception (ou les logs du serveur en mode développement).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium mb-1 block">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="vous@exemple.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Envoyer le lien
                </button>
              </form>
            )}
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

export default MotDePasseOublie;
