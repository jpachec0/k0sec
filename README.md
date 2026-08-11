# K0Sec — Site Oficial

Site institucional e educacional da K0Sec, comunidade brasileira de cibersegurança para estudantes, iniciantes e pessoas interessadas em aprender de forma prática, ética e colaborativa.

**Slogan:** Learn. Explore. Defend.

## Arquitetura

O projeto continua leve e estático: HTML semântico, CSS e JavaScript vanilla. Um gerador Node.js cria as páginas internas a partir de templates reutilizáveis e da fonte central de dados, sem framework ou dependências de produção.

```text
.
├── index.html                     # Home
├── site-data.js                   # Áreas, subáreas e links oficiais
├── home-study-graph.js            # Grafo progressivo da home
├── scripts.js                     # Menu, reveal e subtitle engine
├── styles.css                     # Design system e responsividade
├── tools/
│   ├── generate-site.js           # Gerador de páginas e sitemap
│   └── validate-links.js          # Validação de links e assets locais
├── tests/
│   └── site-architecture.test.js  # Testes de dados, rotas e SEO
├── areas/                         # Mapa, áreas e subáreas geradas
├── sobre/                         # Página institucional gerada
├── comunidade/                    # Participação e entrada na comunidade
├── trilhas/                       # Progressão inicial de aprendizado
├── guias/                         # Estrutura para guias revisados
├── materiais/                     # Recursos públicos
├── projetos/                      # Ecossistema open source
├── eventos/                       # Atividades em preparação
├── contribuir/                    # Fluxo de contribuição
├── autores/                       # Perfis públicos confirmados
├── 404.html                       # Página de erro não indexável
├── sitemap.xml                    # Sitemap gerado
└── assets/                        # Ícones, imagens e fontes locais otimizadas
```

Os diretórios de páginas geradas são versionados para permitir deploy em hospedagem estática. Não os edite isoladamente: altere `site-data.js` ou `tools/generate-site.js` e execute o build.

## Desenvolvimento

Requer Node.js e npm. Instale as dependências de validação e inicie o servidor local:

```bash
npm install
npm run dev
```

Acesse `http://127.0.0.1:4173`.

O comando `dev` executa o gerador antes de servir os arquivos. Para gerar sem iniciar o servidor:

```bash
npm run build
```

## Fonte de dados

`site-data.js` é a fonte de verdade para:

- links oficiais;
- oito áreas de estudo;
- códigos visuais e descrições;
- subáreas e slugs;
- relações entre áreas;
- perfis públicos exibidos no site.

Esses dados alimentam o grafo da home, as rotas de áreas e subáreas, breadcrumbs e sitemap. Assim, um assunto não precisa ser mantido em vários arquivos.

## Grafo de áreas

Na home, o grafo mostra somente a K0Sec e as oito áreas principais. Uma seleção revela as subáreas daquele ramo, mantendo as demais áreas visíveis. Em telas menores, a mesma informação aparece como acordeão semântico para preservar leitura, toque e navegação por teclado.

`/areas/` fornece o mapa textual completo com links reais para todas as áreas e subáreas. O conteúdo importante não depende de Canvas ou da execução de JavaScript para ser rastreado.

## Criando conteúdo

Páginas institucionais são definidas em `staticPages`, dentro de `tools/generate-site.js`. As páginas de áreas e subáreas são produzidas automaticamente a partir de `site-data.js`.

Guias, eventos e projetos devem ser adicionados somente quando houver conteúdo verdadeiro e revisado. As páginas de índice já existem; futuras páginas detalhadas devem reutilizar `renderPage`, adotar URL legível, breadcrumb, metadados próprios e entrar no sitemap gerado.

Não adicione `Event`, `Article` ou outro schema sem conteúdo correspondente.

## SEO

O domínio canônico é `https://k0sec.org`. Todas as páginas indexáveis incluem:

- title e description próprios;
- canonical;
- Open Graph e Twitter Card;
- links internos rastreáveis;
- `BreadcrumbList` nas páginas internas;
- uma única hierarquia principal de títulos.

A home inclui JSON-LD `Organization` e `WebSite`. O sitemap contém somente rotas públicas e canônicas. O site não utiliza `meta keywords` nem páginas artificiais para ampliar volume de indexação.

Consulte [SEO.md](SEO.md) para o checklist de publicação e indexação.

## Validação

```bash
npm run validate
git diff --check
```

O fluxo completo executa:

- geração das páginas e do sitemap;
- verificação de sintaxe JavaScript;
- validação de todos os arquivos HTML;
- testes de dados, rotas, canonical e metadados;
- verificação de links e assets locais;
- validação do manifest e do XML do sitemap.

Para mudanças visuais, valide ao menos `320px`, `390px`, `768px`, `1024px`, `1366px`, `1920px` e `2560px`, além de navegação por Tab, Enter e Espaço.

## Design system

Os tokens em `styles.css` preservam a identidade da K0Sec:

| Categoria | Definição |
| --- | --- |
| Cores | Preto, branco e cinza, com `--color-accent` apenas em detalhes e ações |
| Tipografia | Space Grotesk, Inter e JetBrains Mono |
| Layout | `--container`, `--header-height`, grids e medidas responsivas |
| Movimento | Transições discretas e suporte a `prefers-reduced-motion` |

## Links oficiais

- Site: [k0sec.org](https://k0sec.org)
- Organização: [github.com/k0sec-br](https://github.com/k0sec-br)
- Discord: [discord.gg/JSszTDPS7u](https://discord.gg/JSszTDPS7u)
- Instagram: [instagram.com/k0.sec](https://www.instagram.com/k0.sec)

## Contribuição

Leia [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) e [COMMUNITY_POLICY.md](COMMUNITY_POLICY.md). Pull Requests comuns devem partir de `develop` e também ter `develop` como destino.
