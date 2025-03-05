const definitions = [
  { name: 'any', regex: /.*/g, css: { color: 'blue' } },
  { name: 'boolean', regex: /^(\s*)([\w-]+)(:)\s*(.*)$/g, css: { color: 'var(--mng-boolean)' } },
  { name: 'key', regex: /^[^:]+/gm, css: { color: 'var(--mng-key)' } },
  { name: 'value', regex: /(?<=:).*$/gm, css: { color: 'var(--mng-string)' } },
  { name: 'comment', regex: /#.*/g, css: { color: 'var(--mng-comment)' } },
  { name: 'keyword', regex: /-/g, css: { color: 'var(--mng-dashes)' } },
  { name: 'keyword', regex: /:|\||-|>|{|}|\[|}/g, css: { color: 'var(--mng-keyword)' } },
];

export default { definitions };
