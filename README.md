# GOUNGUÉ INCUB – Plateforme d'accompagnement intelligente

Plateforme web moderne et chaleureuse pour **GOUNGUÉ INCUB**, incubateur social et centre d'accompagnement familial, éducatif, professionnel et psychosocial au Sénégal.

## 🚀 Stack technique

- **Framework** : React 18 + Vite 5
- **Langage** : TypeScript 5
- **Styling** : Tailwind CSS v3 + shadcn/ui
- **Backend & Auth** : Lovable Cloud (Supabase)
- **Tests** : Vitest + Playwright

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

Le fichier `.env` est géré automatiquement par Lovable Cloud et **ne doit pas être poussé sur GitHub**. Avant la connexion GitHub, assurez-vous qu'il est bien exclu par `.gitignore`.

## 📬 Contact

- Email : incubgoungue@gmail.com
- Téléphone : 77 864 10 96
- Adresse : Parcelles Assainies, Unité 13 – Dakar, Sénégal
