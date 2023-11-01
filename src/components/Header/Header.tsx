import { clsx } from 'clsx'

import { useAppStore } from '../../store/app/app.store'

export const Header = () => {
  const [xUser, oUser, ties] = useAppStore(state => [state.xUser, state.oUser, state.ties])

  return (
    <header className={clsx('container p-0')}>
      <div
        className={clsx('py-5 px-10', 'flex justify-between items-center', 'divide-x-2', 'border rounded-lg bg-white')}
      >
        <div className="flex-1 text-left">
          <p className="font-light">X User</p>
          <p className="text-3xl font-bold">{xUser.scores}</p>
        </div>

        <div className="flex-1 text-center">
          <p className="font-light">Ties</p>
          <p className="text-3xl font-bold">{ties}</p>
        </div>

        <div className="flex-1 text-right">
          <p className="font-light">O User</p>
          <p className="text-3xl font-bold">{oUser.scores}</p>
        </div>
      </div>
    </header>
  )
}
