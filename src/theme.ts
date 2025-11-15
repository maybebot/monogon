export const cssProps = {
  text: '--mng-text',
  background: '--mng-background',
  string: '--mng-string',
  key: '--mng-key',
  number: '--mng-number',
  boolean: '--mng-boolean',
  null: '--mng-null',
  comment: '--mng-comment',
  curlyBrackets: '--mng-curly-brackets',
  squareBrackets: '--mng-square-brackets',
  keyword: '--mng-keyword',
  dashes: '--mng-dashes',
};

export const css = `
* {
  box-sizing: border-box;
}
:host {
  display: inline-grid;
  white-space: pre;
}
pre {
  width: 100%;
  height: inherit;
  overflow: auto;
  padding: 1em;
  margin: 0;
  background-color: var(${cssProps.background});
  color: var(${cssProps.text});
}
code {
  width: 100%;
  height: 100%;
  display: inline-block;
  outline: none;
  white-space: pre;
  word-wrap: normal;
}

:host {
  ${cssProps.text}: #213547;
  ${cssProps.background}: #f1f1f1;
  ${cssProps.string}: #8b251e;
  ${cssProps.key}: #c32b1d;
  ${cssProps.number}: #4a845b;
  ${cssProps.boolean}: #3716f5;
  ${cssProps.null}: #3716f5;
  ${cssProps.comment}: #4e862d;
  ${cssProps.curlyBrackets}: #59913e;
  ${cssProps.squareBrackets}: #59913e;
  ${cssProps.keyword}: #666;
  ${cssProps.dashes}: #444;
}

@media (prefers-color-scheme: dark) {
  :host {
    ${cssProps.text}: #f1f1f1;
    ${cssProps.background}: #1f1f1f;
    ${cssProps.string}: #ce916f;
    ${cssProps.key}: #9cdcfe;
    ${cssProps.number}: #b5cea8;
    ${cssProps.boolean}: #569cd6;
    ${cssProps.null}: #569cd6;
    ${cssProps.comment}: #438a55;
    ${cssProps.curlyBrackets}: #ffd708;
    ${cssProps.squareBrackets}: #da70b9;
    ${cssProps.keyword}: #dcdcaa;
    ${cssProps.dashes}: #ddd;
  }
}`;
