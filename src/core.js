function toggle(...menuIDs) {
  for (let menuID of menuIDs) {
    let menu = document.getElementById(menuID)
    if (menu.style.display === "block") {
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
  state.selectedItem = cursor;

  if (cursor !== "cursor") {
    if (cursor.asCursor === "accent") {
      document.getElementById("selected-box").style.transform = "translate(10px, -25px)";
      document.body.style.cursor = "auto";
      document.getElementById("selected-box").src = "res/img/"+cursor.img;

    } else if ( cursor.asCursor === "replace" ) {
      document.getElementById("selected-box").style.transform = "translate(0px, 0px)";
      document.body.style.cursor = "none";
      document.getElementById("selected-box").src = "res/img/"+cursor.cursor;
    }
  } else {
    document.body.style.cursor = "auto";
    document.getElementById("selected-box").src = "";
    mousedown = false;
  }
}

function select(item) {
  if (item.correspondingItem > 0) {
    setCursor(item);
  }
}

let isDragging = false;
let offsetX, offsetY;

document.getElementById("farm").addEventListener('mousedown', e => {
  isDragging = true;
  offsetX = e.clientX - document.getElementById("farm").offsetLeft;
  offsetY = e.clientY - document.getElementById("farm").offsetTop;
})

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  document.getElementById("farm").style.left = `${e.clientX - offsetX}px`;
  document.getElementById("farm").style.top = `${e.clientY - offsetY}px`;
})

document.addEventListener('mouseup', () => {
  isDragging = false;
})




// WATERING CAN :(

let mouseX = 0;
let mouseY = 0;
let mousedown = false;
window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  document.getElementById("selected-box").style.left = `${mouseX}px`;
  document.getElementById("selected-box").style.top = `${mouseY}px`;
});


document.body.addEventListener('mousedown', () => {
  if (state.selectedItem.type === "can") {
    document.getElementById("selected-box").src = "res/img/"+wateringCan.pour;
    mousedown = true;
  }
});

document.body.addEventListener('mouseup', () => {
  if (state.selectedItem.type === "can") {
    document.getElementById("selected-box").src = "res/img/" + wateringCan.img;
    mousedown = false;
  }
});

document.body.addEventListener('mouseleave', () => {
  if (state.selectedItem.type === "can") {
    document.getElementById("selected-box").src = "res/img/" + wateringCan.img;
    mousedown = false;
  }
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



// deselecting

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    setCursor("cursor");
    state.selectedItem = "cursor";
  }
});
document.addEventListener('contextmenu', e => {
  e.preventDefault()
  setCursor("cursor");
  state.selectedItem = "cursor";
});