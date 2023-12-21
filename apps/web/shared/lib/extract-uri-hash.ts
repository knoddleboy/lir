/**
 * Extracts the hash portion from a given URI string.
 *
 * @param {string} input - The input URI string from which to extract the hash.
 * @returns {string|null} The extracted hash if found, or null if no hash is present.
 * @example
 * const uriWithHash = "https://example.com/page-clqfm5nv8010pbtw6av9id0t2";
 * const hash = extractURIHash(uriWithHash);
 * console.log(hash); // Output: "clqfm5nv8010pbtw6av9id0t2"
 */
export function extractURIHash(input: string): string | null {
  const lastDashIndex = input.lastIndexOf("-");

  if (lastDashIndex !== -1) {
    return input.slice(lastDashIndex + 1);
  } else {
    return null;
  }
}
