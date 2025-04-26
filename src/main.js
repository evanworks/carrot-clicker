let money = 120;

let selectedItem = "cursor";
let farmNum = 0;

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
  if (!selectedItem.nostack) {
    if (selectedItem == "cursor") return;
    document.getElementById("itemGoingInBox").src = "res/img/" + selectedItem.img;
    document.getElementById("itemGoingInBox").style.display = "block";

    selectedItem.correspondingItem -= 1;
    money += selectedItem.price;
    if (selectedItem.correspondingItem <= 0) {
      selectedItem = "cursor";
      document.body.style.cursor = 'auto';
    }
    loadInventory();

    setTimeout(() => {
      document.getElementById("itemGoingInBox").style.display = "none";
    }, 500)
  }
  loadInventory();
}

// MENUS
function buy(item) {
  if (money >= item.price) {
    item.correspondingItem += 1;
    money -= item.price;

    if (item.type == 'abnormal') {
      item.func();
    }

    loadInventory();
  }
}

function loadInventory() {
  const inventory = document.getElementById("inventory");
  inventory.innerHTML = "";
  for (i in inventoryList) {
    let item = inventoryList[i];

    let maybe;
    if(!item.nostack) maybe = item.correspondingItem;
    else maybe = '';  

    let maybePrice;
    if (!item.nostack) maybePrice = "Price: <span style='color:orange;'>$" + item.price + "</span>";
    else maybePrice = '';

    if (item.correspondingItem > 0 || item.nostack) {
      inventory.innerHTML += `
      <div id="`+item.file+`-wrapper" class="inventoryWrapper" data-tooltip="<b>`+item.name+`</b><hr/>`+item.desc+`<br/>`+maybePrice+`">
        <img src="res/img/`+item.img+`" class="inventoryImg" onclick="select(`+item.file+`)"><span class='amount' id="`+item.file+`">`+maybe+`</span>
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
    shop.innerHTML += `
    <div id="`+item.file+`-wrapper" class="inventoryWrapper" data-tooltip="<b>`+item.name+`</b><hr/>`+item.desc+`<br/>Click to buy.">
      <img src="res/img/`+item.img+`" class="inventoryImg" onclick="buy(`+item.file+`)"><span class='amount'>$`+item.price+`</span>
    </div>
    `;
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

function update() {
  document.getElementById("money").innerHTML = "$"+money.toFixed(2);
}
setInterval(update, 100)