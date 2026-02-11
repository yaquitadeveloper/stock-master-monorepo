import { describe, expect, it } from "bun:test";
import { UnitOfMeasure } from "./unit-of-measure";

describe("UnitOfMeasure", () => {
  describe("creation", () => {
    it("should create with valid factor", () => {
      const uom = new UnitOfMeasure("caja", 24);
      
      expect(uom.name).toBe("caja");
      expect(uom.conversionFactor).toBe(24);
    });

    it("should throw error when factor is 0", () => {
      expect(() => new UnitOfMeasure("caja", 0)).toThrow("Conversion factor must be greater than 0");
    });

    it("should throw error when factor is negative", () => {
      expect(() => new UnitOfMeasure("caja", -5)).toThrow("Conversion factor must be greater than 0");
    });
  });

  describe("toBaseUnit", () => {
    it("should convert 1 caja (factor 24) to 24 base units", () => {
      const caja = new UnitOfMeasure("caja", 24);
      
      expect(caja.toBaseUnit(1)).toBe(24);
    });

    it("should convert 3 cajas to 72 base units", () => {
      const caja = new UnitOfMeasure("caja", 24);
      
      expect(caja.toBaseUnit(3)).toBe(72);
    });

    it("should convert 1 docena (factor 12) to 12 base units", () => {
      const docena = new UnitOfMeasure("docena", 12);
      
      expect(docena.toBaseUnit(1)).toBe(12);
    });
  });

  describe("fromBaseUnit", () => {
    it("should convert 24 base units to 1 caja", () => {
      const caja = new UnitOfMeasure("caja", 24);
      
      expect(caja.fromBaseUnit(24)).toBe(1);
    });

    it("should convert 72 base units to 3 cajas", () => {
      const caja = new UnitOfMeasure("caja", 24);
      
      expect(caja.fromBaseUnit(72)).toBe(3);
    });

    it("should convert 25 base units to ~1.04 cajas", () => {
      const caja = new UnitOfMeasure("caja", 24);
      
      expect(caja.fromBaseUnit(25)).toBeCloseTo(1.04, 2);
    });
  });
});
