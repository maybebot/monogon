import { describe, expect, it } from 'vitest';
import cssModule from '../../modules/css.js';

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
      const regex = new RegExp(cssModule.definitions.comment.regex.source, 'g');
      expect('/* a comment */'.match(regex)).not.toBeNull();
    });

    it('dashes regex matches --', () => {
      const regex = new RegExp(cssModule.definitions.dashes.regex.source, 'g');
      expect('--my-var'.match(regex)).not.toBeNull();
    });

    it('keyword regex matches var()', () => {
      const regex = new RegExp(cssModule.definitions.keyword.regex.source, 'g');
      expect('var(--color)'.match(regex)).not.toBeNull();
    });

    it('symbol regex matches semicolons', () => {
      const regex = new RegExp(cssModule.definitions.symbol.regex.source, 'g');
      expect('color: red;'.match(regex)).not.toBeNull();
    });
  });
});
