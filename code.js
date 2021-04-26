function createGrid(size) {
  const gameContainer = document.querySelector("#gameContainer");
  const cellSize = 800 / size;

  for (let i = 0; i < size ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("gridCell");
    cell.innerText = i;
    cell.style.height = cellSize + "px";
    cell.style.width = cellSize + "px";
    console.log(cellSize);
    gameContainer.appendChild(cell);
  }
}

createGrid(10);
