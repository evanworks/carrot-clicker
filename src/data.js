const carrot = {
  get correspondingItem() {return inventory.carrot;},
  set correspondingItem(val) {inventory.carrot = val;},

  get seedType() {return carrotSeeds;},

  file: 'carrot',
  name: 'Carrot',
  desc: 'Light and juicy.',

  img: 'veg/carrot.png',
  ready: 'ready/soilCarrotReady.png',
  asCursor: 'accent',

  type: 'veg',
  price: 7,
  growthTime: 20,
}
const radish = {
  get correspondingItem() {return inventory.radish;},
  set correspondingItem(val) {inventory.radish = val;},

  get seedType() {return radishSeeds;},

  file: 'radish',
  name: 'Radish',
  desc: 'Deep and peppery.',

  img: 'veg/radish.png',
  ready: 'ready/soilRadishReady.png',
  asCursor: 'accent',

  type: 'veg',
  price: 25,
  growthTime: 120,
}
const carrotSeeds = {
  get correspondingItem() {return inventory.carrotSeeds;},
  set correspondingItem(val) {inventory.carrotSeeds = val;},

  get correspondingVeg() {return carrot;},

  file: 'carrotSeeds',
  name: 'Carrot Seeds',
  desc: 'Used to plant carrots.',
  img: 'seed/carrotSeeds.png',
  asCursor: 'accent',

  dirt: 'soil/dry/carrot.png',
  wetDirt: 'soil/wet/carrot.png',

  type: 'seed',
  price: 5,
}
const radishSeeds = {
  get correspondingItem() {return inventory.radishSeeds;},
  set correspondingItem(val) {inventory.radishSeeds = val;},

  get correspondingVeg() {return radish;},

  file: 'radishSeeds',
  name: 'Radish Seeds',
  desc: 'Used to plant radishes.',
  img: 'seed/radishSeeds.png',
  asCursor: 'accent',

  dirt: 'soil/dry/radish.png',
  wetDirt: 'soil/wet/radish.png',

  type: 'seed',
  price: 15,
}
const wateringCan = {
  get correspondingItem() {return inventory.wateringCan;},
  set correspondingItem(val) {inventory.wateringCan = val;},

  file: 'wateringCan',
  name: 'Watering Can',
  desc: 'Douse crops to help them grow',
  img: 'can/wateringCan.png',
  cursor: 'can/canCursor.png',
  pour: 'can/pour.png',
  asCursor: 'replace',

  nostack: true,

  type: 'can',
  price: 5,
}
const sprayFertilizer = {
  //TODO don't forget this :////
  get correspondingItem() {return inventory.wateringCan;},
  set correspondingItem(val) {inventory.wateringCan = val;},

  file: 'sprayFertilizer',
  name: 'Spray Fertilizer',
  desc: ' Use some probably harmful chemicals to further increase your plants\' growth speed.',
  img: 'fertilizer/sprayFertilizer.png',
  asCursor: 'replace',

  nostack: true,

  type: 'fertilizer',
  price: 20,
}
const propertyExpansion = {
  get correspondingItem() {return inventory.propertyExpansion;},
  set correspondingItem(val) {inventory.propertyExpansion = val;},

  file: 'propertyExpansion',
  name: 'Property Expansion',
  desc: 'Expand your farm by five slots.',
  img: 'abnormal/propertyExpansion.png',

  nostack: true,
  hidden: true,

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
  asCursor: 'accent',

  type: 'sprinkler',
  price: 30,
}

const inventory = {
  wateringCan: 1,
  carrot: 0,
  radish: 0,
  carrotSeeds: 10,
  radishSeeds: 0,
  propertyExpansion: 1,
  sprinkler: 0,
}

const images = [
  "res/img/abnormal/propertyExpansion.png"
]

let inventoryList = [wateringCan, carrot, radish, carrotSeeds, radishSeeds, sprinkler ];
let shopList = [carrotSeeds, radishSeeds,  propertyExpansion, sprinkler, sprayFertilizer];