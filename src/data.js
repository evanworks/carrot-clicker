let carrotAmount = 0;
const carrot = {
  get correspondingItem() {return carrotAmount;},
  set correspondingItem(val) {carrotAmount = val;},

  get seedType() {return carrotSeeds;},

  file: 'carrot',
  name: 'Carrot',
  desc: 'Light and juicy.',

  img: 'veg/carrot.png',
  ready: 'ready/soilCarrotReady.png',
  cursor: 'cursors/carrot-cursor.png',

  type: 'veg',
  price: 7,
  growthTime: 20,
}

let carrotSeedsAmount = 25; 
const carrotSeeds = {
  get correspondingItem() {return carrotSeedsAmount;},
  set correspondingItem(val) {carrotSeedsAmount = val;},

  get correspondingVeg() {return carrot;},

  file: 'carrotSeeds',
  name: 'Carrot Seeds',
  desc: 'Used to plant carrots.',
  img: 'seed/carrotSeeds.png',
  dirt: 'soil/dry/carrot.png',
  wetDirt: 'soil/wet/carrot.png',
  cursor: 'cursors/carrotSeeds-cursor.png',

  type: 'seed',
  price: 5,
}

const wateringCan = {
  file: 'wateringCan',
  name: 'Watering Can',
  desc: 'Douse crops to help them grow',
  img: 'can/wateringCan.png',
  cursor: 'can/canCursor.png',

  nostack: true,

  type: 'can',
  price: 5,
}

let properyExpansionAmount = 0;
const propertyExpansion = {
  get correspondingItem() {return properyExpansionAmount;},
  set correspondingItem(val) {properyExpansionAmount = val;},

  file: 'propertyExpansion',
  name: 'Property Expansion',
  desc: 'Expand your farm by five slots.',
  img: 'abnormal/propertyExpansion.png',
  //cursor: 'can/canCursor.png',

  nostack: true,

  type: 'abnormal',
  price: 30,

  func: () => {
    for (let i = 0; i < 5; i++) {
      summonFarmland("farmland")
    }
  }
}

let inventoryList = [wateringCan, carrot, carrotSeeds];
let shopList = [carrotSeeds, propertyExpansion];