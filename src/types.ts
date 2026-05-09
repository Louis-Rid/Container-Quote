export type Location = {
  formattedAddress: string;
  lat: number;
  lng: number;
};

export type Steps = 1 | 2 | 3 | 4;
export type ContainerSize = "8ft" | "12ft" | "16ft";

export type PricingMap = {
  [key in ContainerSize]: number;
};

export interface QuoteForm {
  fromLocation: Location;
  toLocation: Location;
  containerSize: ContainerSize;
  durationWeeks: number;
  distanceMiles: number;
}

export interface FormResults {
  baseCost: number;
  deliveryFee: number;
  waitingFee: number;
  total: number;
}
