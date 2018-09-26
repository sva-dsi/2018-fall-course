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

/**
 * NOTE: we use an async/await here so we can read in our data
*/
async function setup(){
  try{
    // create your drawing area and add it to the page
    drawing = d3.select("#drawing").append("svg");
    // set the size of your drawing area
    drawing
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background", "#D8D8D8")

    // add a group to your drawing
    drawingArea = drawing.append("g")
    drawingArea
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // assign your circle data here
    circleData = await d3.json("data/circleData.json")

    // send the circle data on its way to make()
    return circleData

  } catch (err){
    return err
  }
  
}

// not async
function make(circleData){
  try{
    console.log(circleData)
  
  } catch(err){
    return err
  }
}


/**
 * NOTE: we use an async/await in setup so we can
* pass the data to our make() function using .then()
*/
setup().then(make);
