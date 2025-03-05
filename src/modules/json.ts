import { monoLog } from '../utils.js';
import { cssProps } from '../theme.js';

const definitions = {
  any: { regex: /.*/g, css: cssProps.text },
  number: { regex: /-?\d+(\.\d+)?([eE][+-]?\d+)?/g, css: cssProps.number },
  boolean: { regex: /\b(true|false)\b/g, css: cssProps.boolean },
  null: { regex: /\bnull\b/g, css: cssProps.null },
  objectBrackets: { regex: /[{}]/g, css: cssProps.curlyBrackets },
  arrayBrackets: { regex: /[[\]]/g, css: cssProps.squareBrackets },
  string: { regex: /"(?:[^"\\]*(?:\\.[^"\\]*)*)"/g, css: cssProps.string },
  key: { regex: /"([^"\\]*(\\.[^"\\]*)*)"\s*:/g, css: cssProps.key },
};

const format = (content: string) => {
  try {
    return JSON.stringify(JSON.parse(content), null, 2);
  } catch {
    monoLog('Invalid JSON, unable to format, skipping');
    return content;
  }
};

export default { definitions, format };
