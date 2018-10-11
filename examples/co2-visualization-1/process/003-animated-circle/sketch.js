/**
 * step 4: testing out what it means to animate in p5 with some data
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

	// 4.2 draw the circle at the position of the counter and 1/2 of the screen height
	ellipse(counter, height/2, 100, 100);

	// 4.3 60x a second increment that counter 1 unit... eventually the circle will drive off the screen
	counter = counter + 1;
	// can also be written:
	// counter++;
}
