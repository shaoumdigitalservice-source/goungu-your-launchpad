import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/221778641096"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold shadow-lg hover:scale-105 transition-transform"
  >
    <MessageCircle className="h-5 w-5" />
    <span className="hidden sm:inline text-sm">WhatsApp</span>
  </a>
);

export default WhatsAppButton;
