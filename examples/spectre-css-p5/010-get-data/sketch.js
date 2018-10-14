var countryAInput;
var countryBInput;
var sexSelect;
var dobInput;
var submitButton;

function setup() {
	// note we push our canvas into the div we called #myCanvas
	createCanvas(600, 600).parent("myCanvas");


	// We use the select function in the p5.dom library
	// to access the values that will be input there;
	countryAInput = select("#countryA");
	countryBInput = select("#countryB");
	sexSelect = select("#sexSelect");
	dobInput = select("#dobInput");
	submitButton = select("#submitButton");

	submitButton.mousePressed(getData)

	// stop the loop
	noLoop();
}


function getData(){
	print("countryA: ", countryAInput.value());
	print("countryB: ", countryBInput.value());
	print("sex: ", sexSelect.value());
	print("date of birth: ", dobInput.value());

	// refresh the background
	background(200);

		// 8.1 we define our URL here
	// NOTE: we must prepend the corsEverywhere because of cross-origin blocking
	var corsEverywhere = "https://cors-anywhere.herokuapp.com/";

	// 8.2 replace your URL string with your variables: NOTE: we will have 2 api urls - one for countryA and one for countryB
	// "http://api.population.io:80/1.0/life-expectancy/total/female/France/1952-03-11/";

	var apiUrlA = "http://api.population.io:80/1.0/life-expectancy/total/" + sexSelect.value() + "/" + countryAInput.value() + "/" +  dobInput.value() + "/";

	var apiUrlB = "http://api.population.io:80/1.0/life-expectancy/total/" + sexSelect.value() + "/" + countryBInput.value() + "/" +  dobInput.value() + "/";


	loadJSON(corsEverywhere + apiUrlA, makeVisualizationA)

	loadJSON(corsEverywhere + apiUrlB, makeVisualizationB)


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
	background(200);

}
