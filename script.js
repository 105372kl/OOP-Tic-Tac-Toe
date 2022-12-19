
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
  columnCheck: () => {
    let column0 = [1,4,7]
    let column1 = [2,5,8]
    let column2 = [3,6,9]
    let xCount = 0;
    let oCount = 0;
    for (let t = 0; t < 3; t++) {
      for (let i = 0; i < 3; i++) {
        //let check = gameboard["tile"+(("column"+t)[i])][state]
        //let test = "tile"+(("column"+t)[i])
        //console.log(test)
        //let check = (gameboard.test.state) //why doesnt accept second property in bracket notation
        console.log(check)
        if (check == "o") {
          oCount++
        }
        else if (check == "x") {
          xCount++
        }
      }
    }
    console.log(xCount)
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
  if (gameboard.turnNum % 2 == 1) {
    playerTurn();
  }
  else{
    cpuTurn();
  } 
  console.log("Turn: "+gameboard.turnNum);
}

function firstTurn() {
  gameboard.turnNum = Math.floor((Math.random() * 2) + 1);
  Turn();
}

function playerClick() {
  this.innerHTML = "x";
  //console.log(this)
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()].button.removeEventListener("click", playerClick);
  }
  let value = this.value;
  gameboard["tile" + value.toString()].state = "x";
  gameboard.turnNum += 1;
  Turn();
}

function playerTurn() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()].button.addEventListener("click", playerClick);
  }
}

function cpuTurn() {
  //alert("hi")
  gameboard.turnNum += 1;
  Turn();
}


/* console.log(this)
  This shows that the scope of this gets set to global when you dont define the function with the add event listener
*/

newBoard()
console.log(gameboard)
firstTurn()
gameboard.columnCheck()

console.log(gameboard)

//testing stuff

/*i = 2
gameboard["tile"+i].button.innerHTML = "x" */
