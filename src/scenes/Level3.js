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
    })
  }
}
