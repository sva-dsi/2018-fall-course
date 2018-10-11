/**
 * step 3: a line from data
 */

// 3.1 create an empty object with empty arrays for you x and y
var mouseData = {
	x:[],
	y:[]
}


function setup() {
	createCanvas(600, 600);

	// 3.2 fill your x and y arrays with data
	// your x will be sequential: 0, 1, 2, 3, 4, 5...
	// your y will be random numbers
	// NOTE: in real life, you would have your real data here
	for(var i = 0; i < width; i++){
		mouseData.x.push(i);
		mouseData.y.push(random(height/2 - 50, height/2 + 50))
	}

}

function draw() {
	background(255, 255, 255);

	// 3.3 use a for loop to loop through all the values in x and y
	// notice for our line, we are using coordinate pairs:
	// [i] and [i+1] for the next value in the loop
	for(var i= 0; i < mouseData.x.length - 1; i++){
		line(mouseData.x[i], mouseData.y[i], mouseData.x[i+1], mouseData.y[i+1])
	}

}

// function mousePressed(){
// 	print("adding: ", mouseX + " " + mouseY, " to mouseData");
// 	mouseData.x.push(mouseX)
// 	mouseData.y.push(mouseY)
// }
