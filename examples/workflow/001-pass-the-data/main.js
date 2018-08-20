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
let updateBtn;
let xAxis;
let yAxis;

/**
 * NOTE: we use an async/await here so we can read in our data
*/
async function setup(){
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

  xAxis = drawingArea
              .append("g")
              .attr("class", "xAxis bottom")
              .attr("transform", `translate(0,${height})`)
  yAxis = drawingArea
              .append("g")
              .attr("class", "yAxis left")
              .attr("transform", `translate(0,0)`)

  // add a button to update the viz
  updateBtn = d3.select("body").append("button")
  updateBtn
    .html("update!")
    .on("click", function(){
      console.log("clicked!")
      let newRandomCircles = [];
      for(let i = 0; i < 50; i++){
          let randomX = d3.randomUniform(500, 2000)()
          let randomY = d3.randomUniform(500, 2000)()
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
          newRandomCircles.push({x:randomX, y:randomY, radius:randomRadius, color:randomColor})
        }

      make(newRandomCircles);
    })


  circleData = await d3.json("data/circleData.json")

  return circleData
}

function make(circleData){
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
      .on("mouseover", function(){
          d3.select(this)
          .transition()
          .style("stroke-width", 6)
          .style("stroke", "red")
      })
      .on("mouseout", function(){
          d3.select(this)
          .style("stroke-width", 10)
          .transition()
          .style("stroke-width", 4)
          .style("stroke", "#F6FFFE")
      })
      .merge(drawingArea.selectAll(".myCircle"))
        .transition()
        .attr("cx", (d) => xScale(d.x) )
        .attr("cy", (d) => yScale(d.y) )
        .attr("r", (d) => d.radius)
        .style("fill", (d) => d.color)



  d3.select(".xAxis")
    .transition()
    .call(d3.axisBottom(xScale))

  d3.select(".yAxis")
    .transition()
    .call(d3.axisLeft(yScale))
}


/**
 * NOTE: we use an async/await in setup so we can
* pass the data to our make() function using .then()
*/
setup()
  .then(make);
