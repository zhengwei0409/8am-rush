const bgmUrl = new URL('../assets/audio/runningBGM.mp3', import.meta.url).href
const jumpUrl = new URL('../assets/audio/jump.mp3', import.meta.url).href
import Phaser from 'phaser'
import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'
import {
  GAME_DURATION_MS,
  formatRaceClock,
  registerCharacterAnimations,
} from '../gameData.js'

export default class BaseLevel extends Phaser.Scene {
  constructor(sceneKey, config) {
    super(sceneKey)
    this.levelConfig = config
  }

  init(data) {
    this.runState = {
      characterKey: data?.characterKey ?? 'cs',
      currentLevel: this.levelConfig.number,
      elapsedMs: data?.elapsedMs ?? 0,
      score: data?.score ?? 0,
    }
  }

  preload() {
    this.load.image(this.levelConfig.backgroundKey, this.levelConfig.backgroundUrl)
    this.load.audio('bgm', bgmUrl)
    this.load.audio('jump', jumpUrl)
  }

  create() {
    this.configureLevelMetrics()

    this.bgm = this.sound.add('bgm', {
      loop: true,
      volume: 0.8,
    })

    if (!this.sound.get('bgm')?.isPlaying) {
      this.bgm.play()
    }

    this.finished = false
    this.gameOver = false
    this.levelStarted = false
    this.controlsEnabled = false
    this.levelStartElapsed = this.runState.elapsedMs
    this.physics.world.gravity.y = 1600 * this.levelScale

    registerCharacterAnimations(this)
    this.createGeneratedHazardTextures()
    this.createBackground()
    this.createPlatforms()
    this.createFinishLine()
    this.createPlayer()
    this.createHazards()
    this.createHud()
    this.createControls()
    this.configureCamera()
    this.startLevelCountdown()

  }

  update(_time, delta) {
    if (this.gameOver || this.finished) {
      return
    }

    if (!this.levelStarted) {
      return
    }

    this.runState.elapsedMs = Math.min(GAME_DURATION_MS, this.runState.elapsedMs + delta)
    this.updateHud()

    if (this.runState.elapsedMs >= GAME_DURATION_MS) {
      this.endRun(false, 'Time ran out')
      return
    }

    this.player.update()

    if (this.player.x >= this.finishX) {
      this.completeLevel()
    }
  }

  createBackground() {
    this.add.image(0, 0, this.levelConfig.backgroundKey)
      .setOrigin(0)
      .setScale(this.levelScale)
      .setDepth(0)
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight)
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup()

    this.levelConfig.platforms.forEach(([x, y, width, height]) => {
      const scaledX = this.scaleLevelValue(x)
      const scaledY = this.scaleLevelValue(y)
      const scaledWidth = this.scaleLevelValue(width)
      const scaledHeight = this.scaleLevelValue(height)
      const platform = this.add.rectangle(
        scaledX + scaledWidth / 2,
        scaledY,
        scaledWidth,
        scaledHeight,
        0x24344d,
        0.72,
      )
      platform.setStrokeStyle(4 * this.levelScale, this.levelConfig.accent, 0.95)
      platform.setDepth(3)
      this.physics.add.existing(platform, true)
      this.platforms.add(platform)

      this.add.rectangle(
        scaledX + scaledWidth / 2,
        scaledY - scaledHeight / 2 + this.scaleLevelValue(4),
        scaledWidth,
        this.scaleLevelValue(8),
        0x89d6ff,
        0.85,
      ).setDepth(4)
    })

    const runnerFloor = this.add.rectangle(
      this.levelWidth / 2,
      this.groundY + this.scaleLevelValue(8),
      this.levelWidth,
      this.scaleLevelValue(28),
      0x000000,
      0,
    )
    this.physics.add.existing(runnerFloor, true)
    this.platforms.add(runnerFloor)
  }

  createFinishLine() {
    const pole = this.add.rectangle(
      this.finishX,
      this.groundY - this.scaleLevelValue(96),
      this.scaleLevelValue(10),
      this.scaleLevelValue(160),
      0x89d6ff,
      0.9,
    )
    const banner = this.add.rectangle(
      this.finishX + this.scaleLevelValue(72),
      this.groundY - this.scaleLevelValue(160),
      this.scaleLevelValue(144),
      this.scaleLevelValue(48),
      0x10284f,
      0.92,
    )
    this.add.text(this.finishX + this.scaleLevelValue(72), this.groundY - this.scaleLevelValue(160), 'FINISH', {
      fontFamily: 'Arial',
      fontSize: `${Math.round(22 * this.levelScale)}px`,
      fontStyle: '700',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(5)

    pole.setDepth(4)
    banner.setDepth(4)
  }

  createPlayer() {
    this.player = new Player(
      this,
      this.startX,
      this.groundY - this.scaleLevelValue(96),
      this.runState.characterKey,
      this.levelScale,
    )
    this.physics.add.collider(this.player, this.platforms)
    this.player.setVelocity(0, 0)
    this.player.body.enable = false
  }

  createHazards() {
    this.hazards = this.physics.add.staticGroup()

    this.levelConfig.hazards.forEach(([x, y, type]) => {
      const hazard = new Enemy(
        this,
        this.scaleLevelValue(x),
        this.scaleLevelValue(y),
        type,
        this.levelScale,
      )
      this.hazards.add(hazard)
    })
  }

  createHud() {
    this.add.rectangle(838, 48, 220, 68, 0x101622, 0.72)
      .setScrollFactor(0)
      .setDepth(19)

    this.clockText = this.add.text(838, 48, '7:00 AM', {
      fontFamily: 'Courier New',
      fontSize: '36px',
      fontStyle: '700',
      color: '#ffcc48',
      stroke: '#101622',
      strokeThickness: 6,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20)

    this.updateHud()
  }

  createControls() {
    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.canUseControls()) {
        this.player.jump()
        this.sound.play('jump', { volume: 0.4 })
      }
    })

    this.input.on('pointerdown', () => {
      if (this.canUseControls()) {
        this.player.jump()
      }
    })
  }

  canUseControls() {
    return this.controlsEnabled && !this.gameOver && !this.finished
  }

  startLevelCountdown() {
    const countdownItems = ['3', '2', '1', 'GO!']
    let countdownIndex = 0

    const shade = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      0x050913,
      0.42,
    ).setScrollFactor(0).setDepth(29)

    const countdownText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      countdownItems[countdownIndex],
      {
        fontFamily: 'Arial',
        fontSize: '112px',
        fontStyle: '900',
        color: '#ffcc48',
        stroke: '#101622',
        strokeThickness: 10,
      },
    ).setOrigin(0.5).setScrollFactor(0).setDepth(30)

    const showCountdownItem = (label) => {
      countdownText.setText(label)
      countdownText.setScale(0.7)
      countdownText.setAlpha(1)

      this.tweens.killTweensOf(countdownText)
      this.tweens.add({
        targets: countdownText,
        scale: 1.12,
        alpha: 0.9,
        duration: 520,
        ease: 'Back.Out',
      })
    }

    const beginLevel = () => {
      shade.destroy()
      countdownText.destroy()
      this.levelStarted = true
      this.controlsEnabled = true
      this.player.body.enable = true
      this.player.start()
      this.player.update()
    }

    showCountdownItem(countdownItems[countdownIndex])

    this.time.addEvent({
      delay: 800,
      repeat: countdownItems.length - 2,
      callback: () => {
        countdownIndex += 1
        showCountdownItem(countdownItems[countdownIndex])

        if (countdownIndex === countdownItems.length - 1) {
          this.time.delayedCall(520, beginLevel)
        }
      },
    })
  }

  configureCamera() {
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight)
    this.cameras.main.startFollow(
      this.player,
      true,
      0.12,
      0.12,
      this.scaleLevelValue(-260),
      this.scaleLevelValue(170),
    )
    this.cameras.main.setZoom(1)
  }

  configureLevelMetrics() {
    const source = this.textures.get(this.levelConfig.backgroundKey).getSourceImage()
    const displayHeight = this.scale.height

    this.levelScale = displayHeight / source.height
    this.levelWidth = source.width * this.levelScale
    this.levelHeight = displayHeight
    this.groundY = this.scaleLevelValue(this.levelConfig.groundY ?? 900)
    this.startX = this.scaleLevelValue(this.levelConfig.startX ?? 110)
    this.finishX = this.scaleLevelValue(this.levelConfig.finishX ?? source.width - 270)
  }

  scaleLevelValue(value) {
    return value * this.levelScale
  }

  createGeneratedHazardTextures() {
    if (this.textures.exists('cone') && this.textures.exists('barrier')) {
      return
    }

    const graphics = this.make.graphics({ x: 0, y: 0, add: false })

    graphics.fillStyle(0xffc629, 1)
    graphics.fillTriangle(32, 0, 2, 60, 62, 60)
    graphics.fillStyle(0x111827, 1)
    graphics.fillTriangle(32, 16, 15, 52, 49, 52)
    graphics.generateTexture('cone', 64, 64)
    graphics.clear()

    graphics.fillStyle(0x263047, 1)
    graphics.fillRoundedRect(4, 10, 56, 78, 8)
    graphics.lineStyle(5, 0xffcc48, 1)
    graphics.strokeRoundedRect(4, 10, 56, 78, 8)
    graphics.fillStyle(0xff5d5d, 1)
    graphics.fillRect(12, 38, 40, 10)
    graphics.fillStyle(0xffffff, 1)
    graphics.fillRect(12, 58, 40, 8)
    graphics.generateTexture('barrier', 64, 96)
    graphics.destroy()
  }

  updateHud() {
    this.clockText.setText(`${formatRaceClock(this.runState.elapsedMs)} AM`)
  }

  completeLevel() {
    if (this.finished) {
      return
    }

    this.finished = true
    this.player.setVelocityX(0)
    this.player.play(`${this.runState.characterKey}-run`, true)

    const elapsedThisLevel = this.runState.elapsedMs - this.levelStartElapsed
    const timeBonus = Math.max(0, Math.round((GAME_DURATION_MS - this.runState.elapsedMs) / 1000))
    const speedBonus = Math.max(0, Math.round(70 - elapsedThisLevel / 1000))
    const levelScore = 500 + timeBonus + speedBonus * 5
    this.runState.score += levelScore

    this.cameras.main.fadeOut(500, 12, 18, 30)
    this.time.delayedCall(550, () => {
      if (this.levelConfig.number >= 3) {
        this.endRun(true, 'Reached the university')
        return
      }

      this.scene.start('LevelSummaryScene', {
        ...this.runState,
        completedLevel: this.levelConfig.number,
        levelScore,
      })
    })
  }

  endRun(won, reason) {
    this.finished = true
    this.scene.start('ResultScene', {
      ...this.runState,
      won,
      reason,
    })
  }
}
