import readingTime from './index';
import { describe, expect, it } from 'vitest';

describe('readingTime', () => {
	it('should return an object with text and time properties', () => {
		const result = readingTime('Lorem ipsum dolor sit amet');
		expect(result).toHaveProperty('text');
		expect(result).toHaveProperty('minutes');
	});

	it('should return the correct reading time', () => {
		const result = readingTime('Lorem ipsum dolor sit amet');
		expect(result.minutes).toBe(1);
	});
});
