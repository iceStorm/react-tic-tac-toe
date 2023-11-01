import { clsx } from 'clsx'

import { GridCell } from '../../store/app/app.state'

type CellProps = GridCell & {
  capacity: number
  lineWeight: number
  onClick(): void
}

export function Cell(props: CellProps) {
  const { x, y, isX, lineWeight, capacity, onClick } = props

  console.log('cell renders:', x, y, isX)

  return (
    <div
      className={clsx(`col_${x}_${y}`, 'w-full h-full', 'hover:bg-gray-200', 'border-blue-300')}
      style={{
        borderTop: x > 0 ? `${lineWeight}px solid black` : undefined,
        borderRight: y > -1 && y < capacity - 1 ? `${lineWeight}px solid black` : undefined,
      }}
      onClick={onClick}
    >
      {isX === undefined ? null : isX ? 'x' : 'o'}
    </div>
  )
}
