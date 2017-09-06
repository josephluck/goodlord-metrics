/**
 * Replace an element in an array with a different element at a given index
 * @param arr The array containing the element to replace
 * @param item The new item
 * @param index The index of the element to replace
 */
export default function replace<T>(arr: T[], item: T, index: number): T[] {
  return arr.slice(0, index).concat(item, arr.slice(index + 1))
}
