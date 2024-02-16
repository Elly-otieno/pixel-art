let container = document.querySelector(".container");
let gridBtn = document.getElementById("submit-grid");
let clearGridBtn = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorBtn = document.getElementById("btnColor");
let eraseBtn = document.getElementById("erase");
let paintBtn = document.getElementById("paint");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

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

let deviceType = "";
let erase = false; //flag to initialise erase
let paint = false; //flag to initialise paint

//type of touch
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
isTouchDevice();

gridBtn.addEventListener("click", () => {
  container.innerHTML = "";
  let count = 0;
  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    let div = document.createElement("div");
    div.classList.add("gridRow");

    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", `gridCol${count}`);
      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorBtn.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;
        checker(elementId);
      });
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });
      div.appendChild(col);
    }
    container.appendChild(div);
  }
});

const checker = (elementId) => {
  let gridColumns = document.querySelectorAll(".gridCol");
  gridColumns.forEach((element) => {
    if (elementId == elementId) {
      if (draw && !erase) {
        element.style.backgroundColor = colorBtn.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
};
clearGridBtn.addEventListener("click", () => {
  container.innerHTML = "";
});
erase.addEventListener("click", () => {
  erase = true;
});
paint.addEventListener("click", () => {
  erase = false;
});
gridWidth.addEventListener("click", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});
gridHeight.addEventListener("click", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
};
