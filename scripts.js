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
const studyGraphCanvas = document.querySelector("[data-study-graph-canvas]");
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
const STUDY_GRAPH_ICONS = {
  "red-team": [
    ["circle", { cx: 12, cy: 12, r: 6 }],
    ["circle", { cx: 12, cy: 12, r: 2 }],
    ["path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3" }]
  ],
  "blue-team": [
    ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }],
    ["path", { d: "m9 12 2 2 4-4" }]
  ],
  "seguranca-de-redes": [
    ["circle", { cx: 12, cy: 5, r: 2.5 }],
    ["circle", { cx: 5, cy: 18, r: 2.5 }],
    ["circle", { cx: 19, cy: 18, r: 2.5 }],
    ["path", { d: "m10.8 7.2-4.6 8.6M13.2 7.2l4.6 8.6M7.5 18h9" }]
  ],
  linux: [
    ["rect", { x: 3, y: 4, width: 18, height: 16, rx: 2 }],
    ["path", { d: "m7 9 3 3-3 3M13 15h4" }]
  ],
  appsec: [
    ["rect", { x: 5, y: 10, width: 14, height: 10, rx: 2 }],
    ["path", { d: "M8 10V7a4 4 0 0 1 8 0v3M12 14v2" }]
  ],
  osint: [
    ["circle", { cx: 10.5, cy: 10.5, r: 6.5 }],
    ["path", { d: "m15.5 15.5 5 5M10.5 7.5v6M7.5 10.5h6" }]
  ],
  ctf: [
    ["path", { d: "M5 22V3M5 4h12l-2.5 4L17 12H5" }]
  ],
  programacao: [
    ["path", { d: "m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" }]
  ]
};
const studyGraphState = {
  selectedAreaId: "",
  previewAreaId: "",
  layoutFrame: null,
  nodes: [],
  links: [],
  nodeMap: new Map(),
  animationFrame: null,
  activePointer: null,
  motionIsReduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches
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

function getStudyNodeRadius(node) {
  if (node.type === "root") return 46;
  if (node.type === "area") return 36;
  return 10;
}

function getStudyGraphNodeLabel(node) {
  if (node.type === "root") return "Mostrar todas as áreas de estudo da K0Sec";
  if (node.type === "area") return `${node.index} ${node.code}, ${node.title}`;
  return `Subárea de ${node.areaTitle}: ${node.title}`;
}

function getStudyGraphNodeAreaId(node) {
  if (node.type === "root") return "";
  return node.areaId || node.id;
}

function createSvgElement(tagName, className) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);

  if (className) element.setAttribute("class", className);

  return element;
}

function getStudyGraphPoint(event) {
  const rect = studyGraphCanvas.getBoundingClientRect();
  const viewBox = studyGraphCanvas.viewBox.baseVal;

  return {
    x: ((event.clientX - rect.left) / rect.width) * viewBox.width,
    y: ((event.clientY - rect.top) / rect.height) * viewBox.height
  };
}

function createStudyGraphModel(width, height) {
  const compact = width < 1080;
  const centerX = width / 2;
  const centerY = compact ? 72 : height * 0.5;
  const areaRingX = Math.min(width * 0.32, 580);
  const areaRingY = Math.min(height * 0.28, 340);
  const subareaRing = Math.min(width * 0.13, height * 0.15, 155);
  const rootNode = {
    ...STUDY_GRAPH_ROOT,
    type: "root",
    radius: getStudyNodeRadius({ type: "root" }),
    x: centerX,
    y: centerY,
    vx: 0,
    vy: 0,
    homeX: centerX,
    homeY: centerY,
    fixed: true
  };
  const nodes = [rootNode];
  const links = [];
  const compactAreaGap = (height - 300) / STUDY_GRAPH_AREAS.length;

  STUDY_GRAPH_AREAS.forEach((area, areaIndex) => {
    const angle = -Math.PI / 2 + (areaIndex / STUDY_GRAPH_AREAS.length) * Math.PI * 2;
    const areaX = compact
      ? centerX + (areaIndex % 2 === 0 ? -18 : 18)
      : centerX + Math.cos(angle) * areaRingX;
    const areaY = compact
      ? 150 + areaIndex * compactAreaGap
      : centerY + Math.sin(angle) * areaRingY;
    const areaNode = {
      ...area,
      type: "area",
      radius: getStudyNodeRadius({ type: "area" }),
      x: areaX,
      y: areaY,
      vx: 0,
      vy: 0,
      homeX: areaX,
      homeY: areaY
    };

    nodes.push(areaNode);
    links.push({
      kind: "area",
      sourceId: rootNode.id,
      targetId: areaNode.id,
      areaId: area.id,
      distance: Math.hypot(areaX - centerX, areaY - centerY),
      strength: compact ? 0.012 : 0.032
    });

    area.subareas.forEach((subarea, subareaIndex) => {
      const offset = subareaIndex - (area.subareas.length - 1) / 2;
      const subareaAngle = angle + offset * 0.42;
      const subareaId = `${area.id}-${sanitizeId(subarea)}`;
      const compactNodeOnLeft = subareaIndex % 2 === 0;
      const subareaX = compact
        ? (compactNodeOnLeft ? 28 : width - 28)
        : areaX + Math.cos(subareaAngle) * subareaRing;
      const subareaY = compact
        ? areaY + 92 + subareaIndex * 21
        : areaY + Math.sin(subareaAngle) * subareaRing;
      const nearLeftEdge = subareaX < width * 0.2;
      const nearRightEdge = subareaX > width * 0.8;
      const labelPointsTowardCenter = compact || nearLeftEdge || nearRightEdge;
      const labelOnLeft = labelPointsTowardCenter ? subareaX < centerX : subareaX >= centerX;
      const angleDirection = Math.cos(angle);
      const verticalBranchLabelOffset = Math.abs(angleDirection) < 0.3
        ? offset * 24
        : Math.sign(angleDirection) * offset * 18;
      const subareaNode = {
        id: subareaId,
        type: "subarea",
        areaId: area.id,
        areaTitle: area.title,
        title: subarea,
        compact,
        radius: getStudyNodeRadius({ type: "subarea" }),
        x: subareaX,
        y: subareaY,
        vx: 0,
        vy: 0,
        homeX: subareaX,
        homeY: subareaY,
        labelAnchor: labelOnLeft ? "start" : "end",
        labelOffsetX: labelOnLeft ? 17 : -17,
        labelOffsetY: compact ? 4 : verticalBranchLabelOffset + 4
      };

      nodes.push(subareaNode);
      links.push({
        kind: "subarea",
        sourceId: areaNode.id,
        targetId: subareaNode.id,
        areaId: area.id,
        distance: Math.hypot(subareaX - areaX, subareaY - areaY),
        strength: compact ? 0.018 : 0.045
      });
    });
  });

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  links.forEach((link) => {
    link.source = nodeMap.get(link.sourceId);
    link.target = nodeMap.get(link.targetId);
  });

  return { nodes, links, nodeMap, compact, width, height };
}

function createStudyGraphLine(link) {
  const line = createSvgElement("line", `study-graph-line study-line-${link.kind}`);

  line.dataset.studyLine = `${link.sourceId}:${link.targetId}`;
  line.dataset.sourceId = link.sourceId;
  line.dataset.targetId = link.targetId;
  line.dataset.areaId = link.areaId;

  return line;
}

function appendStudyGraphIcon(parent, node) {
  if (node.type === "root") {
    const logo = createSvgElement("image", "study-node-logo");

    logo.setAttribute("href", "assets/k0sec-symbol.webp");
    logo.setAttribute("x", "-24");
    logo.setAttribute("y", "-24");
    logo.setAttribute("width", "48");
    logo.setAttribute("height", "48");
    logo.setAttribute("preserveAspectRatio", "xMidYMid meet");
    parent.appendChild(logo);
    return;
  }

  if (node.type !== "area") return;

  const icon = createSvgElement("g", "study-node-icon");
  const iconParts = STUDY_GRAPH_ICONS[node.id] || STUDY_GRAPH_ICONS.programacao;

  icon.setAttribute("transform", "translate(-12 -12)");
  iconParts.forEach(([tagName, attributes]) => {
    const part = createSvgElement(tagName, "study-node-icon-part");

    Object.entries(attributes).forEach(([attribute, value]) => {
      part.setAttribute(attribute, String(value));
    });
    icon.appendChild(part);
  });
  parent.appendChild(icon);
}

function getStudyAreaTitleLines(title) {
  if (title.length <= 14 || !title.includes(" ")) return [title];

  const words = title.split(" ");
  const splitIndex = Math.ceil(words.length / 2);

  return [words.slice(0, splitIndex).join(" "), words.slice(splitIndex).join(" ")];
}

function getStudySubareaTitleLines(title, compact) {
  if (compact || title.length <= 20 || !title.includes(" ")) return [title];

  const words = title.split(" ");
  let firstLine = "";
  let secondLine = "";

  words.forEach((word) => {
    if (!firstLine || (firstLine.length + word.length + 1 <= Math.ceil(title.length / 2))) {
      firstLine = `${firstLine} ${word}`.trim();
    } else {
      secondLine = `${secondLine} ${word}`.trim();
    }
  });

  return secondLine ? [firstLine, secondLine] : [title];
}

function appendStudyGraphLabel(parent, node) {
  if (node.type === "root") return;

  const label = createSvgElement("text", `study-node-label study-node-label-${node.type}`);

  if (node.type === "area") {
    const lines = getStudyAreaTitleLines(node.title);

    label.setAttribute("text-anchor", "middle");
    label.setAttribute("y", String(node.radius + 25));
    lines.forEach((line, lineIndex) => {
      const textLine = createSvgElement("tspan");

      textLine.textContent = line;
      textLine.setAttribute("x", "0");
      textLine.setAttribute("dy", lineIndex === 0 ? "0" : "15");
      label.appendChild(textLine);
    });
  } else {
    const lines = getStudySubareaTitleLines(node.title, node.compact);

    label.setAttribute("text-anchor", node.labelAnchor);
    label.setAttribute("x", String(node.labelOffsetX));
    label.setAttribute("y", String(node.labelOffsetY - (lines.length - 1) * 6));
    lines.forEach((line, lineIndex) => {
      const textLine = createSvgElement("tspan");

      textLine.textContent = line;
      textLine.setAttribute("x", String(node.labelOffsetX));
      textLine.setAttribute("dy", lineIndex === 0 ? "0" : "12");
      label.appendChild(textLine);
    });
  }

  parent.appendChild(label);
}

function createStudyGraphNode(node) {
  const group = createSvgElement("g", `study-node study-node-${node.type}`);
  const circle = createSvgElement("circle", "study-node-circle");

  group.dataset.studyNode = node.id;
  group.dataset.nodeType = node.type;
  group.dataset.areaId = getStudyGraphNodeAreaId(node);
  group.setAttribute("role", "button");
  group.setAttribute("tabindex", "0");
  group.setAttribute("aria-label", getStudyGraphNodeLabel(node));

  const accessibleTitle = createSvgElement("title");
  accessibleTitle.textContent = getStudyGraphNodeLabel(node);
  group.appendChild(accessibleTitle);

  if (node.type === "area") {
    group.setAttribute("aria-pressed", "false");
    group.setAttribute("aria-expanded", "false");
  }

  circle.setAttribute("r", String(node.radius));
  group.appendChild(circle);
  appendStudyGraphIcon(group, node);
  appendStudyGraphLabel(group, node);

  return group;
}

function updateStudyGraphPanel() {
  if (!studyGraphPanel) return;

  const activeArea = getStudyArea(getStudyGraphActiveAreaId());

  studyGraphPanel.replaceChildren();

  if (!activeArea) {
    studyGraphPanel.append(
      createElement("span", "study-panel-code", "K0Sec // MAPA DE ESTUDOS"),
      createElement("h3", "", "Cibersegurança em camadas."),
      createElement("p", "", "Explore as conexões entre cada área e seus assuntos de estudo.")
    );

    if (studyGraphClear) studyGraphClear.hidden = true;
    return;
  }

  const code = createElement("span", "study-panel-code", `${activeArea.index} ${activeArea.code}`);
  const title = createElement("h3", "", activeArea.title);
  const description = createElement("p", "", activeArea.description);
  const accessibleSubareas = createElement("ul", "sr-only");

  activeArea.subareas.forEach((subarea) => {
    accessibleSubareas.appendChild(createElement("li", "", subarea));
  });

  studyGraphPanel.append(code, title, description, accessibleSubareas);

  if (studyGraphClear && studyGraphState.selectedAreaId) {
    studyGraphClear.hidden = false;
    studyGraphPanel.appendChild(studyGraphClear);
  } else if (studyGraphClear) {
    studyGraphClear.hidden = true;
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

function renderStudyGraphPositions() {
  studyGraphState.nodes.forEach((node) => {
    node.element?.setAttribute("transform", `translate(${node.x.toFixed(2)} ${node.y.toFixed(2)})`);
  });

  studyGraphState.links.forEach((link) => {
    link.element?.setAttribute("x1", link.source.x.toFixed(2));
    link.element?.setAttribute("y1", link.source.y.toFixed(2));
    link.element?.setAttribute("x2", link.target.x.toFixed(2));
    link.element?.setAttribute("y2", link.target.y.toFixed(2));
  });
}

function shiftStudyGraphLabel(label, amount) {
  const currentShift = Number(label.dataset.labelShiftY || 0);
  const nextShift = currentShift + amount;

  label.dataset.labelShiftY = String(nextShift);
  label.setAttribute("transform", `translate(0 ${nextShift})`);
}

function resolveStudyGraphLabelCollisions() {
  if (studyGraphState.layoutFrame?.compact || !studyGraphFrame) return;

  const labels = [...studyGraphNodes.querySelectorAll(".study-node-label")];
  const frameBox = studyGraphFrame.getBoundingClientRect();

  labels.forEach((label) => {
    label.dataset.labelShiftY = "0";
    label.removeAttribute("transform");
  });

  for (let pass = 0; pass < 8; pass += 1) {
    let adjusted = false;

    for (let index = 0; index < labels.length; index += 1) {
      for (let nextIndex = index + 1; nextIndex < labels.length; nextIndex += 1) {
        const firstLabel = labels[index];
        const secondLabel = labels[nextIndex];
        const firstBox = firstLabel.getBoundingClientRect();
        const secondBox = secondLabel.getBoundingClientRect();
        const overlapX = Math.min(firstBox.right, secondBox.right) - Math.max(firstBox.left, secondBox.left);
        const overlapY = Math.min(firstBox.bottom, secondBox.bottom) - Math.max(firstBox.top, secondBox.top);

        if (overlapX <= 3 || overlapY <= 2) continue;

        const upperLabel = firstBox.top <= secondBox.top ? firstLabel : secondLabel;
        const lowerLabel = upperLabel === firstLabel ? secondLabel : firstLabel;
        const upperBox = upperLabel.getBoundingClientRect();
        const lowerBox = lowerLabel.getBoundingClientRect();
        const distance = overlapY + 7;
        const canMoveDown = frameBox.bottom - lowerBox.bottom >= distance;

        shiftStudyGraphLabel(canMoveDown ? lowerLabel : upperLabel, canMoveDown ? distance : -distance);
        adjusted = true;
      }
    }

    if (!adjusted) break;
  }
}

function keepStudyNodeInBounds(node) {
  const padding = node.type === "subarea" ? 28 : node.radius + 22;

  node.x = clamp(node.x, padding, studyGraphState.layoutFrame.width - padding);
  node.y = clamp(node.y, padding, studyGraphState.layoutFrame.height - padding);
}

function tickStudyGraph() {
  const nodes = studyGraphState.nodes;
  const links = studyGraphState.links;
  const frame = studyGraphState.layoutFrame;

  if (!frame) return;

  links.forEach((link) => {
    const dx = link.target.x - link.source.x;
    const dy = link.target.y - link.source.y;
    const distance = Math.hypot(dx, dy) || 1;
    const force = (distance - link.distance) * link.strength;
    const fx = (dx / distance) * force;
    const fy = (dy / distance) * force;

    if (!link.source.fixed && !link.source.dragging) {
      link.source.vx += fx;
      link.source.vy += fy;
    }

    if (!link.target.fixed && !link.target.dragging) {
      link.target.vx -= fx;
      link.target.vy -= fy;
    }
  });

  for (let index = 0; index < nodes.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < nodes.length; nextIndex += 1) {
      const node = nodes[index];
      const otherNode = nodes[nextIndex];
      const dx = otherNode.x - node.x;
      const dy = otherNode.y - node.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const minDistance = node.radius + otherNode.radius + (node.type === "subarea" || otherNode.type === "subarea" ? 18 : 34);

      if (distance >= minDistance) continue;

      const force = (minDistance - distance) * 0.018;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;

      if (!node.fixed && !node.dragging) {
        node.vx -= fx;
        node.vy -= fy;
      }

      if (!otherNode.fixed && !otherNode.dragging) {
        otherNode.vx += fx;
        otherNode.vy += fy;
      }
    }
  }

  nodes.forEach((node) => {
    if (node.fixed) {
      node.x = node.homeX;
      node.y = node.homeY;
      node.vx = 0;
      node.vy = 0;
      return;
    }

    if (!node.dragging) {
      const homeStrength = node.type === "area" ? 0.006 : 0.012;

      node.vx += (node.homeX - node.x) * homeStrength;
      node.vy += (node.homeY - node.y) * homeStrength;
      node.x += node.vx;
      node.y += node.vy;
    }

    node.vx *= 0.82;
    node.vy *= 0.82;
    keepStudyNodeInBounds(node);
  });

  renderStudyGraphPositions();
}

function runStudyGraphSimulation(ticks = 1) {
  for (let index = 0; index < ticks; index += 1) {
    tickStudyGraph();
  }
}

function animateStudyGraph() {
  tickStudyGraph();

  const moving = studyGraphState.nodes.some((node) => Math.abs(node.vx) + Math.abs(node.vy) > 0.03 || node.dragging);

  if (moving) {
    studyGraphState.animationFrame = window.requestAnimationFrame(animateStudyGraph);
  } else {
    studyGraphState.animationFrame = null;
  }
}

function restartStudyGraphSimulation() {
  if (studyGraphState.motionIsReduced) {
    runStudyGraphSimulation(8);
    return;
  }

  if (!studyGraphState.animationFrame) {
    studyGraphState.animationFrame = window.requestAnimationFrame(animateStudyGraph);
  }
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
  if (!studyGraphRoot || !studyGraphFrame || !studyGraphCanvas || !studyGraphLines || !studyGraphNodes || !STUDY_GRAPH_AREAS.length) {
    return;
  }

  const width = studyGraphFrame.clientWidth;
  const height = studyGraphFrame.clientHeight;

  if (!width || !height) return;

  if (studyGraphState.animationFrame) {
    window.cancelAnimationFrame(studyGraphState.animationFrame);
    studyGraphState.animationFrame = null;
  }

  const layout = createStudyGraphModel(width, height);

  studyGraphState.layoutFrame = { width, height, compact: layout.compact };
  studyGraphState.nodes = layout.nodes;
  studyGraphState.links = layout.links;
  studyGraphState.nodeMap = layout.nodeMap;
  studyGraphCanvas.setAttribute("viewBox", `0 0 ${width} ${height}`);
  studyGraphLines.replaceChildren();
  studyGraphNodes.replaceChildren();

  layout.links.forEach((link) => {
    link.element = createStudyGraphLine(link);
    studyGraphLines.appendChild(link.element);
  });

  layout.nodes.forEach((node) => {
    node.element = createStudyGraphNode(node);
    studyGraphNodes.appendChild(node.element);
  });

  runStudyGraphSimulation(studyGraphState.motionIsReduced ? 1 : 90);
  renderStudyGraphPositions();
  updateStudyGraphState();
  window.requestAnimationFrame(resolveStudyGraphLabelCollisions);
}

function selectStudyArea(areaId) {
  studyGraphState.selectedAreaId = studyGraphState.selectedAreaId === areaId ? "" : areaId;
  studyGraphState.previewAreaId = "";
  updateStudyGraphState();
}

function initStudyGraph() {
  if (!studyGraphRoot || !studyGraphCanvas || !STUDY_GRAPH_AREAS.length) return;

  renderAccessibleStudyGraphText();
  renderStudyGraph();

  studyGraphCanvas.addEventListener("pointerdown", (event) => {
    const node = event.target.closest("[data-study-node]");

    if (!node) return;

    const graphNode = studyGraphState.nodeMap.get(node.dataset.studyNode);

    if (!graphNode) return;

    event.preventDefault();
    studyGraphCanvas.setPointerCapture(event.pointerId);
    graphNode.dragging = true;
    studyGraphState.activePointer = {
      pointerId: event.pointerId,
      nodeId: graphNode.id,
      startX: event.clientX,
      startY: event.clientY,
      moved: false
    };
  });

  studyGraphCanvas.addEventListener("pointermove", (event) => {
    const activePointer = studyGraphState.activePointer;

    if (!activePointer || activePointer.pointerId !== event.pointerId) return;

    const node = studyGraphState.nodeMap.get(activePointer.nodeId);
    const point = getStudyGraphPoint(event);

    if (!node) return;

    node.x = point.x;
    node.y = point.y;
    node.vx = 0;
    node.vy = 0;
    activePointer.moved = activePointer.moved || Math.hypot(event.clientX - activePointer.startX, event.clientY - activePointer.startY) > 5;
    keepStudyNodeInBounds(node);
    renderStudyGraphPositions();
    restartStudyGraphSimulation();
  });

  studyGraphCanvas.addEventListener("pointerup", (event) => {
    const activePointer = studyGraphState.activePointer;

    if (!activePointer || activePointer.pointerId !== event.pointerId) return;

    const node = studyGraphState.nodeMap.get(activePointer.nodeId);

    if (node) {
      node.dragging = false;

      if (!activePointer.moved) {
        if (node.type === "root") {
          studyGraphState.selectedAreaId = "";
          studyGraphState.previewAreaId = "";
          updateStudyGraphState();
        } else {
          selectStudyArea(node.areaId || node.id);
        }
      }
    }

    studyGraphState.activePointer = null;
    if (studyGraphCanvas.hasPointerCapture(event.pointerId)) {
      studyGraphCanvas.releasePointerCapture(event.pointerId);
    }
    restartStudyGraphSimulation();
  });

  studyGraphCanvas.addEventListener("pointercancel", (event) => {
    const activePointer = studyGraphState.activePointer;

    if (!activePointer || activePointer.pointerId !== event.pointerId) return;

    const node = studyGraphState.nodeMap.get(activePointer.nodeId);

    if (node) node.dragging = false;

    studyGraphState.activePointer = null;
    restartStudyGraphSimulation();
  });

  studyGraphCanvas.addEventListener("pointerover", (event) => {
    const node = event.target.closest("[data-study-node]");

    if (!node) return;

    if (node.dataset.nodeType === "root") {
      studyGraphState.previewAreaId = "";
      updateStudyGraphState();
      return;
    }

    studyGraphState.previewAreaId = node.dataset.areaId || node.dataset.studyNode;
    updateStudyGraphState();
  });

  studyGraphCanvas.addEventListener("pointerout", (event) => {
    if (studyGraphCanvas.contains(event.relatedTarget)) return;

    studyGraphState.previewAreaId = "";
    updateStudyGraphState();
  });

  studyGraphCanvas.addEventListener("focusin", (event) => {
    const node = event.target.closest("[data-study-node]");

    if (!node || node.dataset.nodeType === "root") return;

    studyGraphState.previewAreaId = node.dataset.areaId || node.dataset.studyNode;
    updateStudyGraphState();
  });

  studyGraphCanvas.addEventListener("focusout", (event) => {
    if (studyGraphCanvas.contains(event.relatedTarget)) return;

    studyGraphState.previewAreaId = "";
    updateStudyGraphState();
  });

  studyGraphCanvas.addEventListener("keydown", (event) => {
    const node = event.target.closest("[data-study-node]");

    if (!node || (event.key !== "Enter" && event.key !== " ")) return;

    event.preventDefault();
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
