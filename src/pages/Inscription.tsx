import { useState } from "react";
import Layout from "@/components/Layout";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const programmes = ["Orientation", "Accompagnement entrepreneurial", "Programme d'incubation"];

const Inscription = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", programme: "", motivation: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inscription envoyée avec succès !");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-3xl font-extrabold mb-4">Inscription reçue !</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Merci pour votre candidature. Notre équipe vous contactera très bientôt pour la suite du processus.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-gradient">Inscription</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Rejoignez GOUNGUÉ et commencez votre parcours vers la réussite.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-8 space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nom complet *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Votre nom complet" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="votre@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Téléphone *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="77 XXX XX XX" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Programme souhaité *</label>
                <select required value={form.programme} onChange={(e) => setForm({ ...form, programme: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Choisissez un programme</option>
                  {programmes.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Motivation</label>
                <textarea rows={4} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Parlez-nous de votre projet ou de vos motivations..." />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                <Send className="h-4 w-4" /> Envoyer ma candidature
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Inscription;
