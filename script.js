var gameboard = {}
var turn = 0;

class tile {
  static flattenCoordinates = [[1, 00], [2, 01], [3, 02], [4, 10], [5, 11], [6, 12], [7, 20], [8, 21], [9, 22]]
  constructor(coordinates, state) {
    this.coordinates = coordinates;
    this.state = state;
    this.flatten = () => {
      for (let i = 0; i <= 9; i++) {
        if (this.coordinates == tile.flattenCoordinates[i][1]) {
          return tile.flattenCoordinates[i][0];
        }
      }
    }
    this.array = () => {
      for (let i = 0; i <= 9; i++) {
        if (this.coordinates == tile.flattenCoordinates[i][0]) {
          return tile.flattenCoordinates[i][1];
        }
      }
    }
  }
}

function newBoard() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()] = new tile(i)
    gameboard["tile" + i.toString()].button = document.getElementById("tile" + i)
  }
}

function Turn() {
  if (turnNum % 2 == 1) {
    playerTurn();
  }
  else{
    cpuTurn();
  } 
  console.log("Turn: "+turnNum);
}

function firstTurn() {
  turnNum = Math.floor((Math.random() * 2) + 1);
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
  turnNum += 1;
  Turn();
}

function playerTurn() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()].button.addEventListener("click", playerClick);
  }
}

function cpuTurn() {
  //alert("hi")
  turnNum += 1;
  Turn();
}


/* console.log(this)
  This shows that the scope of this gets set to global when you dont define the function with the add event listener
*/

newBoard()
firstTurn()

console.log(gameboard)

//testing stuff

/*i = 2
gameboard["tile"+i].button.innerHTML = "x" */
