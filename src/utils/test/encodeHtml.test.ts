import { encodeHtml } from "$utils";
import { describe, it, expect } from "vitest";

describe('encodeHtml', () => {
  it('should encode special HTML characters to their equivalent HTML entities', () => {
    const input = 'This is a string with special characters: <>&';
    const expectedOutput = 'This is a string with special characters: &#60;&#62;&#38;';
    expect(encodeHtml(input)).toEqual(expectedOutput);
  });

  it('should return an empty string when the input is empty', () => {
    const input = '';
    const expectedOutput = '';
    expect(encodeHtml(input)).toEqual(expectedOutput);
  });

  it('should return the input string when there are no special characters', () => {
    const input = 'This is a normal string';
    const expectedOutput = 'This is a normal string';
    expect(encodeHtml(input)).toEqual(expectedOutput);
  });

  it('should encode special HTML characters in the middle of a string', () => {
    const input = 'This is a string with <special> characters & stuff';
    const expectedOutput = 'This is a string with &#60;special&#62; characters &#38; stuff';
    expect(encodeHtml(input)).toEqual(expectedOutput);
  });

  it('should encode special HTML characters at the beginning of a string', () => {
    const input = '<This> is a string with special characters & stuff';
    const expectedOutput = '&#60;This&#62; is a string with special characters &#38; stuff';
    expect(encodeHtml(input)).toEqual(expectedOutput);
  });

  it('should encode special HTML characters at the end of a string', () => {
    const input = 'This is a string with special characters & stuff<>';
    const expectedOutput = 'This is a string with special characters &#38; stuff&#60;&#62;';
    expect(encodeHtml(input)).toEqual(expectedOutput);
  });

  it('should encode all special HTML characters in a long string', () => {
    const input = 'This is a long string with <special> characters & stuff and more <special> characters & stuff';
    const expectedOutput = 'This is a long string with &#60;special&#62; characters &#38; stuff and more &#60;special&#62; characters &#38; stuff';
    expect(encodeHtml(input)).toEqual(expectedOutput);
  });
});