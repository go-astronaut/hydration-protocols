import { ErrorMessages } from "../index.enums";

/**
 * Validates user registration data (email, password, userName).
 *
 * @returns An array of error messages (empty if data is valid)
 */
function validateRegistrationData(
  email: string,
  password: string,
  userName: string
): string[] {
  const errors = [];
  const invalidMail = "Invalid email";

  const missingUserName = "Username is required";

  if (!email || !validateEmail(email)) {
    errors.push(invalidMail);
  }

  if (!password || password.length < 7) {
    errors.push(ErrorMessages.passwordLength);
  }

  if (!userName) {
    errors.push(missingUserName);
  }

  return errors;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export { validateRegistrationData, validateEmail };
