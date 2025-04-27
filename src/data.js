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
let radishAmount = 0;
const radish = {
  get correspondingItem() {return radishAmount;},
  set correspondingItem(val) {radishAmount = val;},

  get seedType() {return radishSeeds;},

  file: 'radish',
  name: 'Radish',
  desc: 'Deep and peppery.',

  img: 'veg/radish.png',
  ready: 'ready/soilRadishReady.png',
  cursor: 'cursors/radish-cursor.png',

  type: 'veg',
  price: 25,
  growthTime: 120,
}

let carrotSeedsAmount = 10; 
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

let radishSeedsAmount = 0; 
const radishSeeds = {
  get correspondingItem() {return radishSeedsAmount;},
  set correspondingItem(val) {radishSeedsAmount = val;},

  get correspondingVeg() {return radish;},

  file: 'radishSeeds',
  name: 'Radish Seeds',
  desc: 'Used to plant radishes.',
  img: 'seed/radishSeeds.png',
  dirt: 'soil/dry/radish.png',
  wetDirt: 'soil/wet/radish.png',
  cursor: 'cursors/radishSeeds-cursor.png',

  type: 'seed',
  price: 15,
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
  price: 50,

  func: () => {
    for (let i = 0; i < 5; i++) {
      summonFarmland("farmland")
    }
  }
}

let sprinklerAmount = 0;
const sprinkler = {
  get correspondingItem() {return sprinklerAmount;},
  set correspondingItem(val) {sprinklerAmount = val;},

  file: 'sprinkler',
  name: 'Sprinkler',
  desc: 'Water the eight nearby tiles',
  img: 'sprinkler/sprinkler.png',
  cursor: 'cursors/sprinkler.png',

  type: 'sprinkler',
  price: 30,
}

let inventoryList = [wateringCan, carrot, radish, carrotSeeds, radishSeeds, sprinkler ];
let shopList = [carrotSeeds, radishSeeds,  propertyExpansion, sprinkler ];