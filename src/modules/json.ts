import { monoLog } from '../utils';

const definitions = [
  { name: 'any', regex: /.*/g, css: { color: '#ce916f' } },
  { name: 'number', regex: /-?\d+(\.\d+)?([eE][+-]?\d+)?/g, css: { color: '#b5cea8' } },
  { name: 'boolean', regex: /\b(true|false)\b/g, css: { color: '#569cd6' } },
  { name: 'null', regex: /\bnull\b/g, css: { color: '#569cd6' } },
  { name: 'object-brackets', regex: /[{}]/g, css: { color: '#ffd708' } },
  { name: 'array-brackets', regex: /[[\]]/g, css: { color: '#da70b9' } },
  { name: 'string', regex: /"(?:[^"\\]*(?:\\.[^"\\]*)*)"/g, css: { color: '#ce916f' } },
  { name: 'key', regex: /"([^"\\]*(\\.[^"\\]*)*)"\s*:/g, css: { color: '#9ad9fb' } },
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
