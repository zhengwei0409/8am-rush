const bgmUrl = new URL('../assets/audio/runningBGM.mp3', import.meta.url).href
const jumpUrl = new URL('../assets/audio/jump.mp3', import.meta.url).href
const collectibleUrl = new URL('../assets/audio/collectible.mp3', import.meta.url).href
const hitSoundUrl = new URL('../assets/audio/hit-sound.mp3', import.meta.url).href
const powerupSoundUrl = new URL('../assets/audio/powerup.mp3', import.meta.url).href
const powerdownSoundUrl = new URL('../assets/audio/powerdown.mp3', import.meta.url).href
const clownWalk1Url = new URL('../assets/enemies/clown_walking/walking_01.png', import.meta.url).href
const clownWalk2Url = new URL('../assets/enemies/clown_walking/walking_02.png', import.meta.url).href
const clownWalk3Url = new URL('../assets/enemies/clown_walking/walking_03.png', import.meta.url).href
const clownThrow1Url = new URL('../assets/enemies/clown_throwing/throwing_1.png', import.meta.url).href
const clownThrow2Url = new URL('../assets/enemies/clown_throwing/throwing_2.png', import.meta.url).href
const icecreamUrl = new URL('../assets/enemies/ice_cream/ice_cream_1.png', import.meta.url).href
const phonePersonWalk1Url = new URL('../assets/enemies/person_phone_walking/walking_1.png', import.meta.url).href
const phonePersonWalk2Url = new URL('../assets/enemies/person_phone_walking/walking_2.png', import.meta.url).href
const phonePersonWalk3Url = new URL('../assets/enemies/person_phone_walking/walking_3.png', import.meta.url).href
const phonePersonCollide1Url = new URL('../assets/enemies/person_phone_collide/collide_1.png', import.meta.url).href
const phonePersonCollide2Url = new URL('../assets/enemies/person_phone_collide/collide_2.png', import.meta.url).href
const phonePersonCollide3Url = new URL('../assets/enemies/person_phone_collide/collide_3.png', import.meta.url).href
const guardWalk1Url = new URL('../assets/enemies/guard_walking/walking_1.png', import.meta.url).href
const guardWalk2Url = new URL('../assets/enemies/guard_walking/walking_2.png', import.meta.url).href
const guardWalk3Url = new URL('../assets/enemies/guard_walking/walking_3.png', import.meta.url).href
const guardCollide1Url = new URL('../assets/enemies/guard_collide/collide_1.png', import.meta.url).href
const guardCollide2Url = new URL('../assets/enemies/guard_collide/collide_2.png', import.meta.url).href
const breakfastUrl = new URL('../assets/powerup/breakfast.png', import.meta.url).href
const coffeeUrl = new URL('../assets/powerup/coffee.png', import.meta.url).href
const exampaperUrl = new URL('../assets/powerup/exampaper.png', import.meta.url).href
const sleepUrl = new URL('../assets/powerdown/sleep.png', import.meta.url).href
import Phaser from 'phaser'
import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'
import {
  GAME_DURATION_MS,
  formatRaceClock,
  registerCharacterAnimations,
} from '../gameData.js'
import coinLevel1 from '../assets/collectible/level 1.png';
import coinLevel2 from '../assets/collectible/level 2.png';
import coinLevel3 from '../assets/collectible/level 3.png';

export default class BaseLevel extends Phaser.Scene {
  constructor(sceneKey, config) {
    super(sceneKey)
    this.levelConfig = config
  }

  init(data) {
    this.runState = {
      characterKey: data?.characterKey ?? 'cs',
      currentLevel: this.levelConfig.number,
      elapsedMs: data?.elapsedMs ?? 0,
      score: data?.score ?? 0,
      totalCoins: data?.totalCoins ?? 0,
    }
  }

  preload() {
    this.load.image(this.levelConfig.backgroundKey, this.levelConfig.backgroundUrl)

    const platformKeys = new Set(this.levelConfig.platforms.map(([, , assetKey]) => assetKey))
    platformKeys.forEach((platformKey) => {
      const platformNumber = platformKey.split('.')[1]
      const ext = (this.levelConfig.number === 1 && platformNumber === '1') ? 'jpg' : 'png'
      const url = new URL(`../assets/platform/level-${this.levelConfig.number}/${platformKey}.${ext}`, import.meta.url).href
      this.load.image(platformKey, url)
    })

    if (this.levelConfig.obstacleUrl) {
      this.load.image(this.levelConfig.obstacleKey, this.levelConfig.obstacleUrl);
    }

    this.load.image('enemy-clown-walk-1', clownWalk1Url)
    this.load.image('enemy-clown-walk-2', clownWalk2Url)
    this.load.image('enemy-clown-walk-3', clownWalk3Url)
    this.load.image('enemy-clown-throw-1', clownThrow1Url)
    this.load.image('enemy-clown-throw-2', clownThrow2Url)
    this.load.image('enemy-icecream', icecreamUrl)
    this.load.image('enemy-phone-person', phonePersonWalk1Url)
    this.load.image('enemy-phone-person-2', phonePersonWalk2Url)
    this.load.image('enemy-phone-person-3', phonePersonWalk3Url)
    this.load.image('enemy-phone-person-collide-1', phonePersonCollide1Url)
    this.load.image('enemy-phone-person-collide-2', phonePersonCollide2Url)
    this.load.image('enemy-phone-person-collide-3', phonePersonCollide3Url)
    this.load.image('enemy-security-guard', guardWalk1Url)
    this.load.image('enemy-security-guard-2', guardWalk2Url)
    this.load.image('enemy-security-guard-3', guardWalk3Url)
    this.load.image('enemy-security-guard-collide-1', guardCollide1Url)
    this.load.image('enemy-security-guard-collide-2', guardCollide2Url)
    this.load.image('powerup-breakfast', breakfastUrl)
    this.load.image('powerup-coffee', coffeeUrl)
    this.load.image('powerup-exampaper', exampaperUrl)
    this.load.image('powerdown-sleep', sleepUrl)

    const coinUrls = [coinLevel1, coinLevel2, coinLevel3]
    this.load.image(`coin_${this.levelConfig.number}`, coinUrls[this.levelConfig.number - 1])

    this.load.audio('bgm', bgmUrl)
    this.load.audio('jump', jumpUrl)
    this.load.audio('collectible', collectibleUrl)
    this.load.audio('powerup', powerupSoundUrl)
    this.load.audio('powerdown', powerdownSoundUrl)
    this.load.audio('hit-sound', hitSoundUrl)
  }

  create() {
    this.configureLevelMetrics()

    this.bgm = this.sound.add('bgm', {
      loop: true,
      volume: 0.8,
    })

    if (!this.sound.get('bgm')?.isPlaying) {
      this.bgm.play()
    }

    this.finished = false
    this.gameOver = false
    this.levelStarted = false
    this.controlsEnabled = false
    this.levelStartElapsed = this.runState.elapsedMs
    this.levelStartScore = this.runState.score
    this.levelStartTotalCoins = this.runState.totalCoins
    this.physics.world.gravity.y = 1600 * this.levelScale

    registerCharacterAnimations(this)
    this.registerEnemyAnimations()
    this.createGeneratedHazardTextures()
    this.createBackground()
    this.createPlatforms()
    this.createFinishLine()
    this.createPlayer()
    this.createHazards()
    this.createSceneEnemies()
    this.createHud()
    this.createControls()
    this.configureCamera()
    this.startLevelCountdown()

    this.coins = this.physics.add.group()
    this.coinCount = 0
    this.createCoins()
    this.createCoinHUD()

    this.powerItems = this.physics.add.group()
    this.createPowerItems()

    this.powerEffect = null
    this.powerEffectTween = null
  }

  update(time, delta) {
    if (this.gameOver || this.finished) {
      return
    }

    if (!this.levelStarted) {
      return
    }

    this.runState.elapsedMs = Math.min(GAME_DURATION_MS, this.runState.elapsedMs + delta)
    this.updateHud()

    if (this.runState.elapsedMs >= GAME_DURATION_MS) {
      this.endRun(false, 'Time ran out')
      return
    }

    this.player.update()
    if (this.powerEffect) {
      this.powerEffect.setPosition(this.player.x, this.player.y)
    }
    this.updateSceneEnemies(time)

    if (this.player.body.top > this.levelHeight + this.scaleLevelValue(120)) {
      this.restartLevelAfterFall()
      return
    }

    if (this.player.x >= this.finishX) {
      this.completeLevel()
    }
  }

  createBackground() {
    this.add.image(0, 0, this.levelConfig.backgroundKey)
      .setOrigin(0)
      .setScale(this.levelScale)
      .setDepth(0)
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight)
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platformSprites = [];

    const PLATFORM_ASSET_SCALE = 0.2;
    this.levelConfig.platforms.forEach(([x, y, assetKey]) => {
      const platform = this.platforms.create(
        this.scaleLevelValue(x),
        this.scaleLevelValue(y),
        assetKey
      );
      platform.setOrigin(0, 0.5);
      platform.setScale(this.levelScale * PLATFORM_ASSET_SCALE);
      platform.refreshBody();
      platform.setDepth(3);
      this.platformSprites.push(platform);
    });

  }

  createFinishLine() {
    const pole = this.add.rectangle(
      this.finishX,
      this.groundY - this.scaleLevelValue(96),
      this.scaleLevelValue(10),
      this.scaleLevelValue(160),
      0x89d6ff,
      0.9,
    )
    const banner = this.add.rectangle(
      this.finishX + this.scaleLevelValue(72),
      this.groundY - this.scaleLevelValue(160),
      this.scaleLevelValue(144),
      this.scaleLevelValue(48),
      0x10284f,
      0.92,
    )
    this.add.text(this.finishX + this.scaleLevelValue(72), this.groundY - this.scaleLevelValue(160), 'FINISH', {
      fontFamily: 'Arial',
      fontSize: `${Math.round(22 * this.levelScale)}px`,
      fontStyle: '700',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(5)

    pole.setDepth(4)
    banner.setDepth(4)
  }

  createPlayer() {
    this.player = new Player(
      this,
      this.startX,
      this.groundY - this.scaleLevelValue(96),
      this.runState.characterKey,
      this.levelScale,
    )
    this.physics.add.collider(this.player, this.platforms)
    this.player.setVelocity(0, 0)
    this.player.body.enable = false
  }

  createHazards() {
    this.hazards = this.physics.add.staticGroup();

    const levelScaleFactor = this.levelConfig.hazardScale ?? 1;
    this.levelConfig.hazards.forEach(([x, y]) => {
      const hazard = new Enemy(
        this,
        this.scaleLevelValue(x),
        this.scaleLevelValue(y),
        this.levelConfig.obstacleKey,
        this.levelScale * levelScaleFactor
      );
      this.hazards.add(hazard);
    });
  }

  createSceneEnemies() {
    this.sceneEnemies = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    })
    this.enemyProjectiles = this.physics.add.group({
      allowGravity: false,
    })

    const enemyConfigs = this.levelConfig.enemies ?? []

    enemyConfigs.forEach((config) => {
      const enemy = this.sceneEnemies.create(
        this.scaleLevelValue(config.x),
        this.scaleLevelValue(config.y),
        config.texture,
        config.frame,
      )

      enemy.enemyConfig = config
      if (config.frame !== undefined) {
        enemy.setFrame(config.frame)
      }
      enemy.startX = enemy.x
      enemy.direction = config.direction ?? -1
      enemy.nextAttackAt = 0
      enemy.setOrigin(0.5, 1)
      enemy.setScale(this.levelScale * (config.scale ?? 0.22))
      enemy.setDepth(9)
      enemy.setFlipX(enemy.direction < 0)
      enemy.patrolBounds = this.getEnemyPatrolBounds(config, enemy)
      if (config.animation && !enemy.anims.isPlaying) {
        enemy.play(config.animation, true)
      }
      enemy.body.setAllowGravity(false)
      enemy.body.setImmovable(true)
      enemy.body.setSize(enemy.width * 0.45, enemy.height * 0.75)
      enemy.body.setOffset(enemy.width * 0.28, enemy.height * 0.16)
    })

    this.physics.add.overlap(this.player, this.sceneEnemies, this.handleEnemyTouch, null, this)
    this.physics.add.overlap(this.player, this.enemyProjectiles, this.handleProjectileHit, null, this)
    this.physics.add.collider(this.enemyProjectiles, this.platforms, this.handleProjectilePlatformHit, null, this)
  }

  getEnemyPatrolBounds(config, enemy) {
    const fallbackDistance = config.patrolDistance ?? 180
    const fallbackLeft = config.x - fallbackDistance / 2
    const fallbackRight = config.x + fallbackDistance / 2
    const yTolerance = 4
    const platformScale = 0.2

    const rowSegments = this.levelConfig.platforms
      .filter(([, y]) => Math.abs(y - config.y) <= yTolerance)
      .map(([x, , assetKey]) => {
        const source = this.textures.get(assetKey).getSourceImage()
        return {
          left: x,
          right: x + source.width * platformScale,
        }
      })
      .sort((a, b) => a.left - b.left)

    const mergedSegments = []
    rowSegments.forEach((segment) => {
      const previous = mergedSegments[mergedSegments.length - 1]
      if (previous && segment.left <= previous.right + 4) {
        previous.right = Math.max(previous.right, segment.right)
      } else {
        mergedSegments.push({ ...segment })
      }
    })

    const platformSegment = mergedSegments.find((segment) => (
      config.x >= segment.left && config.x <= segment.right
    ))

    if (!platformSegment) {
      return {
        left: this.scaleLevelValue(fallbackLeft),
        right: this.scaleLevelValue(fallbackRight),
      }
    }

    const footMargin = Math.max(enemy.width * (config.platformMarginRatio ?? 0.18), 34)
    const left = Math.max(fallbackLeft, platformSegment.left + footMargin)
    const right = Math.min(fallbackRight, platformSegment.right - footMargin)

    if (left >= right) {
      const center = Phaser.Math.Clamp(config.x, platformSegment.left + footMargin, platformSegment.right - footMargin)
      return {
        left: this.scaleLevelValue(center),
        right: this.scaleLevelValue(center),
      }
    }

    return {
      left: this.scaleLevelValue(left),
      right: this.scaleLevelValue(right),
    }
  }

  registerEnemyAnimations() {
    const animations = [
      {
        key: 'enemy-clown-walk',
        frameKeys: ['enemy-clown-walk-1', 'enemy-clown-walk-2', 'enemy-clown-walk-3'],
        frameRate: 8,
      },
      {
        key: 'enemy-clown-throw',
        frameKeys: ['enemy-clown-throw-1', 'enemy-clown-throw-2'],
        frameRate: 8,
      },
      {
        key: 'enemy-phone-walk',
        frameKeys: ['enemy-phone-person', 'enemy-phone-person-2', 'enemy-phone-person-3'],
        frameRate: 9,
      },
      {
        key: 'enemy-phone-collide',
        frameKeys: ['enemy-phone-person-collide-1', 'enemy-phone-person-collide-2', 'enemy-phone-person-collide-3'],
        frameRate: 9,
      },
      {
        key: 'enemy-guard-walk',
        frameKeys: ['enemy-security-guard', 'enemy-security-guard-2', 'enemy-security-guard-3'],
        frameRate: 8,
      },
      {
        key: 'enemy-guard-collide',
        frameKeys: ['enemy-security-guard-collide-1', 'enemy-security-guard-collide-2'],
        frameRate: 8,
      },
    ]

    animations.forEach((animation) => {
      if (this.anims.exists(animation.key)) {
        return
      }

      this.anims.create({
        key: animation.key,
        frames: animation.frameKeys
          ? animation.frameKeys.map((key) => ({ key }))
          : animation.frames.map((frame) => ({
            key: animation.texture,
            frame,
          })),
        frameRate: animation.frameRate,
        repeat: -1,
      })
    })
  }

  updateSceneEnemies(time) {
    if (!this.sceneEnemies) {
      return
    }

    this.sceneEnemies.getChildren().forEach((enemy) => {
      if (!enemy?.active) {
        return
      }

      const config = enemy.enemyConfig
      const speed = this.scaleLevelValue(config.speed ?? 80)
      const leftX = enemy.patrolBounds?.left ?? enemy.startX - this.scaleLevelValue(config.patrolDistance ?? 180) / 2
      const rightX = enemy.patrolBounds?.right ?? enemy.startX + this.scaleLevelValue(config.patrolDistance ?? 180) / 2

      if (enemy.pauseUntil > time) {
        enemy.setVelocityX(0)
        return
      }

      enemy.setVelocityX(speed * enemy.direction)
      enemy.setFlipX(enemy.direction < 0)

      if (enemy.x <= leftX) {
        enemy.x = leftX
        enemy.direction = 1
      } else if (enemy.x >= rightX) {
        enemy.x = rightX
        enemy.direction = -1
      }

      const distanceToPlayer = Math.abs(this.player.x - enemy.x)
      const attackRange = this.scaleLevelValue(config.attackRange ?? 520)
      const isFacingPlayer = enemy.direction < 0
        ? this.player.x < enemy.x
        : this.player.x > enemy.x

      if (
        config.attack === 'projectile'
        && time >= enemy.nextAttackAt
        && distanceToPlayer <= attackRange
        && isFacingPlayer
      ) {
        this.throwEnemyProjectile(enemy)
        enemy.nextAttackAt = time + (config.attackInterval ?? 2200)
      }

      if (
        config.approachTrigger
        && !this.player.stunned
        && this.player.x <= enemy.x
        && distanceToPlayer <= this.scaleLevelValue(config.approachRange ?? 90)
        && Math.abs(this.player.y - enemy.y) <= this.scaleLevelValue(config.approachYTolerance ?? 80)
      ) {
        this.handleEnemyTouch(this.player, enemy)
      }
    })

    this.enemyProjectiles.getChildren().forEach((projectile) => {
      const leftLimit = this.cameras.main.scrollX - this.scaleLevelValue(160)
      const rightLimit = this.cameras.main.scrollX + this.scale.width + this.scaleLevelValue(160)
      if (projectile?.active && (projectile.x < leftLimit || projectile.x > rightLimit)) {
        projectile.destroy()
      }
    })
  }

  throwEnemyProjectile(enemy) {
    const config = enemy.enemyConfig
    const projectileDirection = enemy.direction < 0 ? -1 : 1
    if (config.throwAnimation) {
      enemy.play(config.throwAnimation, true)
      this.time.delayedCall(config.throwDuration ?? 320, () => {
        if (enemy.active && config.animation) {
          enemy.play(config.animation, true)
        }
      })
    }

    const projectileOffsetX = Math.abs(config.projectileOffsetX ?? 34) * projectileDirection
    const projectile = this.enemyProjectiles.create(
      enemy.x + this.scaleLevelValue(projectileOffsetX),
      enemy.y - enemy.displayHeight * (config.projectileOffsetYRatio ?? 0.58),
      config.projectileTexture ?? 'enemy-icecream',
      config.projectileFrame,
    )

    projectile.effect = config.projectileEffect ?? {
      type: 'slow',
      multiplier: 0.5,
      duration: 2600,
    }

    if (config.projectileFrame !== undefined) {
      projectile.setFrame(config.projectileFrame)
    }
    projectile.setOrigin(0.5)
    projectile.setScale(this.levelScale * (config.projectileScale ?? 0.08))
    projectile.setDepth(11)
    projectile.body.setAllowGravity(false)
    projectile.body.setSize(projectile.width * 0.5, projectile.height * 0.45)
    projectile.setVelocityX(this.scaleLevelValue(config.projectileSpeed ?? 360) * projectileDirection)
    projectile.setAngularVelocity(360 * projectileDirection)
  }

  handleEnemyTouch(player, enemy) {
    if (!enemy.active || enemy.lastTouchAt > this.time.now - 2600) {
      return
    }

    enemy.lastTouchAt = this.time.now
    const effect = enemy.enemyConfig.touchEffect
    const effectDuration = effect?.duration ?? 1600
    const collideAnimation = enemy.enemyConfig.collideAnimation
    const collideDuration = enemy.enemyConfig.collideDuration ?? 300

    if (effect?.type !== 'slow') {
      this.separatePlayerFromEnemy(player, enemy)
    }
    enemy.setFlipX(enemy.enemyConfig.blockFromLeft ? true : player.x < enemy.x)

    if (effect) {
      this.sound.play(effect.soundKey ?? 'hit-sound', {
        volume: effect.soundVolume ?? 0.65,
      })
    }

    if (collideAnimation) {
      enemy.pauseUntil = this.time.now + effectDuration
      enemy.setVelocityX(0)
      enemy.play(collideAnimation, true)
      if (!enemy.enemyConfig.holdCollideAnimation) {
        this.time.delayedCall(collideDuration, () => {
          if (enemy.active) {
            enemy.anims.stop()
            enemy.setTexture(enemy.enemyConfig.texture)
          }
        })
      }
      this.time.delayedCall(effectDuration, () => {
        if (enemy.active && enemy.enemyConfig.animation) {
          enemy.play(enemy.enemyConfig.animation, true)
        }
      })
    }

    if (effect?.type === 'stun') {
      player.stun(effectDuration)
    } else if (effect?.type === 'slow') {
      player.applySpeedMultiplier(effect.multiplier ?? 0.5, effectDuration)
    }
  }

  separatePlayerFromEnemy(player, enemy) {
    const gap = this.scaleLevelValue(enemy.enemyConfig.collisionGap ?? 70)

    if (enemy.enemyConfig.blockFromLeft) {
      const targetRight = enemy.body.left - gap
      player.x += targetRight - player.body.right
      player.setVelocityX(0)
      player.body.updateFromGameObject()
      return
    }

    if (player.x <= enemy.x) {
      const overlap = player.body.right - enemy.body.left
      if (overlap > -gap) {
        player.x -= overlap + gap
      }
    } else {
      const overlap = enemy.body.right - player.body.left
      if (overlap > -gap) {
        player.x += overlap + gap
      }
    }

    player.setVelocityX(0)
    player.body.updateFromGameObject()
  }

  handleProjectileHit(player, projectile) {
    const effect = projectile.effect
    this.sound.play('hit-sound', { volume: 0.65 })

    if (effect?.type === 'slow') {
      player.applySpeedMultiplier(effect.multiplier ?? 0.5, effect.duration ?? 2600)
    }

    projectile.destroy()
  }

  handleProjectilePlatformHit(projectile) {
    projectile.destroy()
  }

  createHud() {
    this.add.rectangle(838, 48, 220, 68, 0x101622, 0.72)
      .setScrollFactor(0)
      .setDepth(19)

    this.clockText = this.add.text(838, 48, '7:00 AM', {
      fontFamily: 'Courier New',
      fontSize: '36px',
      fontStyle: '700',
      color: '#ffcc48',
      stroke: '#101622',
      strokeThickness: 6,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20)

    this.updateHud()
  }

  createControls() {
    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.canUseControls()) {
        this.tryPlayerJump()
      }
    })

    this.input.on('pointerdown', () => {
      if (this.canUseControls()) {
        this.tryPlayerJump()
      }
    })
  }

  tryPlayerJump() {
    if (this.player.jump()) {
      this.sound.play('jump', { volume: 0.75 })
    }
  }

  canUseControls() {
    return this.controlsEnabled && !this.gameOver && !this.finished
  }

  startLevelCountdown() {
    const countdownItems = ['3', '2', '1', 'GO!']
    let countdownIndex = 0

    const shade = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      0x050913,
      0.42,
    ).setScrollFactor(0).setDepth(29)

    const countdownText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      countdownItems[countdownIndex],
      {
        fontFamily: 'Arial',
        fontSize: '112px',
        fontStyle: '900',
        color: '#ffcc48',
        stroke: '#101622',
        strokeThickness: 10,
      },
    ).setOrigin(0.5).setScrollFactor(0).setDepth(30)

    const showCountdownItem = (label) => {
      countdownText.setText(label)
      countdownText.setScale(0.7)
      countdownText.setAlpha(1)

      this.tweens.killTweensOf(countdownText)
      this.tweens.add({
        targets: countdownText,
        scale: 1.12,
        alpha: 0.9,
        duration: 520,
        ease: 'Back.Out',
      })
    }

    const beginLevel = () => {
      shade.destroy()
      countdownText.destroy()
      this.levelStarted = true
      this.controlsEnabled = true
      this.player.body.enable = true
      this.player.start()
      this.player.update()
    }

    showCountdownItem(countdownItems[countdownIndex])

    this.time.addEvent({
      delay: 800,
      repeat: countdownItems.length - 2,
      callback: () => {
        countdownIndex += 1
        showCountdownItem(countdownItems[countdownIndex])

        if (countdownIndex === countdownItems.length - 1) {
          this.time.delayedCall(520, beginLevel)
        }
      },
    })
  }

  configureCamera() {
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight)
    this.cameras.main.startFollow(
      this.player,
      true,
      0.12,
      0.12,
      this.scaleLevelValue(-260),
      this.scaleLevelValue(170),
    )
    this.cameras.main.setZoom(1)
  }

  configureLevelMetrics() {
    const source = this.textures.get(this.levelConfig.backgroundKey).getSourceImage()
    const displayHeight = this.scale.height

    this.levelScale = displayHeight / source.height
    this.levelWidth = source.width * this.levelScale
    this.levelHeight = displayHeight
    this.groundY = this.scaleLevelValue(this.levelConfig.groundY ?? 900)
    this.startX = this.scaleLevelValue(this.levelConfig.startX ?? 110)
    this.finishX = this.scaleLevelValue(this.levelConfig.finishX ?? source.width - 270)
  }

  scaleLevelValue(value) {
    return value * this.levelScale
  }

  createGeneratedHazardTextures() {
    if (this.textures.exists('cone') && this.textures.exists('barrier')) {
      return
    }

    const graphics = this.make.graphics({ x: 0, y: 0, add: false })

    graphics.fillStyle(0xffc629, 1)
    graphics.fillTriangle(32, 0, 2, 60, 62, 60)
    graphics.fillStyle(0x111827, 1)
    graphics.fillTriangle(32, 16, 15, 52, 49, 52)
    graphics.generateTexture('cone', 64, 64)
    graphics.clear()

    graphics.fillStyle(0x263047, 1)
    graphics.fillRoundedRect(4, 10, 56, 78, 8)
    graphics.lineStyle(5, 0xffcc48, 1)
    graphics.strokeRoundedRect(4, 10, 56, 78, 8)
    graphics.fillStyle(0xff5d5d, 1)
    graphics.fillRect(12, 38, 40, 10)
    graphics.fillStyle(0xffffff, 1)
    graphics.fillRect(12, 58, 40, 8)
    graphics.generateTexture('barrier', 64, 96)
    graphics.destroy()
  }

  updateHud() {
    this.clockText.setText(`${formatRaceClock(this.runState.elapsedMs)} AM`)
  }

  completeLevel() {
    if (this.finished) {
      return
    }

    this.finished = true
    this.player.setVelocityX(0)
    this.player.play(`${this.runState.characterKey}-run`, true)

    const elapsedThisLevel = this.runState.elapsedMs - this.levelStartElapsed
    const timeBonus = Math.max(0, Math.round((GAME_DURATION_MS - this.runState.elapsedMs) / 1000))
    const speedBonus = Math.max(0, Math.round(70 - elapsedThisLevel / 1000))
    const levelScore = 500 + timeBonus + speedBonus * 5
    this.runState.score += levelScore

    this.cameras.main.fadeOut(500, 12, 18, 30)
    this.time.delayedCall(550, () => {
      if (this.levelConfig.number >= 3) {
        this.endRun(true, 'Reached the university')
        return
      }

      this.scene.start('LevelSummaryScene', {
        ...this.runState,
        completedLevel: this.levelConfig.number,
        levelScore,
      })
    })
  }

  restartLevelAfterFall() {
    if (this.gameOver || this.finished) {
      return
    }

    this.gameOver = true
    this.controlsEnabled = false
    this.player.setVelocity(0, 0)
    this.player.showFallPose()

    this.cameras.main.fadeOut(350, 12, 18, 30)
    this.time.delayedCall(380, () => {
      this.scene.restart({
        ...this.runState,
        score: this.levelStartScore,
        totalCoins: this.levelStartTotalCoins,
      })
    })
  }

  endRun(won, reason) {
    this.finished = true
    this.scene.start('ResultScene', {
      ...this.runState,
      won,
      reason,
    })
  }

  createCoinHUD() {
    const x = 14, y = 14, bgW = 122, bgH = 42

    this.add.rectangle(x, y, bgW, bgH, 0x101622, 0.82)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(24)

    this.add.text(x + 10, y + bgH / 2, '💰', { fontSize: '22px' })
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(25)

    this.coinCountText = this.add.text(x + 46, y + bgH / 2, '0', {
      fontFamily: 'Courier New',
      fontSize: '26px',
      fontStyle: '700',
      color: '#ffcc48',
      stroke: '#101622',
      strokeThickness: 5,
    }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(25)
  }

  createCoins() {
    const coinKey = `coin_${this.levelConfig.number}`
    const coinSize = this.scaleLevelValue(42)

    this.levelConfig.coins.forEach(([x, y]) => {
      const coin = this.coins.create(
        this.scaleLevelValue(x),
        this.scaleLevelValue(y),
        coinKey
      )
      coin.body.setAllowGravity(false)
      coin.setDisplaySize(coinSize, coinSize)
      coin.setDepth(6)
    })

    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this)
  }

  createPowerItems() {
    const items = [
      ...(this.levelConfig.powerUps ?? []),
      ...(this.levelConfig.powerDowns ?? []),
    ]

    if (items.length === 0) {
      return
    }

    const itemSize = this.scaleLevelValue(48)
    items.forEach((item) => {
      const textureKey = item.type === 'powerup'
        ? `powerup-${item.texture}`
        : `powerdown-${item.texture}`

      const powerItem = this.powerItems.create(
        this.scaleLevelValue(item.x),
        this.scaleLevelValue(item.y),
        textureKey,
      )

      powerItem.body.setAllowGravity(false)
      powerItem.setDisplaySize(itemSize, itemSize)
      powerItem.setDepth(6)
      powerItem.itemConfig = item
    })

    this.physics.add.overlap(this.player, this.powerItems, this.collectPowerItem, null, this)
  }

  collectPowerItem(player, powerItem) {
    const config = powerItem.itemConfig
    powerItem.destroy()

    if (config?.type === 'powerup') {
      this.showPlayerPowerupEffect(config.effect?.duration ?? 3000)
      player.applySpeedMultiplier(config.effect?.multiplier ?? 1.3, config.effect?.duration ?? 3000, 0xfff7a8)
    } else if (config?.type === 'powerdown') {
      this.showPlayerPowerdownEffect(config.effect?.duration ?? 2500)
      player.applySpeedMultiplier(config.effect?.multiplier ?? 0.5, config.effect?.duration ?? 2500, 0x7fb8ff)
    } else if (config?.effect) {
      if (config.effect.type === 'speed') {
        player.applySpeedMultiplier(config.effect.multiplier ?? 1.3, config.effect.duration ?? 3000)
      } else if (config.effect.type === 'slow') {
        player.applySpeedMultiplier(config.effect.multiplier ?? 0.5, config.effect.duration ?? 2500)
      } else if (config.effect.type === 'stun') {
        player.stun(config.effect.duration ?? 2000)
      }
    }

    if (config?.type === 'powerup') {
      this.sound.play('powerup', { volume: 0.7 })
    } else if (config?.type === 'powerdown') {
      this.sound.play('powerdown', { volume: 0.7 })
    } else {
      this.sound.play('collectible', { volume: 0.5 })
    }
  }

  showPlayerPowerupEffect(durationMs) {
    this.clearPlayerPowerEffect()

    const radius = this.scaleLevelValue(80)

    // Outer golden glow
    const outerGlow = this.add.circle(
      0,
      0,
      radius,
      0xffd54f,
      0.22
    )
      .setBlendMode(Phaser.BlendModes.ADD)

    // Middle glow
    const midGlow = this.add.circle(
      0,
      0,
      this.scaleLevelValue(58),
      0xffeb99,
      0.3
    )
      .setBlendMode(Phaser.BlendModes.ADD)

    // Bright center glow
    const coreGlow = this.add.circle(
      0,
      0,
      this.scaleLevelValue(28),
      0xffffff,
      0.45
    )
      .setBlendMode(Phaser.BlendModes.ADD)

    // Floating sparkle particles
    const spark1 = this.add.circle(
      -18,
      -20,
      this.scaleLevelValue(6),
      0xffffff,
      0.95
    )

    const spark2 = this.add.circle(
      20,
      -28,
      this.scaleLevelValue(5),
      0xfff3b0,
      0.9
    )

    const spark3 = this.add.circle(
      24,
      8,
      this.scaleLevelValue(4),
      0xffd54f,
      0.85
    )

    this.powerEffect = this.add.container(
      this.player.x,
      this.player.y,
      [outerGlow, midGlow, coreGlow, spark1, spark2, spark3]
    ).setDepth(8)

    // Pulsing glow animation
    this.powerEffectTween = this.tweens.add({
      targets: [outerGlow, midGlow, coreGlow],
      scaleX: 1.18,
      scaleY: 1.18,
      alpha: 0.75,
      duration: 450,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // Floating spark animation
    this.tweens.add({
      targets: [spark1, spark2, spark3],
      y: '-=8',
      alpha: 0.4,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    this.time.delayedCall(durationMs, () => this.clearPlayerPowerEffect())
  }

  // showPlayerPowerdownEffect(durationMs) {
  //   this.clearPlayerPowerEffect()

  //   const glow = this.add.circle(0, 0, this.scaleLevelValue(64), 0x6ea8ff, 0.18)
  //     .setBlendMode(Phaser.BlendModes.ADD)
  //   const bubble1 = this.add.circle(-10, -24, this.scaleLevelValue(8), 0xffffff, 0.85)
  //   const bubble2 = this.add.circle(12, -34, this.scaleLevelValue(6), 0xa4c9ff, 0.75)
  //   const bubble3 = this.add.circle(20, -16, this.scaleLevelValue(5), 0xc8dcff, 0.6)

  //   this.powerEffect = this.add.container(this.player.x, this.player.y, [glow, bubble1, bubble2, bubble3]).setDepth(8)
  //   this.powerEffectTween = this.tweens.add({
  //     targets: this.powerEffect,
  //     y: '-=10',
  //     duration: 900,
  //     yoyo: true,
  //     repeat: -1,
  //     ease: 'Sine.easeInOut',
  //   })

  //   this.time.delayedCall(durationMs, () => this.clearPlayerPowerEffect())
  // }

  showPlayerPowerdownEffect(durationMs) {
    this.clearPlayerPowerEffect()

    // Soft blue sleepy aura
    const outerGlow = this.add.circle(
      0,
      0,
      this.scaleLevelValue(72),
      0x6ea8ff,
      0.16
    )
      .setBlendMode(Phaser.BlendModes.ADD)

    // Inner mist glow
    const innerGlow = this.add.circle(
      0,
      0,
      this.scaleLevelValue(46),
      0xb7d7ff,
      0.22
    )
      .setBlendMode(Phaser.BlendModes.ADD)

    // Sleepy floating bubbles
    const bubble1 = this.add.circle(
      -14,
      -26,
      this.scaleLevelValue(8),
      0xffffff,
      0.75
    )

    const bubble2 = this.add.circle(
      14,
      -36,
      this.scaleLevelValue(6),
      0xa4c9ff,
      0.7
    )

    const bubble3 = this.add.circle(
      24,
      -18,
      this.scaleLevelValue(5),
      0xcfe4ff,
      0.6
    )

    // Small sleepy "Z" particles
    const z1 = this.add.text(
      -10,
      -48,
      'z',
      {
        fontSize: `${this.scaleLevelValue(16)}px`,
        fill: '#d6e8ff',
        fontStyle: 'italic',
      }
    ).setAlpha(0.7)

    const z2 = this.add.text(
      8,
      -62,
      'Z',
      {
        fontSize: `${this.scaleLevelValue(20)}px`,
        fill: '#ffffff',
        fontStyle: 'italic',
      }
    ).setAlpha(0.55)

    this.powerEffect = this.add.container(
      this.player.x,
      this.player.y,
      [outerGlow, innerGlow, bubble1, bubble2, bubble3, z1, z2]
    ).setDepth(8)

    // Slow floating sleepy motion
    this.powerEffectTween = this.tweens.add({
      targets: this.powerEffect,
      y: '-=12',
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // Gentle glow pulse
    this.tweens.add({
      targets: [outerGlow, innerGlow],
      scale: 1.08,
      alpha: 0.3,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // Floating Z animation
    this.tweens.add({
      targets: [z1, z2],
      y: '-=12',
      alpha: 0.2,
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    this.time.delayedCall(durationMs, () => this.clearPlayerPowerEffect())
  }

  clearPlayerPowerEffect() {
    if (this.powerEffectTween) {
      this.powerEffectTween.stop()
      this.powerEffectTween = null
    }
    if (this.powerEffect) {
      this.powerEffect.destroy()
      this.powerEffect = null
    }
  }

  collectCoin(player, coin) {
    coin.destroy()
    this.coinCount++
    this.runState.totalCoins++
    this.sound.play('collectible', { volume: 0.5 })
    this.coinCountText.setText(this.coinCount.toString())
    this.tweens.killTweensOf(this.coinCountText)
    this.tweens.add({
      targets: this.coinCountText,
      scaleX: 1.6,
      scaleY: 1.6,
      duration: 80,
      yoyo: true,
      ease: 'Power2',
    })
  }
}
