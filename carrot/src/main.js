let money = 0;

carrots = 0;

carrotSeeds = 25; 

carrotGrowthTime = 15;



setInterval(update, 100)

// PLANTING & GROWING

function plant(event) {
  event.preventDefault();
  event.target.style.background = "url(res/img/soil-carrot.png)";
  carrotSeeds -= 1;
  event.target.classList.add("planted")
  event.target.childNodes[1].childNodes[2].style.display = "block"; // progress bar
  event.target.childNodes[1].childNodes[0].style.opacity = "100%"; // vegetable name
  event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest
  growing = setInterval( function() { grow(event, "carrot") }, 500)
}

function grow(event, vegetable) {
  if (event.target.classList.contains("planted")) {
    let modifier = 100 / window[vegetable+"GrowthTime"];
    let barWidth = event.target.childNodes[1].childNodes[2].childNodes[0].offsetWidth;
    if (barWidth < 96) {
      event.target.childNodes[1].childNodes[2].childNodes[0].style.width = barWidth + modifier + "px";
    } else {
      harvestReady(event)
    }
  }
}

function harvestReady(event) {
  clearInterval(growing) // I COULD SEE THIS BEING A PROBLEM

  event.target.style.background = "url(res/img/soil-carrot-ready.png)";

  event.target.childNodes[1].childNodes[2].style.display = "none"; // progress bar
  event.target.childNodes[1].childNodes[0].style.opacity = "0%"; // vegetable name
  event.target.childNodes[1].childNodes[4].style.display = "block"; // click to harvest

  event.target.classList.remove("planted")
  event.target.classList.add("ready")
  console.log(event.target.classList)
}

function harvest(event, vegetable) {
  if (event.target.classList.contains("ready")) {

    event.target.style.background = "#76552B";

    event.target.classList.remove("ready");
    event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest

    window[vegetable+"s"] += 1;
    event.target.childNodes[1].childNodes[2].childNodes[0].style.width = "0px";
  }
}

// UPDATE FUNCTION OH NO

function update() {
  document.getElementById("carrotSeeds").innerHTML = carrotSeeds;
  document.getElementById("carrots").innerHTML = carrots;
}



// DRAG STUFF

function dragStart(event) {
  event.dataTransfer.effectAllowed = "copyMove";
} 

function allowDrop(event) {
  event.preventDefault();
}

