/**
 * Encodes a string by replacing special characters with hyphens ("-").
 * Removes leading and trailing hyphens.
 * Omits non-English letters and replaces consecutive special characters with a single hyphen.
 *
 * @param {string|null|undefined} input - The input string to be encoded.
 * @returns {string|null|undefined} The encoded string
 *
 * @example
 * const originalString = "Hello@Світ!!!";
 * const encodedString = Lir_encodeURIComponent(originalString);
 * console.log(encodedString); // Output: "Hello-World"
 */
export function Lir_encodeURIComponent(
  input: string | null | undefined
): string | null | undefined {
  if (input == null || input === undefined) {
    return input;
  }

  let result = "";
  let consecutiveSpecial = false;

  for (let i = 0; i < input.length; ++i) {
    const char = input.charCodeAt(i);

    // Check if the character is non-English
    if (char < 32 || char > 126) {
      continue;
    }

    // Replace special characters with "-"
    if (
      (char >= 0x00 && char <= 0x2f) ||
      (char >= 0x3a && char <= 0x40) ||
      (char >= 0x5b && char <= 0x60) ||
      (char >= 0x7b && char <= 0x7e)
    ) {
      // Check for consecutive special characters
      if (!consecutiveSpecial) {
        result += "-";
        consecutiveSpecial = true;
      }
    } else {
      result += input[i];
      consecutiveSpecial = false;
    }
  }

  // Remove leading and trailing "-"
  let startIndex = 0;
  while (result[startIndex] === "-") {
    startIndex++;
  }

  let endIndex = result.length - 1;
  while (result[endIndex] === "-") {
    endIndex--;
  }

  return result.slice(startIndex, endIndex + 1);
}
