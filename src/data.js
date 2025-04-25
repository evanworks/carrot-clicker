let carrotAmount = 0;
const carrot = {
  get correspondingItem() {return carrotAmount;},
  set correspondingItem(val) {carrotAmount = val;},

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

let carrotSeedsAmount = 10; 
const carrotSeeds = {
  get correspondingItem() {return carrotSeedsAmount;},
  set correspondingItem(val) {carrotSeedsAmount = val;},

  get correspondingVeg() {return carrot;},

  file: 'carrotSeeds',
  name: 'Carrot Seeds',
  desc: 'Used to plant carrots.',
  img: 'seed/carrotSeeds.png',
  dirt: 'soil/soilCarrot.png',
  cursor: 'cursors/carrotSeeds-cursor.png',

  type: 'seed',
  price: 5,
}

const inventoryList = [carrot, carrotSeeds];
let shopList = [carrotSeeds];