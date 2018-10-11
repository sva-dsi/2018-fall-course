/**
 * step 2: add a button to submit your input values
 */

// 1.1 create placeholder variables for your country inputs
var countryAInput;
var countryBInput;

// 2.1 create a placeholder to hold your button
var submitButton;

function setup() {
	// 0.1 create a fixed canvas size
	createCanvas(600, 600);

	// 1.2 assign an input to your placeholder variables
	countryAInput = createInput("France");
	countryBInput = createInput("Japan");

	// 2.2
	submitButton = createButton("submit request! 🚀");

	// 2.3 add a callback function to the mousePressed() event listener for submitbutton
	// we put out getData() function we define below inside here so that
	// every time our button is pressed, we can get our values from all our UI elements
	// then submit a GET request to the population.io API
	// for now it is just going to print the country input values
	submitButton.mousePressed(getData)
}


// 2.3 callback function for submitButton
// For now, we get the .value() from the input boxes
function getData(){
	print("the value of country A Input: ", countryAInput.value())
	print("the value of country A Input: ", countryBInput.value())
}


function draw() {
	// 0.1 add in a greyish background for now
	background(200, 200, 200);

}
