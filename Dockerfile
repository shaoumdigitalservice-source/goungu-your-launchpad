# --- Étape 1 : build ---
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

# Laisser vide (défaut) pour un déploiement mono-domaine avec proxy de chemin :
# les appels API deviennent relatifs ("/api/...") et passent par le même Caddy
# que celui qui sert ce build. Ne renseigner que pour un déploiement multi-domaines
# (ex. VITE_API_URL=https://api.tondomaine.com).
ARG VITE_API_URL=
ENV VITE_API_URL=${VITE_API_URL}
RUN bun run build

# --- Étape 2 : service statique ---
FROM caddy:2-alpine
COPY --from=build /app/dist /usr/share/caddy
COPY Caddyfile.static /etc/caddy/Caddyfile

EXPOSE 80
