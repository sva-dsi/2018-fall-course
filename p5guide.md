# P5 Guide for this course

Here's a reference to all the computational components we've covered using P5.js paired with examples with brief descriptions why it is relevant to our understanding of data visualization.

This short guide will use Ben Fry's model of the data visualization pipeline to categorize the various methods for working with and thinking about data. The principles are applied in this case using p5.js, but I hope the knowledge transfer can also be made to other software.

> NOTE: We've seen almost everything here, but I've tried to include some new things just for completeness. They will be marked with a 🆕✨ emoji. 

**Table of contents**
- [P5 Guide for this course](#p5-guide-for-this-course)
- [Visualization Platforms for the code-averse](#visualization-platforms-for-the-code-averse)
    - [General Purpose](#general-purpose)
    - [Mapping](#mapping)
- [Visualization frameworks for friends of code](#visualization-frameworks-for-friends-of-code)
- [Setup](#setup)
    - [Research](#research)
        - [Literature Reviews](#literature-reviews)
        - [Moodboarding](#moodboarding)
    - [Sketching, wireframing, storyboarding](#sketching-wireframing-storyboarding)
    - [Proof of concept / Prototyping](#proof-of-concept--prototyping)
    - [setup()](#setup)
    - [draw()](#draw)
- [Aquire / Parse](#aquire--parse)
    - [Data Sources](#data-sources)
    - [APIs](#apis)
    - [Data Formats](#data-formats)
    - [Variables](#variables)
    - [Objects {}](#objects)
    - [Arrays []](#arrays)
    - [loadJSON()](#loadjson)
    - [loadTable()](#loadtable)
    - [preload()](#preload)
- [Filter](#filter)
    - [Loops and Conditional Statements: `If/else` and `for`](#loops-and-conditional-statements-ifelse-and-for)
- [Mine](#mine)
    - [Mathmagical Operations ✨](#mathmagical-operations-%E2%9C%A8)
- [Represent / Visual Encoding](#represent--visual-encoding)
    - [ellipse()](#ellipse)
    - [rect()](#rect)
    - [line()](#line)
    - [arc()](#arc)
    - [bezier()](#bezier)
    - [Custom Shapes: beginShape() / endShape()](#custom-shapes-beginshape--endshape)
    - [loadImage() / image()](#loadimage--image)
    - [push() / pop()](#push--pop)
    - [translate()](#translate)
    - [rotate()](#rotate)
- [Interact](#interact)
    - [Mouse Interactions: mousePressed()](#mouse-interactions-mousepressed)
    - [Mouse Interactions: mouseX, mouseY](#mouse-interactions-mousex-mousey)
    - [HTML input: createInput()](#html-input-createinput)
    - [HTML select: createSelect()](#html-select-createselect)
    - [HTML button: createButton()](#html-button-createbutton)
    - [HTML radio: createRadio()](#html-radio-createradio)
    - [HTML slider: createSlider()](#html-slider-createslider)
    - [HTML checkboxes: createCheckbox()](#html-checkboxes-createcheckbox)
    - [Conditional Statements: `if/else`](#conditional-statements-ifelse)
- [Refine](#refine)
    - [productive use of metaphors](#productive-use-of-metaphors)
    - [developing a story](#developing-a-story)
    - [CSS](#css)
    - [CSS frameworks](#css-frameworks)
    - [text()](#text)
    - [colorMode()](#colormode)
    - [fill colors: fill()](#fill-colors-fill)
    - [stroke color: stroke()](#stroke-color-stroke)
    - [stroke properties: strokeWeight()](#stroke-properties-strokeweight)
- [Publishing](#publishing)
    - [platforms](#platforms)
    - [self-hosting / github pages](#self-hosting--github-pages)
- [Collaboration](#collaboration)
    - [Working on teams](#working-on-teams)
    - [Github](#github)
- [Chart Types](#chart-types)
    - [Scatterplots](#scatterplots)
    - [Line charts](#line-charts)
    - [Histograms](#histograms)
    - [Bar charts](#bar-charts)

***
# Visualization Platforms for the code-averse 
***


> NOTE: I have a preference for open source software. This is reflected here as much as possible. 


## General Purpose

Here's a list of general purpose visualizaiton tools that you might spend some time to learn and add to your toolbelt. 

* Spreadsheet based software:
    * Microsoft Excel
    * Apple's Numbers 
    * Google Sheets
    * Stencila
* Others:
    * [Raw Graphs](https://rawgraphs.io/)
    * [Lyra](http://idl.cs.washington.edu/projects/lyra/)
    * [Datawrapper](https://datawrapper.de/)
    * Tableau & [Tableau Public](https://public.tableau.com/s/)
    * [Polestar](http://vega.github.io/polestar/)
    * [High Charts Cloud](https://cloud.highcharts.com/)
    * [Easy Charts](http://www.easychart.org/)
* More Others:
    * Illustrator
    * Sketch
    * [Quadrigram](http://www.quadrigram.com/)
    * [Google Fusion Tables](https://support.google.com/fusiontables/answer/2571232?hl=en)

## Mapping

Mapping is most certainly an endeavor of data visualization, but geospatial considerations warrant their own set of conceptual and computational needs. Here's a list of some platforms and software

* Web based:
    * [Carto](https://carto.com/): both visualization and analytics (though mapbox gives more cartographic agency I would say)
    * [Mapbox](https://mapbox.com/): more visualization, less analytical
* Desktop:
    * [Quantum GIS (QGIS)](http://qgis.org/)


***
# Visualization frameworks for friends of code
***

This guide is about [P5.js](). I choose to introduce all these visualization concepts with P5 for many reasons including:

1. great community (e.g. Dan Shiffman)
2. lots of documentation
3. lots of resources and examples
4. easy to "lego-brick" complexity
5. opens up possibilities to interfce and interact with other things (e.g. mobile devices, etc)
6. built for the web
7. lower entry barriers to making and sharing code
8. forces you to think more explicitly about visual encoding, scale, and the components that make up a chart.
9. general purpose - if/when you're not using it for visualization, you can use it for other projects and needs.

SO with all that being said, we're going to focus on P5.js, but if you do get curious, as I hope you all do, here's some additional references that you definitely should know about for your own sake and your future team.

> NOTE: most if not all of these are based on javascript or are meant for a web environment

* Some go-to's:
    * [Plotly.js](https://plot.ly/javascript/)
    * [Chart.js](https://www.chartjs.org/)
    * [Vega.js](https://vega.github.io/vega/)
* Caveats:
    * [D3.js](): D3.js is the standard visualizaition framework out there, but it is not a beginner friendly library. Luckily basically all the other visualizaition libraries wrap up some of the D3 complexity for us. Also, if you're not going to become a visualization coder, then D3 feels like overkill to me. 


> NOTE: we aren't really going to go into R or Python for data analysis and visualization. Those coding environments and their visualization and statistical libraries may be wonderful, but that opens up a whole different can of worms which we haven't gone over in this class - statistics! 



***
# Setup
***

Data visualization is a process of mapping data - numbers and text - to visual forms. It is also very much about doing research so you have something real to communicate about, coordinating and working on and with teams of people to make the visualizations, and figuring out strategies for publication and outreach. Regardless if you can focus in on specific pieces of this process - the aesthetics, the project management, the media publication strategy, the engineering, and so on - you should always strive to be critical and unfold as much of the politics of your data such that you do no harm. The [Journalist Code of Ethics has it right](https://www.spj.org/ethicscode.asp).

Data visualization is very much a design process - it's about iteration, trying things out, researching, trying things out some more, and so on and so forth until you land on something that effectively communicates the data you've set to communicate about. Sometimes that means deciding not to make a chart at all, but rather to just show the numbers in a table, other times it means making elaborate and complex animations or data dashboards. 

Your role as a designer, researcher, and knowledgeable data visualization person is to do due diligence. In this guide we discuss a lot of programming concepts (in p5.js), but the goal is to contextualize them in the broader process of visualization so that you may one day speak to all the components from end to end.


## Research

If I've learned anything about design, it's that design and research are almost one in the same. I would argue that good design comes from good research and vice versa. Research comes in many forms and also is necessary for each part of the visualization process. Here's some questions that might pop up along the way:

During...

* **Concept**: What is your research question? How can data support or debunk your claims? What is the right medium for communicating your data? Would it be more effective to make a video or rather static charts? Is the web the medium of choice? Who is your target audience? What are similar projects? What research has been done in the space? Can I reach out to experts that might be able to speak to these questions or point to useful and trustworthy datasets? 
* **Visualization**: Which charts can effectively allow me to explore the data I'm working with? Which charts can effectively communicate to others the data I'm working with? What are analogies and metaphors that may help with the communication? How can typography, color, and layout speak to the story?
* **Publication**: Where will your visualization be used? Brochures or posters or on the web? What are strategies for publication? Is your visual worth reaching out to media outlets and journalists? How do you make your visualization accessible? Is it important to make your data and accompanying analyses accessible or could that implicate the people in your data?

What are others that you might encounter? I'd love to hear! 

The research phase can be really messy, but having some go-to activites to get your process started is not a bad idea. Here's a few ideas:


### Literature Reviews

Literature reviews whether it is drawing from academic or scholarly literature or other media sources ranging from art projects to journalism or books will underlie your research. Read read read for goodness sakes! References are crucial for substatiating your claims, finding insight, learning new ways of seeing and approaching your data questions, and often times leads you to handy datasets. Here, your preferred web search engine is your best friend. 

Often times I start with various publishers and then open up the leads from there. 

You might read about literature reviews [here](https://guides.library.harvard.edu/literaturereview).

### Moodboarding

Moodboards! So underrated and underutilized. I find them extremely helpful to set a common ground as you communicated across and within your team or within your own brain. Moodboards can be super helpful to identify inspiration, the tone that you're looking for, or help you pin point specific visual or conceptial elements that you also want to use or expand on. 

Read more about how to moodboard [here](https://www.canva.com/learn/make-a-mood-board/).

## Sketching, wireframing, storyboarding

So you've been working through the literature and working through some analyses, and finally getting to a point in which you think you have a concept for your visualization. This is where sketching, wireframing, and storyboarding start to become more handy. 

**Sketch** out your ideas for interfaces, types of interactions you want with your data, animation or transition possibilities, and visual forms. Sketching requires little or no technology, just your imagination, ability to condense all that research you've been doing, and quickly start to break down the complexity and components of what you will need to make your visualization project a reality.

**Wireframes** can also just be sketches, but usually tend to move towards more structure and fidelity. Wireframes can start out as sketches and move towards a more digital format. You can have low fidelity (lo-fi) wireframes all the way up to high-fidelity (hi-fi) wireframes which eventually lead to designs.

**Storyboarding** is about mapping out your user's interaction with your design and in this case, your visualization. With a storyboard 

## Proof of concept / Prototyping 

Prototyping can take all shapes, forms, and methods and occur at all stages of the research and visualization process. Typically this is an opportunity for you to test small components of your visualization to show how you imagine the pieces of the whole might exist, eventually bringing them together at varying levels of fidelity. These proofs of concepts and prototypes are critical for you to "think through making" and to better understand possibilities, constraints, and communicate with your team to build towards your final solution. Proofs of concept and prototypes give you the space to explore aspects of your visualization or narrative that you're unsure of how to make yet, but have ideas about how to make them a reality. 

Early proofs of concept and prototypes may be technology agnostic in that you use the tools that are comfortable with and can quickly materialize your idea. You can use those proof/prototypes as a means of communicating with others e.g. a developer or data scientist about what you're going for.


## setup()



## draw()


***
# Aquire / Parse
>  ↱ **aquire** → **parse** → filter → mine → represent → interact → refine ↲
***

## Data Sources

Finding quality data is always a challenge. When you think you've found exactly what you're looking for you should always be asking yourself and trying to answer critical questions about the data. I've noted some here:

- **Who**: 
    - Who produced this data / conducted the surveys / collected the data? What were their motivations? What are ways in which the data could be biased?
    - Who is implicated by these data? Could these data be used for or against certain people? Who might be harmed by your working with these data and do you have a responsibility to those people?
    - Who else has used or vetted the data? Do you trust those organizations and their analyses?
- **How**: 
    - How were the various properties of the data calculated? How were the sensors programmed, calibrated, or tested? 
    - How was this data created/generated/collected? In which ways could the data have been miscollected, tampered with, or intentionally under or overreported?
    - How do I cite this data?
    - How might the use of proxy variables, however convenient, be harmful to the people/places/things they are meant to describe/quantify? 
- **What**:
    - What is the sample size? Are those samples representative?
    - What has been done with this dataset previously, if anything? 
    - What is the license or terms of use of the data?
- **Why**: 
    - Why was this data created/generated/collected? What is the intentionality? Do these data harm or help certain individuals or groups over others? 
    - Why might the intentionality of the data collection 
- **When**:
    - When were the data collected? What were/are the prevailing political/economic/cultural prejudices/paradigms/norms that might influence the data (e.g. *The Averaged American*)?
    - At what frequency were the data collected? Every second? Monthly? Yearly? Every 10 years?
- **Where**:
    - Where were the data collected? How might geography play into the outcomes of the data that are available to you? E.g. Do the data only come from rich, white neighborhoods or only poor, minority neighborhoods? 
    - How might geography, such as  city size / population size or topography and terrain, need to be considered to ensure your statistics and visualizations are sound?

There are many more questions that you can consider - the more you work with and read about the ways that data are being used to shape our every day experiences, the more you will be able to speak to some of these questions. For helpful resources, see: 

- Alberto Cairo's [The Truthful Art](https://www.oreilly.com/library/view/the-truthful-art/9780133440492/), 
- Nathan Yau's [Data Points](http://flowingdata.com/data-points/), and 
- Cathy O'Neill's [Weapons of Math Destruction](https://weaponsofmathdestructionbook.com/) are very helpful resources in this regard. 

When you've nailed down your research questions and are ready to start looking for data, here's just a few links to data sources:


* [Beta NYC Open Data List](https://docs.google.com/spreadsheets/d/1R7O_FZLNB8VV5eoPDNATb-f0njjUsJwmz22cT_OB3fw/edit#gid=0)
* [Aure's List of NYC Data](https://github.com/sva-dsi/2017-fall-course/blob/master/lectures/maps.md#mapping-data)
* [Awesome lists public data](https://github.com/awesomedata/awesome-public-datasets)
* [Data.gov](https://www.data.gov/)
* [EU open data portal](https://open-data.europa.eu/en/data/dataset?q=cordis)
* [Five Thirty Eight Open Data](https://data.fivethirtyeight.com/)
* [Open Data Portals by Country](https://www.opendatasoft.com/a-comprehensive-list-of-all-open-data-portals-around-the-world/)
* [Jeremy Singer Vine - Data is Plural](https://tinyletter.com/data-is-plural)
  * and [the list here](https://docs.google.com/spreadsheets/d/1wZhPLMCHKJvwOkP4juclhjFgqIY8fQFMemwKL2c64vk/edit)
* [NYC Open Data Portal](https://opendata.cityofnewyork.us/)
* [Crisis Lex](http://crisislex.org/tweet-collections.html)
* Universities often have data available:
  * [UCLA](https://gis.ucla.edu/geodata/)
  * [Columbia University](https://geodata.library.columbia.edu/)
  * ... web search e.g.: geodata + UC berkeley 
* [Carto Data Observatory](https://carto.com/developers/data-observatory/)
* [USGS Earth Explorer for Aerial Imagery](https://gisgeography.com/usgs-earth-explorer-download-free-landsat-imagery/)
* Open access scientific data is often stored in places such as:  
    * [Zenodo](https://zenodo.org/)
    * [Open Science Data Cloud](https://www.opensciencedatacloud.org/)
    * [Pangea.de](https://www.pangaea.de)
    * [Figshare](https://figshare.com/)
    * And a very well documented list by category, by [Nature.com](https://www.nature.com/sdata/policies/repositories)


## APIs

API - Application Programming Interface. This is one of those acronyms that gets tossed around in conversation like, "hey why don't you just query the *insert tech company name* API" or "I did my analysis by getting data from the Twitter API" and so on. 

An API is essentially a way for you - a third party entity - to get access to certain data and functionality from some web based service. API's are what allow Apple's iPhone to get the weather data for all the cities across the world (the [Weather Channel API](https://weather.com/datafeeds)) or you to make a [Twitter Bot](https://shiffman.net/a2z/twitter-bots/) or to use [random cat images](https://cataas.com/#/) from across the web. Many companies create entry points into their data (or the data you're producing while using their service) to enable their products to be used in applications outside of their own. Probably the best example of this is the [If This Then That](https://ifttt.com/) service that allows you to string together different APIs (e.g. "Tell Spotify to play song X every time the temperature of NYC measured by the Weather Channel is over Y degrees").

How do APIs work? Typically they work in a typical client-server or server-server relationship. You, the client, make a `GET` request to get data from an API using a `url endpoint`. For example, let's say we're trying to get the life expectancy data from [API.population.io](http://api.population.io/). We can get back our data by following the API endpoints which specify a `base url` and then the following `query parameters`.

> http://api.population.io/1.0/life-expectancy/total/male/United%20Kingdom/1952-03-11/?format=json

where: 

* base url: `http://api.population.io/`
* endpoint: `life-expectancy/total/{sex}/{country}/{date-of-birth}/`

There are **public APIs** and **private APIs**. Public APIs, like the example above, do not require you to use an **API key** whereas **private APIs** require you to use an **API key**. An API key is a unique string of letters and numbers that indicate a unique identifier for the person and/or "application" that is making requests to the API in question. API keys are often required to allow the API providers to keep track of how many times you've made requests to their servers, to see what kind of data you're requesting, and so on. Often APIs will have limits to the amount of times you can make requests so that you don't bog down or become a hog of the API service provider's server resources and/or to prevent attacks.

When making API requests using your API key, typically it gets sent as a URL parameter like so:


> https://api.mapbox.com/styles/v1/mapbox/light-v9/static/-73.995484,40.742357,11,0,0/1024x512?access_token=pk.eyJ1Ijoic3ZhLWRzaSIsImEiOiJjam5tZTNtbnUwMWc4M3FwbjdjZmEwbHJ3In0.hNND3ubo41QFYOyCm-22ng

where:

* base url: `https://api.mapbox.com/`
* endpoint: `styles/v1/mapbox/light-v9/static/-73.995484,40.742357,11,0,0/1024x512`
* access token: `?access_token=pk.eyJ1Ijoic3ZhLWRzaSIsImEiOiJjam5tZTNtbnUwMWc4M3FwbjdjZmEwbHJ3In0.hNND3ubo41QFYOyCm-22ng`

Imagine the URL saying, "Hey! api.mapbox.com, give me this style map at these coordinates and zoom level and aspect ratio. Oh you want my access token? Here it is..."

By understanding how to get data from API's it opens up a whole world of possibilities. You can create dynamic applications that respond to user input, you can access massive and complex datasets and analytical capabilities of powerful servers out there, and do things that otherwise would be really hard to do. Hooray for APIs!


## Data Formats

Data can be anything - an image, a music file, a structured tabular file, a video, your genes, etc. What makes data interesting for us is that they are structured in some logical way such that it is machine readable (and if and when possible, human readable).

Data come in all forms, dimensions, and sizes. From machine readable [binary blobs](https://www.techopedia.com/definition/17929/binary-data) like Excel files which require you to open their .xls files in Excel to human readable [flat files](https://www.techopedia.com/definition/7231/flat-file-database-database) like .csv or .json files, there's certainly no shortage of data formats, each with their designed purposes, advantages, and disadvantages. Similarly there are datasets that we can load and work with directly in our web browser (~a couple of megabytes) to datasets that require super quantum computers chilled at -273 degrees Celsius in order to operate. The size of the data we're working with will change how and where we perform our data explorations, analyses, and visualizations.

As mentioned above, data formats are indicated by their respective file endings such as `.csv` (comma separated values), `.geojson` (geographic javascript object notation), `.jpg` (Joint Photographic Experts Group), `.xls` (eXceL Spreadsheet) and so on. These file endings are important because they indicate to us how we can parse these files, or in other words, how we can read, load, and make sense of the logical structure in which they were organized. Your computer for instance is parsing files all the time. Every time you click on a file ending in `.png`, you computer knows that it is a portable network graphic which is an image file type, and so it opens up your default image editing viewer/editor to allow you to work with it. Similarly, if you click on a `.doc` Microsoft Word document, your computer knows that it should launch Word and let Word do it's magic to make sense of the proprietary data format that is `.doc`.

**Why do we care?**

All this information comes in handy for us because the type of data we are using can dictate what kind of software we need to use or what kinds of programmatic functions we need to use to work with those data. 

All that being said, we in this class have focused primarily on these data types:

- Comma separated values (`.csv`):
    - CSV files are tabular datasets much like how Excel (.xls) files are structured. There are essentially rows and columns where the columns are properties of the data the rows indicate a unique entry.

```
uniqueId,date,time,activity
uid1,2018/10/20,10:00,swimming
uid2,2018/10/20,12:00,eating
uid3,2018/10/20,13:00,jump rope
```


- Javascript Object Notation (`.json`):
    - JSON files (and their close relatives: geojson, toposon, etc) are stuctured files that take the form of `{key:value}` pairs, where the key is a property, and the value is, well, the value of that property. In other words, if we have a JSON object that captures some data about a flower, it's key value pairs might look like: `{"petals":6, "species":"daisy", "color":"yellow"}`
    - the same csv activity data above could be re-written in JSON. I've used this online [csv to json](https://www.csvjson.com/csv2json) application for this example :

``` 
[
  {
    "uniqueId": "uid1",
    "date": "2018/10/20",
    "time": "10:00",
    "activity": "swimming"
  },
  {
    "uniqueId": "uid2",
    "date": "2018/10/20",
    "time": "12:00",
    "activity": "eating"
  },
  {
    "uniqueId": "uid3",
    "date": "2018/10/20",
    "time": "13:00",
    "activity": "jump rope"
  }
]
```

When looking at data like we see above, what comes to mind while looking at it? We know that there are 3 activity entries: "swimming", "eating", and "jump rope" so you can guess that in order to select out data, we need to start thinking about how to iterate through those data lists, how to select different data based on their properties (e.g. keys), how to subset and filter data, and so on.

 
## Variables

Let's talk about variables. 

In our lives, when we think about variables, what comes to mind? You might think of all the variables that might be causing your subway train delays - is someone holding the doors down the line? was there an accident? Or if you think about your daily lunch dilemma as a result of the many variables - do I order a sandwich or sushi? should I get a latte or a cappucino? These variables are speaking to the variability or variety of possibilities that serve to explain, for example, why your train might be late or why you're feeling lethargic after lunch (shouldn't have gotten that 🍝).

In data analysis and visualization, variables are similar to the examples given above. The variables we narrow in and focus on are interesting because they have the potential to *explain or characterize* a certain phenomenon, its dynamics, and/or how and why that phenomenon might be occuring. On a simple level, you might attribute your post-lunch lethargy to that pasta bolognese you just ate. Given your gluten intolerance and the heavy beefy sauce you just consumed, it is no wonder why you are feeling tired (and maybe even ill!). On a more complex level, the variables behind a city's air pollution standard index might include a slew of data such as weather (e.g. temperature, pressure, wind speed and direction, solar radiation), traffic counts, and building energy use. So when we talk about the variables we're analyzing and visualizing, we're almost always talking about the properties or data which speak to our phenomenon of interest.

In programming, such as in p5.js (and javascript more generally), we can abstract and apply this idea variables to the way our software program handles data. Let's look at a an example in javascript:

```js

var flowerColor = "red";
var flower_petal_count = 6; 
var flowerSpecies = "petunia";

```
where, for example: 

* **var**: this tells our javascript that we're making a new *variable*. Everything after the `var` keyword is the variable definition.
* **flowerColor**: this is the name of our variable. Here we are saying that the word *flowerColor* is storing the **value** `"red"`. 

There are a number of ways you'll see variables being defined in javascript. We'll see more examples throughout this guide. The important thing to know is that variables are **declared** and **assigned** values or functionality which can be later **updated** and **used** across a program. 


* variables can be assigned a single value such as a number, a word, a character, boolean (true/false)
* variables can be assigned a function. In this example, we create a function that returns the sentance, "Hello, {a person's name}". Notice how person is a variable that get's combined with the "Hello, ". This is the great thing about using variables and functions because let's say we have a list of 100 names, rather than writing out "Hello, Mary Beth", "Hello, Loo", "Hello, Kubo", and so on, we can make the computer loop through all our names and use our `greeting()` function to write all that out for us.

```js

var greeting = function(person){
    return "Hello, " + person
};

greeting("Joey");
// returns: "Hello Joey"

```

short aside, we can write that same thing above, like this:

```js
function greeting(person){
   return "Hello, " + person
};

greeting("Joey");
// returns: "Hello Joey"

```

* just as variables can be assigned a function, they can also be assigned to the **result of a function**. What does that mean you ask? That means that when we run a function, it will do a bunch of operations - maybe some math, maybe some parsing, maybe some ordering and arranging of things - and then give you the result in some shape or form. Let's look at a few examples:

```js

function greeting(person){
   return "Hello, " + person
};

var greeting_to_joey = greeting("Joey");
// console.log(name_of_variable) will print out what's assigned to that variable.
console.log(greeting_to_joey); 
// prints "Hello, Joey"

```

In the example above, we store the result of `greeting("Joey")` to a variable called **greeting_to_joey**. Then we can use that "Hello, Joey" later on.


## Objects {}



## Arrays []



## loadJSON()


## loadTable()


## preload() 


Let's take a look at something a bit more substantial like when we load data in P5.js. Here we:
1. declare a variable called **myData**
2. use the loadTable() function to load our csv file of NYC's stop and frisk data for January 2017. Our loadTable() function lives inside the `preload()` function because we want to make sure it can 
3. 

```js
// declare a variable called myData
var myData;

// preload() allows us to make sure to load images and data before the rest of our program runs
function preload(){
    // use the loadTable() function to load our csv file of NYC's stop and frisk data
    myData = loadTable('https://gist.githack.com/joeyklee/9ef7248c74038ef9df82152772398d1f/raw/39f1bb753d46bf554e35c86055410a910dd846e2/stop-and-frisk-nyc-2017.csv', 'header', 'csv');
}

//
function setup(){
    // we log the result of that data and convert it to an object (we'll learn about objects next)
    console.log(myData.getObject());
    noLoop();
}

```
See it in practice here: https://editor.p5js.org/joeyklee/sketches/SyvgItU3Q



***
# Filter
>  ↱ aquire → parse → **filter** → mine → represent → interact → refine ↲
***

## Loops and Conditional Statements: `If/else` and `for`



***
# Mine
>  ↱ aquire → parse → filter → **mine** → represent → interact → refine ↲
***

## Mathmagical Operations ✨


***
# Represent / Visual Encoding
>  ↱ aquire → parse → filter → mine → **represent** → interact → refine ↲
***

https://www.targetprocess.com/articles/visual-encoding/

## ellipse()

## rect()

## line()

## arc()

## bezier()

## Custom Shapes: beginShape() / endShape()

## loadImage() / image()

## push() / pop() 

## translate()

## rotate()


***
# Interact
>  ↱ aquire → parse → filter → mine → represent → **interact** → refine ↲
***

## Mouse Interactions: mousePressed()


## Mouse Interactions: mouseX, mouseY



## HTML input: createInput()

## HTML select: createSelect()

## HTML button: createButton()

## HTML radio: createRadio()
https://p5js.org/reference/#/p5/createRadio


## HTML slider: createSlider()


## HTML checkboxes: createCheckbox()
https://p5js.org/reference/#/p5/createCheckbox


## Conditional Statements: `if/else`





***
# Refine
>  ↱ aquire → parse → filter → mine → represent → interact → **refine** ↲
***

## productive use of metaphors

## developing a story

## CSS 

## CSS frameworks

## text() 

## colorMode()

## fill colors: fill()

## stroke color: stroke()

## stroke properties: strokeWeight()


***
# Publishing
>  ↱ aquire → parse → filter → mine → represent → interact → refine ↲ then : **publish**
***

## platforms


## self-hosting / github pages



***
# Collaboration
***

## Working on teams

## Github


***
# Chart Types
***

## Scatterplots

## Line charts

## Histograms

## Bar charts