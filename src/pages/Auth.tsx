import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import Layout from "@/components/Layout";
import { AppRole, defaultDashboardPath, useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/lib/apiConfig";

const emailSchema = z.string().trim().email("Email invalide").max(255);
const passwordSchema = z.string().min(8, "8 caractères minimum").max(72);
const nameSchema = z.string().trim().min(1, "Requis").max(80);

const roleOptions: { value: AppRole; label: string; desc: string }[] = [
  { value: "jeune", label: "Jeune", desc: "Je veux être accompagné(e)" },
  { value: "parent", label: "Parent", desc: "Je suis parent / tuteur" },
  { value: "mentor", label: "Mentor", desc: "Je veux accompagner des jeunes" },
  { value: "formateur", label: "Formateur", desc: "Je dispense des formations" },
];

type Mode = "signin" | "signup";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, roles, loading, refreshRoles } = useAuth();
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
      const res = await fetch(`${API_BASE_URL}/utilisateurs/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse: password }),
      });
      if (!res.ok) throw new Error("Email ou mot de passe incorrect");
      const data = await res.json();
      localStorage.setItem("user_token", data.token);
      await refreshRoles();
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
      const res = await fetch(`${API_BASE_URL}/utilisateurs/inscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse: password, prenom: firstName, nom: lastName, role }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Erreur lors de l'inscription");
      }
      const data = await res.json();
      localStorage.setItem("user_token", data.token);
      await refreshRoles();
      toast.success("Compte créé avec succès !");
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
            <h1 className="font-display text-3xl lg:text-4xl mb-2">
              {mode === "signin" ? "Bienvenue à Goungué" : "Rejoindre Goungué"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "signin" ? "Accédez à votre espace personnel." : "Créez votre compte pour démarrer votre parcours."}
            </p>
          </div>

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

            <div>
              <label className="text-xs font-medium mb-1 block">Mot de passe *</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="8 caractères minimum" />
              {mode === "signin" && (
                <Link to="/mot-de-passe-oublie" className="text-xs text-primary hover:underline mt-1.5 inline-block">
                  Mot de passe oublié ?
                </Link>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              onClick={mode === "signin" ? handleSignIn : handleSignUp}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {mode === "signin" ? "Se connecter" : "Créer mon compte"}
            </button>
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
