import { clsx } from 'clsx'

import { useAppStore } from '../../store/app/app.store'

export function CountDown() {
  const [isXTurn, timeoutThreshold, remainingSeconds] = useAppStore(state => [
    state._isXTurn,
    state.timeoutThreshold,
    state.remainingSeconds,
  ])

  return (
    <div className={clsx('bg-white border rounded-full', 'pl-3.5 pr-5 py-3', 'flex items-center justify-start gap-2')}>
      <div
        className={clsx('w-7 h-7', 'rounded-full flex items-center justify-center', 'transition-all duration-700', {
          'bg-red-300': remainingSeconds <= 5,
          'bg-blue-200': remainingSeconds > 5,
        })}
      >
        {remainingSeconds}

        {/* <div
          className={clsx('h-full w-full bg-red-300', 'rounded-full')}
          style={{ height: `${(remainingSeconds / timeoutThreshold) * 100}%` }}
        /> */}
      </div>

      <p className="text-sm text-blue-500 font-semibold">
        <span>Turn for </span>
        <span>{isXTurn ? 'X' : 'O'}</span>
      </p>
    </div>
  )
}
