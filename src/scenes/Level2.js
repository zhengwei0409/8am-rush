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
    })
  }
}
