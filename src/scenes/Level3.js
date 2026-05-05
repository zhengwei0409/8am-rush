import BaseLevel from './BaseLevel.js'

const backgroundUrl = new URL('../assets/scene/Level-3/Level-3.png', import.meta.url).href

export default class Level3 extends BaseLevel {
  constructor() {
    super('Level3', {
      number: 3,
      name: 'University Gate',
      backgroundKey: 'level-3-bg',
      backgroundUrl,
      accent: 0x72e0a2,
      platforms: [
        [0, 920, 560, 52],
        [700, 885, 500, 48],
        [1330, 855, 440, 46],
        [1910, 900, 520, 48],
        [2560, 865, 410, 46],
        [3110, 895, 500, 48],
        [3740, 850, 420, 46],
        [4290, 900, 500, 48],
        [4920, 870, 928, 46],
      ],
      hazards: [
        [470, 868, 'cone'],
        [1020, 834, 'barrier'],
        [1580, 802, 'cone'],
        [2210, 848, 'barrier'],
        [2810, 812, 'cone'],
        [3380, 842, 'barrier'],
        [3980, 798, 'cone'],
        [4570, 848, 'barrier'],
        [5250, 818, 'cone'],
        [5520, 818, 'barrier'],
      ],
    })
  }
}
