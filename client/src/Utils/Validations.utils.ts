/**
 * Check if a string is a digit string
 * @param str string to check
 * @returns boolean
 */
function isDigitString(str: string): boolean {
  return /^\d+$/.test(str);
}

export { isDigitString };
