class Square {
  constructor(value) {
    this.value = value;
  }
}
 
class TicTacToe {
  constructor() {
    this.board = [
      [new Square(null), new Square(null), new Square(null)],
      [new Square(null), new Square(null), new Square(null)],
      [new Square(null), new Square(null), new Square(null)]
    ];
    this.currentPlayer = "X";
  }
 
  // Returns true if the game is over, false otherwise
  isGameOver() {
    // Check rows
   for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0].value === this.board[i][1].value &&
        this.board[i][1].value === this.board[i][2].value &&
        this.board[i][0].value !== null
      ) {
        return true;
      }
    }
 
    // Check columns
    for (let j = 0; j < 3; j++) {
      if (
        this.board[0][j].value === this.board[1][j].value &&
        this.board[1][j].value === this.board[2][j].value &&
        this.board[0][j].value !== null
      ) {
        return true;
      }
    }
 
    // Check diagonals
    if (
      this.board[0][0].value === this.board[1][1].value &&
      this.board[1][1].value === this.board[2][2].value &&
      this.board[0][0].value !== null
    ) {
      return true;
    }
 
    if (
      this.board[0][2].value === this.board[1][1].value &&
      this.board[1][1].value === this.board[2][0].value &&
      this.board[0][2].value !== null
    ) {
      return true;
    }
 
    // Check if there are any empty squares
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j].value === null) {
          return false;
        }
      }
    }
 
    // If we reach here, the game is a draw
    return true;
  }
 
  // Makes a move at the specified position for the current player
  makeMove(i, j) {
    if (this.board[i][j].value === null) {
      this.board[i][j].value = this.currentPlayer;
      if (this.currentPlayer === "X") {
        this.currentPlayer = "O";
      } else {
        this.currentPlayer = "X";
      }
    }
  }
}
 
// Create a new game
const game = new TicTacToe();
 
// Play a game
while (!game.isGameOver()) {
  // Prompt the current player to make a move