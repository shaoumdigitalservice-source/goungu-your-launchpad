import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, LogIn, UserPlus, Mail, KeyRound } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { AppRole, defaultDashboardPath, useAuth } from "@/contexts/AuthContext";

const emailSchema = z.string().trim().email("Email invalide").max(255);
const passwordSchema = z.string().min(8, "8 caractères minimum").max(72);
const nameSchema = z.string().trim().min(1, "Requis").max(80);

const roleOptions: { value: AppRole; label: string; desc: string }[] = [
  { value: "jeune", label: "Jeune", desc: "Je veux être accompagné(e)" },
  { value: "parent", label: "Parent", desc: "Je suis parent / tuteur" },
  { value: "mentor", label: "Mentor", desc: "Je veux accompagner des jeunes" },
  { value: "formateur", label: "Formateur", desc: "Je dispense des formations" },
];

type Mode = "signin" | "signup" | "forgot";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, roles, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<AppRole>("jeune");

  useEffect(() => {
    if (!loading && user) {
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from ?? defaultDashboardPath(roles), { replace: true });
    }
  }, [loading, user, roles, location.state, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Connexion réussie");
    } catch (err: unknown) {
      const m = err instanceof z.ZodError ? err.errors[0].message : err instanceof Error ? err.message : "Erreur";
      toast.error(m);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      nameSchema.parse(firstName);
      nameSchema.parse(lastName);
      emailSchema.parse(email);
      passwordSchema.parse(password);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { first_name: firstName, last_name: lastName, role },
        },
      });
      if (error) throw error;
      toast.success("Compte créé ! Vérifiez votre email si la confirmation est activée.");
    } catch (err: unknown) {
      const m = err instanceof z.ZodError ? err.errors[0].message : err instanceof Error ? err.message : "Erreur";
      toast.error(m);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      emailSchema.parse(email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Email de réinitialisation envoyé");
      setMode("signin");
    } catch (err: unknown) {
      const m = err instanceof z.ZodError ? err.errors[0].message : err instanceof Error ? err.message : "Erreur";
      toast.error(m);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      toast.error("Connexion Google impossible");
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl lg:text-4xl mb-2">
              {mode === "signin" && "Bienvenue à Goungué"}
              {mode === "signup" && "Rejoindre Goungué"}
              {mode === "forgot" && "Mot de passe oublié"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "signin" && "Accédez à votre espace personnel."}
              {mode === "signup" && "Créez votre compte pour démarrer votre parcours."}
              {mode === "forgot" && "Nous vous envoyons un lien sécurisé."}
            </p>
          </div>

          {mode !== "forgot" && (
            <div className="flex p-1 rounded-full bg-muted mb-6">
              <button
                onClick={() => setMode("signin")}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${mode === "signin" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
              >
                Connexion
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition ${mode === "signup" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
              >
                Inscription
              </button>
            </div>
          )}

          <div className="bg-card border rounded-2xl p-6 lg:p-8 space-y-4">
            {mode === "signup" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Prénom *</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Nom *</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block">Je suis *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {roleOptions.map((r) => (
                      <button
                        type="button"
                        key={r.value}
                        onClick={() => setRole(r.value)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition ${role === r.value ? "border-primary bg-primary/5" : "hover:border-primary/40"}`}
                      >
                        <div className="font-semibold text-foreground">{r.label}</div>
                        <div className="text-muted-foreground text-[11px]">{r.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-medium mb-1 block">Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="vous@exemple.com" />
            </div>

            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium">Mot de passe *</label>
                  {mode === "signin" && (
                    <button type="button" onClick={() => setMode("forgot")} className="text-xs text-primary hover:underline">Oublié ?</button>
                  )}
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="8 caractères minimum" />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              onClick={mode === "signin" ? handleSignIn : mode === "signup" ? handleSignUp : handleForgot}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? <LogIn className="h-4 w-4" /> : mode === "signup" ? <UserPlus className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
              {mode === "signin" && "Se connecter"}
              {mode === "signup" && "Créer mon compte"}
              {mode === "forgot" && "Envoyer le lien"}
            </button>

            {mode !== "forgot" && (
              <>
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">ou</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full border bg-background font-medium text-sm hover:bg-muted transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09A6.97 6.97 0 0 1 5.46 12c0-.73.13-1.44.36-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
                  Continuer avec Google
                </button>
              </>
            )}

            {mode === "forgot" && (
              <button type="button" onClick={() => setMode("signin")} className="w-full text-sm text-muted-foreground hover:text-foreground">
                Retour à la connexion
              </button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            En continuant, vous acceptez la charte de Goungué. <Link to="/contact" className="underline">Besoin d'aide ?</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;