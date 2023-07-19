/**
 * Returns a pair of a Promise, and a flagger function that can be passed
 * around to resolve the promise "from anywhere".
 *
 * The Promise will remain unresolved, until the flagger function is called.
 * Once the flagger function is called with a value, the Promise will resolve
 * to that value.
 *
 * Calling the flagger function beyond the first time is a no-op.
 */
export function controlledPromise<T>(): [
  resolver: (value: T) => void,
  promise: Promise<T>,
] {
  let resolverFn: ((value: T) => void) | undefined;
  const promise = new Promise<T>((res) => {
    resolverFn = res;
  });
  if (!resolverFn) {
    throw new Error("Should never happen");
  }
  return [resolverFn, promise];
}
