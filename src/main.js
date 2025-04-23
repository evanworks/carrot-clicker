let money = 0;

selectedItem = "cursor";

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
  growthTime: 15,
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

// PLANTING & GROWING

function plant(event) {
  if (selectedItem != "cursor") {
    if (!event.target.classList.contains("planted")) {
      let veg = selectedItem.correspondingVeg;
      event.preventDefault();
      document.body.style.cursor = 'auto';
      event.target.style.backgroundImage = "url(res/img/"+selectedItem.dirt+")";
      event.target.dataset.veg = veg.file;
      event.target.classList.add("planted");
      selectedItem.correspondingItem -= 1;
  
      event.target.childNodes[1].childNodes[2].style.display = "block"; // progress bar
      event.target.childNodes[1].childNodes[0].style.opacity = "100%"; // vegetable name
      event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest
  
      selectedItem = "cursor";
      loadInventory();
  
      growing = setInterval( function() { grow(event, veg) }, 500)
    }
  }
}

function grow(event) {
  if (selectedItem == "cursor") {
    if (event.target.classList.contains("planted")) {
      let vegetable = event.target.dataset.veg;
      vegetable = eval(vegetable);

      let modifier = 100 / vegetable.growthTime
      let barWidth = event.target.childNodes[1].childNodes[2].childNodes[0].offsetWidth;
      if (barWidth < 96) {
        event.target.childNodes[1].childNodes[2].childNodes[0].style.width = barWidth + modifier + "px";
      } else {
        harvestReady(event, vegetable)
      }
    }
  }
}

function harvestReady(event) {
  let vegetable = event.target.dataset.veg;
  vegetable = eval(vegetable);

  event.target.style.backgroundImage = "url(res/img/"+vegetable.ready+")";

  event.target.childNodes[1].childNodes[2].style.display = "none"; // progress bar
  event.target.childNodes[1].childNodes[0].style.opacity = "0%"; // vegetable name
  event.target.childNodes[1].childNodes[4].style.display = "block"; // click to harvest

  event.target.classList.remove("planted")
  event.target.classList.add("ready")
}

function harvest(event) {
  if (selectedItem == "cursor") {
    if (event.target.classList.contains("ready")) {
      let vegetable = event.target.dataset.veg;
      vegetable = eval(vegetable);
      console.log(vegetable)

      event.target.style.background = "#8e5252";
      event.target.classList.remove("ready");
      event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest
      event.target.childNodes[1].childNodes[2].childNodes[0].style.width = "0px";

      vegetable.correspondingItem += 1;

      loadInventory();
    }
  }
}

// SELLING

function openSellMenu() {
  sell = document.getElementById("sell-menu");
  console.log(sell)
  if (sell.style.display == "none") {
    sell.style.display = "block";
  } else {
    sell.style.display = "none";
  }
}

function sell() {
  //sell = document.getElementById("sell");
  if (selectedItem == "carrot") {
    if (carrots > 0) {
      carrots--;
      money += carrotPrice;
    }
  } else {
    document.getElementById("sell-text").innerHTML = "SELL ITEMS";
  }
}

// MENUS

function toggle(...menuIDs) {
  for (let menuID of menuIDs) {
    let menu = document.getElementById(menuID)
    if (menu.style.display == "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
}

// SELECT

function select(item) {
  if (item.correspondingItem > 0) {
    document.body.style.cursor = 'url("res/img/'+item.cursor+'"),auto';
    selectedItem = item;
  }
}

function loadInventory() {
  const inventory = document.getElementById("inventory");
  inventory.innerHTML = "";
  for (i in inventoryList) {
    let item = inventoryList[i];
    if (item.correspondingItem > 0) {
      inventory.innerHTML += `
      <div id="`+item.file+`-wrapper" class="inventoryWrapper" data-tooltip="<b>`+item.name+`</b><hr/>`+item.desc+`">
        <img src="res/img/`+item.img+`" class="inventoryImg" onclick="select(`+item.file+`)"><span class='amount' id="`+item.file+`">`+item.correspondingItem+`</span>
      </div>
      `;
    }
  }
  document.addEventListener('mousemove', e => {
    document.getElementById("inventoryTooltip").style.left = e.clientX + 'px'
    document.getElementById("inventoryTooltip").style.top = e.clientY + 'px'
  })
  
  document.querySelectorAll('.inventoryWrapper').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.getElementById("inventoryTooltip").innerHTML = el.dataset.tooltip
      document.getElementById("inventoryTooltip").style.opacity = 1
    })
  
    el.addEventListener('mouseleave', () => {
      document.getElementById("inventoryTooltip").style.opacity = 0
      document.getElementById("inventoryTooltip").innerHTML = ''
    })
  })
}

loadInventory()

// UPDATE FUNCTION

function update() {
  document.getElementById("money").innerHTML = "$"+money.toFixed(2);
}
setInterval(update, 100)