
# Sprint GNG-FULLSYNC-001 — Plan d'exécution

Scope strict rappelé : **aucune modification** de CSS, Tailwind, classes `className`, JSX de rendu, composants `ui/*`, assets, animations, responsive. Uniquement la logique (fetch, hooks, state, gestion erreur).

---

## Phase 1 — Audit (fait)

Résultat en croisant `GNG-BACKEND-API-REFERENCE.md` et le code :

| Domaine | Statut | Fichiers |
|---|---|---|
| Auth utilisateur (`/utilisateurs/login`, `/inscription`, `/moi`) | ✅ | `AuthContext`, `Auth.tsx` |
| Auth admin séparée (`/auth/login`) | 🟡 doublon | `lib/adminApi.ts`, `pages/admin/AdminLogin.tsx` |
| Candidatures (public + admin CRUD statut) | ✅ | `api/adminCandidaturesApi.ts`, `services/candidatures.service.ts` |
| Contact public | ✅ POST | `lib/api.ts` |
| Contact admin (GET liste, PUT `/lu`) | ❌ non exposé dans `/espace/admin` | manque page + API |
| Articles (blog) | 🟡 ancien espace uniquement | `lib/adminApi.ts` + `pages/admin/AdminBlog.tsx`, aucun `api/articlesApi.ts`, absent de `/espace/admin` |
| Images du site | 🟡 ancien espace uniquement | `lib/adminApi.ts` + `pages/admin/AdminImages.tsx`, absent de `/espace/admin` |
| Programmes admin | ✅ | `api/adminProgrammesApi.ts` (+ doublon dans `AdminProgrammes` ancien) |
| Événements admin | ✅ | `api/adminEvenementsApi.ts` |
| Ressources admin (lien + fichier) | ✅ | `api/adminRessourcesApi.ts` |
| Utilisateurs admin (liste, rôle, mentor, parent, GET `/{id}`) | ✅ | `api/adminUtilisateursApi.ts`, `services/users.service.ts` |
| Stats rôles | ✅ | `api/adminRolesApi.ts` |
| Rendez-vous mentor/jeune/parent | ✅ | `api/mentorApi.ts`, `rendezVousJeuneApi.ts`, `parentApi.ts` |
| Messagerie mentor↔jeune | ✅ | `api/messagesApi.ts`, `adminMessagesApi.ts` |
| Passeport + parcours jeune | ✅ | `api/passeportApi.ts`, `parcoursApi.ts` |
| Cohortes formateur | ✅ | `api/formateurApi.ts` |
| Sessions formation | ❓ à vérifier dans `FormateurPages.tsx` |
| Supabase | 🟡 `src/integrations/supabase/client.ts` + dossier `types.ts` subsistent | à supprimer |
| Deux espaces admin (`/admin/*` orphelin + `/espace/admin/*`) | 🟡 fusion demandée | |

---

## Phase 2 — Supabase (nettoyage résiduel)

- Supprimer `src/integrations/supabase/` (client + types).
- Retirer les variables `VITE_SUPABASE_*` de `.env.example` si présentes.
- Vérifier qu'aucun fichier ne l'importe (grep `@/integrations/supabase`) → aucun fichier applicatif ne l'importe (auto-check).

## Phase 3 — Nouvelles couches API manquantes (logique uniquement)

Créer, alignés sur la référence :

- `src/api/adminArticlesApi.ts` — `GET /articles/admin`, `GET /articles/{id}`, `POST /articles`, `PUT /articles/{id}`, `DELETE /articles/{id}` avec token `user_token` et gestion 401/403/404/500.
- `src/api/adminImagesApi.ts` — `GET /images`, `POST /images` (multipart `cle`, `fichier`).
- `src/api/adminContactApi.ts` — `GET /contact`, `PUT /contact/{id}/lu`.
- `src/api/sessionsFormationApi.ts` — si `FormateurPages` en a besoin (à vérifier avant d'écrire).

Tous utilisent `user_token` (compte Utilisateur role=admin), cohérent avec les autres `admin*Api.ts` existants — plus de `admin_token` séparé.

## Phase 4 — Fusion des espaces admin

Créer sous `/espace/admin/*` (en réutilisant les patterns `EspaceLayout` + composants `ui/*` déjà présents dans les pages sœurs `AdminProgrammes`, `AdminEvenements`, etc.) :

- `pages/espace/admin/AdminArticles.tsx` (nouveau) — table + dialog création/édition/suppression via `adminArticlesApi`.
- `pages/espace/admin/AdminImages.tsx` (nouveau) — liste + upload via `adminImagesApi`.
- `pages/espace/admin/AdminContact.tsx` (nouveau) — liste messages contact + marquer lu.
- `pages/espace/admin/AdminMessagerie.tsx` (nouveau) — conversation mentor↔jeune (vue admin observateur si besoin, sinon lien vers la messagerie existante). Décision : brancher via `messagesApi` — utile pour SAV.
- Ajouter les entrées correspondantes dans `pages/espace/AdminPages.tsx` (liste nav) + routes dans `App.tsx`.

Ces pages **nouvelles** ont un JSX à écrire. Comme aucun visuel n'existe, autorisé — j'utilise exactement les mêmes composants et classes déjà en usage dans `AdminEvenements.tsx` / `AdminRessources.tsx`, sans inventer de style.

Une fois la parité vérifiée, **supprimer** :

- `src/pages/admin/AdminLogin.tsx`, `AdminDashboard.tsx`, `AdminBlog.tsx`, `AdminImages.tsx`, `AdminProgrammes.tsx`
- `src/pages/admin/users/` et `src/pages/admin/candidatures/` (leurs pages sont doublons de celles sous `/espace/admin/`)
- `src/lib/adminApi.ts` (remplacé par les nouveaux `api/admin*Api.ts` + `user_token`)
- `src/components/admin/AdminLayout.tsx` si plus référencé
- Routes correspondantes dans `App.tsx`

## Phase 5-7 — Dashboards & espaces utilisateurs

Vérifier que chaque dashboard consomme bien le vrai backend :

- `Admin.tsx` → utilise `statsParRole`, `listerCandidatures`, `listerRessources` ✅ déjà branché.
- `Jeune.tsx`, `Mentor.tsx`, `Parent.tsx`, `Formateur.tsx` → auditer les compteurs et supprimer les mocks résiduels **sans toucher au JSX** ; si un compteur affiche une valeur en dur, la remplacer par un `useState` alimenté par un fetch réel dans un `useEffect` (uniquement de la logique).

## Phase 8 — Messagerie

Déjà branchée sur `/messages/conversation/{id}` et `/messages`. Vérifier gestion 400/401/403 uniforme et refetch après envoi. Pas de refonte JSX.

## Phase 9 — Contact

- Public : `envoyerMessageContact` déjà OK.
- Admin : nouvelle page `AdminContact.tsx` créée en Phase 4.

## Phase 10 — Tests logiques

Pour chaque nouveau appel : vérifier via lecture code que 401 déclenche redirection `/auth`, 403 affiche toast "Accès refusé", 404 toast "Introuvable", 500 toast serveur. Pas d'exécution Playwright car le backend n'est pas disponible dans le sandbox (localhost:8082 non lancé).

## Phase 11 — Nettoyage

- Grep imports orphelins après suppression (`AdminLayout`, `adminApi`, `admin_token`).
- Supprimer `src/integrations/supabase/`.
- Vérifier que `bun run build` passe.

## Détails techniques

- Token utilisé partout : `localStorage.getItem("user_token")` (cohérent avec les `admin*Api.ts` existants). L'ancien flux `admin_token` via `/auth/login` disparaît avec `AdminLogin.tsx`.
- Base URL : `API_BASE_URL` de `src/lib/apiConfig.ts` inchangé.
- Gestion d'erreur : réutilise le pattern `gererErreur` déjà présent dans `adminEvenementsApi.ts` / `adminRessourcesApi.ts`.
- React Query n'est pas utilisé dans les `admin*Api.ts` existants (fetch direct + `useEffect`) — je reste sur le même pattern pour cohérence (le prompt dit "Conserver React Query" mais ne l'impose pas là où il n'est pas déjà présent).

## Rapport final

À la livraison je fournirai : liste des fichiers modifiés/créés/supprimés, fonctionnalités ajoutées, blocages éventuels (pas d'endpoint backend pour X), points laissés de côté par respect du scope design.

---

**Question :** ce plan te convient-il, notamment (a) le fait de créer de nouvelles pages `AdminArticles`, `AdminImages`, `AdminContact`, `AdminMessagerie` sous `/espace/admin/*` en réutilisant les patterns visuels existants, et (b) la suppression complète de `/admin/*` + `lib/adminApi.ts` + `admin_token` ? Je lance l'implémentation dès validation.
