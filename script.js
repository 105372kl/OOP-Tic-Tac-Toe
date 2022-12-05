class tile {
  constructor(coordinates, state) {
    this.coordinates = coordinates;
    this.state = state;
    this.flatten = () => {
      alert("hi");
      for (let i = 0; i <= 9; i++) {
        if (this.coordinates == tile.flattenCoordinates[i][1]) {
          return tile.flattenCoordinates[i][0];          
        }
      }
    }
  }
  static flattenCoordinates = [[1,00],[2,01],[3,02],[4,10],[5,11][6,12],[7,20],[8,21],[9,22]]
}
let lol = new tile("02", "x");
let num = lol.flatten();
console.log(num);
