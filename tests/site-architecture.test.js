const { existsSync, readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const siteData = require("../site-data.js");

const ROOT_DIRECTORY = join(__dirname, "..");

function read(relativePath) {
  return readFileSync(join(ROOT_DIRECTORY, relativePath), "utf8");
}

function routeFile(route) {
  return join(ROOT_DIRECTORY, route.replace(/^\//, ""), "index.html");
}

test("a fonte central contém as oito áreas aprovadas e suas subáreas", () => {
  assert.equal(siteData.areas.length, 8);
  assert.deepEqual(
    siteData.areas.map((area) => area.title),
    ["Red Team", "Blue Team", "Segurança de Redes", "Linux", "AppSec", "OSINT", "CTF", "Programação"]
  );

  siteData.areas.forEach((area) => {
    assert.match(area.slug, /^[a-z0-9-]+$/);
    assert.ok(area.description.length > 40);
    assert.ok(area.objective.length > 60);
    assert.ok(area.semanticLabel.length > 4);
    assert.ok(area.subareas.length >= 4);
    area.subareas.forEach((subarea) => {
      assert.match(subarea.slug, /^[a-z0-9-]+$/);
      assert.ok(subarea.title.length > 2);
      assert.ok(subarea.summary.length > 40);
    });
  });
});

test("a home usa o grafo progressivo e remove a composição redundante", () => {
  const html = read("index.html");

  assert.match(html, /data-home-study-map/);
  assert.match(html, /href="\/areas\/"/);
  assert.doesNotMatch(html, /K0Sec \/\/ MAPA DE ESTUDOS/i);
  assert.doesNotMatch(html, /Cibersegurança em camadas/i);
  assert.doesNotMatch(html, /meta name="keywords"/i);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  siteData.areas.forEach((area) => {
    assert.match(html, new RegExp(`href="/areas/${area.slug}/"`));
  });
});

test("o componente da home renderiza apenas áreas até que uma seja selecionada", () => {
  const script = read("home-study-graph.js");

  assert.match(script, /renderDesktopGraph/);
  assert.match(script, /renderSelectedSubareas/);
  assert.match(script, /selectedAreaSlug === areaSlug \? "" : areaSlug/);
  assert.match(script, /aria-pressed/);
  assert.match(script, /aria-expanded/);
  assert.match(script, /mobile-area-toggle/);
  assert.match(script, /home-study-selection-id/);
  assert.match(script, /button button-primary/);
  assert.match(script, /Explorar todas as áreas/);
});

test("o painel da área selecionada possui hierarquia própria e CTA alternativo", () => {
  const html = read("index.html");

  assert.match(html, /data-home-study-selection/);
  assert.match(html, /data-home-all-areas/);
  assert.match(read("styles.css"), /\.home-study-selection-copy/);
  assert.match(read("styles.css"), /margin-top: clamp\(3rem, 5vw, 5rem\)/);
});

test("cada área e subárea possui uma rota estática indexável", () => {
  siteData.areas.forEach((area) => {
    const areaPath = `/areas/${area.slug}/`;
    const areaHtml = readFileSync(routeFile(areaPath), "utf8");

    assert.match(areaHtml, new RegExp(`<h1>${area.title}</h1>`));
    assert.match(areaHtml, new RegExp(`rel="canonical" href="https://k0sec\\.org${areaPath}"`));
    assert.match(areaHtml, /"@type":"BreadcrumbList"/);
    assert.match(areaHtml, /class="overview-grid"/);
    assert.equal((areaHtml.match(/class="path-item"/g) || []).length, area.subareas.length);
    assert.match(areaHtml, /Por onde começar/);
    assert.match(areaHtml, /Continue estudando/);
    assert.match(areaHtml, /Estude junto com a comunidade/);

    area.subareas.forEach((subarea) => {
      const subareaPath = `${areaPath}${subarea.slug}/`;
      const subareaHtml = readFileSync(routeFile(subareaPath), "utf8");

      assert.ok(existsSync(routeFile(subareaPath)), `${subareaPath} deveria existir`);
      assert.match(subareaHtml, new RegExp(`<h1>${subarea.title}</h1>`));
      assert.match(subareaHtml, /O que você encontra aqui/);
      assert.match(subareaHtml, /Assuntos relacionados/);
      assert.doesNotMatch(subareaHtml, /será ampliada|página em construção|em breve/i);
    });
  });
});

test("as páginas editoriais oferecem contexto e um próximo passo verificável", () => {
  assert.match(read("areas/index.html"), /Explorar por área/);
  assert.equal((read("areas/index.html").match(/class="area-directory-item"/g) || []).length, 8);
  assert.match(read("sobre/index.html"), /Regional por origem\. Online por escolha/);
  assert.match(read("comunidade/index.html"), /Onde a comunidade acontece/);
  assert.equal((read("trilhas/index.html").match(/<li>/g) || []).length >= 8, true);
  assert.match(read("guias/index.html"), /class="compact-empty-state"/);
  assert.equal((read("projetos/index.html").match(/Abrir no GitHub/g) || []).length, 4);
  assert.match(read("contribuir/index.html"), /Primeira contribuição/i);
});

test("as páginas institucionais possuem title, description e canonical próprios", () => {
  const routes = ["sobre", "comunidade", "areas", "trilhas", "guias", "materiais", "projetos", "eventos", "contribuir", "autores"];
  const titles = new Set();

  routes.forEach((route) => {
    const html = read(`${route}/index.html`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];

    assert.ok(title, `/${route}/ deveria possuir title`);
    assert.ok(!titles.has(title), `title duplicado: ${title}`);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.match(html, new RegExp(`rel="canonical" href="https://k0sec\\.org/${route}/"`));
    titles.add(title);
  });
});

test("o sitemap contém somente URLs canônicas públicas geradas", () => {
  const sitemap = read("sitemap.xml");
  const expectedPaths = ["/", "/sobre/", "/comunidade/", "/areas/", "/trilhas/", "/guias/", "/materiais/", "/projetos/", "/eventos/", "/contribuir/", "/autores/"];

  siteData.areas.forEach((area) => {
    expectedPaths.push(`/areas/${area.slug}/`);
    area.subareas.forEach((subarea) => expectedPaths.push(`/areas/${area.slug}/${subarea.slug}/`));
  });

  expectedPaths.forEach((path) => assert.match(sitemap, new RegExp(`<loc>https://k0sec\\.org${path}</loc>`)));
  assert.doesNotMatch(sitemap, /pages\.dev|404\.html/);
});

test("todas as URLs indexáveis possuem metadados únicos e JSON-LD válido", () => {
  const sitemap = read("sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const titles = new Set();

  assert.equal(urls.length, 56);

  urls.forEach((url) => {
    const pathname = new URL(url).pathname;
    const html = pathname === "/" ? read("index.html") : readFileSync(routeFile(pathname), "utf8");
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];

    assert.ok(title, `${pathname} deveria possuir title`);
    assert.ok(!titles.has(title), `title duplicado: ${title}`);
    assert.equal((html.match(/<meta\s+name="description"/g) || []).length, 1);
    assert.equal((html.match(/<link rel="canonical"/g) || []).length, 1);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, new RegExp(`rel="canonical" href="${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(html, new RegExp(`property="og:url" content="${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));

    [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .forEach((match) => assert.doesNotThrow(() => JSON.parse(match[1])));
    titles.add(title);
  });
});

test("robots e 404 possuem diretivas consistentes", () => {
  assert.match(read("robots.txt"), /Sitemap: https:\/\/k0sec\.org\/sitemap\.xml/);
  assert.equal((read("404.html").match(/<meta name="robots"/g) || []).length, 1);
  assert.match(read("404.html"), /content="noindex, follow"/);
});
