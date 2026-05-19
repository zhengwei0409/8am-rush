import Phaser from 'phaser'
import { playStartBgm, startBgmUrl, stopRunningBgm } from '../audio.js'
import { formatRaceClock, formatRemainingTime } from '../gameData.js'

const winImageUrl = new URL('../assets/ending screens/ending_win.png', import.meta.url).href
const loseImageUrl = new URL('../assets/ending screens/ending_lose.png', import.meta.url).href

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene')
  }

  init(data) {
    this.result = data
  }

  preload() {
    this.load.audio('start-bgm', startBgmUrl)
    this.load.image('ending-win', winImageUrl)
    this.load.image('ending-lose', loseImageUrl)
  }

  create() {
    stopRunningBgm(this)
    playStartBgm(this)

    const won = this.result.won

    // Full-screen ending image
    this.add.image(480, 270, won ? 'ending-win' : 'ending-lose')
      .setOrigin(0.5)
      .setDisplaySize(960, 540)

    // Thin dark strip at the very bottom — kept above y=478 so the
    // "Too late... Try again tomorrow?" text on the lose screen stays visible
    // this.add.rectangle(480, 509, 960, 62, 0x050913, 0.88)
    // this.add.rectangle(480, 478, 960, 1, 0xffffff, 0.14)

    // Stats line — rendered above buttons so it stays visible if they slightly overlap
    this.add.text(480, 460,
      `${formatRaceClock(this.result.elapsedMs)} AM  ·  Score: ${this.result.score}  ·  Coins: ${this.result.totalCoins ?? 0}`,
      {
        fontFamily: 'Courier New',
        fontSize: '17px',
        fontStyle: '700',
        color: '#ffffff',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 6,
      }
    ).setOrigin(0.5).setDepth(3)

    // ── Buttons ──────────────────────────────────────────────
    const primaryLabel = won ? 'PLAY AGAIN' : 'RETRY'
    const primaryAction = () => this.scene.start('CharacterSelectScene')
    const secondaryAction = () => this.scene.start('StartScene')

    // Primary: gold rounded button
    this.createResultButton(345, 507, 260, 52, primaryLabel, 0xffcc48, 0xffe570, primaryAction, '#dce8ff')
    // Secondary: medium blue fill with bright border
    this.createResultButton(615, 507, 260, 52, 'MAIN MENU', 0x1a3a6e, 0x1e4a8e, secondaryAction, '#dce8ff', 0x4a80c8)

    this.input.keyboard.on('keydown-SPACE', primaryAction)
    this.input.keyboard.on('keydown-ENTER', primaryAction)
    this.input.keyboard.on('keydown-ESC', secondaryAction)
  }

  createResultButton(x, y, width, height, label, fillColor, hoverColor, onClick, textColor = '#101622', strokeColor = null) {
    const r = 7
    const gfx = this.add.graphics()

    const draw = (color) => {
      gfx.clear()
      // Drop shadow
      gfx.fillStyle(0x000000, 0.65)
      gfx.fillRoundedRect(x - width / 2 + 3, y - height / 2 + 5, width, height, r)
      // Fill
      gfx.fillStyle(color, 1)
      gfx.fillRoundedRect(x - width / 2, y - height / 2, width, height, r)
      // Optional border
      if (strokeColor !== null) {
        gfx.lineStyle(1.5, strokeColor, 1)
        gfx.strokeRoundedRect(x - width / 2, y - height / 2, width, height, r)
      }
    }

    draw(fillColor)

    this.add.text(x, y, label, {
      fontFamily: 'Arial',
      fontSize: '18px',
      fontStyle: '900',
      color: textColor,
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5).setDepth(1)

    this.add.rectangle(x, y, width, height, 0x000000, 0)
      .setInteractive({ useHandCursor: true })
      .setDepth(2)
      .on('pointerover', () => draw(hoverColor))
      .on('pointerout', () => draw(fillColor))
      .on('pointerdown', onClick)
  }
}
