let mouseX = 0;
let mouseY = 0;
let mousedown = false;
window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

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
function setCursor(cursor) {
  selectedItem = cursor;
  if (cursor != "cursor") {
    document.body.style.cursor = 'url("https://raw.githubusercontent.com/evanworks/carrot-clicker/refs/heads/main/res/img/'+cursor.cursor+'"),auto';
  } else {
    document.body.style.cursor = 'auto';
  }
}

function select(item) {
  if (item.correspondingItem > 0 || item.nostack) {
    setCursor(item);
  }
}

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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.body.style.cursor = "auto";
    selectedItem = "cursor";
  }
});
document.addEventListener('contextmenu', e => {
  e.preventDefault()
  document.body.style.cursor = "auto";
  selectedItem = "cursor";
});


let isDragging = false
let offsetX, offsetY

document.getElementById("farm").addEventListener('mousedown', e => {
    isDragging = true
    offsetX = e.clientX - document.getElementById("farm").offsetLeft
    offsetY = e.clientY - document.getElementById("farm").offsetTop
})

document.addEventListener('mousemove', e => {
    if (!isDragging) return
    document.getElementById("farm").style.left = `${e.clientX - offsetX}px`
    document.getElementById("farm").style.top = `${e.clientY - offsetY}px`
})

document.addEventListener('mouseup', () => {
    isDragging = false
})