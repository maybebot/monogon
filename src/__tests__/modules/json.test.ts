import { describe, expect, it } from "vitest";
import jsonModule from "../../modules/json.js";

describe("json module", () => {
  describe("definitions", () => {
    it("has a definition for every expected token type", () => {
      const keys = Object.keys(jsonModule.definitions);
      expect(keys).toEqual(
        expect.arrayContaining([
          "any",
          "number",
          "boolean",
          "null",
          "objectBrackets",
          "arrayBrackets",
          "string",
          "key",
        ]),
      );
    });

    it("each definition has a regex and css property", () => {
      for (const [, def] of Object.entries(jsonModule.definitions)) {
        expect(def.regex).toBeInstanceOf(RegExp);
        expect(typeof def.css).toBe("string");
        expect(def.css).toMatch(/^--mng-/);
      }
    });

    it("number regex matches integers", () => {
      expect("42".match(jsonModule.definitions.number.regex)).not.toBeNull();
    });

    it("number regex matches floats", () => {
      expect("3.14".match(jsonModule.definitions.number.regex)).not.toBeNull();
    });

    it("number regex matches negative numbers", () => {
      expect("-7".match(jsonModule.definitions.number.regex)).not.toBeNull();
    });

    it("number regex matches exponent notation", () => {
      expect("6.02e23".match(jsonModule.definitions.number.regex)).not.toBeNull();
    });

    it("number regex does not match numeric text inside words", () => {
      const regex = new RegExp(jsonModule.definitions.number.regex.source, "g");
      const matches = "id123 value".match(regex);
      expect(matches).toBeNull();
    });

    it("boolean regex matches true and false", () => {
      expect("true".match(jsonModule.definitions.boolean.regex)).not.toBeNull();
      expect("false".match(jsonModule.definitions.boolean.regex)).not.toBeNull();
    });

    it("boolean regex does not match partial words", () => {
      const regex = new RegExp(jsonModule.definitions.boolean.regex.source, "g");
      const matches = "trueish falsehood".match(regex);
      expect(matches).toBeNull();
    });

    it("null regex matches null keyword", () => {
      expect("null".match(jsonModule.definitions.null.regex)).not.toBeNull();
    });

    it("string regex matches double-quoted strings", () => {
      expect('"hello"'.match(jsonModule.definitions.string.regex)).not.toBeNull();
    });

    it("string regex matches strings with escaped quotes", () => {
      expect('"say \\"hi\\""'.match(jsonModule.definitions.string.regex)).not.toBeNull();
    });

    it("key regex matches JSON object keys", () => {
      expect('"name":'.match(jsonModule.definitions.key.regex)).not.toBeNull();
    });
  });

  describe("format()", () => {
    it("pretty-prints valid JSON", () => {
      const input = '{"a":1,"b":2}';
      const output = jsonModule.format!(input);
      expect(output).toBe(JSON.stringify({ a: 1, b: 2 }, null, 2));
    });

    it("returns original content for invalid JSON", () => {
      const input = "{invalid json}";
      const output = jsonModule.format!(input);
      expect(output).toBe(input);
    });

    it("handles empty object", () => {
      expect(jsonModule.format!("{}")).toBe("{}");
    });

    it("handles arrays", () => {
      const input = "[1,2,3]";
      const output = jsonModule.format!(input);
      expect(output).toBe(JSON.stringify([1, 2, 3], null, 2));
    });
  });
});
