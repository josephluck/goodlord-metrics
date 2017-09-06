export default function parseNumber(value) {
  return !value ? 0 : parseFloat(removeNonNumericChars(value))
}

function removeNonNumericChars(value) {
  return value.replace(/[^\d.-]/g, '')
}
