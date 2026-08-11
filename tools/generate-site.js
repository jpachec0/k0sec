const { mkdirSync, readFileSync, writeFileSync } = require("node:fs");
const { dirname, join } = require("node:path");
const siteData = require("../site-data.js");

const ROOT_DIRECTORY = join(__dirname, "..");
const SITE_ORIGIN = siteData.links.site;
const SOCIAL_IMAGE_URL = `${SITE_ORIGIN}/assets/social-preview.webp`;
const GENERATED_DATE = new Date().toISOString().slice(0, 10);

const staticPages = [
  {
    path: "/sobre/",
    title: "Sobre a K0Sec: comunidade brasileira de cibersegurança | K0Sec",
    description: "Conheça a K0Sec, comunidade brasileira de cibersegurança que conecta estudantes, iniciantes e pessoas interessadas em tecnologia.",
    eyebrow: "Sobre a K0Sec",
    heading: "Conhecimento aberto, prática responsável.",
    lead: "A K0Sec é uma comunidade independente do interior de São Paulo dedicada ao aprendizado de cibersegurança e educação tecnológica.",
    content: `
      <section class="article-section" aria-labelledby="sobre-proposito">
        <h2 id="sobre-proposito">Por que a comunidade existe</h2>
        <p>A comunidade foi criada para conectar estudantes, iniciantes, desenvolvedores e pessoas interessadas em segurança digital. O objetivo é facilitar o acesso a caminhos de estudo, projetos e discussões técnicas sem criar barreiras desnecessárias para começar.</p>
      </section>
      <section class="article-section" aria-labelledby="sobre-alcance">
        <h2 id="sobre-alcance">Regional e online</h2>
        <p>A atuação regional envolve principalmente Fernandópolis, Votuporanga, São José do Rio Preto e cidades próximas. A participação permanece aberta pela internet para pessoas de qualquer lugar.</p>
      </section>
      <section class="article-section" aria-labelledby="sobre-principios">
        <h2 id="sobre-principios">Aprender, explorar e compartilhar</h2>
        <p>A K0Sec organiza conhecimento, incentiva experiências em ambientes autorizados e promove colaboração aberta. Toda prática deve respeitar limites éticos, legais e a privacidade de outras pessoas.</p>
        <div class="inline-links">
          <a href="/areas/">Explorar áreas de estudo</a>
          <a href="/comunidade/">Conhecer a comunidade</a>
        </div>
      </section>`
  },
  {
    path: "/comunidade/",
    title: "Comunidade de Cibersegurança para Iniciantes | K0Sec",
    description: "Participe da comunidade K0Sec, estude cibersegurança com outras pessoas e contribua com materiais, projetos e discussões responsáveis.",
    eyebrow: "Comunidade",
    heading: "Um espaço para começar e evoluir junto.",
    lead: "A participação é aberta para iniciantes, estudantes e pessoas que estudam tecnologia individualmente e procuram uma comunidade.",
    content: `
      <section class="article-section" aria-labelledby="comunidade-comecar">
        <h2 id="comunidade-comecar">Como começar</h2>
        <ol class="numbered-flow">
          <li>Entre no Discord oficial.</li>
          <li>Leia as regras e o código de conduta.</li>
          <li>Escolha uma área ou uma trilha inicial.</li>
          <li>Participe de dúvidas, estudos e projetos quando se sentir confortável.</li>
        </ol>
      </section>
      <section class="article-section" aria-labelledby="comunidade-participar">
        <h2 id="comunidade-participar">Formas de participar</h2>
        <p>Você pode estudar materiais, sugerir melhorias, revisar documentação, compartilhar aprendizados, propor atividades e contribuir com os repositórios públicos. Não é necessário ter experiência ou certificação.</p>
      </section>
      <section class="page-cta" aria-label="Entrar na comunidade">
        <p>Leia as regras, apresente-se e encontre pessoas estudando os mesmos temas.</p>
        <a class="button button-primary" href="${siteData.links.discord}">Entrar no Discord</a>
      </section>`
  },
  {
    path: "/trilhas/",
    title: "Trilhas de Cibersegurança para Iniciantes | K0Sec",
    description: "Consulte a progressão de estudos da K0Sec para começar em tecnologia, redes, Linux, Git, cibersegurança e laboratórios autorizados.",
    eyebrow: "Trilhas",
    heading: "Um caminho possível para começar.",
    lead: "As trilhas abertas da K0Sec ajudam iniciantes a organizar fundamentos antes de escolher uma especialização.",
    content: `
      <section class="article-section" aria-labelledby="trilhas-progressao">
        <h2 id="trilhas-progressao">Progressão recomendada</h2>
        <ol class="learning-sequence">
          <li>Como começar</li>
          <li>Fundamentos de TI</li>
          <li>Redes</li>
          <li>Linux</li>
          <li>Git e GitHub</li>
          <li>Fundamentos de cibersegurança</li>
          <li>Laboratórios</li>
          <li>Escolha de especialização</li>
        </ol>
      </section>
      <section class="article-section" aria-labelledby="trilhas-uso">
        <h2 id="trilhas-uso">Como usar</h2>
        <p>A sequência é uma orientação, não uma regra rígida. Registre dúvidas, pratique somente em ambientes autorizados e use o Discord para compartilhar seu progresso.</p>
        <div class="inline-links">
          <a href="${siteData.links.learningPathsRepository}">Abrir trilhas no GitHub</a>
          <a href="/areas/">Escolher uma área</a>
        </div>
      </section>`
  },
  {
    path: "/guias/",
    title: "Guias de Cibersegurança para Iniciantes | K0Sec",
    description: "Acompanhe a estrutura de guias da K0Sec para estudar fundamentos, áreas da cibersegurança e práticas responsáveis.",
    eyebrow: "Guias",
    heading: "Guias que crescem com revisão comunitária.",
    lead: "A biblioteca de guias está sendo estruturada para receber conteúdos curtos, verificáveis e úteis para quem está começando.",
    content: `
      <section class="article-section" aria-labelledby="guias-estado">
        <h2 id="guias-estado">Conteúdo em preparação</h2>
        <p>Os guias serão publicados conforme o conteúdo for escrito e revisado. A K0Sec não publica páginas artificiais apenas para preencher o catálogo.</p>
      </section>
      <section class="article-section" aria-labelledby="guias-enquanto">
        <h2 id="guias-enquanto">Onde estudar agora</h2>
        <p>Use o mapa de áreas para entender especializações ou siga a progressão recomendada nas trilhas públicas da comunidade.</p>
        <div class="inline-links">
          <a href="/areas/">Áreas da cibersegurança</a>
          <a href="/trilhas/">Trilhas para iniciantes</a>
          <a href="/materiais/">Materiais públicos</a>
        </div>
      </section>`
  },
  {
    path: "/materiais/",
    title: "Materiais Abertos de Cibersegurança | K0Sec",
    description: "Encontre trilhas, laboratórios e documentação pública da K0Sec para estudar tecnologia e cibersegurança com responsabilidade.",
    eyebrow: "Materiais",
    heading: "Conhecimento público e revisável.",
    lead: "Os materiais da K0Sec são organizados em repositórios abertos para facilitar correções, sugestões e colaboração.",
    content: `
      <section class="resource-list" aria-label="Repositórios de materiais">
        <a href="${siteData.links.learningPathsRepository}"><strong>Trilhas de aprendizado</strong><span>Fundamentos, progressão inicial e caminhos de estudo.</span></a>
        <a href="${siteData.links.labsRepository}"><strong>Laboratórios educacionais</strong><span>Exercícios seguros para ambientes próprios ou autorizados.</span></a>
        <a href="${siteData.links.communityRepository}"><strong>Documentação comunitária</strong><span>Governança, roadmap, participação e propostas.</span></a>
      </section>
      <section class="article-section" aria-labelledby="materiais-etica">
        <h2 id="materiais-etica">Uso responsável</h2>
        <p>Práticas de segurança devem acontecer somente em máquinas próprias, laboratórios controlados, plataformas educacionais ou sistemas com autorização expressa.</p>
      </section>`
  },
  {
    path: "/projetos/",
    title: "Projetos Abertos de Cibersegurança | K0Sec",
    description: "Conheça os repositórios públicos da K0Sec para comunidade, trilhas de aprendizado, laboratórios e desenvolvimento do site oficial.",
    eyebrow: "Projetos",
    heading: "Construído de forma aberta.",
    lead: "O ecossistema público da K0Sec separa governança, aprendizado, laboratórios e presença oficial em repositórios próprios.",
    content: `
      <section class="resource-list" aria-label="Projetos oficiais da K0Sec">
        <a href="${siteData.links.siteRepository}"><strong>Site oficial</strong><span>Arquitetura pública, interface, SEO e documentação do site.</span></a>
        <a href="${siteData.links.communityRepository}"><strong>Community</strong><span>Governança, participação, eventos e documentação comunitária.</span></a>
        <a href="${siteData.links.learningPathsRepository}"><strong>Learning Paths</strong><span>Trilhas abertas de tecnologia e cibersegurança.</span></a>
        <a href="${siteData.links.labsRepository}"><strong>Labs</strong><span>Laboratórios educacionais seguros e autorizados.</span></a>
      </section>
      <section class="article-section" aria-labelledby="projetos-contribuir">
        <h2 id="projetos-contribuir">Contribuição pública</h2>
        <p>Issues e Pull Requests podem registrar correções, sugestões e melhorias reais. Consulte o guia de contribuição de cada repositório antes de enviar mudanças.</p>
        <a class="text-link" href="/contribuir/">Como contribuir</a>
      </section>`
  },
  {
    path: "/eventos/",
    title: "Eventos e Atividades de Cibersegurança | K0Sec",
    description: "Acompanhe a preparação de encontros, workshops, grupos de estudo e atividades educacionais da comunidade K0Sec.",
    eyebrow: "Eventos",
    heading: "Primeiras atividades em preparação.",
    lead: "A K0Sec está construindo suas primeiras experiências junto com a comunidade. Nenhum evento futuro é apresentado como realizado.",
    content: `
      <section class="article-section" aria-labelledby="eventos-formatos">
        <h2 id="eventos-formatos">Formatos em planejamento</h2>
        <ul class="topic-list">
          <li>Sessões introdutórias</li>
          <li>Grupos de estudo</li>
          <li>Laboratórios guiados</li>
          <li>CTFs para iniciantes</li>
          <li>Atividades sobre Git e GitHub</li>
        </ul>
      </section>
      <section class="article-section" aria-labelledby="eventos-propor">
        <h2 id="eventos-propor">Propor uma atividade</h2>
        <p>Propostas devem informar tema, público, formato, pré-requisitos, cuidados e resultado esperado. Atividades práticas precisam ter escopo autorizado.</p>
        <a class="text-link" href="${siteData.links.communityRepository}">Consultar organização comunitária</a>
      </section>`
  },
  {
    path: "/contribuir/",
    title: "Como Contribuir com a Comunidade K0Sec",
    description: "Veja como contribuir com documentação, trilhas, laboratórios, projetos e melhorias na comunidade aberta K0Sec.",
    eyebrow: "Contribuir",
    heading: "Toda melhoria útil pode começar pequena.",
    lead: "Contribuições podem envolver documentação, sugestões, revisão, acessibilidade, materiais, laboratórios ou desenvolvimento.",
    content: `
      <section class="article-section" aria-labelledby="contribuir-fluxo">
        <h2 id="contribuir-fluxo">Fluxo recomendado</h2>
        <ol class="numbered-flow">
          <li>Escolha o repositório relacionado à contribuição.</li>
          <li>Leia o guia de contribuição e o código de conduta.</li>
          <li>Crie uma branch a partir de <code>develop</code>.</li>
          <li>Faça uma alteração pequena, documentada e verificável.</li>
          <li>Abra uma Pull Request para <code>develop</code>.</li>
        </ol>
      </section>
      <section class="article-section" aria-labelledby="contribuir-iniciantes">
        <h2 id="contribuir-iniciantes">Iniciantes são bem-vindos</h2>
        <p>Corrigir uma explicação, apontar um link quebrado ou melhorar a acessibilidade também são contribuições técnicas relevantes.</p>
        <div class="inline-links">
          <a href="${siteData.links.github}">Organização no GitHub</a>
          <a href="${siteData.links.discord}">Conversar no Discord</a>
        </div>
      </section>`
  },
  {
    path: "/autores/",
    title: "Fundadores e Administradores da K0Sec",
    description: "Conheça os perfis públicos associados à fundação e administração da comunidade K0Sec.",
    eyebrow: "Autores",
    heading: "Pessoas que ajudam a construir a K0Sec.",
    lead: "Esta página reúne somente perfis públicos já identificados pela comunidade, sem atribuir hierarquias ou responsabilidades não documentadas.",
    content: `
      <section class="people-list" aria-label="Fundadores e administradores">
        ${siteData.authors.map((author) => `<a href="${author.url}"><span>${escapeHtml(author.name)}</span><small>GitHub</small></a>`).join("\n")}
      </section>
      <section class="article-section" aria-labelledby="autores-colaboracao">
        <h2 id="autores-colaboracao">Uma construção comunitária</h2>
        <p>Materiais, projetos e decisões públicas também evoluem com contribuições de membros e colaboradores nos repositórios da organização.</p>
        <a class="text-link" href="/contribuir/">Participar da construção</a>
      </section>`
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function canonicalUrl(path) {
  return `${SITE_ORIGIN}${path}`;
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path)
    }))
  };
}

function renderHead({ title, description, path, schemas = [], indexable = true }) {
  const url = canonicalUrl(path);
  const structuredData = schemas
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`)
    .join("\n    ");

  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="author" content="K0Sec">
    <meta name="robots" content="${indexable ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, follow"}">
    <link rel="canonical" href="${url}">
    <meta name="theme-color" content="#050505">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:site_name" content="K0Sec">
    <meta property="og:image" content="${SOCIAL_IMAGE_URL}">
    <meta property="og:image:alt" content="Símbolo da K0Sec em fundo preto">
    <meta property="og:locale" content="pt_BR">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${SOCIAL_IMAGE_URL}">
    <link rel="icon" href="/assets/k0sec-favicon.ico" sizes="32x32 48x48">
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/icon-192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="preload" href="/assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="/styles.css">
    ${structuredData}`;
}

function renderHeader() {
  return `
    <header class="site-header">
      <nav class="nav-shell" aria-label="Navegação principal">
        <a class="brand" href="/" aria-label="K0Sec início">
          <img src="/assets/k0sec-symbol.webp" alt="" width="36" height="36" decoding="async">
          <span>K0Sec</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu">
          <span class="sr-only">Abrir menu</span><span aria-hidden="true"></span>
        </button>
        <div class="nav-menu" id="primary-menu">
          <a href="/">Início</a>
          <a href="/sobre/">Sobre</a>
          <a href="/areas/">Áreas</a>
          <a href="/trilhas/">Trilhas</a>
          <a href="/comunidade/">Comunidade</a>
          <a class="button button-small" href="${siteData.links.discord}">Entrar no Discord</a>
        </div>
      </nav>
    </header>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="K0Sec início">
          <img src="/assets/k0sec-symbol.webp" alt="" width="34" height="34" loading="lazy" decoding="async"><span>K0Sec</span>
        </a>
        <p>K0Sec — Learn. Explore. Defend.</p>
        <small>Comunidade independente de cibersegurança e educação tecnológica.</small>
      </div>
      <nav class="footer-links" aria-label="Links da comunidade">
        <a href="${siteData.links.discord}">Discord</a>
        <a href="${siteData.links.github}">GitHub</a>
        <a href="${siteData.links.instagram}">Instagram</a>
        <a href="/guias/">Guias</a>
        <a href="/projetos/">Projetos</a>
        <a href="/contribuir/">Contribuir</a>
      </nav>
    </footer>`;
}

function renderBreadcrumbs(items) {
  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>${items.map((item, index) => {
        const current = index === items.length - 1;
        return `<li>${current ? `<span aria-current="page">${escapeHtml(item.name)}</span>` : `<a href="${item.path}">${escapeHtml(item.name)}</a>`}</li>`;
      }).join("")}</ol>
    </nav>`;
}

function renderPage({ path, title, description, eyebrow, heading, lead, content, breadcrumbs }) {
  const breadcrumbItems = breadcrumbs || [
    { name: "K0Sec", path: "/" },
    { name: heading, path }
  ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>${renderHead({
    title,
    description,
    path,
    schemas: [breadcrumbSchema(breadcrumbItems)]
  })}
  </head>
  <body class="internal-page">
    ${renderHeader()}
    <main class="internal-main">
      <div class="internal-shell">
        ${renderBreadcrumbs(breadcrumbItems)}
        <header class="internal-hero">
          <span class="section-kicker">${escapeHtml(eyebrow)}</span>
          <h1>${escapeHtml(heading)}</h1>
          <p>${escapeHtml(lead)}</p>
        </header>
        <div class="article-layout">${content}</div>
      </div>
    </main>
    ${renderFooter()}
    <script src="/scripts.js" defer></script>
  </body>
</html>`;
}

function renderAreasIndex() {
  const path = "/areas/";
  const breadcrumbs = [
    { name: "K0Sec", path: "/" },
    { name: "Áreas", path }
  ];
  const branches = siteData.areas.map((area) => `
    <section class="knowledge-branch" aria-labelledby="area-${area.slug}">
      <span class="knowledge-code">${area.index} ${area.code}</span>
      <h2 id="area-${area.slug}"><a href="/areas/${area.slug}/">${escapeHtml(area.title)}</a></h2>
      <p>${escapeHtml(area.description)}</p>
      <ul>
        ${area.subareas.map((subarea) => `<li><a href="/areas/${area.slug}/${subarea.slug}/">${escapeHtml(subarea.title)}</a></li>`).join("\n")}
      </ul>
    </section>`).join("\n");

  return renderPage({
    path,
    title: "Áreas da Cibersegurança: Red Team, Blue Team, OSINT e mais | K0Sec",
    description: "Explore o mapa de áreas da cibersegurança da K0Sec: Red Team, Blue Team, redes, Linux, AppSec, OSINT, CTF e programação.",
    eyebrow: "Mapa de estudos",
    heading: "Áreas da cibersegurança.",
    lead: "Explore relações entre áreas e subáreas, abra um caminho específico e encontre conexões com trilhas, materiais e projetos.",
    breadcrumbs,
    content: `
      <section class="knowledge-map" aria-label="Mapa completo das áreas de estudo">
        <header class="knowledge-root">
          <img src="/assets/k0sec-symbol.webp" alt="" width="64" height="64" loading="lazy" decoding="async">
          <div><span>K0Sec</span><strong>Cibersegurança</strong></div>
        </header>
        <div class="knowledge-grid">${branches}</div>
      </section>
      <section class="page-cta" aria-label="Próximo passo">
        <p>Não sabe qual caminho escolher? Comece pelos fundamentos e avance no seu ritmo.</p>
        <a class="button button-secondary" href="/trilhas/">Ver trilhas para iniciantes</a>
      </section>`
  });
}

function renderAreaPage(area) {
  const path = `/areas/${area.slug}/`;
  const breadcrumbs = [
    { name: "K0Sec", path: "/" },
    { name: "Áreas", path: "/areas/" },
    { name: area.title, path }
  ];
  const relatedAreas = area.relatedAreas
    .map((slug) => siteData.areas.find((candidate) => candidate.slug === slug))
    .filter(Boolean);

  return renderPage({
    path,
    title: `${area.title}: o que é e como começar | K0Sec`,
    description: `${area.description} Conheça as subáreas e caminhos relacionados na comunidade K0Sec.`,
    eyebrow: `${area.index} ${area.code}`,
    heading: area.title,
    lead: area.description,
    breadcrumbs,
    content: `
      <section class="article-section" aria-labelledby="objetivo-${area.slug}">
        <h2 id="objetivo-${area.slug}">Objetivo desta área</h2>
        <p>Organizar fundamentos e práticas relacionadas a ${escapeHtml(area.title)}, conectando estudo conceitual, documentação e experiências realizadas somente em ambientes próprios ou autorizados.</p>
      </section>
      <section class="article-section" aria-labelledby="subareas-${area.slug}">
        <h2 id="subareas-${area.slug}">Subáreas</h2>
        <nav class="topic-links" aria-label="Subáreas de ${escapeHtml(area.title)}">
          ${area.subareas.map((subarea) => `<a href="/areas/${area.slug}/${subarea.slug}/">${escapeHtml(subarea.title)}</a>`).join("\n")}
        </nav>
      </section>
      <section class="article-section" aria-labelledby="relacoes-${area.slug}">
        <h2 id="relacoes-${area.slug}">Áreas relacionadas</h2>
        <div class="inline-links">
          ${relatedAreas.map((relatedArea) => `<a href="/areas/${relatedArea.slug}/">${escapeHtml(relatedArea.title)}</a>`).join("\n")}
        </div>
      </section>
      <section class="page-cta" aria-label="Continuar estudando">
        <p>Use as trilhas para organizar fundamentos ou participe das discussões da comunidade.</p>
        <a class="button button-secondary" href="/trilhas/">Ver trilhas</a>
        <a class="button button-primary" href="${siteData.links.discord}">Entrar no Discord</a>
      </section>`
  });
}

function renderSubareaPage(area, subarea) {
  const path = `/areas/${area.slug}/${subarea.slug}/`;
  const breadcrumbs = [
    { name: "K0Sec", path: "/" },
    { name: "Áreas", path: "/areas/" },
    { name: area.title, path: `/areas/${area.slug}/` },
    { name: subarea.title, path }
  ];
  const siblingSubareas = area.subareas.filter((candidate) => candidate.slug !== subarea.slug);

  return renderPage({
    path,
    title: `${subarea.title} em ${area.title} | K0Sec`,
    description: `Conheça ${subarea.title} como parte dos estudos de ${area.title} da K0Sec, com contexto responsável e assuntos relacionados.`,
    eyebrow: area.title,
    heading: subarea.title,
    lead: `${subarea.title} integra o caminho de estudos de ${area.title} na K0Sec.`,
    breadcrumbs,
    content: `
      <section class="article-section" aria-labelledby="contexto-${subarea.slug}">
        <h2 id="contexto-${subarea.slug}">Contexto</h2>
        <p>${escapeHtml(area.description)}</p>
        <p>Esta página é o ponto de entrada para o tema e será ampliada conforme materiais revisados pela comunidade forem publicados.</p>
        <a class="text-link" href="/areas/${area.slug}/">Voltar para ${escapeHtml(area.title)}</a>
      </section>
      <section class="article-section" aria-labelledby="relacionados-${subarea.slug}">
        <h2 id="relacionados-${subarea.slug}">Assuntos relacionados</h2>
        <nav class="topic-links" aria-label="Outras subáreas de ${escapeHtml(area.title)}">
          ${siblingSubareas.map((candidate) => `<a href="/areas/${area.slug}/${candidate.slug}/">${escapeHtml(candidate.title)}</a>`).join("\n")}
        </nav>
      </section>
      <section class="page-cta" aria-label="Recursos relacionados">
        <p>Consulte materiais públicos ou siga uma trilha antes de avançar para práticas.</p>
        <a class="button button-secondary" href="/materiais/">Ver materiais</a>
        <a class="button button-secondary" href="/trilhas/">Ver trilhas</a>
      </section>`
  });
}

function renderNotFoundPage() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>${renderHead({
    title: "Página não encontrada | K0Sec",
    description: "A página solicitada não foi encontrada no site da K0Sec.",
    path: "/404.html",
    indexable: false
  })}
  </head>
  <body class="internal-page">
    ${renderHeader()}
    <main class="not-found-page">
      <span class="section-kicker">ERROR // 404</span>
      <h1>Página não encontrada.</h1>
      <p>O endereço pode ter mudado ou ainda não existe.</p>
      <div class="action-row">
        <a class="button button-primary" href="/">Voltar ao início</a>
        <a class="button button-secondary" href="/areas/">Explorar áreas</a>
      </div>
    </main>
    ${renderFooter()}
    <script src="/scripts.js" defer></script>
  </body>
</html>`;
}

function routeToFile(path) {
  if (path === "/404.html") return join(ROOT_DIRECTORY, "404.html");
  return join(ROOT_DIRECTORY, path.replace(/^\//, ""), "index.html");
}

function writePage(path, html) {
  const filePath = routeToFile(path);
  const normalizedHtml = `${html.replace(/[ \t]+$/gm, "").trim()}\n`;

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, normalizedHtml, "utf8");
}

function renderSitemap(paths) {
  const entries = paths.map((path) => `  <url>
    <loc>${canonicalUrl(path)}</loc>
    <lastmod>${GENERATED_DATE}</lastmod>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function updateHomeAreaFallback() {
  const homePath = join(ROOT_DIRECTORY, "index.html");
  const homeHtml = readFileSync(homePath, "utf8");
  const fallbackLinks = siteData.areas
    .map((area) => `              <li><a href="/areas/${area.slug}/">${escapeHtml(area.title)}</a></li>`)
    .join("\n");
  const fallbackMarkup = `<!-- generated:home-area-fallback:start -->
          <noscript>
            <nav class="home-area-fallback" aria-label="Áreas de estudo">
              <ul>
${fallbackLinks}
              </ul>
            </nav>
          </noscript>
          <!-- generated:home-area-fallback:end -->`;
  const generatedBlockPattern = /<!-- generated:home-area-fallback:start -->[\s\S]*?<!-- generated:home-area-fallback:end -->/;

  if (!generatedBlockPattern.test(homeHtml)) {
    throw new Error("Home area fallback markers were not found in index.html.");
  }

  writeFileSync(homePath, `${homeHtml.replace(generatedBlockPattern, fallbackMarkup).trim()}\n`, "utf8");
}

function generateSite() {
  const publicPaths = ["/"];

  updateHomeAreaFallback();

  staticPages.forEach((page) => {
    writePage(page.path, renderPage(page));
    publicPaths.push(page.path);
  });

  writePage("/areas/", renderAreasIndex());
  publicPaths.push("/areas/");

  siteData.areas.forEach((area) => {
    const areaPath = `/areas/${area.slug}/`;

    writePage(areaPath, renderAreaPage(area));
    publicPaths.push(areaPath);

    area.subareas.forEach((subarea) => {
      const subareaPath = `${areaPath}${subarea.slug}/`;

      writePage(subareaPath, renderSubareaPage(area, subarea));
      publicPaths.push(subareaPath);
    });
  });

  writePage("/404.html", renderNotFoundPage());
  writeFileSync(join(ROOT_DIRECTORY, "sitemap.xml"), renderSitemap(publicPaths), "utf8");

  process.stdout.write(`Generated ${publicPaths.length} indexable pages and 404.html.\n`);
}

generateSite();
