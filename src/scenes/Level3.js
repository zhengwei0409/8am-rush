import BaseLevel from './BaseLevel.js'

const backgroundUrl = new URL('../assets/scene/Level-3/Level-3.png', import.meta.url).href
const obstacleUrl = new URL('../assets/obstacles/obstacle_3.png', import.meta.url).href;

export default class Level3 extends BaseLevel {
  constructor() {
    super('Level3', {
      number: 3,
      name: 'University Gate',
      backgroundKey: 'level-3-bg',
      backgroundUrl,
      obstacleKey: 'obstacle_3',
      obstacleUrl,
      accent: 0x72e0a2,
      hazardScale: 0.65,
      platforms: [
        // Ground floor
        [20, 930, 'platform_3.1'],
        [220, 930, 'platform_3.1'],
        [420, 930, 'platform_3.1'],
        [620, 930, 'platform_3.1'],
        [1080, 930, 'platform_3.1'],
        [1280, 930, 'platform_3.1'],
        [1480, 930, 'platform_3.1'],
        [2730, 930, 'platform_3.1'],
        [2930, 930, 'platform_3.1'],
        [2870, 850, 'platform_3.2'],
        [3370, 930, 'platform_3.1'],
        [3820, 930, 'platform_3.1'],
        [4020, 930, 'platform_3.1'],
        [4860, 930, 'platform_3.1'],
        [5060, 930, 'platform_3.1'],
        [5260, 930, 'platform_3.1'],
        [5460, 930, 'platform_3.1'],
        [5660, 930, 'platform_3.1'],

        // 1st floor
        [280, 780, 'platform_3.1'],
        [920, 780, 'platform_3.1'],
        [1350, 780, 'platform_3.1'],
        [1710, 780, 'platform_3.1'],
        [1910, 780, 'platform_3.1'],
        [2110, 780, 'platform_3.1'],
        [2310, 780, 'platform_3.1'],
        [2260, 700, 'platform_3.2'],
        [2510, 780, 'platform_3.1'],
        [3150, 780, 'platform_3.1'],
        [3600, 780, 'platform_3.1'],
        [4240, 780, 'platform_3.1'],
        [4440, 780, 'platform_3.1'],
        [4640, 780, 'platform_3.1'],

        // 2nd floor
        [480, 630, 'platform_3.1'],
        [680, 630, 'platform_3.1'],
        [670, 550, 'platform_3.2'],
        [1120, 630, 'platform_3.1'],
        [1570, 630, 'platform_3.1'],
        [1770, 630, 'platform_3.1'],
        [1790, 550, 'platform_3.2'],
        [2730, 630, 'platform_3.1'],
        [2930, 630, 'platform_3.1'],
        [3370, 630, 'platform_3.1'],
        [3820, 630, 'platform_3.1'],
        [4020, 630, 'platform_3.1'],
        [4220, 630, 'platform_3.1'],
        [4000, 550, 'platform_3.2'],
        [4280, 550, 'platform_3.2'],
      ],
      hazards: [
        [2920, 630],
        [5140, 930],
        [5400, 930],
      ],
      enemies: [
        {
          type: 'security-guard',
          texture: 'enemy-security-guard',
          frame: 0,
          animation: 'enemy-guard-walk',
          collideAnimation: 'enemy-guard-collide',
          holdCollideAnimation: true,
          approachTrigger: true,
          blockFromLeft: true,
          approachRange: 110,
          collisionGap: 95,
          x: 1750,
          y: 780,
          scale: 0.36,
          speed: 68,
          patrolDistance: 240,
          touchEffect: {
            type: 'stun',
            duration: 1900,
          },
        },
        {
          type: 'security-guard',
          texture: 'enemy-security-guard',
          frame: 0,
          animation: 'enemy-guard-walk',
          collideAnimation: 'enemy-guard-collide',
          holdCollideAnimation: true,
          approachTrigger: true,
          blockFromLeft: true,
          approachRange: 110,
          collisionGap: 95,
          x: 4050,
          y: 930,
          scale: 0.38,
          speed: 76,
          patrolDistance: 260,
          touchEffect: {
            type: 'stun',
            duration: 1800,
          },
        },
      ],
      powerUps: [
        {
          type: 'powerup',
          texture: 'exampaper',
          x: 505,
          y: 852,
          effect: {
            type: 'speed',
            multiplier: 1.3,
            duration: 3200,
          },
        },
        {
          type: 'powerup',
          texture: 'exampaper',
          x: 2267,
          y: 577,
          effect: {
            type: 'speed',
            multiplier: 1.3,
            duration: 3200,
          },
        },
      ],
      powerDowns: [
        {
          type: 'powerdown',
          texture: 'sleep',
          x: 3510,
          y: 852,
          effect: {
            type: 'slow',
            multiplier: 0.5,
            duration: 2600,
          },
        },
      ],
      // coinY = platformY - assetHalfHeight(23) - floatAbove(55)
      coins: [
        // Ground floor
        [50,852],[250,852],[305,852],[360,852],[450,852],[560,852],[650,852],[705,852],[760,852],
        [1310,852],[1365,852],[1420,852],[1510,852],[1565,852],[1620,852],
        [2760,852],[2815,852],[2960,852],[3070,852],
        [3400,852],
        [3850,852],[3905,852],[4105,852],[4160,852],
        [4890,852],[4945,852],[5090,852],[5200,852],[5290,852],[5490,852],[5545,852],[5600,852],[5690,852],[5745,852],[5800,852],
        // 1st floor
        [310,702],[365,702],[420,702],
        [950,702],[1005,702],[1060,702],
        [1380,702],[1435,702],[1490,702],
        [1740,702],[1795,702],[1850,702],[1940,702],[1995,702],[2050,702],[2140,702],[2195,702],[2235,702],[2540,702],[2595,702],[2650,702],[2705,702],
        [3180,702],[3235,702],[3290,702],
        [3630,702],[3685,702],[3740,702],
        [4270,702],[4325,702],[4380,702],[4470,702],[4525,702],[4580,702],[4670,702],[4725,702],[4780,702],
        // 2nd floor
        [510,552],[565,552],[620,552],[765,552],[820,552],
        [1150,552],[1205,552],[1260,552],
        [1600,552],[1655,552],[1710,552],[1870,552],[1910,552],
        [2760,552],[2815,552],[2870,552],[2960,552],[3015,552],[3070,552],
        [3400,552],[3455,552],[3510,552],
        [3850,552],[3905,552],[3960,552],[4105,552],[4160,552],
        // Above standing blocks
        [677,427],[710,427],[1797,427],[1830,427],[4007,427],[4040,427],[4287,427],[4320,427],
        [2300,577],
        [2877,727],[2910,727],
      ],
    })
  }
}
