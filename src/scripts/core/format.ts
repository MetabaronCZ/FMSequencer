// prepends given value vith "pre" for given result string length
export const toFixedLength = (
  value: string | number,
  len: number,
  pre = '\u00A0'
): string => {
  return `${Array(len).fill(pre).join('')}${value}`.slice(-len);
};
