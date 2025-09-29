
const state = {
  money: 0,
  selectedItem: "cursor",
}

let farmNum = 0; // idk really what this does but it seems important so im keeping it???

function start() {
  preloadImages(images, () => {console.log("done")});
  document.getElementById("title").style.display = "none";
  document.getElementById("game").style.display = "block";

  loadInventory()
  loadShop()

  for (let i = 0; i < 5; i++) {
    summonFarmland("farmland")
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
}
setInterval(update, 100)



function preloadImages(paths, callback) {
  let loadedCount = 0;
  const total = paths.length;

  paths.forEach(path => {
    const img = new Image();
    img.src = path;

    img.onload = img.onerror = () => {
      loadedCount++;
      if (loadedCount === total) {
        callback(); // all images are done loading
      }
    };
  });
}