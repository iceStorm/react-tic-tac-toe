import { clsx } from 'clsx'

import { memo, useMemo, useState } from 'react'

import { AiOutlineClose } from 'react-icons/ai'
import { BiCircle } from 'react-icons/bi'

import { ESign } from '../../models/Sign'
import { useAppStore } from '../../store/app'

type CellProps = {
  x: number
  y: number

  checkedSign?: ESign

  onClick(): void
}

export const Cell = memo((props: CellProps) => {
  const [currentTurn, winnerData] = useAppStore(state => [state._currentTurn, state.winnerData])

  const { x, y, checkedSign, onClick } = props

  const [isHovering, setIsHovering] = useState(false)

  const Icon = checkedSign === undefined ? null : checkedSign === ESign.X ? AiOutlineClose : BiCircle
  const HoverIcon = currentTurn === ESign.X ? AiOutlineClose : BiCircle

  const disabled = Boolean(winnerData)

  const isHighlighted = useMemo(() => {
    return winnerData?.coordinates.some(pair => pair[0] === x && pair[1] === y)
  }, [winnerData?.coordinates, x, y])

  // console.log('cell renders:', x, y, isX)

  return (
    <button
      className={clsx(
        `cell_${x}_${y}`,
        'w-full h-full p-5 flex items-center justify-center',
        'bg-gray-200 hover:bg-gray-300',
        {
          'cursor-not-allowed': disabled,
          'winner-cell': isHighlighted,
        },
      )}
      onClick={checkedSign === undefined || !winnerData?.direction ? onClick : undefined}
      onMouseMove={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      title={
        disabled
          ? 'Please wait for awhile when we restart the game'
          : checkedSign
          ? undefined
          : `Tap to place an ${currentTurn} here`
      }
      disabled={disabled}
    >
      {Icon && (
        <Icon
          className={clsx('w-full h-full', {
            'text-green-500': isHighlighted,
          })}
        />
      )}

      {isHovering && checkedSign === undefined && <HoverIcon className="opacity-20 w-full h-full" />}
    </button>
  )
})
