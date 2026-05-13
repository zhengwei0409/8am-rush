export const startBgmUrl = new URL('./assets/audio/startGBM.mp3', import.meta.url).href

export function playStartBgm(scene) {
  const existingMusic = scene.sound.get('start-bgm')

  if (existingMusic) {
    if (!existingMusic.isPlaying) {
      existingMusic.play()
    }

    return existingMusic
  }

  const music = scene.sound.add('start-bgm', {
    loop: true,
    volume: 0.45,
  })

  music.play()
  return music
}

export function stopStartBgm(scene) {
  const music = scene.sound.get('start-bgm')

  if (music?.isPlaying) {
    music.stop()
  }
}

export function stopRunningBgm(scene) {
  const runningMusic = scene.sound.getAll?.('bgm') ?? [scene.sound.get('bgm')].filter(Boolean)

  runningMusic.forEach((music) => {
    if (music.isPlaying) {
      music.stop()
    }
  })
}
