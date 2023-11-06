import { useEffect, useRef, useState } from 'react'

import { useSize } from 'ahooks'
import clsx from 'clsx'

import { useAppStore } from '../../store/app'
import { Cell } from '../Cell'

interface GridProps {
  onGridWidthDefined(width: number): void
}

const GRID_GAP = 8

export function Grid({ onGridWidthDefined }: GridProps) {
  const [grid, makeMove] = useAppStore(state => [state._grid, state.makeMove])

  const [gridHeight, setGridHeight] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const gridSize = useSize(gridRef)

  // console.log('grid size:', gridSize)

  useEffect(() => {
    // get maximum height that a grid cell can be
    const maximumWidth = Math.min(gridSize?.width ?? 0, gridSize?.height ?? 0)

    setGridHeight(maximumWidth)

    onGridWidthDefined(maximumWidth)
  }, [gridSize?.height, gridSize?.width, onGridWidthDefined])

  return (
    <div
      ref={gridRef}
      className={clsx('flex-1 container', 'grid justify-center')}
      style={{
        gap: `${GRID_GAP}px`,
        gridTemplateColumns: `repeat(${grid.length}, ${gridHeight / grid.length - GRID_GAP}px)`,
        gridTemplateRows: `repeat(${grid.length}, ${gridHeight / grid.length - GRID_GAP}px)`,
      }}
    >
      {grid.map((row, x) => {
        return row.map(({ key, checkedSign }, y) => {
          return <Cell key={key} x={x} y={y} checkedSign={checkedSign} onClick={() => makeMove(x, y)} />
        })
      })}
    </div>
  )
}
