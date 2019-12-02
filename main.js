// QuerySelectors
const canvas = document.querySelector("#draw");
let width = document.querySelector("#container").offsetWidth;
let height = document.querySelector("#container").offsetWidth;
const myConsole = document.querySelector("#console");
const totalDarts = document.querySelector("#total-darts");
const dotsIinside = document.querySelector("#dots-inside");
const result = document.querySelector("#pi-est");
const record = document.querySelector("#record");
const recordAt = document.querySelector("#record-at");
const ctx = canvas.getContext("2d");
// Ui variables
let dartsPerTurn = document.querySelector("#darts").value;
let speed = document.querySelector("#speed").value;
let colorInCircle = document.querySelector("#inCircle").value;
let colorOutCircle = document.querySelector("#outCircle").value;
// ***********************

// The one true Const
const realPI = 3.14159265359;
// **************************

// Init canvas width
canvas.width = width;
canvas.height = height;
// ********************

// Get center of canvas
let centerX = width / 2;
let centerY = height / 2;
// **********************

// Score keeping
let total = 0;
let recordPI = 0;
let circleCount = 0;
let squareCount = 0;
// *****************

let recordDiff = Math.abs(realPI - recordPI);
let arr = []; // Console

let isRunning = false;
let callDraw;
const go = () => {
  isRunning = true;
  console.log(isRunning);
  callDraw ? null : (callDraw = setInterval(draw, speed));
};
console.log(isRunning);

function draw() {
  for (let i = 0; i < dartsPerTurn; i++) {
    // Random numbers for X- and Y-position
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    // *******************************************

    // calculate dart from center with pythagoras
    let a = centerX - randomX;
    let b = randomY - centerY;
    let c = Math.floor(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
    // ******************************

    total++;
    if (c <= width / 2) {
      ctx.strokeStyle = colorInCircle;
      circleCount++;
    } else {
      squareCount++;
      ctx.strokeStyle = colorOutCircle;
    }

    ctx.beginPath();
    ctx.moveTo(randomX, randomY);
    ctx.lineTo(randomX + 1, randomY);
    ctx.stroke();
    //******************************* start pie */
    let pie = (4 * (circleCount / total)).toFixed(11);
    // arr.push(`<p>${pie}</p>`);
    // myConsole.insertAdjacentHTML("afterBegin", arr[arr.length - 1]);

    let diff = Math.abs(realPI - pie);

    if (diff < recordDiff) {
      recordDiff = diff;
      recordPI = pie;
      let recordTxt = [];
      // Add HighLight class
      for (let i = 0; i < pie.toString().length; i++) {
        if (
          [...recordPI.toString()][i] === [...realPI.toString()][i] &&
          [...recordPI.toString()][i - 1] === [...realPI.toString()][i - 1]
        ) {
          recordTxt.push(
            `<span class="hl">${[...recordPI.toString()][i]}</span>`
          );
        } else {
          recordTxt.push(`${[...recordPI.toString()][i]}`);
        }
      }
      // *****************************************************

      record.innerHTML = `${recordTxt.join("")}`;
      recordAt.innerHTML = `${total} dots`;
    }
    //******************************* end pie */

    // if (myConsole.childNodes.length > 21) {
    //   myConsole.removeChild(myConsole.childNodes[21]);
    // }
    dotsIinside.textContent = circleCount.toLocaleString();
    totalDarts.textContent = total.toLocaleString();
    result.textContent = pie.toLocaleString();
  }
}

function stop() {
  clearInterval(callDraw);
  callDraw = null;
  isRunning = false;
  console.log(isRunning);
}

window.addEventListener("resize", () => {
  width = document.querySelector("#container").offsetWidth;
  height = document.querySelector("#container").offsetWidth;

  canvas.width = width;
  canvas.height = height;

  centerX = width / 2;
  centerY = height / 2;
});

document.querySelector("#darts").addEventListener("change", e => {
  dartsPerTurn = e.target.value;
});
document.querySelector("#speed").addEventListener("change", e => {
  speed = e.target.value;
  if (isRunning) {
    stop();
    go();
  }
});

document.querySelector("#inCircle").addEventListener("change", e => {
  colorInCircle = e.target.value;
});

document.querySelector("#outCircle").addEventListener("change", e => {
  colorOutCircle = e.target.value;
});
