import { useEffect, useState } from 'react'

import { useAppStore } from './store/app/app.store'
import { Cell } from './components/Cell.tsx'

import './App.css'

const gridMargin = 20

function App() {
  const [grid, initializeGame, makeMove] = useAppStore(state => [state._grid, state.initializeGame, state.makeMove])

  const [screenWidth, setScreenWidth] = useState(1)

  useEffect(() => {
    initializeGame(3)
  }, [initializeGame])

  console.log('app renders...')

  useEffect(() => {
    const handleWindowSizeChange = () => {
      console.log('resize:', window.innerWidth)

      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowSizeChange)
    handleWindowSizeChange()

    return () => {
      document.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="grid justify-items-center"
        style={{
          gridTemplateColumns: `repeat(${grid.length}, ${screenWidth / grid.length - gridMargin}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${screenWidth / grid.length - gridMargin}px)`,
        }}
      >
        {grid.map(row => {
          return row.map(({ x, y, isX }) => {
            return (
              <Cell
                key={`cell_${x}_${y}`}
                x={x}
                y={y}
                isX={isX}
                capacity={grid.length}
                lineWeight={0.5}
                onClick={() => {
                  makeMove(x, y)
                }}
              />
            )
          })
        })}
      </div>
    </div>
  )
}

export default App
