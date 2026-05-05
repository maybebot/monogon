import { describe, expect, it, vi } from 'vitest';
import { getModule } from '../modules.js';

// silence console output from monoLog during tests
vi.spyOn(console, 'warn').mockImplementation(() => {});
vi.spyOn(console, 'error').mockImplementation(() => {});

describe('getModule()', () => {
  it('returns the json module for "json"', async () => {
    const mod = await getModule('json');
    expect(mod.definitions).toBeDefined();
    expect(typeof mod.format).toBe('function');
  });

  it('returns the yaml module for "yaml"', async () => {
    const mod = await getModule('yaml');
    expect(mod.definitions).toBeDefined();
    expect(Object.keys(mod.definitions)).toContain('key');
  });

  it('returns the css module for "css"', async () => {
    const mod = await getModule('css');
    expect(mod.definitions).toBeDefined();
    expect(Object.keys(mod.definitions)).toContain('property');
  });

  it('returns the plaintext module for "plaintext"', async () => {
    const mod = await getModule('plaintext');
    expect(Object.keys(mod.definitions)).toEqual(['any']);
  });

  it('falls back to plaintext for an unsupported language', async () => {
    const mod = await getModule('cobol');
    expect(Object.keys(mod.definitions)).toEqual(['any']);
  });

  it('falls back to plaintext for an empty string', async () => {
    const mod = await getModule('');
    expect(Object.keys(mod.definitions)).toEqual(['any']);
  });
});
