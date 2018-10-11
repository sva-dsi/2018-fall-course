/**
 * step 7: refine the chart
 */

// 2.1 initialize a variable in the global scope to store our data table
var myTable;
// 2.5 initialize a variable in the global scope to store our JSONized data
var myCo2Data;

// 3.1 define an empty array to hold our filtered data
var myCo2DataFiltered = [];

// 5.1 define the min and max of the filtered co2 data
// 5.1.1 define the min and max of the filtered dates
var minCo2ppm;
var maxCo2ppm;
var minDate;
var maxDate;

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

		// 5.1 get the min and max of the co2 data;
	// to do so, we need to create an empty array with only our co2 values
	// we loop through our filtered data of json objects and get our co2 values
	// likewise we add our dates and luckily we have a nice Date_excel column to work with
	var tempCo2 = []
	var tempDates = [];
	for(var i = 0; i < myCo2DataFiltered.length-1; i++){
		tempCo2.push(myCo2DataFiltered[i].CO2_filled_ppm)
		tempDates.push(myCo2DataFiltered[i].Date_excel)
	}

	// 5.2 we use the min and max functions to get those values from the tempCo2 array
	// NOTE: min and max take an array
	// for our co2
	minCo2ppm = min(tempCo2);
	maxCo2ppm = max(tempCo2);
	// for our dates
	minDate = min(tempDates);
	maxDate = max(tempDates);

	// 5.3 use the max and min values for the dates and co2 to map those values to our
	// pixel area on our screen
	for(var i = 0; i < myCo2DataFiltered.length-1; i++){
		var screen_x = map(myCo2DataFiltered[i].Date_excel, minDate, maxDate, 0, width );
		var screen_y = map(myCo2DataFiltered[i].CO2_filled_ppm, minCo2ppm, maxCo2ppm, height, 0 );
		// here we create a new key/value pair for each of our myCo2DataFiltered data {}
		myCo2DataFiltered[i].screen_x = screen_x;
		myCo2DataFiltered[i].screen_y = screen_y;
	}

}

function draw() {
	background(255, 255, 255);

	// 7.1 display header and subheader
	// via: https://editor.p5js.org/mlumley/sketches/BymM-Y9cX
	textSize(18);
	textStyle(BOLD);
	textAlign(CENTER, CENTER);
	fill(0);
	noStroke();
	text('Monthly CO2 PPM @ Mauna Loa Observatory', width / 2, height/12);
	textSize(17);
	text('1958 - 2018', width / 2, height / 8);

	// 7.2 add the stroke back in and change the text style back
	textStyle(NORMAL);
	textAlign(LEFT,LEFT);
	textSize(10);
	noFill();
	stroke(0);

	// 5.4 use the coordinates that were mapped from above to draw our line to our canvas
	strokeWeight(2);
	for(var i= 0; i < myCo2DataFiltered.length-2; i++){
		line(myCo2DataFiltered[i].screen_x, myCo2DataFiltered[i].screen_y, myCo2DataFiltered[i+1].screen_x, myCo2DataFiltered[i+1].screen_y)
	}

	// 6.1 add the x and y axes
	strokeWeight(4);
	// the x axis
	line(0, height, width, height)
	// the y axis
	line(0, 0, 0, height)

	// 6.2 add text labels every 60 values, or every 5 years (12*5)
	// notice the i+= 60;
	strokeWeight(1);
	for(var i= 0; i < myCo2DataFiltered.length-2; i += 60){
		text(myCo2DataFiltered[i].Yr, myCo2DataFiltered[i].screen_x, height - 10);
		text(myCo2DataFiltered[i].CO2_filled_ppm, 0, myCo2DataFiltered[i].screen_y);
	}

}
