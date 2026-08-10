const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");

const rootDir = join(__dirname, "..");

function loadStudyAreas() {
  const context = { window: {} };
  const source = readFileSync(join(rootDir, "study-areas-data.js"), "utf8");

  vm.createContext(context);
  vm.runInContext(source, context);

  return JSON.parse(JSON.stringify(context.window.K0SEC_STUDY_AREAS));
}

test("study areas data exposes the eight approved areas", () => {
  const areas = loadStudyAreas();

  assert.equal(areas.length, 8);
  assert.deepEqual(
    areas.map((area) => area.title),
    [
      "Red Team",
      "Blue Team",
      "Segurança de Redes",
      "Linux",
      "AppSec",
      "OSINT",
      "CTF",
      "Programação"
    ]
  );
});

test("study areas include visual codes and subareas", () => {
  const areas = loadStudyAreas();
  const expectedCodes = ["01 RT", "02 BT", "03 NW", "04 LX", "05 AS", "06 OI", "07 CT", "08 PG"];

  assert.deepEqual(areas.map((area) => `${area.index} ${area.code}`), expectedCodes);
  areas.forEach((area) => {
    assert.ok(area.description.length > 24);
    assert.ok(area.subareas.length >= 4);
  });
});

test("study areas keep the approved subarea wording", () => {
  const areas = loadStudyAreas();
  const redTeam = areas.find((area) => area.id === "red-team");
  const programming = areas.find((area) => area.id === "programacao");

  assert.ok(redTeam.subareas.includes("Ambientes autorizados"));
  assert.ok(programming.subareas.includes("Projetos de segurança digital"));
});

test("areas section uses the graph shell instead of the old card grid", () => {
  const html = readFileSync(join(rootDir, "index.html"), "utf8");

  assert.match(html, /id="areas"/);
  assert.match(html, /data-study-graph/);
  assert.doesNotMatch(html, /<div class="area-grid">/);
});

test("graph script supports selection and keyboard state attributes", () => {
  const script = readFileSync(join(rootDir, "scripts.js"), "utf8");

  assert.match(script, /selectStudyArea/);
  assert.match(script, /aria-pressed/);
  assert.match(script, /aria-expanded/);
});

test("graph script supports draggable SVG nodes", () => {
  const script = readFileSync(join(rootDir, "scripts.js"), "utf8");

  assert.match(script, /data-study-graph-canvas/);
  assert.match(script, /pointerdown/);
  assert.match(script, /pointermove/);
  assert.match(script, /tickStudyGraph/);
});

test("graph renders icon nodes without visible labels", () => {
  const script = readFileSync(join(rootDir, "scripts.js"), "utf8");

  assert.match(script, /STUDY_GRAPH_ICONS/);
  assert.match(script, /study-node-icon/);
  assert.doesNotMatch(script, /appendSvgText/);
});
