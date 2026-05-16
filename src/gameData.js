import Phaser from 'phaser'

export const GAME_DURATION_MS = 90000
export const START_HOUR = 7
export const END_HOUR = 8

export const characters = [
  {
    key: 'cs',
    name: 'CS Student',
    folder: 'cs-student',
    portrait: new URL('./assets/characters/cs-student/Chibi CS Student.png', import.meta.url).href,
    running: [
      new URL('./assets/characters/cs-student/running/Running_0001.png', import.meta.url).href,
      new URL('./assets/characters/cs-student/running/Running_0002.png', import.meta.url).href,
      new URL('./assets/characters/cs-student/running/Running_0003.png', import.meta.url).href,
      new URL('./assets/characters/cs-student/running/Running_0004.png', import.meta.url).href,
      new URL('./assets/characters/cs-student/running/Running_0005.png', import.meta.url).href,
      new URL('./assets/characters/cs-student/running/Running_0006.png', import.meta.url).href,
    ],
    idle: [
      new URL('./assets/characters/cs-student/idle/idle_0001.png', import.meta.url).href,
      new URL('./assets/characters/cs-student/idle/idle_0002.png', import.meta.url).href,
      new URL('./assets/characters/cs-student/idle/idle_0003.png', import.meta.url).href,
      new URL('./assets/characters/cs-student/idle/idle_0004.png', import.meta.url).href,
    ],
    jump: new URL('./assets/characters/cs-student/jumping/Jumping.png', import.meta.url).href,
    fall: new URL('./assets/characters/cs-student/falling/Falling.png', import.meta.url).href,
  },
  {
    key: 'medic',
    name: 'Medic Student',
    folder: 'medic-student',
    portrait: new URL('./assets/characters/medic-student/Chibi_Medic_Student.png', import.meta.url).href,
    running: [
      new URL('./assets/characters/medic-student/running/Running_0001.png', import.meta.url).href,
      new URL('./assets/characters/medic-student/running/Running_0002.png', import.meta.url).href,
      new URL('./assets/characters/medic-student/running/Running_0003.png', import.meta.url).href,
      new URL('./assets/characters/medic-student/running/Running_0004.png', import.meta.url).href,
      new URL('./assets/characters/medic-student/running/Running_0005.png', import.meta.url).href,
      new URL('./assets/characters/medic-student/running/Running_0006.png', import.meta.url).href,
    ],
    idle: [
      new URL('./assets/characters/medic-student/idle/idle_0001.png', import.meta.url).href,
      new URL('./assets/characters/medic-student/idle/idle_0002.png', import.meta.url).href,
      new URL('./assets/characters/medic-student/idle/idle_0003.png', import.meta.url).href,
      new URL('./assets/characters/medic-student/idle/idle_0004.png', import.meta.url).href,
    ],
    jump: new URL('./assets/characters/medic-student/jumping/Jumping.png', import.meta.url).href,
    fall: new URL('./assets/characters/medic-student/falling/Falling.png', import.meta.url).href,
  },
  {
    key: 'engineer',
    name: 'Engineer Student',
    folder: 'engineer-student',
    portrait: new URL('./assets/characters/engineer-student/Chibi_Engineer_Student.png', import.meta.url).href,
    running: [
      new URL('./assets/characters/engineer-student/running/Running_0001.png', import.meta.url).href,
      new URL('./assets/characters/engineer-student/running/Running_0002.png', import.meta.url).href,
      new URL('./assets/characters/engineer-student/running/Running_0003.png', import.meta.url).href,
      new URL('./assets/characters/engineer-student/running/Running_0004.png', import.meta.url).href,
      new URL('./assets/characters/engineer-student/running/Running_0005.png', import.meta.url).href,
      new URL('./assets/characters/engineer-student/running/Running_0006.png', import.meta.url).href,
    ],
    idle: [
      new URL('./assets/characters/engineer-student/idle/idle_0001.png', import.meta.url).href,
      new URL('./assets/characters/engineer-student/idle/idle_0002.png', import.meta.url).href,
      new URL('./assets/characters/engineer-student/idle/idle_0003.png', import.meta.url).href,
      new URL('./assets/characters/engineer-student/idle/idle_0004.png', import.meta.url).href,
    ],
    jump: new URL('./assets/characters/engineer-student/jumping/Jumping.png', import.meta.url).href,
    fall: new URL('./assets/characters/engineer-student/falling/Falling.png', import.meta.url).href,
  },
]

export const baseRunFrames = [1, 2, 3, 4, 5, 6]

export function createInitialRunState(characterKey = 'cs') {
  return {
    characterKey,
    currentLevel: 1,
    elapsedMs: 0,
    score: 0,
  }
}

export function formatRaceClock(elapsedMs) {
  const clamped = Phaser.Math.Clamp(elapsedMs, 0, GAME_DURATION_MS)
  const totalGameMinutes = Math.min(60, Math.floor((clamped / GAME_DURATION_MS) * 60))
  const hour = totalGameMinutes === 60 ? END_HOUR : START_HOUR
  const minutes = totalGameMinutes === 60 ? 0 : totalGameMinutes

  return `${hour}:${String(minutes).padStart(2, '0')}`
}

export function formatRemainingTime(elapsedMs) {
  const remainingMs = Math.max(0, GAME_DURATION_MS - elapsedMs)
  const minutes = Math.floor(remainingMs / 60000)
  const seconds = Math.ceil((remainingMs % 60000) / 1000)

  if (seconds === 60) {
    return `${minutes + 1}:00`
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function preloadCharacterAssets(scene) {
  characters.forEach((character) => {
    scene.load.image(`${character.key}-portrait`, character.portrait)
    scene.load.image(`${character.key}-jump`, character.jump)
    scene.load.image(`${character.key}-fall`, character.fall)
    character.running.forEach((url, index) => {
      scene.load.image(`${character.key}-run-${index + 1}`, url)
    })
    character.idle.forEach((url, index) => {
      scene.load.image(`${character.key}-idle-${index + 1}`, url)
    })
  })
}

export function registerCharacterAnimations(scene) {
  characters.forEach((character) => {
    const animationKey = `${character.key}-run`
    const idleAnimationKey = `${character.key}-idle`

    if (!scene.anims.exists(animationKey)) {
      scene.anims.create({
        key: animationKey,
        frames: baseRunFrames.map((frame) => ({ key: `${character.key}-run-${frame}` })),
        frameRate: 12,
        repeat: -1,
      })
    }

    if (!scene.anims.exists(idleAnimationKey)) {
      scene.anims.create({
        key: idleAnimationKey,
        frames: [1, 2, 3, 4].map((frame) => ({ key: `${character.key}-idle-${frame}` })),
        frameRate: 6,
        repeat: -1,
      })
    }
  })
}
