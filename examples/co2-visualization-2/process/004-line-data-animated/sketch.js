/**
 * step 4: an animating line
 */

// 3.1 create an empty object with empty arrays for you x and y
var mouseData = {
	x:[],
	y:[]
}

// 4.1 create a counter variable and set it equal to 0
var counter = 0;

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
	// 4.4 add some opacity to the background so we can See
	// some line persistence
	background(255, 255, 255, 10);

	// 3.3 use a for loop to loop through all the values in x and y
	// notice for our line, we are using coordinate pairs:
	// [i] and [i+1] for the next value in the loop
	// for(var i= 0; i < mouseData.x.length - 1; i++){
	// 	line(mouseData.x[i], mouseData.y[i], mouseData.x[i+1], mouseData.y[i+1])
	// }

	// 4.2 notice we comment out the for loop because we only want to draw the lines
	// that are in the specific drawing frame
	line(mouseData.x[counter], mouseData.y[counter], mouseData.x[counter+1], mouseData.y[counter+1])

	// 4.3 iterate through your counter variable until we go through all our data
	if(counter < mouseData.x.length-1){
		counter++;
	} else{
		counter = 0;
	}


}
