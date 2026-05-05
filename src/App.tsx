import { useEffect, useRef } from 'react'

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
        pixelArt: true,
        roundPixels: true,
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
    <main className="min-h-svh bg-[#070711] bg-[linear-gradient(45deg,#101326_25%,transparent_25%),linear-gradient(-45deg,#101326_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#101326_75%),linear-gradient(-45deg,transparent_75%,#101326_75%)] bg-[length:32px_32px] bg-[position:0_0,0_16px,16px_-16px,-16px_0] px-4 py-5 text-[#fff8d9] antialiased">
      <section className="mx-auto flex min-h-[calc(100svh-40px)] w-[min(1160px,100%)] flex-col justify-center gap-4">
        <header className="grid grid-cols-[1fr_auto] items-end gap-4 border-4 border-[#080812] bg-[#ffcc33] p-3 text-[#101022] shadow-[8px_8px_0_#000,12px_12px_0_#35d6ff] max-[720px]:grid-cols-1">
          <div className="flex items-end gap-3 max-[720px]:items-start">
            <div className="grid h-16 w-16 shrink-0 place-items-center border-4 border-[#101022] bg-[#ff3d7f] text-3xl font-black leading-none shadow-[4px_4px_0_#101022]">
              8
            </div>
            <div>
              <p className="m-0 font-mono text-sm font-black uppercase tracking-[0.14em] text-[#1b46ff]">
                8am Rush
              </p>
              <h1 className="m-0 font-mono text-[clamp(26px,4vw,48px)] font-black uppercase leading-none [text-shadow:3px_3px_0_#fff8d9]">
                Beat the Bell
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2 font-mono text-xs font-black uppercase tracking-[0.08em] max-[720px]:justify-start">
            <span className="border-4 border-[#101022] bg-[#35d6ff] px-3 py-2 text-[#101022] shadow-[4px_4px_0_#101022]">
              Spacebar
            </span>
            <span className="border-4 border-[#101022] bg-[#52ff7a] px-3 py-2 text-[#101022] shadow-[4px_4px_0_#101022]">
              Jump
            </span>
          </div>
        </header>

        <div className="border-4 border-[#000] bg-[#15152f] p-3 shadow-[8px_8px_0_#000,12px_12px_0_#ff3d7f] max-[720px]:p-2">
          <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 max-[560px]:grid-cols-1">
            <div className="h-4 border-4 border-[#080812] bg-[repeating-linear-gradient(90deg,#ffcc33_0_18px,#ff3d7f_18px_36px,#35d6ff_36px_54px,#52ff7a_54px_72px)]" />
            <p className="m-0 border-4 border-[#080812] bg-[#070711] px-4 py-1 text-center font-mono text-sm font-black uppercase tracking-[0.18em] text-[#ffcc33]">
              Campus Dash
            </p>
            <div className="h-4 border-4 border-[#080812] bg-[repeating-linear-gradient(90deg,#52ff7a_0_18px,#35d6ff_18px_36px,#ff3d7f_36px_54px,#ffcc33_54px_72px)]" />
          </div>

          <div
            ref={gameRef}
            className="overflow-hidden border-4 border-[#ffcc33] bg-[#101622] shadow-[0_0_0_4px_#080812,0_0_0_8px_#35d6ff,0_14px_0_#080812] [&_canvas]:block [&_canvas]:[image-rendering:pixelated]"
          />
        </div>
      </section>
    </main>
  )
}

export default App
