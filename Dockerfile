# ---------- Build ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# URL pública do site (usada nas meta tags de SEO/compartilhamento)
ARG VITE_SITE_URL=""
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN npm run build

# ---------- Runtime ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
