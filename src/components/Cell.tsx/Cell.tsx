import { clsx } from 'clsx'

import { memo } from 'react'

import { GrClose } from 'react-icons/gr'
import { FiCircle } from 'react-icons/fi'

import { shallow } from 'zustand/shallow'

import { GridCell } from '../../store/app/app.state'

type CellProps = GridCell & {
  capacity: number
  lineWeight: number
  onClick(): void
}

export const Cell = memo((props: CellProps) => {
  const { x, y, isX, lineWeight, capacity, onClick } = props

  console.log('cell renders:', x, y, isX)

  const Icon = isX === undefined ? null : isX ? GrClose : FiCircle

  return (
    <div
      className={clsx(`col_${x}_${y}`, 'w-full h-full p-5', 'hover:bg-gray-200', 'border-blue-300')}
      style={{
        borderTop: x > 0 ? `${lineWeight}px solid black` : undefined,
        borderRight: y > -1 && y < capacity - 1 ? `${lineWeight}px solid black` : undefined,
      }}
      onClick={onClick}
    >
      {Icon && <Icon className="w-full h-full" />}
    </div>
  )
}, shallow)
