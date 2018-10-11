/**
 * step 1: add your input boxes
 */

// 1.1 create placeholder variables for your country inputs
var countryAInput;
var countryBInput;

function setup() {
	// 0.1 create a fixed canvas size
	createCanvas(600, 600);

	// 1.2 assign an input to your placeholder variables
	countryAInput = createInput("France");
	countryBInput = createInput("Japan");
}

function draw() {
	// 0.1 add in a greyish background for now
	background(200, 200, 200);

}
