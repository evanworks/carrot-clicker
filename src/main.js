
const state = {
  money: 10000,
  selectedItem: "cursor",
  growingTiles: [],
}

let farmNum = 0; // idk really what this does but it seems important so im keeping it???

window.addEventListener("load", () => {
  preloadImages(images, () => {console.log("done")});
});

function start() {
  document.getElementById("title").style.display = "none";
  document.getElementById("game").style.display = "block";

  reattachListeners();
  loadInventory();
  loadShop();

  for (let i = 0; i < 5; i++) {
    summonFarmland("farmland");
  }
}

// SELLING

function sell() {
  if (!state.selectedItem.nostack) {
    if (state.selectedItem === "cursor") return;
    document.getElementById("itemGoingInBox").src = "res/img/" + state.selectedItem.img;
    document.getElementById("itemGoingInBox").style.display = "block";

    state.selectedItem.correspondingItem -= 1;
    state.money += state.selectedItem.price;
    if (state.selectedItem.correspondingItem <= 0) {
      state.selectedItem = "cursor";
      setCursor("cursor");
    }
    loadInventory();

    setTimeout(() => {
      document.getElementById("itemGoingInBox").style.display = "none";
    }, 500)
  }
  loadInventory();
}

function update() {
  document.getElementById("money").innerHTML = "$"+state.money.toFixed(2);

  if (state.money > 1000) {
    if (!shopList.includes(pepperSeeds)) {
      shopList.push(pepperSeeds);
      loadShop();
    }
  }
}
setInterval(update, 100)

setInterval(() => {
  state.growingTiles.slice().forEach(tile => {
    const done = grow(tile);
    if (done) {
      // remove tile from the list when it's ready
      state.growingTiles = state.growingTiles.filter(t => t !== tile);
    }
  });
}, 500);


function preloadImages(paths, callback) {
  let loadedCount = 0;
  const total = paths.length;

  paths.forEach(path => {
    const img = new Image();
    img.src = path;

    img.onload = () => {
      loadedCount++;
      if (loadedCount === total) {
        callback(); // all images are done loading
      }
    }

    img.onerror = () => {
      loadedCount++;
      console.error(path);
      if (loadedCount === total) {
        callback(); // all images are done loading
      }
    }
  });
}