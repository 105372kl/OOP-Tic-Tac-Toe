
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
      switch (oCount) {
        case 3:
          return "win";
        case 2:
          //console.log("hi");
          break;
        case 1:
          //console.log("hi");
          break;
      }
      switch (xCount) {
        case 3:
          return "win";
        case 2:
          //console.log("hi");
          break;
        case 1:
          //console.log("hi");
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
    return gameboard.check(column0, column1, column2)
  },
  rowCheck: () => {
    let row0 = [1,2,3]
    let row1 = [4,5,6]
    let row2 = [7,8,9]
    return gameboard.check(row0, row1, row2)
  },
  fSlashCheck: () => {
    let forwardSlash = [1,5,9]
    return gameboard.check(forwardSlash)
  },
  bSlashCheck: () => {
    let backSlash = [3,5,7]
    return gameboard.check(backSlash)
  }
}

function newBoard() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()] = new tile(i);
    gameboard["tile" + i.toString()].button = document.getElementById("tile" + i);
    gameboard["tile" + i.toString()].state = "-";
  }
}

function turn() {
  //console.log("columnCheck: ")
  let conditionsArray = [
    gameboard.columnCheck(),
    gameboard.rowCheck(),
    gameboard.fSlashCheck(),
    gameboard.bSlashCheck(),
  ]
  if (conditionsArray.indexOf("win") != -1) {
     win()
  }
  
  if (gameboard.turnNum % 2 == 1) {
    console.log("Turn: "+gameboard.turnNum);
    playerTurn();
  }
  else if (gameboard.turnNum != -1) {
    console.log("Turn: "+gameboard.turnNum);
    cpuTurn();
  } 
}

function firstTurn() {
  //gameboard.turnNum = Math.floor((Math.random() * 2) + 1);
  gameboard.turnNum = 1;
  turn();
}

function playerClick() {
  if (this.innerHTML == "") {
    this.innerHTML = "x";
    //console.log(this)
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
  if (gameboard.turnNum == 2) {
    randomMove();
  }
  let randomNum = Math.floor((Math.random() * 4) + 1)
  switch (randomNum) {
    case 1:
      cpuCheck("columnCheck()")
      break;
    case 2:
      cpuCheck("rowCheck()")
      break;
    case 3:
      cpuCheck("fSlashCheck()")
      break;
    case 4:
      cpuCheck("bSlashCheck()")
      break;
  }
  gameboard.turnNum += 1;
  turn();
}

function cpuCheck(randomcheck) {
  console.log("gameboard."+randomcheck)
}

function randomMove() {
  let randomNum =  Math.floor((Math.random() * 9) + 1)
  let selectedTile = document.getElementById("tile"+randomNum)
  if (gameboard["tile" + randomNum].state == "-") {
    selectedTile.innerHTML = "o"
    gameboard["tile" + randomNum].state = "o";
  }
  else {
    randomMove()
  }
}


/* console.log(this)
  This shows that the scope of this gets set to global when you dont define the function with the add event listener
*/

newBoard()
firstTurn()
