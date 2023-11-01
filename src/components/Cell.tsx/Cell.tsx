import { clsx } from 'clsx'

import { memo, useState } from 'react'

import { GrClose } from 'react-icons/gr'
import { FiCircle } from 'react-icons/fi'

import { shallow } from 'zustand/shallow'

import { GridCell } from '../../store/app/app.state'
import { ESign } from '../../models/Sign'

type CellProps = GridCell & {
  capacity: number
  lineWeight: number

  /**
   * Whether the current turn is for the X user.
   */
  currentTurn: ESign

  onClick(): void
}

export const Cell = memo((props: CellProps) => {
  const { x, y, checkedSign, currentTurn, lineWeight, capacity, onClick } = props

  // console.log('cell renders:', x, y, isX)

  const [isHovering, setIsHovering] = useState(false)

  const Icon = checkedSign === undefined ? null : checkedSign === ESign.X ? GrClose : FiCircle
  const HoverIcon = currentTurn === ESign.X ? GrClose : FiCircle

  return (
    <div
      className={clsx(`col_${x}_${y}`, 'w-full h-full p-5', 'hover:bg-gray-200', 'border-gray-400')}
      style={{
        borderTopWidth: x > 0 ? `${lineWeight}px` : undefined,
        borderRightWidth: y > -1 && y < capacity - 1 ? `${lineWeight}px` : undefined,
      }}
      onClick={checkedSign === undefined ? onClick : undefined}
      onMouseMove={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {Icon && <Icon className="w-full h-full" />}

      {isHovering && checkedSign === undefined && <HoverIcon className="opacity-10 w-full h-full" />}
    </div>
  )
}, shallow)
