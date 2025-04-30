/**
 * Utility functions for validating authentication inputs
 */

/**
 * Validates an email address format
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return email ? emailRegex.test(email) : false;
}

/**
 * Validates password strength
 * - At least 8 characters
 * - Contains letters and numbers
 */
export function isValidPassword(password: string): boolean {
  if (!password || password.length < 8) {
    return false;
  }
  
  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return hasLetter && hasNumber;
}

/**
 * Generates specific error messages for password requirements
 */
export function getPasswordRequirementErrors(password: string): string[] {
  const errors: string[] = [];
  
  if (!password) {
    return ['Password is required'];
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('Password must contain at least one letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return errors;
}