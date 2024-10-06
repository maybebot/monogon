/**
 * WIP: limited support to mosty css variables
 */
const definitions = [
  { name: 'any', regex: /.*/g, css: { color: '#ce916f' } },
  { name: 'property', regex: /(^|[\r\n])[^:]*:/g, css: { color: '#9cdcfe' } },
  { name: 'value', regex: /:.*/g, css: { color: '#ce9178' } },
  { name: 'dashes', regex: /--/g, css: { color: '#ddd' } },
  { name: 'parenthesis', regex: /[\\(\\)]/g, css: { color: '#ff0' } },
  { name: 'keyword', regex: /var(?=\()/g, css: { color: '#dcdcaa' } },
  { name: 'comment', regex: /\/\*([\s\S]*?)\*\//g, css: { color: '#438a55' } },
  { name: 'symbol', regex: /;/g, css: { color: '#fff' } },
];

export default {
  definitions,
};
