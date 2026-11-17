// Ergebnisskala der Auflösung (SPEC Abschnitt 12, „Ergebnisskala“):
// waagrechte Skala von −1 bis 1 mit eigener Schätzung, r und ρ sowie den
// Trefferbereichen ±0,05 und ±0,10 um den gefragten Wert.

const SVG_NS = "http://www.w3.org/2000/svg";
const WIDTH = 520;
const HEIGHT = 44;
const LEFT = 14;
const RIGHT = WIDTH - 14;
const TRACK_Y = 22;
const TICKS = [-1, -0.5, 0, 0.5, 1];

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, String(value));
  }
  return element;
}

function xFor(value) {
  const clamped = Math.max(-1, Math.min(1, value));
  return LEFT + ((clamped + 1) / 2) * (RIGHT - LEFT);
}

function band(center, halfWidth, className) {
  const x1 = xFor(center - halfWidth);
  const x2 = xFor(center + halfWidth);
  return svgElement("rect", {
    class: className,
    x: x1,
    y: TRACK_Y - 9,
    width: Math.max(1, x2 - x1),
    height: 18,
  });
}

function formatTick(value) {
  if (value === 0) return "0";
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 })
    .format(value)
    .replace("-", "−");
}

/**
 * @param {{ estimate: number, pearson: number, spearman?: number, slope?: number,
 *           asked: "pearson" | "spearman" | "slope", min?: number, max?: number,
 *           activeCategories?: string[],
 *           tolerance?: { wide: number, narrow: number },
 *           labels: { estimate: string, pearson: string, spearman?: string, slope?: string, ariaLabel: string } }} options
 * @returns {HTMLElement}
 */
export function createResultScale({
  estimate, pearson, spearman, slope, asked, min = -1, max = 1,
  tolerance = { wide: 0.1, narrow: 0.05 }, labels,
  activeCategories = ["pearson", "spearman", "slope"],
}) {
  const range = max - min;
  const position = (value) => LEFT + ((Math.max(min, Math.min(max, value)) - min) / range) * (RIGHT - LEFT);
  const scaleBand = (center, halfWidth, className) => svgElement("rect", {
    class: className,
    x: position(center - halfWidth),
    y: TRACK_Y - 9,
    width: Math.max(1, position(center + halfWidth) - position(center - halfWidth)),
    height: 18,
  });
  const wrapper = document.createElement("figure");
  wrapper.className = `result-scale result-scale-${asked}`;

  const svg = svgElement("svg", {
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    role: "img",
    "aria-label": labels.ariaLabel,
    class: "result-scale-svg",
  });

  const askedValue = asked === "pearson" ? pearson : asked === "spearman" ? spearman : slope;
  svg.append(
    scaleBand(askedValue, tolerance.wide, "result-scale-band-wide"),
    scaleBand(askedValue, tolerance.narrow, "result-scale-band-narrow"),
    svgElement("line", {
      class: "result-scale-track",
      x1: LEFT,
      y1: TRACK_Y,
      x2: RIGHT,
      y2: TRACK_Y,
    }),
  );

  const ticks = min === -2 ? [-2, -1, 0, 1, 2] : TICKS;
  for (const tick of ticks) {
    const x = position(tick);
    svg.append(svgElement("line", {
      class: "result-scale-tick",
      x1: x,
      y1: TRACK_Y - 4,
      x2: x,
      y2: TRACK_Y + 4,
    }));
    const label = svgElement("text", {
      class: "result-scale-tick-label",
      x,
      y: HEIGHT - 2,
      "text-anchor": "middle",
    });
    label.textContent = formatTick(tick);
    svg.append(label);
  }

  // r: Kreis, ρ: Raute, Schätzung: Dreieck von oben auf die Skala.
  const rX = position(pearson);
  const rhoX = position(spearman);
  const slopeX = position(slope);
  const guessX = position(estimate);
  const markers = [
    // r etwas über, ρ etwas unter der Linie, damit beide sichtbar bleiben, wenn sie fast gleich sind.
    asked === "slope" || !activeCategories.includes("pearson") ? null : svgElement("circle", {
      class: "result-scale-marker marker-pearson", cx: rX, cy: TRACK_Y - 3, r: 5.5,
    }),
    spearman === undefined || !activeCategories.includes("spearman") ? null : svgElement("path", {
      class: "result-scale-marker marker-spearman",
      d: `M ${rhoX} ${TRACK_Y - 3.5} L ${rhoX + 6} ${TRACK_Y + 3} L ${rhoX} ${TRACK_Y + 9.5} L ${rhoX - 6} ${TRACK_Y + 3} Z`,
    }),
    slope === undefined ? null : svgElement("circle", {
      class: "result-scale-marker marker-slope", cx: slopeX, cy: TRACK_Y - 3, r: 5.5,
    }),
    svgElement("path", {
      class: "result-scale-marker marker-estimate",
      d: `M ${guessX - 6} ${TRACK_Y - 19} L ${guessX + 6} ${TRACK_Y - 19} L ${guessX} ${TRACK_Y - 9} Z`,
    }),
  ].filter(Boolean);
  svg.append(...markers);

  const legend = document.createElement("figcaption");
  legend.className = "result-scale-legend";
  const legendItems = asked === "slope"
    ? [["legend-estimate", labels.estimate], ["legend-slope", labels.slope]]
    : [
      ["legend-estimate", labels.estimate],
      ...(activeCategories.includes("pearson") ? [["legend-pearson", labels.pearson]] : []),
      ...(activeCategories.includes("spearman") ? [["legend-spearman", labels.spearman]] : []),
    ];
  for (const [className, text] of legendItems) {
    const item = document.createElement("span");
    item.className = `legend-item ${className}`;
    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = text;
    item.append(swatch, label);
    legend.append(item);
  }

  wrapper.append(svg, legend);
  return wrapper;
}
