// Export the `lang` object
export default {
	set: setLanguage,
	dictionary: getDictionary,
	alphabet: getAlphabet,
	probabilities: getAlphabetProbabilities,
	matrix: getAlphabetMatrix
};

// Declare internal variables
let dictionary = new Set();
let alphabet = new Set();
let probabilities = [];
let matrix = [];


/**
 * Calculates and sets the alphabet and its metrics
 * @return {function} Returns the main function
 */
function setLanguage (language) {
	// The language is not an array
	if (!Array.isArray(language)) {
		throw new TypeError("The language supplied is not an Array.");
		return;
	}

	// Initialise internal variables
	dictionary.clear();
	alphabet.clear();
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

	// Returns the object for chaining
	return this;
}

/**
 * Returns the dictionary of the language
 * @return {Array} Dictionary of the language
 */
function getDictionary () {
	_checkLanguageIsSet();

	return [...dictionary];
}

/**
 * Returns the alphabet of the language
 * @return {Array} Alphabet of the language
 */
function getAlphabet () {
	_checkLanguageIsSet();

	return [...alphabet];
}

/**
 * Returns the probabilities for each letter of the language
 * @return {Array} Probabilities of the language
 */
function getAlphabetProbabilities () {
	_checkLanguageIsSet();

	return probabilities;
}

/**
 * Returns the matrix of the language
 * @return {Array} Matrix of the language
 */
function getAlphabetMatrix () {
	_checkLanguageIsSet();

	return matrix;
}

/**
 * Checks if the language is set before returning its metrics
 * @return {Boolean} isSet (or Error)
 */
function _checkLanguageIsSet () {
	if(dictionary.size === 0 ||
		alphabet.size === 0) {

		throw new Error("You need the set the language before accessing its metrics.");
	}
}
