import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let game: { destroy: (removeCanvas: boolean) => void } | undefined
    let cancelled = false

    async function startGame() {
      const PhaserModule = await import('phaser')
      const { default: Level2 } = await import('./scenes/Level2.js')
      const Phaser = PhaserModule.default ?? PhaserModule

      if (cancelled || !gameRef.current) {
        return
      }

      game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: gameRef.current,
        width: 960,
        height: 540,
        backgroundColor: '#101622',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 1600 },
            debug: false,
          },
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [Level2],
      })
    }

    startGame()

    return () => {
      cancelled = true
      game?.destroy(true)
    }
  }, [])

  return (
    <main className="game-shell">
      <header className="game-header">
        <div>
          <p className="eyebrow">8am Rush</p>
          <h1>Level 2: MRT Station</h1>
        </div>
        <p className="hint">Spacebar to jump</p>
      </header>
      <div ref={gameRef} className="game-stage" />
    </main>
  )
}

export default App
