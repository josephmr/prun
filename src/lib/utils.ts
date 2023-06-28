export function round(num: number) {
  if (num === null) {
    return Number.NaN;
  }
  if (num >= 100) {
    return Math.round(num);
  } else {
    return num.toPrecision(3);
  }
}

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
