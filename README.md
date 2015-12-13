# lang-alpha-prob

[![version](https://img.shields.io/npm/v/lang-alpha-prob.svg)](http://npm.im/lang-alpha-prob)
[![Travis](https://img.shields.io/travis/AntonioVdlC/lang-alpha-prob.svg?branch=master)](https://travis-ci.org/AntonioVdlC/lang-alpha-prob)
[![Codecov](https://img.shields.io/codecov/c/github/AntonioVdlC/lang-alpha-prob.svg)](https://codecov.io/github/AntonioVdlC/lang-alpha-prob)
[![issues](https://img.shields.io/github/issues-raw/antoniovdlc/lang-alpha-prob.svg)](https://github.com/AntonioVdlC/lang-alpha-prob/issues)
[![downloads](https://img.shields.io/npm/dt/lang-alpha-prob.svg)](http://npm.im/lang-alpha-prob)
[![license](https://img.shields.io/npm/l/lang-alpha-prob.svg)](http://opensource.org/licenses/MIT)

Calculates basic probabilistic information on the alphabet of a given language.

## Installation

This package is distributed via npm:

```
npm install lang-alpha-prob
```

*- or -*

Download the file `src/index.js` and add it to your ES6 project.

## Usage

This is not a very useful module per se, but can be an interesting basis for any simple linguistic work (or not).

If you are still reading, that means you have some remote interest in using this, so here is its API!

Before accessing any metrics, you need to set a language.

```javascript
var lang = require("lang-alpha-prob");
// - or - import lang from "lang-alpha-prob";

var language = ["hello", "world", "hello"];

lang.set(language);
```

This will create the following metrics, accessible through the following methods:

### Dictionary

The dictionary lists all the unique words of a language in alphabetical order (just as you would expect of any dictionary actually).

It is accessible through the `dictionary()` method on the `lang` object.

```javascript
var lang = require("lang-alpha-prob");
// - or - import lang from "lang-alpha-prob";

var language = ["hello", "world", "hello"];

lang.set(language);

lang.dictionary();
// ["hello", "world"]
```

### Alphabet

The alphabet lists all the unique letters of a language in alphabetical order (just as you would expect of any alphabet actually).

It is accessible through the `alphabet()` method on the `lang` object.

```javascript
var lang = require("lang-alpha-prob");
// - or - import lang from "lang-alpha-prob";

var language = ["hello", "world", "hello"];

lang.set(language);

lang.alphabet();
// ["d", "e", "h", "l", "o", "r", "w"]
```

### Probabilities

Now it's getting interesting! The module calculates the probability of each letter to appear in a word of the language.

It is accessible through the `probabilities()` method on the `lang` object.

```javascript
var lang = require("lang-alpha-prob");
// - or - import lang from "lang-alpha-prob";

var language = ["hello", "world", "hello"];

lang.set(language);

lang.probabilities();
// [0.1, 0.1, 0.1, 0.3, 0.2, 0.1, 0.1]
```

### Matrix

The matrix is basically a 2D representation of the probabilities of a letter being followed by another letter. It can be used to compute state machines and other fancy stuff (or it can just never be used!).

It is accessible through the `matrix()` method on the `lang` object.

```javascript
var lang = require("lang-alpha-prob");
// - or - import lang from "lang-alpha-prob";

var language = ["hello", "world", "hello"];

lang.set(language);

lang.matrix();
/*
[
	[0, 0, 0, 0 ,0, 0, 0],
	[0, 0, 0, 1 ,0, 0, 0],
	[0, 1, 0, 0 ,0, 0, 0],
	[0.33333, 0, 0, 0.33333, 0.33333, 0, 0],
	[0, 0, 0, 0 ,0, 1, 0],
	[0, 0, 0, 1 ,0, 0, 0],
	[0, 0, 0, 0 ,1, 0, 0]
]
*/
```

The indexes of the matrix are ordered based on the alphabet.

If you pick for example an "l", the probabilities of the next states are available at `matrix[alphabet.indexOf("l")]`, which basically retrieves `[0.33333, 0, 0, 0.33333, 0.33333, 0, 0]`. That means that there is 1/3 chances for an "l" to be followed by a "d", another "l" or an "o".

## License
MIT
