import { describe, expect, it } from 'vitest';
import cssModule from '../../modules/css.js';

const withGlobalFlag = (regex: RegExp) => {
  const flags = regex.flags.includes('g') ? regex.flags : `${regex.flags}g`;
  return new RegExp(regex.source, flags);
};

describe('css module', () => {
  it('has no format function', () => {
    expect((cssModule as { format?: unknown }).format).toBeUndefined();
  });

  describe('definitions', () => {
    it('has expected token types', () => {
      const keys = Object.keys(cssModule.definitions);
      expect(keys).toEqual(
        expect.arrayContaining(['any', 'property', 'value', 'dashes', 'parenthesis', 'keyword', 'comment', 'symbol']),
      );
    });

    it('each definition has a regex and css property', () => {
      for (const [, def] of Object.entries(cssModule.definitions)) {
        expect(def.regex).toBeInstanceOf(RegExp);
        expect(typeof def.css).toBe('string');
        expect(def.css).toMatch(/^--mng-/);
      }
    });

    it('comment regex matches block comments', () => {
      const regex = withGlobalFlag(cssModule.definitions.comment.regex);
      expect('/* a comment */'.match(regex)).not.toBeNull();
    });

    it('dashes regex matches --', () => {
      const regex = withGlobalFlag(cssModule.definitions.dashes.regex);
      expect('--my-var'.match(regex)).not.toBeNull();
    });

    it('keyword regex matches var()', () => {
      const regex = withGlobalFlag(cssModule.definitions.keyword.regex);
      expect('var(--color)'.match(regex)).not.toBeNull();
    });

    it('symbol regex matches semicolons', () => {
      const regex = withGlobalFlag(cssModule.definitions.symbol.regex);
      expect('color: red;'.match(regex)).not.toBeNull();
    });

    it('property regex matches declaration names', () => {
      const regex = withGlobalFlag(cssModule.definitions.property.regex);
      const matches = 'a { color: red; --accent: #fff; }'.match(regex);
      expect(matches).toEqual(expect.arrayContaining(['color', '--accent']));
    });

    it('value regex matches declaration values', () => {
      const regex = withGlobalFlag(cssModule.definitions.value.regex);
      const matches = 'a { color: red; width: 10px; }'.match(regex);
      expect(matches?.map((m) => m.trim())).toEqual(expect.arrayContaining(['red', '10px']));
    });

    it('number regex matches units and decimals', () => {
      const regex = withGlobalFlag(cssModule.definitions.number.regex);
      const matches = 'width: 10px; opacity: 0.4;'.match(regex);
      expect(matches).toEqual(expect.arrayContaining(['10px', '0.4']));
    });

    it('parenthesis regex matches function parentheses', () => {
      const regex = withGlobalFlag(cssModule.definitions.parenthesis.regex);
      const matches = 'var(--color)'.match(regex);
      expect(matches).toEqual(['(', ')']);
    });

    it('atRule regex matches at-rules', () => {
      const regex = withGlobalFlag(cssModule.definitions.atRule.regex);
      const matches = '@media (min-width: 800px)'.match(regex);
      expect(matches).toEqual(['@media']);
    });
  });
});
