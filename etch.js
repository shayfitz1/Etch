const canvasTop = document.querySelector(".canvas-top");
const shakeButton = document.querySelector("#shake-button");
const widthSlider = document.querySelector("#width-slider");
const checkbox = document.querySelector("input[type='checkbox']");
const speedSlider = document.querySelector("#speed-slider");
const arrowButtons = document.querySelectorAll(".directions p");
const styleButton = document.querySelector("#style-button");
const styleContainer = document.querySelector(".style-container");
let mouseDownInterval;

let randomX = Math.random() * canvasTop.width;
let randomY = Math.random() * canvasTop.height;
let moveAmount = 10;
let hue = 0;
let lightness = 50;

const ctx = canvasTop.getContext("2d");
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 25;

ctx.beginPath(); //starts the drawing
ctx.moveTo(randomX, randomY);
ctx.lineTo(randomX, randomY);
ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;

function draw(arrow){
    ctx.beginPath();
    ctx.moveTo(randomX, randomY);
    switch (arrow) {
        case "ArrowRight":
            randomX += moveAmount;
            ctx.lineTo(randomX, randomY);
            hue+=10;
            ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
            ctx.stroke();
            break;
        case "ArrowLeft":
            randomX -= moveAmount;
            ctx.lineTo(randomX, randomY);
            hue+=10;
            ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
            ctx.stroke();
            break;
        case "ArrowUp":
            randomY -= moveAmount;
            ctx.lineTo(randomX, randomY);
            hue+=10;
            ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
            ctx.stroke();
            break;
        case "ArrowDown":
            randomY += moveAmount;
            ctx.lineTo(randomX, randomY);
            hue+=10;
            ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
            ctx.stroke();
            break;
        default:
            break;
    }
}

window.addEventListener("keydown", function(e){
    if (e.key.includes("Arrow")){
        draw(e.key);
    }
})

//when arrow is pressed down, direction is set to whichever arrow being pressed
//while button is pressed, interval runs the draw function every 100 ms until mouseup.
arrowButtons.forEach(function(arrow){
    arrow.addEventListener("touchstart", function(e){
        let direction = e.target.dataset.direction;
        mouseDownInterval = setInterval(function(){
            draw(direction);
        },100);
    });
});

arrowButtons.forEach(function(arrow){
    arrow.addEventListener("touchend", function(){
        clearInterval(mouseDownInterval);
    });
});


shakeButton.addEventListener("click", function(){
    canvasTop.classList.add("shake");
    setTimeout(function(){
        canvasTop.classList.remove("shake");
        ctx.clearRect(0, 0, canvasTop.width, canvasTop.height);
    },500)
})

widthSlider.addEventListener("change", () => ctx.lineWidth = Number(widthSlider.value));
speedSlider.addEventListener("change", () => moveAmount = Number(speedSlider.value));
checkbox.addEventListener("click", () => checkbox.checked === true ? lightness = 0 : lightness = 50);

if (document.body.offsetWidth <= 1024){
    let halfWay = document.body.offsetWidth/2;
    styleButton.style.top = `${canvasTop.offsetHeight - styleButton.offsetHeight-3}px`;
    styleButton.style.left = `${halfWay - (styleButton.offsetWidth/2)}px`;
    window.addEventListener("click", function(e){
    e.target.id === "style-button" ? styleContainer.classList.toggle("visible") : styleContainer.classList.remove("visible");
    })
}