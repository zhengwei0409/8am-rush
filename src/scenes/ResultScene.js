import Phaser from 'phaser'
import { formatRaceClock, formatRemainingTime } from '../gameData.js'

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene')
  }

  init(data) {
    this.result = data
  }

  create() {
    const won = this.result.won
    const title = won ? 'You Made It Before 8:00!' : 'Late for Class'
    const color = won ? '#72e0a2' : '#ff5d5d'

    this.add.rectangle(480, 270, 960, 540, 0x101622)
    this.add.rectangle(480, 430, 960, 220, won ? 0x1f6f4d : 0x5c2630, 0.55)

    this.add.text(480, 120, title, {
      fontFamily: 'Arial',
      fontSize: '44px',
      fontStyle: '900',
      color,
      align: 'center',
      stroke: '#101622',
      strokeThickness: 6,
    }).setOrigin(0.5)

    this.add.text(480, 185, this.result.reason, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
    }).setOrigin(0.5)

    this.add.text(480, 250, `Final Clock: ${formatRaceClock(this.result.elapsedMs)} AM`, {
      fontFamily: 'Courier New',
      fontSize: '30px',
      fontStyle: '700',
      color: '#ffcc48',
    }).setOrigin(0.5)

    this.add.text(480, 296, `Remaining: ${formatRemainingTime(this.result.elapsedMs)}    Score: ${this.result.score}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#dce8ff',
    }).setOrigin(0.5)

    const button = this.add.rectangle(480, 390, 240, 64, 0xffcc48, 1)
      .setInteractive({ useHandCursor: true })
    this.add.text(480, 390, 'Play Again', {
      fontFamily: 'Arial',
      fontSize: '26px',
      fontStyle: '900',
      color: '#101622',
    }).setOrigin(0.5)

    const restart = () => this.scene.start('StartScene')
    button.on('pointerdown', restart)
    this.input.keyboard.on('keydown-SPACE', restart)
  }
}
