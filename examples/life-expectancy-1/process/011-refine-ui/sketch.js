/**
 * step 11: refine the interface

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


	// 1.2 assign an input to your placeholder variables
	createP("compare the life expectancies of a: ");
	// 3.2 create a selection dropdown;
	selectSex = createSelect();
	// 3.3 add options to the selection dropdown
	selectSex.option("female");
	selectSex.option("male");

	createP("living in: ");
	countryAInput = createInput("France");
	// 11.4: create a space between the elements by using the "<br>" tag
	createP("vs. ");
	countryBInput = createInput("Japan");
	createP("born on: ");

	// 5.2 assign a new input for our dob with a default value of 1980-01-01
	dobInput = createInput("1980-01-01");

	createElement("br");

	// 2.2
	// 11.2 Create your  button after all your other inputs
	submitButton = createButton("submit request! 🚀");
	// 2.3 add a callback function to the mousePressed() event listener for submitbutton
	// we put out getData() function we define below inside here so that
	// every time our button is pressed, we can get our values from all our UI elements
	// then submit a GET request to the population.io API
	// for now it is just going to print the country input values
	submitButton.mousePressed(getData)


	// 4.1 add an empty paragraph which we will update on button press;
	// 11.3 move your paragraph after all the other elements
	visText = createP("🌍");

	// 0.1 create a fixed canvas size
	// 11.1: Create the canvas after you've created your buttons
	createCanvas(600, 600).position(300,0);

	// 8.0 don't forget to remove your loop
	noLoop();
}


// 2.3 callback function for submitButton
// For now, we get the .value() from the input boxes
function getData(){
	// 10.4 refresh the background
	background(255);

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


	// 8.1 we define our URL here
	// NOTE: we must prepend the corsEverywhere because of cross-origin blocking
	var corsEverywhere = "https://cors-anywhere.herokuapp.com/";

	// 8.2 replace your URL string with your variables: NOTE: we will have 2 api urls - one for countryA and one for countryB
	// "http://api.population.io:80/1.0/life-expectancy/total/female/France/1952-03-11/";
	var apiUrlA = "http://api.population.io:80/1.0/life-expectancy/total/" + selectSex.value() + "/" + countryAInput.value() + "/" +  dobInput.value() + "/";
	// 8.3 NOTE: the changed countryBInput
	var apiUrlB = "http://api.population.io:80/1.0/life-expectancy/total/" + selectSex.value() + "/" + countryBInput.value() + "/" +  dobInput.value() + "/";

	// 8.4 loadJSON allows us to grab our JSON data from the API at the specified URL
	// we define a makeVisualization function below to take care of our visual

	// 9.1 create a makeVisualizationA to make our specific visuals
	loadJSON(corsEverywhere + apiUrlA, makeVisualizationA)

	// 8.5 loadJSON allows us to grab our JSON data from the API at the specified URL
	// we define a makeVisualization function below to take care of our visual

	// 9.2 create a makeVisualizationB to custonmize our visuals
	loadJSON(corsEverywhere + apiUrlB, makeVisualizationB)


	// 11.X Add a title
	textAlign(CENTER,CENTER);
	textSize(20);
	fill(0);
	text("The life expectancy of a " + selectSex.value(), width/2, 20);
	text(" born in " + dobInput.value() + " in...", width/2, 50);

}

// 6.5 print the response from the API!
function makeVisualizationA(response){
	print("data from api!", response);

	// 6.6 put the number on the screen
	textAlign(CENTER, CENTER);

	// 9.1 adjust where the text is located
	textSize(20);
	fill(0);
	text( countryAInput.value() ,width*0.25, height/2 - 50 );
	text(int(response.total_life_expectancy), width*0.25, height/2 );

	// 10.2 use the number of total life expectancy to do something interesting:
	noFill();
	for(var i = 0; i < int(response.total_life_expectancy); i++){
		ellipse(width*0.25, height/2, i*4, i*4);
	}




}

// 6.5 print the response from the API!
function makeVisualizationB(response){
	print("data from api!", response);

	// 6.6 put the number on the screen
	textAlign(CENTER, CENTER);

	// 9.2 adjust where the text is located
	textSize(20);
	fill(0);
	// 11.X adding paragraph on top of the canvas
	text( countryBInput.value() ,width*0.75, height/2 - 50 );
	text(int(response.total_life_expectancy), width*0.75, height/2 );

 	// 10.2 use the number of total life expectancy to do something interesting:
	noFill();
	for(var i = 0; i < int(response.total_life_expectancy); i++){
		ellipse(width*0.75, height/2, i*4, i*4);
	}




}


function draw() {
	// 0.1 add in a greyish background for now
	background(200, 200, 200);

}
