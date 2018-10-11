/**
 * step 5: testing out what it means to animate in p5 with some data
 */

// 4.1 think of animations a series frames
// here we define a counter that we will use to move
// a circle across the screen
var counter = 0;

function setup() {
	createCanvas(600, 600);
}

function draw() {
	background(255, 255, 255);

	// 5.1 instead of using the counter to move the circle, use it to increase the size of the circle
	ellipse(width/2, height/2, counter, counter);

	// 4.3 60x a second increment that counter 1 unit... eventually the circle will grow beyond the canvas
	counter = counter + 1;
	// can also be written:
	// counter++;
}
