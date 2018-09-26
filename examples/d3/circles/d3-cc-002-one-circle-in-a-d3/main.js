/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 */


const width = 720;
const height = 600;
const margin = {top: 20, right: 40, bottom: 20, left: 40};
let drawing;

function setup(){
  // create your drawing area and add it to the page
  // NOTE: we have a <div id="drawing"></div> on index.html
  drawing = d3.select("#drawing").append("svg");
  // set the size of your drawing area
  drawing
    .attr("width", width)
    .attr("height", height)
    .style("background", "#D8D8D8")

}

function make(){

  let circle1 = drawing.append("circle")
  circle1.attr("class", "myCircle")
  circle1.attr("cx", width/2)
  circle1.attr("cy", height/2)
  circle1.attr("r", 50)
  circle1.style("fill", "#E8FDF5")
  circle1.style("stroke", "#F6FFFE")
  circle1.style("stroke-width", 4)


}


// set things up
setup();
// make your chart
make();
