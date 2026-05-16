import BaseLevel from './BaseLevel.js'

const backgroundUrl = new URL('../assets/scene/Level-2/Level-2.png', import.meta.url).href
const obstacleUrl = new URL('../assets/obstacles/obstacle_2.png', import.meta.url).href;

export default class Level2 extends BaseLevel {
  constructor() {
    super('Level2', {
      number: 2,
      name: 'MRT Station',
      backgroundKey: 'level-2-bg',
      backgroundUrl,
      obstacleKey: 'obstacle_2',
      obstacleUrl,
      hazardScale: 0.25,
      accent: 0xffcc48,
      platforms: [
        // Ground floor
        [20, 930, 'platform_2.1'],
        [245, 930, 'platform_2.1'],
        [470, 930, 'platform_2.1'],
        [695, 930, 'platform_2.1'],
        [920, 930, 'platform_2.1'],
        [1820, 930, 'platform_2.1'],
        [2045, 930, 'platform_2.1'],
        [2270, 930, 'platform_2.1'],
        [2495, 900, 'platform_2.3'],
        [3225, 930, 'platform_2.1'],
        [3450, 900, 'platform_2.3'],
        [3650, 930, 'platform_2.1'],
        [3875, 930, 'platform_2.1'],
        [4100, 930, 'platform_2.1'],
        [4500, 930, 'platform_2.1'],
        [4725, 930, 'platform_2.1'],
        [4950, 930, 'platform_2.1'],
        [5210, 930, 'platform_2.1'],
        [5435, 930, 'platform_2.1'],
        [5300, 840, 'platform_2.2'],

        // 1st floor
        [230, 780, 'platform_2.1'],
        [680, 780, 'platform_2.1'],
        [1145, 780, 'platform_2.1'],
        [1370, 780, 'platform_2.1'],
        [1595, 780, 'platform_2.1'],
        [2050, 780, 'platform_2.1'],
        [2550, 780, 'platform_2.1'],
        [2775, 780, 'platform_2.1'],
        [3000, 780, 'platform_2.1'],
        [3825, 780, 'platform_2.1'],
        [4275, 780, 'platform_2.1'],
        [4800, 780, 'platform_2.1'],

        // 2nd floor
        [455, 630, 'platform_2.1'],
        [550, 540, 'platform_2.2'],
        [905, 630, 'platform_2.1'],
        [1130, 630, 'platform_2.1'],
        [1355, 630, 'platform_2.1'],
        [1050, 540, 'platform_2.2'],
        [1350, 540, 'platform_2.2'],
        [2275, 630, 'platform_2.1'],
        [2750, 630, 'platform_2.1'],
        [3150, 630, 'platform_2.1'],
        [3375, 630, 'platform_2.1'],
        [3600, 630, 'platform_2.1'],
        [3250, 540, 'platform_2.2'],
        [4050, 630, 'platform_2.1'],
        [4150, 540, 'platform_2.2'],

      ],
      hazards: [
        [3650, 630],
        [4950, 780],
      ],
      enemies: [
        {
          type: 'phone-person',
          texture: 'enemy-phone-person',
          frame: 0,
          animation: 'enemy-phone-walk',
          collideAnimation: 'enemy-phone-collide',
          blockFromLeft: true,
          x: 1880,
          y: 930,
          scale: 0.42,
          speed: 80,
          patrolDistance: 260,
          collisionGap: 95,
          touchEffect: {
            type: 'stun',
            duration: 1800,
          },
        },
        {
          type: 'phone-person',
          texture: 'enemy-phone-person',
          frame: 0,
          animation: 'enemy-phone-walk',
          collideAnimation: 'enemy-phone-collide',
          blockFromLeft: true,
          x: 4300,
          y: 780,
          scale: 0.4,
          speed: 72,
          patrolDistance: 220,
          collisionGap: 95,
          touchEffect: {
            type: 'stun',
            duration: 1800,
          },
        },
      ],
      // coinY = platformY - assetHalfHeight(23) - floatAbove(55)
      coins: [
        // Ground floor
        [50,852],[105,852],[500,852],[610,852],[950,852],[1005,852],[1060,852],
        [1850,852],[1905,852],[1960,852],[2355,852],[2410,852],
        [3255,852],[3310,852],[3365,852],
        [3680,852],[4130,852],[4185,852],[4240,852],
        [4585,852],[4980,852],[5035,852],[5090,852],
        [5240,852],[5275,852],[5520,852],[5575,852],
        // 1st floor
        [260,702],[315,702],[370,702],
        [710,702],[765,702],[820,702],[875,702],
        [1175,702],[1230,702],[1285,702],[1400,702],[1455,702],[1510,702],[1625,702],[1680,702],[1735,702],
        [2080,702],[2135,702],[2190,702],
        [2580,702],[2635,702],[2690,702],[2805,702],[2860,702],[2915,702],[2970,702],
        [3030,702],[3085,702],[3140,702],
        [3855,702],[3910,702],[3965,702],
        [4305,702],[4360,702],[4415,702],
        [4830,702],[4885,702],[4940,702],
        // 2nd floor
        [485,552],[525,552],
        [935,552],[990,552],[1025,552],[1160,552],[1215,552],[1270,552],[1440,552],[1495,552],
        [2305,552],[2360,552],[2415,552],
        [2780,552],[2835,552],[2890,552],
        [3180,552],[3225,552],[3405,552],[3460,552],[3515,552],[3630,552],[3685,552],[3740,552],
        [4080,552],[4125,552],
        // Above standing blocks
        [557,417],[590,417],[1057,417],[1090,417],[1357,417],[1390,417],
        [3257,417],[3290,417],[4157,417],[4190,417],
        [5307,717],[5340,717],
      ],
    })
  }
}
