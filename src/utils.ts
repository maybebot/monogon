import type { Highlight } from './types';
/**
 * Calculates ranges to highlight based on regex
 *
 * @param {RegExp} search
 * @param {HTMLElement} element
 *
 * @return Range[]
 */
export const getRanges = (search: RegExp, element: HTMLElement) => {
  const textNode = element.childNodes[0];
  const content = textNode.textContent?.toLowerCase();
  if (!content) return [];

  const indexes: { s: number; e: number }[] = [];
  const matches = [...content.matchAll(search)];
  matches.forEach((match) => {
    indexes.push({ s: match.index, e: match.index + match[0].length });
  });

  return indexes.map((index) => {
    const range = new Range();
    range.setStart(textNode, index.s);
    range.setEnd(textNode, index.e);
    return range;
  });
};

/**
 * Creates function that applies highlights to element
 */
const createHighlightFn = (highlight: Highlight, el: HTMLElement) => {
  return CSS.highlights.set(highlight.name, new Highlight(...getRanges(highlight.regex, el)));
};

/**
 * Creates css ::highlight {} node
 */
const createHighlightCss = (highlight: Highlight) => {
  const style = Object.entries(highlight.css)
    .map(([k, v]) => `${k}:${v};`)
    .join('\r\n');
  return `::highlight(${highlight.name}) { ${style} }`;
};

/**
 * Converts highlight definitions to usable module
 */
export const transformModule = (highlights: Highlight[], codeNode: HTMLElement) => {
  return highlights.map((highlight) => ({
    apply: () => createHighlightFn(highlight, codeNode),
    css: createHighlightCss(highlight),
  }));
};

export const monoLog = (message: string, error = false) => {
  if (import.meta.env.DEV) {
    if (!error) {
      console.warn('%c [monogon]', 'color: #56b9c8', message);
    } else {
      console.error('%c [monogon]', 'color: #56b9c8', message);
    }
  }
};
