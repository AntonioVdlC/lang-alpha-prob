import {expect} from "chai";
import lang from "../src/index.js";

describe("lang-alpha-prob", () => {
	it("should export an object", () =>{
		expect(lang).to.be.an("object");
	});

	// -- set -- \\
	it("should have a `set` method", () => {
		expect(lang.set).to.be.a("function");
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
		expect(lang.dictionary).to.be.a("function");
	});

	describe("lang.dictionary", () => {
		lang.set(["hello", "world", "hello"]);

		let dictionary = lang.dictionary();

		it("should return an array", () => {
			expect(dictionary).to.be.an.instanceof(Array);
		});

		it("should include all the words from the language", () => {
			expect(dictionary).to.have.members(["hello", "world"]);
		});

		it("should not include duplicates", () => {
			expect(dictionary).to.have.length(2);
		});
	});

	// -- alphabet -- \\
	it("should have a `alphabet` method", () => {
		expect(lang.alphabet).to.be.a("function");
	});

	describe("lang.alphabet", () => {
		lang.set(["hello", "world"]);

		let alphabet = lang.alphabet();

		it("should return an array", () => {
			expect(alphabet).to.be.an.instanceof(Array);
		});

		it("should include all the letters from the language", () => {
			expect(alphabet).to.have.members(["h", "e", "l", "o", "w", "r", "d"]);
		});

		it("should not include duplicates", () => {
			expect(alphabet).to.have.length(7);
		});
	});

	// -- probabilities -- \\
	it("should have a `probabilities` method", () => {
		expect(lang.probabilities).to.be.a("function");
	});

	describe("lang.probabilities", () => {
		lang.set(["hello", "world"]);

		let probabilities = lang.probabilities();

		it("should return an array of numbers of the exact same size as `lang.alphabet`", () => {
			expect(probabilities).to.be.an.instanceof(Array);
			expect(probabilities).to.have.length(lang.alphabet().length);
		});

		it("should sum up to exactly 1", () => {
			expect(probabilities.reduce((acc, cur) => acc + cur)).to.equal(1);
		});
	});

	// -- matrix -- \\
	it("should have a `matrix` method", () => {
		expect(lang.matrix).to.be.a("function");
	});

	describe("lang.matrix", () => {
		lang.set(["hello", "world"]);

		let matrix = lang.matrix();

		it("should return a 2D array of same dimensions", () => {
			expect(matrix).to.be.instanceof(Array);

			matrix.forEach((col) => {
				expect(col).to.be.instanceof(Array);
				expect(col).to.have.length(matrix.length);
			});
		});
	});
});
