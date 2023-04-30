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