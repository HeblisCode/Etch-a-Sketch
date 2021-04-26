function createGrid(size) {
  const gameContainer = document.querySelector("#gameContainer");
  const cellSize = 600 / size;

  for (let i = 0; i < size ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("gridCell");
    cell.style.cssText = `height: ${cellSize}px; width: ${cellSize}px`;
    gameContainer.appendChild(cell);
  }
}

function changeColor(e) {
  e.target.classList.add("black");
}

window.onload = function () {
  createGrid(10);
  const cells = document.querySelectorAll(".gridCell");
  cells.forEach((cell) => cell.addEventListener("mouseover", changeColor));
};
