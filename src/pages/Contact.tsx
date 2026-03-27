import { useState } from "react";
import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé ! Nous vous répondrons rapidement.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="text-gradient">Contactez-nous</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Une question ? Un projet ? N'hésitez pas à nous écrire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="space-y-6 mb-10">
                <a href="mailto:Incubgoungue@gmail.com" className="flex items-center gap-4 p-4 bg-card border rounded-xl hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Mail className="h-5 w-5 text-primary" /></div>
                  <div><div className="text-xs text-muted-foreground">Email</div><div className="font-semibold text-sm">Incubgoungue@gmail.com</div></div>
                </a>
                <a href="tel:+221778641096" className="flex items-center gap-4 p-4 bg-card border rounded-xl hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Phone className="h-5 w-5 text-primary" /></div>
                  <div><div className="text-xs text-muted-foreground">Téléphone</div><div className="font-semibold text-sm">77 864 10 96</div></div>
                </a>
                <div className="flex items-center gap-4 p-4 bg-card border rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><MapPin className="h-5 w-5 text-primary" /></div>
                  <div><div className="text-xs text-muted-foreground">Adresse</div><div className="font-semibold text-sm">Parcelles Assainies, Unité 13</div></div>
                </div>
                <a href="https://wa.me/221778641096" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-secondary/10 border border-secondary/20 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center"><MessageCircle className="h-5 w-5 text-secondary" /></div>
                  <div><div className="text-xs text-muted-foreground">WhatsApp</div><div className="font-semibold text-sm text-secondary">Discuter maintenant</div></div>
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-8 space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nom complet</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Votre nom" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Sujet</label>
                <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="De quoi s'agit-il ?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Votre message..." />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                <Send className="h-4 w-4" /> Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
