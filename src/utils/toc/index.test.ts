import generateTableOfContents from './';
import { describe, test, expect } from 'vitest';
import { load } from 'cheerio';

describe('generateTableOfContents', () => {
	test('returns a string', () => {
		const html = '<h2>Test</h2>';
		const toc = generateTableOfContents(html);
		expect(typeof toc).toBe('string');
	});

	test('returns null if no table of contents were found', () => {
		expect(typeof generateTableOfContents('')).toBe('object');
	});

	test('contains all headings', () => {
		const html = '<h2 id="test">Test</h2><h2 id="subtest">Subtest</h2>';
		const toc = generateTableOfContents(html);
		expect(toc).toContain('Test');
		expect(toc).toContain('Subtest');
	});

	test('has correct nesting structure', () => {
		const html =
			'<h2 id="test">Test</h2><h2 id="subtest">Subtest</h2><h3 id="subsubtest">Subsubtest</h3>';
		const toc = generateTableOfContents(html);
		expect(toc).toContain(
			'<ul><li><a class="toc-link" href="#test">Test</a></li><li><a class="toc-link" href="#subtest">Subtest</a></li><ul><li><a class="toc-link" href="#subsubtest">Subsubtest</a></li></ul></ul>'
		);
	});

	test('has links to each heading', () => {
		const html = '<h2 id="test">Test</h2><h2 id="subtest">Subtest</h2>';
		const toc = generateTableOfContents(html);
		expect(toc).toContain('<a class="toc-link" href="#test">Test</a>');
		expect(toc).toContain('<a class="toc-link" href="#subtest">Subtest</a>');
	});

	test('has required classes on html tags', () => {
		const html = '<h2 id="test">Test</h2><h2 id="subtest">Subtest</h2>';
		const toc = generateTableOfContents(html);
		const $ = load(toc ?? '');
		expect($('a').first().attr('class')).toBe('toc-link');
	});
});
