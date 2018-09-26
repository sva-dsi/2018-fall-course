/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 */


const width = 720;
const height = 600;
const margin = {top: 20, right: 40, bottom: 20, left: 40};
let drawing;
let drawingArea;

function setup(){
  // create your drawing area and add it to the page
  drawing = d3.select("#drawing").append("svg");
  // set the size of your drawing area
  drawing
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#D8D8D8")

  // add a group to your drawing
  drawingArea = drawing.append("g")
  // move your drawing area to have padding
  // don't add .style here unless you want
  // those styles to propogate down
  drawingArea
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

}

function make(){


  let circle1 = drawingArea.append("circle")
  let circle2= drawingArea.append("circle")
  let circle3 = drawingArea.append("circle")

  circle1
    .attr("class", "myCircle")
    .attr("cx", width*0.25)
    .attr("cy", height/2)
    .attr("r", 50)
    .style("fill", "#E8FDF5")
    .style("stroke", "#F6FFFE")
    .style("stroke-width", 4)

  circle2
    .attr("class", "myCircle")
    .attr("cx", width*0.5)
    .attr("cy", height/2)
    .attr("r", 50)
    .style("fill", "#FFDFDF")
    .style("stroke", "#F6FFFE")
    .style("stroke-width", 4)

  circle3
    .attr("class", "myCircle")
    .attr("cx", width*0.75)
    .attr("cy", height/2)
    .attr("r", 50)
    .style("fill", "#FFFCEB")
    .style("stroke", "#F6FFFE")
    .style("stroke-width", 4)


}


// set things up
setup();
// make your chart
make();
