export function validateDate(dateString: string): boolean {
  if (typeof dateString !== 'string' || dateString.trim() === '') {
    return false; // non-string input or empty string
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return false; // invalid date
  }

  // check for specific format violations
  const regexIso8601 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?([+-]\d{2}:?\d{2}|Z)?$/;
  const regexDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/;
  const regexDateSlash = /^(\d{4})\/(\d{2})\/(\d{2})$/;
  if (!regexIso8601.test(dateString) && !regexDateOnly.test(dateString) && !regexDateSlash.test(dateString)) {
    return false; // invalid format
  }

  // check for leap year
  const year = date.getFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (!isLeapYear && date.getMonth() === 1 && date.getDate() === 29) {
    return false; // invalid date for non-leap year
  }

  return true;
}


/**
 * Encodes special HTML characters to their equivalent HTML entities
 *
 * @param {string} string - The input string containing special characters to encode
 * @returns {string} The encoded string
 */
export const encodeHtml = (string: string): string => {
  return string.replace(/[\u00A0-\u9999<>&]/g, function (i: string): string {
      return `&#${i.charCodeAt(0)};`;
  });
};


/**
 * Pauses the execution for the specified number of milliseconds.
 * @param ms The number of milliseconds to sleep.
 * @returns A Promise that resolves after the specified time has elapsed.
 */
export const sleep = (ms: number): Promise<void> => {
  if (ms < 0) {
    return Promise.resolve();
  }
  return new Promise(resolve => setTimeout(resolve, ms));
};
