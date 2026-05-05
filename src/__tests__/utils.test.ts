import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getRanges, transformModule } from '../utils.js';

describe('getRanges()', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('code');
    element.textContent = 'hello world hello';
  });

  it('returns an empty array when the text content does not match', () => {
    const ranges = getRanges(/nomatch/g, element);
    expect(ranges).toEqual([]);
  });

  it('returns one Range per match', () => {
    const ranges = getRanges(/hello/g, element);
    expect(ranges).toHaveLength(2);
  });

  it('returns Range objects', () => {
    const ranges = getRanges(/hello/g, element);
    for (const range of ranges) {
      expect(range).toBeInstanceOf(Range);
    }
  });

  it('each range spans the matched text', () => {
    const ranges = getRanges(/world/g, element);
    expect(ranges).toHaveLength(1);
    expect(ranges[0].toString()).toBe('world');
  });

  it('matches are case-insensitive due to toLowerCase()', () => {
    element.textContent = 'Hello World';
    // regex is already lowercase to match lowercased content
    const ranges = getRanges(/hello/g, element);
    expect(ranges).toHaveLength(1);
  });
});

describe('transformModule()', () => {
  let element: HTMLElement;
  const mockHighlightSet = vi.fn();

  beforeEach(() => {
    element = document.createElement('code');
    element.textContent = '{"key": 123}';

    vi.stubGlobal('CSS', { highlights: { set: mockHighlightSet } });
    vi.stubGlobal(
      'Highlight',
      class {
        constructor(..._ranges: Range[]) {}
      },
    );
    mockHighlightSet.mockClear();
  });

  it('returns one entry per definition', () => {
    const definitions = {
      number: { regex: /\d+/g, css: '--mng-number' },
      string: { regex: /"[^"]*"/g, css: '--mng-string' },
    };
    const result = transformModule(definitions, element, 'test-scope');
    expect(result).toHaveLength(2);
  });

  it('each entry has apply() and css properties', () => {
    const definitions = { any: { regex: /.*/g, css: '--mng-text' } };
    const result = transformModule(definitions, element, 'scope');
    expect(typeof result[0].apply).toBe('function');
    expect(typeof result[0].css).toBe('string');
  });

  it('css contains the highlight name and scope', () => {
    const definitions = { keyword: { regex: /null/g, css: '--mng-null' } };
    const result = transformModule(definitions, element, 'abc');
    expect(result[0].css).toContain('keyword-abc');
    expect(result[0].css).toContain('--mng-null');
  });

  it('apply() calls CSS.highlights.set with the scoped name', () => {
    const definitions = { number: { regex: /\d+/g, css: '--mng-number' } };
    const result = transformModule(definitions, element, 'myscope');
    result[0].apply();
    expect(mockHighlightSet).toHaveBeenCalledWith('number-myscope', expect.anything());
  });
});
