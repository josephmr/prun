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
