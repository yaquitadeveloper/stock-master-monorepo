import { describe, expect, it } from "bun:test";
import { Sku } from "./sku";

describe("Sku", () => {
  describe("creation and normalization", () => {
    it("should convert SKU to uppercase", () => {
      const sku = new Sku("prod-001");
      expect(sku.value).toBe("PROD-001");
    });

    it("should keep uppercase SKU unchanged", () => {
      const sku = new Sku("PROD-001");
      expect(sku.value).toBe("PROD-001");
    });

    it("should normalize mixed case to uppercase", () => {
      const sku = new Sku("PrOd-123-Aa");
      expect(sku.value).toBe("PROD-123-AA");
    });

    it("should accept underscores", () => {
      const sku = new Sku("PROD_001-ABC");
      expect(sku.value).toBe("PROD_001-ABC");
    });

    it("should accept mixed hyphens and underscores", () => {
      const sku = new Sku("prod_001-abc_def");
      expect(sku.value).toBe("PROD_001-ABC_DEF");
    });

    it("should accept numbers only", () => {
      const sku = new Sku("123456");
      expect(sku.value).toBe("123456");
    });

    it("should accept letters only", () => {
      const sku = new Sku("ABCDEF");
      expect(sku.value).toBe("ABCDEF");
    });

    it("should accept exactly 50 characters", () => {
      const fiftyChars = "A".repeat(50);
      const sku = new Sku(fiftyChars);
      expect(sku.value).toBe(fiftyChars);
    });
  });

  describe("validation errors", () => {
    it("should throw error for empty string", () => {
      expect(() => new Sku("")).toThrow("SKU cannot be empty");
    });

    it("should throw error for only spaces", () => {
      expect(() => new Sku("   ")).toThrow("SKU cannot be empty");
    });

    it("should throw error for null", () => {
      expect(() => new Sku(null as unknown as string)).toThrow();
    });

    it("should throw error for undefined", () => {
      expect(() => new Sku(undefined as unknown as string)).toThrow();
    });

    it("should throw error for @ symbol", () => {
      expect(() => new Sku("PROD@001")).toThrow("Invalid SKU format");
    });

    it("should throw error for spaces in SKU", () => {
      expect(() => new Sku("PROD 001")).toThrow("Invalid SKU format");
    });

    it("should throw error for dot", () => {
      expect(() => new Sku("PROD.001")).toThrow("Invalid SKU format");
    });

    it("should throw error for special characters", () => {
      expect(() => new Sku("PROD#001")).toThrow("Invalid SKU format");
    });

    it("should throw error for exclamation", () => {
      expect(() => new Sku("PROD!001")).toThrow("Invalid SKU format");
    });

    it("should throw error for dollar sign", () => {
      expect(() => new Sku("PROD$001")).toThrow("Invalid SKU format");
    });

    it("should throw error for percent", () => {
      expect(() => new Sku("PROD%001")).toThrow("Invalid SKU format");
    });

    it("should throw error for ampersand", () => {
      expect(() => new Sku("PROD&001")).toThrow("Invalid SKU format");
    });

    it("should throw error for asterisk", () => {
      expect(() => new Sku("PROD*001")).toThrow("Invalid SKU format");
    });

    it("should throw error for parentheses", () => {
      expect(() => new Sku("PROD(001)")).toThrow("Invalid SKU format");
    });

    it("should throw error for plus sign", () => {
      expect(() => new Sku("PROD+001")).toThrow("Invalid SKU format");
    });

    it("should throw error for equals sign", () => {
      expect(() => new Sku("PROD=001")).toThrow("Invalid SKU format");
    });

    it("should throw error for brackets", () => {
      expect(() => new Sku("PROD[001]")).toThrow("Invalid SKU format");
    });

    it("should throw error for curly braces", () => {
      expect(() => new Sku("PROD{001}")).toThrow("Invalid SKU format");
    });

    it("should throw error for pipe", () => {
      expect(() => new Sku("PROD|001")).toThrow("Invalid SKU format");
    });

    it("should throw error for backslash", () => {
      expect(() => new Sku("PROD\\001")).toThrow("Invalid SKU format");
    });

    it("should throw error for forward slash", () => {
      expect(() => new Sku("PROD/001")).toThrow("Invalid SKU format");
    });

    it("should throw error for colon", () => {
      expect(() => new Sku("PROD:001")).toThrow("Invalid SKU format");
    });

    it("should throw error for semicolon", () => {
      expect(() => new Sku("PROD;001")).toThrow("Invalid SKU format");
    });

    it("should throw error for comma", () => {
      expect(() => new Sku("PROD,001")).toThrow("Invalid SKU format");
    });

    it("should throw error for less than", () => {
      expect(() => new Sku("PROD<001")).toThrow("Invalid SKU format");
    });

    it("should throw error for greater than", () => {
      expect(() => new Sku("PROD>001")).toThrow("Invalid SKU format");
    });

    it("should throw error for question mark", () => {
      expect(() => new Sku("PROD?001")).toThrow("Invalid SKU format");
    });

    it("should throw error for 51 characters (over limit)", () => {
      const fiftyOneChars = "A".repeat(51);
      expect(() => new Sku(fiftyOneChars)).toThrow("SKU too long");
    });

    it("should throw error for very long string", () => {
      const longString = "PROD-" + "A".repeat(100);
      expect(() => new Sku(longString)).toThrow("SKU too long");
    });
  });

  describe("comparison", () => {
    it("should return true when SKUs are equal", () => {
      const sku1 = new Sku("PROD-001");
      const sku2 = new Sku("PROD-001");
      expect(sku1.equals(sku2)).toBe(true);
    });

    it("should return true when SKUs are equal after normalization", () => {
      const sku1 = new Sku("prod-001");
      const sku2 = new Sku("PROD-001");
      expect(sku1.equals(sku2)).toBe(true);
    });

    it("should return true for different case variations", () => {
      const sku1 = new Sku("PrOd-123");
      const sku2 = new Sku("prod-123");
      const sku3 = new Sku("PROD-123");
      expect(sku1.equals(sku2)).toBe(true);
      expect(sku2.equals(sku3)).toBe(true);
      expect(sku1.equals(sku3)).toBe(true);
    });

    it("should return false when SKUs are different", () => {
      const sku1 = new Sku("PROD-001");
      const sku2 = new Sku("PROD-002");
      expect(sku1.equals(sku2)).toBe(false);
    });

    it("should return false for completely different SKUs", () => {
      const sku1 = new Sku("ABC-123");
      const sku2 = new Sku("XYZ-789");
      expect(sku1.equals(sku2)).toBe(false);
    });
  });

  describe("toString", () => {
    it("should return the SKU value", () => {
      const sku = new Sku("PROD-001");
      expect(sku.toString()).toBe("PROD-001");
    });

    it("should return normalized value", () => {
      const sku = new Sku("prod-001");
      expect(sku.toString()).toBe("PROD-001");
    });
  });

  describe("trim handling", () => {
    it("should trim leading spaces", () => {
      const sku = new Sku("  PROD-001");
      expect(sku.value).toBe("PROD-001");
    });

    it("should trim trailing spaces", () => {
      const sku = new Sku("PROD-001  ");
      expect(sku.value).toBe("PROD-001");
    });

    it("should trim both leading and trailing spaces", () => {
      const sku = new Sku("  PROD-001  ");
      expect(sku.value).toBe("PROD-001");
    });

    it("should throw error when only spaces after trim", () => {
      expect(() => new Sku("     ")).toThrow("SKU cannot be empty");
    });
  });

  describe("edge cases", () => {
    it("should accept single character", () => {
      const sku = new Sku("A");
      expect(sku.value).toBe("A");
    });

    it("should accept single number", () => {
      const sku = new Sku("1");
      expect(sku.value).toBe("1");
    });

    it("should accept single hyphen", () => {
      const sku = new Sku("-");
      expect(sku.value).toBe("-");
    });

    it("should accept single underscore", () => {
      const sku = new Sku("_");
      expect(sku.value).toBe("_");
    });

    it("should accept SKU starting with hyphen", () => {
      const sku = new Sku("-PROD001");
      expect(sku.value).toBe("-PROD001");
    });

    it("should accept SKU starting with underscore", () => {
      const sku = new Sku("_PROD001");
      expect(sku.value).toBe("_PROD001");
    });

    it("should accept SKU ending with hyphen", () => {
      const sku = new Sku("PROD001-");
      expect(sku.value).toBe("PROD001-");
    });

    it("should accept SKU ending with underscore", () => {
      const sku = new Sku("PROD001_");
      expect(sku.value).toBe("PROD001_");
    });

    it("should accept multiple consecutive hyphens", () => {
      const sku = new Sku("PROD--001");
      expect(sku.value).toBe("PROD--001");
    });

    it("should accept multiple consecutive underscores", () => {
      const sku = new Sku("PROD__001");
      expect(sku.value).toBe("PROD__001");
    });

    it("should accept mixed hyphens and underscores together", () => {
      const sku = new Sku("-_-PROD-_-001-_-");
      expect(sku.value).toBe("-_-PROD-_-001-_-");
    });
  });
});
