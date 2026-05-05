import Phaser from 'phaser'
import { formatRaceClock, formatRemainingTime } from '../gameData.js'

export default class LevelSummaryScene extends Phaser.Scene {
  constructor() {
    super('LevelSummaryScene')
  }

  init(data) {
    this.summary = data
  }

  create() {
    const nextLevel = this.summary.completedLevel + 1

    this.add.rectangle(480, 270, 960, 540, 0x101622)
    this.add.rectangle(480, 270, 520, 320, 0x18243a, 1)
      .setStrokeStyle(4, 0x89d6ff, 0.9)

    this.add.text(480, 152, `Level ${this.summary.completedLevel} Complete`, {
      fontFamily: 'Arial',
      fontSize: '36px',
      fontStyle: '900',
      color: '#ffffff',
    }).setOrigin(0.5)

    this.add.text(480, 220, `Clock: ${formatRaceClock(this.summary.elapsedMs)} AM`, {
      fontFamily: 'Courier New',
      fontSize: '30px',
      fontStyle: '700',
      color: '#ffcc48',
    }).setOrigin(0.5)

    this.add.text(480, 266, `Remaining Time: ${formatRemainingTime(this.summary.elapsedMs)}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#dce8ff',
    }).setOrigin(0.5)

    this.add.text(480, 304, `Level Score: +${this.summary.levelScore}    Total: ${this.summary.score}`, {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#dce8ff',
    }).setOrigin(0.5)

    const button = this.add.rectangle(480, 392, 250, 62, 0xffcc48, 1)
      .setInteractive({ useHandCursor: true })
    this.add.text(480, 392, `Start Level ${nextLevel}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontStyle: '900',
      color: '#101622',
    }).setOrigin(0.5)

    const continueGame = () => this.scene.start(`Level${nextLevel}`, {
      characterKey: this.summary.characterKey,
      currentLevel: nextLevel,
      elapsedMs: this.summary.elapsedMs,
      score: this.summary.score,
    })

    button.on('pointerdown', continueGame)
    this.input.keyboard.on('keydown-SPACE', continueGame)
  }
}
