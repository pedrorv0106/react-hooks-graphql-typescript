export function FormatDecimal(value: number, decimals: number = 1) {
  return Number(value || 0).toFixed(decimals);
}

export function FormatMoney(value: number, currency: string = '') {
  return `${new Intl.NumberFormat('de-DE').format(
    parseFloat(Number(value || 0).toFixed(2))
  )} ${currency.toUpperCase()}`;
}
