// https://en.wikipedia.org/wiki/Chaos_game

// setup the 3 vertices of the triangle
// vertex 0
let a = new Vector(width / 2, 0);
// vertex 1
let b = new Vector(width / 6, height);
// vertex 2
let c = new Vector(width - width / 6, height);

// get a vector randomly on the canvas
// this vector gonna be moved following the law of the chaos game
let v = new Vector(getRandom(0, width), getRandom(0, height), true);

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


function draw() {
    // 35 is the number of point drawn by each frame animation
    // the highest the value, the fastest the draw is achieved
    for(let i = 0; i < 35; i++) {
        // selecting which vertex gonna be the refernce for the vector move
        let rNb = getRandom(0,2);
        let newX, newY;
        switch (rNb) {
            case 0:
                newX = (a.x + v.x) / 2;
                newY = (a.y + v.y) / 2;
                ctx.fillStyle = getColor(newX, newY);
                v.move(newX, newY);
                break;
            case 1:
                newX = (b.x + v.x) / 2;
                newY = (b.y + v.y) / 2;
                ctx.fillStyle = getColor(newX, newY);
                v.move(newX, newY);
                break;
            case 2:
                newX = (c.x + v.x) / 2;
                newY = (c.y + v.y) / 2;
                ctx.fillStyle = getColor(newX, newY);
                v.move(newX, newY);
                break;
        }
        v.display(ctx, 1)
    }
    // limit the number of point to be drawn
    counter++;
    if(counter < 1500) {
        window.requestAnimationFrame(draw);
    }
}
// request for the animation frame with draw callback
window.requestAnimationFrame(draw);
