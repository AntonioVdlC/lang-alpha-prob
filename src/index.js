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
		return;
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

	// Initialise `probabilities` with `0`s
	alphabet.forEach((letter) => { probabilities.push(0); });
	
	// Calculate the number of occurencies of each letter in the dictionary
	dictionary.join("").split("").forEach((letter) => {
		probabilities[alphabet.indexOf(letter)] ++;
	});

	// Compute the probability of each letter
	let count = dictionary.join("").split("").length;
	probabilities = probabilities.map((prob) => prob / count);

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
