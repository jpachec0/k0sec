(function exposeSiteData(globalScope, factory) {
  const siteData = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = siteData;
  }

  if (globalScope) {
    globalScope.K0SEC_SITE_DATA = siteData;
  }
}(typeof window !== "undefined" ? window : null, function createSiteData() {
  const links = {
    site: "https://k0sec.org",
    discord: "https://discord.gg/JSszTDPS7u",
    instagram: "https://www.instagram.com/k0.sec",
    github: "https://github.com/k0sec-br",
    siteRepository: "https://github.com/k0sec-br/k0sec",
    communityRepository: "https://github.com/k0sec-br/community",
    learningPathsRepository: "https://github.com/k0sec-br/learning-paths",
    labsRepository: "https://github.com/k0sec-br/labs"
  };

  const areas = [
    {
      id: "red-team",
      slug: "red-team",
      index: "01",
      code: "RT",
      title: "Red Team",
      description: "Estudo de técnicas ofensivas, testes de segurança e identificação de vulnerabilidades em ambientes autorizados.",
      relatedAreas: ["appsec", "blue-team", "seguranca-de-redes"],
      subareas: [
        { slug: "tecnicas-ofensivas", title: "Técnicas ofensivas" },
        { slug: "testes-de-seguranca", title: "Testes de segurança" },
        { slug: "identificacao-de-vulnerabilidades", title: "Identificação de vulnerabilidades" },
        { slug: "ambientes-autorizados", title: "Ambientes autorizados" }
      ]
    },
    {
      id: "blue-team",
      slug: "blue-team",
      index: "02",
      code: "BT",
      title: "Blue Team",
      description: "Defesa, monitoramento, resposta a incidentes e fortalecimento de sistemas contra ameaças reais.",
      relatedAreas: ["seguranca-de-redes", "linux", "red-team"],
      subareas: [
        { slug: "defesa", title: "Defesa" },
        { slug: "monitoramento", title: "Monitoramento" },
        { slug: "resposta-a-incidentes", title: "Resposta a incidentes" },
        { slug: "fortalecimento-de-sistemas", title: "Fortalecimento de sistemas" },
        { slug: "ameacas-reais", title: "Ameaças reais" }
      ]
    },
    {
      id: "seguranca-de-redes",
      slug: "seguranca-de-redes",
      index: "03",
      code: "NW",
      title: "Segurança de Redes",
      description: "Fundamentos de redes, análise de tráfego, segmentação e práticas para proteger infraestruturas.",
      relatedAreas: ["blue-team", "linux", "red-team"],
      subareas: [
        { slug: "fundamentos-de-redes", title: "Fundamentos de redes" },
        { slug: "analise-de-trafego", title: "Análise de tráfego" },
        { slug: "segmentacao", title: "Segmentação" },
        { slug: "protecao-de-infraestruturas", title: "Proteção de infraestruturas" }
      ]
    },
    {
      id: "linux",
      slug: "linux",
      index: "04",
      code: "LX",
      title: "Linux",
      description: "Uso do sistema, terminal, permissões, automação e base operacional para laboratórios de segurança.",
      relatedAreas: ["seguranca-de-redes", "programacao", "blue-team"],
      subareas: [
        { slug: "uso-do-sistema", title: "Uso do sistema" },
        { slug: "terminal", title: "Terminal" },
        { slug: "permissoes", title: "Permissões" },
        { slug: "automacao", title: "Automação" },
        { slug: "laboratorios-de-seguranca", title: "Laboratórios de segurança" }
      ]
    },
    {
      id: "appsec",
      slug: "appsec",
      index: "05",
      code: "AS",
      title: "AppSec",
      description: "Segurança em aplicações, revisão de código, boas práticas e vulnerabilidades comuns em software.",
      relatedAreas: ["programacao", "red-team", "blue-team"],
      subareas: [
        { slug: "seguranca-em-aplicacoes", title: "Segurança em aplicações" },
        { slug: "revisao-de-codigo", title: "Revisão de código" },
        { slug: "boas-praticas", title: "Boas práticas" },
        { slug: "vulnerabilidades-comuns-em-software", title: "Vulnerabilidades comuns em software" }
      ]
    },
    {
      id: "osint",
      slug: "osint",
      index: "06",
      code: "OI",
      title: "OSINT",
      description: "Coleta e análise de informações públicas com metodologia, contexto e responsabilidade.",
      relatedAreas: ["red-team", "blue-team", "programacao"],
      subareas: [
        { slug: "coleta-de-informacoes-publicas", title: "Coleta de informações públicas" },
        { slug: "analise-de-informacoes", title: "Análise de informações" },
        { slug: "metodologia", title: "Metodologia" },
        { slug: "contexto", title: "Contexto" },
        { slug: "responsabilidade", title: "Responsabilidade" }
      ]
    },
    {
      id: "ctf",
      slug: "ctf",
      index: "07",
      code: "CT",
      title: "CTF",
      description: "Desafios práticos para desenvolver raciocínio, pesquisa, exploração e documentação técnica.",
      relatedAreas: ["red-team", "linux", "programacao"],
      subareas: [
        { slug: "desafios-praticos", title: "Desafios práticos" },
        { slug: "raciocinio", title: "Raciocínio" },
        { slug: "pesquisa", title: "Pesquisa" },
        { slug: "exploracao", title: "Exploração" },
        { slug: "documentacao-tecnica", title: "Documentação técnica" }
      ]
    },
    {
      id: "programacao",
      slug: "programacao",
      index: "08",
      code: "PG",
      title: "Programação",
      description: "Scripts, automação, lógica, ferramentas e projetos úteis para quem estuda segurança digital.",
      relatedAreas: ["appsec", "linux", "ctf"],
      subareas: [
        { slug: "scripts", title: "Scripts" },
        { slug: "automacao", title: "Automação" },
        { slug: "logica", title: "Lógica" },
        { slug: "ferramentas", title: "Ferramentas" },
        { slug: "projetos-de-seguranca-digital", title: "Projetos de segurança digital" }
      ]
    }
  ];

  const authors = [
    { name: "JPachec0", url: "https://github.com/JPachec0" },
    { name: "nehalem-x", url: "https://github.com/nehalem-x" },
    { name: "jmarqu3s", url: "https://github.com/jmarqu3s" },
    { name: "augusto404", url: "https://github.com/augusto404" }
  ];

  return {
    name: "K0Sec",
    slogan: "Learn. Explore. Defend.",
    locale: "pt-BR",
    links,
    authors,
    areas
  };
}));
