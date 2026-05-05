import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let game: { destroy: (removeCanvas: boolean) => void } | undefined
    let cancelled = false

    async function startGame() {
      const PhaserModule = await import('phaser')
      const { default: StartScene } = await import('./scenes/StartScene.js')
      const { default: CharacterSelectScene } = await import('./scenes/CharacterSelectScene.js')
      const { default: Level1 } = await import('./scenes/Level1.js')
      const { default: Level2 } = await import('./scenes/Level2.js')
      const { default: Level3 } = await import('./scenes/Level3.js')
      const { default: LevelSummaryScene } = await import('./scenes/LevelSummaryScene.js')
      const { default: ResultScene } = await import('./scenes/ResultScene.js')
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
        scene: [
          StartScene,
          CharacterSelectScene,
          Level1,
          Level2,
          Level3,
          LevelSummaryScene,
          ResultScene,
        ],
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
          <h1>Beat the 8:00 AM Bell</h1>
        </div>
        <p className="hint">Spacebar to jump</p>
      </header>
      <div ref={gameRef} className="game-stage" />
    </main>
  )
}

export default App
