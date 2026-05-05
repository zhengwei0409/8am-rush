import Phaser from 'phaser'

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene')
  }

  create() {
    this.createPixelBackground()

    this.add.text(80, 78, '8am Rush', {
      fontFamily: 'Arial',
      fontSize: '68px',
      fontStyle: '900',
      color: '#ffffff',
      stroke: '#101622',
      strokeThickness: 8,
    })

    this.add.text(84, 162, 'Run from 7:00 AM to campus before the clock hits 8:00.', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#dce8ff',
    })

    this.add.text(84, 214, 'Press Space to jump. Finish Level 3 in time to win.', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffcc48',
    })

    const playButton = this.add.rectangle(480, 350, 220, 70, 0xffcc48, 1)
      .setInteractive({ useHandCursor: true })
    playButton.setStrokeStyle(4, 0xffffff, 0.9)

    const playText = this.add.text(480, 350, 'Play', {
      fontFamily: 'Arial',
      fontSize: '32px',
      fontStyle: '900',
      color: '#101622',
    }).setOrigin(0.5)

    playButton.on('pointerover', () => playButton.setFillStyle(0xffdf72))
    playButton.on('pointerout', () => playButton.setFillStyle(0xffcc48))
    playButton.on('pointerdown', () => this.scene.start('CharacterSelectScene'))

    this.input.keyboard.on('keydown-SPACE', () => this.scene.start('CharacterSelectScene'))
    this.tweens.add({
      targets: [playButton, playText],
      scale: 1.04,
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  createPixelBackground() {
    this.add.rectangle(480, 270, 960, 540, 0x0f1728)

    const graphics = this.add.graphics()
    const tile = 12

    graphics.fillStyle(0x13223a, 1)
    graphics.fillRect(0, 0, 960, 264)
    graphics.fillStyle(0x182b49, 1)
    graphics.fillRect(0, 0, 960, 72)
    graphics.fillStyle(0x203a5c, 1)
    graphics.fillRect(0, 72, 960, 36)

    graphics.fillStyle(0xffcc48, 1)
    this.fillPixelCircle(graphics, 142, 122, 78, tile)
    graphics.fillStyle(0xf6b834, 1)
    this.fillPixelCircle(graphics, 122, 142, 42, tile)

    graphics.fillStyle(0x0b1220, 1)
    graphics.fillRect(0, 230, 960, 134)
    graphics.fillStyle(0x142238, 1)
    graphics.fillRect(0, 250, 960, 36)

    const buildings = [
      [18, 170, 84, 96, 0x1f3554],
      [112, 138, 108, 128, 0x264361],
      [248, 162, 132, 104, 0x1b304e],
      [690, 136, 120, 130, 0x223c5d],
      [826, 158, 94, 108, 0x1b304e],
    ]

    buildings.forEach(([x, y, width, height, color]) => {
      graphics.fillStyle(color, 1)
      graphics.fillRect(x, y, width, height)
      graphics.fillStyle(0x89d6ff, 0.55)

      for (let row = y + 18; row < y + height - 12; row += 24) {
        for (let col = x + 14; col < x + width - 14; col += 24) {
          graphics.fillRect(col, row, 10, 10)
        }
      }
    })

    graphics.fillStyle(0x1c5a70, 1)
    graphics.fillRect(0, 364, 960, 176)
    graphics.fillStyle(0x16495e, 1)
    graphics.fillRect(0, 444, 960, 96)
    graphics.fillStyle(0x24344d, 1)
    graphics.fillRect(0, 390, 960, 24)
    graphics.fillStyle(0x89d6ff, 0.5)

    for (let x = 0; x < 960; x += 48) {
      graphics.fillRect(x, 390, 24, 6)
    }

    graphics.fillStyle(0xffcc48, 1)
    graphics.fillRect(794, 122, 88, 12)
    graphics.fillRect(836, 86, 12, 82)

    graphics.lineStyle(2, 0x253d61, 0.45)
    for (let x = 0; x <= 960; x += tile) {
      graphics.lineBetween(x, 0, x, 540)
    }
    for (let y = 0; y <= 540; y += tile) {
      graphics.lineBetween(0, y, 960, y)
    }
  }

  fillPixelCircle(graphics, centerX, centerY, radius, tile) {
    for (let y = centerY - radius; y <= centerY + radius; y += tile) {
      for (let x = centerX - radius; x <= centerX + radius; x += tile) {
        const distance = Phaser.Math.Distance.Between(centerX, centerY, x + tile / 2, y + tile / 2)

        if (distance <= radius) {
          graphics.fillRect(x, y, tile, tile)
        }
      }
    }
  }
}
