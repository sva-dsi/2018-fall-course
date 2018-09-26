/**
 * ADD YOUR CODE BELOW
 * LIKE LEGO BLOCKS, PIECE BY PIECE!
 https://bl.ocks.org/mbostock/3885304
 */

const width = 720;
const height = 600;
const margin = { top: 20, right: 40, bottom: 60, left: 40 };
let drawing;
let drawingArea;
let xAxis;
let yAxis;
let rectangleData = [];

async function setup() {
  try {
    // create your drawing area and add it to the page
    // NOTE: we have a <div id="drawing"></div> on index.html
    drawing = d3.select("#drawing").append("svg");
    // set the size of your drawing area
    drawing
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background", "#D8D8D8");

    // add a group to your drawing
    drawingArea = drawing.append("g");
    // move your drawing area to have padding
    // don't add .style here unless you want
    // those styles to propogate down
    drawingArea.attr("transform", `translate(${margin.left}, ${margin.top})`);

    xAxis = drawingArea
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .attr("class", "xAxis");

    yAxis = drawingArea.append("g").attr("class", "yAxis");

    // generate the data
    for (let i = 0; i < 30; i++) {
      let d = {
        category: `blah${i}`,
        z: d3.randomUniform(20, 100)()
      };
      rectangleData.push(d);
    }

    drawing.on("click", function() {
      d3.event.preventDefault();
      // generate the data
      let newData = [];
      for (let i = 0; i < 30; i++) {
        let d = {
          category: `blah${i}`,
          z: d3.randomUniform(20, 100)()
        };
        newData.push(d);
      }
      make(newData);
    });

    return rectangleData;
  } catch (err) {
    return err;
  }
}

function make(rectangleData) {
  // add your scaling stuff
  let yMax = d3.max(rectangleData.map(d => d.z));

  let xScale = d3
    .scaleBand()
    .domain(rectangleData.map(d => d.category))
    .rangeRound([0, width])
    .padding(0.1);

  let yScale = d3
    .scaleLinear()
    .domain([yMax, 0])
    .range([0, height]);

  let myBars = drawingArea.selectAll(".myBars").data(rectangleData);

  let barWidth = width / rectangleData.length;

  myBars
    .enter()
    .append("rect")
    .attr("class", "myBars")
    .attr("x", (d, idx) => xScale(d.category))
    .attr("y", d => height - yScale(d.z))
    .attr("width", barWidth)
    .attr("height", d => yScale(d.z))
    .style("fill", "#black")
    .style("stroke", "#F6FFFE")
    .style("stroke-width", 1)
    .merge(myBars)
    .transition()
    .attr("x", (d, idx) => xScale(d.category))
    .attr("y", d => height - yScale(d.z))
    .attr("width", barWidth)
    .attr("height", d => yScale(d.z))
    .style("fill", "#black")
    .style("stroke", "#F6FFFE")
    .style("stroke-width", 2);

  // add your axes
  drawingArea
    .select(".xAxis")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 10)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");

  drawingArea
    .select(".yAxis")
    .transition()
    .call(d3.axisLeft(yScale));
}

setup().then(make);
