import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import { v4 as uuidv4 } from 'uuid'

import { ESign } from '../../models/Sign'
import { AppState, GameMode, GridCell, WinnerDirection } from './app.state'

export const useAppStore = createWithEqualityFn(
  immer<AppState>((set, get) => ({
    _mode: GameMode['3vs3'],
    ties: 0,
    xUser: {
      scores: 0,
      moves: [],
    },
    oUser: {
      scores: 0,
      moves: [],
    },

    timeoutThreshold: 0,
    initialTimeoutThreshold: 0,
    remainingSeconds: 999,

    _currentTurn: ESign.X,
    _grid: [],

    currentUser() {
      return get()._currentTurn === ESign.X ? get().xUser : get().oUser
    },

    initializeGame(mode, timeout = 30) {
      if (get()._grid.length) {
        return
      }

      set(state => {
        state._mode = mode
        state.timeoutThreshold = timeout
        state.initialTimeoutThreshold = timeout
      })

      get()._resetMoves()
      get()._resetTimer()

      console.warn('[GAME] Initialized')
    },

    makeMove(x, y) {
      const currentTurn = get()._currentTurn

      set(state => {
        state._grid[x][y].checkedSign = currentTurn

        if (currentTurn === ESign.X) {
          state.xUser.moves[x][y] = currentTurn
        } else {
          state.oUser.moves[x][y] = currentTurn
        }
      })

      const currentUser = get().currentUser()
      console.log(currentTurn, 'moves:', currentUser.moves)

      const isWinner = get()._isCurrentUserWins()
      console.log(currentTurn, 'isWinner:', isWinner)

      const winnerWaitingTimeOut = 3
      if (isWinner !== false) {
        get()._resetTimer(winnerWaitingTimeOut)
      }

      set(state => {
        if (isWinner === false) {
          return
        }

        if (isWinner === undefined) {
          state.ties += 1
          return
        }

        state.winnerData = isWinner

        if (currentTurn === ESign.X) {
          state.xUser.scores++
          return
        }

        state.oUser.scores++
      })

      setTimeout(
        () => {
          if (isWinner !== false) {
            get()._resetMoves()
          }

          set(state => {
            state._currentTurn = currentTurn === ESign.X ? ESign.O : ESign.X
            state.winnerData = undefined
          })

          get()._resetTimer()
        },
        isWinner ? winnerWaitingTimeOut * 1000 : 0,
      )
    },

    _generateGridCells() {
      const size = get()._mode

      const gridBoard = new Array<GridCell[]>(size).fill(new Array(size))

      gridBoard.forEach((row, index) => {
        row[index] = {
          key: uuidv4(),
        }
      })

      return gridBoard
    },

    _generateUserMoves() {
      const size = get()._mode
      return new Array(size).fill(new Array(size).fill(undefined))
    },

    _resetMoves() {
      set(state => {
        state._grid = get()._generateGridCells()
        state.xUser.moves = get()._generateUserMoves()
        state.oUser.moves = get()._generateUserMoves()
      })

      console.warn('[GRID RESET]', get()._grid, get().xUser, get().oUser)
    },

    _resetTimer(timeout?: number) {
      clearInterval(get()._timerId)

      set(state => {
        state.remainingSeconds = timeout ?? get().initialTimeoutThreshold
        state.timeoutThreshold = timeout ?? get().initialTimeoutThreshold
      })

      const timerId = setInterval(() => {
        if (get().remainingSeconds === 0) {
          console.warn('GAME] Current turn has expired')
          return clearInterval(timerId)
        }

        set(state => {
          state.remainingSeconds -= 1
        })
      }, 1000)

      set(state => {
        state._timerId = timerId
      })
    },

    _isCurrentUserWins() {
      let direction: WinnerDirection | undefined
      const coordinates: number[][] = []

      const grid = get()._grid
      const currentTurn = get()._currentTurn
      const currentUser = get().currentUser()

      console.log('resolving for:', currentTurn, currentUser)

      const checkedDiagonalToLeftCoordinates = []
      const checkedDiagonalToRightCoordinates = []

      for (let x = 0; x < currentUser.moves.length; ++x) {
        const checkedHorizontalCoordinates = []
        const checkedVerticalCoordinates = []

        for (let y = 0; y < currentUser.moves[x].length; ++y) {
          // check the current horizontal axis cells
          if (currentUser.moves[x][y]) {
            checkedHorizontalCoordinates.push([x, y])
          }

          // check the current vertical axis cells
          if (currentUser.moves[y][x]) {
            checkedVerticalCoordinates.push([y, x])
          }

          // check the diagonal-to-left axis ([0, 0], [1, 1], [2, 2])
          if (x === y && currentUser.moves[x][y]) {
            checkedDiagonalToLeftCoordinates.push([x, y])
          }

          // check the diagonal-to-right axis ([0, 2], [1, 1], [2, 0])
          if ((Math.abs(x - y) === 2 || (x === 1 && y === 1)) && currentUser.moves[x][y]) {
            checkedDiagonalToRightCoordinates.push([x, y])
          }
        }

        if (checkedHorizontalCoordinates.length === 3) {
          direction = 'horizontal'
          coordinates.push(...checkedHorizontalCoordinates)
          break
        }

        if (checkedVerticalCoordinates.length === 3) {
          direction = 'vertical'
          coordinates.push(...checkedVerticalCoordinates)
          break
        }

        if (checkedDiagonalToLeftCoordinates.length === 3) {
          direction = 'diagonal-to-left'
          coordinates.push(...checkedDiagonalToLeftCoordinates)
          break
        }

        if (checkedDiagonalToRightCoordinates.length === 3) {
          direction = 'diagonal-to-right'
          coordinates.push(...checkedDiagonalToRightCoordinates)
          break
        }
      }

      // the shared grid between x and o has no left cells to place
      const isOutOfMoves = grid.every(row => row.every(cell => Boolean(cell.checkedSign)))

      if (!direction) {
        if (isOutOfMoves) {
          return undefined
        }

        return false
      }

      return {
        direction,
        coordinates,
      }
    },
  })),

  shallow,
)
