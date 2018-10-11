/**
 * step 7: refine the size of the circle
 */

// 2.1 initialize a variable in the global scope to store our data table
var myTable;
// 2.5 initialize a variable in the global scope to store our JSONized data
var myCo2Data;

// 3.1 define an empty array to hold our filtered data
var myCo2DataFiltered = [];

// 6.1 define your counter;
var counter = 0;

// 7.1 define the min and max of the filtered co2 data
var minCo2ppm;
var maxCo2ppm;

function preload(){
	// 2.2 initialize and define a variable in the local scope for where our data path is. In this case it is living at this url
	var dataUrl = 'https://raw.githubusercontent.com/sva-dsi/2018-fall-course/master/data/SCRIPPS-CO2-1958-present/monthly_in_situ_co2_mlo-derived.csv'

	// 2.3 assign your data to your myTable varialble living in the global scope
	// this will allow us to access the data in the setup(), draw(), and any other function() in this program
	myTable = loadTable(dataUrl, 'csv', 'header');
}

function setup() {
	createCanvas(600, 600);

	// 2.4 print our data to make sure we have something and to get an impression of the data
	print("the number of rows in this data table: ", myTable.getRowCount())
	print(myTable.getColumn("CO2_filled_ppm"))

	// 2.5 we are going to do something special here:
	// p5 comes with a function to convert a csv table into a JSON object.
	// this is a nice method because it allows us to easily access our data
	// using the handy dot (.) notation
	myCo2Data = myTable.getObject();
	// 2.6 print it out to see what's inside
	print("myCo2Data as JSON: ", myCo2Data)

	// 3.1 loop through all our data and subset the co2 data that is above -99.99
	for(var i = 0; i < Object.keys(myCo2Data).length-1; i++){
		// convert the co2 data from a string to a floating type: e.g. "380.1" ==> 380.1
		var convertedCo2String = float(myCo2Data[i].CO2_filled_ppm)
		// if the co2 ppm value is above 200 add that entire object to the myCo2DataFiltered array
		if( convertedCo2String > 200 ){
			myCo2DataFiltered.push(myCo2Data[i])
		}
	}

	print("original data was this long: ", Object.keys(myCo2Data).length)
	print("filtered data is this long: ", myCo2DataFiltered.length)

	// 7.1 get the min and max of the co2 data;
	// to do so, we need to create an empty array with only our co2 values
	// we loop through our filtered data of json objects and get our co2 values
	var tempCo2 = []
	for(var i = 0; i < myCo2DataFiltered.length-1; i++){
		// convert the co2 data from a string to a floating type: e.g. "380.1" ==> 380.1
		tempCo2.push(myCo2DataFiltered[i].CO2_filled_ppm)
	}

	// 7.2 we use the min and max functions to get those values from the tempCo2 array
	// NOTE: min and max take an array
	minCo2ppm = min(tempCo2);
	maxCo2ppm = max(tempCo2);


}

function draw() {
	background(255, 255, 255);

	// 6.2 each loop through draw, use the counter variable to get the values of interest
	// this will give us the animation illusion
	// we convert our floating type to int because we can't render on subpixels

	// 7.1 / 7.2 / 7.3 / 7.4 map the data to another scale to emphasize data
	// here we scale from our min and max values to 10 to 40 pixel values
	// that will be scaled up using our circle area calculation in 7.4
	var co2Val = map(int(myCo2DataFiltered[counter].CO2_filled_ppm), minCo2ppm, maxCo2ppm, 10, 40);

	// 7.4 convert CO2 value to area calculation
	// area of a circle = radius^2 * PI
	co2Val = int(sq(co2Val/2))
	// 6.3 draw your ellipse
	noFill();
	ellipse(width/2, height/2, co2Val, co2Val);


	// 6.2 increment the counter to loop through our data
	// if it is less than our data length, keep going up
	// if not, then set it back to 0
  if(counter < myCo2DataFiltered.length-1){
    counter++;
  } else{
  	counter = 0;
  }
}
