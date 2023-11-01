import { clsx } from 'clsx'

import { useAppStore } from '../../store/app/app.store'
import { ESign } from '../../models/Sign'

export const Header = () => {
  const [xUser, oUser, ties] = useAppStore(state => [state.xUser, state.oUser, state.ties])
  const [currentTurn, timeoutThreshold, remainingSeconds] = useAppStore(state => [
    state._currentTurn,
    state.timeoutThreshold,
    state.remainingSeconds,
  ])

  const countDownColor = clsx({
    'bg-amber-200': remainingSeconds >= 5 && remainingSeconds <= 10,
    'bg-red-300': remainingSeconds <= 5,
    'bg-blue-200': remainingSeconds > 5,
  })

  return (
    <header className={clsx('container p-0')}>
      <div className={clsx('flex justify-between items-center', 'border rounded-lg bg-white', 'overflow-hidden')}>
        <div className={clsx('flex-1 text-left py-5 px-10 border-r relative')}>
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
            <p className="font-light flex items-center gap-2">
              <span>Player</span>
              <span className="text-2xl">{ESign.X}</span>
            </p>

            <p className="text-3xl font-bold">{xUser.scores}</p>
          </div>
        </div>

        <div className="h-full flex-[0.5] text-center py-5 px-10 border-r">
          <p className="font-light">Ties</p>
          <p className="text-3xl font-bold">{ties}</p>
        </div>

        <div className={clsx('flex-1 text-right py-5 px-10 relative')}>
          {currentTurn === ESign.O && (
            <div
              className={clsx(
                countDownColor,
                'h-full absolute left-0 top-0 bottom-0 right-0',
                'transition-all duration-300 -rotate-180',
              )}
              style={{ width: `${(remainingSeconds / timeoutThreshold) * 100}%` }}
            />
          )}

          <div className="relative">
            <p className="font-light flex items-center justify-end gap-2">
              Player <span className="text-2xl">{ESign.O}</span>
            </p>

            <p className="text-3xl font-bold">{oUser.scores}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
