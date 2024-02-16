// Selecting DOM elements
let container = document.querySelector(".container"); // Selecting the container element
let gridBtn = document.getElementById("submit-grid"); // Selecting the submit grid button
let clearGridBtn = document.getElementById("clear-grid"); // Selecting the clear grid button
let gridWidth = document.getElementById("width-range"); // Selecting the grid width input range
let gridHeight = document.getElementById("height-range"); // Selecting the grid height input range
let colorBtn = document.getElementById("btnColor"); // Selecting the color button
let eraseBtn = document.getElementById("erase"); // Selecting the erase button
let paintBtn = document.getElementById("paint"); // Selecting the paint button
let widthValue = document.getElementById("width-value"); // Selecting the width value display element
let heightValue = document.getElementById("height-value"); // Selecting the height value display element

// Event types for mouse and touch interactions
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

// Variable to store device type (mouse or touch)
let deviceType = "";

// Flag to indicate drawing mode
let draw = false;

// Flag to indicate erase mode
let erase = false;

// Function to check if the device supports touch events
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

// Check if the device is a touch device
isTouchDevice();

// Event listener for the grid button click
gridBtn.addEventListener("click", () => {
  container.innerHTML = ""; // Clear the container before adding new grid elements
  let count = 0;
  // Create grid rows
  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    let div = document.createElement("div");
    div.classList.add("gridRow");

    // Create grid columns
    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", `gridCol${count}`);

      // Event listener for mouse or touch down event
      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        // Check if erasing or painting
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorBtn.value;
        }
      });

      // Event listener for mouse or touch move event
      col.addEventListener(events[deviceType].move, (e) => {
        // Get the element ID under the cursor
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;
        checker(elementId);
      });

      // Event listener for mouse or touch up event
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });

      div.appendChild(col);
    }
    container.appendChild(div);
  }
});

// Function to handle drawing and erasing
const checker = (elementId) => {
  let gridColumns = document.querySelectorAll(".gridCol");
  gridColumns.forEach((element) => {
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorBtn.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
};

// Event listener for clearing the grid
clearGridBtn.addEventListener("click", () => {
  container.innerHTML = ""; // Clear the container
});

// Event listener for eraser button click
eraseBtn.addEventListener("click", () => {
  erase = true; // Set erase flag to true
});

paintBtn.addEventListener("click", () => {
  erase = false; // Set erase flag to false
});

gridWidth.addEventListener("click", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value; // Update width value display
});

gridHeight.addEventListener("click", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value; // Update height value display
});

// Initialize grid width and height values on page load
window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
};
