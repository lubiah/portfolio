import { describe, test, expect } from "vitest";
import { validateDate } from "$utils";


const getFiles = () => {
	let files = import.meta.glob("/src/routes/blog/content/**/*.md", { eager: true });
	let array = [];

	for (const path in files) {
		array.push({
			path,
			// @ts-ignore
			metadata: files[path].metadata,
			// @ts-ignore
			component: files[path].default
		});
	}
	return array;
};


describe.each(getFiles())("Checking blog article - $path", ({ metadata }) => {
    test("Has a title", ()=>{
        expect(metadata.title).toBeDefined()
    });

    test("Has description", () => {
		expect(metadata.description).toBeDefined();
	});

    test("Has lengthy descripiton", () => {
		expect(metadata.description.split(" ").length).toBeGreaterThan(6);
	});

	test("Has an excerpt", () => {
		expect(metadata.excerpt).toBeDefined();
	});

	test("Has a lengthy excerpt", () => {
		expect(metadata.excerpt.split(" ").length).toBeGreaterThanOrEqual(6);
	});

	test("Article has not expired", () => {
		metadata.expiry || expect(new Date() < new Date(metadata.expiry))
	});

    test("Has date", () => {
		expect(metadata.date).toBeDefined();
	});


    test("Has valid date", () => {
		expect(validateDate(metadata.date)).toBeTruthy();
	});


	test("Has an image", ()=>{
		expect(metadata.image).toBeDefined()
	});

	test("Must have at least one tag", () => {
		expect(metadata.tags.length).toBeGreaterThanOrEqual(1);
	});

});