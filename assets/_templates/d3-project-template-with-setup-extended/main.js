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
 var xAxis;
 var yAxis;
 var myPath;
 var lineGenerator;
 var myPoints;
 // your data
 var myData;
 // your scales
 var xScale;
 var yScale;

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

  // your x axis
  xAxis = drawingArea.append("g")
  xAxis
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)
  // your y axis
  yAxis = drawingArea.append("g")
  yAxis
    .attr("class", "yAxis")

  // TODO:
  // add your d3 data selection placeholders
  // a path!
  myPath = drawingArea.append("path")
  myPath
    .attr("class", "myPath")

  // some points!
  myPoints = drawingArea.selectAll(".myPoints")

  // read in your data from wherever it lives
  myData = await d3.json("data/myData.json")

  // send your data to the make() function once setup is complete
  return myData
 }

 function make(myData){

   /**
    * a place to handle your scales
    */
  // returns [min, max]
  let xExtent = d3.extent( myData.map( (d) => d.x ) )
  let yExtent = d3.extent( myData.map( (d) => d.y ) )
  xScale = d3.scaleLinear().domain([ xExtent[0] , xExtent[1] ]).range([0, width])
  yScale = d3.scaleLinear().domain([ yExtent[1] , yExtent[0] ]).range([0, height])

  /**
   * where your main viz stuff goes
   */
   // path line generator can go here too
  lineGenerator = d3.line()
  lineGenerator
    .x( (d) => xScale(d.x) )
    .y( (d) => yScale(d.y) )
    .curve(d3.curveNatural)
    //d3.curveLinear
    //d3.curveStep

   myPath
    .attr("d", lineGenerator(myData) )
    .attr("class", "myPath")
    .style("stroke", "#FFFF00")
    .style("stroke-width", 1)
    .style("fill", "none")


  myPoints
    .data(myData)
    .enter()
      .append("circle")
      .attr("class", "myPoints")
      .attr("cx", (d) => xScale(d.x) )
      .attr("cy", (d) => yScale(d.y) )
      .attr("r", (d) => (3.14 * Math.pow(d.z, 2))*0.001 )
      .style("fill", "#D5008F")
      .style("stroke", "#FFFF00")
      .style("opacity", 0.9)
      .style("stroke-width", 2)
    .merge(myPoints)
      .transition()
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y) )
      .attr("r", (d) => (3.14 * Math.pow(d.z, 2))*0.001 );

  myPoints.exit().remove();



  /**
   * a place to handle with your axes
   */
   drawingArea.select(".xAxis")
    .call(d3.axisBottom(xScale))
    .style("stroke", "#F6FFFE")

   drawingArea.select(".yAxis")
    .call(d3.axisLeft(yScale))
    .style("stroke", "#F6FFFE")

 }

setup().then(make)
