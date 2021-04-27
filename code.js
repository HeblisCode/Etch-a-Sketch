/*CELL CREATION******************************************************************************************/
function createCells(size) {
  const gameContainer = document.querySelector("#gameContainer");
  gameContainer.style.cssText = `
    grid-template-columns: repeat(${size}, 1fr); 
    grid-template-rows: repeat(${size}, 1fr);
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
  //defined in lib.js
  e.target.style.backgroundColor = decreaseLightness(
    e.target.style.backgroundColor
  );
}
function colorLighten(e) {
  //defined in lib.js
  e.target.style.backgroundColor = increaseLightness(
    e.target.style.backgroundColor
  );
}
function colorHEX(e, color) {
  e.target.style.backgroundColor = color;
}

/*MOUSEOVER HANDLER*******************************************************************************************/
function draw(e, color) {
  if (color.charAt(0) === "#") {
    colorHEX(e, color);
    return;
  }
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

/*CLEAR FUNCTION************************************************************************************************/
function clearGrid() {
  const cells = document.querySelectorAll(".gridCell");
  cells.forEach(
    (cell) => (cell.style.cssText = "background-color: rgb(255, 255, 255)")
  );
}

/*NEW GAME - RESIZE*********************************************************************************************/
function newGrid() {
  let color = ""; //stores the currently active color mode

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
  let buttons = document.querySelectorAll("#controlsContainer > button");
  buttons.forEach((button, i) =>
    button.addEventListener("click", function () {
      if (i === buttons.length - 1) {
        clearGrid();
      } else {
        color = colorModesArray[i];
      }
    })
  );

  //color picker
  const colorPicker = document.querySelector("#colorPicker");
  colorPicker.addEventListener("change", function (e) {
    color = e.target.value;
  });
}

/*ON LOAD*******************************************************************************************/
window.onload = function () {
  newGrid();
  const slider = document.querySelector("#slider");
  slider.addEventListener("change", function (e) {
    newGrid(e);
  });
};
