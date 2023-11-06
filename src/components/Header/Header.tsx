import { clsx } from 'clsx'

import TextTransition from 'react-text-transition'

import { ESign } from '../../models/Sign'
import { useAppStore } from '../../store/app/app.store'
import { CountDown } from '../CountDown'

interface HeaderProps {
  width: number
}

export const Header = ({ width }: HeaderProps) => {
  const [xUser, oUser, ties] = useAppStore(state => [state.xUser, state.oUser, state.ties])
  const [currentTurn, timeoutThreshold, remainingSeconds] = useAppStore(state => [
    state._currentTurn,
    state.timeoutThreshold,
    state.remainingSeconds,
  ])

  const countDownColor = clsx({
    'bg-green-200': remainingSeconds > 10,
    'bg-amber-100': remainingSeconds > 5 && remainingSeconds <= 10,
    'bg-red-300': remainingSeconds <= 5,
  })

  return (
    <header className={clsx('container p-0 relative')} style={{ width }}>
      <div
        className={clsx(
          'flex justify-between items-center',
          'border rounded-lg bg-white',
          'overflow-hidden',
          'shadow-2xl shadow-gray-200',
        )}
      >
        <div className={clsx('flex-1 text-center py-5 px-3 lg:px-10 border-r relative')}>
          {currentTurn === ESign.X && (
            <div
              className={clsx(
                countDownColor,
                'h-full absolute left-0 top-0 bottom-0 right-0',
                'transition-all duration-300',
              )}
              style={{ width: `${(remainingSeconds / timeoutThreshold) * 100}%` }}
            />
          )}

          <div className="relative">
            <p className="font-light flex items-center justify-center gap-2">
              <span>Player</span>
              <span className="text-2xl">{ESign.X}</span>
            </p>

            <TextTransition className="text-3xl font-bold justify-center">{xUser.scores}</TextTransition>
          </div>
        </div>

        <div className="h-full flex-1 text-center py-5 px-3 lg:px-10">
          <p className="font-light">Ties</p>
          <TextTransition className="text-3xl font-bold justify-center">{ties}</TextTransition>
        </div>

        <div className={clsx('flex-1 text-center py-5 px-3 lg:px-10 relative border-l')}>
          {currentTurn === ESign.O && (
            <div
              className={clsx(
                countDownColor,
                'h-full w-full absolute right-0 top-0 bottom-0',
                'transition-all duration-300',
              )}
              style={{ right: `-${((timeoutThreshold - remainingSeconds) / timeoutThreshold) * 100}%` }}
            />
          )}

          <div className="relative">
            <p className="font-light flex items-center justify-center gap-2">
              Player <span className="text-2xl">{ESign.O}</span>
            </p>

            <TextTransition className="text-3xl font-bold justify-center">{oUser.scores}</TextTransition>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-16 -mb-10">
        <CountDown />
      </div>
    </header>
  )
}
