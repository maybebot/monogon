import { cssProps } from '../theme.js';

const definitions = {
  any: { regex: /.*/g, css: cssProps.text },
  boolean: { regex: /^(\s*)([\w-]+)(:)\s*(.*)$/g, css: cssProps.boolean },
  key: { regex: /^[^:]+/gm, css: cssProps.key },
  value: { regex: /(?<=:).*$/gm, css: cssProps.string },
  comment: { regex: /#.*/g, css: cssProps.comment },
  keyword: { regex: /:|\||-|>|{|}|\[|}/g, css: cssProps.keyword },
};

export default { definitions };
