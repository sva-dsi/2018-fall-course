/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 */

 var width = 700;
 var height = 600;
 var margin = {top:40, right: 40, bottom: 40, left: 40};
 var drawing;
 var drawingArea;
 var myData;
 var randomRadialLine;
 var xAxis;
 var yAxis;

 async function setup(){

   drawing = d3.select("#drawing").append("svg")
   drawing
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("fill", "grey")

  drawingArea = drawing.append("g")
  drawingArea
    .attr("class", "drawingArea")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


  randomRadialLine = drawingArea.append("path")
  randomRadialLine.attr("class", "myPath")

  xAxis = drawingArea.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, ${height})`)

  yAxis = drawingArea.append("g")
      .attr("class", "yAxis")

  myData = await d3.json("data/myData.json")
  myData = myData.map( (d, idx) => {
    let output = Object.assign({ts:idx}, d)
    return output
  })

   return myData
 }

 function make(myData){
   var fullCircle = 2 * Math.PI;
   var innerRadius = 100,
        outerRadius = Math.min(width, height) / 2 - 6;

    let xExtent = d3.extent( myData.map( (d) => d.ts ) )
  let yExtent = d3.extent( myData.map( (d) => d.y ) )
  xScale = d3.scaleLinear().domain([ xExtent[0] , xExtent[1] ]).range([0, width])
  yScale = d3.scaleLinear().domain([ yExtent[1] , yExtent[0] ]).range([0, height])
    var xScale = d3.scaleLinear()
        .domain([ xExtent[0] , xExtent[1] ])
        .range([0, fullCircle]);

    var yScale = d3.scaleLinear()
        .domain([ yExtent[1] , yExtent[0] ])
    		.range([innerRadius, outerRadius]);

    var lineGenerator = d3.lineRadial()
    		.angle(function(d) {return xScale(d.ts); })
    		.radius(function(d) { return yScale(d.y); })
        .curve(d3.curveNatural)


    randomRadialLine
      .attr("class", "myPath")
      .attr("d", lineGenerator(myData) )
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("transform", `translate(${width/2}, ${height/2})`)



 }

setup().then(make)
