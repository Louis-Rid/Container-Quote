import { type SetStateAction } from "react";

export type Location = {
  formattedAddress: string;
  lat: number;
  lng: number;
};

export type Steps = 1 | 2 | 3 | 4;
export type ContainerSize = "" | "8ft" | "12ft" | "16ft";

export type PricingMap = {
  [key in ContainerSize]: number;
};
export type GoToStep = (
  nextStep: number,
  direction: "forward" | "back",
) => void;

export interface AnimationProps {
  goToStepRef: React.RefObject<GoToStep | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setDisplayPosition: React.Dispatch<SetStateAction<number>>;
  isAnimating: React.RefObject<boolean>;
}

export interface QuoteForm {
  fromLocation: Location;
  toLocation: Location;
  containerSize: ContainerSize;
  durationWeeks: number;
  distanceMiles: number;
}

export interface FormResults {
  baseCost: string;
  deliveryFee: string;
  durationFee: string;
  total: string;
}
