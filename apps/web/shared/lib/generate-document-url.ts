/**
 * Generates a document URL based on the provided parameters.
 * Internally uses the `Lir_encodeURIComponent` function to encode the title.
 *
 * @param {string|null|undefined} title - The title of the document.
 * @param {string} id - The unique identifier for the document.
 * @param {string} [prefix="/d"] - The prefix to be used in the URL (default is "/d").
 * @returns {string} The generated document URL.
 *
 * @example
 * // Example 1:
 * const url1 = generateDocumentUrl("My Document!", "123");
 * // Result: "/d/My-Document-123"
 *
 * // Example 2:
 * const url2 = generateDocumentUrl(null, "456", "/docs");
 * // Result: "/docs/Untitled-456"
 */
export function generateDocumentURL(
  title: string | null | undefined,
  id: string,
  prefix: string = "/d"
): string {
  // Comment for now. Dynamic route changes via useRouter (next/navigation) cause hard-reloads.
  // This is a highly unwanted behaviour since a new instance of the editor is created for
  // the same document. So for now just ignore title-in-pathname feature and return just doc's id.

  // const titleUrl = Lir_encodeURIComponent(title);
  // const documentUrl = `${prefix}/${titleUrl ?? "Untitled"}-${id}`;
  // return documentUrl;

  return `${prefix}/${id}`;
}
