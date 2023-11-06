import { ESign } from '../../models/Sign'

export enum GameMode {
  '3vs3' = 3,
  '5vs5' = 5,
}

export type WinnerDirection = 'horizontal' | 'vertical' | 'diagonal-to-left' | 'diagonal-to-right'

export type WinnerInformation = {
  direction: WinnerDirection
  coordinates: number[][]
}

export interface User {
  name?: string
  scores: number
  moves: ESign[][]
}

export interface GridCell {
  checkedSign?: ESign
  key: string
}

export interface AppState {
  _mode: GameMode
  _grid: Array<Array<GridCell>>
  _timerId?: number
  _currentTurn: ESign

  winnerData?: WinnerInformation | null

  /**
   * The total seconds for a turn. Can be changed when a user just won
   */
  timeoutThreshold: number

  /**
   * The total seconds for a fresh turn.
   */
  initialTimeoutThreshold: number

  /**
   * The remaining seconds for the current turn.
   */
  remainingSeconds: number

  currentUser(): User

  ties: number
  xUser: User
  oUser: User

  initializeGame(mode: GameMode, timeout?: number): void

  _resetTimer(timeout?: number): void

  /**
   * Place a move on the grid.
   * @param x the x coordinate
   * @param y the y coordinate
   */
  makeMove(x: number, y: number): void

  /**
   * To find whether the current turn is resolved.
   */
  _isCurrentUserWins(): WinnerInformation | false | undefined

  _generateGridCells(): Array<GridCell[]>

  _generateUserMoves(): ESign[][]

  _resetMoves(): void
}
