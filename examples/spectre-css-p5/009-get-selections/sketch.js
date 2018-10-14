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
}

function draw() {
	background(200);

}
