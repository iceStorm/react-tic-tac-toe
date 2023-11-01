import { ESign } from '../../models/Sign'

export interface User {
  name?: string
  scores: number
}

export interface GridCell {
  x: number
  y: number
  checkedSign?: ESign
}

export interface AppState {
  _grid: GridCell[][]
  _timerId?: number
  _currentTurn: ESign

  /**
   * The total seconds for a turn.
   */
  timeoutThreshold: number

  /**
   * The remaining seconds for the current turn.
   */
  remainingSeconds: number

  ties: number
  xUser: User
  oUser: User

  initializeGame(gridCapacity?: number, timeout?: number): void

  resetTimer(): void

  /**
   * Place a move on the grid.
   * @param x the x coordinate
   * @param y the y coordinate
   */
  makeMove(x: number, y: number): void
}
