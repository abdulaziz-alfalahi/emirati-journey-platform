/**
 * Type guard utilities for runtime type checking
 */

/**
 * Checks if value is a non-null object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Checks if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Checks if value is a valid email
 */
export function isValidEmail(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Checks if value is a valid UUID
 */
export function isValidUUID(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Checks if value is a valid URL
 */
export function isValidURL(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if value is a positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

/**
 * Checks if value is an array with elements of the specified type
 */
export function isArrayOf<T>(
  value: unknown,
  typeGuard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(typeGuard);
}

/**
 * Runtime type assertion with error message
 */
export function assertType<T>(
  value: unknown,
  typeGuard: (value: unknown) => value is T,
  errorMessage: string
): asserts value is T {
  if (!typeGuard(value)) {
    throw new TypeError(errorMessage);
  }
}

/**
 * Safe JSON parsing with type validation
 */
export function safeJsonParse<T>(
  json: string,
  typeGuard: (value: unknown) => value is T
): T | null {
  try {
    const parsed = JSON.parse(json);
    return typeGuard(parsed) ? parsed : null;
  } catch {
    return null;
  }
}