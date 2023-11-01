export interface User {
  name: string
}

export interface GridCell {
  x: number
  y: number
  isX?: boolean
}

export interface AppState {
  _grid: GridCell[][]

  firstUser?: User
  secondUser?: User

  initializeGame(gridCapacity?: number): void

  /**
   * Place a move on the grid.
   * @param x the x coordinate
   * @param y the y coordinate
   */
  makeMove(x: number, y: number): void
}
