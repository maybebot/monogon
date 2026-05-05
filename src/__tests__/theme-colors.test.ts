import { beforeEach, describe, expect, it, vi } from 'vitest';
import { css, cssProps } from '../theme.js';
import { transformModule } from '../utils.js';
import jsonModule from '../modules/json.js';
import yamlModule from '../modules/yaml.js';
import cssModule from '../modules/css.js';
import plaintextModule from '../modules/plaintext.js';

const allDefinitions = [
  jsonModule.definitions,
  yamlModule.definitions,
  cssModule.definitions,
  plaintextModule.definitions,
];

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('syntax highlight color contract', () => {
  beforeEach(() => {
    vi.stubGlobal('CSS', { highlights: { set: vi.fn() } });
    vi.stubGlobal(
      'Highlight',
      class {
        constructor(..._ranges: Range[]) {}
      },
    );
  });

  it('module definitions only reference declared theme CSS variables', () => {
    const allowedCssVars = new Set(Object.values(cssProps));

    for (const definitions of allDefinitions) {
      for (const definition of Object.values(definitions)) {
        expect(allowedCssVars.has(definition.css)).toBe(true);
      }
    }
  });

  it('theme declares every CSS variable in both light and dark sections', () => {
    for (const cssVar of Object.values(cssProps)) {
      const count = css.match(new RegExp(`${escapeRegex(cssVar)}\\s*:`, 'g'))?.length ?? 0;
      expect(count).toBeGreaterThanOrEqual(2);
    }
  });

  it('transformModule emits ::highlight rules that use var(--mng-*) colors', () => {
    const codeNode = document.createElement('code');
    codeNode.textContent = '{"name": "monogon", "ok": true, "count": 1}';

    const transformed = transformModule(jsonModule.definitions, codeNode, 'scope123');
    const emittedCss = transformed.map((entry) => entry.css).join(' ');

    expect(emittedCss).toContain('::highlight(number-scope123)');
    expect(emittedCss).toContain('::highlight(key-scope123)');
    expect(emittedCss).toContain('color: var(--mng-number);');
    expect(emittedCss).toContain('color: var(--mng-key);');
  });
});
