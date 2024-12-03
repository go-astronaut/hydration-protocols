/**
 * Validates an email address
 * @param email email to validate
 * @returns boolean indicating if the email is valid
 */
function validateEmail(email: string): boolean {
  // Regular expression pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}

export { validateEmail };
