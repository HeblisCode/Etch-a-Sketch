function createGrid(size) {
  const gameContainer = document.querySelector("#gameContainer");
  const cellSize = 600 / size;
  gameContainer.style.cssText = `
    grid-template-columns: repeat(${600 / cellSize}, ${cellSize}px); 
    grid-template-rows: repeat(${600 / cellSize}, ${cellSize}px);
    `;

  for (let i = 0; i < size ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("gridCell");
    gameContainer.appendChild(cell);
  }
}

function colorBlack(e) {
  e.target.style.cssText = "background-color: hsla(0, 0%, 0%, 1);";
}
function colorRainbow(e) {
  let randomHue = Math.floor(Math.random() * 360);
  e.target.style.cssText = `background-color: hsla(${randomHue}, 100%, 50%, 1)`;
}
function colorGradient(e) {
  //WIP
  console.log(e.target.style.backgroundColor);
}

function changeMode(mode) {
  const cells = document.querySelectorAll(".gridCell");
  const mouseoverListener = function (e) {
    mode(e);
  };
  cells.forEach((cell) =>
    cell.removeEventListener("mouseover", mouseoverListener)
  );
  cells.forEach((cell) =>
    cell.addEventListener("mouseover", mouseoverListener)
  );
}

function resizeGrid(e) {
  const gameContainer = document.querySelector("#gameContainer");
  gameContainer.innerHTML = "";
  createGrid(e.target.value);
  changeMode(colorBlack);
}

window.onload = function () {
  createGrid(30);
  changeMode(colorBlack); //default selection = black

  const rainbowButton = document.querySelector("#rainbow");
  const blackButton = document.querySelector("#black");
  const gradientButton = document.querySelector("#gradient");
  const slider = document.querySelector("#slider");

  rainbowButton.addEventListener("click", function () {
    changeMode(colorRainbow);
  });
  blackButton.addEventListener("click", function () {
    changeMode(colorBlack);
  });
  gradientButton.addEventListener("click", function () {
    changeMode(colorGradient);
  });
  slider.addEventListener("change", resizeGrid);
};
