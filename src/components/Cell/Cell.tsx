import { memo, useState } from 'react'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'

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

  const title = disabled
    ? 'Please wait for awhile when we restart the game'
    : checkedSign
    ? undefined
    : `Tap to place an ${currentTurn} here`
  // const crossLineCoordinates = winnerData?.direction === 'horizontal' ?

  // console.log('cell renders:', x, y, isX)

  return (
    <motion.button
      className={clsx(
        `cell_${x}_${y}`,
        'w-full h-full p-5 flex items-center justify-center',
        'bg-gray-200 hover:bg-gray-300',
        {
          'cursor-not-allowed': disabled,
        },
      )}
      transition={{ duration: 2, repeat: Infinity }}
      onClick={checkedSign === undefined ? onClick : undefined}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={() => setIsHovering(true)}
      disabled={disabled}
      title={title}
    >
      {Icon && <Icon className={clsx('w-full h-full')} />}

      {isHovering && checkedSign === undefined && <HoverIcon className="opacity-20 w-full h-full" />}
    </motion.button>
  )
})
