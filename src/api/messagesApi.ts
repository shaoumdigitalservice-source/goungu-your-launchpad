// Ce module est conservé pour compatibilité : les consommateurs existants
// continuent d'importer depuis "@/api/messagesApi", mais toute la logique
// vit désormais dans "@/api/adminMessagesApi" (sprint GNG-MSG-001).
export type { Message } from "./adminMessagesApi";
export {
  chargerConversation,
  envoyerMessage,
  getConversation,
} from "./adminMessagesApi";