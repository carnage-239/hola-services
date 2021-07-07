/**
 * A username needs to have the following requirements:
 * username can contain alphabets - `a-zA-Z`
 * username can contain digits - `0-9`
 * username can contain ".", "_", "-" - `-_.`
 */
export const usernameRegEx = /^[a-zA-Z0-9-_.]+$/;

/**
 * A password needs to have the following requirements:
 * Minimum 8 characters - `{8,}`
 * Minimum 1 lowercase - `(?=.*[a-z])`
 * Minimum 1 uppercase - `(?=.*[A-Z])`
 * Minimum 1 numeric value - `(?=.*[0-9])`
 * Minimum 1 non-alphanumeric value - `(?=.*[!@#$%^&*])`
 */
export const passwordRegEx =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

/**
 * Mobile number has to be a string containing only numbers.
 */
export const mobileRegEx = /^\d+$/;
