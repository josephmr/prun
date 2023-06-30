/**
 * Rounds a given number to 3 significant digits without turning into exponent notation.
 */
export function round(num: number): string {
  if (num === null) {
    return '';
  }
  if (num >= 100) {
    return Math.round(num).toString();
  } else {
    return num.toPrecision(3);
  }
}

/**
 * Returns a comparator function that can be used to sort objects by successive keys.
 */
export function sortByKeys<T>(...keys: string[]) {
  return (left: Record<string, T>, right: Record<string, T>) => {
    for (const key of keys) {
      if (left[key] < right[key]) {
        return -1;
      } else if (left[key] > right[key]) {
        return 1;
      }
    }
    return 0;
  };
}

export function reduceRecord<K extends string | number | symbol, V, T>(
  record: Record<K, V>,
  fn: (key: keyof Record<K, V>) => T
): Record<K, T> {
  let acc: any = {};
  for (const key of Object.keys(record) as K[]) {
    acc[key] = fn(key);
  }
  return acc;
}
