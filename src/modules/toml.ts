import { cssProps } from '../theme.js';

const definitions = {
  any: { regex: /.*/g, css: cssProps.text },
  comment: { regex: /#.*/g, css: cssProps.comment },
  section: { regex: /^[ \t]*\[\[?[^\]\n]+\]\]?[ \t]*$/gm, css: cssProps.keyword },
  key: {
    regex: /^[ \t]*(?:"(?:[^"\\]|\\.)*"|'[^']*'|[\w-]+)(?:\s*\.\s*(?:"(?:[^"\\]|\\.)*"|'[^']*'|[\w-]+))*[ \t]*(?==)/gm,
    css: cssProps.key,
  },
  string: {
    regex: /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'[^']*'/g,
    css: cssProps.string,
  },
  boolean: { regex: /\b(?:true|false)\b/g, css: cssProps.boolean },
  date: {
    regex:
      /\b\d{4}-\d{2}-\d{2}(?:[Tt ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[Zz]|[+-]\d{2}:\d{2})?)?\b|\b\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[Zz]|[+-]\d{2}:\d{2})?\b/g,
    css: cssProps.number,
  },
  number: {
    regex:
      /(?<![\w.])[+-]?(?:0x[\da-fA-F](?:_?[\da-fA-F])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:0|[1-9](?:_?\d)*)(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?)(?![\w.])/g,
    css: cssProps.number,
  },
  punctuation: { regex: /[[\]{}=,.]/g, css: cssProps.text },
};

export default { definitions };
