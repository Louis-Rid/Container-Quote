export type Steps = 1 | 2 | 3 | 4;
export type ContainerSize = "8ft" | "12ft" | "16ft";

export type PricingMap = {
  [key in ContainerSize]: number;
};

export interface QuoteForm {
  fromLocation: string;
  toLocation: string;
  containerSize: ContainerSize;
  durationWeeks: number;
}

export interface FormResults {
  baseCost: number;
  deliveryFee: number;
  total: number;
}
