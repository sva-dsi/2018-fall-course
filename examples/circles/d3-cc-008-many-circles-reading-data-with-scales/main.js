/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 */


const width = 720;
const height = 600;
const margin = {top: 20, right: 40, bottom: 40, left: 40};
let drawing;
let drawingArea;
let xScale;
let yScale;
// now this will be coming from our /data/circleData.json
let circleData;

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

/**
 * NOTE: we use an async/await here so we can read in our data
*/
async function make(){
  circleData = await d3.json("data/circleData.json")

  console.log(circleData)
  // get the max of the x and y values
  let xMax = d3.max(circleData.map( (d) => d.x ))
  let yMax = d3.max(circleData.map( (d) => d.y ))
  // create a scaling function in the x and y direction to
  // map the values to our current drawing area
  xScale = d3.scaleLinear().domain([0, yMax + 500]).range([0, width ])
  yScale = d3.scaleLinear().domain([ yMax + 500, 0]).range([0, height])

  /**
  * This reads:
  * Dear drawingArea, do any objects with the ".myCircle" class exist yet?
  * if not, then I am going to make some now using some data.
  * In order to make some circles with the ".myCircle" class,
  * take our circleData and for every and object in circleData:
    --> append a new circle
    --> give it the class, "myCircle"
    --> get the "x" value from the data object called "x"
    --> get the "y" value from the data object called "y"
    --> get the "r" value from the data object called "radius"
    --> get the "fill" value from the data object called "color"
    --> apply the same stroke and strokewidth
  */

  // NOTE: we added xScale() and yScale() to scale our data to the size of
  // our drawing area
  drawingArea.selectAll(".myCircle")
    .data(circleData)
    .enter()
    .append("circle")
      .attr("class", "myCircle")
      .attr("cx", (d) => xScale(d.x) )
      .attr("cy", (d) => yScale(d.y) )
      .attr("r", (d) => d.radius)
      .style("fill", (d) => d.color)
      .style("stroke", "#F6FFFE")
      .style("stroke-width", 4)

  drawingArea
    .append("g")
    .attr("class", "xAxis bottom")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale))

  drawingArea
    .append("g")
    .attr("class", "yAxis left")
    .attr("transform", `translate(0,0)`)
    .call(d3.axisLeft(yScale))
}


// set things up
setup();
// make your chart
// NOTE: notice how we use an async/await functionality
make();
