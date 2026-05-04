import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'cs-run-1')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.runSpeed = 320
    this.jumpVelocity = -700
    this.isAlive = true

    this.setScale(1.05)
    this.setDepth(10)
    this.setCollideWorldBounds(false)
    this.body.setSize(40, 70)
    this.body.setOffset(28, 20)
  }

  start() {
    this.setVelocityX(this.runSpeed)
    this.play('cs-run', true)
  }

  jump() {
    if (!this.isAlive || !this.body.blocked.down) {
      return
    }

    this.setVelocityY(this.jumpVelocity)
    this.showJumpPose()
  }

  update() {
    if (!this.isAlive) {
      return
    }

    this.setVelocityX(this.runSpeed)

    if (this.body.blocked.down) {
      this.play('cs-run', true)
      return
    }

    if (this.body.velocity.y < 0) {
      this.showJumpPose()
      return
    }

    this.showFallPose()
  }

  defeat() {
    this.isAlive = false
    this.setVelocity(0, -260)
    this.setTint(0xff5d5d)
    this.setAngularVelocity(420)
  }

  showJumpPose() {
    if (this.texture.key !== 'cs-jump') {
      this.anims.stop()
      this.setTexture('cs-jump')
    }
  }

  showFallPose() {
    if (this.texture.key !== 'cs-fall') {
      this.anims.stop()
      this.setTexture('cs-fall')
    }
  }
}
