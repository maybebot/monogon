import { describe, expect, it } from "vitest";
import yamlModule from "../../modules/yaml.js";

describe("yaml module", () => {
  it("has no format function", () => {
    expect((yamlModule as { format?: unknown }).format).toBeUndefined();
  });

  describe("definitions", () => {
    it("has expected token types", () => {
      const keys = Object.keys(yamlModule.definitions);
      expect(keys).toEqual(
        expect.arrayContaining(["any", "boolean", "key", "value", "comment", "keyword"]),
      );
    });

    it("each definition has a regex and css property", () => {
      for (const [, def] of Object.entries(yamlModule.definitions)) {
        expect(def.regex).toBeInstanceOf(RegExp);
        expect(typeof def.css).toBe("string");
        expect(def.css).toMatch(/^--mng-/);
      }
    });

    it("comment regex matches # comments", () => {
      const regex = new RegExp(yamlModule.definitions.comment.regex.source, "g");
      expect("# this is a comment".match(regex)).not.toBeNull();
    });

    it("boolean regex matches YAML booleans", () => {
      const regex = new RegExp(yamlModule.definitions.boolean.regex.source, "gi");
      const matches = "enabled: true\narchived: OFF".match(regex);
      expect(matches).toEqual(expect.arrayContaining(["true", "OFF"]));
    });

    it("null regex matches null and tilde", () => {
      const regex = new RegExp(yamlModule.definitions.null.regex.source, "g");
      const matches = "a: null\nb: ~".match(regex);
      expect(matches).toEqual(expect.arrayContaining(["null", "~"]));
    });

    it("number regex matches integers, decimals and scientific notation", () => {
      const regex = new RegExp(yamlModule.definitions.number.regex.source, "g");
      const matches = "a: 42\nb: 3.14\nc: -1e3".match(regex);
      expect(matches).toEqual(expect.arrayContaining(["42", "3.14", "-1e3"]));
    });

    it("string regex matches quoted strings", () => {
      const regex = new RegExp(yamlModule.definitions.string.regex.source, "g");
      const matches = "title: 'hello'\nsubtitle: \"world\"".match(regex);
      expect(matches).toEqual(expect.arrayContaining(["'hello'", '"world"']));
    });

    it("key regex matches yaml keys", () => {
      const regex = new RegExp(yamlModule.definitions.key.regex.source, "gm");
      const matches = "name: value\n- item: 1".match(regex);
      expect(matches).toEqual(expect.arrayContaining(["name", "- item"]));
    });

    it("value regex matches text after colon", () => {
      const regex = new RegExp(yamlModule.definitions.value.regex.source, "gm");
      const matches = "key: somevalue # comment".match(regex);
      expect(matches?.[0]?.trim()).toBe("somevalue");
    });
  });
});
