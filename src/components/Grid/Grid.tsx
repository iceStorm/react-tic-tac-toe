import { useEffect, useMemo, useRef, useState } from 'react'

import { useSize } from 'ahooks'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { useAppStore } from '../../store/app'
import { Cell } from '../Cell'

interface GridProps {
  onGridWidthDefined(width: number): void
}

const GRID_GAP = 8

export function Grid({ onGridWidthDefined }: GridProps) {
  const [grid, winnerData, makeMove] = useAppStore(state => [state._grid, state.winnerData, state.makeMove])

  const [gridHeight, setGridHeight] = useState(0)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const gridSize = useSize(gridContainerRef)

  // console.log('grid size:', gridSize)

  const coordinates = useMemo(() => {
    function getCenteredCellCoordinates() {
      const centeredCoordinates = []

      for (let i = 0, firstY = gridHeight / (grid.length * 2); i < grid.length * 2; ++i) {
        if (i % 2 !== 0) {
          continue
        }

        centeredCoordinates.push(firstY * (i + 1))
      }

      return centeredCoordinates
    }

    switch (winnerData?.direction) {
      case 'horizontal': {
        const centeredCoordinates = getCenteredCellCoordinates()
        const winRowIndex = winnerData.coordinates[0][0]
        const yCoordinate = centeredCoordinates[winRowIndex]

        return {
          x1: 0,
          y1: yCoordinate,
          x2: gridHeight,
          y2: yCoordinate,
        }
      }

      case 'vertical': {
        const centeredCoordinates = getCenteredCellCoordinates()
        const winRowIndex = winnerData.coordinates[0][1]
        const xCoordinate = centeredCoordinates[winRowIndex]

        return {
          x1: xCoordinate,
          y1: 0,
          x2: xCoordinate,
          y2: gridHeight,
        }
      }

      case 'diagonal-to-left':
        return {
          x1: 0,
          y1: 0,
          x2: gridHeight,
          y2: gridHeight,
        }

      case 'diagonal-to-right':
        return {
          x1: gridHeight,
          y1: 0,
          x2: 0,
          y2: gridHeight,
        }
    }
  }, [grid.length, gridHeight, winnerData?.coordinates, winnerData?.direction])

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: () => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: 'spring', duration: 1.5, bounce: 0 },
          opacity: { duration: 0.01 },
        },
      }
    },
  }

  useEffect(() => {
    // get maximum height that a grid cell can be
    const maximumWidth = Math.min(gridSize?.width ?? 0, gridSize?.height ?? 0)

    setGridHeight(maximumWidth)

    onGridWidthDefined(maximumWidth)
  }, [gridSize?.height, gridSize?.width, onGridWidthDefined])

  return (
    <div ref={gridContainerRef} className={clsx('flex-1 container flex place-content-center')}>
      <motion.div
        className={clsx('grid justify-center', 'rounded-xl overflow-hidden', 'relative')}
        style={{
          height: gridHeight,
          width: gridHeight,

          gap: `${GRID_GAP}px`,
          gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
        }}
      >
        {grid.map((row, x) => {
          return row.map(({ key, checkedSign }, y) => {
            return <Cell key={key} x={x} y={y} checkedSign={checkedSign} onClick={() => makeMove(x, y)} />
          })
        })}

        {winnerData && (
          <motion.svg
            className={clsx('absolute top-0 left-0 right-0 bottom-0')}
            width="100%"
            height="100%"
            initial="hidden"
            animate={'visible'}
          >
            <motion.line
              x1={coordinates?.x1}
              y1={coordinates?.y1}
              x2={coordinates?.x2}
              y2={coordinates?.y2}
              stroke="rgba(245, 108, 39, 0.54)"
              strokeWidth={10}
              strokeLinecap="round"
              variants={draw}
              custom={2}
            />
          </motion.svg>
        )}
      </motion.div>
    </div>
  )
}
