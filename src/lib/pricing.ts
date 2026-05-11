import type { QuoteForm, FormResults, PricingMap } from "@/types";
const BASE_PRICES: PricingMap = {
  "": 0,
  "8ft": 14900,
  "12ft": 18900,
  "16ft": 22500,
};

const WEEKLY_RATE = 10000;
function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function getPrice(quote: QuoteForm): FormResults {
  const baseCost = BASE_PRICES[quote.containerSize];
  const deliveryFee = quote.distanceMiles * 125;
  const durationFee = quote.durationWeeks * WEEKLY_RATE;
  const total = baseCost + deliveryFee + durationFee;
  const baseCostFormatted = formatPrice(BASE_PRICES[quote.containerSize]);
  const deliveryFeeFormatted = formatPrice(quote.distanceMiles * 125);
  const durationFeeFormatted = formatPrice(quote.durationWeeks * WEEKLY_RATE);
  const totalFormatted = formatPrice(total);

  return {
    baseCost: baseCostFormatted,
    deliveryFee: deliveryFeeFormatted,
    durationFee: durationFeeFormatted,
    total: totalFormatted,
  };
}
