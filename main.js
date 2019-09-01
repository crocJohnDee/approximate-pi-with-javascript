// QuerySelectors
const canvas = document.querySelector("#draw");
const approximations = document.querySelector("#console");
const totalDarts = document.querySelector("#total-darts");
const record = document.querySelector("#record");
const ctx = canvas.getContext("2d");

// ***********************

// Get center of canvas
const centerX = canvas.offsetWidth / 2;
const centerY = canvas.offsetWidth / 2;
// ************************************

// Score keeping
let circleCount = 0;
let squareCount = 0;
let recordPI = 0;
let total = 0;
// ***********



const realPI = 3.14159265359;
let recordDiff = Math.abs(realPI - recordPI);

let arr = []; // Arr to fill 


let callDraw;
const go = () => callDraw = setInterval(draw, 100);
function draw() {
    for (let i = 0; i < 500; i++) {

        // Random numbers for X- and Y-position
        let randomX = Math.floor(Math.random() * 400);
        let randomY = Math.floor(Math.random() * 400);
        // *******************************************

        // calculate dart from center with pythagoras
        let a = centerX - randomX;
        let b = randomY - centerY;
        let c = Math.sqrt(a * a + b * b);
        // ******************************

        total++;
        if (c <= 200) {
            ctx.strokeStyle = "red";
            circleCount++;
        } else {
            squareCount++;
            ctx.strokeStyle = "white"
        }

        ctx.beginPath();
        ctx.moveTo(randomX, randomY);
        ctx.lineTo(randomX + 1, randomY + 1);
        ctx.stroke();
        //******************************* start pie */
        let pie = (4 * (circleCount / total)).toFixed(11);
        arr.push(`<p>${pie}</p>`)
        approximations.insertAdjacentHTML("afterBegin", arr[arr.length - 1]);


        let diff = Math.abs(realPI - pie)

        if (diff < recordDiff) {
            recordDiff = diff;
            recordPI = pie;
            let recordTxt = []
            // Add HighLight class
            for (let i = 0; i < pie.toString().length; i++) {
                if ([...recordPI.toString()][i] === [...realPI.toString()][i] && [...recordPI.toString()][i - 1] === [...realPI.toString()][i - 1]) {
                    recordTxt.push(`<span class="hl">${[...recordPI.toString()][i]}</span>`);
                } else {
                    recordTxt.push(`${[...recordPI.toString()][i]}`)
                }
            }
            // *****************************************************

            record.innerHTML = `${recordTxt.join("")} @ ${total}`
        }
        //******************************* end pie */

        if (approximations.childNodes.length > 21) {
            approximations.removeChild(approximations.childNodes[21]);
        }

        totalDarts.textContent = total.toLocaleString();

    }
}

function stop() {
    clearInterval(callDraw);
}
