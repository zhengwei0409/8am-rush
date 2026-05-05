import Phaser from 'phaser'
import { characters, createInitialRunState, preloadCharacterAssets } from '../gameData.js'

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelectScene')
  }

  preload() {
    preloadCharacterAssets(this)
  }

  create() {
    this.selectedIndex = 0
    this.isChanging = false

    this.createSketchBackground()

    this.add.text(64, 36, 'Select Character:', {
      fontFamily: 'Courier New',
      fontSize: '40px',
      fontStyle: '900',
      color: '#ffffff',
      stroke: '#0d1c25',
      strokeThickness: 7,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: '#2c6778',
        fill: true,
      },
    }).setOrigin(0, 0.5)

    this.nameText = this.add.text(480, 424, '', {
      fontFamily: 'Courier New',
      fontSize: '30px',
      fontStyle: '900',
      color: '#ffffff',
      stroke: '#0d1c25',
      strokeThickness: 6,
    }).setOrigin(0.5)

    this.helpText = this.add.text(480, 478, 'ENTER / SPACE to run',
      {
        fontFamily: 'Courier New',
        fontSize: '18px',
        fontStyle: '900',
        color: '#d7f7ff',
        stroke: '#0d1c25',
        strokeThickness: 4,
      }).setOrigin(0.5)

    this.leftPreview = this.add.image(208, 288, 'cs-portrait').setAlpha(0.18).setTint(0x104b5d)
    this.rightPreview = this.add.image(752, 288, 'cs-portrait').setAlpha(0.18).setTint(0x104b5d)
    this.character = this.add.image(480, 275, 'cs-portrait').setInteractive({ useHandCursor: true })
    this.character.setDepth(4)

    const leftArrow = this.createArrowButton(67, 268, -1)
    const rightArrow = this.createArrowButton(893, 268, 1)

    leftArrow.on('pointerdown', () => this.changeCharacter(-1))
    rightArrow.on('pointerdown', () => this.changeCharacter(1))
    this.character.on('pointerdown', () => this.playSelectedCharacter())

    this.input.keyboard.on('keydown-LEFT', () => this.changeCharacter(-1))
    this.input.keyboard.on('keydown-A', () => this.changeCharacter(-1))
    this.input.keyboard.on('keydown-RIGHT', () => this.changeCharacter(1))
    this.input.keyboard.on('keydown-D', () => this.changeCharacter(1))
    this.input.keyboard.on('keydown-ENTER', () => this.playSelectedCharacter())
    this.input.keyboard.on('keydown-SPACE', () => this.playSelectedCharacter())

    this.updateCharacterDisplay(true)

    this.tweens.add({
      targets: this.helpText,
      alpha: 0.58,
      duration: 720,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  createSketchBackground() {
    this.add.rectangle(480, 270, 960, 540, 0x35a4ba)

    if (!this.textures.exists('character-select-paper')) {
      const texture = this.textures.createCanvas('character-select-paper', 960, 540)
      const context = texture.getContext()
      context.fillStyle = '#35a4ba'
      context.fillRect(0, 0, 960, 540)
      context.strokeStyle = 'rgba(15, 78, 96, 0.44)'
      context.lineWidth = 5
      context.lineCap = 'round'
      context.lineJoin = 'round'

      const drawLine = (points) => {
        context.beginPath()
        context.moveTo(points[0][0], points[0][1])
        points.slice(1).forEach(([x, y]) => context.lineTo(x, y))
        context.stroke()
      }

      drawLine([[98, 13], [186, 64], [271, 44], [314, 95], [258, 99], [344, 164]])
      drawLine([[685, -8], [654, 106], [754, 25], [861, 56], [876, 166], [790, 229]])
      drawLine([[82, 154], [245, 192], [248, 388], [88, 426], [38, 258]])
      drawLine([[621, 187], [801, 168], [866, 255], [827, 399], [653, 394], [626, 287]])
      drawLine([[350, 421], [418, 344], [513, 372], [585, 318], [674, 452]])
      drawLine([[471, 73], [553, 31], [660, 84], [622, 146], [493, 139]])
      drawLine([[126, 226], [202, 244], [190, 349], [112, 335], [99, 273], [126, 226]])
      drawLine([[715, 239], [781, 235], [797, 337], [719, 349], [695, 292], [715, 239]])

      context.lineWidth = 3
      for (let index = 0; index < 35; index += 1) {
        const x = Phaser.Math.Between(28, 920)
        const y = Phaser.Math.Between(28, 510)
        const length = Phaser.Math.Between(34, 108)
        const tilt = Phaser.Math.FloatBetween(-0.9, 0.9)
        drawLine([[x, y], [x + length, y + length * tilt]])
      }

      texture.refresh()
    }
    this.add.image(480, 270, 'character-select-paper').setAlpha(0.92)

    const vignette = this.add.graphics()
    vignette.fillStyle(0x0f4e60, 0.18)
    vignette.fillRect(0, 0, 960, 540)
    vignette.fillStyle(0x35a4ba, 0.52)
    vignette.fillEllipse(480, 286, 620, 430)
  }

  createArrowButton(x, y, direction) {
    const zone = this.add.zone(x, y, 116, 116).setInteractive({ useHandCursor: true })
    const shadow = this.add.graphics()
    const arrow = this.add.graphics()
    const drawArrow = (target, fill, offsetX = 0, offsetY = 0) => {
      target.clear()
      target.fillStyle(fill, 1)
      target.lineStyle(6, 0x0d1c25, 1)
      const points = direction < 0
        ? [[x - 44 + offsetX, y + offsetY], [x + 2 + offsetX, y - 38 + offsetY], [x + 2 + offsetX, y - 17 + offsetY], [x + 48 + offsetX, y - 17 + offsetY], [x + 48 + offsetX, y + 17 + offsetY], [x + 2 + offsetX, y + 17 + offsetY], [x + 2 + offsetX, y + 38 + offsetY]]
        : [[x + 44 + offsetX, y + offsetY], [x - 2 + offsetX, y - 38 + offsetY], [x - 2 + offsetX, y - 17 + offsetY], [x - 48 + offsetX, y - 17 + offsetY], [x - 48 + offsetX, y + 17 + offsetY], [x - 2 + offsetX, y + 17 + offsetY], [x - 2 + offsetX, y + 38 + offsetY]]
      target.beginPath()
      target.moveTo(points[0][0], points[0][1])
      points.slice(1).forEach(([pointX, pointY]) => target.lineTo(pointX, pointY))
      target.closePath()
      target.fillPath()
      target.strokePath()
    }

    drawArrow(shadow, 0x0d1c25, 5, 5)
    drawArrow(arrow, 0xe8eef0)

    zone.on('pointerover', () => {
      arrow.setScale(1.08)
      arrow.setPosition((1 - 1.08) * x, (1 - 1.08) * y)
    })
    zone.on('pointerout', () => {
      arrow.setScale(1)
      arrow.setPosition(0, 0)
    })

    return zone
  }

  getCharacterIndex(offset) {
    return Phaser.Math.Wrap(this.selectedIndex + offset, 0, characters.length)
  }

  updateCharacterDisplay(skipTween = false) {
    const selected = characters[this.selectedIndex]
    const previous = characters[this.getCharacterIndex(-1)]
    const next = characters[this.getCharacterIndex(1)]

    this.character.setTexture(`${selected.key}-portrait`)
    this.character.setDisplaySize(222, 222)
    this.character.setPosition(480, 272)
    this.character.clearTint()
    this.character.setAlpha(1)

    this.leftPreview.setTexture(`${previous.key}-portrait`)
    this.leftPreview.setDisplaySize(178, 178)
    this.rightPreview.setTexture(`${next.key}-portrait`)
    this.rightPreview.setDisplaySize(178, 178)

    this.nameText.setText(selected.name)

    if (skipTween) {
      return
    }

    this.character.setDisplaySize(195, 195)
    this.tweens.add({
      targets: this.character,
      displayWidth: 222,
      displayHeight: 222,
      duration: 180,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.isChanging = false
      },
    })
  }

  changeCharacter(direction) {
    if (this.isChanging) {
      return
    }

    this.isChanging = true
    this.selectedIndex = this.getCharacterIndex(direction)
    this.updateCharacterDisplay()
  }

  playSelectedCharacter() {
    if (this.isChanging) {
      return
    }

    this.scene.start('Level1', createInitialRunState(characters[this.selectedIndex].key))
  }
}
