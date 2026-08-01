# GOUNGUÉ INCUB – Plateforme d'accompagnement intelligente

Plateforme web moderne et chaleureuse pour **GOUNGUÉ INCUB**, incubateur social et centre d'accompagnement familial, éducatif, professionnel et psychosocial au Sénégal.

## 🚀 Stack technique

- **Framework** : React 18 + Vite 5
- **Langage** : TypeScript 5
- **Styling** : Tailwind CSS v3 + shadcn/ui
- **Backend & Auth** : API Spring Boot dédiée (dépôt `goungu-backend`) — authentification par cookie de session httpOnly, voir `VITE_API_URL` dans `.env.example`
- **Tests** : Vitest (unitaires) ; Playwright installé mais sans specs actives

## 📁 Structure

- `src/pages` – pages publiques et espaces privés (jeune, parent, mentor, formateur, admin)
- `src/components` – composants partagés et composants UI shadcn
- `src/contexts` – gestion globale du thème et de l'authentification
- `src/pages/programmes` – pages dédiées aux programmes (Defarat Sunu Nekkin, Kepar gi, Meñil War Wi, Incubateur Goungué)
- `src/pages/espace` – tableaux de bord sécurisés par rôle

## 🛠 Commandes disponibles

```bash
bun install
bun run dev        # lancer le serveur de développement
bun run build      # build de production
bun run test       # tests unitaires
bun run lint       # linting
```

## 🔐 Remarque sur les secrets

Le fichier `.env` ne contient qu'un seul réglage local, `VITE_API_URL` (voir `.env.example`) — aucun secret réel côté frontend. Il est exclu par `.gitignore` et **ne doit pas être poussé sur GitHub**.

## 📬 Contact

- Email : incubgoungue@gmail.com
- Téléphone : 77 864 10 96
- Adresse : Parcelles Assainies, Unité 13 – Dakar, Sénégal
