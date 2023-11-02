import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import { ESign } from '../../models/Sign'
import { AppState, GridCell } from './app.state'

export const useAppStore = createWithEqualityFn<AppState>()(
  persist(
    immer((set, get) => ({
      ties: 0,
      xUser: {
        scores: 0,
      },
      oUser: {
        scores: 0,
      },

      timeoutThreshold: 0,
      remainingSeconds: 999,

      _currentTurn: ESign.X,
      _grid: [],

      initializeGame(mode, timeout = 30) {
        //   if (get()._grid.length) {
        //     return
        //   }

        console.warn('[GAME] Initialized')

        const initializeGrid = () => {
          const grid: Array<GridCell[]> = []

          for (let x = 0; x < mode; x++) {
            grid.push([])

            for (let y = 0; y < mode; y++) {
              grid[x].push({ x, y } as GridCell)
            }
          }

          return grid
        }

        const genratedGrid = initializeGrid()

        console.warn('[GAME] Grid:', genratedGrid)

        set(state => {
          state._grid = genratedGrid
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

      _resolveAnswer() {
        // const results

        //
        return []
      },
    })),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),

  shallow,
)
