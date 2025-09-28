// MENUS
function buy(item) {
  if (state.money >= item.price) {
    item.correspondingItem += 1;
    state.money -= item.price;

    if (item.type === 'abnormal') {
      item.func();
    }

    loadInventory();
  }
}

function loadInventory() {
  const inventory = document.getElementById("inventory");
  inventory.innerHTML = "";

  for (let i in inventoryList) {
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
        <img alt="`+item.name+`" src="https://raw.githubusercontent.com/evanworks/carrot-clicker/refs/heads/main/res/img/`+item.img+`" class="inventoryImg" onclick="select(`+item.file+`)"><span class='amount' id="`+item.file+`">`+maybe+`</span>
      </div>
      `;
    }
  }
  reattachListeners();
}
function loadShop() {
  const shop = document.getElementById("shop");
  shop.innerHTML = "";
  for (let i in shopList) {
    let item = shopList[i];
    shop.innerHTML += `
    <div id="`+item.file+`-wrapper" class="inventoryWrapper" data-tooltip="<b>`+item.name+`</b><hr/>`+item.desc+`<br/>Click to buy.">
      <img alt="`+item.name+`" src="res/img/`+item.img+`" class="inventoryImg" onclick="buy(`+item.file+`)"><span class='amount'>$`+item.price+`</span>
    </div>
    `;
  }
  reattachListeners();
}

// refactoring = yay
function reattachListeners() {
  document.addEventListener('mousemove', e => {
    document.getElementById("inventoryTooltip").style.left = e.clientX + 'px'
    document.getElementById("inventoryTooltip").style.top = e.clientY + 'px'
  });

  document.querySelectorAll('.inventoryWrapper').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.getElementById("inventoryTooltip").innerHTML = el.dataset.tooltip
      document.getElementById("inventoryTooltip").style.opacity = "1";
    });

    el.addEventListener('mouseleave', () => {
      document.getElementById("inventoryTooltip").style.opacity = "0";
      document.getElementById("inventoryTooltip").innerHTML = ''
    });
  });
}