import BaseLevel from './BaseLevel.js'

const backgroundUrl = new URL('../assets/scene/Level-1/Level-1.png', import.meta.url).href

export default class Level1 extends BaseLevel {
  constructor() {
    super('Level1', {
      number: 1,
      name: 'Dorm Walkway',
      backgroundKey: 'level-1-bg',
      backgroundUrl,
      accent: 0xffcc48,
      platforms: [
        [0, 930, 700, 52],
        [830, 900, 590, 48],
        [1540, 875, 520, 46],
        [2190, 910, 560, 48],
        [2880, 880, 480, 46],
        [3500, 905, 620, 48],
        [4260, 880, 520, 46],
        [4920, 910, 928, 48],
      ],
      hazards: [
        [585, 878, 'cone'],
        [1260, 848, 'barrier'],
        [1885, 822, 'cone'],
        [2560, 858, 'barrier'],
        [3200, 828, 'cone'],
        [3860, 852, 'barrier'],
        [4590, 828, 'cone'],
        [5320, 858, 'barrier'],
      ],
    })
  }
}
