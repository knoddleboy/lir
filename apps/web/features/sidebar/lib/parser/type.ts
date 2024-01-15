export interface FileParser<T> {
  content: T;
  parse: () => unknown;
}
