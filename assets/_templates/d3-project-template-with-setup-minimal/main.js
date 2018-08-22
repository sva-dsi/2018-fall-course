/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 */

 var width = 700;
 var height = 600;
 var margin = {top:40, right: 40, bottom: 40, left: 40};
 // your svg selections
 var drawing;
 var drawingArea;
 // your data
 var myData;


 async function setup(){
   // your base svg container
   drawing = d3.select("#drawing").append("svg")
   drawing
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#001B44")
  // your drawing area - nice margins!
  drawingArea = drawing.append("g")
  drawingArea
    .attr("class", "drawingArea")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  // read in data from somewhere or make some here
  myData = await d3.json("data/blah.json") || [];

  // send your data to the make() function once setup is complete
  return myData
 }

 function make(myData){
  // add scales here

  // do your main viz here

  // add axes

 }

setup().then(make)
