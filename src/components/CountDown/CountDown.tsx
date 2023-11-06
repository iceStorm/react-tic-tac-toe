import { clsx } from 'clsx'

import { useAppStore } from '../../store/app/app.store'

export function CountDown() {
  const [currentTurn, remainingSeconds, winnerData] = useAppStore(state => [
    state._currentTurn,
    state.remainingSeconds,
    state.winnerData,
  ])

  return (
    <div className={clsx('bg-white border rounded-full', 'pl-3.5 pr-5 py-3', 'flex items-center justify-start gap-2')}>
      <div
        className={clsx('w-7 h-7', 'rounded-full flex items-center justify-center', 'transition-all duration-700', {
          'bg-green-200': remainingSeconds > 10,
          'bg-amber-100': remainingSeconds > 5 && remainingSeconds <= 10,
          'bg-red-300': remainingSeconds <= 5,
        })}
      >
        <span className="text-sm">{remainingSeconds}</span>
      </div>

      <p className="text-sm text-blue-500 font-semibold flex items-center gap-2">
        {!winnerData ? (
          <>
            <span>Turn for </span>
            <span className="text-xl -mt-1">{currentTurn}</span>
          </>
        ) : (
          <>
            {winnerData?.coordinates.length ? (
              <>
                <span className="text-xl">{currentTurn}</span>
                <span>wins, </span>
              </>
            ) : (
              <span>Drawn,</span>
            )}

            <span>re-starting...</span>
          </>
        )}
      </p>
    </div>
  )
}
