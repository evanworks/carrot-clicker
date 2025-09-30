let growing;
function plant(event) {
  if (state.selectedItem.correspondingItem > 0) {
    let veg = state.selectedItem.correspondingVeg;
    event.preventDefault();
    event.target.style.removeProperty("background");
    event.target.style.backgroundImage = "url(res/img/"+state.selectedItem.dirt+")";
    event.target.dataset.veg = veg.file;
    event.target.classList.add("planted");
    state.selectedItem.correspondingItem -= 1;
  
    event.target.childNodes[1].childNodes[2].style.display = "block"; // progress bar
    event.target.childNodes[1].childNodes[0].style.opacity = "100%"; // vegetable name
    event.target.childNodes[1].childNodes[0].innerHTML = veg.name;
    event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest
    event.target.childNodes[1].style.pointerEvents = "none";
    
  
    loadInventory();
  
    // weird interval stuff idek
    if (window['growing'+event.target.id]) clearInterval(window['growing'+event.target.id])
    //window['growing'+event.target.id] = setInterval( function() { grow(event, veg) }, 500)

    state.growingTiles.push(event)

    if (state.selectedItem.correspondingItem < 1) {
      setCursor("cursor");
    }
  }
}
  
function water(event) {
  let vegetable = vegetables[event.target.dataset.veg];
  event.target.classList.add("wet");
  if (!event.target.style.backgroundImage) {
    event.target.style.background = "#402905";
  } else {
    event.target.style.backgroundImage = "url(res/img/"+vegetable.seedType.wetDirt +")";
  }
}

function grow(event) {

  if (event.target.classList.contains("planted")) {
    let vegetable = event.target.dataset.veg;
    vegetable = vegetables[vegetable];

    // watering can stuff
    if (event.target.classList.contains("wet") && event.target.classList.contains("planted") ) {
      event.target.style.backgroundImage = "url(res/img/"+vegetable.seedType.wetDirt+")"
    }

    // bar stuff
    let modifier = 100 / vegetable.growthTime
    if (!event.target.classList.contains("wet")) {
      modifier = 100 / (vegetable.growthTime * 4);
    }
    let barWidth = event.target.childNodes[1].childNodes[2].childNodes[0].offsetWidth;
    if (barWidth < 96) {
      event.target.childNodes[1].childNodes[2].childNodes[0].style.width = barWidth + modifier + "px";
      return false;
    } else {
      harvestReady(event, vegetable);
      return true;
    }
  }
}

function harvestReady(event) {
  let vegetable = event.target.dataset.veg;
  vegetable = vegetables[vegetable];

  event.target.style.removeProperty("background-image");
  event.target.style.backgroundImage = "url(res/img/"+vegetable.ready+")";

  event.target.childNodes[1].childNodes[2].style.display = "none"; // progress bar
  event.target.childNodes[1].childNodes[0].style.opacity = "0%"; // vegetable name
  event.target.childNodes[1].childNodes[4].style.display = "block"; // click to harvest

  event.target.classList.remove("planted")
  event.target.classList.add("ready")
}

function harvest(event) {
  let vegetable = event.target.dataset.veg;
  vegetable = vegetables[vegetable];
  
  state.selectedItem = "cursor";
  setCursor("cursor")

  event.target.style.removeProperty("background-image");
  event.target.classList.remove("ready");
  event.target.classList.remove("wet");
  event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest
  event.target.childNodes[1].childNodes[2].childNodes[0].style.width = "0px";

  vegetable.correspondingItem += 1;

  loadInventory();

  clearInterval(window['growing'+event.target.id]);
}

function plantSprinkler(event) {
  console.log(event);
  event.target.classList.remove("wet");
  event.target.classList.remove("planted");

  event.target.classList.add("sprinkler");

  event.target.childNodes[1].childNodes[2].style.display = "none"; // progress bar
  event.target.childNodes[1].childNodes[0].style.opacity = "0%"; // vegetable name

  event.target.style.removeProperty("background");
  event.target.style.removeProperty("background-image");
  event.target.style.backgroundImage = "url(res/img/sprinkler/soilSprinkler.png)";

  inventory.sprinkler -= 1;
  setCursor("cursor");

  let index = Array.from(event.target.parentNode.children).indexOf(event.target);

  window["spronkler" + event.target.id] = setInterval(() => {
    if (event.target.nextSibling) {
      waterEventless(event.target.nextSibling)
    }
    if (event.target.previousSibling) {
      waterEventless(event.target.previousSibling)
    }
    if (event.target.parentElement.nextSibling) {
      waterEventless(event.target.parentElement.nextSibling.children[index])

      waterEventless(event.target.parentElement.nextSibling.children[index - 1])
      waterEventless(event.target.parentElement.nextSibling.children[index + 1])
    }
    if (event.target.parentElement.previousSibling) {
      waterEventless(event.target.parentElement.previousSibling.children[index])
  
      waterEventless(event.target.parentElement.previousSibling.children[index - 1])
      waterEventless(event.target.parentElement.previousSibling.children[index + 1])
    }
  }, 1000);
  loadInventory();
}
function unearthSprinkler(event) {
  if (window['spronkler'+event.target.id]) clearInterval(window['spronkler'+event.target.id]);

  event.target.classList.remove("sprinkler");
  event.target.style.removeProperty("background-image");

  sprinklerAmount++;
  loadInventory();
}

function waterEventless(elmnt) {
  if (elmnt) {
    if (elmnt.classList.contains("wet")) return;
    if (elmnt.classList.contains("sprinkler")) return;
    let vegetable = vegetables[elmnt.dataset.veg];
    elmnt.classList.add("wet");
    if (!elmnt.style.backgroundImage) {
      elmnt.style.background = "#402905";
    } else {
      elmnt.style.backgroundImage = "url(res/img/"+vegetable.seedType.wetDirt +")";
    }
  }
}

function fertilize(event) {
  event.target.classList.add("wet");
  if (!event.target.style.backgroundImage) {
    event.target.style.background = "#402905";
  } else {
    event.target.style.border = "1px solid red";

    // im tweaking out a little bit i think
    //vegetable.fertilize(.rea).as;
  }
}

function whatShouldThisSoilDo(event) {
  console.log(event.target.childNodes[0].childNodes[1]);
  if (event.target.classList.contains("ready")) {
    harvest(event); 
  }

  if (state.selectedItem.type === 'seed' && !event.target.classList.contains("planted") && !event.target.classList.contains("sprinkler")) {
    plant(event); 
  } else if (state.selectedItem.type === 'can') {
    water(event);
  } else if (state.selectedItem.type === 'fertilizer') {
    fertilize(event);
  } else if (state.selectedItem.type === 'sprinkler') {
    plantSprinkler(event);
  } else if (event.target.classList.contains("sprinkler")) {
    unearthSprinkler(event);
  } else {
    grow(event); 
  }
}

let farmPlots = new Map(); // key = "x,y", value = farmland element
let originKey = "0,0";
let currentPlotKey = originKey;

function summonFarmland() {
  // ensure center plot exists
  if (!farmPlots.has(originKey)) {
    createFarmland(0, 0);
  }

  let activePlot = farmPlots.get(currentPlotKey);
  let rows = activePlot.getElementsByClassName('row');
  let row = rows[rows.length - 1];

  // if current plot is full, pick next spiral plot
  if (activePlot.querySelectorAll(".soil-block").length >= 25) {
    currentPlotKey = findNextAvailablePlot();
    activePlot = farmPlots.get(currentPlotKey);
    row = null;
  }

  if (!row || row.children.length >= 5) {
    row = document.createElement('div');
    row.className = 'row';
    activePlot.appendChild(row);
  }

  row.innerHTML += `<div class="soil-block" id="`+farmNum+`" onclick='whatShouldThisSoilDo(event);'>
              <span class="tooltip" onclick="event.stopPropagation();"><div style="opacity: 0;">Carrot</div>
                <div class="progressBar" style="display: none;"><div class="progress"></div></div>
                <div style="display: none;">Click to harvest</div>
              </span>
            </div>`

  farmNum++;
}

// --- helpers ---

function createFarmland(x, y) {
  const farm = document.getElementById("farm");
  const plot = document.createElement("div");
  plot.className = "farmland";
  plot.dataset.x = x;
  plot.dataset.y = y;

  const gap = 350; // 350px farmland + spacing
  plot.style.position = "absolute";
  plot.style.left = `${window.innerWidth / 2 - 175 + x * gap}px`;
  plot.style.top = `${window.innerHeight / 2 - 175 + y * gap}px`;

  farm.appendChild(plot);
  farmPlots.set(`${x},${y}`, plot);
  return plot;
}

function findNextAvailablePlot() {
  const [ox, oy] = originKey.split(",").map(Number);

  for (let radius = 1; radius < 50; radius++) {
    // Start to the RIGHT of origin
    let x = ox + radius;
    let y = oy - radius + 1; // just below top-right corner so first step is top edge

    // right edge (top -> bottom)
    for (; y <= oy + radius; y++) {
      const key = `${x},${y}`;
      if (!farmPlots.has(key)) return createFarmland(x, y), key;
    }
    y--; x--; // step back up, move left

    // bottom edge (right -> left)
    for (; x >= ox - radius; x--) {
      const key = `${x},${y}`;
      if (!farmPlots.has(key)) return createFarmland(x, y), key;
    }
    x++; y--; // step right, move up

    // left edge (bottom -> top)
    for (; y >= oy - radius; y--) {
      const key = `${x},${y}`;
      if (!farmPlots.has(key)) return createFarmland(x, y), key;
    }
    y++; x++; // step down, move right

    // top edge (left -> right)
    for (; x <= ox + radius; x++) {
      const key = `${x},${y}`;
      if (!farmPlots.has(key)) return createFarmland(x, y), key;
    }
    // then radius increases and we repeat
  }

  return currentPlotKey;
}
