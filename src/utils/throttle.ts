export function throttler<T extends (...args: any[]) => void>(
  cb: T,
  ms: number,
) {
  let isWaiting = false;

  return (...args: Parameters<T>) => {
    if (isWaiting) return;

    isWaiting = true;

    try {
      cb(...args);
    } finally {
      setTimeout(() => {
        isWaiting = false;
      }, ms);
    }
  };
}
