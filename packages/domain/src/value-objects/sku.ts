export class Sku {
  readonly value: string;

  constructor(value: string) {
    if (value === null || value === undefined) {
      throw new Error("SKU cannot be empty");
    }

    const trimmed = value.trim();

    if (trimmed.length === 0) {
      throw new Error("SKU cannot be empty");
    }

    if (trimmed.length > 50) {
      throw new Error("SKU too long");
    }

    const normalized = trimmed.toUpperCase();

    if (!/^[A-Z0-9_-]+$/.test(normalized)) {
      throw new Error("Invalid SKU format");
    }

    this.value = normalized;
  }

  equals(other: Sku): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
