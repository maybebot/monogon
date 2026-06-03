import { cssProps } from "../theme.js";

const definitions = {
  any: { regex: /.*/g, css: cssProps.text },
  boolean: { regex: /\b(?:true|false|yes|no|on|off)\b/gi, css: cssProps.boolean },
  null: { regex: /\bnull\b|~/g, css: cssProps.null },
  number: {
    regex: /(?<![\w.])-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?(?![\w.])/g,
    css: cssProps.number,
  },
  string: { regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, css: cssProps.string },
  key: {
    regex: /(?<=^|\n)\s*(?:-\s*)?(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[\w.-]+)(?=\s*:)/gm,
    css: cssProps.key,
  },
  value: { regex: /(?<=:\s*)([^#\n]+)/g, css: cssProps.string },
  comment: { regex: /#.*/g, css: cssProps.comment },
  keyword: { regex: /:|\||>|\{|\}|\[|\]/g, css: cssProps.keyword },
};

export default { definitions };
