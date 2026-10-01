import { describe, expect, it } from 'vitest';
import tomlModule from '../../modules/toml.js';

describe('toml module', () => {
  it('has no format function', () => {
    expect((tomlModule as { format?: unknown }).format).toBeUndefined();
  });

  it('defines the common TOML token types', () => {
    expect(Object.keys(tomlModule.definitions)).toEqual(
      expect.arrayContaining(['any', 'comment', 'section', 'key', 'string', 'boolean', 'date', 'number']),
    );
  });

  it('matches sections, dotted keys, and quoted strings', () => {
    expect('[database]'.match(tomlModule.definitions.section.regex)).toEqual(['[database]']);
    expect('server.port = 8080'.match(tomlModule.definitions.key.regex)?.[0]?.trim()).toBe('server.port');
    expect('title = "TOML"'.match(tomlModule.definitions.string.regex)).toEqual(['"TOML"']);
  });

  it('matches TOML values and comments', () => {
    expect('enabled = true'.match(tomlModule.definitions.boolean.regex)).toEqual(['true']);
    expect('published = 1979-05-27'.match(tomlModule.definitions.date.regex)).toEqual(['1979-05-27']);
    expect('count = 1_000'.match(tomlModule.definitions.number.regex)).toEqual(['1_000']);
    expect('# application settings'.match(tomlModule.definitions.comment.regex)).toEqual(['# application settings']);
  });
});
