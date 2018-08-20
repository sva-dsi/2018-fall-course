/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 */


const width = 720;
const height = 600;
const margin = {top: 20, right: 40, bottom: 20, left: 40};
let drawing;
// NOTE: we add a new variable for our drawingArea group "g"
let drawingArea;

function setup(){
  // create your drawing area and add it to the page
  drawing = d3.select("#drawing").append("svg");
  // set the size of your drawing area
  // note we add some margin space now
  drawing
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#D8D8D8")

  // add a group to your drawing
  // we usd our margin space for this svg group, "g"
  drawingArea = drawing.append("g")
  // move your drawing area to have padding
  // don't add .style here unless you want
  // those styles to propogate down
  drawingArea
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

}

function make(){

  let circle1 = drawingArea.append("circle")
  circle1.attr("class", "myCircle")
  circle1.attr("cx", width/2)
  circle1.attr("cy", height/2)
  circle1.attr("r", 50)
  circle1.style("fill", "#E8FDF5")
  circle1.style("stroke", "#F6FFFE")
  circle1.style("stroke-width", 4)

  // can also be written
  /**
  let circle1 = drawingArea.append("circle")
  circle1
    .attr("class", "myCircle")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", 50)
    .style("fill", "tomato")
    .style("stroke", "black")
    .style("stroke-width", 4)
  */

}


// set things up
setup();
// make your chart
make();
