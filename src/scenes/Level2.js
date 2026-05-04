import Phaser from 'phaser'
import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'

const levelArtUrl = new URL('../assets/scene/Level-2/Level-2.png', import.meta.url).href
const jumpFrameUrl = new URL('../assets/characters/cs-student/jumping/Jumping.png', import.meta.url).href
const fallFrameUrl = new URL('../assets/characters/cs-student/falling/Falling.png', import.meta.url).href
const csFrames = [
  new URL('../assets/characters/cs-student/running/Running_0001.png', import.meta.url).href,
  new URL('../assets/characters/cs-student/running/Running_0002.png', import.meta.url).href,
  new URL('../assets/characters/cs-student/running/Running_0003.png', import.meta.url).href,
  new URL('../assets/characters/cs-student/running/Running_0004.png', import.meta.url).href,
  new URL('../assets/characters/cs-student/running/Running_0005.png', import.meta.url).href,
  new URL('../assets/characters/cs-student/running/Running_0006.png', import.meta.url).href,
]

export default class Level2 extends Phaser.Scene {
  constructor() {
    super('Level2')
  }

  preload() {
    this.load.image('level-2-bg', levelArtUrl)
    this.load.image('cs-jump', jumpFrameUrl)
    this.load.image('cs-fall', fallFrameUrl)
    csFrames.forEach((url, index) => this.load.image(`cs-run-${index + 1}`, url))
  }

  create() {
    this.levelWidth = 5848
    this.groundY = 900
    this.finished = false
    this.gameOver = false

    this.createGeneratedHazardTextures()
    this.createBackground()
    this.createPlatforms()
    this.createFinishLine()
    this.createPlayer()
    this.createHazards()
    this.createHud()
    this.createControls()
    this.configureCamera()
  }

  update() {
    if (this.gameOver || this.finished) {
      return
    }

    this.player.update()
    this.progressText.setText(`Distance ${Math.min(100, Math.floor((this.player.x / this.finishX) * 100))}%`)

    if (this.player.y > 1080) {
      this.failLevel('Missed the platform')
    }

    if (this.player.x >= this.finishX) {
      this.completeLevel()
    }
  }

  createBackground() {
    this.add.image(0, 0, 'level-2-bg').setOrigin(0).setDepth(0)
    this.physics.world.setBounds(0, 0, this.levelWidth, 996)
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup()

    const segments = [
      [0, 930, 620, 52],
      [760, 900, 560, 48],
      [1440, 865, 430, 46],
      [2020, 910, 520, 48],
      [2690, 875, 390, 46],
      [3230, 900, 540, 48],
      [3930, 860, 440, 46],
      [4510, 905, 520, 48],
      [5200, 875, 648, 46],
    ]

    segments.forEach(([x, y, width, height]) => {
      const platform = this.add.rectangle(x + width / 2, y, width, height, 0x24344d, 0.72)
      platform.setStrokeStyle(4, 0xffcc48, 0.95)
      platform.setDepth(3)
      this.physics.add.existing(platform, true)
      this.platforms.add(platform)

      this.add.rectangle(x + width / 2, y - height / 2 + 4, width, 8, 0x89d6ff, 0.85).setDepth(4)
    })
  }

  createFinishLine() {
    this.finishX = 5580

    const pole = this.add.rectangle(this.finishX, this.groundY - 96, 10, 160, 0x89d6ff, 0.9)
    const banner = this.add.rectangle(this.finishX + 72, this.groundY - 160, 144, 48, 0x10284f, 0.92)
    this.add.text(this.finishX + 72, this.groundY - 160, 'FINISH', {
      fontFamily: 'Arial',
      fontSize: '22px',
      fontStyle: '700',
      color: '#ffffff',
    }).setOrigin(0.5)

    pole.setDepth(4)
    banner.setDepth(4)
  }

  createPlayer() {
    this.anims.create({
      key: 'cs-run',
      frames: [1, 2, 3, 4, 5, 6].map((frame) => ({ key: `cs-run-${frame}` })),
      frameRate: 12,
      repeat: -1,
    })

    this.player = new Player(this, 110, this.groundY - 96)
    this.physics.add.collider(this.player, this.platforms)
    this.player.start()
  }

  createHazards() {
    this.hazards = this.physics.add.staticGroup()

    const hazards = [
      [520, 878, 'cone'],
      [1160, 848, 'barrier'],
      [1725, 812, 'cone'],
      [2280, 858, 'barrier'],
      [2920, 822, 'cone'],
      [3560, 848, 'barrier'],
      [4210, 808, 'cone'],
      [4750, 852, 'barrier'],
      [5380, 824, 'cone'],
    ]

    hazards.forEach(([x, y, type]) => {
      const hazard = new Enemy(this, x, y, type)
      this.hazards.add(hazard)
    })

    this.physics.add.overlap(this.player, this.hazards, () => {
      this.failLevel('Hit an obstacle')
    })
  }

  createHud() {
    this.statusText = this.add.text(24, 22, 'Level 2 - MRT Station', {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontStyle: '700',
      color: '#ffffff',
      stroke: '#101622',
      strokeThickness: 5,
    }).setScrollFactor(0).setDepth(20)

    this.progressText = this.add.text(24, 58, 'Distance 0%', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffcc48',
      stroke: '#101622',
      strokeThickness: 4,
    }).setScrollFactor(0).setDepth(20)

    this.messageText = this.add.text(480, 220, '', {
      fontFamily: 'Arial',
      fontSize: '32px',
      fontStyle: '700',
      color: '#ffffff',
      align: 'center',
      stroke: '#101622',
      strokeThickness: 6,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(21)
  }

  createControls() {
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.gameOver || this.finished) {
        this.scene.restart()
        return
      }

      this.player.jump()
    })

    this.input.on('pointerdown', () => {
      if (this.gameOver || this.finished) {
        this.scene.restart()
        return
      }

      this.player.jump()
    })
  }

  configureCamera() {
    this.cameras.main.setBounds(0, 0, this.levelWidth, 996)
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12, -260, 170)
    this.cameras.main.setZoom(1)
  }

  createGeneratedHazardTextures() {
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

  failLevel(reason) {
    if (this.gameOver || this.finished) {
      return
    }

    this.gameOver = true
    this.player.defeat()
    this.cameras.main.shake(220, 0.01)
    this.messageText.setText(`${reason}\nPress Space to retry`)
  }

  completeLevel() {
    this.finished = true
    this.player.setVelocityX(0)
    this.player.play('cs-run', true)
    this.cameras.main.fadeOut(900, 12, 18, 30)
    this.messageText.setText('Level 2 Complete\nPress Space to replay')
  }
}
