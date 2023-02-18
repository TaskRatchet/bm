export {};

declare global {
  interface Array<T> {
    // WORKAROUND: https://github.com/microsoft/TypeScript/issues/48829#issuecomment-1295493436
    findLast(predicate: (search: T) => boolean): T | undefined;
  }
}
