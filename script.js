var gameboard = {}

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

function firstTurn() {
  let turn = Math.floor((Math.random() * 2) + 1)
  if (turn == 1) {
  }
  console.log(turn)
}

function playerClick() {
  this.innerHTML = "x"
  this.
}

function playerturn() {
  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()].button.addEventListener("click", playerClick())
  }

  for (let i = 1; i <= 9; i++) {
    gameboard["tile" + i.toString()].button.removeEventListener("click", playerClick())
  }
}



newBoard()
firstTurn()
playerturn()

console.log(gameboard)

//testing stuff

/*i = 2
gameboard["tile"+i].button.innerHTML = "x" */
