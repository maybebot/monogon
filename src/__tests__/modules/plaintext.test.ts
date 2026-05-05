import { describe, expect, it } from 'vitest';
import plaintextModule from '../../modules/plaintext.js';

describe('plaintext module', () => {
  it('has no format function', () => {
    expect((plaintextModule as { format?: unknown }).format).toBeUndefined();
  });

  describe('definitions', () => {
    it('only has an "any" definition', () => {
      expect(Object.keys(plaintextModule.definitions)).toEqual(['any']);
    });

    it('"any" regex matches everything', () => {
      const regex = new RegExp(plaintextModule.definitions.any.regex.source, 'g');
      expect('anything at all 123!@#'.match(regex)).not.toBeNull();
    });

    it('"any" css points to the text color variable', () => {
      expect(plaintextModule.definitions.any.css).toBe('--mng-text');
    });
  });
});
