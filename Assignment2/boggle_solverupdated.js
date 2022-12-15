/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
//This set will account for all directions possible

// Sydnie Sewell 
//@02977421

//Passing First Tester for Assignment 2

const neighbor_set = [[-1, -1],
[-1, 0],
[-1, 1],
[0, 1],
[1, 1],
[1, 0],
[1, -1],
[0, -1]];

const m =3;

exports.findAllSolutions = function (grid, dictionary) 
{
    
    let solutions = []; //Creation of answer set that will be the output
   
    //1.Check inputs Params are valid(return [] if incorrect)

    //1a.If the grid or the dictionary is empty end the program 
    if (grid == null || dictionary == null) { 
     return solutions;
    }

    //1b.check that the grid is valid---no numbers && no raw Q's or S's
    if (!isGridValid(grid))
    {
         return solutions;
    }

    //1c.Check if the NxN grid
    let N = grid.length;
    for (let y=0; y<N ; y++)
    {
        if (grid[y].length !=N){
            return solutions;
        }
    }

   //2.Function to convert all data to the same case,I chose to convert everything to upperCase values
    makewordsUpperCase(grid, dictionary);


  //Note:Use a set to avoid duplicates {Otherwise 5x5 will fail}
    let solutions_Set = new Set();

    //Will iterate over the grid-Find all words
    for (let col = 0; col < N; col++) {
    for (let row = 0; row < N; row++){

        var word = [];
        var visited = Array.from ({length: N}, () => Array(grid[0].length).fill(false))
        //This will showed where the code has already visted in order to track it
        //This will fill all the grid positions with false
        // [false]  [false]
        // [false]  [false]

        var checkset = new Set(dictionary);

        getWords(word, grid, checkset, row, col, visited, solutions_Set);
        }
    }
    solutions = Array.from(solutions_Set);
    //Array.from () will create an array instance 
    // Will make the solution_set appear as ["a" , "abc"]
    return solutions;

    }

    //Will search and find the words in the dictionary 
    //Will iterate over the grid 
    function getWords(word, grid, checkset, col, row, visited, solutions_Set) 
    { 
    //The checks will ensure that the code isn't out of bounds
    if (col < 0 || row <0 || col >= grid.length || row >= grid.length ||visited[col][row] == true)
    {
        return; 
    }
    
   //This will continously append the grid [col][row] value to the word set 
    word += grid[col][row]; 
    
    //1.Is that new word a prefix for any word in the trie/hash

    //1a.Check to see if the prefix is an actual word in the trie
    if (checkIfPrefixValue(checkset, word)) {
    visited[col][row] = true;
    
    //1b.if the word is present in the dictionary and size >3 then add to the solution set
    if (ValidWord(checkset, word)) {
    solutions_Set.add(word);
    }
    
    // Will call the getWords function and call each neighboring grid
    for (var i = 0; i < 8; i++) {
    getWords(word, grid, checkset, col + neighbor_set[i][0], row + neighbor_set[i][1], visited, solutions_Set);
    }
    }
    visited[col][row] = false;
    }


    //This function will check to ensure Params are valid
    function isGridValid (grid)
    {
    for (var i of grid)
    {
        if ( typeof i =='number' && (i!='q' || i!='s') && (i!='Q' || i!='S') )
        {
            return true;
        }
    }
    return true;
    }

    //This function will convert all the input data to one case
    function makewordsUpperCase(grid, dictionary) 
    {
        for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
        grid[i][j] = grid[i][j].toUpperCase();
         }
         }
         for (var x = 0; x < dictionary.length; x++) {
         dictionary[x] = dictionary[x].toUpperCase();
         }
        
    }

    //will return true if prefix is found in the checkset
    function checkIfPrefixValue(checkset, word) 
    { 
    
        for (var i of checkset) {
        if (i.substr(0, word.length) == word) {
        return true;
        }
        }
        return false;
        }
        
        //returns true if word is found in the checkset
        function ValidWord(checkset, word) 
        {
        for (var i of checkset) 
        {
        
        if (i == word && word.length >= m) 
        {
        return true;
        }
        }
        return false;
    }

// var grid = [['T', 'W', 'Y', 'R'],
//               ['E', 'N', 'P', 'H'],
//               ['G', 'Z', 'Qu', 'R'],
//               ['St', 'N', 'T', 'A']];
// var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
//                     'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
//                     'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];


var grid = [["A","QU"],["C","St"]];
var dictionary = ["AQU","STAC"];

console.log(exports.findAllSolutions(grid, dictionary));
