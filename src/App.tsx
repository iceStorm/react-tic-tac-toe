import { useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'

import { useAppStore } from './store/app/app.store'

import { Header } from './components/Header/Header.tsx'

import { Cell } from './components/Cell.tsx/Cell.tsx'
import { CountDown } from './components/CountDown/CountDown.tsx'

function App() {
  const [grid, currentTurn, makeMove, initializeGame] = useAppStore(state => [
    state._grid,
    state._currentTurn,
    state.makeMove,
    state.initializeGame,
  ])

  useEffect(() => {
    initializeGame(5, 15)
  }, [initializeGame])

  console.log('app renders...')

  const [gridWidth, setGridWidth] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const handleWindowSizeChange = () => {
    const maximumSize = Math.min(gridRef.current?.offsetHeight ?? 0, gridRef.current?.offsetWidth ?? 0)
    console.log('size:', maximumSize)

    setGridWidth(maximumSize)
  }

  useEffect(() => {
    handleWindowSizeChange()

    window.addEventListener('resize', handleWindowSizeChange)

    return () => {
      document.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return (
    <div className={clsx('h-screen mx-auto p-10', 'flex flex-col gap-16 items-center justify-center', 'bg-gray-50')}>
      <Header />

      <div ref={gridRef} className="flex-1 container p-0">
        <div
          className="grid justify-center"
          style={{
            gridTemplateColumns: `repeat(${grid.length}, ${gridWidth / grid.length}px)`,
            gridTemplateRows: `repeat(${grid.length}, ${gridWidth / grid.length}px)`,
          }}
        >
          {grid.map(row => {
            return row.map(({ x, y, checkedSign }) => {
              return (
                <Cell
                  key={`cell_${x}_${y}`}
                  x={x}
                  y={y}
                  checkedSign={checkedSign}
                  currentTurn={currentTurn}
                  capacity={grid.length}
                  lineWeight={5}
                  onClick={() => makeMove(x, y)}
                />
              )
            })
          })}
        </div>
      </div>

      {/* <div ref={gridRef} className={clsx('flex-1 container p-0', 'border-4 border-gray-300 rounded-lg')}>
        <div
          className="w-full grid justify-items-center"
          style={{
            gridTemplateColumns: `repeat(${grid.length}, ${gridWidth / grid.length}px)`,
            gridTemplateRows: `repeat(${grid.length}, ${gridWidth / grid.length}px)`,
          }}
        >
          {grid.map(row => {
            return row.map(({ x, y, checkedSign }) => {
              return (
                <Cell
                  key={`cell_${x}_${y}`}
                  x={x}
                  y={y}
                  checkedSign={checkedSign}
                  currentTurn={currentTurn}
                  capacity={grid.length}
                  lineWeight={5}
                  onClick={() => makeMove(x, y)}
                />
              )
            })
          })}
        </div>
      </div> */}

      <CountDown />
    </div>
  )
}

export default App
