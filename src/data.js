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
const pepper = {
  get correspondingItem() {return inventory.pepper;},
  set correspondingItem(val) {inventory.pepper = val;},

  get seedType() {return pepperSeeds;},

  file: 'pepper',
  name: 'Pepper',
  desc: 'The hot kind. I think.',

  img: 'veg/pepper.png',
  ready: 'ready/soilPepperReady.png',
  asCursor: 'accent',

  type: 'veg',
  price: 150,
  growthTime: 240,
}
const potato = {
  get correspondingItem() {return inventory.pepper;},
  set correspondingItem(val) {inventory.pepper = val;},

  get seedType() {return pepperSeeds;},

  file: 'pepper',
  name: 'Pepper',
  desc: 'A large brown oval.',

  img: 'veg/pepper.png',
  ready: 'ready/soilPepperReady.png',
  asCursor: 'accent',

  type: 'veg',
  price: 150,
  growthTime: 360,
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
const pepperSeeds = {
  get correspondingItem() {return inventory.pepperSeeds;},
  set correspondingItem(val) {inventory.pepperSeeds = val;},

  get correspondingVeg() {return pepper;},

  file: 'pepperSeeds',
  name: 'Pepper Seeds',
  desc: 'Used to plant peppers.',
  img: 'seed/pepperSeeds.png',
  asCursor: 'accent',

  dirt: 'soil/dry/pepper.png',
  wetDirt: 'soil/wet/pepper.png',

  type: 'seed',
  price: 100,
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
  get correspondingItem() {return inventory.sprayFertilizer;},
  set correspondingItem(val) {inventory.sprayFertilizer = val;},

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

const sprinkler = {
  get correspondingItem() {return inventory.sprinkler;},
  set correspondingItem(val) {inventory.sprinkler = val;},

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
  sprayFertilizer: 0,
  carrot: 0,
  radish: 0,
  pepper: 0,
  carrotSeeds: 10,
  radishSeeds: 0,
  pepperSeeds: 0,
  propertyExpansion: 1,
  sprinkler: 0,
}

const images = [
  "res/img/abnormal/propertyExpansion.png",

  "res/img/can/canCursor.png",
  "res/img/can/pour.png",
  "res/img/can/pourCursor.png",
  "res/img/can/wateringCan.png",

  "res/img/fertilizer/sprayFertilizer.png",
  "res/img/ready/soilCarrotReady.png",
  "res/img/ready/soilRadishReady.png",

  "res/img/seed/carrotSeeds.png",
  "res/img/seed/radishSeeds.png",

  "res/img/soil/dry/carrot.png",
  "res/img/soil/dry/radish.png",

  "res/img/soil/wet/carrot.png",
  "res/img/soil/wet/radish.png",

  "res/img/sprinkler/soilSprinkler.png",
  "res/img/sprinkler/sprinkler.png",

  "res/img/veg/carrot.png",
  "res/img/veg/radish.png",

  "res/img/betterBox.png",
  "res/img/box.png",
  "res/img/boxOpen.png",
  "res/img/carrot-small.png",
  "res/img/cart.png",
  "res/img/cart-hover.png",
  "res/img/clock-bg.png",
  "res/img/favicon.png",
  "res/img/toolbox.png",
  "res/img/toolbox-hover.png",
]

let vegetables = { carrot, radish, pepper }

let inventoryList = [wateringCan, carrot, radish, pepper, carrotSeeds, pepperSeeds, radishSeeds, sprinkler, sprayFertilizer];
let shopList = [carrotSeeds, radishSeeds,  propertyExpansion, sprinkler, sprayFertilizer];