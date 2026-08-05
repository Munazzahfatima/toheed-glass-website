export function formatPKR(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);
}
