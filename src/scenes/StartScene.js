import Phaser from 'phaser'

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene')
  }

  create() {
    this.add.rectangle(480, 270, 960, 540, 0x101622)
    this.add.rectangle(480, 440, 960, 190, 0x1f6f8b, 0.45)
    this.add.circle(140, 120, 80, 0xffcc48, 0.9)

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
}
