import { describe, expect, it } from "vitest";
import { validateDate } from "..";

describe('validateDate', () => {
    it('returns true for a valid date string', () => {
      expect(validateDate('2022-04-30')).toBe(true);
      expect(validateDate('2023/05/01')).toBe(true);
      expect(validateDate('1970-01-01')).toBe(true);
      expect(validateDate('2022-04-30T12:34:56.789Z')).toBe(true); // ISO 8601 format
      expect(validateDate('2022-04-30T12:34:56Z')).toBe(true); // ISO 8601 format
      expect(validateDate('2022-04-30T12:34Z')).toBe(true); // ISO 8601 format
    });
  
    it('returns false for an invalid date string', () => {
      expect(validateDate('not a date')).toBe(false);
      expect(validateDate('2021/13/01')).toBe(false);
      expect(validateDate('2022-04-30T12:34:56.Z')).toBe(false); // invalid timezone
    });
  
    it('handles edge cases correctly', () => {
      expect(validateDate('')).toBe(false); // empty string
      expect(validateDate(' ')).toBe(false); // whitespace
      expect(validateDate(null as any)).toBe(false); // null
      expect(validateDate(undefined as any)).toBe(false); // undefined
      expect(validateDate(123 as any)).toBe(false); // non-string input
    });
  });