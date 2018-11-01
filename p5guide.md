# P5 Guide for this course

Here's a reference to all the computational components we've covered using P5.js paired with examples with brief descriptions why it is relevant to our understanding of data visualization.

This short guide will use Ben Fry's model of the data visualization pipeline to categorize the various methods for working with and thinking about data. The principles are applied in this case using p5.js, but I hope the knowledge transfer can also be made to other software.

> NOTE: We've seen almost everything here, but I've tried to include some new things just for completeness. They will be marked with a 🆕✨ emoji.

**Table of contents**

- [P5 Guide for this course](#p5-guide-for-this-course)
- [Preamble: Visualization Platforms for the code-averse](#preamble-visualization-platforms-for-the-code-averse)
  - [General Purpose](#general-purpose)
  - [Mapping](#mapping)
- [Visualization frameworks for friends of code](#visualization-frameworks-for-friends-of-code)
- [Chapter 1: Setup](#chapter-1-setup)
  - [Research](#research)
    - [Literature Reviews](#literature-reviews)
    - [Reach out to an expert](#reach-out-to-an-expert)
    - [Moodboarding](#moodboarding)
  - [Sketching, wireframing, storyboarding](#sketching-wireframing-storyboarding)
  - [Proof of concept / Prototyping](#proof-of-concept--prototyping)
  - [Getting started: structure, setup() & draw()](#getting-started-structure-setup--draw)
  - [Chapter 1 Summary](#chapter-1-summary)
  - [Chapter 1 References](#chapter-1-references)
- [Chapter 2: Aquire / Parse](#chapter-2-aquire--parse)
  - [Data Sources](#data-sources)
  - [APIs](#apis)
  - [Data Formats](#data-formats)
  - [Objects {}](#objects)
  - [Arrays []](#arrays)
  - [Variables](#variables)
  - [Functions](#functions)
  - [Custom functions](#custom-functions)
    - [Method 1: defining a variable and assigning it a function](#method-1-defining-a-variable-and-assigning-it-a-function)
    - [Method 2: assigning your function to it's scope](#method-2-assigning-your-function-to-its-scope)
    - [Functions that return data](#functions-that-return-data)
  - [loadJSON()](#loadjson)
    - [Method 1 - callbacks: *I ain't no hollaback girl*](#method-1---callbacks-i-aint-no-hollaback-girl)
    - [Method 2 - async/await: ES6 syntax for dealing with asychronicity](#method-2---asyncawait-es6-syntax-for-dealing-with-asychronicity)
    - [Method 3 - preload: loading data at the beginning](#method-3---preload-loading-data-at-the-beginning)
  - [loadTable()](#loadtable)
    - [Method 1 - callbacks:](#method-1---callbacks)
    - [Method 2 - async/await:](#method-2---asyncawait)
    - [Method 3 - preload():](#method-3---preload)
  - [preload()](#preload)
    - [preloading images](#preloading-images)
    - [preloading video](#preloading-video)
  - [Chapter 2: recap](#chapter-2-recap)
  - [Chapter 2 References](#chapter-2-references)
- [Chapter 3: Filter](#chapter-3-filter)
  - [P5.Table & P5.TableRow: .findRows()](#p5table--p5tablerow-findrows)
  - [P5.Table: for Loops and Conditional Statements: `If/else` and `for` using .getRow();](#p5table-for-loops-and-conditional-statements-ifelse-and-for-using-getrow)
  - [P5.Table: .getObject() → for Loops and Conditional Statements: `If/else` and `for`](#p5table-getobject-%E2%86%92-for-loops-and-conditional-statements-ifelse-and-for)
  - [Advanced methods](#advanced-methods)
    - [Array.filter()](#arrayfilter)
  - [Chapter 3: Summary](#chapter-3-summary)
  - [Chapter 3: References](#chapter-3-references)
- [Chapter 4 : Mine](#chapter-4--mine)
  - [Mathmagical Operations ✨](#mathmagical-operations-%E2%9C%A8)
    - [map()](#map)
    - [min()](#min)
    - [max()](#max)
    - [constrain()](#constrain)
    - [round()](#round)
    - [log()](#log)
    - [sqrt() and sq()](#sqrt-and-sq)
    - [lerp()](#lerp)
  - [Chapter 4: Summary](#chapter-4-summary)
  - [Chapter 4: References](#chapter-4-references)
- [Chapter 5: Represent / Visual Encoding](#chapter-5-represent--visual-encoding)
  - [ellipse()](#ellipse)
  - [rect()](#rect)
  - [line()](#line)
  - [arc()](#arc)
  - [bezier()](#bezier)
  - [text()](#text)
  - [Custom Shapes: beginShape() / endShape()](#custom-shapes-beginshape--endshape)
  - [loadImage() / image()](#loadimage--image)
  - [push() / pop()](#push--pop)
  - [translate()](#translate)
  - [rotate()](#rotate)
  - [Chapter 5: Summary](#chapter-5-summary)
  - [Chapter 5: References](#chapter-5-references)
- [Chapter 6: Interact](#chapter-6-interact)
  - [Mouse Interactions: mousePressed()](#mouse-interactions-mousepressed)
  - [Mouse Interactions: mouseX, mouseY](#mouse-interactions-mousex-mousey)
  - [HTML input: createInput()](#html-input-createinput)
  - [HTML select: createSelect()](#html-select-createselect)
  - [HTML button: createButton()](#html-button-createbutton)
  - [HTML radio: createRadio()](#html-radio-createradio)
  - [HTML slider: createSlider()](#html-slider-createslider)
  - [HTML checkboxes: createCheckbox()](#html-checkboxes-createcheckbox)
  - [Conditional Statements: `if/else`](#conditional-statements-ifelse)
  - [Chapter 6: Summary](#chapter-6-summary)
  - [Chapter 6: References](#chapter-6-references)
- [Chapter 7: Refine](#chapter-7-refine)
  - [productive use of metaphors](#productive-use-of-metaphors)
  - [developing a story](#developing-a-story)
  - [CSS](#css)
  - [CSS frameworks](#css-frameworks)
  - [text()](#text-1)
  - [colorMode()](#colormode)
  - [fill colors: fill()](#fill-colors-fill)
  - [stroke color: stroke()](#stroke-color-stroke)
  - [stroke properties: strokeWeight()](#stroke-properties-strokeweight)
  - [Chapter 7: Summary](#chapter-7-summary)
  - [Chapter 7: References](#chapter-7-references)
- [Chapter 8: Publishing](#chapter-8-publishing)
  - [platforms](#platforms)
  - [self-hosting / github pages](#self-hosting--github-pages)
- [Chapter 9: Collaboration](#chapter-9-collaboration)
  - [Working on teams](#working-on-teams)
  - [Github](#github)
- [Chapter 10: Chart Types](#chapter-10-chart-types)
  - [Scatterplots](#scatterplots)
  - [Line charts](#line-charts)
  - [Histograms](#histograms)
  - [Bar charts](#bar-charts)

---

# Preamble: Visualization Platforms for the code-averse

---

Before we start, I want to point out that quite often, you'll just want to quickly look into a dataset, make some rudimentary charts, and perhaps even perform a few operations on the data to see if you can immediately notice any interesting trends or outliers in your data. **Graphical User Interface (GUI)** based environments are great for this and even more. Starting with code doesn't always make sense or may not even be necessary for what you're trying to achieve. That being said, where code excels is in it's ability to be more easily reproduced (the code is essentially a step-by-step of how you manipulated the data) and quite offen is open source or free to use whereas many GUI based visualization platforms are not or have subscriptions fees at the very least.

Every tool has its advantages and disadvantages, so the best thing is to have as many in your toolbox to work with **winky face** ;)

> NOTE: I have a preference for open source software. This is reflected here as much as possible.

## General Purpose

Here's a list of general purpose visualizaiton tools that you might spend some time to learn and add to your toolbelt.

- Data Visualization Platforms:
  - [Raw Graphs](https://rawgraphs.io/)
  - Microsoft Excel
  - Apple's Numbers
  - Google Sheets
  - [Stencila](https://stenci.la/)
  - [Lyra](http://idl.cs.washington.edu/projects/lyra/)
  - [Datawrapper](https://datawrapper.de/)
  - Tableau & [Tableau Public](https://public.tableau.com/s/)
  - [Polestar](http://vega.github.io/polestar/)
  - [High Charts Cloud](https://cloud.highcharts.com/)
  - [Easy Charts](http://www.easychart.org/)
- More Others:
  - Illustrator
  - Sketch
  - [Quadrigram](http://www.quadrigram.com/)
  - [Google Fusion Tables](https://support.google.com/fusiontables/answer/2571232?hl=en)

## Mapping

Mapping is most certainly an endeavor of data visualization, but geospatial considerations warrant their own set of conceptual and computational needs. Here's a list of some platforms and software

- Web based:
  - [Carto](https://carto.com/): both visualization and analytics (though mapbox gives more cartographic agency I would say)
  - [Mapbox](https://mapbox.com/): more visualization, less analytical
- Desktop:
  - [Quantum GIS (QGIS)](http://qgis.org/)

---

# Visualization frameworks for friends of code

---

This guide is about [P5.js](https://p5js.org). I choose to introduce all these visualization concepts with P5 for many reasons including:

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

- Some go-to's:
  - [Plotly.js](https://plot.ly/javascript/)
  - [Chart.js](https://www.chartjs.org/)
  - [Vega.js](https://vega.github.io/vega/)
- Caveats:
  - [D3.js](): D3.js is the standard visualizaition framework out there, but it is not a beginner friendly library. Luckily basically all the other visualizaition libraries wrap up some of the D3 complexity for us. Also, if you're not going to become a visualization coder, then D3 feels like overkill to me.
  - [R](https://www.r-project.org/) + [ggplot2](https://ggplot2.tidyverse.org/)
    - R is the swiss army knife of data visualization. It would maybe even be my

Scott Murray gives a great overview of the visualization charting and code library landscape out there in his book [Interactive Data Visualization for the Web](http://alignedleft.com/work/d3-book-2e).

> NOTE: we aren't really going to go into R or Python for data analysis and visualization. Those coding environments and their visualization and statistical libraries may be wonderful, but that opens up a whole different can of worms which we haven't gone over in this class - statistics!

---

# Chapter 1: Setup

---

Data visualization is a process of mapping data - numbers and text - to visual forms. It is also very much about doing research so you have something real to communicate about, coordinating and working on and with teams of people to make the visualizations, and figuring out strategies for publication and outreach. Regardless if you can focus in on specific pieces of this process - the aesthetics, the project management, the media publication strategy, the engineering, and so on - you should always strive to be critical and unfold as much of the politics of your data such that you do no harm. The [Journalist Code of Ethics has it right](https://www.spj.org/ethicscode.asp).

Data visualization is very much a design process - it's about iteration, trying things out, researching, trying things out some more, and so on and so forth until you land on something that effectively communicates the data you've set to communicate about. Sometimes that means deciding not to make a chart at all, but rather to just show the numbers in a table, other times it means making elaborate and complex animations or data dashboards.

Your role as a designer, researcher, and knowledgeable data visualization person is to do due diligence. In this guide we discuss a lot of programming concepts (in p5.js), but the goal is to contextualize them in the broader process of visualization so that you may one day speak to all the components from end to end.

## Research

If I've learned anything about design, it's that design and research are almost one in the same. I would argue that good design comes from good research and vice versa. Research comes in many forms and also is necessary for each part of the visualization process. Here's some questions that might pop up along the way:

During...

- **Concept**: What is your research question? How can data support or debunk your claims? What is the right medium for communicating your data? Would it be more effective to make a video or rather static charts? Is the web the medium of choice? Who is your target audience? What are similar projects? What research has been done in the space? Can I reach out to experts that might be able to speak to these questions or point to useful and trustworthy datasets?
- **Visualization**: Which charts can effectively allow me to explore the data I'm working with? Which charts can effectively communicate to others the data I'm working with? What are analogies and metaphors that may help with the communication? How can typography, color, and layout speak to the story?
- **Publication**: Where will your visualization be used? Brochures or posters or on the web? What are strategies for publication? Is your visual worth reaching out to media outlets and journalists? How do you make your visualization accessible? Is it important to make your data and accompanying analyses accessible or could that implicate the people in your data?

What are others that you might encounter? I'd love to hear! [Drop your comments here](https://github.com/joeyklee/datavis-with-p5/issues)

The research phase can be really messy, but having some go-to activites to get your process started is not a bad idea. Here's a few ideas:

### Literature Reviews

Literature reviews whether it is drawing from academic or scholarly literature or other media sources ranging from art projects to journalism or books will underlie your research. Read read read for goodness sakes! References are crucial for substatiating your claims, finding insight, learning new ways of seeing and approaching your data questions, and often times leads you to handy datasets. Here, your preferred web search engine is your best friend.

Often times I start with various publishers and then open up the leads from there.

You might read about literature reviews [here](https://guides.library.harvard.edu/literaturereview).

### Reach out to an expert

Literature reviews will lead you to domain experts - scientists, journalists, practioners, educators, researchers, and many more - who have worked in the space that you're interested to discover more about or visualize data about. Sure many people are busy, but it never hurts to send an email with a gentle _ping_ to say hello, express admiration for their work, and also inquire if they might have some time to illuminate some things for you. The worse thing that can happen is that people won't get back to you. The best case is that you know have a knowledgeable and powerful ally on your side interested to at the very least support your efforts with their experience and feedback.

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

## Getting started: structure, setup() & draw()

> "..We shape our tools and then our tools shape us”

When we decide to write code, we are making the decision to build our own software and as a result accepting that with more flexibility comes increased complexity. For visualization, this means that instead of using a an existing software with their own rules and advantages and disadvantages to turn data into something visual or tangible, we are choosing to create our own environment for doing so based on our own needs, wants, and desires.

Every programming language is different and provides different advantages and limitations. Javascript for example allows us to build things in a language that is native to your web browser. This is great because it allows us to share our visualizations across the web and make them interactive, dynamic, and networked which is what Javascript was built for. However, a disadvantage is that you can't load large data (> a couple megabytes) into your web browser without it starting to slow down or even crash. Other languages like Python might be great with working with larger datasets and for doing data analysis, but can't, for example, run in the web browser (for now). We naturally try to choose the right tool for the thing you want to accomplish - e.g. you'd never use a hammer to tighten a screw - and software is no different.

Alas! We've decided that for our purposes, P5.js will be our tool of choice. How does P5.js work? Let's start with the components of a P5.js project.

P5.js is what we call a [javascript library](https://www.techopedia.com/definition/3828/software-library). A **javascript library** is just a bunch of javascript code - a set of instructions - that lives inside a file usually ending in `.js` that it takes functionality of the javascript programming language and the browser environment (e.g it's ability to render in [canvas](), [HTML](), [SVG](), and [WebGL]()) and makes it easier to use or extends its functionality in a way that is waaaaay nicer than trying to achieve the same thing in an unabstracted way (abstracted in this sense means that we usually take complexity and hide that complexity). If you look at some p5.js examples, you might notice, for example, that it is really easy to make things like circles, lines, and curves or to create animations or make things happen when you press your mouse. Things that usually would take 10-20 lines of code become abstracted away so you can simply write `ellipse()` and have an ellipse appear or `mousePressed()` and track if /when your mouse is pressed. This is the magic of using code libraries - they allow you to do more while write less!

Let's take a jump now and look at how the developers of P5.js are asking us to structure our thinking and as a result allows us to use all the handy javascript functionality that they've so very nicely abstracted for us.

In a p5.js project, our folder structure will look something like this:

```
project_folder/
    |
    - index.html
    - sketch.js
    - style.css
    - libraries/
        - p5.js
        - p5.dom.js
        - p5.sound.js
```

You can [download an example boilerplate here](https://www.dropbox.com/s/6jmzif1olurnhtz/p5js-boilerplate.zip?dl=0).

In our `project_folder` we have 3 files: `index.html`, `sketch.js`, and `style.css` and a folder called `libraries` which contains the javascript libraries for p5.js. Here's some more info about each file:

- **index.html**:
  - This is our HTML file. Our HTML file references the rest of our files such as the javascript libraries in our `libraries/` folder and the `sketch.js` and `style.css` file.
  - You can also add any HTML elements you want such as `<h1></h1>` for headers or `<button></button>` buttons and later use them in your sketch (see the section on [HTML DOM selections using CSS classes]())
- **sketch.js**:
  - This is where all of our p5.js javascript will be written. For the rest of this document, pretty much everything you will do will be living in the sketch.js file. Here you write javascript to create the visualizations and interactivity you want to see.
- **style.css**
  - This is where your CSS styles are defined. Here you can add CSS that will style the page that you're working on.
- **libraries/p5.js**, _ **libraries/p5.dom.js**, _ **libraries/p5.sound.js**:
  - These are the p5.js javascript libraries files that contain all of the javascript code that allow you to do all the p5 things!

NOTE: if you've been using the [P5.js web editor](https://editor.p5js.org) then you will see more or less this same structure.

So now that we have an overview of what components are necessary to make a P5.js project, let's take a look what goes into the **sketch.js** file. Remember, we are writing javascript in p5.js to create our visualizations, so let's turn our full attention there.

Pretty much every P5.js _sketch_ has 2 main structure components: `setup()` and `draw()`. You will start every project like this:

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(200, 200, 200);
}
```

The way P5.js is structured goes like this:

- First, set up all of the things that our program needs to run like creating the drawing canvas, creating HTML elements, manipulating the state of a static dataset, and so on. This is what is encapsulated in the `setup()` function which runs only 1 time.
- Second, once you have your drawing canvas set up and whatever data or features of your page are ready to go, then move on to your `draw()` function which will run everything over and over again, **looping** 30 times per second (yes computers are fast!), in the order that you specified from top to bottom. Typically this means anything that you are visualizing (e.g. shapes) will go in here. We will also see that this **looping** is what allows us to create animations and to create interactivity.

In this example above, we are saying this:

- First, create a canvas that is 400 by 400 pixels wide.
- Next, create a background with the a grey color - RGB(200, 200, 200) - and draw that background color 30 times per second over and over and over.

You can 🔗 [see it running here](https://editor.p5js.org/joeyklee/sketches/ByiFL2P27)

**Why does this structure and environment matter?**

- With this setup and draw loop we essentially are commited to separating out our logical steps - our algorithm - from going from essentially nothing all the way to having a visualization that can be interacted with, that can animate and so on. This frames our thinking so that every time we or anyone runs our program, we know that every step of our process that we defined in our code will be executed exactly as we've written it, all the time, every time. It's about **transparency, readability, and reproducibility**.
- We've read a couple times now that everything in the `draw()` loop runs 30 times per second. This is one thing that is impressive about javascript - it is pretty fast - but more so about the [HTML Canvas]() element on which we are drawing on. Canvas in general is a relatively high performance renderer that supports all those shapes we know and love (e.g. ellipses and rectangles). While rendering 1000 SVGs might really bog down your web browser, Canvas can handle a couple thousand elements without much of a fuss. So next time you've got that dataset with 1000s of rows of data, you can be pretty sure that you should be able to work with it in P5.js

Before we move on let's look at one more example of the this `setup()` and `draw()` to demonstrate this idea again about how everything in setup is executed only once, whereas in draw, the actions are occuring over and over again.

```js
function setup() {
  createCanvas(400, 400);
  // change the color mode from RGB to HSB
  colorMode(HSB);

  // change the default frameRate from 30 fps to 5 fps
  frameRate(5);
}

function draw() {
  // each time through draw, give me a hue of 317, a saturation of 100, and brightness of a random number between 50 and 100
  background(317, 100, random(50, 100));
}
```

If you ignore the fact that you've never seen these functions like `colorMode()` or `frameRate()`, we can read what we're seeing like this:

- `setup()`:
  - 1. create a canvas that is 400 px by 400 px wide
  - 2. change the `colorMode()` to HSB. Since the default is RGB, we need to specify if we want to change the ways that color values are interpreted.
  - 3. change the `frameRate()` - the frequency that the `draw()` function is called per second - from the default which is 30 to a selected number like 5 frames per second.
- `draw()`:
  - over and over again each time through draw, give me a hue of 317, a saturation of 100, and brightness of a random number between 50 and 100.

You can 🔗 [see it running here](https://editor.p5js.org/joeyklee/sketches/H1z-yawnm)

<!--

In any visualization context, you need a place to make your visualization. Whether your visualization is living on a screen like your web browser or a tablet at a gallery or it's being projected onto the side of a building or printed as a poster, you will have some kind of environment in which your visualization will be living. P5.js is our working environment that gives us the flexibility to create visualizations so that they can live on the web, or on that tablet at a gallery, or on that building's wall space, or provide that .PNG for that poster you're making. It affords us a lot of flexibility, but that means we n -->

## Chapter 1 Summary

In this chapter we've introduced a number of visualization platforms and some visualization coding frameworks. We taken some time to think about what it means to start a visualization project, what directions you might take to begin your research with literature reviews and expert interviews, and what types of questions or tools you might use to approach turning your research and visualization ideas into something more concrete using moodboards, sketches, wireframes, and proofs of concept and prototypes.

We dove into why we would choose to code and why what P5.js affords us, its advantages and disadvantages. We learned about how structure can help us to make more readable, accessible, and reproducible visualizations and got into how the `setup()` and `draw()` functions work; their structure providing a way for us to logically step through our code that are about setting up our environment - `setup()` - and the other which is about drawing and interactivity - `draw()`.

## Chapter 1 References

- TBD

---

# Chapter 2: Aquire / Parse

> ↱ **aquire** → **parse** → filter → mine → represent → interact → refine ↲

---

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
  - When were the data collected? What were/are the prevailing political/economic/cultural prejudices/paradigms/norms that might influence the data (e.g. _The Averaged American_)?
  - At what frequency were the data collected? Every second? Monthly? Yearly? Every 10 years?
- **Where**:
  - Where were the data collected? How might geography play into the outcomes of the data that are available to you? E.g. Do the data only come from rich, white neighborhoods or only poor, minority neighborhoods?
  - How might geography, such as city size / population size or topography and terrain, need to be considered to ensure your statistics and visualizations are sound?

There are many more questions that you can consider - the more you work with and read about the ways that data are being used to shape our every day experiences, the more you will be able to speak to some of these questions. For helpful resources, see:

- Alberto Cairo's [The Truthful Art](https://www.oreilly.com/library/view/the-truthful-art/9780133440492/),
- Nathan Yau's [Data Points](http://flowingdata.com/data-points/), and
- Cathy O'Neill's [Weapons of Math Destruction](https://weaponsofmathdestructionbook.com/) are very helpful resources in this regard.

When you've nailed down your research questions and are ready to start looking for data, here's just a few links to data sources:

- [Beta NYC Open Data List](https://docs.google.com/spreadsheets/d/1R7O_FZLNB8VV5eoPDNATb-f0njjUsJwmz22cT_OB3fw/edit#gid=0)
- [Aure's List of NYC Data](https://github.com/sva-dsi/2017-fall-course/blob/master/lectures/maps.md#mapping-data)
- [Awesome lists public data](https://github.com/awesomedata/awesome-public-datasets)
- [Data.gov](https://www.data.gov/)
- [EU open data portal](https://open-data.europa.eu/en/data/dataset?q=cordis)
- [Five Thirty Eight Open Data](https://data.fivethirtyeight.com/)
- [Open Data Portals by Country](https://www.opendatasoft.com/a-comprehensive-list-of-all-open-data-portals-around-the-world/)
- [Jeremy Singer Vine - Data is Plural](https://tinyletter.com/data-is-plural)
  - and [the list here](https://docs.google.com/spreadsheets/d/1wZhPLMCHKJvwOkP4juclhjFgqIY8fQFMemwKL2c64vk/edit)
- [NYC Open Data Portal](https://opendata.cityofnewyork.us/)
- [Crisis Lex](http://crisislex.org/tweet-collections.html)
- Universities often have data available:
  - [UCLA](https://gis.ucla.edu/geodata/)
  - [Columbia University](https://geodata.library.columbia.edu/)
  - ... web search e.g.: geodata + UC berkeley
- [Carto Data Observatory](https://carto.com/developers/data-observatory/)
- [USGS Earth Explorer for Aerial Imagery](https://gisgeography.com/usgs-earth-explorer-download-free-landsat-imagery/)
- Open access scientific data is often stored in places such as:
  - [Zenodo](https://zenodo.org/)
  - [Open Science Data Cloud](https://www.opensciencedatacloud.org/)
  - [Pangea.de](https://www.pangaea.de)
  - [Figshare](https://figshare.com/)
  - And a very well documented list by category, by [Nature.com](https://www.nature.com/sdata/policies/repositories)

## APIs

API - Application Programming Interface. This is one of those acronyms that gets tossed around in conversation like, "hey why don't you just query the _insert tech company name_ API" or "I did my analysis by getting data from the Twitter API" and so on.

An API is essentially a way for you - a third party entity - to get access to certain data and functionality from some web based service. API's are what allow Apple's iPhone to get the weather data for all the cities across the world (the [Weather Channel API](https://weather.com/datafeeds)) or you to make a [Twitter Bot](https://shiffman.net/a2z/twitter-bots/) or to use [random cat images](https://cataas.com/#/) from across the web. Many companies create entry points into their data (or the data you're producing while using their service) to enable their products to be used in applications outside of their own. Probably the best example of this is the [If This Then That](https://ifttt.com/) service that allows you to string together different APIs (e.g. "Tell Spotify to play song X every time the temperature of NYC measured by the Weather Channel is over Y degrees").

How do APIs work? Typically they work in a typical client-server or server-server relationship. You, the client, make a `GET` request to get data from an API using a `url endpoint`. For example, let's say we're trying to get the life expectancy data from [API.population.io](http://api.population.io/). We can get back our data by following the API endpoints which specify a `base url` and then the following `query parameters`.

> http://api.population.io/1.0/life-expectancy/total/male/United%20Kingdom/1952-03-11/?format=json

where:

- base url: `http://api.population.io/`
- endpoint: `life-expectancy/total/{sex}/{country}/{date-of-birth}/`

There are **public APIs** and **private APIs**. Public APIs, like the example above, do not require you to use an **API key** whereas **private APIs** require you to use an **API key**. An API key is a unique string of letters and numbers that indicate a unique identifier for the person and/or "application" that is making requests to the API in question. API keys are often required to allow the API providers to keep track of how many times you've made requests to their servers, to see what kind of data you're requesting, and so on. Often APIs will have limits to the amount of times you can make requests so that you don't bog down or become a hog of the API service provider's server resources and/or to prevent attacks.

When making API requests using your API key, typically it gets sent as a URL parameter like so:

> https://api.mapbox.com/styles/v1/mapbox/light-v9/static/-73.995484,40.742357,11,0,0/1024x512?access_token=pk.eyJ1Ijoic3ZhLWRzaSIsImEiOiJjam5tZTNtbnUwMWc4M3FwbjdjZmEwbHJ3In0.hNND3ubo41QFYOyCm-22ng

where:

- base url: `https://api.mapbox.com/`
- endpoint: `styles/v1/mapbox/light-v9/static/-73.995484,40.742357,11,0,0/1024x512`
- access token: `?access_token=pk.eyJ1Ijoic3ZhLWRzaSIsImEiOiJjam5tZTNtbnUwMWc4M3FwbjdjZmEwbHJ3In0.hNND3ubo41QFYOyCm-22ng`

Imagine the URL saying, "Hey! api.mapbox.com, give me this style map at these coordinates and zoom level and aspect ratio. Oh you want my access token? Here it is..."

By understanding how to get data from API's it opens up a whole world of possibilities. You can create dynamic applications that respond to user input, you can access massive and complex datasets and analytical capabilities of powerful servers out there, and do things that otherwise would be really hard to do. Hooray for APIs!

Some nice APIs to try out:

- [Random Dog Api](https://dog.ceo/dog-api/documentation/random)
- [International Space Station API](http://open-notify.org/Open-Notify-API/)
- [Awesome Public List of APIs](https://github.com/toddmotto/public-apis)
- [Open APIs list](https://github.com/toddmotto/public-apis#open-data)
- [Population.io](api.population.io)

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
  - JSON objects can be stored as a list in an array [] and they can also contain a key:value pair in which the value is a another key:value pair, a plain array, or an array of objects! Oh so many combos!
  - the same csv activity data above could be re-written in JSON. I've used this online [csv to json](https://www.csvjson.com/csv2json) application for this example. Notice how we have an array of objects, one object for each row of that CSV data above. :

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

## Objects {}

Now that we've been exposed to JSON objects, let's look at why they are an interesting format to store and retrieve data from. First of all, they are flexible. Since the only requirement of JSON objects is that they are structured as a set of key:value pairs, they can help us establish logical heirarchies that help us make sense of the data that we're collecting or using.

Let's take this example describing me as a JSON object. If I had to describe myself what would be the properties of me? Let's start with my **name**.

```JSON
{"name": "joey" }
```

Ok that's easy enough, but there's a lot more to me that I could tell you about, let's add some more properties that speak to me as a person such as where I was born, favorite food, how many coffees I drink per day usually, whether I'm multilingual or not, and where I currently live, :

```JSON
{
    "name": "Joey",
    "born_state":"California",
    "born_country":"United States",
    "favorite_food":"Korean",
    "typical_coffees_per_day": 2,
    "multilingual": true,
    "has_phd": false,
    "current_location_city": "Brooklyn",
    "current_location_state": "New York",
    "current_location_country": "United States"
}
```

Here we added a comma, then introduced another set of key:value pairs. Notice that our keys must always have quotations - e.g `"keyName"` - whereas the values of the key:value pair can have strings (require `"string value"` quotations), numbers, or boolean (true/false) values.

We can re-model our JSON data to be a bit more semantically structured, meaning, we can create heirarchies in the JSON object that do a better job at organizing our data. I've added a few changes to the data as you will notice, for example:

```JSON
{
    "name":"Joey",
    "origin":{
        "state":"California",
        "country":"United States"
    },
    "current_location":{
        "city":"Brooklyn",
        "state":"New York",
        "country":"United States"
    },
    "favorite":{
        "food":"Korean",
        "city":"Vancouver",
        "transport":"Rack Railway"
    },
    "habits":{
        "coffees_per_day": 2,
    }
}
```

See how we can start to think about modeling data by creating heirarchies of classification? You'll notice that the more you work with JSON datasets, either ones that you produce or those that you retrieve from various APIs or data dumps, that the heirarchies play a big role in how you work with the data at hand.

In the section on [variables](), we will see how we can access the various values from given a name of the key that is in that JSON object.

## Arrays []

Arrays are one of the most basic and universally used data types. They are just lists. These lists can be of values such as:

```JSON
["hello", "lovely", "people"]

// or

[1, 2, 3, 4, 5, 6 ]

// or

[true, false, true, true, false]
```

or they can contain JSON objects:

```JSON
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

or even other arrays:

```JSON
[
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
```

Hopefully by now you can see just how data might be organized. It may not be entirely clear why you might have an array of arrays, but there are certainly use cases for such structures.

Using this understanding of arrays, we can add some more complexity to our Joey JSON object:

```JSON
{
    "name":"Joey",
    "origin":{
        "state":"California",
        "country":"United States"
    },
    "current_location":{
        "city":"Brooklyn",
        "state":"New York",
        "country":"United States"
    },
    "favorite":{
        "food":"Korean",
        "city":"Vancouver",
        "transport":"Stuttgart's Zahnradbahn",
        "hobbies": ["climbing", "reading", "skateboarding", "photography", "cooking", "side projects", "learning"],
        "recommended_videos": [
            {
                "title":"solos",
                "url":"https://vimeo.com/222582596"
            },
            {
                "title":"Moiré",
                "url":"https://vimeo.com/2525839"
            },
            {
                "title":"Night on earth - LA",
                "url":"https://www.youtube.com/watch?v=UR6pmB09s5U"
            }
        ]
    },
    "habits":{
        "coffees_per_day": 2,
    }
}
```

Hmm that's interesting, this is starting to look like a detailed profile of me. Perhaps a profile that some kind of web service like twitter or google or facebook might have learned about me. Notice how we've added key:value pairs but now some containing arrays. We have an instance of `favorite.hobbies` which is an array of some of my favorite hobbies, and `favorite.recommended_videos` which is an array of objects containing information about some videos I like.

Now imagine you had this kind of profile, with much more information about your browsing habits, the things you clicked on, the things you ordered, etc, but on a massive scale of billions of people. One person's data analysis quest may be another person's nightmare.

Now that we've successfully mashed up our understanding of arrays and objects, let's take a look at how we can get back that data from those arrays and objects. In the section on [variables](), we will see how we can access the various values from given a name of the key that is in that JSON object or an index position on an array.

**Why should we care about data formats and types?**

- Regardless if you become a visualization guru or drive the conceptual development of a visualization research project and do no coding at all, at the core of all of your efforts will be some kind of data. If you find yourself collecting data or using a dataset coming from anything from sensors to survey, you will be engaging with some kind of data heirarchy, structure, and logic (or illogic) that will drive what kinds of things you might uncover in the data or perhaps even what kind of expertise you might need to hire to address gaps in your team's capabilities.
- Being able to ask questions like "how to traverse a JSON file" or "how to loop through an array of JSON objects" are crucial for being able to solve your own data issues.

## Variables

Let's talk about variables.

In our lives, when we think about variables, what comes to mind? You might think of all the variables that might be causing your subway train delays - is someone holding the doors down the line? was there an accident? Or if you think about your daily lunch dilemma as a result of the many variables - do I order a sandwich or sushi? should I get a latte or a cappucino? These variables are speaking to the variability or variety of possibilities that serve to explain, for example, why your train might be late or why you're feeling lethargic after lunch (shouldn't have gotten that 🍝).

In data analysis and visualization, variables are similar to the examples given above. The variables we narrow in and focus on are interesting because they have the potential to _explain or characterize_ a certain phenomenon, its dynamics, and/or how and why that phenomenon might be occuring. On a simple level, you might attribute your post-lunch lethargy to that pasta bolognese you just ate. Given your gluten intolerance and the heavy beefy sauce you just consumed, it is no wonder why you are feeling tired (and maybe even ill!). On a more complex level, the variables behind a city's air pollution standard index might include a slew of data such as weather (e.g. temperature, pressure, wind speed and direction, solar radiation), traffic counts, and building energy use. So when we talk about the variables we're analyzing and visualizing, we're almost always talking about the properties or data which speak to our phenomenon of interest.

In programming, such as in p5.js (and javascript more generally), we can abstract and apply this idea variables to the way our software program handles data. Let's look at an example in javascript:

```js
var flowerColor = 'red';
var flower_petal_count = 6;
var flowerSpecies = 'petunia';
var extinct = false;
```

where, for example:

- **var**: this tells our javascript that we're making a new _variable_. Everything after the `var` keyword is the variable definition.
- **flowerColor**: this is the name of our variable. Here we are saying that the word _flowerColor_ is storing the **value** `"red"`. The variable name can be anything, but it is more helpful if it indicates something about the data it is assigned.
- variables can be assigned a single value such as a number, a word, a character, boolean (true/false)

There are a number of ways you'll see variables being defined in javascript. We'll see more examples throughout this guide. The important thing to know is that variables are **declared** and **assigned** values or functionality which can be later **updated** and **used** across a program.

We will later see how variables don't just contain values, but also can contain functionality as well - variables can be assigned functions! But before we go there, why don't we look at how we can assign arrays and objects variables and also retrieve the values of interest from those arrays or objects.

Let's start with a simple JSON Object example:

```js
var program = {
  department: 'DSI',
  address: {
    address1: '132 W 21st St',
    address2: '5th Floor',
    city: 'New York',
    country: 'United States'
  }
};
```

To get the various values from the keys here, we use JS `.` dot notation to access the properties of the JSON object in question.

```js
console.log(program.address.address1);
console.log(program.address.address2);
console.log(program.address.city);
console.log(program.address.country);

var locationStatement =
  "SVA's " +  program.department +  " program is located at " +
  program.address.address1 +
  ' on the ' +
  program.address.address2 +
  ' in the great city of ' +
  program.address.city +
  '.';

console.log(locationStatement);
```

Imagine you were making the website for SVA's DSI program - it doesn't make sense to copy and paste your address everywhere throughout your site. This could lead to errors later down the road. Rather you'd want to just create one source of truth then make references to that data's properties later on. Anyways, in this small example, it is just to show you how the `.` dot notation works to access the properties of a JSON object. Notice we can chain together the `.` dot accessor to go deeper down into the JSON object heirarchy.

In the case of arrays, we use the index position. The index position is where in terms of position a value is located in the list. In javascript and in many programming languages, arrays are indexed starting at 0. Instead of the `.` dot notation, we use the array position operator to get the specified value from the given index number.

```js
var joeysHobbies = [
  'climbing',
  'reading',
  'skateboarding',
  'photography',
  'cooking',
  'side projects',
  'learning'
];

console.log(joeysHobbies[0]); // prints climbing
console.log(joeysHobbies[1]); // prints reading
console.log(joeysHobbies[2]); // prints skateboarding
console.log(joeysHobbies[joeysHobbies.length - 1]); // prints learning, the last position of the array given it's length - 1 since we have a 0 index

for (var i = 0; i < joeysHobbies.length; i++) {
  console.log('Any time I have free time, I want to go ' + joeysHobbies[i]);
}
```

Given your understanding of how to get back data from arrays and objects, can you get back the second object of the "recommended_videos" array in the profile of Joey as defined as a JSON object? What are the steps to do this?

1. save that json object to a variable
2. use the `.` dot notation to traverse down into that JSON object.
3. use the array index position of that second object in that array
4. get the URL to a beautiful generative music visualization by Defetto.



## Functions

[Functions defined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).

> [What does I/O even mean?](https://en.wikipedia.org/wiki/.io/)

So far we've been talking mostly about data, the forms they take, and the ways we can access the various properties that are within them. In the context of data visualization, you can think of data as being the fuel that feeds our software machinery. Our machinery, whether you are using a GUI based visualization platform or building your own with code, contain dozens, hundreds, maybe even thousands of components that perform different functions that can use that fuel (aka the data) to do work. 

Let's use a bike as an example of a machine that takes and input - energy - and provides an output - travel distance. Each object of the bike - the wheels, the breaks, the pedals - have functionalities - they roll, they prevent movement, they enable acceleration and properties - round & rubber, metal & creaky, plastic & tough. If you liken software to a bike, then you can think of the software as composed of many objects - data, math, graphics - which have functionalities - read & parse, multiply & divide, render & animate - and properties - length & size, {TODO}, color & size. Knowing what kinds of objects that are part of your software and therefore the functions that are available to you will enable you to learn what kinds of capabilities your software can provide. 

If we take, the [P5.js library](https://p5js.org/reference/) you can see that there are a number of objects shown at the top of the page - color, constants, data, environment, events, etc. If you navigate to each of those links you will find each contains a number of functions that take some kind of input and provide some kind of output - data I/O (this is why so many startups and tech companies take the .io URL. Actually .io stands for Indian Ocean). 

Functions each have their own set of input parameters (the data you pass in) - e.g. the color function might take a number between 0 - 255 for RGB `color({R}, {G}, {B})`. These parameters could be **hard coded** in, meaning that you directly enter the values you want that function to take OR they can get their input from some data source. 

Let's take a look at some p5 functions here:

```JS

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  ellipse(mouseX, mouseY, 50, 50);
}

```
https://editor.p5js.org/joeyklee/sketches/HJIgA_unQ

P5.js has a [Shape object](https://p5js.org/reference/#group-Shape) that have different functions for creating different shapes such as the ellipse that we see moving on the screen above using the `mouseX` and `mouseY` variables that are in-built to the [Events object](https://p5js.org/reference/#group-Events) of P5.js. If you've actually opened those links, you might start to see a trend. P5 provides a reference to all of these Objects, their properties, and all of their functionality. 

**But what is inside a function?** What are the things that allow functions to take an input and return an output. Well, functions are just blocks of code which are executed quite often in the order that they have been written from top to down that are essentially instructions on how to take whatever input is passed in as a parameter and returns those changes that have been executed on that input. These instructions might be like, "multiply this number", then "remove all NULL values", then "change all text to uppercase", then return that altered data as a new data object. 

> Long story short, functions encapsulate a set of instructions on how to take some input and return an output. 

In P5.js, you are making your own custom visualizations or programs, by adding functions - aka adding instructions - to the `setup()` and `draw()` functions. Therfore, in the end, your `setup()` and `draw()` functions encapsulate your own custom instructions on how to make your visualization. Isn't that neat?!

**Why does this matter?**

* Functions lay at the heart of every software, whether it is a GUI interface platform or in code. Knowing how to find the different functions you want to achieve your goals is central to your success in making visualizations that are satisfying to you and your audience. Knowing how to find the right function for your job might also save you a lot of heartache, pain, suffering, and wasted time. 
* However sometimes, and quite often, the program you're using or writing might not have exactly the functionality you need. You will then have to define some custom functions in order to acheive your goals. The next section covers this.


## Custom functions

Custom functions allow you to create your own set of instructions on how to manipulate data, make a custon visual object, and much more. Each language has their own way of defining custom functions, but in javascript they can be written in the two ways that you see below. 

- In this example, we create a function that returns the sentance, "Hello, {a person's name}". Notice how person is a variable that get's combined with the "Hello, ". This is the great thing about using variables and functions because let's say we have a list of 100 names, rather than writing out "Hello, Mary Beth", "Hello, Loo", "Hello, Kubo", and so on, we can make the computer loop through all our names and use our `greeting()` function to write all that out for us.

### Method 1: defining a variable and assigning it a function

```js
var greeting = function(person) {
  return('Hello, ' + person);
};

greeting('Joey');
// returns: "Hello Joey"
```

### Method 2: assigning your function to it's scope

```js
function greeting(person) {
  return('Hello, ' + person);
}

greeting('Joey');
// returns: "Hello Joey"
```

- just as variables can be assigned a hard coded value and given a set of instructions in the form of a function, variables can also be assigned to the **result of a function**. What does that mean you ask? That means that when we run a function, it will do a bunch of operations - maybe some math, maybe some parsing, maybe some ordering and arranging of things - and then give you the result in some shape or form. There are some functions that do not return anything, so we'll have a look at some of those too. Let's look at a few examples:

### Functions that return data

**Example 1: assigning the result of our greeting function to a variable**

```js
function greeting(person) {
  return 'Hello, ' + person;
}

var greeting_to_joey = greeting('Joey');
// console.log(name_of_variable) will print out what's assigned to that variable.
console.log(greeting_to_joey);
// prints "Hello, Joey"
```

In the example above, we store the result of `greeting("Joey")` to a variable called **greeting_to_joey**. Then we can use that "Hello, Joey" later on.

**Example 2: assigning the result of our greeting function to a variable with numbers**

```js
function calculate_co2_output(vehicleKilometersTraveled, emissionsFactor) {

    var emissions_in_grams_co2 = vehicleKilometersTraveled * emissionsFactor;

    return(emissions_in_grams_co2);
}

var joeys_car_emissions = calculate_co2_output(5000, 85);
// console.log(name_of_variable) will print out what's assigned to that variable.
console.log(joeys_car_emissions);
// prints 425
```

In this example, we create our own custom function to calculate the emitted CO2 in grams of one's travel behavior based on travel distance and an "emissions factor" (aka a number of grams of co2 emitted per vehicle kilometers traveled).

**Example 3: a custom function that doesn't return anything**


```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  customShapes();
}

function customShapes(){
  noFill();
  ellipse(mouseX, mouseY, 50, 50);
  
  rectMode(CENTER)
  rect(mouseX, mouseY, 100, 100);
  
  line(mouseX - 80, mouseY - 80, mouseX +100, mouseY + 50);
}

```

https://editor.p5js.org/joeyklee/sketches/rJeiwKd2Q

In this example, we define a custom function to make a custom collection of shapes. If you think about some of [Georgia Lupi's ]() and [Stephanie Posavek's]() work on the [Dear Data]() project, you can see how they have each defined their own custom visualizations for each day of each week of their hand drawn data visualizations. With computation, you could define your own custom functions that, given some input data, would start to generate these forms. This is what we might call "generative design" in which we parameterize forms and feed in inputs that result in a visual which reflect the rules of the system we've designed.


## loadJSON()

We've seen how we can create our own JSON objects, and fill them with properties and values using key:value pairs. However, in the context of data visualization, we're quite likely going to be using JSON structured data that was created by some other system or service. For example, most APIs out there will return data in the form of JSON. Similarly, lots of sensors might also store data in a JSON format. Let's see how loading and parsing of JSON data works in the context of P5.js. 

P5.js comes with a suite of data loading and handling functions - of which they label under the [IO category](https://p5js.org/reference/#group-IO) - one these loading and handling functions is the `loadJSON()` function. 

The `loadJSON( <path to file or url>)` function is awesome in that it knows whether the file you are requesting is coming locally from your project or from a URL on the web. Therefore if we know that our data is in the JSON format, we can use the `loadJSON()` function to retrieve the JSON data wherever it is living. 

What `loadJSON()` will do is:

* make a GET request to your own server where your data is living or the API url that you've given it 
* read that retrieved data and try to parse it as a JSON object
* if the data is a valid JSON format, then it will pass the retrieved data on to be used.

There are 3 methods of using `loadJSON()` which I will outline here.

### Method 1 - callbacks: *I ain't no hollaback girl*

```JS

loadJSON("your URL here", function(myData, error){
    console.log(myData);
});

```




### Method 2 - async/await: ES6 syntax for dealing with asychronicity

```JS

async function retrieveJSON(URL){
    var myData = await loadJSON(URL);

    // do actions on that data
    console.log(myData);
}


function setup(){
    createCanvas(400, 400);

    // call your retrieve data function here - all of the logic and instructions for working with your
    // data must go inside that function you created
    retrieveJSON("your url here")
}

function draw(){
    background(220);

}

```

### Method 3 - preload: loading data at the beginning


```JS
// declare a variable called myData
var myData;

// preload() allows us to make sure to load images and data before the rest of our program runs
function preload() {
  // use the loadTable() function to load our csv file of NYC's stop and frisk data
  myData = loadJSON("your data url");
}

//
function setup() {
  // we log the result of that data and convert it to an array of objects
  console.log(myData.getObject());
}

function draw() {
  background(220);
}

```


## loadTable()

### Method 1 - callbacks:

### Method 2 - async/await:

### Method 3 - preload():


Let's take a look at something a bit more substantial like when we load data in P5.js. Here we:

1. declare a variable called **myData**
2. use the loadTable() function to load our csv file of NYC's stop and frisk data for January 2017. Our loadTable() function lives inside the `preload()` function because we want to make sure it can
3.

```js
// declare a variable called myData
var myData;

// preload() allows us to make sure to load images and data before the rest of our program runs
function preload() {
  // use the loadTable() function to load our csv file of NYC's stop and frisk data
  myData = loadTable(
    'https://gist.githack.com/joeyklee/9ef7248c74038ef9df82152772398d1f/raw/39f1bb753d46bf554e35c86055410a910dd846e2/stop-and-frisk-nyc-2017.csv',
    'header',
    'csv'
  );
}

//
function setup() {
  // we log the result of that data and convert it to an array of objects
  console.log(myData.getObject());
}

function draw() {
  background(220);
}
```

You can 🔗 [see it running here](https://editor.p5js.org/joeyklee/sketches/SyvgItU3Q)


## preload()

The `preload()` function is not only for data in the form of tables, but can be used for other things that need to be pulled in from the network that you want for your program to injest before moving on to the `setup()` and `draw()` functions. This means that before you go through `setup()` and `draw()` you can set in a number of functions in `preload()` to ensure that things like images, videos, and data get loaded before your program starts to do its thing.

### preloading images

```JS

let myImage;
function preload(){
	myImage = loadImage("you-got-this.png")
}

function setup() {
  createCanvas(400, 400);
  print(myImage)
  noLoop();
}

function draw() {
  // background(220);
  image(myImage, 0,0, myImage.width/2, myImage.height/2)
}

```

https://editor.p5js.org/joeyklee/sketches/SJDrS0Yt7

Assuming we have an image in our projet folder called "you-got-this.png", we can load the image using the `loadImage()` function, then later reference the `myImage` variable in the `draw()` function.

### preloading video

TBD
```JS

```

## Chapter 2: recap

In Chapter 2 we've covered fundamental components of where data comes from, where we can get data  whether from data portals or from APIs, the formats that data come in, how to accsss the various properties of data depending on the format in which they come, and how we might use existing functions of the programs we're using, how we migth search for thsoe functions, and how we can begin to create our own custom functions to handle data I/O and custom visualizations. We looked at a couple ways of reading in data to our P5 programs and 3 iterations on how to handle data loading in the context of javascript and the web. Last, we learned that preload() is a way of loading in all of our necessary data - whether it be sounds files, video files, or data sets - before the rest of our program runs. 

* Data Sources
* APIs
* Data Formats
* Objects {}
* Arrays []
* Variables
* Functions
* Custom functions
* loadJSON()
* loadTable()
* preload()




## Chapter 2 References

* ...

---

# Chapter 3: Filter

> ↱ aquire → parse → **filter** → mine → represent → interact → refine ↲

---

Almost always you will need to filter data. Whether it is because you want to focus on a **subset** of the data or you know that there are data points that have unrealistic values, you're going to need a way to just get the data that you want. There are a lot of ways to do this so there's no right or wrong answers, but here I'm aiming for clarity rather than efficiency.

## P5.Table & P5.TableRow: .findRows()

When working with tabular data, we are afforded some handy functions that are made available when we use the `loadTable()` function and assign that loaded data to a variable. The loaded data which is our tabular dataset is converted into a **[P5.Table](https://p5js.org/reference/#/p5.Table)** object that comes with a bunch of helpful functions that we can use when working with our data. Let's say we load our stop and frisk data to a variable called `myData`, we can then do things like:

- `myData.findRows( <the value you want to find> , <the name of the column> )`:
  - results in an array [] of P5.TableRow objects - the [P5.TableRow](https://p5js.org/reference/#/p5.TableRow) objects contain references to our original dataset so in order to get the data we're looking for, we need to use functions that are part of the [P5.TableRow](https://p5js.org/reference/#/p5.TableRow) object.
    - Let's say we have an array of [P5.TableRow](https://p5js.org/reference/#/p5.TableRow) objects called `mySubset`, we get values from each object in that array by doing: `mySubset[0].get(<name of column>)`.
- `myData.getColumn(<the name of the column>)`:
  - results in an array [] of the values specified in that column

There are more functions that allow you to get and set data of P5.Table object that you can see here: https://p5js.org/reference/#/p5.Table

<!-- STOP_WAS_INITIATED: "Based on Self Initiated" -->

```js
// declare a variable called myData
var myData;
var selfInitiatedStops;
function preload() {
  // use the loadTable() function to load our csv file of NYC's stop and frisk data for january of 2017
  myData = loadTable(
    'https://gist.githack.com/joeyklee/9ef7248c74038ef9df82152772398d1f/raw/39f1bb753d46bf554e35c86055410a910dd846e2/stop-and-frisk-nyc-2017.csv',
    'header',
    'csv'
  );
}

function setup() {
  createCanvas(400, 400);
  // we convert myData from it's table form to an object
  console.log(myData.getObject());

  // we create a subset of our data by using the findRows()
  selfInitiatedStops = myData.findRows(
    'Based on Self Initiated',
    'STOP_WAS_INITIATED'
  );
  console.log(selfInitiatedStops[0].get('SUSPECTED_CRIME_DESCRIPTION'));
  console.log(selfInitiatedStops[1].get('SUSPECTED_CRIME_DESCRIPTION'));
  console.log(selfInitiatedStops[2].get('SUSPECTED_CRIME_DESCRIPTION'));
  console.log(selfInitiatedStops[3].get('SUSPECTED_CRIME_DESCRIPTION'));
  console.log(selfInitiatedStops[4].get('SUSPECTED_CRIME_DESCRIPTION'));
  console.log(selfInitiatedStops[5].get('SUSPECTED_CRIME_DESCRIPTION'));
}

function draw() {
  background(220);
}
```

You can 🔗 [see it running here](https://editor.p5js.org/joeyklee/sketches/BJ2kMAwnX)

- Here, we use the `.findRows()` function on the `myData` P5.Table object to get an array of P5.TableRow objects which get assigned to the `selfInitiatedStops` variable containing references to the rows of data in our original dataset where the specified value matches the specified column. Here we're looking for the stop and frisks that were "self-initiated". We then print to the console the first 6 values in the `selfInitiatedSteps` array with the property `SUSPECTED_CRIME_DESCRIPTION` and see that we get these results:

```
TERRORISM
TERRORISM
GRAND LARCENY AUTO
CRIMINAL MISCHIEF
CRIMINAL MISCHIEF
TERRORISM
```

We've hardly dug into the data, but alarms might be ringing in our brains: "Here's the NYC stop and frisk data, a notoriously fraught method of policing, and we have a category of data that tells us a short justification why an officer might have spent 30, 60, 90 minutes or more confronting people in the streets. Without any other reason than the officer's own impetus, we see that the justification for their confrontation is ambiguously categorized as 'Terrorism'. Other properties of the data such as how much time passed before intervening, the rank of the officer, and so on. What is the data telling us? What is the data hiding? Can we trust what is reported?"

You might be wondering...**how do you know what the column names are?** or **how do you decide which properties to examine?** These are important questions that can be answered if you look at the data's **metadata**. **Metadata** are information about the data that you're using. In the metadata you should find out information such as:

* when the data was created
* who created the data
* who to contact if you have questions about the data
* what are the properties of the data? e.g. what do the column names mean?
* how the data were calculated

These information are indispensible for how and what you discover about the data that you're interrogating. In the example above, the [metadata of the stop and frisk data](https://data.cityofnewyork.us/api/views/ftxv-d5ix/files/9cecce6d-baca-4a60-be9d-31501b5639f0?download=true&filename=2016-sqf-file-spec.xlsx) can be found in this Excel spreadsheet (TODO: export to pdf or more friendly accessible file format).

You can see some analyses of the [NYC Stop and Frisk Data by the ACLU](https://www.nyclu.org/en/stop-and-frisk-data).

<!--
## P5.Table: for Loops and Conditional Statements: `If/else` and `for` using .getRow();

```js

// declare a variable called myData
var myData;
var selfInitiatedStops = [];
function preload(){
    // use the loadTable() function to load our csv file of NYC's stop and frisk data for january of 2017
    myData = loadTable('https://gist.githack.com/joeyklee/9ef7248c74038ef9df82152772398d1f/raw/39f1bb753d46bf554e35c86055410a910dd846e2/stop-and-frisk-nyc-2017.csv', 'header', 'csv');
}


function setup(){
    createCanvas(400, 400);

    // for all of the data objects in the myData object,
    // if the STOP_WAS_INITIATED property is equal to 'Based on Self Initiated'
    // then push that object into the selfInitiatedStops array;
    for(var i = 0; i < myData.length; i++){
        var myRow = myData.getRow(i);
        if( myRow.get('STOP_WAS_INITIATED') == 'Based on Self Initiated' ){
            selfInitiatedStops.push(myData[i]);
        }
    }

}

function draw(){
    background(220);

}

``` -->

## P5.Table: .getObject() → for Loops and Conditional Statements: `If/else` and `for`

In the example above, we saw how we can get a subset of data based on a specified value and its associated key or column name using the `.findRows()` method on a `P5.Table` object. However sometimes you may need more flexibility in accessing the different properties of the data. We can use the `.getObject()` method on our `P5.Table` object to get back a JSON object of our table. Then, we can loop through our data using a `for` loop, and use a conditional statement with an `if` statement specifying what property we are looking for. If whatever condition or conditions we've specifed evaluate as `true`, then we can `.push()` those objects to our `selfInitiatedStops` array [].



```js
// declare a variable called myData
var myData;
var selfInitiatedStops = [];
function preload() {
  // use the loadTable() function to load our csv file of NYC's stop and frisk data for january of 2017
  myData = loadTable(
    'https://gist.githack.com/joeyklee/9ef7248c74038ef9df82152772398d1f/raw/39f1bb753d46bf554e35c86055410a910dd846e2/stop-and-frisk-nyc-2017.csv',
    'header',
    'csv'
  );
}

function setup() {
  createCanvas(400, 400);
  // we convert myData from it's table form to an object
  myData = myData.getObject();

  // for all of the data objects in the myData object,
  // if the STOP_WAS_INITIATED property is equal to 'Based on Self Initiated'
  // then push that object into the selfInitiatedStops array;
  for (var i = 0; i < Object.keys(myData).length; i++) {
    if (myData[i].STOP_WAS_INITIATED == 'Based on Self Initiated') {
      selfInitiatedStops.push(myData[i]);
    }
  }

    // 
  console.log(selfInitiatedStops[0].SUSPECTED_CRIME_DESCRIPTION); // prints terrorism
  console.log(selfInitiatedStops[1].SUSPECTED_CRIME_DESCRIPTION); // prints terrorism
}

function draw() {
  background(220);
}
```

https://editor.p5js.org/joeyklee/sketches/ryLq7pdnm

- The advantage here is that we get an entire json object of all the properties for each object of data that fulfills the conditional. In this case, we loop through `myData` to check how the stop and frisk was justified. Here we're looking for the stop and frisks that were "self-initiated".

## Advanced methods

### Array.filter()

```JS
TBD
```

## Chapter 3: Summary



## Chapter 3: References

---

# Chapter 4 : Mine

> ↱ aquire → parse → filter → **mine** → represent → interact → refine ↲

---

The term "mine" here is about "mining for information". Data does not equal information. Data is valueless until it becomes something that carries meaning, enacts change in the world, deepens our understanding of the people, places, and things around us, and reveals the previously unseen. In this sense, data doesn't mean anything until we've applied our understandings of the processes of that the data are attempting to describe onto the data itself. This process of deriving information from data is what has become known as "mining". It has very much been born out of this idea of resource extraction because that is what is happening: we're pulling out information from the data.

How do we pull out information from data? We do this through statistics and, of course, visualization. Statistics can be as simple or complex as your research requires, but a general rule of thumb is that simpler statistics are better than more complex ones; you can read more about [how to lie with statistics](https://www.amazon.com/How-Lie-Statistics-Darrell-Huff/dp/0393310728).

This term "simple" though is tricky because while computationally things may be simple - e.g. the median or average or mode - whether the application of that statistic is appropriate is not so simple. For example averages, medians, and modes are measures of central tendency, but each tells a different story. An average is the sum of all the values of interest divided by the total number of values being considered. Sounds straightforward - it gives us what the average performance is, or does it? Imagine that we're looking at income in the US and we wanted to say, the "income of an average american is: `<insert value here>`". But we know that the income distribution in the US is terribly skewed with a small number of people earning a whole lot more than the rest of the population. In this case, calculating a median value might make more sense. If we were to unfold this example, we would discover that there are productive and appropriate moments when averages can and should still be used in this context, but it requires additional data mining methods such stratifying by income class, geography, level of education, and so on. You can see some of these reflectded [here](https://en.wikipedia.org/wiki/Household_income_in_the_United_States#Aggregate_income_distribution).


## Mathmagical Operations ✨

Some of the math helper functions of P5.js can be found here: https://p5js.org/reference/#group-Math

Computers are little mathmagical machines - they carry out mathmatical and computational operations that allow us to make calculations, over and over again. Some of these mathmatical operations are simple and others can be more complex like extracting the `mean`, `median`, or `mode` of an array [] of number or text. 

|   Operator  | Description    | Example                      |
|:-----------:|:---------------|:-----------------------------|
|     `+`     | addition       | `1 + 2` // returns 3         |
|     `-`     | subtraction    | `10 - 5` // returns 5        |
|     `*`     | multiplication | `3 * 2` // returns 6         |
|     `/`     | division       | `6 / 2` // returns 3         |
|     `**`    | exponentiation | `3^2` or `3**2` // returns 9 |
|     `%`     | modulus        | `5%2` // returns 1          |


Some  handy mathematical operators and functions that we often use in data visualization are shown here:

### map()
https://p5js.org/reference/#/p5/map

### min()
https://p5js.org/reference/#/p5/min

### max()
https://p5js.org/reference/#/p5/max


### constrain()
https://p5js.org/reference/#/p5/constrain


### round()
https://p5js.org/reference/#/p5/round


### log()
https://p5js.org/reference/#/p5/log

### sqrt() and sq()

https://p5js.org/reference/#/p5/sq
https://p5js.org/reference/#/p5/sqrt


### lerp()
https://p5js.org/reference/#/p5/lerp


## Chapter 4: Summary

In this chapter we encountered a variety of situations in which different mathmatical operators may help us to produce visualizations, work with scales, round data, and even interpolate.

## Chapter 4: References
TBD


---

# Chapter 5: Represent / Visual Encoding

> ↱ aquire → parse → filter → mine → **represent** → interact → refine ↲

---

https://www.targetprocess.com/articles/visual-encoding/

In this chapter will look at the different visual components that we have at our fingertips to map data to visuals. The features discussed here will be directly relevant to the [Chapter 10 on chart types]() in which these shapes find a context to live in.



## ellipse()

```


```

Additional examples:
* https://editor.p5js.org/joeyklee/sketches/HJn0zTFY7
* https://editor.p5js.org/joeyklee/sketches/HyMG76tF7
* https://editor.p5js.org/joeyklee/sketches/SkpLQpYYQ 
* https://editor.p5js.org/joeyklee/sketches/Syxp7aKFm
* https://editor.p5js.org/joeyklee/sketches/ryrw46KYX
* https://editor.p5js.org/joeyklee/sketches/BJsjNpKFX

## rect()



Additional examples:
* https://editor.p5js.org/joeyklee/sketches/B1YKBattQ
* https://editor.p5js.org/joeyklee/sketches/H1AiratK7
* https://editor.p5js.org/joeyklee/sketches/BJN1YptYQ
* https://editor.p5js.org/joeyklee/sketches/H1jmtptK7
* https://editor.p5js.org/joeyklee/sketches/SJtSKaFtQ
* https://editor.p5js.org/joeyklee/sketches/BkOiFTFtm

## line()

Useful for:
* conveying change over time
* conveying flow
* conveying directionality

Additional examples:
* https://editor.p5js.org/joeyklee/sketches/B1xIW3YYQ
* https://editor.p5js.org/joeyklee/sketches/ryLnZhtYm
* https://editor.p5js.org/joeyklee/sketches/BJiQMnKKX
* https://editor.p5js.org/joeyklee/sketches/S1soG3KFm
* https://editor.p5js.org/joeyklee/sketches/BJcemnKtQ
* https://editor.p5js.org/joeyklee/sketches/HkPm72Kt7
* https://editor.p5js.org/joeyklee/sketches/SJ5VVhttm




## arc()

Additional examples:
* https://editor.p5js.org/joeyklee/sketches/ByUVnpKt7
* https://editor.p5js.org/joeyklee/sketches/HktLnTKtQ
* https://editor.p5js.org/joeyklee/sketches/r1LAnatKm
  

## bezier()

Additional examples:
* https://editor.p5js.org/joeyklee/sketches/SJaSDRFKQ
* https://editor.p5js.org/joeyklee/sketches/S14n_CYFX
* https://editor.p5js.org/joeyklee/sketches/SkaIh0Yt7
* https://editor.p5js.org/joeyklee/sketches/HkGY2RtYQ




## text()

Additional examples:
* TBD

## Custom Shapes: beginShape() / endShape()

Additional examples:
* TBD

## loadImage() / image()

Additional examples:
* https://editor.p5js.org/joeyklee/sketches/HJ357RKFX
* https://editor.p5js.org/joeyklee/sketches/SJDrS0Yt7
* https://editor.p5js.org/joeyklee/sketches/B1o18AtFQ
* https://editor.p5js.org/joeyklee/sketches/SkjS8AFYX



## push() / pop()

Additional examples:
* TBD

## translate()

Additional examples:
* https://editor.p5js.org/joeyklee/sketches/Bka8rYA5m

## rotate()

Additional examples:
* https://editor.p5js.org/joeyklee/sketches/Bka8rYA5m


## Chapter 5: Summary


## Chapter 5: References

---

# Chapter 6: Interact

> ↱ aquire → parse → filter → mine → represent → **interact** → refine ↲

---

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

## Chapter 6: Summary
## Chapter 6: References

---

# Chapter 7: Refine

> ↱ aquire → parse → filter → mine → represent → interact → **refine** ↲

---

## productive use of metaphors

## developing a story

## CSS

## CSS frameworks

## text()

## colorMode()

## fill colors: fill()

## stroke color: stroke()

## stroke properties: strokeWeight()

## Chapter 7: Summary
## Chapter 7: References

---

# Chapter 8: Publishing

> ↱ aquire → parse → filter → mine → represent → interact → refine ↲ then : **publish**

---

## platforms

## self-hosting / github pages

---

# Chapter 9: Collaboration

---

## Working on teams

## Github

---

# Chapter 10: Chart Types

---

https://datavizcatalogue.com/

https://datavizproject.com/

## Scatterplots

## Line charts

## Histograms

## Bar charts
