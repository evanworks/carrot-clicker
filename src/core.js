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

function select(item) {
  if (item.correspondingItem > 0 || item.nostack) {
    document.body.style.cursor = 'url("res/img/'+item.cursor+'"),auto';
    selectedItem = item;
  }
}

let mousedown = false;

document.body.addEventListener('mousedown', () => {
  if (selectedItem.type == "can") {
    document.body.classList.add('can');
    mousedown = true;
  }
});

document.body.addEventListener('mouseup', () => {
  document.body.classList.remove('can');
  mousedown = false;
});

document.body.addEventListener('mouseleave', () => {
  document.body.classList.remove('can');
  mousedown = false;
});

setInterval(() => {
  if (mousedown) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = `${mouseX - 4}px`;  // Center the dot at the cursor
    trail.style.top = `${mouseY - 4}px`;
    document.body.appendChild(trail);
  
    // Remove the dot after the animation finishes (0.5s)
    setTimeout(() => trail.remove(), 500);
  }
}, 10)

let mouseX = 0
let mouseY = 0

window.addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY
})