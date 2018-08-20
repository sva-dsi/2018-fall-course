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

  // create an empty array
  let circleData = [];
  // stuff some data in there
  // NOTE: what about writing this as a loop, eh?
  for(let i = 0; i < 50; i++){
    let randomX = d3.randomUniform(0, width)()
    let randomY = d3.randomUniform(0, height)()
    let randomRadius = d3.randomUniform(6, 30)()
    let randomColor = "#E8FDF5"

    if(randomRadius < 10){
      randomColor = "#E8FDF5"
    } else if( randomRadius >= 10 && randomRadius <=20 ){
      randomColor = "#FFDFDF"
    }else{
      randomColor = "#FFFCEB"
    }
    // append to circleData
    circleData.push({x:randomX, y:randomY, radius:randomRadius, color:randomColor})
  }

  console.log(circleData)

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
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.radius)
      .style("fill", (d) => d.color)
      .style("stroke", "#F6FFFE")
      .style("stroke-width", 4)

}


// set things up
setup();
// make your chart
make();
