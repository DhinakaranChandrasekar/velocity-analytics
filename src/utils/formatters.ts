/**
 * Format large numbers to readable format
 * 1500 -> "1.5K"
 * 1500000 -> "1.5M"
 */
export function formatNumber(value: number, decimals: number = 1): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(decimals) + "M";
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(decimals) + "K";
  }
  return Math.round(value).toString();
}

/**
 * Format currency values
 * 1500 -> "$1.5K"
 * 1500000 -> "$1.5M"
 */
export function formatCurrency(value: number, decimals: number = 1): string {
  return "$" + formatNumber(value, decimals);
}
