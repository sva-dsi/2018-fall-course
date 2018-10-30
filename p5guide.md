# P5 Guide for this course

Here's a reference to all the computational components we've covered using P5.js paired with examples with brief descriptions why it is relevant to our understanding of data visualization.

This short guide will use Ben Fry's model of the data visualization pipeline to categorize the various methods for working with and thinking about data using p5.js. 

NOTE: We've seen almost everything here, but I've tried to include some new things just for completeness. They will be marked with a 🆕✨ emoji. 

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
    - JSON files (and their spinoffs: geojson, toposon, etc) are stuctured files that take the form of `{key:value}` pairs, where the key is a property, and the value is, well, the value of that property.
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


## Arrays []


## Objects {}


## preload()


## loadJSON()


## loadTable()




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
# Represent
>  ↱ aquire → parse → filter → mine → **represent** → interact → refine ↲
***

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

