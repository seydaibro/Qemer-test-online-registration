export function FormatNumber(number?: number): string {
  if (typeof number === 'undefined') {
      return ''; // or return some default value or message
  }

  const formattedNumber = number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedNumber;
}
