import { createWithEqualityFn } from 'zustand/traditional'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'

import { AppState, GridCell } from './app.state'
import { ESign } from '../../models/Sign'

export const useAppStore = createWithEqualityFn<AppState>()(
  immer((set, get) => ({
    ties: 0,
    xUser: {
      scores: 0,
    },
    oUser: {
      scores: 0,
    },

    timeoutThreshold: 0,
    remainingSeconds: 0,

    _currentTurn: ESign.X,
    _grid: [],

    initializeGame(gridCapacity = 3, timeout = 30) {
      //   if (get()._grid.length) {
      //     return
      //   }

      console.warn('[GAME] Initialized')

      set(state => {
        const grid: Array<GridCell[]> = []

        for (let x = 0; x < gridCapacity; x++) {
          grid.push([])

          for (let y = 0; y < gridCapacity; y++) {
            grid[x].push({ x, y } as GridCell)
          }
        }

        console.warn('[GAME] Grid:', grid)

        state._grid = grid
        state.timeoutThreshold = timeout
      })

      get().resetTimer()
    },

    makeMove(x, y) {
      set(state => {
        state._grid[x][y].checkedSign = get()._currentTurn
        state._currentTurn = get()._currentTurn === ESign.X ? ESign.O : ESign.X
      })

      get().resetTimer()
    },

    resetTimer() {
      clearInterval(get()._timerId)

      set(state => {
        state.remainingSeconds = get().timeoutThreshold
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
  })),

  shallow,
)
