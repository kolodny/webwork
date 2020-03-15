export default function<
  T extends (...args: unknown[]) => unknown
>(
  t: T
): (
  ...args: Parameters<T>
) => ReturnType<T> extends PromiseLike<unknown> ?
  ReturnType<T> :
  Promise<ReturnType<T>>;
