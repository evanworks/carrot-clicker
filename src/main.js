let money = 0;

selectedItem = "cursor";

function start() {
  document.getElementById("title").style.display = "none";
  document.getElementById("game").style.display = "block";
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
  if (selectedItem != "cursor") {
    selectedItem.correspondingItem -= 1;
    money += selectedItem.price;
    if (selectedItem.correspondingItem <= 0) {
      selectedItem = "cursor";
      document.body.style.cursor = 'auto';
    }
    loadInventory();
  }
  loadInventory();
}

// MENUS

function toggle(...menuIDs) {
  for (let menuID of menuIDs) {
    let menu = document.getElementById(menuID)
    if (menu.style.display == "block") {
      menu.classList.add("goAwayNow");
      setTimeout(() => {
        menu.style.display = "none";
        menu.classList.remove("goAwayNow");
      }, 200)
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
function buy(item) {
  if (money >= item.price) {
    item.correspondingItem += 1;
    money -= item.price;
    loadInventory();
  }
}

function loadInventory() {
  const inventory = document.getElementById("inventory");
  inventory.innerHTML = "";
  for (i in inventoryList) {
    let item = inventoryList[i];
    if (item.correspondingItem > 0) {
      inventory.innerHTML += `
      <div id="`+item.file+`-wrapper" class="inventoryWrapper" data-tooltip="<b>`+item.name+`</b><hr/>`+item.desc+`<br/>Price: <span style='color:orange;'>$`+item.price+`</span>">
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
function loadShop() {
  const shop = document.getElementById("shop");
  shop.innerHTML = "";
  for (i in shopList) {
    let item = shopList[i];
    if (item.correspondingItem > 0) {
      shop.innerHTML += `
      <div id="`+item.file+`-wrapper" class="inventoryWrapper" data-tooltip="<b>`+item.name+`</b><hr/>`+item.desc+`<br/>Click to buy.">
        <img src="res/img/`+item.img+`" class="inventoryImg" onclick="buy(`+item.file+`)"><span class='amount' style='text-shadow: 2px 2px darkorange'>$`+item.price+`</span>
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
loadShop()

function update() {
  document.getElementById("money").innerHTML = "$"+money.toFixed(2);
}
setInterval(update, 100)