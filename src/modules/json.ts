const definitions = [
  { name: 'any', regex: /.*/g, css: { color: '#ce916f' } },
  { name: 'string', regex: /"(?:[^"\\]*(?:\\.[^"\\]*)*)"/g, css: { color: '#ce916f' } },
  { name: 'key', regex: /"([^"\\]*(\\.[^"\\]*)*)"\s*:/g, css: { color: '#9ad9fb' } },
  // { name: 'array', regex: /"([^"\\]*(\\.[^"\\]*)*)"/g, css: { color: '#f00' } },

  { name: 'number', regex: /-?\d+(\.\d+)?([eE][+-]?\d+)?/g, css: { color: '#b5cea8' } },
  { name: 'boolean', regex: /\b(true|false)\b/g, css: { color: '#569cd6' } },
  { name: 'null', regex: /\bnull\b/g, css: { color: '#569cd6' } },
  { name: 'object-brackets', regex: /[{}]/g, css: { color: '#ffd708' } },
  { name: 'array-brackets', regex: /[[\]]/g, css: { color: '#da70b9' } },
];

const format = (json: string) => {
  return JSON.stringify(JSON.parse(json), null, 2);
};

export const json = {
  definitions,
  format,
};
