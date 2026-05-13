import Phaser from 'phaser'
import { playStartBgm, startBgmUrl } from '../audio.js'

const startBackgroundUrl = new URL('../assets/menu/Start.png', import.meta.url).href
const logoUrl = new URL('../assets/logo.png', import.meta.url).href

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene')
  }

  preload() {
    this.load.image('start-menu-background', startBackgroundUrl)
    this.load.image('game-logo', logoUrl)
    this.load.audio('start-bgm', startBgmUrl)
  }

  create() {
    playStartBgm(this)

    this.add.image(480, 270, 'start-menu-background')
      .setDisplaySize(960, 540)

    const logo = this.add.image(480, 260, 'game-logo')
      .setOrigin(0.5)

    logo.setScale(Math.min(360 / logo.width, 190 / logo.height))

    this.add.rectangle(480, 432, 960, 216, 0x061326, 0.28)

    this.add.text(480, 380, 'WELCOME TO', {
      fontFamily: 'Arial',
      fontSize: '22px',
      fontStyle: '900',
      color: '#ffffff',
      stroke: '#101622',
      strokeThickness: 4,
    }).setOrigin(0.5)

    this.add.text(480, 416, 'UNIVERSITI MALAYA', {
      fontFamily: 'Arial',
      fontSize: '42px',
      fontStyle: '900',
      color: '#ffc21f',
      stroke: '#181016',
      strokeThickness: 6,
    }).setOrigin(0.5)

    this.add.text(38, 516, 'v1.0.0', {
      fontFamily: 'Arial',
      fontSize: '14px',
      fontStyle: '900',
      color: '#ffcc48',
      stroke: '#2d1c00',
      strokeThickness: 3,
    }).setOrigin(0, 0.5)

    this.add.text(788, 516, 'PRESS', {
      fontFamily: 'Arial',
      fontSize: '14px',
      fontStyle: '900',
      color: '#fff8d9',
      stroke: '#101622',
      strokeThickness: 3,
    }).setOrigin(0.5)

    const spaceKey = this.add.rectangle(846, 516, 54, 22, 0x24406c, 1)
      .setStrokeStyle(2, 0xfff3b0, 0.95)
    this.add.text(846, 516, 'SPACE', {
      fontFamily: 'Arial',
      fontSize: '13px',
      fontStyle: '900',
      color: '#fff8d9',
      stroke: '#101622',
      strokeThickness: 3,
    }).setOrigin(0.5)

    this.add.text(914, 516, 'TO START', {
      fontFamily: 'Arial',
      fontSize: '14px',
      fontStyle: '900',
      color: '#fff8d9',
      stroke: '#101622',
      strokeThickness: 3,
    }).setOrigin(0.5)

    const startGame = () => {
      playStartBgm(this)
      this.scene.start('CharacterSelectScene')
    }

    this.createMenuButton(480, 470, 212, 30, 'START GAME', 0xd89100, 0xffbd1f, startGame)
    this.createMenuButton(480, 510, 212, 30, 'EXIT GAME', 0x013b78, 0x0657a7, () => this.game.destroy(true))

    this.input.keyboard.on('keydown-SPACE', startGame)
  }

  createMenuButton(x, y, width, height, label, baseColor, hoverColor, onClick) {
    const shadow = this.add.rectangle(x + 3, y + 3, width, height, 0x0a101d, 0.95)
    const button = this.add.rectangle(x, y, width, height, baseColor, 1)
      .setStrokeStyle(3, 0xffe47a, 1)
      .setInteractive({ useHandCursor: true })
    const text = this.add.text(x - 7, y, label, {
      fontFamily: 'Arial',
      fontSize: '18px',
      fontStyle: '900',
      color: '#fff8d9',
      stroke: '#201914',
      strokeThickness: 4,
    }).setOrigin(0.5)
    const arrow = this.add.triangle(x + width / 2 - 24, y, 0, -8, 0, 8, 12, 0, 0xfff8d9)

    button.on('pointerover', () => {
      button.setFillStyle(hoverColor)
      shadow.setAlpha(1)
    })
    button.on('pointerout', () => {
      button.setFillStyle(baseColor)
      shadow.setAlpha(0.95)
    })
    button.on('pointerdown', onClick)

    this.tweens.add({
      targets: [button, text, arrow],
      scaleX: 1.02,
      scaleY: 1.04,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    return button
  }
}
