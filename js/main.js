const DEFAULT_GRID_SIZE = 16;
const GRID_DIMENSION = 600;
const DEFAULT_COLOR = "#0f0f0f";
const PRIMARY_COLOR = "#333333";
const WHITE_COLOR = "#ffffff";

function getColorValue() {
  color = document.querySelector("#color-picker").value;
  return color;
}

function clearGrid() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((grid) => (grid.style.backgroundColor = "#ffffff"));
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function eraserMode(e) {
  e.target.style.backgroundColor = WHITE_COLOR;
}
function colorMode(e) {
  const colorValue = getColorValue();
  e.target.style.backgroundColor = colorValue;
}
function rainbowColorMode(e) {
  const randomColor = getRandomColor();
  e.target.style.backgroundColor = randomColor;
}

function modifyDiv(e) {
  const selectedAction = document.querySelector(".control-btn.selected");
  const selectedActionName = selectedAction.getAttribute("id");
  switch (selectedActionName) {
    case "color-mode":
      colorMode(e);
      break;
    case "rainbow-mode":
      rainbowColorMode(e);
      break;
    case "eraser":
      eraserMode(e);
      break;
  }
}

function selectActionBtn(e) {
  const controlBtn = document.querySelectorAll(".control-btn.selected");
  controlBtn.forEach((btn) => btn.classList.remove("selected"));
  const selectedBtn = e.target;
  selectedBtn.classList.add("selected");
  selectedBtn.classList.remove("selectable");
}

function setUpGrid(gridSize = DEFAULT_GRID_SIZE) {
  let gridDimension = GRID_DIMENSION / gridSize;
  const grid = document.querySelector(".grids-container");
  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement("div");
    div.style.cssText = `min-width: ${gridDimension}px; height: ${gridDimension}px;`;
    div.classList.add("grid-cell");
    div.addEventListener("click", modifyDiv);
    grid.appendChild(div);
  }
}

function removeAllChildren(elementNode) {
  while (elementNode.firstChild) {
    elementNode.removeChild(elementNode.lastChild);
  }
}

function changeGridSize(e) {
  let sizeValue = e.target.value;
  const sizeTextOutput = document.querySelector(".size-output");
  sizeTextOutput.textContent = `${sizeValue} x ${sizeValue}`;

  const gridsContainer = document.querySelector(".grids-container");
  removeAllChildren(gridsContainer);

  setUpGrid(sizeValue);
}
function initializeEventLoaders() {
  const clearGridBtn = document.querySelector(".control-btn.clear");
  clearGridBtn.addEventListener("click", clearGrid);

  const selectableActionBtn = document.querySelectorAll(
    ".control-btn.selectable"
  );
  selectableActionBtn.forEach((btn) => {
    btn.addEventListener("click", selectActionBtn);
  });

  const sizeSlider = document.querySelector(".slider");
  sizeSlider.addEventListener("change", changeGridSize);
}

window.onload = function () {
  setUpGrid();
  initializeEventLoaders();
};
