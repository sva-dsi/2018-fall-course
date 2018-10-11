/**
 * step 5: add in your input for the date of birth
 if you see the documentation, api.population.io takes YYYY-MM-DD
 */

// 1.1 create placeholder variables for your country inputs
var countryAInput;
var countryBInput;

// 2.1 create a placeholder to hold your button
var submitButton;

// 3.1 create a placeholder to hold your dropdown menu
var selectSex;

// 4.1 create a placeholder to hold your paragraph text
var visText;

// 5.1 create a placeholder to hold your date of birth input\
var dobInput;

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

	// 3.2 create a selection dropdown;
	selectSex = createSelect();
	// 3.3 add options to the selection dropdown
	selectSex.option("female");
	selectSex.option("male");


	// 4.1 add an empty paragraph which we will update on button press;
	visText = createP("🌍");

	// 5.2 assign a new input for our dob with a default value of 1980-01-01
	dobInput = createInput("1980-01-01");
}


// 2.3 callback function for submitButton
// For now, we get the .value() from the input boxes
function getData(){
	print("the value of country A Input: ", countryAInput.value())
	print("the value of country A Input: ", countryBInput.value())

	// 5.3 print your Dob to the console
	print("the dob chosen: ", dobInput.value())

	// 3.4 get the selection input value as well
	print("current sex selected: ", selectSex.value())

	// 4.2 change the paragraph text to your values from your inputs
	// 5.4 add your Dob to the
	visText.html(countryAInput.value() + " vs. " + countryBInput.value() +
	"<br>" + selectSex.value() +
	"<br>" + dobInput.value() );
}


function draw() {
	// 0.1 add in a greyish background for now
	background(200, 200, 200);

}
