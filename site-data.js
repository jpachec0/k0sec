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
      semanticLabel: "Segurança ofensiva",
      description: "Estudo de técnicas ofensivas, testes de segurança e identificação de vulnerabilidades em ambientes autorizados.",
      objective: "Compreender como avaliações ofensivas ajudam a identificar fragilidades e apoiar melhorias de segurança dentro de um escopo autorizado.",
      relatedAreas: ["appsec", "blue-team", "seguranca-de-redes"],
      subareas: [
        { slug: "tecnicas-ofensivas", title: "Técnicas ofensivas", summary: "Abordagens ofensivas estudadas com escopo definido e finalidade educacional." },
        { slug: "testes-de-seguranca", title: "Testes de segurança", summary: "Verificação planejada de controles e comportamentos em sistemas autorizados." },
        { slug: "identificacao-de-vulnerabilidades", title: "Identificação de vulnerabilidades", summary: "Reconhecimento e documentação responsável de fragilidades de segurança." },
        { slug: "ambientes-autorizados", title: "Ambientes autorizados", summary: "Limites técnicos, éticos e legais necessários antes de qualquer prática." }
      ]
    },
    {
      id: "blue-team",
      slug: "blue-team",
      index: "02",
      code: "BT",
      title: "Blue Team",
      semanticLabel: "Segurança defensiva",
      description: "Defesa, monitoramento, resposta a incidentes e fortalecimento de sistemas contra ameaças reais.",
      objective: "Desenvolver uma visão defensiva para observar ambientes, responder a eventos e fortalecer sistemas com base em evidências.",
      relatedAreas: ["seguranca-de-redes", "linux", "red-team"],
      subareas: [
        { slug: "defesa", title: "Defesa", summary: "Princípios e controles voltados à proteção de sistemas e informações." },
        { slug: "monitoramento", title: "Monitoramento", summary: "Observação contínua de eventos para reconhecer comportamentos relevantes." },
        { slug: "resposta-a-incidentes", title: "Resposta a incidentes", summary: "Organização das ações de análise, contenção e recuperação após um incidente." },
        { slug: "fortalecimento-de-sistemas", title: "Fortalecimento de sistemas", summary: "Redução de exposição por meio de configurações e controles defensivos." },
        { slug: "ameacas-reais", title: "Ameaças reais", summary: "Estudo contextual de riscos e comportamentos observados em segurança digital." }
      ]
    },
    {
      id: "seguranca-de-redes",
      slug: "seguranca-de-redes",
      index: "03",
      code: "NW",
      title: "Segurança de Redes",
      semanticLabel: "Redes e infraestrutura",
      description: "Fundamentos de redes, análise de tráfego, segmentação e práticas para proteger infraestruturas.",
      objective: "Entender como sistemas se comunicam e aplicar princípios de observação, separação e proteção em infraestruturas de rede.",
      relatedAreas: ["blue-team", "linux", "red-team"],
      subareas: [
        { slug: "fundamentos-de-redes", title: "Fundamentos de redes", summary: "Conceitos que explicam comunicação, endereçamento e funcionamento de redes." },
        { slug: "analise-de-trafego", title: "Análise de tráfego", summary: "Leitura de comunicações de rede para entender fluxos e comportamentos." },
        { slug: "segmentacao", title: "Segmentação", summary: "Separação lógica de ambientes para organizar acesso e reduzir exposição." },
        { slug: "protecao-de-infraestruturas", title: "Proteção de infraestruturas", summary: "Práticas defensivas aplicadas aos componentes e serviços de rede." }
      ]
    },
    {
      id: "linux",
      slug: "linux",
      index: "04",
      code: "LX",
      title: "Linux",
      semanticLabel: "Sistemas operacionais",
      description: "Uso do sistema, terminal, permissões, automação e base operacional para laboratórios de segurança.",
      objective: "Construir autonomia no uso do Linux para administrar ambientes, compreender permissões e apoiar estudos práticos de segurança.",
      relatedAreas: ["seguranca-de-redes", "programacao", "blue-team"],
      subareas: [
        { slug: "uso-do-sistema", title: "Uso do sistema", summary: "Organização, navegação e operação cotidiana de um ambiente Linux." },
        { slug: "terminal", title: "Terminal", summary: "Interação com o sistema por comandos e ferramentas de linha de comando." },
        { slug: "permissoes", title: "Permissões", summary: "Controle de acesso a arquivos, diretórios, processos e recursos do sistema." },
        { slug: "automacao", title: "Automação", summary: "Uso de comandos e scripts para tornar tarefas repetíveis e verificáveis." },
        { slug: "laboratorios-de-seguranca", title: "Laboratórios de segurança", summary: "Preparação e uso responsável de ambientes controlados para prática." }
      ]
    },
    {
      id: "appsec",
      slug: "appsec",
      index: "05",
      code: "AS",
      title: "AppSec",
      semanticLabel: "Segurança de aplicações",
      description: "Segurança em aplicações, revisão de código, boas práticas e vulnerabilidades comuns em software.",
      objective: "Integrar segurança ao desenvolvimento e à revisão de software, reduzindo falhas por meio de práticas técnicas responsáveis.",
      relatedAreas: ["programacao", "red-team", "blue-team"],
      subareas: [
        { slug: "seguranca-em-aplicacoes", title: "Segurança em aplicações", summary: "Princípios de proteção considerados durante o ciclo de desenvolvimento." },
        { slug: "revisao-de-codigo", title: "Revisão de código", summary: "Leitura estruturada de implementações para reconhecer riscos e melhorias." },
        { slug: "boas-praticas", title: "Boas práticas", summary: "Decisões de desenvolvimento que reduzem exposição e facilitam manutenção." },
        { slug: "vulnerabilidades-comuns-em-software", title: "Vulnerabilidades comuns em software", summary: "Classes recorrentes de falhas usadas para orientar prevenção e revisão." }
      ]
    },
    {
      id: "osint",
      slug: "osint",
      index: "06",
      code: "OI",
      title: "OSINT",
      semanticLabel: "Informações públicas",
      description: "Coleta e análise de informações públicas com metodologia, contexto e responsabilidade.",
      objective: "Organizar a pesquisa de fontes públicas de forma verificável, contextualizada e respeitosa à privacidade.",
      relatedAreas: ["red-team", "blue-team", "programacao"],
      subareas: [
        { slug: "coleta-de-informacoes-publicas", title: "Coleta de informações públicas", summary: "Busca organizada de dados disponíveis publicamente e dentro de limites legais." },
        { slug: "analise-de-informacoes", title: "Análise de informações", summary: "Comparação de fontes e evidências antes de formar conclusões." },
        { slug: "metodologia", title: "Metodologia", summary: "Processo reproduzível para registrar fontes, etapas e critérios de pesquisa." },
        { slug: "contexto", title: "Contexto", summary: "Interpretação de informações considerando origem, tempo e confiabilidade." },
        { slug: "responsabilidade", title: "Responsabilidade", summary: "Cuidados com privacidade, exposição de dados e impacto da investigação." }
      ]
    },
    {
      id: "ctf",
      slug: "ctf",
      index: "07",
      code: "CT",
      title: "CTF",
      semanticLabel: "Desafios educacionais",
      description: "Desafios práticos para desenvolver raciocínio, pesquisa, exploração e documentação técnica.",
      objective: "Aplicar fundamentos em desafios deliberadamente preparados para aprendizagem, registrando raciocínio e resultados.",
      relatedAreas: ["red-team", "linux", "programacao"],
      subareas: [
        { slug: "desafios-praticos", title: "Desafios práticos", summary: "Problemas educacionais preparados para aplicar conceitos em ambiente controlado." },
        { slug: "raciocinio", title: "Raciocínio", summary: "Decomposição de problemas, formulação de hipóteses e validação de caminhos." },
        { slug: "pesquisa", title: "Pesquisa", summary: "Consulta responsável a documentação e fontes para avançar em um desafio." },
        { slug: "exploracao", title: "Exploração", summary: "Interação metódica com ambientes deliberadamente preparados para estudo." },
        { slug: "documentacao-tecnica", title: "Documentação técnica", summary: "Registro claro das etapas, evidências, decisões e aprendizados de uma solução." }
      ]
    },
    {
      id: "programacao",
      slug: "programacao",
      index: "08",
      code: "PG",
      title: "Programação",
      semanticLabel: "Código e automação",
      description: "Scripts, automação, lógica, ferramentas e projetos úteis para quem estuda segurança digital.",
      objective: "Usar lógica e código para compreender sistemas, automatizar tarefas e construir ferramentas e projetos de segurança digital.",
      relatedAreas: ["appsec", "linux", "ctf"],
      subareas: [
        { slug: "scripts", title: "Scripts", summary: "Programas curtos para organizar tarefas e experimentar conceitos técnicos." },
        { slug: "automacao", title: "Automação", summary: "Transformação de processos repetitivos em fluxos consistentes e verificáveis." },
        { slug: "logica", title: "Lógica", summary: "Estruturação de problemas, condições, repetições e manipulação de dados." },
        { slug: "ferramentas", title: "Ferramentas", summary: "Construção e compreensão de utilitários que apoiam estudos de segurança." },
        { slug: "projetos-de-seguranca-digital", title: "Projetos de segurança digital", summary: "Aplicação integrada de programação em iniciativas educacionais e colaborativas." }
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
