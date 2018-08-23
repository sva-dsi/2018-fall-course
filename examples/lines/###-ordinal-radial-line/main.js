/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 * https://bl.ocks.org/tlfrd/fd6991b2d1947a3cb9e0bd20053899d6
 */

 var width = 700;
 var height = 600;
 var margin = {top:40, right: 40, bottom: 40, left: 40};
 var drawing;
 var drawingArea;
 var myData;
 var myLine;

 //  radial chart setup:
 var innerRadius = 100;
 var outerRadius = Math.min(width, height) / 2 - 6;
 var fullCircle = 2 * Math.PI;
 var xScale;
 var yScale;
 var xAxis;
 var yAxis;

 var title;
 var subtitle;

 async function setup(){

   drawing = d3.select("#drawing").append("svg")
   drawing
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("fill", "grey")

  drawingArea = drawing.append("g")
  drawingArea
    .attr("class", "drawingArea")
    .attr("transform", `translate(${width/2}, ${height/2 + margin.top})`)

  // our radial line
  myLine = drawingArea.append("path")

  yAxis = drawingArea.append("g")
          .attr("text-anchor", "middle");




  myData = await d3.json("data/myWeeklyActivities.json")

   return myData
 }

 function make(myData){

   // no domain for ordinal
   xScale = d3.scaleBand()
        .domain( myData.map( (d) => d.activity) )
        .range([0, fullCircle]);

    // we use 0 to 1 since we already know
   yScale = d3.scaleRadial()
        .domain([0, 1])
    		.range([innerRadius, outerRadius]);

  console.log(xScale("skateboarding"))

    var lineGenerator = d3.lineRadial()
          		.angle(function(d) { console.log(xScale(d.activity) ); return xScale(d.activity); })
          		.radius(function(d) { console.log(yScale(d.value) ); return yScale(d.value); })
              // .curve(d3.curveLinearClosed)
              .curve(d3.curveCardinalClosed)

    myLine
      .attr("d", lineGenerator(myData))
      .attr("fill", "rgba(0, 68, 158, 0.5)")
      .attr("stroke", "#FFFF00")
      .attr("stroke-width", 4)



    var yTick = yAxis
        .selectAll("g")
        .data(yScale.ticks(5))
        .enter().append("g");

    yAxis.append("circle")
      		.attr("fill", "rgba(0, 68, 158, 0.2)")
          .attr("stroke", "#00449E")
      		.attr("opacity", 1)
          .attr("r", function() {
            return yScale( yScale.domain()[yScale.domain().length-1] ) });

    yTick.append("circle")
          .attr("fill","none")
          .attr("stroke", "rgba(0, 68, 158, 0.2)")
          .attr("stroke-width", 4)
      		.attr("opacity",1)
          .attr("r", yScale);

          console.log(yScale(yScale.domain()[yScale.domain().length-1]))
    yAxis.append("circle")
      		.attr("fill", "#00449E")
          .attr("stroke", "#00449E")
      		.attr("opacity", 0.2)
          .attr("r", function() { return yScale(yScale.domain()[0])});





    var labels = yTick.append("text")
          .attr("y", function(d) { return -yScale(d); })
          .attr("dy", "0.35em")
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-width", 5)
          .attr("stroke-linejoin", "round")
          .text(function(d) { return d; });
    yTick.append("text")
        .attr("y", function(d) { return -yScale(d); })
        .attr("dy", "0.35em")
        .text(function(d) { return d; });


    xAxis = drawingArea.append("g");
      var xTick = xAxis.selectAll(".xLabel")
        .data( myData.map( (d) => d.activity) )
        .enter()
          .append("g")
          .attr("class", "xLabel")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "rotate(" + ((xScale(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
          });
      xTick.append("line")
        .attr("x2", -5)
        .attr("stroke", "#000");
       xTick.append("text")
        .attr("transform", function(d) {
          var angle = xScale(d);
          return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
          .text(function(d) {
            console.log(d)
            return d;
          })
        	.attr("font-size", 8)
        	.attr("opacity", 1)
          .attr("fill", "white")


          title = drawingArea.append("g").attr("class", "title")
          .append("text")
      		.attr("dy", "-0.2em")
      		.attr("text-anchor", "middle")
          .style("font-size", 8)
      		.text("My Activities")
          .style("fill", "white")

          title = drawingArea.append("g").attr("class", "subtitle")
          .append("text")
      		.attr("dy", "1em")
          .attr("text-anchor", "middle")
      		.attr("opacity", 1)
          .style("font-size", 8)
          .style("fill", "white")
      		.text("Weekly Guestimate");

      var lineLength = myLine.node().getTotalLength();

      console.log(lineLength)
      myLine
        .attr("stroke-dasharray", lineLength + " " + lineLength)
        .attr("stroke-dashoffset", -lineLength)
        .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);

 }

setup().then(make)
