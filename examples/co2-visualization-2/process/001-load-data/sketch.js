/**
 * step 2: use the preload function to add data
 */

// 2.1 initialize a variable in the global scope to store our data table
var myTable;
// 2.5 initialize a variable in the global scope to store our JSONized data
var myCo2Data;

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
	print(myCo2Data)

}

function draw() {
	background(255, 255, 255);
}
