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
let circleData = [];

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
  // stuff some data in there
  // we make a 50 random points with random Points
  // between 500, and 2000 - clearly larger than our drawingArea
  for(let i = 0; i < 50; i++){
    let randomX = d3.randomUniform(500, 2000)()
    let randomY = d3.randomUniform(500, 2000)()
    let randomRadius = d3.randomUniform(6, 20)()
    let randomColor = "#E8FDF5"

    if(randomRadius < 10){
      randomColor = "#E8FDF5"
    } else if( randomRadius >= 10 && randomRadius <=16 ){
      randomColor = "#FFDFDF"
    }else{
      randomColor = "#FFFCEB"
    }
    // append to circleData
    circleData.push({x:randomX, y:randomY, radius:randomRadius, color:randomColor})
  }

  // get the min and max in the x and y directions
  let xMax = d3.max(circleData.map( (d) => d.x ))
  let yMax = d3.max(circleData.map( (d) => d.y ))
  // create a scaling function to map our large data numbers to fit our drawingArea
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

  /**
   *  Create a legend on top and right
   */
  // drawingArea
  //   .append("g")
  //   .attr("class", "xAxis top")
  //   .call(d3.axisTop(xScale))

  // drawingArea
  //   .append("g")
  //   .attr("class", "yAxis right")
  //   .attr("transform", `translate(${width},0)`)
  //   .call(d3.axisRight(yScale))

  /**
   *  Create a legend on bottom and left
   */
   // NOTE: axisBottom refers to where the labels are drawn
   // it still needs to be translated to the bottom of the drawingArea
  drawingArea
    .append("g")
    .attr("class", "xAxis bottom")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale))
  // Our y axis
  // the translate doesn't do anything here, just kept it in just for consistency
  drawingArea
    .append("g")
    .attr("class", "yAxis left")
    .attr("transform", `translate(0,0)`)
    .call(d3.axisLeft(yScale))
}


// set things up
setup();
// make your chart
make();
