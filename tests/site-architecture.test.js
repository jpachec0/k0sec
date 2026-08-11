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
    assert.ok(area.subareas.length >= 4);
    area.subareas.forEach((subarea) => {
      assert.match(subarea.slug, /^[a-z0-9-]+$/);
      assert.ok(subarea.title.length > 2);
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
});

test("cada área e subárea possui uma rota estática indexável", () => {
  siteData.areas.forEach((area) => {
    const areaPath = `/areas/${area.slug}/`;
    const areaHtml = readFileSync(routeFile(areaPath), "utf8");

    assert.match(areaHtml, new RegExp(`<h1>${area.title}</h1>`));
    assert.match(areaHtml, new RegExp(`rel="canonical" href="https://k0sec\\.org${areaPath}"`));
    assert.match(areaHtml, /"@type":"BreadcrumbList"/);

    area.subareas.forEach((subarea) => {
      const subareaPath = `${areaPath}${subarea.slug}/`;

      assert.ok(existsSync(routeFile(subareaPath)), `${subareaPath} deveria existir`);
      assert.match(readFileSync(routeFile(subareaPath), "utf8"), new RegExp(`<h1>${subarea.title}</h1>`));
    });
  });
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
