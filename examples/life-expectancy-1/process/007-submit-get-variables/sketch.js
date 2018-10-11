/**
 * 7: use variables to fill the api url
 */

// 6.1 add a placeholder for your submit button
var submitButton;

// 7.1 define these variables to be used in our api url
// think about how your inputs will essentiall be doing this.
var sexSelect = "female";
var dobInput = "1980-01-01";
var countryAInput = "France";

function setup() {
	createCanvas(600, 600);

	// 6.3 assign your submit button
	submitButton = createButton("get data 🚀!");
	// 6.4 on mousepressed of hte button only, get your data with getData() defined below
	submitButton.mousePressed(getData);

	// 6.0 no need for a draw loop here
	noLoop();
}


// 6.4 your getData() function makes a GET request using the loadJSON function
function  getData(){
	// 6.5 we define our URL here
	// NOTE: we must prepend the corsEverywhere because of cross-origin blocking
	var corsEverywhere = "https://cors-anywhere.herokuapp.com/";

	// 7.2 replace your URL string with your variables
	// "http://api.population.io:80/1.0/life-expectancy/total/female/France/1952-03-11/";
	var apiUrl = "http://api.population.io:80/1.0/life-expectancy/total/" + female + "/" + countryAInput + "/" + dobInput + "/";

	// 6.6 loadJSON allows us to grab our JSON data from the API at the specified URL
	// we define a makeVisualization function below to take care of our visual
	loadJSON(corsEverywhere + apiUrl, makeVisualization)
}

// 6.5 print the response from the API!
function makeVisualization(response){
	print("data from api!", response);

	// 6.6 put the number on the screen
	textAlign(CENTER, CENTER);
	text(int(response.total_life_expectancy), width/2, height/2 );
}

function draw() {
	background(200, 200, 200);

}
