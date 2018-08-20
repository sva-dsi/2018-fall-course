/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 */

const width = 720;
const height = 600;
const margin = {top: 20, right: 40, bottom: 20, left: 40};
let drawing;
let drawingArea;
let lineData = [];
let myPath;

async function setup(){
  // create your drawing area and add it to the page
  // NOTE: we have a <div id="drawing"></div> on index.html
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

  // send some data to lineData
  lineData.push({x: 100 ,y: 100 })
  lineData.push({x: 100 ,y: 200 })
  lineData.push({x: 300 ,y: 50 })
  lineData.push({x: 350 ,y: 250 })

  // click to add some data!
  drawing.on("click", ()=>{
    lineData.push({x:d3.randomUniform(margin.left, width - margin.left)(),y: d3.randomUniform(margin.top, height - margin.top)() })
    make(lineData)
  })

  // NOTE: THIS IS NEW
  // we append our path in setup since
  // we are just adding data to it later
  myPath = drawingArea.append("path")


  return lineData

}

function make(){

  // NOTE: THIS IS NEW
  // d3 line generator!
  let lineGenerator = d3.line()
        .x( (d) => d.x )
        .y( (d) => d.y )
        .curve(d3.curveNatural)

  // NOTE: myPath is a created path in setup().
  myPath
    .style("stroke-width", 10)
    .transition()
    .duration(1000)
    .attr("d", lineGenerator(lineData) )
    .attr("class", "myPath")
    .style("stroke", "tomato")
    .style("stroke-width", 4)
    .style("fill", "none")


}

setup().then(make)
