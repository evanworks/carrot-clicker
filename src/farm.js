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

      clearInterval(growing);
    }
  }
}