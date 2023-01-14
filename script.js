
class tile {
  //static flatCoordinates = [[1, 00], [2, 01], [3, 02], [4, 10], [5, 11], [6, 12], [7, 20], [8, 21], [9, 22]]
  constructor(coordinates, state) {
    this.coordinates = coordinates;
    this.state = state;
    // this.flatten = () => {
    //   for (let i = 0; i <= 9; i++) {
    //     if (this.coordinates == tile.flatCoordinates[i][1]) {
    //       return tile.flatCoordinates[i][0];
    //     }
    //   }
    // }
    // this.array = () => {
    //   for (let i = 0; i <= 9; i++) {
    //     if (this.coordinates == tile.flatCoordinates[i][0]) {
    //       return tile.flatCoordinates[i][1];
    //     }
    //   }
    // }
  }
}
class gameboardObject {
  constructor() {
    this.turnNum = 0,
    this.check = (...args) => {
    //console.log(args)
    if (args[0] == true) {
      var attack = true;
    }
    args.shift();
    for (let t = 0; t < 3; t++) {
      let xCount = 0;
      let oCount = 0;
      for (let i = 0; i < 3; i++) {
        //console.log(args[t])
        function getTile() {
          if (args.length > 1) {
            return "tile" + (args[t][i])
          }
          else {
            return "tile" + (args[0][i])
          }
        }
        let tileCheck = getTile() //note to future self: eval() parses str into var
        let check = gameboard[tileCheck].state
        //console.log(check);
        switch (check) {
          case "o":
            oCount++
            break;
          case "x":
            xCount++
            break;
        }
      }
      function getLine(value) {
        function filterArrays(x, value) {
          let checkedArrays = args[x].filter((element) => {
            return element !== undefined;
          });
          checkedArrays.unshift(value)
          return checkedArrays
        }
        if (args.length > 1) {
          return filterArrays(t, value)
        }
        else {
          return filterArrays(0, value)
        }
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
    }
  },
    this.column0 = [1, 4, 7],
    this.column1 = [2, 5, 8],
    this.column2 = [3, 6, 9],
  
    this.columnCheck = (attack = false) => {
      return gameboard.check(
        attack,
        gameboard.column0,
        gameboard.column1,
        gameboard.column2
      )
    },
    this.row0 = [1, 2, 3],
    this.row1 = [4, 5, 6],
    this.row2 = [7, 8, 9],
  
    this.rowCheck = (attack = false) => {
      return gameboard.check(
        attack,
        gameboard.row0,
        gameboard.row1,
        gameboard.row2
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

function newBoard() {
  gameboard = new gameboardObject
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()] = new tile(i);
    gameboard["tile" + i.toString()].button = document.getElementById("tile" + i);
    gameboard["tile" + i.toString()].state = "-";
  }
}

function turn() {
  //console.log("columnCheck: "+gameboard.columnCheck())
  let conditionsArray = [
    gameboard.columnCheck(),
    gameboard.rowCheck(),
    gameboard.fSlashCheck(),
    gameboard.bSlashCheck(),
  ]
  if (conditionsArray.indexOf("win") != -1) {
    win()
  }

  if (checkDraw() == 0) {
    draw()
  }

  if (gameboard.turnNum % 2 == 1) {
    console.log("Turn: " + gameboard.turnNum);
    playerTurn();
  }
  else if (gameboard.turnNum != -1) {
    console.log("Turn: " + gameboard.turnNum);
    cpuTurn();
  }
}

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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function firstTurn() {
  //gameboard.turnNum = randomInt(1, 2);
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
  console.log("win")
  switch (gameboard.turnNum % 2) {
    case 0:
      alert("pog");
      break;
    case 1:
      alert("skill issue");
      break;
  }
  gameboard.turnNum = -1;
}

function draw() {
  alert("draw");
  gameboard.turnNum = -1;
}

function playerTurn() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()].button.addEventListener("click", playerClick);
  }
}

function cpuTurn() {
  // if (gameboard.turnNum == 2) {
  //   randomMove();
  // }
  let playableLines = checkBoard();
  if (playableLines.length > 0) {
    console.log(JSON.stringify(playableLines))
    cpuPlayTile(playableLines)
  }
  else {
    cpuAttack()
  }
  gameboard.turnNum += 1;
  turn();
}

function cpuAttack() {
  let attack = true
  let playableLines = checkBoard(attack);
  if (playableLines.length > 0) {
    console.log("attack: "+JSON.stringify(playableLines))
    cpuPlayTile(playableLines)
    
  }
  else {
    randomMove()
  }
}

function cpuPlayTile(playableLines) {
  for (let i = 0; i < playableLines.length; i++) {
    let turn = fillGap(playableLines[i])
    if (turn == "turnPlayed") {
      break;
    }
  }
}

function checkBoard(attack) {
  let checkList = [
    "columnCheck(",
    "rowCheck(",
    "fSlashCheck(",
    "bSlashCheck(",
  ]
  if (attack == true) {
    checkList.forEach((element, index) => {
      checkList[index] = element+"attack"
    })
  }
  //console.log(checkList)
  let unfilteredPlayableLines = []
  checkList.forEach(getLine, unfilteredPlayableLines) //DOES NOT ACTIVATE GETLINE FOR EACH COLUMN/ROW








  
  console.log(JSON.stringify("unfilteredPlayableLines: "+unfilteredPlayableLines))
  
  let playableLines = unfilteredPlayableLines.filter((n) => {
    return n != null;
  });
  return playableLines
}

function getLine(check) {
  console.log("gameboard." + check + ")")
  let attack = true;
  let line = eval("gameboard." + check + ")")
  this.push(line)
}

function fillGap(playableLines) {
  playableLines.shift()
  for (let i = 0; i < playableLines.length; i++) {
    let tileCheck = "tile"+playableLines[i]
    if (gameboard[tileCheck].state == "-") {
      let tileDOM = document.getElementById(tileCheck)
      gameboard[tileCheck].state = "o";
      tileDOM.innerHTML = "o";
      return "turnPlayed"
    }
  }
}
  
// function cpuCheck(check) {
//   console.log(check)
//   switch (eval("gameboard." + check + ")")) {
//     case "o2":
//       console.log('case1')
//       cpuFillGap(check)
//       break;
//     case "x2":
//       console.log('case2')
//       cpuFillGap(check)
//       break;
//   }
// }
    
// function cpuFillGap(check) {
//   let fillGap = true;
//   let getTileCheck = eval("gameboard." + check + fillGap + ")")
//   console.log(getTileCheck)
//   if (getTileCheck == "none") {
//     alert("none")
//   }
//   else {
//     console.log("gameboard." + check + fillGap + ")")
//     let tileDOM = document.getElementById(getTileCheck)
//     if (gameboard[getTileCheck].state == "-") {
//       gameboard[getTileCheck].state = "o"
//       tileDOM.innerHTML = "o"
//     }
//   }
// }

function randomMove() {
  let randomNum = randomInt(1, 9)
  let selectedTile = "tile" + randomNum
  let selectedTileDOM = document.getElementById(selectedTile)
  if (gameboard[selectedTile].state == "-") {
    selectedTileDOM.innerHTML = "o"
    gameboard[selectedTile].state = "o";
  }
  else {
    randomMove()
  }
}
var gameboard = []
newBoard()
firstTurn()
