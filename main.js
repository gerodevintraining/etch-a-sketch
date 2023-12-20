const DEFAULT_COLOR = "#000000";
let currentColor = "";
const sketchArea = document.querySelector(".etch-a-sketch");
const column = document.createElement("div");
column.classList.add("column");
const square = document.createElement("div");
square.classList.add("square");
const menuButtons = document.querySelectorAll(".menu-buttons");
const colorPicker = document.querySelector(".color-picker");
const colorButton = document.querySelector(".color");
const rainbowButton = document.querySelector(".rainbow")
const eraserButton = document.querySelector(".eraser");
const clearButton = document.querySelector(".clear")
const gridSize = document.querySelector("#grid-size");
const currentSize = document.querySelector(".current-size");
let mouseDown = false;
let eraser = false;

document.addEventListener("mousedown", setMouseDown)
document.addEventListener("mouseup", setMouseUp)

function setSquares(size) {
    currentSize.textContent = `${size} x ${size}`
    if (sketchArea.firstChild) removeSquares();
    for (let i = 0; i < size; i++) {
        column.appendChild(square.cloneNode());
    }
    for (let i = 0; i < size; i++) {
        sketchArea.appendChild(column.cloneNode(true));
    }
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(item => {
        item.addEventListener("mouseover", setSquareColor);
        item.addEventListener("mousedown", setSquareColor);
    });
    clearButton.addEventListener("click", () => clearGrid(allSquares))
}

function removeSquares() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
    while (column.firstChild) {
        column.removeChild(column.firstChild);
    }
}

function setMouseDown() {
    mouseDown = true
}

function setMouseUp() {
    mouseDown = false
}

function setSquareColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    if (eraser) {
        e.target.style.backgroundColor = "transparent";
    } else if (!eraser) {
        if (rainbowButton.classList.contains("active")) {
            e.target.style.backgroundColor = setRandomColor();
        } else if (currentColor === "") {
            e.target.style.backgroundColor = DEFAULT_COLOR;
        } else {
            e.target.style.backgroundColor = currentColor;
        }
    }
}

colorPicker.addEventListener("input", (e) => {
    eraser = false;
    currentColor = e.target.value;
})

colorButton.addEventListener("click", (e) => {
    removeActiveClass();
    e.target.classList.add("active");
    eraser = false;
    currentColor = colorPicker.value;
})

rainbowButton.addEventListener("click", (e) => {
    removeActiveClass();
    e.target.classList.add("active");
})

eraserButton.addEventListener("click", (e) => {
    removeActiveClass();
    e.target.classList.add("active");
    eraser = true;
})

function clearGrid(array) {
    array.forEach(element => {
        element.style.backgroundColor = "transparent";
    });
}

function removeActiveClass() {
    menuButtons.forEach(button => { 
        if (button.classList.contains("active")) button.classList.remove("active")
    })
}

function setRandomColor() {
    let rgb = [0, 0, 0];
    rgb = rgb.map(color => color = Math.floor((Math.random() * 256)))
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

gridSize.addEventListener("change", (e) => {
    const size = e.target.value;
    setSquares(size);
})

setSquares(gridSize.value)