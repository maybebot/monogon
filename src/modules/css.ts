import { cssProps } from '../theme.js';

/**
 * CSS tokenization focused on declarations and common function/at-rule syntax.
 */
const definitions = {
  any: { regex: /.*/g, css: cssProps.text },
  comment: { regex: /\/\*([\s\S]*?)\*\//g, css: cssProps.comment },
  string: { regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, css: cssProps.string },
  property: { regex: /(?<=^|[{;\n\r]\s*)(?:--[\w-]+|[\w-]+)(?=\s*:)/gm, css: cssProps.key },
  value: { regex: /(?<=:\s*)([^;}\n]+)/g, css: cssProps.string },
  number: { regex: /-?(?:\d*\.\d+|\d+)(?:[a-z%]+)?\b/g, css: cssProps.number },
  dashes: { regex: /--(?=[\w-]+)/g, css: cssProps.dashes },
  parenthesis: { regex: /[()]/g, css: cssProps.curlyBrackets },
  keyword: {
    regex: /\b(?:var|calc|min|max|clamp|url|rgb|rgba|hsl|hsla)\b(?=\s*\()/g,
    css: cssProps.keyword,
  },
  atRule: { regex: /@[a-z-]+\b/g, css: cssProps.keyword },
  symbol: { regex: /;/g, css: cssProps.text },
};

export default { definitions };
