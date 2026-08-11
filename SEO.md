# SEO e indexação

O domínio canônico do site é `https://k0sec.org`.

## Arquitetura indexável

O site possui páginas institucionais para sobre, comunidade, trilhas, guias, materiais, projetos, eventos, contribuição e autores. A rota `/areas/` conecta oito áreas a páginas próprias e a páginas de subáreas.

As rotas são HTML estático gerado por `tools/generate-site.js`. A fonte `site-data.js` mantém slugs, nomes, descrições e relações em um só lugar.

## Metadados

Cada página pública deve ter:

- title específico;
- meta description natural;
- canonical absoluto em `https://k0sec.org`;
- `og:title`, `og:description`, `og:url` e imagem social;
- Twitter Card;
- apenas um H1;
- links internos reais.

A home possui JSON-LD `Organization` e `WebSite`. Páginas internas possuem `BreadcrumbList`. Schemas como `Article` e `Event` só devem ser usados quando houver artigo ou evento real com os dados obrigatórios confirmados.

O projeto não utiliza `<meta name="keywords">`. Termos de busca devem aparecer organicamente no conteúdo e na hierarquia da informação.

## Sitemap e robots

`npm run build` gera `sitemap.xml` a partir das rotas existentes e das áreas cadastradas. O arquivo inclui somente URLs públicas, indexáveis e canônicas.

`robots.txt` permite rastreamento e aponta para:

```text
https://k0sec.org/sitemap.xml
```

A página `404.html` usa `noindex, follow` e não entra no sitemap.

## Checklist antes de publicar

1. Execute `npm run validate` e `git diff --check`.
2. Confirme que não há referência operacional a domínio de preview.
3. Verifique canonical, Open Graph e JSON-LD em uma página de cada tipo.
4. Abra o sitemap e confirme que todas as URLs respondem no ambiente publicado.
5. Teste navegação e menu em desktop e mobile.
6. Verifique o console e a navegação por teclado.
7. Valide a imagem social, os favicons e o manifest.

## Indexação

Após o deploy, envie `https://k0sec.org/sitemap.xml` ao Google Search Console e ao Bing Webmaster Tools. Use as ferramentas de inspeção para a home, `/areas/` e páginas prioritárias.

SEO técnico não garante posição. Autoridade depende de conteúdo útil, manutenção, links legítimos, clareza editorial e tempo de indexação. Evite páginas vazias, keyword stuffing, métricas inventadas e textos criados somente para aumentar o número de URLs.

## Evolução editorial

Guias, eventos e projetos podem receber páginas detalhadas conforme conteúdo verdadeiro for publicado. Toda nova rota deve:

- ser alcançável por links internos;
- reutilizar o template visual;
- ter metadados próprios;
- entrar no sitemap gerado;
- indicar autoria, data ou organizadores apenas quando confirmados;
- não apresentar atividades planejadas como concluídas.
