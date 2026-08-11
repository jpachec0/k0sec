const { mkdirSync, readFileSync, writeFileSync } = require("node:fs");
const { dirname, join } = require("node:path");
const siteData = require("../site-data.js");

const ROOT_DIRECTORY = join(__dirname, "..");
const SITE_ORIGIN = siteData.links.site;
const SOCIAL_IMAGE_URL = `${SITE_ORIGIN}/assets/social-preview.webp`;
const GENERATED_DATE = new Date().toISOString().slice(0, 10);

function renderSectionHeading({ index, title, description = "", id }) {
  return `<header class="editorial-heading">
    <span class="editorial-index">${escapeHtml(index)}</span>
    <div>
      <h2 id="${escapeHtml(id)}">${escapeHtml(title)}</h2>
      ${description ? `<p>${escapeHtml(description)}</p>` : ""}
    </div>
  </header>`;
}

function renderStepList(items, className = "step-list") {
  return `<ol class="${className}">
    ${items.map((item, index) => `<li>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><strong>${escapeHtml(item.title)}</strong>${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}</div>
    </li>`).join("\n")}
  </ol>`;
}

function renderCommunityCta() {
  return `<section class="community-cta" aria-labelledby="community-cta-title">
    <div>
      <span class="editorial-index">COMUNIDADE // ACESSO ABERTO</span>
      <h2 id="community-cta-title">Estude junto com a comunidade.</h2>
      <p>Compartilhe dúvidas, acompanhe outras pessoas e participe no seu ritmo.</p>
    </div>
    <div class="cta-group">
      <a class="button button-primary" href="${siteData.links.discord}">Entrar no Discord <span aria-hidden="true">→</span></a>
      <a class="text-link" href="/comunidade/">Conhecer a comunidade <span aria-hidden="true">→</span></a>
    </div>
  </section>`;
}

const staticPages = [
  {
    path: "/sobre/",
    title: "Sobre a K0Sec: comunidade brasileira de cibersegurança | K0Sec",
    description: "Conheça a K0Sec, comunidade brasileira de cibersegurança que conecta estudantes, iniciantes e pessoas interessadas em tecnologia.",
    eyebrow: "Sobre a K0Sec",
    heading: "Conhecimento aberto, prática responsável.",
    lead: "A K0Sec é uma comunidade independente do interior de São Paulo dedicada ao aprendizado de cibersegurança e educação tecnológica.",
    content: `
      <section class="editorial-section" aria-labelledby="sobre-quem">
        ${renderSectionHeading({ index: "01 / IDENTIDADE", title: "Quem é a K0Sec.", id: "sobre-quem" })}
        <div class="split-copy">
          <p class="lead-copy">Uma comunidade para conectar estudantes, iniciantes, desenvolvedores e pessoas interessadas em segurança digital.</p>
          <p>O objetivo é facilitar o acesso a caminhos de estudo, projetos e discussões técnicas sem criar barreiras desnecessárias para começar.</p>
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="sobre-pilares">
        ${renderSectionHeading({ index: "02 / PILARES", title: "Aprender, explorar e compartilhar.", id: "sobre-pilares" })}
        <div class="pillar-grid">
          <article><span>01</span><h3>Aprender</h3><p>Organizar fundamentos, referências e caminhos de estudo acessíveis a diferentes níveis.</p></article>
          <article><span>02</span><h3>Explorar</h3><p>Transformar teoria em experiência dentro de laboratórios e ambientes autorizados.</p></article>
          <article><span>03</span><h3>Compartilhar</h3><p>Construir materiais e projetos com revisão, diálogo e colaboração aberta.</p></article>
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="sobre-atuacao">
        ${renderSectionHeading({ index: "03 / ATUAÇÃO", title: "Regional por origem. Online por escolha.", id: "sobre-atuacao" })}
        <div class="overview-grid">
          <article class="overview-item"><span class="item-label">REGIÃO</span><h3>Interior de São Paulo</h3><p>A atuação regional envolve principalmente Fernandópolis, Votuporanga, São José do Rio Preto e cidades próximas.</p></article>
          <article class="overview-item"><span class="item-label">ALCANCE</span><h3>Participação aberta</h3><p>As atividades e os repositórios permanecem acessíveis pela internet para pessoas de qualquer lugar.</p></article>
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="sobre-principios">
        ${renderSectionHeading({ index: "04 / PRINCÍPIOS", title: "Limites claros para evoluir com confiança.", id: "sobre-principios" })}
        <ul class="principle-lines">
          <li><strong>Conhecimento aberto</strong><span>Materiais públicos, revisáveis e acessíveis.</span></li>
          <li><strong>Prática responsável</strong><span>Somente em ambientes próprios, controlados ou autorizados.</span></li>
          <li><strong>Colaboração</strong><span>Dúvidas, revisões e contribuições fazem parte do aprendizado.</span></li>
          <li><strong>Ética</strong><span>Respeito à lei, à privacidade e às outras pessoas.</span></li>
        </ul>
      </section>
      <section class="page-cta page-cta-editorial" aria-label="Explorar a K0Sec">
        <div><span class="editorial-index">PRÓXIMO PASSO</span><h2>Conheça os caminhos da comunidade.</h2></div>
        <div class="cta-group"><a class="button button-primary" href="/areas/">Explorar áreas</a><a class="button button-secondary" href="/comunidade/">Conhecer a comunidade</a></div>
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
      <section class="editorial-section" aria-labelledby="comunidade-comecar">
        ${renderSectionHeading({ index: "01 / ENTRADA", title: "Como entrar.", description: "Quatro passos para chegar, entender o espaço e encontrar seu caminho.", id: "comunidade-comecar" })}
        ${renderStepList([
          { title: "Entre no Discord", description: "Use o convite oficial da K0Sec." },
          { title: "Leia as regras", description: "Conheça o código de conduta e os limites da comunidade." },
          { title: "Escolha uma área", description: "Explore os temas ou comece pela trilha inicial." },
          { title: "Participe no seu ritmo", description: "Faça perguntas, compartilhe estudos e acompanhe projetos." }
        ])}
      </section>
      <section class="editorial-section" aria-labelledby="comunidade-participar">
        ${renderSectionHeading({ index: "02 / PARTICIPAÇÃO", title: "O que você pode fazer.", id: "comunidade-participar" })}
        <ul class="action-directory">
          <li><strong>Estudar</strong><span>Use trilhas, materiais e áreas para organizar o aprendizado.</span></li>
          <li><strong>Perguntar</strong><span>Compartilhe dúvidas sem precisar dominar o assunto.</span></li>
          <li><strong>Contribuir</strong><span>Revise documentação, sugira melhorias e participe dos repositórios.</span></li>
          <li><strong>Construir</strong><span>Participe de projetos e atividades quando houver uma proposta aberta.</span></li>
        </ul>
      </section>
      <section class="editorial-section" aria-labelledby="comunidade-onde">
        ${renderSectionHeading({ index: "03 / CANAIS", title: "Onde a comunidade acontece.", id: "comunidade-onde" })}
        <div class="channel-grid">
          <a href="${siteData.links.discord}"><span>CONVERSAS</span><strong>Discord</strong><p>Dúvidas, estudos, atividades e interação entre membros.</p><small>Abrir canal <span aria-hidden="true">→</span></small></a>
          <a href="${siteData.links.github}"><span>CONSTRUÇÃO</span><strong>GitHub</strong><p>Documentação, trilhas, laboratórios e projetos abertos.</p><small>Ver organização <span aria-hidden="true">→</span></small></a>
          <a href="${siteData.links.instagram}"><span>ATUALIZAÇÕES</span><strong>Instagram</strong><p>Comunicação pública e novidades da comunidade.</p><small>Acompanhar <span aria-hidden="true">→</span></small></a>
        </div>
      </section>
      ${renderCommunityCta()}`
  },
  {
    path: "/trilhas/",
    title: "Trilhas de Cibersegurança para Iniciantes | K0Sec",
    description: "Consulte a progressão de estudos da K0Sec para começar em tecnologia, redes, Linux, Git, cibersegurança e laboratórios autorizados.",
    eyebrow: "Trilhas",
    heading: "Um caminho possível para começar.",
    lead: "As trilhas abertas da K0Sec ajudam iniciantes a organizar fundamentos antes de escolher uma especialização.",
    content: `
      <section class="editorial-section" aria-labelledby="trilhas-progressao">
        ${renderSectionHeading({ index: "01 / PROGRESSÃO", title: "Uma base antes da especialização.", description: "A sequência organiza fundamentos, prática autorizada e escolha consciente de uma área.", id: "trilhas-progressao" })}
        ${renderStepList([
          { title: "Como começar", description: "Organize objetivos, rotina e ambiente de estudo." },
          { title: "Fundamentos de TI", description: "Construa a base para compreender sistemas e aplicações." },
          { title: "Redes", description: "Entenda como dispositivos e serviços se comunicam." },
          { title: "Linux", description: "Ganhe autonomia no sistema e no terminal." },
          { title: "Git e GitHub", description: "Registre evolução e colabore em projetos abertos." },
          { title: "Fundamentos de cibersegurança", description: "Conecte riscos, controles, ética e responsabilidade." },
          { title: "Laboratórios", description: "Pratique somente em ambientes próprios ou autorizados." },
          { title: "Escolha de especialização", description: "Explore as áreas e aprofunde o caminho mais relevante para você." }
        ], "learning-path")}
      </section>
      <section class="editorial-section" aria-labelledby="trilhas-uso">
        ${renderSectionHeading({ index: "02 / COMO USAR", title: "Avance no seu ritmo.", id: "trilhas-uso" })}
        <div class="split-copy">
          <p class="lead-copy">A sequência é uma orientação, não uma regra rígida.</p>
          <p>Registre dúvidas, retome fundamentos quando necessário e pratique somente em ambientes autorizados. Depois, use o mapa de áreas para escolher uma especialização.</p>
        </div>
        <div class="cta-group section-actions"><a class="button button-primary" href="${siteData.links.learningPathsRepository}">Abrir trilhas no GitHub</a><a class="button button-secondary" href="/areas/">Escolher uma área</a></div>
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
      <section class="editorial-section" aria-labelledby="guias-processo">
        ${renderSectionHeading({ index: "01 / PROCESSO", title: "Como funcionam os guias.", id: "guias-processo" })}
        <div class="overview-grid">
          <article class="overview-item"><span class="item-label">ESCRITA</span><h3>Conteúdo objetivo</h3><p>Guias devem resolver uma dúvida real com linguagem clara e referências verificáveis.</p></article>
          <article class="overview-item"><span class="item-label">REVISÃO</span><h3>Construção comunitária</h3><p>Correções e melhorias podem ser propostas publicamente antes da publicação.</p></article>
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="guias-explorar">
        ${renderSectionHeading({ index: "02 / EXPLORAR", title: "Conhecimento disponível agora.", id: "guias-explorar" })}
        <nav class="navigation-directory" aria-label="Outros caminhos de estudo">
          <a href="/areas/"><span>01</span><div><strong>Áreas da cibersegurança</strong><small>Conheça especializações e assuntos relacionados.</small></div><b aria-hidden="true">→</b></a>
          <a href="/trilhas/"><span>02</span><div><strong>Trilhas para iniciantes</strong><small>Organize fundamentos antes de escolher uma área.</small></div><b aria-hidden="true">→</b></a>
          <a href="/materiais/"><span>03</span><div><strong>Materiais públicos</strong><small>Acesse os repositórios de trilhas e laboratórios.</small></div><b aria-hidden="true">→</b></a>
        </nav>
      </section>
      <section class="editorial-section" aria-labelledby="guias-publicados">
        ${renderSectionHeading({ index: "03 / BIBLIOTECA", title: "Conteúdos publicados.", id: "guias-publicados" })}
        <div class="compact-empty-state">
          <span aria-hidden="true">00</span>
          <div><strong>A biblioteca ainda não possui guias publicados.</strong><p>Enquanto a revisão editorial é estruturada, use as áreas, trilhas e materiais públicos para continuar estudando.</p></div>
        </div>
      </section>
      <section class="page-cta page-cta-editorial" aria-label="Contribuir com os guias">
        <div><span class="editorial-index">CONTRIBUIÇÃO</span><h2>Pretende ajudar a construir um guia?</h2></div>
        <a class="button button-primary" href="/contribuir/">Ver como contribuir</a>
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
      <section class="editorial-section" aria-labelledby="projetos-repositorios">
        ${renderSectionHeading({ index: "01 / REPOSITÓRIOS", title: "Quatro frentes, um ecossistema.", id: "projetos-repositorios" })}
        <div class="repository-grid">
          <a href="${siteData.links.siteRepository}"><span>WEB / OFICIAL</span><strong>k0sec</strong><p>Arquitetura pública, interface, SEO e documentação do site oficial.</p><small>Abrir no GitHub <span aria-hidden="true">→</span></small></a>
          <a href="${siteData.links.communityRepository}"><span>COMUNIDADE / GOVERNANÇA</span><strong>community</strong><p>Participação, eventos e documentação comunitária.</p><small>Abrir no GitHub <span aria-hidden="true">→</span></small></a>
          <a href="${siteData.links.learningPathsRepository}"><span>EDUCAÇÃO / TRILHAS</span><strong>learning-paths</strong><p>Trilhas abertas de tecnologia e cibersegurança.</p><small>Abrir no GitHub <span aria-hidden="true">→</span></small></a>
          <a href="${siteData.links.labsRepository}"><span>PRÁTICA / LABORATÓRIOS</span><strong>labs</strong><p>Laboratórios educacionais seguros e autorizados.</p><small>Abrir no GitHub <span aria-hidden="true">→</span></small></a>
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="projetos-contribuir">
        ${renderSectionHeading({ index: "02 / PARTICIPAÇÃO", title: "Como contribuir.", id: "projetos-contribuir" })}
        <div class="split-copy"><p class="lead-copy">Issues e Pull Requests registram correções, sugestões e melhorias reais.</p><p>Consulte o guia de contribuição de cada repositório, escolha uma alteração pequena e abra a proposta para revisão da comunidade.</p></div>
        <div class="cta-group section-actions"><a class="button button-primary" href="/contribuir/">Ver formas de contribuir</a><a class="text-link" href="${siteData.links.github}">Abrir organização <span aria-hidden="true">→</span></a></div>
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
      <section class="editorial-section" aria-labelledby="contribuir-formas">
        ${renderSectionHeading({ index: "01 / FORMAS", title: "Onde sua contribuição pode ajudar.", id: "contribuir-formas" })}
        <ul class="contribution-grid">
          <li><span>01</span><strong>Documentação</strong><small>Clareza, ortografia e organização.</small></li>
          <li><span>02</span><strong>Código</strong><small>Correções e melhorias verificáveis.</small></li>
          <li><span>03</span><strong>Materiais</strong><small>Referências e caminhos de estudo.</small></li>
          <li><span>04</span><strong>Revisão</strong><small>Feedback técnico e editorial.</small></li>
          <li><span>05</span><strong>Acessibilidade</strong><small>Navegação e leitura para mais pessoas.</small></li>
          <li><span>06</span><strong>Laboratórios</strong><small>Práticas seguras e autorizadas.</small></li>
        </ul>
      </section>
      <section class="editorial-section" aria-labelledby="contribuir-fluxo">
        ${renderSectionHeading({ index: "02 / FLUXO", title: "Do primeiro ajuste à revisão.", id: "contribuir-fluxo" })}
        ${renderStepList([
          { title: "Escolha", description: "Encontre o repositório relacionado à contribuição." },
          { title: "Leia a documentação", description: "Consulte o guia de contribuição e o código de conduta." },
          { title: "Crie uma branch", description: "Parta de develop e mantenha um escopo claro." },
          { title: "Faça a alteração", description: "Documente e verifique o que foi modificado." },
          { title: "Abra uma Pull Request", description: "Envie a proposta para develop e aguarde a revisão." }
        ])}
      </section>
      <section class="editorial-section" aria-labelledby="contribuir-primeira">
        ${renderSectionHeading({ index: "03 / PRIMEIRA CONTRIBUIÇÃO", title: "Começar pequeno continua sendo começar.", id: "contribuir-primeira" })}
        <div class="split-copy"><p class="lead-copy">Iniciantes são bem-vindos.</p><p>Corrigir uma explicação, apontar um link quebrado ou melhorar a acessibilidade também são contribuições técnicas relevantes.</p></div>
        <div class="cta-group section-actions">
          <a class="button button-primary" href="${siteData.links.github}">Abrir GitHub</a>
          <a class="button button-secondary" href="${siteData.links.discord}">Conversar no Discord</a>
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

function renderPage({ path, title, description, eyebrow, heading, lead, content, breadcrumbs, heroMeta = [] }) {
  const breadcrumbItems = breadcrumbs || [
    { name: "K0Sec", path: "/" },
    { name: heading, path }
  ];
  const heroMetaMarkup = heroMeta.length
    ? `\n          <ul class="hero-meta" aria-label="Resumo da página">${heroMeta.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";

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
          <p>${escapeHtml(lead)}</p>${heroMetaMarkup}
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
  const mapNodes = siteData.areas.map((area) => `<a href="/areas/${area.slug}/"><span>${area.index} / ${area.code}</span><strong>${escapeHtml(area.title)}</strong></a>`).join("\n");
  const branches = siteData.areas.map((area) => `
    <article class="area-directory-item">
      <span class="knowledge-code">${area.index} / ${area.code}</span>
      <h3><a href="/areas/${area.slug}/">${escapeHtml(area.title)}</a></h3>
      <p>${escapeHtml(area.description)}</p>
      <div class="area-directory-meta"><span>${area.subareas.length} subáreas</span><span>${escapeHtml(area.semanticLabel)}</span></div>
      <a class="text-link" href="/areas/${area.slug}/">Explorar área <span aria-hidden="true">→</span></a>
    </article>`).join("\n");

  return renderPage({
    path,
    title: "Áreas da Cibersegurança: Red Team, Blue Team, OSINT e mais | K0Sec",
    description: "Explore o mapa de áreas da cibersegurança da K0Sec: Red Team, Blue Team, redes, Linux, AppSec, OSINT, CTF e programação.",
    eyebrow: "Mapa de estudos",
    heading: "Áreas da cibersegurança.",
    lead: "Explore relações entre áreas e subáreas, abra um caminho específico e encontre conexões com trilhas, materiais e projetos.",
    breadcrumbs,
    content: `
      <section class="area-overview-map" aria-labelledby="area-map-title">
        <header class="area-map-root">
          <img src="/assets/k0sec-symbol.webp" alt="" width="64" height="64" loading="lazy" decoding="async">
          <div><span>K0Sec // MAPA</span><h2 id="area-map-title">Cibersegurança</h2><p>Oito áreas conectadas por fundamentos e prática responsável.</p></div>
        </header>
        <nav class="area-map-nodes" aria-label="Navegar pelo mapa de áreas">${mapNodes}</nav>
      </section>
      <section class="editorial-section" aria-labelledby="areas-explorar">
        ${renderSectionHeading({ index: "02 / DIRETÓRIO", title: "Explorar por área.", description: "Escolha um caminho para ver contexto, subáreas, conexões e próximos passos.", id: "areas-explorar" })}
        <div class="area-directory-grid">${branches}</div>
      </section>
      <section class="page-cta page-cta-editorial" aria-label="Próximo passo">
        <div><span class="editorial-index">NÃO SABE POR ONDE COMEÇAR?</span><h2>Construa a base antes de escolher.</h2><p>Use a progressão recomendada para organizar fundamentos e avançar no seu ritmo.</p></div>
        <a class="button button-primary" href="/trilhas/">Ver trilhas para iniciantes</a>
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
    heroMeta: [area.semanticLabel, `${area.subareas.length} subáreas`],
    content: `
      <section class="editorial-section" aria-labelledby="visao-${area.slug}">
        ${renderSectionHeading({ index: "01 / VISÃO GERAL", title: `Entenda ${area.title}.`, id: `visao-${area.slug}` })}
        <div class="overview-grid">
          <article class="overview-item"><span class="item-label">O QUE É</span><h3>${escapeHtml(area.semanticLabel)}</h3><p>${escapeHtml(area.description)}</p></article>
          <article class="overview-item"><span class="item-label">OBJETIVO</span><h3>O que este caminho desenvolve</h3><p>${escapeHtml(area.objective)}</p></article>
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="subareas-${area.slug}">
        ${renderSectionHeading({ index: "02 / CAMINHOS", title: "Subáreas para explorar.", description: `Os assuntos que formam o mapa inicial de ${area.title}.`, id: `subareas-${area.slug}` })}
        <div class="path-grid">
          ${area.subareas.map((subarea, index) => `<a class="path-item" href="/areas/${area.slug}/${subarea.slug}/"><span>${String(index + 1).padStart(2, "0")}</span><div><h3>${escapeHtml(subarea.title)}</h3><p>${escapeHtml(subarea.summary)}</p><small>Explorar <b aria-hidden="true">→</b></small></div></a>`).join("\n")}
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="inicio-${area.slug}">
        ${renderSectionHeading({ index: "03 / ORIENTAÇÃO", title: "Por onde começar.", id: `inicio-${area.slug}` })}
        ${renderStepList([
          { title: "Revise fundamentos", description: "Use as trilhas para identificar a base necessária." },
          { title: `Entenda ${area.title}`, description: area.description },
          { title: "Escolha uma subárea", description: "Aprofunde um assunto de cada vez e registre dúvidas." },
          { title: "Pratique com autorização", description: "Utilize laboratórios controlados e documente o aprendizado." }
        ], "orientation-path")}
      </section>
      <section class="editorial-section" aria-labelledby="relacoes-${area.slug}">
        ${renderSectionHeading({ index: "04 / CONEXÕES", title: "Áreas relacionadas.", description: "Outros caminhos que compartilham fundamentos e práticas com esta área.", id: `relacoes-${area.slug}` })}
        <div class="related-area-grid">
          ${relatedAreas.map((relatedArea) => `<a href="/areas/${relatedArea.slug}/"><span>${relatedArea.index} / ${relatedArea.code}</span><h3>${escapeHtml(relatedArea.title)}</h3><p>${escapeHtml(relatedArea.description)}</p><small>Explorar <b aria-hidden="true">→</b></small></a>`).join("\n")}
        </div>
      </section>
      <section class="continue-section" aria-labelledby="continuar-${area.slug}">
        ${renderSectionHeading({ index: "05 / PRÓXIMO PASSO", title: "Continue estudando.", id: `continuar-${area.slug}` })}
        <nav class="navigation-directory" aria-label="Recursos para continuar estudando">
          <a href="/trilhas/"><span>01</span><div><strong>Trilhas</strong><small>Organize os fundamentos e a progressão de estudo.</small></div><b aria-hidden="true">→</b></a>
          <a href="/materiais/"><span>02</span><div><strong>Materiais</strong><small>Acesse trilhas, documentação e laboratórios públicos.</small></div><b aria-hidden="true">→</b></a>
          <a href="${siteData.links.labsRepository}"><span>03</span><div><strong>Laboratórios</strong><small>Consulte práticas educacionais seguras e autorizadas.</small></div><b aria-hidden="true">→</b></a>
        </nav>
      </section>
      ${renderCommunityCta()}`
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
    lead: subarea.summary,
    breadcrumbs,
    heroMeta: [`${area.index} / ${area.code}`, area.semanticLabel],
    content: `
      <section class="editorial-section" aria-labelledby="encontrar-${subarea.slug}">
        ${renderSectionHeading({ index: "01 / CONTEXTO", title: "O que você encontra aqui.", id: `encontrar-${subarea.slug}` })}
        <div class="concept-grid">
          <article><span>TEMA</span><h3>${escapeHtml(subarea.title)}</h3><p>${escapeHtml(subarea.summary)}</p></article>
          <article><span>ÁREA</span><h3>${escapeHtml(area.title)}</h3><p>${escapeHtml(area.description)}</p></article>
          <article><span>PRÁTICA</span><h3>Estudo responsável</h3><p>Conceitos e atividades devem ser aplicados somente em ambientes próprios, controlados ou explicitamente autorizados.</p></article>
        </div>
      </section>
      <section class="editorial-section" aria-labelledby="conexao-${subarea.slug}">
        ${renderSectionHeading({ index: "02 / CONEXÃO", title: `Como isso se conecta a ${area.title}.`, id: `conexao-${subarea.slug}` })}
        <div class="split-copy"><p class="lead-copy">${escapeHtml(subarea.title)} faz parte do caminho de ${escapeHtml(area.semanticLabel.toLowerCase())}.</p><p>${escapeHtml(area.objective)}</p></div>
        <a class="text-link section-link" href="/areas/${area.slug}/">Ver visão completa de ${escapeHtml(area.title)} <span aria-hidden="true">→</span></a>
      </section>
      <section class="editorial-section" aria-labelledby="relacionados-${subarea.slug}">
        ${renderSectionHeading({ index: "03 / ASSUNTOS", title: "Assuntos relacionados.", description: `Outras subáreas que compõem ${area.title}.`, id: `relacionados-${subarea.slug}` })}
        <nav class="related-topic-list" aria-label="Outras subáreas de ${escapeHtml(area.title)}">
          ${siblingSubareas.map((candidate, index) => `<a href="/areas/${area.slug}/${candidate.slug}/"><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${escapeHtml(candidate.title)}</strong><small>${escapeHtml(candidate.summary)}</small></div><b aria-hidden="true">→</b></a>`).join("\n")}
        </nav>
      </section>
      <section class="continue-section" aria-labelledby="continuar-${subarea.slug}">
        ${renderSectionHeading({ index: "04 / PRÓXIMO PASSO", title: "Continue estudando.", id: `continuar-${subarea.slug}` })}
        <div class="cta-group section-actions">
          <a class="button button-primary" href="/materiais/">Ver materiais</a>
          <a class="button button-secondary" href="/trilhas/">Ver trilhas</a>
          <a class="text-link" href="/areas/${area.slug}/">Voltar para ${escapeHtml(area.title)} <span aria-hidden="true">→</span></a>
        </div>
      </section>
      ${renderCommunityCta()}`
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
