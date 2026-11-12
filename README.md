# Yuri Soares — Consórcio e Investimentos

Landing page do consultor Yuri Soares. O **único canal de contato é o simulador**: o visitante simula um consórcio e é levado ao WhatsApp de um atendente da equipe (rodízio), com a simulação já preenchida.

**Stack:** React 18 · TypeScript (strict) · Vite · Tailwind CSS · Radix UI (shadcn/ui)

## Rodando localmente

Requer **Node 20.19+** (exigência do Vite 7).

```sh
npm install
npm run dev        # http://localhost:8080
```

| Script              | O que faz                                  |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Servidor de desenvolvimento                |
| `npm run build`     | Checagem de tipos + build de produção      |
| `npm run typecheck` | Só a checagem de tipos                     |
| `npm run lint`      | ESLint                                     |
| `npm run preview`   | Serve o build localmente                   |

Copie `.env.example` para `.env` e defina `VITE_SITE_URL` (domínio público) para as prévias de link no WhatsApp/Instagram funcionarem.

## Onde editar o quê

| Quero mudar…                                   | Arquivo                                   |
| ---------------------------------------------- | ----------------------------------------- |
| E-mail, Instagram, CNPJ                        | `src/config/site.ts`                      |
| Números de WhatsApp da equipe (rodízio)        | `src/lib/teamRotation.ts` e `server/db.sql` |
| Textos (benefícios, depoimentos, FAQ…)         | `src/content/home.ts`                     |
| Tipos de consórcio, valores mín./máx., objetivos | `src/features/simulator/simulator.config.ts` |
| Mensagem enviada ao WhatsApp pelo simulador    | `src/features/simulator/message.ts`       |
| Cores da marca                                 | `src/index.css` (variáveis `:root`)       |

## Estrutura

```
src/
├── config/site.ts            # dados de contato e IDs das seções (fonte única)
├── content/home.ts           # textos da página
├── features/simulator/       # simulador: regras (hook), config, mensagem e UI
├── components/
│   ├── layout/               # Header, Footer, Logo
│   ├── sections/             # uma seção da landing por arquivo
│   ├── common/               # Section, SectionHeading, ícones, WhatsAppLink
│   └── ui/                   # componentes base (shadcn/ui)
├── lib/                      # whatsapp (envio do lead), teamRotation (rodízio), tracking (UTM/Pixel/GA), format, scroll
├── assets/                   # imagens otimizadas (WebP) importadas pelo código
└── pages/                    # Index, PlaybookLogin e 404
assets-src/                   # fotos originais em alta (não vão para o build)
server/                       # API Node (rodízio da equipe + login do Playbook)
```

## Deploy (Docker)

```sh
docker build --build-arg VITE_SITE_URL=https://seudominio.com.br -t yuri-consorcio .
docker run -p 8080:80 yuri-consorcio
```

O nginx serve o build com gzip, cache longo para `/assets`, fallback de SPA e faz proxy de `/api/` para a API do rodízio (`server/`, porta 3001 no host).
