let growing;
function plant(event) {
  let veg = selectedItem.correspondingVeg;
  event.preventDefault();
  event.target.style.removeProperty("background");
  event.target.style.backgroundImage = "url(res/img/"+selectedItem.dirt+")";  
  event.target.dataset.veg = veg.file;
  event.target.classList.add("planted");
  selectedItem.correspondingItem -= 1;

  event.target.childNodes[1].childNodes[2].style.display = "block"; // progress bar
  event.target.childNodes[1].childNodes[0].style.opacity = "100%"; // vegetable name
  event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest

  loadInventory();

  // weird interval stuff idek
  if (window['growing'+event.target.id]) clearInterval(window['growing'+event.target.id])
  window['growing'+event.target.id] = setInterval( function() { grow(event, veg) }, 500)
}

function water(event) {
  let vegetable = eval(event.target.dataset.veg);
  event.target.classList.add("wet");
  if (!event.target.style.backgroundImage) {
    event.target.style.background = "#402905";
  } else {
    event.target.style.backgroundImage = "url(res/img/"+vegetable.seedType.wetDirt +")";
  }
}

function grow(event) {
  console.log("growing...");
  if (event.target.classList.contains("planted")) {
    let vegetable = event.target.dataset.veg;
    vegetable = eval(vegetable);

    // bar stuff
    let modifier = 100 / vegetable.growthTime
    if (!event.target.classList.contains("wet")) {
      modifier = 100 / (vegetable.growthTime * 4);
    }
    let barWidth = event.target.childNodes[1].childNodes[2].childNodes[0].offsetWidth;
    if (barWidth < 96) {
      event.target.childNodes[1].childNodes[2].childNodes[0].style.width = barWidth + modifier + "px";
    } else {
      harvestReady(event, vegetable)
    }

    // watering can stuff
    if (event.target.classList.contains("wet") && event.target.classList.contains("planted") ) {
      event.target.style.backgroundImage = "url(res/img/"+vegetable.seedType.wetDirt+")"
    }
  }
}

function harvestReady(event) {
  let vegetable = event.target.dataset.veg;
  vegetable = eval(vegetable);

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
  vegetable = eval(vegetable);
  
  selectedItem = "cursor";
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

function whatShouldThisSoilDo(event) { 
  if (event.target.classList.contains("ready")) {
    harvest(event); 
  }

  if (selectedItem.type == 'seed' && !event.target.classList.contains("planted")) {
    plant(event); 
  } else if (selectedItem.type == 'can') {
    water(event);
  } else {
    grow(event); 
  }
}

function summonFarmland(parentId) {
  const parent = document.getElementById(parentId)
  let rows = parent.getElementsByClassName('row')
  let row = rows[rows.length - 1]

  if (!row || row.children.length >= 5) {
      row = document.createElement('div')
      row.className = 'row'
      parent.appendChild(row)
  }
  row.innerHTML += `<div class="soil-block" id="`+farmNum+`" onclick='whatShouldThisSoilDo(event);'>
              <span class="tooltip" onclick="event.stopPropagation();"><div style="opacity: 0%;">Carrot</div>
                <div class="progressBar" style="display: none;"><div class="progress"></div></div>
                <div style="display: none;">Click to harvest</div>
              </span>
            </div>`

  farmNum++;
}