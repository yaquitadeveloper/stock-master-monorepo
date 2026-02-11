import { describe, expect, it } from "bun:test";
import { Money } from "./money";

describe("Money", () => {
  describe("creation", () => {
    it("should create with amount and currency", () => {
      const money = new Money(100, "USD");
      
      expect(money.amount).toBe(100);
      expect(money.currency).toBe("USD");
    });

    it("should default currency to PEN", () => {
      const money = new Money(100);
      
      expect(money.currency).toBe("PEN");
    });

    it("should throw error when amount is negative", () => {
      expect(() => new Money(-100)).toThrow("Amount cannot be negative");
    });
  });

  describe("add", () => {
    it("should add 100 + 50 = 150", () => {
      const money1 = new Money(100);
      const money2 = new Money(50);
      
      const result = money1.add(money2);
      
      expect(result.amount).toBe(150);
      expect(result.currency).toBe("PEN");
      expect(result).not.toBe(money1);
    });
  });

  describe("subtract", () => {
    it("should subtract 100 - 30 = 70", () => {
      const money1 = new Money(100);
      const money2 = new Money(30);
      
      const result = money1.subtract(money2);
      
      expect(result.amount).toBe(70);
      expect(result.currency).toBe("PEN");
    });

    it("should throw error if result is negative", () => {
      const money1 = new Money(30);
      const money2 = new Money(100);
      
      expect(() => money1.subtract(money2)).toThrow("Insufficient amount for subtraction");
    });
  });

  describe("multiply", () => {
    it("should multiply 25 * 4 = 100", () => {
      const money = new Money(25);
      
      const result = money.multiply(4);
      
      expect(result.amount).toBe(100);
      expect(result.currency).toBe("PEN");
    });
  });

  describe("equals", () => {
    it("should return true for same amount and currency", () => {
      const money1 = new Money(100);
      const money2 = new Money(100);
      
      expect(money1.equals(money2)).toBe(true);
    });

    it("should return false for different amount", () => {
      const money1 = new Money(100);
      const money2 = new Money(50);
      
      expect(money1.equals(money2)).toBe(false);
    });

    it("should return false for different currency", () => {
      const money1 = new Money(100, "PEN");
      const money2 = new Money(100, "USD");
      
      expect(money1.equals(money2)).toBe(false);
    });
  });

  describe("greaterThan", () => {
    it("should return true when 100 > 50", () => {
      const money1 = new Money(100);
      const money2 = new Money(50);
      
      expect(money1.greaterThan(money2)).toBe(true);
    });

    it("should return false when 50 > 100", () => {
      const money1 = new Money(50);
      const money2 = new Money(100);
      
      expect(money1.greaterThan(money2)).toBe(false);
    });

    it("should throw error when comparing different currencies", () => {
      const money1 = new Money(100, "PEN");
      const money2 = new Money(50, "USD");
      
      expect(() => money1.greaterThan(money2)).toThrow("Cannot compare different currencies");
    });
  });
});
