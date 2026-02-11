export class UnitOfMeasure {
  readonly name: string;
  readonly conversionFactor: number;

  constructor(name: string, conversionFactor: number) {
    if (conversionFactor <= 0) {
      throw new Error("Conversion factor must be greater than 0");
    }
    this.name = name;
    this.conversionFactor = conversionFactor;
  }

  toBaseUnit(quantity: number): number {
    return quantity * this.conversionFactor;
  }

  fromBaseUnit(baseQuantity: number): number {
    return baseQuantity / this.conversionFactor;
  }
}
