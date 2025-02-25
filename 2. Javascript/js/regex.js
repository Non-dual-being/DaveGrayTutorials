/*****||regex examples||****/

/*||Character sets||*/

// Regex Explanation:
// The regex /[enl]/g matches any occurrence of the characters 'e', 'n', or 'l' in a given string.
// - [enl]: This is a character set, which means it matches any one of the characters inside the brackets.
// - g: The global flag ensures that the regex finds all matches in the string, not just the first one.
// Character sets are useful when you want to match one out of several specific characters, and they make patterns more concise.

let regexExample_A = /[enl]/g;

// Example 1: Basic matching in a string
let stringExample_A1 = "Angel";
console.log(stringExample_A1.match(regexExample_A)); 

// Output: ['e', 'n', 'l']
// Explanation: The regex matches 'e', 'n', and 'l' in the string "Angel".


// Example 2: Removing all matches from a string
let stringExample_A2 = "Eleanor";
let result2 = stringExample_A2.replace(regexExample_A, '');
console.log(result2);

// Output: "Eaoor"
// Explanation: The 'e', 'n', and 'l' characters are removed from the string "Eleanor".

// Example 3: Checking if a string contains any matching characters
let stringExample_A3 = "Lion";
let result3 = regexExample_A.test(stringExample_A3);
console.log(result3);

// Output: true
// Explanation: The string "Lion" contains 'l' and 'n', so the regex test returns true.

// Example 4: Counting matches in a string
let stringExample_A4 = "Endless Energy";
let result4 = (stringExample_A4.match(regexExample_A) || []).length;
console.log(result4);
// Output: 5
// Explanation: The regex finds 'e' (twice), 'n', 'l', and another 'e', resulting in 5 matches.

// Example 5: Validating input in a form
let formInput = "Lane";
let isValid = regexExample_A.test(formInput);
if (isValid) {
    console.log("Valid input: contains one of the characters 'e', 'n', or 'l'.");
} else {
    console.log("Invalid input: does not contain any of the characters 'e', 'n', or 'l'.");
}
// Output: "Valid input: contains one of the characters 'e', 'n', or 'l'."
// Explanation: This example simulates form validation. If the input contains any of 'e', 'n', or 'l', it is considered valid.



// Regex Explanation:
// The regex /[^enl]/g matches any character that is NOT 'e', 'n', or 'l'.
// - [^]: The caret (^) at the beginning of a character set negates the set, meaning it matches any character NOT listed inside the brackets.
// - g: The global flag ensures all non-matching characters are found in the string.

let regexExample_B = /[^enl]/g;

// Example: Removing characters that are NOT 'e', 'n', or 'l' from a string
let stringExample_B = "Angelina";
let resultB = stringExample_B.replace(regexExample_B, '');
console.log(resultB);
// Output: "enl"
// Explanation: The regex matches all characters NOT 'e', 'n', or 'l' (in this case, 'A', 'g', 'i', and 'a') and removes them. 
// The remaining string contains only 'e', 'n', and 'l'.



// Regex Explanation:
// The regex /[a-z][A-Z]/g matches any sequence of:
// - [a-z]: A lowercase letter (from 'a' to 'z').
// - [A-Z]: An uppercase letter (from 'A' to 'Z').
// - g: The global flag ensures all matches in the string are found.

let regexExample_C = /[a-z][A-Z]/g;

// Example: Finding patterns of lowercase followed by uppercase letters
let stringExample_C1 = "MiNeCraft";
let resultC = stringExample_C1.match(regexExample_C);
console.log(resultC);
// Output: ['iN']
// Explanation: The regex matches the sequence 'iN' because it is a lowercase letter ('i') followed by an uppercase letter ('N') in the string "MiNeCraft".



// Regex Explanation:
// The regex /.\s/g matches any character followed by a whitespace character.
// - .: Matches any single character (except newline).
// - \s: Matches any whitespace character (spaces, tabs, line breaks).
// - g: Global flag to match all occurrences in the string.


let regexExample_D = /.\s/g;
let stringExample_D = "Wauw regex is powerfull";
let result = stringExample_D.match(regexExample_D);
console.log(result);
// Correcte output: ['W ', 'u ', 'x ']
// Uitleg: 
// 1. 'W ' -> 'W' wordt gevolgd door een spatie.
// 2. 'u ' -> 'u' wordt gevolgd door een spatie.
// 3. 'x ' -> 'x' wordt gevolgd door een spatie.
// Andere karakters worden niet gevolgd door een witruimte en worden dus niet gematcht.



// Regex Explanation:
// The regex /\w/gm matches all "word characters" in the string:
// - \w: Matches letters (a-z, A-Z), digits (0-9), and underscores (_).
// - g: Global flag ensures all matches are found, not just the first one.
// - m: Multiline flag (used for matching across lines, but not relevant here as no ^ or $ anchors are used).
// Modifications:
// - We exclude newline characters (`\n`) from the matches by customizing the behavior in the code logic.
// - Additionally, we will identify and output all characters that DO NOT match this pattern.

// Stel: Een gebruiker voert een tekst in een formulier in.

let userInput = "Mijn email is: test_user123@example.com. Wil je contact opnemen?";

// Regex uitleg:
// - \w: Matcht alle "woordkarakters" (letters, cijfers, en underscore: [a-zA-Z0-9_]).
// - g: Matcht alle mogelijke matches in de tekst.


// Regex om alle woordkarakters te vinden
let regexExample_E = /\w/g

// Stap 1: Vind alle woordkarakters
let matches = userInput.match(regexExample_E);
console.log("Woordkarakters (gebruikersinput zonder speciale tekens):", matches.join(''));

// Stap 2: Vind alle niet-woordkarakters
let nonMatches = userInput.split('').filter(char => !regexExample_E.test(char)); //split is need for the negation to work, otherwise use /\W/g to work with join
console.log("Speciale tekens en witruimtes:", nonMatches.join(''));

let regexExample_F = /\w\d/g
const stringExample_F = "25 december 2024"

// Stap 1: Vind alle woordkarakters
let matches_F = stringExample_F.match(regexExample_F);
console.log("Woordkarakters (gebruikersinput zonder speciale tekens):", matches.join(''));

let regexExample_G = /\s/g
const stringExample_G = "This sentence incluse spaces     a tabe and a linebreak as wel \n That is nice!"

console.log(stringExample_G.match(regexExample_G));

let regexExample_H = /^\w[\w\s]+\[.?!]$/g;
let stringExample_H = "I wonder wonder if this would match."

console.log(stringExample_H.match(regexExample_H));

let regexExample_H2 = /g(?=old)/g // a g followed by old
let stringExample_H2 = "String of gold, a good game play!"
console.log(stringExample_H2.match(regexExample_H2));


let regexExample_H3 = /\b[A-Z-a-z]\w*'?\w*\b/gm 
//b matches de beginning or ending of a word
// ? indicates zero or one occurence

let stringExample_H3 = "It's cool, it's very cool, seeing it's cool"

console.log(stringExample_H3.match(regexExample_H3));

let regexExample_H4 = /\b[Ii]t'?s\b/g;  
let stringExample_H4 = "It's cool, it's very cool, seeing it's cool"
console.log(stringExample_H4.match(regexExample_H4));


let regexExample_H5 = /\d{3,4}/;
let stringExample_H5 = "123-123412";
console.log(stringExample_H5.match(regexExample_H5));

let regexExample_H6 = /([gG]|[Ll])ive/g ;
let stringExample_H6 = "Give your live";
console.log(stringExample_H6.match(regexExample_H6));

//zip code example
let regexExample_H7 = /(^\d{5}$)/gm;
let stringExample_H7 = "1001";

let regexExample_H8 = /(^\d{5})-?(\d{4}$)?/gm;
let stringExample_H8 = "12345-1234";
console.log(stringExample_H8.match(regexExample_H8));

let regexExample_H9 = /\S{2,}/gm; //{2,} two or more
let stringExample_H9 = "Damn  a space to much";
console.log(stringExample_H9.match(regexExample_H9));

let regexExample_H10 = /(\+1)?[-. ]?(\d{3})?[-. ]?(\d{3})[-. ]?(\d{4}$)/gm; //most special charactors do need to be escaped within []
let stringExample_H10 = "+1 555 867 5309";
console.log(stringExample_H10.match(regexExample_H10));







