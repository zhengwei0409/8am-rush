import Phaser from 'phaser'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type = 'cone', worldScale = 1) {
    super(scene, x, y, type === 'barrier' ? 'barrier' : 'cone')

    scene.add.existing(this)
    scene.physics.add.existing(this, true)

    this.setDepth(8)
    this.setOrigin(0.5, 1)

    if (type === 'barrier') {
      this.body.setSize(58 * worldScale, 88 * worldScale)
      this.setDisplaySize(64 * worldScale, 92 * worldScale)
    } else {
      this.body.setSize(44 * worldScale, 54 * worldScale)
      this.setDisplaySize(52 * worldScale, 62 * worldScale)
    }
  }
}
