const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext('2d');
const shakeBtn = document.querySelector(".shake");
const MOVE_AMOUNT = 10;

//Setting canvas for drawing

const width = canvas.width;
const height = canvas.height;

//Create random x and y starting points on canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap ='round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; //from mothereffinghsl.com

ctx.beginPath(); //start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//write a draw function 
function draw({ key }) {
    //increment the hue
    hue = hue + 3;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    //start the path
    ctx.beginPath();
    ctx.moveTo(x,y);
    //move our x and y values depending on what the user did
    switch (key) {
        case "ArrowUp" :
            y = y - MOVE_AMOUNT;
            break;
            case "ArrowRight" :
            x = x + MOVE_AMOUNT;
            break;
            case "ArrowDown" :
            y = y + MOVE_AMOUNT;
            break;
            case "ArrowLeft" :
            x = x - MOVE_AMOUNT;
            break;
        default:
            break;
    } 
    ctx.lineTo(x,y);
    ctx.stroke();
}

//write a handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')) { //making sure that it wil work only with four arrow keys 
    e.preventDefault();
    draw({ key: e.key }); 
    }
}

// clear / skahe function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height); //to clearCanvas after shaking
    canvas.addEventListener('animationend', function() {
        canvas.classList.remove('shake');
    }, 
    { once: true }
    )
};

//listen for arrow keys 
window.addEventListener('keydown', handleKey);
shakeBtn.addEventListener('click', clearCanvas);





