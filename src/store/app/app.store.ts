import { createWithEqualityFn } from 'zustand/traditional'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'

import { AppState, GridCell } from './app.state'

export const useAppStore = createWithEqualityFn<AppState>()(
  immer((set, get) => ({
    _grid: [],

    initializeGame(gridCapacity = 3) {
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
      })
    },

    makeMove(x, y) {
      set(state => {
        state._grid[x][y].isX = true
      })
    },
  })),

  shallow,
)
