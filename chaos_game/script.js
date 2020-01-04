// https://en.wikipedia.org/wiki/Chaos_game
const phi = (1 + Math.sqrt(5)) / 2;

// init an array for triangle
const triangle = [
    new Vector(width / 2, 0),
    new Vector(width / 6, height),
    new Vector(width - width / 6, height)
];
// end triangle

// init an array for square
const square = [
    new Vector(width / 4, 0),
    new Vector(width / 4 + width / 2, 0),
    new Vector(width / 4 + width / 2, height),
    new Vector(width / 4, height)
];
// end square

// init an array for pentagon
const pentagon = [];

//for the n-flake
//let center = new Vector(width * 1.015, height * 1.1);

let center = new Vector(width / 2, (height / 2) + 25);
let angle = Math.PI * 2 / 6.6;

for(let i = 0; i < 5; i++) {
    let vP = new Vector(width / 2, height / 2 + 350);
    vP.rotateAround(center, angle);
    pentagon.push(vP);
    //vP.display(ctx, 2);
    angle += (Math.PI * 2) / 5;
}
// end pentagon


// get a vector inside the polygon selected (triangle, square, pentagon) on the canvas
// this vector gonna be moved following the law of the chaos game
var v = new Vector(width / 2, height / 2);

let counter = 0;

// for colors of the vector
let red = 255;
let green = 255;
let blue = 255;
let alpha = 1;

function getColor(newX, newY) {
    red = (newY * 255) / height;
    green = (newX * 255) / width;
    // make color pinky / blue
    blue = (((newY * 255) / height) + ((newX * 255) / width));
    // make color more green / orange
    //blue = ((((newY * 255) / height) + ((newX * 255) / width)) * 255) / (width + height);
    return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

// seting the vector jump ratio

// for the n-flake with pentagon array
// let t = 1;
// let k = Math.PI;

// for the Sierpinski triangle with triangle array
let t = 1;
let k = 2;

let previousVertex = 0;
clear(0,0, 1);

function draw() {
    let vertices = triangle;
    // 35 is the number of point drawn by each frame animation
    // the highest the value, the fastest the draw is achieved
    for(let i = 0; i < 35; i++) {
        // selecting which vertex gonna be the refernce for the vector move
        let vertexIndex;
        // for the n-flake and the Sierpinski triangle
        vertexIndex = getRandom(0,vertices.length-1);

        // for a fractal inside a pentagon
        // do {
        //     vertexIndex = getRandom(0,vertices.length-1);
        // } while(previousVertex == vertexIndex);

        previousVertex = vertexIndex
        let newX, newY;
        // setting the new pos
        newX = (vertices[vertexIndex].x + v.x) * (t / k);
        newY = (vertices[vertexIndex].y + v.y) * (t / k);
        ctx.fillStyle = getColor(newX, newY);
        v.move(newX, newY);
        v.display(ctx, 1)
    }
    // limit the number of point to be drawn
    counter++;
    if(counter < 2000) {
        window.requestAnimationFrame(draw);
    }
}
// request for the animation frame with draw callback
window.requestAnimationFrame(draw);
