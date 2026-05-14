import Phaser from 'phaser'
import { formatRaceClock, formatRemainingTime } from '../gameData.js'

const summaryBackgroundUrl = new URL('../assets/menu/Start.png', import.meta.url).href

export default class LevelSummaryScene extends Phaser.Scene {
  constructor() {
    super('LevelSummaryScene')
  }

  preload() {
    this.load.image('level-summary-background', summaryBackgroundUrl)
  }

  init(data) {
    this.summary = data
  }

  create() {
    const nextLevel = this.summary.completedLevel + 1

    this.add.image(480, 270, 'level-summary-background')
      .setDisplaySize(960, 540)

    this.add.rectangle(480, 270, 960, 540, 0x0b1b2c, 0.34)

    const burst = this.add.graphics()
    burst.fillStyle(0xffcc48, 0.18)
    burst.fillCircle(186, 106, 44)
    burst.fillCircle(768, 432, 58)
    burst.fillStyle(0xffffff, 0.16)
    burst.fillCircle(122, 422, 28)
    burst.fillCircle(810, 112, 34)

    const cardShadow = this.add.rectangle(488, 286, 586, 348, 0x061326, 0.72)
      .setAngle(2.5)
    const card = this.add.rectangle(480, 270, 586, 348, 0xfff2b8, 0.96)
      .setStrokeStyle(6, 0x101622, 1)
      .setAngle(-1.4)
    const innerCard = this.add.rectangle(480, 286, 518, 234, 0x24406c, 0.88)
      .setStrokeStyle(4, 0xffcc48, 1)

    this.add.text(480, 112, 'Checkpoint!', {
      fontFamily: 'Arial',
      fontSize: '28px',
      fontStyle: '900',
      color: '#24406c',
      stroke: '#fff8d9',
      strokeThickness: 4,
    }).setOrigin(0.5).setAngle(-4)

    this.add.text(480, 156, `Level ${this.summary.completedLevel} Complete`, {
      fontFamily: 'Courier New',
      fontSize: '36px',
      fontStyle: '900',
      color: '#ffffff',
      stroke: '#101622',
      strokeThickness: 7,
    }).setOrigin(0.5)

    this.createSummaryRow(480, 214, 'CLOCK', `${formatRaceClock(this.summary.elapsedMs)} AM`, 0xffcc48)
    this.createSummaryRow(480, 260, 'LEFT', formatRemainingTime(this.summary.elapsedMs), 0x74e1ff)
    this.createSummaryRow(480, 306, 'SCORE', `+${this.summary.levelScore}   TOTAL ${this.summary.score}`, 0xff8a5c)
    this.createSummaryRow(480, 352, 'COINS', `${this.summary.totalCoins ?? 0}`, 0xffd966)

    const buttonShadow = this.add.rectangle(486, 414, 278, 62, 0x061326, 0.82)
    const button = this.add.rectangle(480, 406, 278, 62, 0xffcc48, 1)
      .setStrokeStyle(4, 0x101622, 1)
      .setInteractive({ useHandCursor: true })
    const buttonText = this.add.text(470, 406, `Start Level ${nextLevel}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontStyle: '900',
      color: '#101622',
      stroke: '#fff8d9',
      strokeThickness: 3,
    }).setOrigin(0.5)
    const arrow = this.add.triangle(592, 406, 0, -10, 0, 10, 14, 0, 0x101622)

    const continueGame = () => this.scene.start(`Level${nextLevel}`, {
      characterKey: this.summary.characterKey,
      currentLevel: nextLevel,
      elapsedMs: this.summary.elapsedMs,
      score: this.summary.score,
      totalCoins: this.summary.totalCoins ?? 0,
    })

    button.on('pointerover', () => button.setFillStyle(0xffdd62))
    button.on('pointerout', () => button.setFillStyle(0xffcc48))
    button.on('pointerdown', continueGame)
    this.input.keyboard.on('keydown-SPACE', continueGame)

    this.tweens.add({
      targets: [button, buttonShadow, buttonText, arrow],
      scaleX: 1.03,
      scaleY: 1.06,
      duration: 720,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    this.tweens.add({
      targets: card,
      angle: 1.4,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  createSummaryRow(x, y, label, value, accentColor) {
    this.add.rectangle(x, y, 438, 36, 0x101622, 0.72)
      .setStrokeStyle(3, accentColor, 1)
    this.add.rectangle(x - 166, y, 96, 36, accentColor, 1)
      .setStrokeStyle(3, 0x101622, 1)

    this.add.text(x - 166, y, label, {
      fontFamily: 'Arial',
      fontSize: '16px',
      fontStyle: '900',
      color: '#101622',
    }).setOrigin(0.5)

    this.add.text(x + 42, y, value, {
      fontFamily: 'Courier New',
      fontSize: '22px',
      fontStyle: '900',
      color: '#fff8d9',
      stroke: '#101622',
      strokeThickness: 3,
    }).setOrigin(0.5)
  }
}
