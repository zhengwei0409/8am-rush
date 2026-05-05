import BaseLevel from './BaseLevel.js'

const backgroundUrl = new URL('../assets/scene/Level-2/Level-2.png', import.meta.url).href

export default class Level2 extends BaseLevel {
  constructor() {
    super('Level2', {
      number: 2,
      name: 'MRT Station',
      backgroundKey: 'level-2-bg',
      backgroundUrl,
      accent: 0xffcc48,
      platforms: [
        [0, 930, 620, 52],
        [760, 900, 560, 48],
        [1440, 865, 430, 46],
        [2020, 910, 520, 48],
        [2690, 875, 390, 46],
        [3230, 900, 540, 48],
        [3930, 860, 440, 46],
        [4510, 905, 520, 48],
        [5200, 875, 648, 46],
      ],
      hazards: [
        [520, 878, 'cone'],
        [1160, 848, 'barrier'],
        [1725, 812, 'cone'],
        [2280, 858, 'barrier'],
        [2920, 822, 'cone'],
        [3560, 848, 'barrier'],
        [4210, 808, 'cone'],
        [4750, 852, 'barrier'],
        [5380, 824, 'cone'],
      ],
    })
  }
}
