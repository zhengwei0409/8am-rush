import Phaser from 'phaser'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type = 'cone') {
    super(scene, x, y, type === 'barrier' ? 'barrier' : 'cone')

    scene.add.existing(this)
    scene.physics.add.existing(this, true)

    this.setDepth(8)
    this.setOrigin(0.5, 1)

    if (type === 'barrier') {
      this.body.setSize(58, 88)
      this.setDisplaySize(64, 92)
    } else {
      this.body.setSize(44, 54)
      this.setDisplaySize(52, 62)
    }
  }
}
