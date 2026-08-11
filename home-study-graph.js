(function initializeHomeStudyGraph() {
  const graphRoot = document.querySelector("[data-home-study-map]");
  const graphCanvas = graphRoot?.querySelector("[data-home-graph-canvas]");
  const areaLayer = graphRoot?.querySelector("[data-home-area-layer]");
  const mobileList = graphRoot?.querySelector("[data-home-area-list]");
  const selectionSummary = graphRoot?.querySelector("[data-home-study-selection]");
  const allAreasLink = graphRoot?.querySelector("[data-home-all-areas]");
  const siteData = window.K0SEC_SITE_DATA;

  if (!graphRoot || !graphCanvas || !areaLayer || !mobileList || !selectionSummary || !siteData?.areas) {
    return;
  }

  const AREA_POSITIONS = [
    { x: 50, y: 13 },
    { x: 78, y: 24 },
    { x: 88, y: 50 },
    { x: 78, y: 76 },
    { x: 50, y: 87 },
    { x: 22, y: 76 },
    { x: 12, y: 50 },
    { x: 22, y: 24 }
  ];

  const ICONS = {
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
      ["path", { d: "m15.5 15.5 5 5" }]
    ],
    ctf: [["path", { d: "M5 22V3M5 4h12l-2.5 4L17 12H5" }]],
    programacao: [["path", { d: "m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" }]]
  };

  let selectedAreaSlug = "";

  function createSvgElement(tagName, className) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);

    if (className) element.setAttribute("class", className);
    return element;
  }

  function createAreaIcon(areaSlug) {
    const icon = createSvgElement("svg", "home-area-icon");

    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("aria-hidden", "true");

    (ICONS[areaSlug] || ICONS.programacao).forEach(([tagName, attributes]) => {
      const part = createSvgElement(tagName, "home-area-icon-part");

      Object.entries(attributes).forEach(([attribute, value]) => part.setAttribute(attribute, String(value)));
      icon.appendChild(part);
    });

    return icon;
  }

  function createLine(className, source, target, areaSlug) {
    const line = createSvgElement("line", className);

    line.setAttribute("x1", String(source.x));
    line.setAttribute("y1", String(source.y));
    line.setAttribute("x2", String(target.x));
    line.setAttribute("y2", String(target.y));
    line.dataset.areaSlug = areaSlug;
    return line;
  }

  function applyNodePosition(element, position) {
    element.style.setProperty("--node-x", `${position.x}%`);
    element.style.setProperty("--node-y", `${position.y}%`);
  }

  function createRootNode() {
    const rootNode = document.createElement("div");
    const logo = document.createElement("img");
    const label = document.createElement("span");

    rootNode.className = "home-graph-node home-root-node";
    applyNodePosition(rootNode, { x: 50, y: 50 });
    logo.src = "/assets/k0sec-symbol.webp";
    logo.alt = "";
    logo.width = 52;
    logo.height = 52;
    logo.loading = "lazy";
    logo.decoding = "async";
    label.textContent = "K0Sec";
    rootNode.append(logo, label);
    return rootNode;
  }

  function createAreaNode(area, position) {
    const button = document.createElement("button");
    const label = document.createElement("span");

    button.type = "button";
    button.className = "home-graph-node home-area-node";
    button.dataset.areaSlug = area.slug;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", `Explorar ${area.title}`);
    applyNodePosition(button, position);
    label.textContent = area.title;
    button.append(createAreaIcon(area.slug), label);
    button.addEventListener("click", () => selectArea(area.slug));
    return button;
  }

  function getSubareaPositions(areaPosition, total) {
    const directionX = areaPosition.x - 50;
    const directionY = areaPosition.y - 50;
    const magnitude = Math.hypot(directionX, directionY) || 1;
    const outwardX = directionX / magnitude;
    const outwardY = directionY / magnitude;
    const tangentX = -outwardY;
    const tangentY = outwardX;

    return Array.from({ length: total }, (_, index) => {
      const spread = total === 1 ? 0 : -28 + (index / (total - 1)) * 56;
      return {
        x: Math.max(3, Math.min(97, areaPosition.x + outwardX * 10 + tangentX * spread)),
        y: Math.max(3, Math.min(97, areaPosition.y + outwardY * 10 + tangentY * spread))
      };
    });
  }

  function createSubareaNode(area, subarea, position, areaPosition) {
    const link = document.createElement("a");
    const dot = document.createElement("span");
    const label = document.createElement("span");

    link.className = "home-subarea-node";
    link.href = `/areas/${area.slug}/${subarea.slug}/`;
    link.setAttribute("aria-label", `${subarea.title}, subárea de ${area.title}`);
    applyNodePosition(link, position);

    if (position.x >= 90) {
      link.classList.add("is-right-edge");
    } else if (position.x <= 10) {
      link.classList.add("is-left-edge");
    } else if (position.x < areaPosition.x - 1) {
      link.classList.add("is-right-edge");
    } else if (position.x > areaPosition.x + 1) {
      link.classList.add("is-left-edge");
    }

    dot.className = "home-subarea-dot";
    label.textContent = subarea.title;
    link.append(dot, label);
    return link;
  }

  function renderSelectedSubareas(area) {
    areaLayer.querySelectorAll(".home-subarea-node").forEach((node) => node.remove());
    graphCanvas.querySelectorAll(".home-subarea-line").forEach((line) => line.remove());

    if (!area) return;

    const areaIndex = siteData.areas.findIndex((candidate) => candidate.slug === area.slug);
    const areaPosition = AREA_POSITIONS[areaIndex];
    const positions = getSubareaPositions(areaPosition, area.subareas.length);

    area.subareas.forEach((subarea, index) => {
      const position = positions[index];
      graphCanvas.appendChild(createLine("home-graph-line home-subarea-line", areaPosition, position, area.slug));
      areaLayer.appendChild(createSubareaNode(area, subarea, position, areaPosition));
    });
  }

  function updateSelectionSummary(area) {
    selectionSummary.replaceChildren();
    selectionSummary.hidden = !area;
    allAreasLink?.toggleAttribute("hidden", Boolean(area));

    if (!area) return;

    const copy = document.createElement("div");
    const identifier = document.createElement("span");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const actions = document.createElement("div");
    const primaryLink = document.createElement("a");
    const secondaryLink = document.createElement("a");

    copy.className = "home-study-selection-copy";
    identifier.className = "home-study-selection-id";
    identifier.textContent = `${area.index} / ${area.code}`;
    title.textContent = area.title;
    description.textContent = area.description;
    actions.className = "home-study-selection-actions";
    primaryLink.className = "button button-primary";
    primaryLink.href = `/areas/${area.slug}/`;
    primaryLink.textContent = `Explorar ${area.title}`;
    secondaryLink.className = "text-link";
    secondaryLink.href = "/areas/";
    secondaryLink.textContent = "Explorar todas as áreas →";
    copy.append(identifier, title, description);
    actions.append(primaryLink, secondaryLink);
    selectionSummary.append(copy, actions);
  }

  function updateDesktopState() {
    const selectedArea = siteData.areas.find((area) => area.slug === selectedAreaSlug) || null;

    areaLayer.querySelectorAll(".home-area-node").forEach((node) => {
      const selected = node.dataset.areaSlug === selectedAreaSlug;

      node.classList.toggle("is-selected", selected);
      node.classList.toggle("is-muted", Boolean(selectedAreaSlug) && !selected);
      node.setAttribute("aria-pressed", String(selected));
      node.setAttribute("aria-expanded", String(selected));
    });

    graphCanvas.querySelectorAll(".home-area-line").forEach((line) => {
      line.classList.toggle("is-active", line.dataset.areaSlug === selectedAreaSlug);
      line.classList.toggle("is-muted", Boolean(selectedAreaSlug) && line.dataset.areaSlug !== selectedAreaSlug);
    });

    renderSelectedSubareas(selectedArea);
    updateSelectionSummary(selectedArea);
  }

  function selectArea(areaSlug) {
    selectedAreaSlug = selectedAreaSlug === areaSlug ? "" : areaSlug;
    updateDesktopState();
  }

  function renderDesktopGraph() {
    const center = { x: 50, y: 50 };

    graphCanvas.replaceChildren();
    areaLayer.replaceChildren(createRootNode());

    siteData.areas.forEach((area, index) => {
      const position = AREA_POSITIONS[index];

      graphCanvas.appendChild(createLine("home-graph-line home-area-line", center, position, area.slug));
      areaLayer.appendChild(createAreaNode(area, position));
    });
  }

  function closeOtherMobileAreas(activeButton) {
    mobileList.querySelectorAll(".mobile-area-toggle").forEach((button) => {
      if (button === activeButton) return;

      button.setAttribute("aria-expanded", "false");
      document.getElementById(button.getAttribute("aria-controls"))?.setAttribute("hidden", "");
    });
  }

  function createMobileArea(area) {
    const section = document.createElement("section");
    const button = document.createElement("button");
    const buttonLabel = document.createElement("span");
    const content = document.createElement("div");
    const description = document.createElement("p");
    const areaLink = document.createElement("a");
    const subareaList = document.createElement("ul");
    const contentId = `mobile-area-${area.slug}`;

    section.className = "mobile-area-section";
    button.type = "button";
    button.className = "mobile-area-toggle";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", contentId);
    buttonLabel.textContent = area.title;
    button.append(createAreaIcon(area.slug), buttonLabel);

    content.id = contentId;
    content.className = "mobile-area-content";
    content.hidden = true;
    description.textContent = area.description;
    areaLink.className = "text-link";
    areaLink.href = `/areas/${area.slug}/`;
    areaLink.textContent = `Abrir ${area.title}`;

    area.subareas.forEach((subarea) => {
      const item = document.createElement("li");
      const link = document.createElement("a");

      link.href = `/areas/${area.slug}/${subarea.slug}/`;
      link.textContent = subarea.title;
      item.appendChild(link);
      subareaList.appendChild(item);
    });

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";

      closeOtherMobileAreas(button);
      button.setAttribute("aria-expanded", String(!expanded));
      content.toggleAttribute("hidden", expanded);
    });

    content.append(description, subareaList, areaLink);
    section.append(button, content);
    return section;
  }

  function renderMobileList() {
    const fragment = document.createDocumentFragment();

    siteData.areas.forEach((area) => fragment.appendChild(createMobileArea(area)));
    mobileList.replaceChildren(fragment);
  }

  renderDesktopGraph();
  renderMobileList();
  updateDesktopState();
}());
