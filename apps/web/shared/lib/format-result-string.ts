/**
 * Formats a number and appends the appropriate suffix based on the number.
 *
 * If the number ends in 1 (except for 11), it returns the singular form "result".
 * Otherwise, it returns the plural form "results".
 *
 * @param {number} n - The number to be formatted.
 * @returns {string} The formatted string with the appropriate suffix.
 *
 * @example
 * formatResultString(0); // Returns "0 results"
 * formatResultString(11); // Returns "11 results"
 * formatResultString(31); // Returns "31 result"
 */
export function formatResultString(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) {
    return `${n} result`;
  }

  return `${n} results`;
}
