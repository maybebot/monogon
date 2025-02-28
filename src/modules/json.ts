import { monoLog } from '../utils';

const definitions = [
  { name: 'any', regex: /.*/g, css: { color: 'var(--mng-text)' } },
  { name: 'number', regex: /-?\d+(\.\d+)?([eE][+-]?\d+)?/g, css: { color: 'var(--mng-number)' } },
  { name: 'boolean', regex: /\b(true|false)\b/g, css: { color: 'var(--mng-boolean)' } },
  { name: 'null', regex: /\bnull\b/g, css: { color: 'var(--mng-null)' } },
  { name: 'object-brackets', regex: /[{}]/g, css: { color: 'var(--mng-curly-brackets)' } },
  { name: 'array-brackets', regex: /[[\]]/g, css: { color: 'var(--mng-square-brackets)' } },
  { name: 'string', regex: /"(?:[^"\\]*(?:\\.[^"\\]*)*)"/g, css: { color: 'var(--mng-string)' } },
  { name: 'key', regex: /"([^"\\]*(\\.[^"\\]*)*)"\s*:/g, css: { color: 'var(--mng-key)' } },
];

const format = (content: string) => {
  try {
    return JSON.stringify(JSON.parse(content), null, 2);
  } catch {
    monoLog('Invalid JSON, unable to format, skipping');
    return content;
  }
};

export default {
  definitions,
  format,
};
