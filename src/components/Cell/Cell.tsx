import { clsx } from 'clsx'

import { memo, useState } from 'react'

import { FiCircle } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

import { shallow } from 'zustand/shallow'

import { ESign } from '../../models/Sign'
import { GridCell } from '../../store/app/app.state'

type CellProps = GridCell & {
  /**
   * Whether the current turn is for the X user.
   */
  currentTurn: ESign

  onClick(): void
}

export const Cell = memo((props: CellProps) => {
  const { x, y, checkedSign, currentTurn, onClick } = props

  // console.log('cell renders:', x, y, isX)

  const [isHovering, setIsHovering] = useState(false)

  const Icon = checkedSign === undefined ? null : checkedSign === ESign.X ? GrClose : FiCircle
  const HoverIcon = currentTurn === ESign.X ? GrClose : FiCircle

  return (
    <button
      className={clsx(
        `col_${x}_${y}`,
        'w-full h-full p-5 flex items-center justify-center',
        'bg-gray-200 hover:bg-gray-300',
      )}
      onClick={checkedSign === undefined ? onClick : undefined}
      onMouseMove={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      title={checkedSign ? undefined : `Tap to place an ${currentTurn} here`}
    >
      {Icon && <Icon className="w-full h-full" />}

      {isHovering && checkedSign === undefined && <HoverIcon className="opacity-20 w-full h-full" />}
    </button>
  )
}, shallow)
