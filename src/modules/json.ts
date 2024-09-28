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

const format = (json: string) => {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    if (import.meta.env.DEV) {
      console.warn('%c [monogon] ', 'color: #bada55', 'Invalid Json, unable to format, skipping');
    }
    return json;
  }
};

export const json = {
  definitions,
  format,
};
