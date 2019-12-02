// QuerySelectors
const canvas = document.querySelector("#draw");
const myConsole = document.querySelector("#console");
const totalDarts = document.querySelector("#total-darts");
const record = document.querySelector("#record");
const ctx = canvas.getContext("2d");

// ***********************

let width = document.querySelector("#container").offsetWidth;
let height = document.querySelector("#container").offsetWidth;
canvas.width = width;
canvas.height = height;

// Get center of canvas
let centerX = width / 2;
let centerY = height / 2;
// ************************************
console.log(centerX, centerY);

// Score keeping
let circleCount = 0;
let squareCount = 0;
let recordPI = 0;
let total = 0;
// ***********

const realPI = 3.14159265359;
let recordDiff = Math.abs(realPI - recordPI);

let arr = []; // Console

// Ui variables
let dartsPerTurn = document.querySelector("#darts").value;
let speed = document.querySelector("#speed").value;
let colorInCircle = "red";
let colorOutCircle = "white";
// **************************

let callDraw;

const go = () => (callDraw = setInterval(draw, speed));

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

      record.innerHTML = `${recordTxt.join("")} @ ${total}`;
    }
    //******************************* end pie */

    // if (myConsole.childNodes.length > 21) {
    //   myConsole.removeChild(myConsole.childNodes[21]);
    // }

    totalDarts.textContent = total.toLocaleString();
  }
}

function stop() {
  clearInterval(callDraw);
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
  stop();
  speed = e.target.value;
  go();
});

document.querySelector("#inCircle").addEventListener("change", e => {
  colorInCircle = e.target.value;
});

document.querySelector("#outCircle").addEventListener("change", e => {
  colorOutCircle = e.target.value;
});
