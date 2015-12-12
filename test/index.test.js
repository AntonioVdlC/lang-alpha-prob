import {expect} from "chai";
import lang from "../src/index.js";

describe("lang-alpha-prob", () => {
	it("should export an object", () =>{
		expect(typeof lang).to.equal("object");
	});

	// -- set -- \\
	it("should have a `set` method", () => {
		expect(typeof lang.set).to.equal("function");
	});

	describe("lang.set", () => {
		it("should throw an error if not passed an array of string", () => {
			expect(lang.set.bind(lang, "Hello, world!")).to.throw("The language supplied must be an Array or a Set.");
		});

		it("should return the function `lang`", () => {
			expect(lang.set(["hello", "world"])).to.equal(lang);
		});
	});

	// -- dictionary -- \\
	it("should have a `dictionary` method", () => {
		expect(typeof lang.dictionary).to.equal("function");
	});

	describe("lang.dictionary", () => {
		lang.set(["hello", "world", "hello"]);

		let dictionary = lang.dictionary();

		it("should return an array", () => {
			expect(Array.isArray(dictionary)).to.be.true;
		});

		it("should include all the words from the language", () => {
			expect(dictionary).to.contain("hello");
			expect(dictionary).to.contain("world");
		});

		it("should not include duplicates", () => {
			expect(dictionary.length).to.equal(2);
		});
	});

	// -- alphabet -- \\
	it("should have a `alphabet` method", () => {
		expect(typeof lang.alphabet).to.equal("function");
	});

	describe("lang.alphabet", () => {
		lang.set(["hello", "world"]);

		let alphabet = lang.alphabet();

		it("should return an array", () => {
			expect(Array.isArray(alphabet)).to.be.true;
		});

		it("should include all the letters from the language", () => {
			expect(alphabet).to.contain("h");
			expect(alphabet).to.contain("e");
			expect(alphabet).to.contain("l");
			expect(alphabet).to.contain("o");
			expect(alphabet).to.contain("w");
			expect(alphabet).to.contain("r");
			expect(alphabet).to.contain("d");
		});

		it("should not include duplicates", () => {
			expect(alphabet.length).to.equal(7);
		});
	});

	// -- probabilities -- \\
	it("should have a `probabilities` method", () => {
		expect(typeof lang.probabilities).to.equal("function");
	});

	describe("lang.probabilities", () => {
		lang.set(["hello", "world"]);

		let probabilities = lang.probabilities();

		it("should return an array of numbers of the exact same size as `lang.alphabet`", () => {
			expect(Array.isArray(probabilities)).to.be.true;

			expect(probabilities.length).to.equal(lang.alphabet().length);
		});

		it("should sum up to exactly 1", () => {
			expect(probabilities.reduce((acc, cur) => acc + cur)).to.equal(1);
		});
	});
});
