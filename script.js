
class tile {
  static flatCoordinates = [[1, 00], [2, 01], [3, 02], [4, 10], [5, 11], [6, 12], [7, 20], [8, 21], [9, 22]]
  constructor(coordinates, state) {
    this.coordinates = coordinates;
    this.state = state;
    this.flatten = () => {
      for (let i = 0; i <= 9; i++) {
        if (this.coordinates == tile.flatCoordinates[i][1]) {
          return tile.flatCoordinates[i][0];
        }
      }
    }
    this.array = () => {
      for (let i = 0; i <= 9; i++) {
        if (this.coordinates == tile.flatCoordinates[i][0]) {
          return tile.flatCoordinates[i][1];
        }
      }
    }
  }
}

var gameboard = {
  turnNum: 0,
  check(...args) {
    //console.log(args)
    for (let t = 0; t < 3; t++) {
      let xCount = 0;
      let oCount = 0;
      for (let i = 0; i < 3; i++) {
        //console.log(args[i])
        function getTile () {
          if (args.length > 1) {
            return "tile"+(args[t][i])
          }
          else {
            return "tile"+(args[0][i])
          }
        }
        let tileCheck = getTile() //note to future self: eval() parses str into var
        let check = gameboard[tileCheck].state
        //console.log(check);
        if (check == "o") {
          oCount++
        }
        else if (check == "x") {
          xCount++
        }
      }
      if (oCount == 3) {
        win();
        break;
      }
      if (xCount == 3) {
        win()
        break;
      }
      //console.log("oCount "+oCount)
      //console.log("xCount "+xCount)
    }
  },
  columnCheck: () => {
    let column0 = [1,4,7]
    let column1 = [2,5,8]
    let column2 = [3,6,9]
    gameboard.check(column0, column1, column2)
  },
  rowCheck: () => {
    let row0 = [1,2,3]
    let row1 = [4,5,6]
    let row2 = [7,8,9]
    gameboard.check(row0, row1, row2)
  },
  fSlashCheck: () => {
    let forwardSlash = [1,5,9]
    gameboard.check(forwardSlash)
  },
  bSlashCheck: () => {
    let backSlash = [3,5,7]
    gameboard.check(backSlash)
  }
}

function newBoard() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()] = new tile(i);
    gameboard["tile" + i.toString()].button = document.getElementById("tile" + i);
    gameboard["tile" + i.toString()].state = "-";
  }
}

function Turn() {
  //console.log("columnCheck: ")
  gameboard.columnCheck();
  //console.log("rowCheck: ")
  gameboard.rowCheck();
  //console.log("fSlashCheck: ")
  gameboard.fSlashCheck();
  //console.log("bSlashCheck: ")
  gameboard.bSlashCheck();
  if (gameboard.turnNum % 2 == 1) {
    console.log("Turn: "+gameboard.turnNum);
    playerTurn();
    return "player"
  }
  else if (gameboard.turnNum != -1) {
    console.log("Turn: "+gameboard.turnNum);
    cpuTurn();
    return "cpu"
  } 
}

function firstTurn() {
  //gameboard.turnNum = Math.floor((Math.random() * 2) + 1);
  gameboard.turnNum = 2;
  if (Turn() == "cpu") {
    let randomNum =  Math.floor((Math.random() * 9) + 1)
    //console.log(randomNum)

    //                  could place this into a function
    let selectedTile = document.getElementById("tile"+randomNum)
    selectedTile.innerHTML = "o"
    gameboard["tile" + randomNum].state = "o";
    //
  }
  else {Turn()}
}

function playerClick() {
  if (this.innerHTML == "") {
    this.innerHTML = "x";
    console.log(this)
    for (let i = 1; i <= 9; i++) {
      gameboard["tile" + i.toString()].button.removeEventListener("click", playerClick);
    }
    let value = this.value;
    gameboard["tile" + value.toString()].state = "x";
    gameboard.turnNum += 1;
    Turn();
  }
  else {
    alert("Choose another tile")
    //could make it so click event listener is added only to empty spaces
  }
}

function win() {
  alert("win");
  gameboard.turnNum = -1;
}

function playerTurn() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()].button.addEventListener("click", playerClick);
  }
}

function cpuTurn() {
  gameboard.turnNum += 1;
  Turn();
}


/* console.log(this)
  This shows that the scope of this gets set to global when you dont define the function with the add event listener
*/

newBoard()
firstTurn()
