import { clsx } from 'clsx'

import { useAppStore } from '../../store/app/app.store'

export const Header = () => {
  const [xUser, oUser, ties] = useAppStore(state => [state.xUser, state.oUser, state.ties])

  return (
    <header className={clsx('container pb-3', 'border-b')}>
      <div className="flex justify-between items-center">
        <div className="text-left">
          <p>X User</p>
          <p className="text-3xl font-bold">{xUser.scores}</p>
        </div>

        <div className="text-center">
          <p>Ties</p>
          <p className="text-3xl font-bold">{ties}</p>
        </div>

        <div className="text-right">
          <p>O User</p>
          <p className="text-3xl font-bold">{oUser.scores}</p>
        </div>
      </div>
    </header>
  )
}
