/*CELL CREATION******************************************************************************************/
function createCells(size) {
  const gameContainer = document.querySelector("#gameContainer");
  const cellSize = 600 / size;
  gameContainer.style.cssText = `
    grid-template-columns: repeat(${600 / cellSize}, ${cellSize}px); 
    grid-template-rows: repeat(${600 / cellSize}, ${cellSize}px);
    `;

  for (let i = 0; i < size ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("gridCell");
    cell.style.cssText = "background-color: rgb(255,255,255);";
    gameContainer.appendChild(cell);
  }
}

/*COLOR MODES*******************************************************************************************/
function colorBlack(e) {
  e.target.style.cssText = "background-color: hsl(0, 0%, 0%);";
}
function colorRainbow(e) {
  let randomHue = Math.floor(Math.random() * 360);
  e.target.style.cssText = `background-color: hsla(${randomHue}, 100%, 50%, 1)`;
}
function colorDarken(e) {
  e.target.style.backgroundColor = decreaseLightness(
    e.target.style.backgroundColor
  );
}
function colorLighten(e) {
  e.target.style.backgroundColor = increaseLightness(
    e.target.style.backgroundColor
  );
}

/*MOUSEOVER HANDLER*******************************************************************************************/
function draw(e, color) {
  switch (color) {
    case "black":
      colorBlack(e);
      break;
    case "rainbow":
      colorRainbow(e);
      break;
    case "darken":
      colorDarken(e);
      break;
    case "lighten":
      colorLighten(e);
      break;
    default:
      colorBlack(e);
      break;
  }
}

/*NEW GAME - RESIZE*********************************************************************************************/
function newGrid() {
  let color; //stores the currently active color mode

  if (arguments.length === 0) {
    //page load
    createCells(30);
  } else {
    //grid resize
    const gameContainer = document.querySelector("#gameContainer");
    gameContainer.innerHTML = "";
    createCells(arguments[0].target.value);
  }

  //mouseover event listeners
  const cells = document.querySelectorAll(".gridCell");
  cells.forEach((cell) =>
    cell.addEventListener("mouseover", function (e) {
      draw(e, color);
    })
  );

  //buttons event listeners
  const colorModesArray = ["black", "rainbow", "lighten", "darken"];
  let buttons = document.querySelectorAll("#buttonContainer > button");
  buttons.forEach((button, i) =>
    button.addEventListener("click", function () {
      color = colorModesArray[i];
    })
  );
}

/*ON LOAD*******************************************************************************************/
window.onload = function () {
  newGrid();
  const slider = document.querySelector("#slider");
  slider.addEventListener("change", function (e) {
    newGrid(e);
  });
};
