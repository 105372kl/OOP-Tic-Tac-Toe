class gameboardObject {
  constructor() {
    this.turnNum = 0,
    //"args" accepts two value types: "attack" (boolean), and a series of tile numbers. The first defines whether or not the function will return the tile number of a tile with the value "o", or if the function will operate normally. In normal operation, the function will parse through any series of tile numbers (rows, columns, diagonals) that is passed as parameters, and return the series of tile numbers where a possible play is availabe (e.g. playing an "o" in the "1,2,3" row)
    this.check = (...args) => {
    // If parameter "attack" is true (which is read as the first item in array "args", then make a new variable)
    if (args[0] == true) {
      var attack = true;
    }
    //Remove the first item of array "args" (which would be the "attack" parameter), so that it is not read as a combo/series of tile numbers
    args.shift();
    let xCount = 0;
    let oCount = 0;
    //Loops through each number in combo array
    for (let i = 0; i < 3; i++) {
      let tileCheck = "tile" + (args[0][i])
      let check = gameboard[tileCheck].state
      //Counts up number of "x" or "o" in given combo array
      switch (check) {
        case "o":
          oCount++
          break;
        case "x":
          xCount++
          break;
      }
    }
    //getLine is called after all "x" and "o" have been counted, a cloned array of current combo is given, with a value ("x" or "o") attached to the front to be read later
    function getLine(value) {
      let array = args[0].slice()
      array.unshift(value)
      return array
    }
    switch (oCount) {
      case 3:
        return "win";
      case 2: //Why does "&& oCount == 0" not work?
        if (xCount == 0) {
          return getLine("o");
        }
      case 1:
        if (attack == true) {
          if (xCount == 0) {
            return getLine();
          }
        }
    }
    switch (xCount) {
      case 3:
        return "win";
      case 2:
        if (oCount == 0) {
          return getLine("x");
        }
    }
  },
    this.column0 = [1, 4, 7],
    this.column1 = [2, 5, 8],
    this.column2 = [3, 6, 9],
  
    this.columnCheck = (attack = false, x) => {
      return gameboard.check(
        attack,
        gameboard["column"+x]
      )
    },
    this.row0 = [1, 2, 3],
    this.row1 = [4, 5, 6],
    this.row2 = [7, 8, 9],
  
    this.rowCheck = (attack = false, x) => {
      return gameboard.check(
        attack,
        gameboard["row"+x]
      )
    },
    this.forwardSlash = [1, 5, 9],
  
    this.fSlashCheck = (attack = false) => {
      return gameboard.check(
        attack,
        gameboard.forwardSlash
      )
    },
    this.backSlash = [3, 5, 7],
  
    this.bSlashCheck = (attack = false) => {
      return gameboard.check(
        attack,
        gameboard.backSlash
      )
    }
  }
}

class tile {
  constructor(coordinates, state) {
    this.coordinates = coordinates;
    this.state = state;
  }
}

var gameboard = []
newBoard()
firstTurn()

function newBoard() {
  gameboard = new gameboardObject
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()] = new tile(i);
    gameboard["tile" + i.toString()].button = document.getElementById("tile" + i);
    gameboard["tile" + i.toString()].state = "-";
  }
}
//Generates a random number to decide whether the player (odds) or CPU (evens) go first
function firstTurn() {
  gameboard.turnNum = randomInt(1, 2);
  //gameboard.turnNum = 1;
  turn();
}

//First checks if any winning moves have been made, if not, checks if there is a draw, if not, trigger player or CPU turn
function turn() {
  let conditionsArray = [
    gameboard.columnCheck(false, 0),
    gameboard.columnCheck(false, 1),
    gameboard.columnCheck(false, 2),
    gameboard.rowCheck(false, 0),
    gameboard.rowCheck(false, 1),
    gameboard.rowCheck(false, 2),
    gameboard.fSlashCheck(false),
    gameboard.bSlashCheck(false),
  ]
  if (conditionsArray.indexOf("win") != -1) {
    win()
  }
  else if (checkDraw() == 0) {
    draw()
  }

  if (gameboard.turnNum % 2 == 1) {
    playerTurn();
  }
  else if (gameboard.turnNum != -1) {
    cpuTurn();
  }
}

function win() {
  switch (gameboard.turnNum % 2) {
    case 0:
      alert("Player Wins");
      break;
    case 1:
      alert("CPU Wins");
      break;
  }
  gameboard.turnNum = -1;
}


// Loops through each of gameboard's 9 tiles to check its state and returns the number of empty tiles.
function checkDraw() {
  let drawCount = 0
  let tiles = []
  for (let i = 1; i <= 9; i++) {
    tiles.push("tile"+i)
  }
  for (let i = 0; i < tiles.length; i++) {
    if (gameboard[tiles[i]].state == "-") {
      drawCount++
    }
  }
  return drawCount
}

function draw() {
  alert("Draw");
  gameboard.turnNum = -1;
}

//Allows the player to click on tiles
function playerTurn() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()].button.addEventListener("click", playerClick);
  }
}

//Checks if clicked tile is empty, if so, change state of tile to X, change HTML of tile to X, and prevent player from choosing another tile.
function playerClick() {
  if (this.innerHTML == "") {
    this.innerHTML = "x";
    this.classList.add("x");
    for (let i = 1; i <= 9; i++) {
      gameboard["tile" + i.toString()].button.removeEventListener("click", playerClick);
    }
    let value = this.value;
    gameboard["tile" + value.toString()].state = "x";
    gameboard.turnNum += 1;
    turn();
  }
  else {
    alert("Choose another tile")
    //could make it so click event listener is added only to empty spaces
  }
}


// Checks board for optimal playable moves and plays them if not, checks board to find any "o" tiles, and "attacks" by playing a tile in the same column/row/diagonal of that "o" tile, if not, play random tile
function cpuTurn() {
  let playableLines = checkBoard();
  if (playableLines.length != 0) {
    //Plays winning moves first, before playing blocking moves
    if (cpuPlayTile(playableLines, "o") != "turnPlayed") {
      cpuPlayTile(playableLines, "x")
    }
  }
  else {
    cpuAttack()
  }
  gameboard.turnNum += 1;
  turn();
}

function checkBoard(attack) {

  let checkList = [
    "columnCheck(false, 0",
    "columnCheck(false, 1",
    "columnCheck(false, 2",
    "rowCheck(false, 0",
    "rowCheck(false, 1",
    "rowCheck(false, 2",
    "fSlashCheck(false",
    "bSlashCheck(false",
  ]
  // If CPU is attacking, replace "false" with "true" to make an "attack check" to find a tile that already has an "o" is found, in order to play another "o" in the same column/row/diagonal
  if (attack == true) {
    checkList.forEach((element, index) => {
      checkList[index] = element.replace("false","true")
    })
  }
  
  //Checks each column/row/diagonal for any optimal playable moves.
  let unfilteredPlayableLines = []
  checkList.forEach(getPlayableLine, unfilteredPlayableLines)
  
  // Filters plays to remove any "undefined"/non-optimal plays
  let playableLines = unfilteredPlayableLines.filter((n) => {
    return n != null;
  });
  
  return playableLines
}

//Checks each column/row/diagonal for any optimal playable moves.
function getPlayableLine(check) {
  let line = eval("gameboard." + check + ")")
  this.push(line)
}

//For each playable move, if attacking, then play a tile in the same column/row/diagonal as another "o" tile, if not, then play tiles that have a value of "o" first, and then "x" second

function cpuPlayTile(playableLines, value) {
  for (let i = 0; i < playableLines.length; i++) {
    if (value == "attack") {
      if (fillGap(playableLines[i]) == "turnPlayed") {
        return "turnPlayed";
      }
    }
    if (playableLines[i][0] == value) {
      if (fillGap(playableLines[i]) == "turnPlayed") {
        return "turnPlayed";
      }
    }
  }
}

//For each tile in given combo/array, check if empty, if so, play "o"

function fillGap(playableLines) {
  playableLines.shift()
  for (let i = 0; i < playableLines.length; i++) {
    let tileCheck = "tile"+playableLines[i]
    if (gameboard[tileCheck].state == "-") {
      let tileDOM = document.getElementById(tileCheck)
      gameboard[tileCheck].state = "o";
      tileDOM.innerHTML = "o";
      tileDOM.classList.add("o");
      return "turnPlayed"
    }
  }
}

//Check board again, but now with "attack check", if there are no attack moves, perform a random move.
function cpuAttack() {
  let playableLines = checkBoard(true);
  if (playableLines.length > 0) {
    cpuPlayTile(playableLines, "attack")
  }
  else {
    randomMove()
  }
}

function randomMove() {
  let randomNum = randomInt(1, 9)
  let selectedTile = "tile" + randomNum
  let selectedTileDOM = document.getElementById(selectedTile)
  if (gameboard[selectedTile].state == "-") {
    selectedTileDOM.innerHTML = "o"
    gameboard[selectedTile].state = "o";
    selectedTileDOM.classList.add("o");
  }
  else {
    randomMove()
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*Missing Features:
  - Play moves adjacent to previously played tile
  - Turn counter
  - Win counter
  - Reset button
  - strike through line?
  - 3D CSS?
  - Colored X and Os
*/