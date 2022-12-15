const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}


//Currently failing these 
describe('Boggle Solver tests suite:', () => 
{
  describe('Normal input', () =>{
    
  //   //Test for normal case 3x3
     test("3x3 case", ()=>{
      let grid = [
        ["C", "E", "D"],
        ["U", "K", "H"],
        ["A", "T", "I"],
      ];
      let dictionary = ["HIT", "AT", "HIKE", "CUT"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["HIT", "HIKE", "CUT"];
      

      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
     });
  //   //Test for normal case 4x4
    test("4x4 case", ()=>{
      var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['St', 'N', 'T', 'A']];
      let dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = [
              'ten',   'wet',    'went',
              'net',   'new',    'newt',
              'pry',   'prat',   'get',
              'gent',  'qua',    'quar',
              'quart', 'quartz', 'rat',
              'tar',   'tarp',   'art'
            ]
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
     });
  //   //Test for normal case 5x5
  test("5x5 case", ()=>{
      let grid = [
        ["A", "B", "C","D","E"],
        ["J", "I", "H","G","F"],
        ["K", "L", "M","N","O"],
        ["T", "S", "R","Q","P"],
        ["U", "V", "W","X","Y"]
      ];
      let dictionary = ["ABC", "MQN", "YPXW", "DEF","YUV","XYZ"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = ["ABC", "MQN", "YPXW","DEF"]
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
     });
  //   //word that takes the entire grid
  // test("Word ", ()=>{


  //     lowercaseStringArray(solutions);
  //     lowercaseStringArray(expected);
  //     expect(solutions.sort()).toEqual(expected.sort());
  //    });
  });

  
  describe('Problem contraints', () => {
    // Cases such as Qu
    //Test for only returning words with 3+ characters
    //Test for Qu or Sr tile count as 2 letters (can't skip the 'u' or 't')
    test("QU case test", ()=>{
      let grid = [["A", "QU"],["C", "St"]];
      let dictionary = ["AQU", "STAC"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = [ 'aqu', 'stac' ]
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
     });

     test("Test for 3+ in length", ()=>{
      let grid = [["A", "QU"],["C", "St"]];
      let dictionary = ["A","AQU", "STAC"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      let expected = [ 'AQU', 'STAC' ]
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
     });

    //   test("Test for Qu or Sr tile count as 2 letters", ()=>{
    //   let grid = [["A", "QU"],["C", "St"]];
    //   let dictionary = ["A","AQU", "STAC"];
    //   let solutions = boggle_solver.findAllSolutions(grid, dictionary);
    //   let expected = [ 'AQU', 'STAC' ]
    //   lowercaseStringArray(solutions);
    //   lowercaseStringArray(expected);
    //   expect(solutions.sort()).toEqual(expected.sort());
    //  });
 
  });

  
  describe('Input edge cases', () => {

    // Example Test using Jess
    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutiona, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('The grid is 1x1', ()  =>{
      let grid = [['A']];
      let dictionary = ["AB","ABC"];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    test('Grid is 0x0', ()  =>{
      let grid = [];
      let dictionary = ["AB","ABC"];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
    
  });
});