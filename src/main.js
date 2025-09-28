
const state = {
  money: 1000000,
  selectedItem: "cursor",
}

let plots = [];
let farmNum = 0; // idk really what this does but it seems important so im keeping it???

function start() {
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
      document.body.style.cursor = 'auto';
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