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

const SUBTITLE_CONFIG = {
  maxLength: 64,
  maxTotalDesktop: 5,
  maxTotalMobile: 2,
  maxTotalReduced: 1,
  reducedIntensityCap: 0.5,
  punctuationDelayMultiplier: 1.85,
  spaceDelayMultiplier: 0.48,
  cleanupPadding: 500,
  typeDelay: {
    desktop: 52,
    mobile: 76,
    reduced: 82
  },
  holdDelay: {
    desktop: 1050,
    mobile: 940,
    reduced: 1350
  },
  dissolveDelay: {
    desktop: 1480,
    mobile: 1280,
    reduced: 1800
  },
  ambient: {
    firstDelay: 900,
    secondDelayDesktop: 2300,
    secondDelayMobile: 4300,
    cadenceDesktop: 1500,
    cadenceMobile: 3600,
    cadenceReduced: 6200,
    primaryIntensity: 0.88,
    secondaryIntensity: 0.62,
    reducedIntensity: 0.38
  },
  drift: {
    durationMin: 7.2,
    durationMax: 10.2,
    normal: { x: 28, y: 18, rx: 3.4, ry: 5.5, rz: 2, zMin: 22, zMax: 72 },
    reduced: { x: 8, y: 6, rx: 0.8, ry: 1.2, rz: 0.5, zMin: 8, zMax: 18 }
  }
};

const SUBTITLE_PHRASES = [
  "tcp handshake observed",
  "dns trail under review",
  "packet capture running",
  "authorized lab scope",
  "blue team signal online",
  "red team path contained",
  "firewall rule pending",
  "siem alert normalized",
  "linux shell hardened",
  "osint source verified",
  "ctf challenge queued",
  "vulnerability notes open",
  "web app surface mapped",
  "network segment isolated",
  "incident timeline drafted",
  "hash verified locally",
  "least privilege enforced",
  "ethical testing only"
];

const SUBTITLE_SLOTS = [
  { x: 10, y: 16, z: -240, rx: 8, ry: -22, rz: -3, size: 0.82 },
  { x: 18, y: 9, z: -360, rx: 4, ry: -14, rz: -1, size: 0.52 },
  { x: 35, y: 23, z: -310, rx: 6, ry: -11, rz: 1, size: 0.66 },
  { x: 49, y: 12, z: -430, rx: -2, ry: 6, rz: 0, size: 0.48 },
  { x: 72, y: 16, z: -300, rx: -6, ry: 18, rz: 2, size: 0.72 },
  { x: 91, y: 24, z: -260, rx: -5, ry: 24, rz: 3, size: 0.86 },
  { x: 8, y: 35, z: -320, rx: 5, ry: -26, rz: -2, size: 0.58 },
  { x: 17, y: 51, z: -280, rx: 4, ry: -18, rz: -1, size: 0.7 },
  { x: 57, y: 41, z: -380, rx: 5, ry: -8, rz: 0, size: 0.58 },
  { x: 87, y: 52, z: -285, rx: -8, ry: 16, rz: 1, size: 0.74 },
  { x: 16, y: 74, z: -250, rx: 7, ry: 15, rz: 1, size: 0.88 },
  { x: 42, y: 82, z: -340, rx: -3, ry: -8, rz: -2, size: 0.62 },
  { x: 82, y: 79, z: -240, rx: -8, ry: -16, rz: -2, size: 0.9 },
  { x: 58, y: 64, z: -410, rx: 3, ry: 9, rz: 1, size: 0.52 }
];

const subtitleState = {
  compactViewport: window.matchMedia("(max-width: 700px)").matches,
  motionIsReduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  lastPhrase: "",
  lastSlot: null,
  ambientTimer: null,
  initialTimers: new Set(),
  subtitleTimers: new Map()
};

document.documentElement.classList.add("has-js");

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const linkedElements = document.querySelectorAll("[data-link]");
const revealElements = document.querySelectorAll(".reveal");
const subtitleField = document.querySelector(".ambient-subtitle-field");
const studyGraphRoot = document.querySelector("[data-study-graph]");
const studyGraphFrame = document.querySelector("[data-study-graph-frame]");
const studyGraphLines = document.querySelector("[data-study-graph-lines]");
const studyGraphNodes = document.querySelector("[data-study-graph-nodes]");
const studyGraphPanel = document.querySelector("[data-study-graph-panel]");
const studyGraphClear = document.querySelector("[data-study-graph-clear]");
const studyGraphText = document.querySelector("[data-study-graph-text]");
const STUDY_GRAPH_AREAS = Array.isArray(window.K0SEC_STUDY_AREAS) ? window.K0SEC_STUDY_AREAS : [];
const STUDY_GRAPH_ROOT = {
  id: "k0sec-root",
  title: "K0Sec",
  code: "K0Sec",
  description: "Cibersegurança"
};
const studyGraphState = {
  selectedAreaId: "",
  previewAreaId: "",
  layoutFrame: null
};

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function sanitizeSubtitleText(text) {
  return String(text ?? "").replace(/\s+/g, " ").trim().slice(0, SUBTITLE_CONFIG.maxLength);
}

function valueByViewport(mobileValue, desktopValue) {
  return subtitleState.compactViewport ? mobileValue : desktopValue;
}

function pickSubtitlePhrase() {
  const options = SUBTITLE_PHRASES.filter((phrase) => phrase !== subtitleState.lastPhrase);

  subtitleState.lastPhrase = pickRandom(options);
  return subtitleState.lastPhrase;
}

function pickSubtitleSlot() {
  const options = SUBTITLE_SLOTS.filter((slot) => slot !== subtitleState.lastSlot);

  subtitleState.lastSlot = pickRandom(options);
  return subtitleState.lastSlot;
}

function getDriftRange() {
  return subtitleState.motionIsReduced ? SUBTITLE_CONFIG.drift.reduced : SUBTITLE_CONFIG.drift.normal;
}

function setSubtitleTransformVariables(element, slot) {
  const driftRange = getDriftRange();

  element.style.setProperty("--x", `${slot.x}%`);
  element.style.setProperty("--y", `${slot.y}%`);
  element.style.setProperty("--z", `${slot.z}px`);
  element.style.setProperty("--z-end", `${slot.z + randomBetween(driftRange.zMin, driftRange.zMax)}px`);
  element.style.setProperty("--rx", `${slot.rx}deg`);
  element.style.setProperty("--ry", `${slot.ry}deg`);
  element.style.setProperty("--rz", `${slot.rz}deg`);
  element.style.setProperty("--float-x", `${randomBetween(-driftRange.x, driftRange.x)}px`);
  element.style.setProperty("--float-y", `${randomBetween(-driftRange.y, driftRange.y)}px`);
  element.style.setProperty("--drift-rx", `${randomBetween(-driftRange.rx, driftRange.rx)}deg`);
  element.style.setProperty("--drift-ry", `${randomBetween(-driftRange.ry, driftRange.ry)}deg`);
  element.style.setProperty("--drift-rz", `${randomBetween(-driftRange.rz, driftRange.rz)}deg`);
  element.style.setProperty(
    "--drift-duration",
    `${randomBetween(SUBTITLE_CONFIG.drift.durationMin, SUBTITLE_CONFIG.drift.durationMax)}s`
  );
  element.style.setProperty("--size", (slot.size ?? 0.74).toFixed(2));
}

function setSubtitleIntensity(element, intensity) {
  const finalIntensity = subtitleState.motionIsReduced
    ? Math.min(intensity, SUBTITLE_CONFIG.reducedIntensityCap)
    : intensity;

  element.style.setProperty("--intensity", finalIntensity.toFixed(2));
}

function createSubtitleLetter(character) {
  const letter = document.createElement("span");
  const scatter = subtitleState.motionIsReduced ? 0.22 : subtitleState.compactViewport ? 0.42 : 1;

  letter.className = "ambient-letter";

  if (character === " " || character === "\u00a0") {
    letter.classList.add("is-space");
    letter.textContent = "\u00a0";
  } else {
    letter.textContent = character;
  }

  if (/[.,:+/-]/.test(character)) {
    letter.classList.add("is-punctuation");
  }

  letter.style.setProperty("--dx", `${randomBetween(-7, 7) * scatter}px`);
  letter.style.setProperty("--dy", `${randomBetween(-8, 7) * scatter}px`);
  letter.style.setProperty("--dz", `${randomBetween(-18, 12) * scatter}px`);
  letter.style.setProperty("--rot", `${randomBetween(-3.2, 3.2) * scatter}deg`);
  letter.style.setProperty("--scale", randomBetween(0.965, 1.005).toFixed(3));
  letter.style.setProperty("--dur", `${randomBetween(980, 1360)}ms`);
  letter.style.setProperty("--delay", `${randomBetween(60, 180)}ms`);

  return letter;
}

function createAmbientSubtitle(text, slot, intensity = 1) {
  const phrase = document.createElement("div");

  phrase.className = "ambient-subtitle";
  setSubtitleTransformVariables(phrase, slot);
  setSubtitleIntensity(phrase, intensity);

  [...text].forEach((character) => {
    phrase.appendChild(createSubtitleLetter(character));
  });

  return phrase;
}

function getSubtitleTotalLimit() {
  if (subtitleState.motionIsReduced) return SUBTITLE_CONFIG.maxTotalReduced;

  return subtitleState.compactViewport
    ? SUBTITLE_CONFIG.maxTotalMobile
    : SUBTITLE_CONFIG.maxTotalDesktop;
}

function getActiveSubtitles() {
  if (!subtitleField) return [];

  return [...subtitleField.querySelectorAll(".ambient-subtitle")];
}

function trackSubtitleTimer(phrase, timerId) {
  if (!subtitleState.subtitleTimers.has(phrase)) {
    subtitleState.subtitleTimers.set(phrase, new Set());
  }

  subtitleState.subtitleTimers.get(phrase).add(timerId);
  return timerId;
}

function releaseSubtitleTimer(phrase, timerId) {
  const timers = subtitleState.subtitleTimers.get(phrase);

  if (!timers) return;

  timers.delete(timerId);

  if (!timers.size) {
    subtitleState.subtitleTimers.delete(phrase);
  }
}

function clearSubtitleTimers(phrase) {
  const timers = subtitleState.subtitleTimers.get(phrase);

  if (!timers) return;

  timers.forEach((timerId) => window.clearTimeout(timerId));
  subtitleState.subtitleTimers.delete(phrase);
}

function removeSubtitle(phrase) {
  if (!phrase) return;

  clearSubtitleTimers(phrase);
  phrase.remove();
}

function enforceSubtitleCapacity({ force = false } = {}) {
  const limit = getSubtitleTotalLimit();
  const activeSubtitles = getActiveSubtitles();

  if (activeSubtitles.length < limit) return true;
  if (!force) return false;

  while (getActiveSubtitles().length >= limit) {
    removeSubtitle(getActiveSubtitles()[0]);
  }

  return true;
}

function getLetterDelay(character, baseDelay) {
  const naturalJitter = randomBetween(0.84, 1.18);
  const reducedMotionMultiplier = subtitleState.motionIsReduced ? 1.08 : 1;

  if (character === " " || character === "\u00a0") {
    return baseDelay * SUBTITLE_CONFIG.spaceDelayMultiplier * naturalJitter;
  }

  if (/[.,;:!?]/.test(character)) {
    return baseDelay * SUBTITLE_CONFIG.punctuationDelayMultiplier * naturalJitter;
  }

  return baseDelay * naturalJitter * reducedMotionMultiplier;
}

function freezeSubtitleTransform(phrase) {
  const currentTransform = window.getComputedStyle(phrase).transform;

  if (currentTransform && currentTransform !== "none") {
    phrase.style.transform = currentTransform;
  }

  phrase.classList.remove("is-drifting");
}

function beginSubtitleDissolve(phrase, dissolveDelay) {
  if (!phrase?.isConnected || phrase.classList.contains("is-disintegrating")) return;

  freezeSubtitleTransform(phrase);
  phrase.classList.add("is-disintegrating");

  const cleanupTimer = window.setTimeout(() => {
    removeSubtitle(phrase);
  }, dissolveDelay + SUBTITLE_CONFIG.cleanupPadding);

  trackSubtitleTimer(phrase, cleanupTimer);
}

function revealSubtitleLetters(phrase, letters, typeDelay, onComplete) {
  let index = 0;

  const revealNextLetter = () => {
    if (!phrase.isConnected) return;

    if (index >= letters.length) {
      onComplete();
      return;
    }

    const letter = letters[index];

    letter.classList.add("is-visible");
    index += 1;

    const delay = getLetterDelay(letter.textContent, typeDelay);
    const timer = window.setTimeout(() => {
      releaseSubtitleTimer(phrase, timer);
      revealNextLetter();
    }, delay);

    trackSubtitleTimer(phrase, timer);
  };

  revealNextLetter();
}

function getAmbientTiming() {
  return {
    typeDelay: subtitleState.motionIsReduced
      ? SUBTITLE_CONFIG.typeDelay.reduced
      : valueByViewport(SUBTITLE_CONFIG.typeDelay.mobile, SUBTITLE_CONFIG.typeDelay.desktop),
    holdDelay: subtitleState.motionIsReduced
      ? SUBTITLE_CONFIG.holdDelay.reduced
      : valueByViewport(SUBTITLE_CONFIG.holdDelay.mobile, SUBTITLE_CONFIG.holdDelay.desktop),
    dissolveDelay: subtitleState.motionIsReduced
      ? SUBTITLE_CONFIG.dissolveDelay.reduced
      : valueByViewport(SUBTITLE_CONFIG.dissolveDelay.mobile, SUBTITLE_CONFIG.dissolveDelay.desktop),
    spawnCadence: subtitleState.motionIsReduced
      ? SUBTITLE_CONFIG.ambient.cadenceReduced
      : valueByViewport(SUBTITLE_CONFIG.ambient.cadenceMobile, SUBTITLE_CONFIG.ambient.cadenceDesktop)
  };
}

function getAmbientSlot() {
  if (!subtitleState.compactViewport) return pickSubtitleSlot();

  return {
    ...pickSubtitleSlot(),
    x: randomBetween(14, 86),
    y: randomBetween(18, 84),
    size: 0.62
  };
}

function getAmbientIntensity(isSecondary) {
  if (subtitleState.motionIsReduced) return SUBTITLE_CONFIG.ambient.reducedIntensity;

  return isSecondary
    ? SUBTITLE_CONFIG.ambient.secondaryIntensity
    : SUBTITLE_CONFIG.ambient.primaryIntensity;
}

function launchSubtitle(text, options = {}) {
  if (!subtitleField) return false;

  const cleanText = sanitizeSubtitleText(text);

  if (!cleanText) return false;
  if (!enforceSubtitleCapacity({ force: options.force })) return false;

  const timing = getAmbientTiming();
  const phrase = createAmbientSubtitle(
    cleanText,
    options.slot ?? getAmbientSlot(),
    options.intensity ?? SUBTITLE_CONFIG.ambient.primaryIntensity
  );
  const letters = [...phrase.querySelectorAll(".ambient-letter")];

  phrase.style.setProperty("--phrase-dissolve-duration", `${timing.dissolveDelay}ms`);
  subtitleField.appendChild(phrase);
  requestAnimationFrame(() => phrase.classList.add("is-drifting"));

  revealSubtitleLetters(phrase, letters, timing.typeDelay, () => {
    const holdTimer = window.setTimeout(() => {
      releaseSubtitleTimer(phrase, holdTimer);
      beginSubtitleDissolve(phrase, timing.dissolveDelay);
    }, timing.holdDelay);

    trackSubtitleTimer(phrase, holdTimer);
  });

  return true;
}

function spawnAmbientPhrase(allowSecondary = false) {
  const activeAmbient = getActiveSubtitles();
  const limit = getSubtitleTotalLimit();

  if (activeAmbient.length >= limit) return false;

  return launchSubtitle(pickSubtitlePhrase(), {
    slot: getAmbientSlot(),
    intensity: getAmbientIntensity(allowSecondary || activeAmbient.length > 0)
  });
}

function scheduleNextAmbientSubtitle(delay = getAmbientTiming().spawnCadence) {
  subtitleState.ambientTimer = window.setTimeout(() => {
    subtitleState.ambientTimer = null;
    spawnAmbientPhrase(true);
    scheduleNextAmbientSubtitle();
  }, delay);
}

function startAmbientSubtitles() {
  if (!subtitleField) return;

  const firstTimer = window.setTimeout(() => {
    subtitleState.initialTimers.delete(firstTimer);
    spawnAmbientPhrase(false);
  }, SUBTITLE_CONFIG.ambient.firstDelay);
  const secondDelay = subtitleState.compactViewport
    ? SUBTITLE_CONFIG.ambient.secondDelayMobile
    : SUBTITLE_CONFIG.ambient.secondDelayDesktop;
  const secondTimer = window.setTimeout(() => {
    subtitleState.initialTimers.delete(secondTimer);
    spawnAmbientPhrase(true);
  }, secondDelay);

  subtitleState.initialTimers.add(firstTimer);
  subtitleState.initialTimers.add(secondTimer);
  scheduleNextAmbientSubtitle();
}

function sanitizeId(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (text) element.textContent = text;

  return element;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getStudyArea(areaId) {
  return STUDY_GRAPH_AREAS.find((area) => area.id === areaId) ?? null;
}

function getStudyGraphActiveAreaId() {
  return studyGraphState.previewAreaId || studyGraphState.selectedAreaId;
}

function setStudyNodePosition(element, node) {
  element.style.setProperty("--node-x", `${node.x}px`);
  element.style.setProperty("--node-y", `${node.y}px`);
}

function createStudyNodeButton(node) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = `study-node study-node-${node.type}`;
  button.dataset.studyNode = node.id;
  button.dataset.nodeType = node.type;

  if (node.areaId) button.dataset.areaId = node.areaId;

  setStudyNodePosition(button, node);

  if (node.type === "root") {
    button.setAttribute("aria-label", "Mostrar todas as áreas de estudo da K0Sec");
    button.innerHTML = `
      <span class="study-node-code">${STUDY_GRAPH_ROOT.code}</span>
      <span class="study-node-title">${STUDY_GRAPH_ROOT.description}</span>
    `;
    return button;
  }

  if (node.type === "area") {
    button.setAttribute("aria-label", `${node.index} ${node.code}, ${node.title}`);
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = `
      <span class="study-node-index">${node.index}</span>
      <span class="study-node-code">${node.code}</span>
      <span class="study-node-title">${node.title}</span>
    `;
    return button;
  }

  button.setAttribute("aria-label", `Subárea de ${node.areaTitle}: ${node.title}`);
  button.innerHTML = `<span>${node.title}</span>`;

  return button;
}

function createStudyGraphLine(link) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", String(link.source.x));
  line.setAttribute("y1", String(link.source.y));
  line.setAttribute("x2", String(link.target.x));
  line.setAttribute("y2", String(link.target.y));
  line.dataset.studyLine = `${link.source.id}:${link.target.id}`;
  line.dataset.sourceId = link.source.id;
  line.dataset.targetId = link.target.id;
  line.dataset.areaId = link.areaId;
  line.classList.add("study-graph-line", `study-line-${link.kind}`);

  return line;
}

function getStudyGraphLayout(width, height) {
  const compact = width < 720;
  const centerX = width / 2;
  const centerY = compact ? 68 : height * 0.49;
  const nodes = [
    {
      ...STUDY_GRAPH_ROOT,
      type: "root",
      x: centerX,
      y: centerY
    }
  ];
  const links = [];
  const marginX = compact ? 92 : 120;
  const marginY = compact ? 42 : 58;

  STUDY_GRAPH_AREAS.forEach((area, areaIndex) => {
    const angle = -Math.PI / 2 + (areaIndex / STUDY_GRAPH_AREAS.length) * Math.PI * 2;
    const areaNode = compact
      ? {
          ...area,
          type: "area",
          x: areaIndex % 2 === 0 ? width * 0.35 : width * 0.65,
          y: 168 + areaIndex * 78
        }
      : {
          ...area,
          type: "area",
          x: centerX + Math.cos(angle) * width * 0.31,
          y: centerY + Math.sin(angle) * height * 0.3
        };

    areaNode.x = clamp(areaNode.x, marginX, width - marginX);
    areaNode.y = clamp(areaNode.y, marginY, height - marginY);
    nodes.push(areaNode);
    links.push({
      kind: "area",
      source: nodes[0],
      target: areaNode,
      areaId: area.id
    });

    area.subareas.forEach((subarea, subareaIndex) => {
      const subareaId = `${area.id}-${sanitizeId(subarea)}`;
      const offsetIndex = subareaIndex - (area.subareas.length - 1) / 2;
      const subareaAngle = compact ? Math.PI / 2 : angle + offsetIndex * 0.27;
      const compactSide = areaIndex % 2 === 0 ? 1 : -1;
      const tangentX = -Math.sin(angle);
      const tangentY = Math.cos(angle);
      const subareaNode = compact
        ? {
            id: subareaId,
            type: "subarea",
            areaId: area.id,
            areaTitle: area.title,
            title: subarea,
            x: compactSide > 0 ? width * 0.72 : width * 0.28,
            y: areaNode.y + (subareaIndex - (area.subareas.length - 1) / 2) * 32
          }
        : {
            id: subareaId,
            type: "subarea",
            areaId: area.id,
            areaTitle: area.title,
            title: subarea,
            x: areaNode.x + Math.cos(subareaAngle) * 118 + tangentX * offsetIndex * 104,
            y: areaNode.y + Math.sin(subareaAngle) * 92 + tangentY * offsetIndex * 72
          };

      subareaNode.x = clamp(subareaNode.x, compact ? 76 : 78, width - (compact ? 76 : 78));
      subareaNode.y = clamp(subareaNode.y, compact ? 116 : 48, height - 48);
      nodes.push(subareaNode);
      links.push({
        kind: "subarea",
        source: areaNode,
        target: subareaNode,
        areaId: area.id
      });
    });
  });

  return { nodes, links, width, height, compact };
}

function updateStudyGraphPanel() {
  if (!studyGraphPanel) return;

  const selectedArea = getStudyArea(studyGraphState.selectedAreaId);

  studyGraphPanel.replaceChildren();

  if (!selectedArea) {
    studyGraphPanel.append(
      createElement("span", "study-panel-code", "K0Sec"),
      createElement("h3", "", "Cibersegurança em camadas."),
      createElement(
        "p",
        "",
        "Selecione uma área para destacar suas conexões, ver subáreas relacionadas e ler a descrição do caminho de estudo."
      )
    );

    if (studyGraphClear) studyGraphClear.hidden = true;
    return;
  }

  const code = createElement("span", "study-panel-code", `${selectedArea.index} ${selectedArea.code}`);
  const title = createElement("h3", "", selectedArea.title);
  const description = createElement("p", "", selectedArea.description);
  const list = createElement("ul", "study-panel-list");

  selectedArea.subareas.forEach((subarea) => {
    list.appendChild(createElement("li", "", subarea));
  });

  studyGraphPanel.append(code, title, description, list);

  if (studyGraphClear) {
    studyGraphClear.hidden = false;
    studyGraphPanel.appendChild(studyGraphClear);
  }
}

function updateStudyGraphState() {
  if (!studyGraphRoot) return;

  const activeAreaId = getStudyGraphActiveAreaId();

  studyGraphRoot.dataset.activeArea = activeAreaId;
  studyGraphRoot.classList.toggle("has-active-area", Boolean(activeAreaId));

  studyGraphRoot.querySelectorAll("[data-study-node]").forEach((node) => {
    const nodeAreaId = node.dataset.areaId || "";
    const isRoot = node.dataset.nodeType === "root";
    const isActiveArea = node.dataset.studyNode === activeAreaId;
    const isRelated = isRoot || nodeAreaId === activeAreaId || isActiveArea;
    const selected = node.dataset.studyNode === studyGraphState.selectedAreaId;

    node.classList.toggle("is-muted", Boolean(activeAreaId) && !isRelated);
    node.classList.toggle("is-related", Boolean(activeAreaId) && isRelated);
    node.classList.toggle("is-selected", selected);

    if (node.dataset.nodeType === "area") {
      node.setAttribute("aria-pressed", String(selected));
      node.setAttribute("aria-expanded", String(selected));
    }
  });

  studyGraphRoot.querySelectorAll("[data-study-line]").forEach((line) => {
    const related = !activeAreaId || line.dataset.areaId === activeAreaId;

    line.classList.toggle("is-muted", !related);
    line.classList.toggle("is-related", related && Boolean(activeAreaId));
  });

  updateStudyGraphPanel();
}

function renderAccessibleStudyGraphText() {
  if (!studyGraphText) return;

  const heading = createElement("h3", "", "Representação textual das áreas de estudo");
  const list = createElement("ul", "");

  STUDY_GRAPH_AREAS.forEach((area) => {
    const item = createElement("li", "");
    const title = createElement("strong", "", `${area.index} ${area.code} ${area.title}: `);
    const description = document.createTextNode(area.description);
    const subareas = createElement("ul", "");

    area.subareas.forEach((subarea) => {
      subareas.appendChild(createElement("li", "", subarea));
    });

    item.append(title, description, subareas);
    list.appendChild(item);
  });

  studyGraphText.replaceChildren(heading, list);
}

function renderStudyGraph() {
  if (!studyGraphRoot || !studyGraphFrame || !studyGraphLines || !studyGraphNodes || !STUDY_GRAPH_AREAS.length) {
    return;
  }

  const width = studyGraphFrame.clientWidth;
  const height = studyGraphFrame.clientHeight;

  if (!width || !height) return;

  const layout = getStudyGraphLayout(width, height);

  studyGraphState.layoutFrame = { width, height, compact: layout.compact };
  studyGraphLines.setAttribute("viewBox", `0 0 ${width} ${height}`);
  studyGraphLines.replaceChildren(...layout.links.map(createStudyGraphLine));
  studyGraphNodes.replaceChildren(...layout.nodes.map(createStudyNodeButton));
  updateStudyGraphState();
}

function selectStudyArea(areaId) {
  studyGraphState.selectedAreaId = studyGraphState.selectedAreaId === areaId ? "" : areaId;
  studyGraphState.previewAreaId = "";
  updateStudyGraphState();
}

function initStudyGraph() {
  if (!studyGraphRoot || !STUDY_GRAPH_AREAS.length) return;

  renderAccessibleStudyGraphText();
  renderStudyGraph();

  studyGraphRoot.addEventListener("pointerover", (event) => {
    const node = event.target.closest("[data-study-node]");

    if (!node || node.dataset.nodeType === "root") return;

    studyGraphState.previewAreaId = node.dataset.areaId || node.dataset.studyNode;
    updateStudyGraphState();
  });

  studyGraphRoot.addEventListener("pointerout", (event) => {
    if (studyGraphRoot.contains(event.relatedTarget)) return;

    studyGraphState.previewAreaId = "";
    updateStudyGraphState();
  });

  studyGraphRoot.addEventListener("focusin", (event) => {
    const node = event.target.closest("[data-study-node]");

    if (!node || node.dataset.nodeType === "root") return;

    studyGraphState.previewAreaId = node.dataset.areaId || node.dataset.studyNode;
    updateStudyGraphState();
  });

  studyGraphRoot.addEventListener("focusout", (event) => {
    if (studyGraphRoot.contains(event.relatedTarget)) return;

    studyGraphState.previewAreaId = "";
    updateStudyGraphState();
  });

  studyGraphRoot.addEventListener("click", (event) => {
    const node = event.target.closest("[data-study-node]");

    if (!node) return;

    if (node.dataset.nodeType === "root") {
      studyGraphState.selectedAreaId = "";
      studyGraphState.previewAreaId = "";
      updateStudyGraphState();
      return;
    }

    selectStudyArea(node.dataset.areaId || node.dataset.studyNode);
  });

  studyGraphClear?.addEventListener("click", () => {
    studyGraphState.selectedAreaId = "";
    studyGraphState.previewAreaId = "";
    updateStudyGraphState();
  });

  window.addEventListener("resize", () => {
    window.requestAnimationFrame(renderStudyGraph);
  });
}

linkedElements.forEach((element) => {
  const linkKey = element.dataset.link;
  const linkTarget = COMMUNITY_LINKS[linkKey];

  if (linkTarget) {
    element.setAttribute("href", linkTarget);
  }
});

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";

  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navMenu.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

revealElements.forEach((element) => revealObserver.observe(element));
initStudyGraph();
startAmbientSubtitles();
