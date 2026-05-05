import { describe, expect, it } from 'vitest';
import yamlModule from '../../modules/yaml.js';

describe('yaml module', () => {
  it('has no format function', () => {
    expect((yamlModule as { format?: unknown }).format).toBeUndefined();
  });

  describe('definitions', () => {
    it('has expected token types', () => {
      const keys = Object.keys(yamlModule.definitions);
      expect(keys).toEqual(expect.arrayContaining(['any', 'boolean', 'key', 'value', 'comment', 'keyword']));
    });

    it('each definition has a regex and css property', () => {
      for (const [, def] of Object.entries(yamlModule.definitions)) {
        expect(def.regex).toBeInstanceOf(RegExp);
        expect(typeof def.css).toBe('string');
        expect(def.css).toMatch(/^--mng-/);
      }
    });

    it('comment regex matches # comments', () => {
      const regex = new RegExp(yamlModule.definitions.comment.regex.source, 'g');
      expect('# this is a comment'.match(regex)).not.toBeNull();
    });

    it('key regex matches yaml keys', () => {
      const regex = new RegExp(yamlModule.definitions.key.regex.source, 'gm');
      expect('name: value'.match(regex)).not.toBeNull();
    });

    it('value regex matches text after colon', () => {
      const regex = new RegExp(yamlModule.definitions.value.regex.source, 'gm');
      expect('key: somevalue'.match(regex)).not.toBeNull();
    });
  });
});
