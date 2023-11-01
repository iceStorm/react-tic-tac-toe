import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

import { useAppStore } from './store/app/app.store'
import { Cell } from './components/Cell.tsx'

import './App.css'
import { Header } from './components/Header/Header.tsx'

function App() {
  const [grid, initializeGame, makeMove] = useAppStore(state => [state._grid, state.initializeGame, state.makeMove])

  const gridRef = useRef<HTMLDivElement>(null)
  const [gridWidth, setGridWidth] = useState(0)

  useEffect(() => {
    initializeGame(5)
  }, [initializeGame])

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setGridWidth(gridRef.current?.getBoundingClientRect().width ?? 0)
    }

    window.addEventListener('resize', handleWindowSizeChange)
    handleWindowSizeChange()

    return () => {
      document.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  console.log('app renders...')

  return (
    <div className={clsx('h-screen mx-auto', 'flex flex-col gap-36 items-center justify-center')}>
      <div className="container">
        <div
          ref={gridRef}
          className="w-full grid justify-items-center"
          style={{
            gridTemplateColumns: `repeat(${grid.length}, ${gridWidth / grid.length}px)`,
            gridTemplateRows: `repeat(${grid.length}, ${gridWidth / grid.length}px)`,
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
                  lineWeight={1}
                  onClick={() => makeMove(x, y)}
                />
              )
            })
          })}
        </div>
      </div>

      <Header />
    </div>
  )
}

export default App
