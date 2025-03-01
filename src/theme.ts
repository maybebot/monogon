export const css = `
* {
  box-sizing: border-box;
}
:host {
  display: inline-grid;
  white-space: pre-line;
}
pre {
  width: 100%;
  height: 100%;
  padding: 1em;
  margin: 0;
  background-color: var(--mng-background);
  color: var(--mng-text);
}
code {
  width: 100%;
  height: 100%;
  display: inline-block;
  outline: none;
  width: 100%;
  white-space: pre-line;
}

:host {
  /* Generic */
  --mng-text: #213547;
  --mng-background: #f1f1f1;
  /* Proper highlighting */
  --mng-string: #8b251e;
  --mng-key: #c32b1d;
  --mng-number: #4a845b;
  --mng-boolean: #3716f5;
  --mng-null: #3716f5;
  --mng-comment: #4e862d;
  --mng-curly-brackets: #59913e;
  --mng-square-brackets: #59913e;
  --mng-keyword: #666;
  --mng-dashes: #444;
}

@media (prefers-color-scheme: dark) {
  :host {
    /* Generic */
    --mng-text: #f1f1f1;
    --mng-background: #1f1f1f;
    /* Proper highlighting */
    --mng-string: #ce916f;
    --mng-key: #9cdcfe;
    --mng-number: #b5cea8;
    --mng-boolean: #569cd6;
    --mng-null: #569cd6;
    --mng-comment: #438a55;
    --mng-curly-brackets: #ffd708;
    --mng-square-brackets: #da70b9;
    --mng-keyword: #dcdcaa;
    --mng-dashes: #ddd;
  }
}`;
