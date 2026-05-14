import BaseLevel from './BaseLevel.js'

const backgroundUrl = new URL('../assets/scene/Level-1/Level-1.png', import.meta.url).href
const obstacleUrl = new URL('../assets/obstacles/obstacle_1.png', import.meta.url).href;

export default class Level1 extends BaseLevel {
  constructor() {
    super('Level1', {
      number: 1,
      name: 'Dorm Walkway',
      backgroundKey: 'level-1-bg',
      backgroundUrl,
      obstacleKey: 'obstacle_1',
      obstacleUrl,
      hazardScale: 0.8,
      accent: 0xffcc48,
      platforms: [
        // Ground floor
        [0, 930, 'platform_1.1'],
        [255, 930, 'platform_1.1'],
        [650, 910, 'platform_1.3'],
        [800, 930, 'platform_1.1'],
        [1025, 930, 'platform_1.1'],
        [1550, 930, 'platform_1.1'],
        [1775, 930, 'platform_1.1'],
        [2000, 930, 'platform_1.1'],
        [1800, 840, 'platform_1.2'],
        [3050, 910, 'platform_1.3'],
        [3145, 930, 'platform_1.1'],
        [3830, 930, 'platform_1.1'],
        [4325, 930, 'platform_1.1'],
        [4550, 930, 'platform_1.1'],
        [5000, 930, 'platform_1.1'],
        [5225, 930, 'platform_1.1'],
        [5450, 930, 'platform_1.1'],
        [5400, 840, 'platform_1.2'],

        // 1st floor
        [320, 780, 'platform_1.1'],
        [1250, 780, 'platform_1.1'],
        [2100, 780, 'platform_1.1'],
        [2500, 780, 'platform_1.1'],
        [2725, 780, 'platform_1.1'],
        [3400, 780, 'platform_1.1'],
        [3575, 780, 'platform_1.1'],
        [4100, 780, 'platform_1.1'],
        [4775, 780, 'platform_1.1'],

        // 2nd floor
        [520, 630, 'platform_1.1'],
        [775, 630, 'platform_1.1'],
        [1000, 630, 'platform_1.1'],
        [720, 540, 'platform_1.2'],
        [1050, 540, 'platform_1.2'],
        [1500, 630, 'platform_1.1'],
        [2300, 630, 'platform_1.1'],
        [2900, 630, 'platform_1.1'],
        [3000, 540, 'platform_1.2'],
        [4325, 630, 'platform_1.1'],
        [4550, 630, 'platform_1.1'],
        [4500, 540, 'platform_1.2'],
      ],
      hazards: [
        [330, 930],
        [950, 930],
        [3650, 780],
        [4775, 930],
      ],
    })
  }
}
