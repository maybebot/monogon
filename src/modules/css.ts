import { cssProps } from '../theme.js';

/**
 * WIP: limited support to mosty css variables
 */
const definitions = {
  any: { regex: /.*/g, css: cssProps.text },
  property: { regex: /(^|[\r\n])[^:]*:/g, css: cssProps.key },
  value: { regex: /:.*/g, css: cssProps.string },
  dashes: { regex: /--/g, css: cssProps.dashes },
  parenthesis: { regex: /[\\(\\)]/g, css: cssProps.curlyBrackets },
  keyword: { regex: /var(?=\()/g, css: cssProps.keyword },
  comment: { regex: /\/\*([\s\S]*?)\*\//g, css: cssProps.comment },
  symbol: { regex: /;/g, css: cssProps.text },
};

export default { definitions };
