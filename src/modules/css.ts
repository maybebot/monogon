/**
 * WIP: limited support to mosty css variables
 */
const definitions = [
  { name: 'any', regex: /.*/g, css: { color: 'var(--mng-text)' } },
  { name: 'property', regex: /(^|[\r\n])[^:]*:/g, css: { color: 'var(--mng-key)' } },
  { name: 'value', regex: /:.*/g, css: { color: 'var(--mng-string)' } },
  { name: 'dashes', regex: /--/g, css: { color: 'var(--mng-dashes)' } },
  { name: 'parenthesis', regex: /[\\(\\)]/g, css: { color: 'var(--mng-curly-brackets)' } },
  { name: 'keyword', regex: /var(?=\()/g, css: { color: 'var(--mng-keyword)' } },
  { name: 'comment', regex: /\/\*([\s\S]*?)\*\//g, css: { color: 'var(--mng-comment)' } },
  { name: 'symbol', regex: /;/g, css: { color: 'var(--mng-text)' } },
];

export default {
  definitions,
};
