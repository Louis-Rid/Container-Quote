import type { QuoteForm, FormResults, PricingMap } from "@/types";
const BASE_PRICES: PricingMap = {
  "8ft": 14900,
  "12ft": 18900,
  "16ft": 22500,
};

const WEEKLY_RATE = 10000;

export function getResults(quote: QuoteForm): FormResults {
  const baseCost = BASE_PRICES[quote.containerSize];
  const deliveryFee = quote.distanceMiles * 125;
  const waitingFee = quote.durationWeeks * WEEKLY_RATE;

  return {
    baseCost,
    deliveryFee,
    waitingFee,
    total: baseCost + deliveryFee + waitingFee,
  };
}
