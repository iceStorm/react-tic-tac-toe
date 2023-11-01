import { useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'

import { useAppStore } from './store/app/app.store'

import { Header } from './components/Header/Header.tsx'

import './App.css'
import { Cell } from './components/Cell.tsx/Cell.tsx'
import { CountDown } from './components/CountDown/CountDown.tsx'

function App() {
  const [grid, isXTurn, makeMove, initializeGame] = useAppStore(state => [
    state._grid,
    state._isXTurn,
    state.makeMove,
    state.initializeGame,
  ])

  useEffect(() => {
    initializeGame(3, 10)
  }, [initializeGame])

  console.log('app renders...')

  const [gridWidth, setGridWidth] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWindowSizeChange = () => {
      console.log('size:', gridRef.current?.getBoundingClientRect().width)

      setGridWidth(gridRef.current?.clientWidth ?? 0)
    }

    window.addEventListener('resize', handleWindowSizeChange)
    handleWindowSizeChange()

    return () => {
      document.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return (
    <div className={clsx('h-screen mx-auto px-10', 'flex flex-col gap-16 items-center justify-center', 'bg-gray-50')}>
      <div ref={gridRef} className={clsx('container p-0', 'border border-gray-300 rounded-lg')}>
        <div
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
                  isXTurn={isXTurn}
                  capacity={grid.length}
                  lineWeight={5}
                  onClick={() => makeMove(x, y)}
                />
              )
            })
          })}
        </div>
      </div>

      <CountDown />

      <Header />
    </div>
  )
}

export default App
