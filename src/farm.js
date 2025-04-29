let growing;
function plant(event) {
  if (selectedItem.correspondingItem > 0) {
    let veg = selectedItem.correspondingVeg;
    event.preventDefault();
    event.target.style.removeProperty("background");
    event.target.style.backgroundImage = "url(res/img/"+selectedItem.dirt+")";  
    event.target.dataset.veg = veg.file;
    event.target.classList.add("planted");
    selectedItem.correspondingItem -= 1;
  
    event.target.childNodes[1].childNodes[2].style.display = "block"; // progress bar
    event.target.childNodes[1].childNodes[0].style.opacity = "100%"; // vegetable name
    event.target.childNodes[1].childNodes[0].innerHTML = veg.name;
    event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest
    
  
    loadInventory();
  
    // weird interval stuff idek
    if (window['growing'+event.target.id]) clearInterval(window['growing'+event.target.id])
    window['growing'+event.target.id] = setInterval( function() { grow(event, veg) }, 500)

    if (selectedItem.correspondingItem < 1) {
      setCursor("cursor");
    }
  }
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

function plantSprinkler(event) {
  console.log(event);
  event.target.classList.add("sprinkler");

  event.target.style.removeProperty("background-image");
  event.target.style.backgroundImage = "url(res/img/sprinkler/soilSprinkler.png)";

  sprinklerAmount -= 1;
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
  }, 1000)
}
function unearthSprinkler(event) {
  if (window['spronkler'+event.target.id]) clearInterval(window['spronkler'+event.target.id]);

  event.target.classList.remove("sprinkler");

  event.target.style.removeProperty("background-image");
}

function waterEventless(elmnt) {
  if (elmnt) {
    if (elmnt.classList.contains("wet")) return;
    let vegetable = eval(elmnt.dataset.veg);
    elmnt.classList.add("wet");
    if (!elmnt.style.backgroundImage) {
      elmnt.style.background = "#402905";
    } else {
      elmnt.style.backgroundImage = "url(res/img/"+vegetable.seedType.wetDirt +")";
    }
  }
}


function whatShouldThisSoilDo(event) { 
  if (event.target.classList.contains("ready")) {
    harvest(event); 
  }

  if (selectedItem.type == 'seed' && !event.target.classList.contains("planted") && !event.target.classList.contains("sprinkler")) {
    plant(event); 
  } else if (selectedItem.type == 'can') {
    water(event);
  } else if (selectedItem.type == 'sprinkler') {
    plantSprinkler(event);
  } else if (event.target.classList.contains("sprinkler")) {
    unearthSprinkler(event);
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