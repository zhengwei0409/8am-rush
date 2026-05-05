import Phaser from 'phaser'

const PLAYER_SCALE = 1.95

const CHARACTER_BODY_OFFSETS = {
  cs: {
    y: 22,
  },
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterKey = 'cs', worldScale = 1) {
    super(scene, x, y, `${characterKey}-run-1`)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.characterKey = characterKey
    this.runSpeed = 300 * worldScale
    this.jumpVelocity = -700 * worldScale

    const bodyOffset = CHARACTER_BODY_OFFSETS[characterKey] ?? { y: 0 }

    this.setScale(PLAYER_SCALE * worldScale)
    this.setDepth(10)
    this.setCollideWorldBounds(false)
    this.body.setSize(40 * worldScale, 70 * worldScale)
    this.body.setOffset(28 * worldScale, 20 * worldScale + bodyOffset.y)
  }

  start() {
    this.setVelocityX(this.runSpeed)
    this.play(`${this.characterKey}-run`, true)
  }

  jump() {
    if (!this.body.blocked.down) {
      return
    }

    this.setVelocityY(this.jumpVelocity)
    this.showJumpPose()
  }

  update() {
    this.setVelocityX(this.runSpeed)

    if (this.body.blocked.down) {
      this.play(`${this.characterKey}-run`, true)
      return
    }

    if (this.body.velocity.y < 0) {
      this.showJumpPose()
      return
    }

    this.showFallPose()
  }

  showJumpPose() {
    const textureKey = `${this.characterKey}-jump`

    if (this.texture.key !== textureKey) {
      this.anims.stop()
      this.setTexture(textureKey)
    }
  }

  showFallPose() {
    const textureKey = `${this.characterKey}-fall`

    if (this.texture.key !== textureKey) {
      this.anims.stop()
      this.setTexture(textureKey)
    }
  }
}
