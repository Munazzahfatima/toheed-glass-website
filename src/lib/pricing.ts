export type PricingType = "PER_SQFT" | "FIXED";

export function calculateProductCost(params: {
  pricingType: PricingType;
  pricePerSqft?: number | null;
  fixedPrice?: number | null;
  widthInches?: number | null;
  heightInches?: number | null;
}) {
  const { pricingType, pricePerSqft, fixedPrice, widthInches, heightInches } = params;

  if (pricingType === "FIXED") {
    return fixedPrice || 0;
  }

  if (!widthInches || !heightInches || !pricePerSqft) return 0;

  const sqft = (widthInches * heightInches) / 144;
  return Math.round(sqft * pricePerSqft);
}

export function calculateDeliveryCost(params: {
  cityRate?: number | null;
  defaultRate: number;
  freeThreshold: number;
  subtotal: number;
}) {
  const { cityRate, defaultRate, freeThreshold, subtotal } = params;
  if (freeThreshold > 0 && subtotal >= freeThreshold) return 0;
  return cityRate ?? defaultRate;
}

export function formatPKR(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderNumber() {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `NTG-${y}${m}-${rand}`;
}
