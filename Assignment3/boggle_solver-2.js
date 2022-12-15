/**
 * Given a Boggle board and a dictionary,returns a list of available words
 * present both the dictionary and the Boggle board.
 * @param {string [][]} grid -The Boggle board
 * @param {string []} dictionary -The given list of available words
 * @returns {string[]} solutions -This is the possible solutions
 */

/**
 * This is the set that accounts for all possible directions
 */
const neighborSet = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1]];

const m = 3;

/* eslint no-trailing-spaces: ["error", { "ignoreComments": true }]
*/

exports.findAllSolutions = function(grid, dictionary) {
  /* let solutions_Set = new Set(); */
  let solutions = []; /* Creation of answer set that will be the output */

  /* 1.Check inputs Params are valid(return [] if incorrect) */

  /* 1a.This will check If the grid or the dictionary is empty
  if so will end the program */
  if (grid == null || dictionary == null) {
    return solutions;
  }
  /* 1b.check that the grid is valid---no numbers && 
  no raw Q's or S's,returns [] if so */
  if (!isGridValid(grid)) {
    return solutions;
  }
  /* 1c.Check if the NxN grid */
  const N = grid.length;
  for (let y = 0; y < N; y++) {
    if (grid[y].length != N) {
      return solutions;
    }
  }
  makewordsUpperCase(grid, dictionary);

  const hash = createHashMap(dictionary);
  /* Creation of new dictionary(hash table) */
  const solutionsSet = new Set();
  /* Used new Set over New Array to account for duplicates
  Will iterate over the grid-Find all words */
  for (let col = 0; col < N; col++) {
    for (let row = 0; row < N; row++) {
      const word = '';
      const visted = new Array(N).
          fill(false)
          .map(() => new Array(N).fill(false));
      /**
       * This will showed where the code has already visted,to track it
       * This will fill all the grid positions with false
       * [false]  [false]
       * [false]  [false]
       */
      getWords(word, col, row, grid, visted, hash, solutionsSet);
    }
  }
  solutions = Array.from(solutionsSet);
  /**
   *  Array.from () will create an array instance 
   *  Will make the solution_set appear as ["a" , "abc"] */
  return solutions;
};

/**
 * This will convert all the data to the same case.
 * @param {string} grid
 * @param {string} dict
 */
makewordsUpperCase = function(grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toUpperCase();
    }
  }
  for (let x = 0; x < dict.length; x++) {
    dict[x] = dict[x].toUpperCase();
  }
};

getWords = function(word, col, row, grid, visited, hash, solutionsSet) {
  // console.log("The grid length is",grid.length);
  /* The checks will ensure that the code isn't out of bounds */
  if (col < 0 || row < 0) {
    return;
  }
  if (col >= grid.length || row >= grid.length) {
    return;
  }
  if (visited[col][row] == true) {
    return;
  }
  /* This will continously append the grid 
   [col][row] value to the word set */
  word += grid[col][row];
  /* Test function to see all the possible words taken from the grid
  console.log("The words taken from the grid is ",word); */

  /* 1.Is that new word a prefix for any word in the trie/hash */

  /* 1a.Check to see if the prefix is an actual word in the hashtable */
  if (checkWordandPrefixValue(word, hash)) {
    visited[col][row] = true;
    /**
     * 1b.if the word is present in the dictionary and size >3 
     *  then add to the solution set
     * If the word is found in the hashtable 
    then we know it has the value 1(0 for prefix and 1 for word in dictionary)
     *  */
    if (validWord(word, hash)) {
      if (word.length >= m) {
        solutionsSet.add(word);
      }
    }

    /* Recursive call for the getWords function- 
    Will call each neighboring grid positions(As listed above) */
    for (let i = 0; i < 8; i++) {
      getWords(word, col + neighborSet[i][0], row +
      neighborSet[i][1], grid, visited, hash, solutions_Set);
    }
  }
  visited[col][row] = false;
};

/** Function for the implementation of the hashmap
 * Hashmao will take in the words of the dictionary 
 * When placed in the table,will assign the words to the value 1 
 * prefixes to the value 0
 * Will go throught ever word and 
 * try to find every possible prefix and check that against the dictionary
 * "String":1 , "Strin":0 , "Stri":0 ...
 * @param {string} dictionary
 * @return {string[]} dict
 * 
*/
createHashMap = function(dictionary) {
  /* In javascript,to create a dict we use curly braces */
  const dict = {};
  for (let i = 0; i < dictionary.length; i++) {
    /* Set the value for every word in the dictionary to be 1*/
    dict[dictionary[i]] = 1;

    /* Get the length of each word in the dictionary*/
    const wordlength = dictionary[i].length;
    // let wordlength= $("dictionary[i]").length;

    /* set the word to be a string so it can be changed*/
    let str = dictionary[i];
    // var str = ""
    /* iterate throughout and reduce 
    the wordlength everytime,to get prefixes */
    for (let j = wordlength; j > 1; j--) {
      /* Read the string from the 0 positon to 
      the second to last positon in word length */
      str = String(str).substring(0, j - 1);
      // console.log(str);

      /* Check to see if that string is in the dict
      Then check to see if it is already a word,
      if not continue to read prefix(word-1) until not found */
      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }
  return dict;
};

/** This function will check to ensure Params are valid
 * isGridValid
 * @param {string} grid
 * @return {boolean} true
*/
isGridValid = function(grid) {
  for (const i of grid) {
    /* if ( typeof i =='number' && (i!='q' || i!='s') && (i!='Q' || i!='S') ) */
    if (i =='number') {
      return false;
    }
  }
  return true;
};
/** This function will check if prefix is valid
 * checkWordandPrefixValue
 * @param {string} word
 * @param {string} hash
 * @return {string []}
*/
checkWordandPrefixValue = function(word, hash) {
  return hash[word] != undefined;
};
validWord = function(word, hash) {
  /* If the hash value is equal to 1 then it is a word */
  return hash[word] == 1;
};

const grid = [['A', 'QU'], ['C', 'St']];
const dictionary = ['AQU', 'STAC'];
console.log(exports.findAllSolutions(grid, dictionary));

/* Used the hash video from canvas for reference
Also used stackoverflow,to figure out certain things
Eg:Array.From(),String.str */