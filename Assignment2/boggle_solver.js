//Used the hash video from canvas for reference and also used stackoverflow,to figure out certain things
//Eg:Array.From()....String.str...
//This is the set that accounts for all possible directions

//@02977421
//Passing Assignment2 Tester
const neighbor_set = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1]
];

const m = 3;

exports.findAllSolutions = function(grid, dictionary) {
  // let solutions_Set = new Set();
  
  let solutions = []; //Creation of answer set that will be the output
  // let hash = createHashMap(dictionary);

  //1.Check inputs Params are valid(return [] if incorrect)

  //1a.This will check If the grid or the dictionary is empty, if so will end the program 
  if (grid == null || dictionary == null) {
    return solutions;
  }

  //1b.check that the grid is valid---no numbers && no raw Q's or S's,returns [] if so
  if (!isGridValid(grid))
  {
       return solutions;
  }

  //1c.Check if the NxN grid
  let N = grid.length;
  for (let y = 0; y < N; y++) {
    if (grid[y].length != N) {
      return solutions;
    }
  }

  //2.Function to convert all data to the same case,I chose to convert everything to upperCase values
  makewordsUpperCase(grid, dictionary);

  let hash = createHashMap(dictionary);
  //Creation of new dictionary(hash table)
  let solutions_Set = new Set();
  // Decided to use new Set versus New Array to account for duplicates

  //Will iterate over the grid-Find all words
  for (var col = 0; col < N; col++) {
    for (var row = 0; row < N; row++) {
      var word = "";
      //var visited = Array.from ({length: N}, () => Array(grid[0].length).fill(false))
      let visted = new Array(N).fill(false).map(() => new Array(N).fill(false));
      //This will showed where the code has already visted in order to track it
      //This will fill all the grid positions with false
      // [false]  [false]
      // [false]  [false]
      getWords(word, col, row, grid, visted, hash, solutions_Set);
    }
  }

  solutions = Array.from(solutions_Set);
  //Array.from () will create an array instance 
  // Will make the solution_set appear as ["a" , "abc"]
  return solutions;
};

//This function will convert each word to a UpperCase form(This is done to avoid any case sensitivity)
function makewordsUpperCase(grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toUpperCase();
    }
  }
  for (let x = 0; x < dict.length; x++) {
    dict[x] = dict[x].toUpperCase();
  }
};


//Will search and find the words in the dictionary 
//Will iterate over the grid 
function getWords(word, col, row, grid, visited, hash, solutions_Set) {
  // let N = grid.length;
  // console.log("The grid length is",grid.length);
  //The checks will ensure that the code isn't out of bounds
  if (col < 0 || row < 0 || col >= grid.length || row >= grid.length || visited[col][row] == true) {
    return;
  }

  //This will continously append the grid [col][row] value to the word set 
  word += grid[col][row];
  //Test function to see all the possible words taken from the grid
  //console.log("The words taken from the grid is ",word);

  //1.Is that new word a prefix for any word in the trie/hash

  //1a.Check to see if the prefix is an actual word in the hashtable
  //If it is 
  if (checkWordandPrefixValue(word, hash)) {
    visited[col][row] = true;
    //1b.if the word is present in the dictionary and size >3 then add to the solution set
    //If the word is found in the hashtable then we know it has the value 1(0 for prefix and 1 for word in dictionary)
    if (ValidWord(word, hash)) {
      if (word.length >= m) {
        solutions_Set.add(word);
      }
    }

    // Recursive call for the getWords function- Will call each neighboring grid positions(As listed above)
    for (let i = 0; i < 8; i++) {
      getWords(word, col + neighbor_set[i][0], row + neighbor_set[i][1], grid, visited, hash, solutions_Set);
      // console.log("The words are ",getWords);
    }
  }
  visited[col][row] = false;
};

//Function for the implementation of the hashmap
//Basis of the table--- The hashmap will take in the words of the dictionary 
//When placed in the table,will assign the words to the value 1 and prefixes to the value 0
//Will go throught ever word and try to find every possible prefix and check that against the dictionary
//Eg: "String":1 , "Strin":0 , "Stri":0 ...

function createHashMap(dictionary) {
  //Needs to take in the words 
  //Then will place this in hash table 
  //Will assign word by 1 and a prefix by 0

  //In javascript,to create a dict we use curly braces 
  var dict = {}
  //let dict_length=
  for (let i = 0; i < dictionary.length; i++) {
    //Set the value for every word in the dictionary to be 1
    dict[dictionary[i]] = 1;

    //Get the length of each word in the dictionary
    let wordlength = dictionary[i].length;
    // let wordlength= $("dictionary[i]").length;

    //set the word to be a string so it can be changed
    var str = dictionary[i];
    // var str = ""
    //iterate throughout and reduce the wordlength everytime so we can get prefixes
    for (let j = wordlength; wordlength > 1; wordlength--) {
      //Read the string from the 0 positon to the second to last positon in word length
      str = String(str).substring(0, wordlength - 1);
      // console.log(str);

      //Check to see if that string is in the dict
      //Then check to see if it is already a word,if not continue to read prefix(word-1),until not found
      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      }
      else {
        dict[str] = 0;
      }
    }
  }
  return dict;
};

//This function will check to ensure Params are valid
function isGridValid (grid)
{
for (var i of grid)
{
    // if ( typeof i =='number' && (i!='q' || i!='s') && (i!='Q' || i!='S') )
  if (i =='number')
    {
        return false;
    }
}
return true;
};
//This will check if prefix is valid 
function  checkWordandPrefixValue(word, hash) {
  return hash[word] != undefined;

};

//returns true if word is found in the hash
function ValidWord(word, hash) {
  //If the hash value is equal to 1 then it is a word
  return hash[word] == 1;
};






//My personal Test Cases --Examples



// Test for empty set---If grid not valid
// var grid=['S' , 'q'];
// var dictionary = ['A', 'B', 'AC', 'ACA', 'ACB', 'DE'];


//Test 3
// const grid = [["A", "QU"],["C", "St"]];
// const dictionary = ["AQU", "STAC"];

const grid = [
  ["T", "W", "Y", "R"],
  ["E", "N", "P", "H"],
  ["G", "Z", "Qu", "R"],
  ["O", "N", "T", "A"],
];
const dictionary = [
  "art",
  "ego",
  "gent",
  "get",
  "net",
  "new",
  "newt",
  "prat",
  "pry",
  "qua",
  "quart",
  "quartz",
  "rat",
  "tar",
  "tarp",
  "ten",
  "went",
  "wet",
  "arty",
  "egg",
  "not",
  "quar",
];


console.log(exports.findAllSolutions(grid, dictionary));