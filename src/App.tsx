import { useEffect, useState } from 'react'

import { clsx } from 'clsx'

import { GameMode, useAppStore } from './store/app'

import { Grid } from './components/Grid'
import { Header } from './components/Header'

function App() {
  const [initializeGame, grid] = useAppStore(state => [state.initializeGame, state._grid])

  const [gridWidth, setGridWidth] = useState(0)

  // console.log('app renders...')

  useEffect(() => {
    initializeGame(GameMode['3vs3'], 15)
  }, [initializeGame])

  return (
    <div className={clsx('h-screen mx-auto p-10', 'flex flex-col gap-16 items-center', 'bg-gray-100')}>
      <Header width={gridWidth} />

      {grid.length ? <Grid onGridWidthDefined={setGridWidth} /> : null}
    </div>
  )
}

export default App
