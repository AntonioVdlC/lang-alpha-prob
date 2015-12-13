// Export the `lang` object
export default {
	set: setLanguage,
	dictionary: getDictionary,
	alphabet: getAlphabet,
	probabilities: getAlphabetProbabilities,
	matrix: getAlphabetMatrix
};

// Declare internal variables
let dictionary;
let alphabet;
let probabilities;
let matrix;


/**
 * Calculates and sets the alphabet and its metrics
 * @return {function} Returns the main function
 */
function setLanguage (language) {
	// The language is not an array
	if (!(Array.isArray(language) || language instanceof Set)) {
		throw new TypeError("The language supplied must be an Array or a Set.");
	}

	// Initialise internal variables
	dictionary = new Set();
	alphabet = new Set();
	probabilities = [];
	matrix = [];

	// Parse the language
	language.forEach((word) => {
		// Make sure the elements of the dictionary are Strings
		word = String(word);

		// Save each word of the language in the `dictionary` local variable
		dictionary.add(word);

		// Retrieve the alphabet
		word.split("").forEach((letter) => {
			alphabet.add(letter);
		});
	});

	// Transform `dictionary` and `alphabet` to Array
	dictionary = [...dictionary].sort();
	alphabet = [...alphabet].sort();

	// Initialise `probabilities` and `matrix` with `0`s
	alphabet.forEach((letter) => {
		probabilities.push(0);
		matrix.push(alphabet.map((letter) => 0));
	});
	
	// Calculate the probability of each letter
	dictionary.join("").split("").forEach((letter) => {
		probabilities[alphabet.indexOf(letter)] ++;
	});

	let count = dictionary.join("").split("").length;
	probabilities = probabilities.map((prob) => prob / count);

	// Calculate the relative probability of a letter appearing after another
	// in each word of the dictionary
	dictionary.forEach((word) => {
		word.split("").forEach((letter, index, word) => {
			let i = alphabet.indexOf(letter);
			let j = alphabet.indexOf(word[index + 1]);

			matrix[i][j] ++;
		});
	});

	matrix.forEach((col, i, matrix) => {
		let total = col.reduce((acc, cur) => acc + cur);
		matrix[i] = col.map((prob) => (total) ? prob / total : 0);
	});

	// Return the object for chaining
	return this;
}

/**
 * Returns the dictionary of the language
 * @return {Array} Dictionary of the language
 */
function getDictionary () {
	return dictionary;
}

/**
 * Returns the alphabet of the language
 * @return {Array} Alphabet of the language
 */
function getAlphabet () {
	return alphabet;
}

/**
 * Returns the probabilities for each letter of the language
 * @return {Array} Probabilities of the language
 */
function getAlphabetProbabilities () {
	return probabilities;
}

/**
 * Returns the matrix of the language
 * @return {Array} Matrix of the language
 */
function getAlphabetMatrix () {
	return matrix;
}
