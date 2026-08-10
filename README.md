# K0Sec — Site da Comunidade

Landing page oficial da K0Sec, uma comunidade independente de cibersegurança e educação tecnológica para estudantes, iniciantes e pessoas interessadas em aprender segurança digital de forma prática, ética e colaborativa.

**Slogan:** Learn. Explore. Defend.

## Stack

- HTML semântico.
- CSS responsivo.
- JavaScript vanilla.
- Assets locais otimizados.
- SEO com Open Graph, Twitter Cards, JSON-LD, sitemap, robots e manifest.

## Desenvolvimento

Este projeto é estático e não exige build.

```bash
npm run dev
```

Acesse `http://127.0.0.1:4173`.

## Validação

```bash
npm run validate
git diff --check
```

Para alterações visuais, valide desktop, notebook, tablet e celular. As larguras mínimas recomendadas são `320px`, `390px`, `768px`, `1024px` e `1440px`.

## Estrutura

```text
.
├── assets/
│   ├── apple-touch-icon.png      # Ícone Apple/iOS
│   ├── icon-192.png              # Ícone Android/PWA
│   ├── icon-512.png              # Ícone Android/PWA
│   ├── k0sec-favicon.ico         # Favicon clássico
│   ├── k0sec-symbol.webp         # Símbolo otimizado legado
│   ├── maskable-icon-512.png     # Ícone PWA maskable
│   └── social-preview.webp       # Imagem de compartilhamento
├── CODE_OF_CONDUCT.md            # Código de conduta da comunidade
├── COMMUNITY_POLICY.md           # Política de comunidade
├── CONTRIBUTING.md               # Guia de contribuição
├── SEO.md                        # Checklist de SEO e publicação
├── package-lock.json             # Lockfile gerado pelo npm
├── package.json                  # Scripts locais de desenvolvimento e validação
├── humans.txt                    # Informações públicas do projeto
├── index.html                    # Landing page
├── k0sec-logo.png                # Logo original
├── manifest.webmanifest          # Manifest PWA
├── robots.txt                    # Regras para buscadores
├── scripts.js                    # Links, menu mobile, scroll reveal e subtitle engine
├── sitemap.xml                   # Sitemap
└── styles.css                    # Design system e estilos responsivos
```

## Design System

Tokens principais em `styles.css`:

| Categoria | Exemplos |
|-----------|----------|
| Cores | `--color-black`, `--color-card`, `--color-text`, `--color-accent` |
| Tipografia | Space Grotesk para títulos, Inter para textos, JetBrains Mono para elementos técnicos |
| Layout | `--container`, `--header-height`, grids responsivos e `clamp()` |
| Efeitos | Header com blur, cards com hover, subtitle engine com bloom e `prefers-reduced-motion` |

O visual é majoritariamente preto, branco e cinza, com violeta usado apenas em CTAs, links e pequenos detalhes.

## Seções da Landing Page

1. **Header** — Navegação fixa com blur, menu mobile e CTA para Discord.
2. **Hero** — Proposta principal, CTAs, status técnico e símbolo da K0Sec.
3. **Sobre** — Origem e princípios da comunidade.
4. **Áreas** — Grafo interativo para Red Team, Blue Team, redes, Linux, AppSec, OSINT, CTF e programação.
5. **Iniciantes** — Jornada para quem não sabe por onde começar.
6. **Atividades** — Atividades atuais e planejadas sem inventar números ou resultados.
7. **Projetos** — Espaço para GitHub, roadmaps, writeups e documentação.
8. **Ética** — Responsabilidade no uso do conhecimento.
9. **Chamada final** — CTA para Discord e GitHub.
10. **Footer** — Links oficiais, políticas e frase institucional.

## Links Editáveis

Os principais links ficam em `scripts.js`, no objeto `COMMUNITY_LINKS`:

```js
const COMMUNITY_LINKS = {
  discord: "https://discord.gg/JSszTDPS7u",
  github: "https://github.com/k0sec-br",
  siteRepo: "https://github.com/k0sec-br/k0sec",
  communityRepo: "https://github.com/k0sec-br/community",
  learningPathsRepo: "https://github.com/k0sec-br/learning-paths",
  labsRepo: "https://github.com/k0sec-br/labs",
  social: "https://www.instagram.com/k0.sec",
  communityPolicy: "COMMUNITY_POLICY.md",
  codeOfConduct: "CODE_OF_CONDUCT.md",
  contact: "https://www.instagram.com/k0.sec"
};
```

## SEO

O site já inclui:

- Title e meta description.
- Canonical URL.
- Robots, Googlebot e Bingbot.
- Open Graph e Twitter Cards.
- JSON-LD para `Organization` e `WebSite`.
- `robots.txt`.
- `sitemap.xml`.
- `manifest.webmanifest`.
- Ícones para favicon, Apple, Android e PWA.

Mais detalhes em [SEO.md](SEO.md).

## Analytics

O HTML possui a metatag `google-analytics-id` como espaço preparado. Quando houver uma propriedade configurada, adicione o script oficial do Google Analytics no `head` usando o identificador real.

## Deploy

O projeto pode ser publicado em qualquer hospedagem estática, como GitHub Pages, Cloudflare Pages, Netlify ou Vercel.

O workflow `.github/workflows/validate.yml` valida HTML, JavaScript, manifest e sitemap em pushes e pull requests.

Antes de publicar, confira se o domínio final continua sendo `https://k0sec.pages.dev/`. Se um domínio próprio for adotado no futuro, atualize os metadados listados em [SEO.md](SEO.md).
