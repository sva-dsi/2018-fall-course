One Week of Mobility
================

About
-----

> *Excluding my plane flight, I've created (very) roughly 4kg or 9lbs of CO2 based on my transit choices this week. If a "tree can absorb as much as 48 pounds of carbon dioxide per year", then I'd have to plant at least 9 trees a year to offset the CO2 impact of my mobility. And that's a rough estimate not including my respiration from breathing/walking/existing...*

In this project, we are going to start analyzing 1 week of our mobility data.

The main goal of this exercise is to calculate the CO2 emissions we produced based on our travel behavior.

In order to answer this question, we will have to develop our own workflow to get to generate the data that will allow us to model what our CO2 impact this week has been based on our transportation choices alone.

![80/20 rule in data viz](assets/images/data-cleaning-80-20.png)

> *"80% of data visualization and mapping is getting your data into the right format" - said every person who has worked with data.*

The takeway from this exercise is to get into the messiness of working with data and using existing APIs - application programming interfaces - such as Google Maps directions and places to help us discover more with our data.

Data Collection
---------------

You've all spent this week collecting your mobility data into a google form that structures your data into a `csv` format.

![google form](assets/images/gform-001.png) ![responses in csv](assets/images/gform-responses.png)

Research
--------

Any good project always starts out with some background research. Since our goal is to figure out how to calculate our CO2 emissions from our mobiilty choices, we'd need to comb through the literature of work that tries to model the amount of CO2 emitted per distance traveled. Usually the units are grams per kilometer.

Here's a few links to get started:

-   [the Guardian, 2009](https://www.theguardian.com/environment/datablog/2009/sep/02/carbon-emissions-per-transport-type)
-   [Wikipedia](https://en.wikipedia.org/wiki/Environmental_impact_of_transport)
-   \[European Environment Agency, 2014\] (<https://www.eea.europa.eu/highlights/more-action-needed-to-reduce>)

Process
-------

A Note on the Google API
------------------------

In order to use the Google's API for mapping, directions, routing, places, etc, you will need to sign up with the Google's API's and Services through their Cloud Platform - <https://console.developers.google.com/> - and create a new project that generates an API key for the specific Google services you are interested in using.

For this project we will be using the following:

-   Geocoding API
-   Maps Javascript API
-   Directions API
-   Distance Matrix API

### Generating an API Key: The short version

1.  login to <https://console.developers.google.com/>
2.  create a new project
3.  go to credentials tab
4.  create credentials &gt; select: api key
5.  copy and paste that into your project:

if you're using `googleways` R package, then:

``` r
# this is not a real api key below
key = "AbCdEfGhIjKlMnoPqRsTuVwXyZ123456789"
# set your key
set_key(key = key)
```

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Setup
-----

### Required Libaries

We will be using a number of libraries to do this project. If you haven't installed the following, please install the packages you need before continuing.

``` r
##########################
# Install libraries
# uncomment if necessary
##########################
# install.packages("tidyverse")
# install.packages("lubridate")
# install.packages("ggplot2")
# install.packages("ggmap")
# install.packages("sf")
# install.packages("plyr")
# install.packages("googleway")
```

You can now load up your libraries

``` r
##########################
# load libraries
##########################
# tidyverse for all those helper functions
require(tidyverse)
```

    ## Loading required package: tidyverse

    ## ── Attaching packages ──────────────────────────────────────────────── tidyverse 1.2.1 ──

    ## ✔ ggplot2 3.0.0     ✔ purrr   0.2.5
    ## ✔ tibble  1.4.2     ✔ dplyr   0.7.6
    ## ✔ tidyr   0.8.1     ✔ stringr 1.3.1
    ## ✔ readr   1.1.1     ✔ forcats 0.3.0

    ## ── Conflicts ─────────────────────────────────────────────────── tidyverse_conflicts() ──
    ## ✖ dplyr::filter() masks stats::filter()
    ## ✖ dplyr::lag()    masks stats::lag()

``` r
# require lubridate for handle times
require(lubridate)
```

    ## Loading required package: lubridate

    ## 
    ## Attaching package: 'lubridate'

    ## The following object is masked from 'package:base':
    ## 
    ##     date

``` r
# ggplot for plotting
require(ggplot2)
# ggmap to plot on tiled maps easily
require(ggmap)
```

    ## Loading required package: ggmap

``` r
# sf for working with spatial data
require(sf)
```

    ## Loading required package: sf

    ## Linking to GEOS 3.6.1, GDAL 2.1.3, proj.4 4.9.3

``` r
# plyr for data handling functions
require(plyr)
```

    ## Loading required package: plyr

    ## -------------------------------------------------------------------------

    ## You have loaded plyr after dplyr - this is likely to cause problems.
    ## If you need functions from both plyr and dplyr, please load plyr first, then dplyr:
    ## library(plyr); library(dplyr)

    ## -------------------------------------------------------------------------

    ## 
    ## Attaching package: 'plyr'

    ## The following object is masked from 'package:lubridate':
    ## 
    ##     here

    ## The following objects are masked from 'package:dplyr':
    ## 
    ##     arrange, count, desc, failwith, id, mutate, rename, summarise,
    ##     summarize

    ## The following object is masked from 'package:purrr':
    ## 
    ##     compact

``` r
# googleway for access to the google api
library(googleway)
```

### Setting your googleways api key

Set you google api key for googleways so we can use all the handy functions for our analysis.

NOTE: MAKE SURE TO UPDATE THIS TO YOUR OWN API KEY if you continue your analysis or you're random person from the internet. It's important not to publish your API keys generally.

``` r
###################
# setup google api keys
# https://console.cloud.google.com/
# go through with setting up your api keys
# note: in order to go above the 1 request quota, you need to enter in billing info
###################

# Here's my public API KEY
key = "AIzaSyD0Dod_SussEiR3IaA90oLiviVIgF9uMW0"
# set your key
set_key(key = key)
# check your api key
google_keys()
```

    ## Google API keys
    ##  -  default : AIzaSyD0Dod_SussEiR3IaA90oLiviVIgF9uMW0 
    ##  -  map :  
    ##  -  directions :  
    ##  -  distance :  
    ##  -  elevation :  
    ##  -  geocode :  
    ##  -  places :  
    ##  -  find_place :  
    ##  -  place_autocomplete :  
    ##  -  place_details :  
    ##  -  reverse_geocode :  
    ##  -  roads :  
    ##  -  streetview :  
    ##  -  timezone :

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Acquire
-------

### Export your data from Google Spreadsheets

You will need to export your spreadsheet data from Google Spreadsheets.

You can do so by doing:

1.  File &gt; download as... &gt; comma separated values (.csv)

Once your file is downloaded, move your data into your working directory

### Reading in your Data to R

Read in your data to RStudio. You will need to get the file path to your specific file. Here my file is living at this file path below so I assign that to the variable `myDataPath`.

``` r
"/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/examples/r-examples/01-one-week-of-mobility/Dear Data Mobility Diary - corrected (Responses) - Form Responses 1 - street_corners.csv"
```

NOTE: we also read in the NYC Boroughs data for later so we can plot our data over the map.

``` r
####################################################
# Acquire
## read in your data
####################################################
myDataPath = "/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/examples/r-examples/01-one-week-of-mobility/Dear Data Mobility Diary - corrected (Responses) - Form Responses 1 - street_corners.csv"
myData = read.csv(myDataPath, header=TRUE)
# print the top 6 rows
head(myData)
```

    ##           Timestamp   Email.Address Transport_Mode
    ## 1 9/18/2018 7:00:58 jlee358@sva.edu   Train/Subway
    ## 2 9/18/2018 7:03:42 jlee358@sva.edu   Train/Subway
    ## 3 9/18/2018 7:17:19 jlee358@sva.edu           Bike
    ## 4 9/18/2018 7:20:00 jlee358@sva.edu   Train/Subway
    ## 5 9/18/2018 7:21:40 jlee358@sva.edu          Plane
    ## 6 9/18/2018 7:23:04 jlee358@sva.edu   Train/Subway
    ##                                         Starting_From
    ## 1                                   Franklin Ave, 4/5
    ## 2                                14th St. Union Sqare
    ## 3                           Park Place & Franklin Ave
    ## 4                           JFK International Airport
    ## 5 Frankfurt International Airport, Frankfurt, Germany
    ## 6                                       Stuttgart HbF
    ##                            Starting_StreetCorner
    ## 1 Eastern Parkway and Franklin Ave, Brooklyn, NY
    ## 2   Broadway Ave and East 14th St, Manhattan, NY
    ## 3      Park Place and Franklin Ave, Brooklyn, NY
    ## 4          John F. Kennedy International Airport
    ## 5                     Frankfurt Airport, Germany
    ## 6  Stuttgart Central Station, Stuttgart, Germany
    ##                                  Ending_At
    ## 1                    14th St. Union Square
    ## 2                        Franklin Ave, 4/5
    ## 3                Brooklyn Boulders Gowanus
    ## 4                Park Place & Franklin Ave
    ## 5 JFK International Airport, New York, USA
    ## 6                      Frankfurt Flughafen
    ##                              Ending_StreetCorner      Date Trip_Start
    ## 1   Broadway Ave and East 14th St, Manhattan, NY 9/17/2018 8:30:00 AM
    ## 2 Eastern Parkway and Franklin Ave, Brooklyn, NY 9/17/2018 5:30:00 PM
    ## 3            Degraw St and 3rd Ave, Brooklyn, NY 9/16/2018 6:00:00 PM
    ## 4      Park Place and Franklin Ave, Brooklyn, NY 9/15/2018 3:00:00 PM
    ## 5          John F. Kennedy International Airport 9/15/2018 6:30:00 AM
    ## 6          Frankfurt Airport, Frankfurt, Germany 9/15/2018 4:00:00 AM
    ##     Trip_End                                                      Notes
    ## 1 9:15:00 AM                                         major train delays
    ## 2 6:00:00 PM                                           Left work early 
    ## 3 6:15:00 PM                                  Bike ride to Climbing Gym
    ## 4 5:00:00 PM MTA on the weekends is a total mess. Took the E to the 4/5
    ## 5 3:00:00 PM          Corrected for timezone shift -6 hrs to trip_start
    ## 6 5:15:00 AM                  Train from stuttgart to frankfurt airport
    ##   Latitude_Start Longitude_Start Latitude_End Longitude_End
    ## 1             NA              NA           NA            NA
    ## 2             NA              NA           NA            NA
    ## 3             NA              NA           NA            NA
    ## 4             NA              NA           NA            NA
    ## 5             NA              NA           NA            NA
    ## 6             NA              NA           NA            NA
    ##   Distance_Traveled Trip_Duration Additional.Notes
    ## 1                NA            NA               NA
    ## 2                NA            NA               NA
    ## 3                NA            NA               NA
    ## 4                NA            NA               NA
    ## 5                NA            NA               NA
    ## 6                NA            NA               NA

``` r
# we're going to need this for later
nycBoroughs = read_sf("https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson")
```

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Parse
-----

### Dealing with dates and timestamps

Here we use the lubridate package to intelligently handle our date/time stamps

``` r
####################################################
# Parse
## Convert your date & time "factor" types to date/time objects
####################################################
# this is a good time to go to your environments tab and checkout
# what data types R has classified your data as
NYTimeZone = "America/New_York"

# combine the dates with the start and end-times
myData$Trip_Start = paste(myData$Date, myData$Trip_Start)
myData$Trip_End = paste(myData$Date, myData$Trip_End)

# we can use the handy lubridate package to handle our dates/times
# NOTE mdy_hms == month, day, year hour, minute, seconds
myData$Timestamp = mdy_hms(myData$Timestamp, tz = NYTimeZone)
# NOTE mdy == month, day, year
myData$Date = mdy(myData$Date, tz = NYTimeZone)
# NOTE mdy_hms == month, day, year hour, minute, seconds
myData$Trip_Start = mdy_hms(myData$Trip_Start, tz = NYTimeZone)
# NOTE mdy_hms == month, day, year hour, minute, seconds
myData$Trip_End = mdy_hms(myData$Trip_End, tz = NYTimeZone)
```

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Mine
----

### Calculate trip duration

``` r
####################################################
# Calculate trip duration
# Since we are using datetime objects we can simply
# just subtract Trip_End from Trip_Start
####################################################

# let's calculate the trip duration by subtracting the Trip_End from Trip_Start
# and storing it to our Trip_Duration
myData$Trip_Duration = myData$Trip_End - myData$Trip_Start
```

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Sort
----

### Sort your data based on Trip\_End

``` r
####################################################
# Sort your data
# Since we input our data, we might need to sort
# the data to get the data in the
# right chronological order
####################################################

# sort your data based on the trip end
# this is saying:
# in myData, order the ROWS, based on the
# values in the "Trip_End" column
# NOTE: myData[rows, columns]
# so if you write myData[1:10, ] this would give you
# the first 10 rows of data and all the columns
myData = myData[order(myData$Trip_End),  ]
```

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Represent I
-----------

Have a look at your trip duration data

### Plot your trip durations based on start and end times

``` r
ggplot(data=myData) +
  geom_segment(aes(x=Trip_Start,
                   y=0,
                   xend=Trip_End,
                   yend=0,
                   color=Transport_Mode, size=5))
```

![](README_files/figure-markdown_github/unnamed-chunk-8-1.png)

### use the curve geometry to make arcs rather than straight lines

``` r
ggplot(data=myData) +
  geom_curve(aes(x=Trip_Start,
                 y=0,
                 xend=Trip_End,
                 yend=0,
                 color=Transport_Mode),
             curvature= -1)
```

![](README_files/figure-markdown_github/unnamed-chunk-9-1.png)

### Break down your mobility by day of the week

``` r
ggplot(data=myData) +
  geom_bar(aes(x=Date,
               y=Trip_Duration,
               fill=Transport_Mode),
           stat="identity")
```

    ## Don't know how to automatically pick scale for object of type difftime. Defaulting to continuous.

![](README_files/figure-markdown_github/unnamed-chunk-10-1.png)

### You can use facet\_wrap to create small multiples

``` r
ggplot(data=myData) +
  geom_bar(aes( x=Transport_Mode,
                y=Trip_Duration),
           stat="identity") +
  facet_wrap(~Date)
```

    ## Don't know how to automatically pick scale for object of type difftime. Defaulting to continuous.

![](README_files/figure-markdown_github/unnamed-chunk-11-1.png)

### you can explore alternative representations like a polar chart

``` r
ggplot(data=myData) +
  geom_bar(aes(x=Date,
               y=Trip_Duration,
               fill=Transport_Mode),
           stat="identity") +
  coord_polar()
```

    ## Don't know how to automatically pick scale for object of type difftime. Defaulting to continuous.

![](README_files/figure-markdown_github/unnamed-chunk-12-1.png)

### You can use facet\_wrap to create small multiples

``` r
ggplot(data=myData) +
  geom_bar(aes( x=Transport_Mode,
                y=Trip_Duration),
           stat="identity") +
  coord_polar() +
  facet_wrap(~Date)
```

    ## Don't know how to automatically pick scale for object of type difftime. Defaulting to continuous.

![](README_files/figure-markdown_github/unnamed-chunk-13-1.png)

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Quick Interlude: Fun with For Loops
===================================

Before we get started with the rest of our analysis, we are going to look at a key programming concept which is called "loops" or "iteration".

R is vectorized - meaning that the functions and data are iterable - so we often times don't need for loops, but there are moments in which loops can be super handy such as if we need to iterate over data and incorporate conditionals and manipulating data within those loops.

``` r
####################################################
# QUICK INTERLUDE: A note on for loops
####################################################

# our first for loop
# this says:
# Starting from 1 to the total number of values
# 1. print out the name of the street corner as a character
for(i in 1:length(myData$Starting_StreetCorner)){
  # if we print "i", we will get 1,2,3,4,...
  print(i)
  # here we print the Starting_StreetCorner at row "i" for myData[i,]
  print(as.character(myData[i,]$Starting_StreetCorner))
}
```

    ## [1] 1
    ## [1] "Eberhardstrasse and Nesenbachstrasse, Stuttgart, Germany"
    ## [1] 2
    ## [1] "Lerchenstrasse and JohannesStrasse, stuttgart, Germany"
    ## [1] 3
    ## [1] "marienplatz, stuttgart, Germany"
    ## [1] 4
    ## [1] "Lerchenstrasse and JohannesStrasse, stuttgart, Germany"
    ## [1] 5
    ## [1] "Herzogstrasse and Weimarstrasse, Stuttgart, Germany"
    ## [1] 6
    ## [1] "Stuttgart Central Station, Stuttgart, Germany"
    ## [1] 7
    ## [1] "Frankfurt Airport, Germany"
    ## [1] 8
    ## [1] "John F. Kennedy International Airport"
    ## [1] 9
    ## [1] "Park Place and Franklin Ave, Brooklyn, NY"
    ## [1] 10
    ## [1] "Eastern Parkway and Utica Ave, Brooklyn, NY"
    ## [1] 11
    ## [1] "Camden Plaza W and Montague St, Brooklyn, NY"
    ## [1] 12
    ## [1] "Park Place and Franklin Ave, Brooklyn, NY"
    ## [1] 13
    ## [1] "Smith St and Wyckoff St, Brooklyn, NY"
    ## [1] 14
    ## [1] "Bergen St and 6th Ave, Brooklyn, NY"
    ## [1] 15
    ## [1] "Eastern Parkway and Franklin Ave, Brooklyn, NY"
    ## [1] 16
    ## [1] "Broadway Ave and East 14th St, Manhattan, NY"

``` r
# notice if we now put a 3 we get the 3rd starting streetCorner:
print(as.character(myData[3,]$Starting_StreetCorner))
```

    ## [1] "marienplatz, stuttgart, Germany"

``` r
# notice if we now put a 3:6 we get the 3rd through the 6th starting streetCorner:
print(as.character(myData[3:6,]$Starting_StreetCorner))
```

    ## [1] "marienplatz, stuttgart, Germany"                       
    ## [2] "Lerchenstrasse and JohannesStrasse, stuttgart, Germany"
    ## [3] "Herzogstrasse and Weimarstrasse, Stuttgart, Germany"   
    ## [4] "Stuttgart Central Station, Stuttgart, Germany"

``` r
####################################################
# QUICK INTERLUDE: A note on for loops ^^^^^^^^^
####################################################
```

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Acquire
-------

### get the locations of starting and ending

Geocode locations: Get the lat/lon coordinates if your "Starting\_From" and "Ending\_At" columns aren't very useful or purposefully obscure you will have to go through your data and add a new set of columns like "Starting\_StreetCorner" and "Ending\_StringCorner" as a way to better automate the retrieval of the lat/lon coordinates

``` r
# create 2 empty lists - starting and ending - to store our coordinates
# we will write a "for loop" and incrementally add in the coordinates
# as they are retrieved from the google place api
startingCoords = c()
endingCoords = c()

# this says:
# For every row in myData,
# 1. get the lat/lon coordinates from the google_geocode function
# 2. append them to the startingCoords list we made above
for(i in 1:length(myData$Starting_StreetCorner)){
  # print(as.character(myData[i,]$Starting_StreetCorner))
  coords = google_geocode(address=as.character(myData[i,]$Starting_StreetCorner),
                 key=key,simplify = TRUE)
  # for each iteration of the loop
  # startingCoords equals itself plus the newest coordinates
  startingCoords = c(startingCoords, coords)
}

# do the same as above, except with the ending street corner
for(i in 1:length(myData$Ending_StreetCorner)){
  print(as.character(myData[i,]$Ending_StreetCorner))
  coords = google_geocode(address=as.character(myData[i,]$Ending_StreetCorner),
                          key=key,simplify = TRUE)
  endingCoords = c(endingCoords, coords)
}
```

    ## [1] "Lerchenstrasse and JohannesStrasse, stuttgart, Germany"
    ## [1] "marienplatz, stuttgart, Germany"
    ## [1] "Lerchenstrasse and JohannesStrasse, stuttgart, Germany"
    ## [1] "Herzogstrasse and Weimarstrasse, Stuttgart, Germany"
    ## [1] "Eberhardstrasse and Nesenbachstrasse, Stuttgart, Germany"
    ## [1] "Frankfurt Airport, Frankfurt, Germany"
    ## [1] "John F. Kennedy International Airport"
    ## [1] "Park Place and Franklin Ave, Brooklyn, NY"
    ## [1] "Lewis Ave and Macdonough St, Brooklyn, NY"
    ## [1] "Camden Plaza W and Montague St, Brooklyn, NY"
    ## [1] "Bergen St and Nevins St, Brooklyn Ny"
    ## [1] "Degraw St and 3rd Ave, Brooklyn, NY"
    ## [1] "Bergen St and 6th Ave, Brooklyn, NY"
    ## [1] "Park Place and Franklin Ave, Brooklyn, NY"
    ## [1] "Broadway Ave and East 14th St, Manhattan, NY"
    ## [1] "Eastern Parkway and Franklin Ave, Brooklyn, NY"

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

PARSE
=====

retrieve the centroid coordinates for starting and ending locations
-------------------------------------------------------------------

now that we have all this geocoded data we need to extract out the coordinates for the starting and ending locations

``` r
####################################################
# Parse
# now that we have all this geocoded data
# we need to extract out the coordinates
####################################################

# create a list of lists
# here, each variable is a list that contains cntrLat and cntrLng
startingCoordsCentroid = c(cntrLat = c(),  cntrLng=c())
endingCoordsCentroid =  c(cntrLat = c(),  cntrLng=c())
for(i in 1:length(startingCoords)){
  # if there are more than 1 value for the coordinates of a location
  # take the mean of those two locations
  # otherwise, just return the coordinates
  if(length(startingCoords[i]$results$geometry$location$lat) > 1 ){
    centroidLat = mean(startingCoords[i]$results$geometry$location$lat)
    centroidLng = mean(startingCoords[i]$results$geometry$location$lng)
  } else {
    centroidLat = startingCoords[i]$results$geometry$location$lat
    centroidLng = startingCoords[i]$results$geometry$location$lng
  }

  # here we append the coordinates to their respective list - cntrLat or cntrLng within the
  # parent list which is the startingCoordsCentroid
  startingCoordsCentroid$cntrLat =  c(startingCoordsCentroid$cntrLat, centroidLat)
  startingCoordsCentroid$cntrLng =  c(startingCoordsCentroid$cntrLng, centroidLng)
}

# repeat above but for the endingCoordsCentroid
for(i in 1:length(endingCoords)){
  if(length(endingCoords[i]$results$geometry$location$lat) > 1 ){
    centroidLat = mean(endingCoords[i]$results$geometry$location$lat)
    centroidLng = mean(endingCoords[i]$results$geometry$location$lng)
  } else{
    centroidLat = endingCoords[i]$results$geometry$location$lat
    centroidLng = endingCoords[i]$results$geometry$location$lng
  }

  endingCoordsCentroid$cntrLat =  c(endingCoordsCentroid$cntrLat, centroidLat)
  endingCoordsCentroid$cntrLng =  c(endingCoordsCentroid$cntrLng, centroidLng)
}


# Add the coordinates to myData as columns
myData$Google_Latitude_Start = startingCoordsCentroid$cntrLat
myData$Google_Longitude_Start = startingCoordsCentroid$cntrLng
myData$Google_Latitude_End = endingCoordsCentroid$cntrLat
myData$Google_Longitude_End = endingCoordsCentroid$cntrLng
```

And now we can plot an OD matrix of our data

``` r
# plot an "origin-destination" matrix of your data
ggplot(data=myData[ which(myData$Date > as.POSIXct("2018-09-15", tz="America/New_York")),]) +
  geom_segment(aes( x=Google_Longitude_Start,
                    y=Google_Latitude_Start,
                    xend=Google_Longitude_End,
                    yend=Google_Latitude_End))
```

![](README_files/figure-markdown_github/unnamed-chunk-17-1.png)

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Quick Interlude: Fun with Functions
-----------------------------------

### greeting function

``` r
####################################################
# Quick Interlude: Our first function!
# let's make a couple functions to see how
# we can make our own custom functions
#
# why functions?
# by using custom functions, we can start to make our code
# more robust, maintainable, and readable - all important
# qualities of doing data related work!
####################################################

myGreetingFunction = function( anyGreeting, name ){
  # paste is a function that puts 2 strings together
  output = paste(anyGreeting, name, sep=" ")
  # return the output
  return(output)
}

# see how we can use a generic function to do
# a task over and over again
myGreetingFunction("Aloha", "Joey")
```

    ## [1] "Aloha Joey"

``` r
myGreetingFunction("Bonjour", "SVA")
```

    ## [1] "Bonjour SVA"

``` r
myGreetingFunction("Hello", "DSI")
```

    ## [1] "Hello DSI"

see how we can also now shove in lists of data to output our greetings

``` r
myGreetingFunction( c("hello", "goodbye", "adieu"), c("joey", "sva", "dsi") )
```

    ## [1] "hello joey"  "goodbye sva" "adieu dsi"

### Random plotting function

``` r
# how about a function that makes random line plots?
randomPlotter = function(){
  xs <- runif(100, 10, 100)
  ys <- runif(100, 10, 100)

  return(
    ggplot() + geom_line( aes(x=xs, y=ys) )
  )
}
print(randomPlotter())
```

![](README_files/figure-markdown_github/unnamed-chunk-20-1.png)

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Parse
-----

### Get the distances according to google\_distance

We are going to do a rough estimate of our distances based on our

``` r
####################################################
# Parse
# create a function to map our Travel_Mode to
# a corresponding google_distance option
# google_distance options include:
# "driving", "walking", "bicycling", "transit"
# our Transit_Mode options include:
# "Bike", "Bus", "Train/Subway", "Walking", "On Demand Automobile Service (e.g. taxi, Lyft, Uber, Via, Car2Go, etc)", "Private Automobile", "Ferry/Boat", "Plane", "Other (e.g. skateboard, roller skates, scooter, other non-motorized transport)"
####################################################


mapTransitMode = function(transportModeVector){
  output <- c()
  for(i in 1:length(transportModeVector)){
    # print(as.character(transportModeVector[i]))
    # transform our transportModeVecor into a character > split it if it has a comma >
    # use unlist() to just get back the results not as a nested thing
    tmode <- unlist(strsplit(as.character(transportModeVector[i]), split=", "))

    # anyNA() is a function to check if any NAs exist
    # if it is false, then we apply "bicycling" (or the respective google_distance option)
    # as a the transit mode for that respective trip
    if( anyNA( pmatch(tmode , c("Bike", "Other"))) == FALSE ){
      output <- c(output, "bicycling")
    }
    else if( anyNA(pmatch( tmode, c("Walking"))) == FALSE ){
      output <- c(output, "walking")
    }
    else if( anyNA(pmatch( tmode, c("On Demand Automobile Service (e.g. taxi, Lyft, Uber, Via, Car2Go, etc)", "Private Automobile"))) == FALSE ){
      output <- c(output, "driving")
    }
    else if( anyNA(pmatch( tmode, c("Bus", "Train/Subway", "Ferry/Boat", "Plane"))) == FALSE ){
      output <- c(output, "transit")
    }
    else{
      output <- c(output, "transit")
    }

  }
  return(output)
}

# using our custom function store, the results into myData as "google_transit_mode"
myData$google_transit_mode  = mapTransitMode(myData$Transport_Mode)
```

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Parse
-----

### use google routing to get back more detailed travel trajectories

use the google routing engine to calculate the approximate distance and time between locations using the travel mode derived from above

the example below allows you to try out what the function returns

``` r
####################################################
# Parse
# use the google routing engine to calculate the
# approximate distance and time between locations
# using the travel mode derived from above
####################################################

# try out the google_distance function on a selected row in myData
temp = google_distance(as.character(myData[3,]$Starting_StreetCorner),
                as.character(myData[3,]$Ending_StreetCorner),
                simplify = T,
                mode=myData[3,]$google_transit_mode,
                departure_time=myData[3,]$Trip_Start,
                key=key)
```

Now get back the travelDistances

``` r
# Create a list of lists which includes
# origin, desintation, distance_meters, and distance_seconds
travelDistances = c( origin = c(),
                     destination = c(),
                     distance_meters = c(),
                     duration_seconds = c())

# starting from 1 to the total rows in myData
# retrieve the google_distance based on
# our Starting_StreetCorner, Ending_StreetCorner, google_transit_mode, and Trip_Start
for(i in 1:length(myData$Starting_StreetCorner) ){
  calculatedDistance = google_distance(as.character(myData[i,]$Starting_StreetCorner),
                                       as.character(myData[i,]$Ending_StreetCorner),
                                       simplify = TRUE,
                                       mode=myData[i,]$google_transit_mode,
                                       departure_time="now",
                                       key=key)

  print(calculatedDistance)
  # store the results to the respective list in the travelDistances dataset
  travelDistances$origin = c(travelDistances$origin, calculatedDistance$origin_addresses)
  travelDistances$destination = c(travelDistances$destination, calculatedDistance$destination_addresses)
  

  # if the google_distance function returns no results, store NA,
  # otherwise, add in the results
  if(calculatedDistance$rows$elements[[1]]$status != "ZERO_RESULTS"){
    travelDistances$distance_meters = c(travelDistances$distance_meters, calculatedDistance$rows$elements[[1]]$distance$value)
    travelDistances$duration_seconds = c(travelDistances$duration_seconds, calculatedDistance$rows$elements[[1]]$duration$value)
  } else{
    travelDistances$distance_meters = c(travelDistances$distance_meters, NA)
    travelDistances$duration_seconds = c(travelDistances$duration_seconds, NA)
  }

}
```

    ## $destination_addresses
    ## [1] "Lerchenstraße & Johannesstraße, 70176 Stuttgart, Germany"
    ## 
    ## $origin_addresses
    ## [1] "Eberhardstraße 10, 70173 Stuttgart, Germany"
    ## 
    ## $rows
    ##                          elements
    ## 1 1.9 km, 1930, 26 mins, 1568, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Marienplatz, 70178 Stuttgart, Germany"
    ## 
    ## $origin_addresses
    ## [1] "Lerchenstraße & Johannesstraße, 70176 Stuttgart, Germany"
    ## 
    ## $rows
    ##                         elements
    ## 1 2.8 km, 2837, 15 mins, 873, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Lerchenstraße & Johannesstraße, 70176 Stuttgart, Germany"
    ## 
    ## $origin_addresses
    ## [1] "Marienplatz, 70178 Stuttgart, Germany"
    ## 
    ## $rows
    ##                        elements
    ## 1 2.1 km, 2095, 9 mins, 558, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Weimarstraße & Herzogstraße, 70176 Stuttgart, Germany"
    ## 
    ## $origin_addresses
    ## [1] "Lerchenstraße & Johannesstraße, 70176 Stuttgart, Germany"
    ## 
    ## $rows
    ##                         elements
    ## 1 1.1 km, 1138, 14 mins, 823, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Eberhardstraße 10, 70173 Stuttgart, Germany"
    ## 
    ## $origin_addresses
    ## [1] "Weimarstraße & Herzogstraße, 70176 Stuttgart, Germany"
    ## 
    ## $rows
    ##                        elements
    ## 1 0.8 km, 793, 10 mins, 583, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Frankfurt Airport (FRA), 60547 Frankfurt am Main, Germany"
    ## 
    ## $origin_addresses
    ## [1] "Stuttgart Central Station, Arnulf-Klett-Platz 2, 70173 Stuttgart, Germany"
    ## 
    ## $rows
    ##                                   elements
    ## 1 178 km, 178358, 1 hour 15 mins, 4500, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "John F. Kennedy International Airport (JFK), Queens, NY 11430, USA"
    ## 
    ## $origin_addresses
    ## [1] "Frankfurt Airport (FRA), 60547 Frankfurt am Main, Germany"
    ## 
    ## $rows
    ##       elements
    ## 1 ZERO_RESULTS
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Park Pl & Franklin Ave, Brooklyn, NY 11216, USA"
    ## 
    ## $origin_addresses
    ## [1] "John F. Kennedy International Airport (JFK), Queens, NY 11430, USA"
    ## 
    ## $rows
    ##                            elements
    ## 1 22.5 km, 22457, 57 mins, 3419, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "MacDonough St & Lewis Ave, Brooklyn, NY 11233, USA"
    ## 
    ## $origin_addresses
    ## [1] "Park Pl & Franklin Ave, Brooklyn, NY 11216, USA"
    ## 
    ## $rows
    ##                          elements
    ## 1 3.7 km, 3739, 28 mins, 1667, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Montague St & Cadman Plaza W, Brooklyn, NY 11201, USA"
    ## 
    ## $origin_addresses
    ## [1] "Eastern Pkwy & Utica Ave, Brooklyn, NY 11213, USA"
    ## 
    ## $rows
    ##                          elements
    ## 1 6.3 km, 6319, 17 mins, 1024, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Bergen St & Nevins St, Brooklyn, NY 11217, USA"
    ## 
    ## $origin_addresses
    ## [1] "Montague St & Cadman Plaza W, Brooklyn, NY 11201, USA"
    ## 
    ## $rows
    ##                          elements
    ## 1 1.6 km, 1584, 19 mins, 1159, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Degraw St & 3rd Ave, Brooklyn, NY 11217, USA"
    ## 
    ## $origin_addresses
    ## [1] "Park Pl & Franklin Ave, Brooklyn, NY 11216, USA"
    ## 
    ## $rows
    ##                        elements
    ## 1 2.7 km, 2685, 9 mins, 560, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "6th Ave & Bergen St, Brooklyn, NY 11217, USA"
    ## 
    ## $origin_addresses
    ## [1] "Wyckoff St & Smith St, Brooklyn, NY 11201, USA"
    ## 
    ## $rows
    ##                          elements
    ## 1 1.6 km, 1586, 21 mins, 1237, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Park Pl & Franklin Ave, Brooklyn, NY 11216, USA"
    ## 
    ## $origin_addresses
    ## [1] "6th Ave & Bergen St, Brooklyn, NY 11217, USA"
    ## 
    ## $rows
    ##                         elements
    ## 1 2.5 km, 2459, 12 mins, 698, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Broadway & E 14th St, New York, NY 10003, USA"
    ## 
    ## $origin_addresses
    ## [1] "Eastern Pkwy & Franklin Ave, Brooklyn, NY 11238, USA"
    ## 
    ## $rows
    ##                            elements
    ## 1 10.7 km, 10665, 24 mins, 1422, OK
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## $destination_addresses
    ## [1] "Eastern Pkwy & Franklin Ave, Brooklyn, NY 11238, USA"
    ## 
    ## $origin_addresses
    ## [1] "Broadway & E 14th St, New York, NY 10003, USA"
    ## 
    ## $rows
    ##                            elements
    ## 1 10.7 km, 10665, 25 mins, 1482, OK
    ## 
    ## $status
    ## [1] "OK"

``` r
# Store the data from travelDistances to to myData
myData$origin_address =  travelDistances$origin
myData$destination_address =  travelDistances$destination
myData$distance_meters =  travelDistances$distance_meters
myData$duration_seconds =  travelDistances$duration_seconds
```

Print out a summary of the data of our travel **distance** and **time** spent

``` r
# print a summary of your travel distance
summary(myData$distance_meters)
```

    ##    Min. 1st Qu.  Median    Mean 3rd Qu.    Max.    NA's 
    ##     793    1758    2685   16621    8492  178358       1

``` r
# print a summary of your travel time
summary(myData$duration_seconds)
```

    ##    Min. 1st Qu.  Median    Mean 3rd Qu.    Max.    NA's 
    ##   558.0   760.5  1159.0  1438.2  1525.0  4500.0       1

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

mine
----

### Roughly Approximate your CO2 emissions

``` r
####################################################
# Mine
# Using the travel distance and mode of transport
# calculate a rough approximation of your CO2 emitted
# in grams
# the values below come from the
# European Environment Agency report No.7 / 2014
# "EEA 07-2014 TERM 2014 updated.pdf" / pg 10
####################################################

calculateCo2Emissions = function(transportModeVector){
  output <- c()

  for(i in 1:length(transportModeVector)){
    # print(as.character(transportModeVector[i]))
    tmode <- unlist(strsplit(as.character(transportModeVector[i]), split=", "))
    print(tmode)
    # get kilometers from meters
    travelDistance_km = myData[i,]$distance_meters / 1000

    # the numbers you see are the co2 emission factor
    # walking and biking are given 0 (even thoughy you still emit by respiration)
    # Driving emissions range from 49-123g/pkm so I took the average... how might this be problematic?
    if( anyNA( pmatch(tmode , c("Bike", "Other"))) == FALSE ){
      output <- c(output, 0)
    }
    else if( anyNA(pmatch( tmode, c("Walking"))) == FALSE ){
      output <- c(output, 0)
    }
    else if( anyNA(pmatch( tmode, c("On Demand Automobile Service (e.g. taxi, Lyft, Uber, Via, Car2Go, etc)", "Private Automobile"))) == FALSE ){
      output <- c(output, 85 * travelDistance_km)
    }
    else if( anyNA(pmatch( tmode, c("Bus"))) == FALSE ){
      output <- c(output,  68 * travelDistance_km)
    }
    else if( anyNA(pmatch( tmode, c( "Train/Subway"))) == FALSE ){
      output <- c(output,  14 * travelDistance_km)
    }
    else if( anyNA(pmatch( tmode, c( "Ferry/Boat", "Plane"))) == FALSE ){
      output <- c(output,  285 * travelDistance_km)
    }
    else{
      output <- c(output, 68 * travelDistance_km)
    }

  }
  return(output)
}
# store into myData
myData$co2_emissions  = calculateCo2Emissions(myData$Transport_Mode)
```

    ## [1] "Walking"
    ## [1] "Bus"     "Walking"
    ## [1] "Bus"
    ## [1] "Walking"
    ## [1] "Walking"
    ## [1] "Train/Subway"
    ## [1] "Plane"
    ## [1] "Train/Subway"
    ## [1] "Train/Subway"
    ## [1] "Train/Subway"
    ## [1] "Walking"
    ## [1] "Bike"
    ## [1] "Walking"
    ## [1] "Train/Subway" "Walking"     
    ## [1] "Train/Subway"
    ## [1] "Train/Subway"

print out the sum of your emissions

``` r
#######
# MY TOTAL CO2 EMISSIONS WERE
# 3954.394 GRAMS
#######
# use na.rm=TRUE to remove the NAs from the sum or else it won't run
sum(myData$co2_emissions, na.rm=TRUE)
```

    ## [1] 3753.43

TODO: you might also think about stratifying by day of the week - what about some kind of speculative service that offers you benefits or punishments for your behavior?

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Represent
---------

### Show an OD Matrix of your travel behavior with co2 impact

a custom function to map a value to a new scale

``` r
# map values to another range
linMap <- function(x, from, to){
  return( (x - min(x, na.rm=T)) / max(x - min(x, na.rm=T), na.rm=T) * (to - from) + from )
}
```

#### Plot OD arcs

``` r
# plot Origin Desination Arcs
ggplot(data= myData[8:16,]) +
  geom_curve(aes(x=Google_Longitude_Start,
                   y=Google_Latitude_Start,
                   xend=Google_Longitude_End,
                   yend=Google_Latitude_End,col=as.character(Date) ),
               size= linMap(myData[8:16,]$co2_emissions, 1, 4) )
```

![](README_files/figure-markdown_github/unnamed-chunk-27-1.png)

#### Plot OD arcs on a map

``` r
# plot O-D Arcs on a map
ggplot() +
  geom_sf( data=nycBoroughs, inherit.aes = FALSE) +
  geom_curve(data=myData[8:16,], aes(x=Google_Longitude_Start,
                 y=Google_Latitude_Start,
                 xend=Google_Longitude_End,
                 yend=Google_Latitude_End,col=as.character(Date) ),
             size= linMap(myData[8:16,]$co2_emissions, 1, 4) ) +
  coord_sf(ylim=c(40.6,40.8))
```

![](README_files/figure-markdown_github/unnamed-chunk-28-1.png)

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Write your data out
-------------------

``` r
########################
# Write your Data out to a file to save
########################
outputDataFileName = "/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/examples/r-examples/01-one-week-of-mobility/mobility-data-processed.csv"
write.csv(myData, file = outputDataFileName)
```

------------------------------------------------------------------------

------------------------------------------------------------------------

------------------------------------------------------------------------

Acquire
-------

NOTE/TODO: this could be optimized a bit

### Use the google routing engine to get more detailed travel details

``` r
# Now! get the steps for each
# for each trip,
# get the steps it takes
# store the coordinates for each step of the trip

routeCoords = list()
for(i in 1:length(myData$Google_Latitude_Start) ){
  # use your coordinates to make the routing
  # use paste to create a "lat, lon" character string
  startingCoords = paste(myData[i,]$Google_Latitude_Start, myData[i,]$Google_Longitude_Start, sep=", ")
  endingCoords = paste(myData[i,]$Google_Latitude_End, myData[i,]$Google_Longitude_End, sep=", ")

  # retrieve the route
  route = google_directions(startingCoords,
                            endingCoords,
                            myData[i,]$google_transit_mode,
                            key = key,
                            departure_time="now",
                            simplify = TRUE)

  print(route)
  numberOfSteps = length(route$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]])

  routePts = list( travel_mode = list(), coords = list() )
  if(route$status != "ZERO_RESULTS"){
    for(j in 1:numberOfSteps){
      routePts$travel_mode[[j]] = route$routes[3]$legs[[1]]$steps[[1]]$travel_mode[j]
      # if there are no results, give me 0, 0
      # if there are, then give me the decoded points list
      print(j)
      print(route$routes[3]$legs[[1]]$steps[[1]]$travel_mode[j])
      print(route$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]])
      routePts$coords[[j]] = decode_pl(route$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]][j])

    }
  } else{
    routePts$coords[[1]] = "NO RESULT"
    routePts$coords[[1]] = data.frame( lon= c(0), lat=c(0))
  }

  routeCoords[[i]] = routePts

}
```

    ## $geocoded_waypoints
    ##   geocoder_status                    place_id          types
    ## 1              OK ChIJhT8GpkvbmUcRL-kzweJUcZE        premise
    ## 2              OK ChIJeRNiyj_bmUcRxi8Gu8xFFPk street_address
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             48.78065             9.177555             48.77303
    ##   bounds.southwest.lng                                     copyrights
    ## 1             9.159265 Map data ©2018 GeoBasis-DE/BKG (©2009), Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   legs
    ## 1 1.9 km, 1949, 26 mins, 1585, Johannesstraße 76, 70176 Stuttgart, Germany, 48.7806502, 9.1592646, Eberhardstraße 10, 70173 Stuttgart, Germany, 48.7733781, 9.1774613, 29 m, 0.2 km, 90 m, 0.2 km, 13 m, 0.4 km, 0.4 km, 0.5 km, 29, 196, 90, 216, 13, 447, 427, 531, 1 min, 3 mins, 1 min, 3 mins, 1 min, 6 mins, 5 mins, 8 mins, 24, 157, 67, 176, 11, 369, 323, 458, 48.7731235, 48.7734128, 48.7739671, 48.7751259, 48.7750269, 48.7780017, 48.7763434, 48.7806502, 9.1775547, 9.1749992, 9.1741101, 9.1717807, 9.1716779, 9.1676475, 9.1623949, 9.1592646, Head <b>south</b> on <b>Töpferstraße</b> toward <b>Eberhardstraße</b>, Turn <b>right</b> onto <b>Eberhardstraße</b>, Continue onto <b>Königstraße</b>, Continue onto <b>Rotebühlpl.</b>, Turn <b>left</b> onto <b>Rotebühlpl.</b>/<b>B27a</b>, Turn <b>right</b> onto <b>Fritz-Elsas-Straße</b>, Turn <b>left</b> onto <b>Schloßstraße</b>, Turn <b>right</b> onto <b>Johannesstraße</b>, s`uhHcn_w@r@Q, __uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV, y`uhHw~~v@GPIRS\\Yb@_@r@OT, iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@, qkuhHsj~v@RR, }juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB, o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC, csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC, 48.7733781, 48.7731235, 48.7734128, 48.7739671, 48.7751259, 48.7750269, 48.7780017, 48.7763434, 9.1774613, 9.1775547, 9.1749992, 9.1741101, 9.1717807, 9.1716779, 9.1676475, 9.1623949, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, NA, turn-right, NA, NA, turn-left, turn-right, turn-left, turn-right
    ##                                                                                                                                            points
    ## 1 s`uhHcn_w@r@QN~B@hAGXKx@[fC[vAQd@m@`Ao@hAe@vAk@|B[fAUf@y@pAi@x@RRw@vAyClF_@v@k@nAkAtBi@p@g@d@uChCl@fCr@nD\\hBrA|EjAlGj@lCIDq@`@eHrEcDdCcDjBsDbC
    ##          summary
    ## 1 Johannesstraße
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "s`uhHcn_w@r@Q"                                         
    ## [2] "__uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV"                  
    ## [3] "y`uhHw~~v@GPIRS\\Yb@_@r@OT"                            
    ## [4] "iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@"             
    ## [5] "qkuhHsj~v@RR"                                          
    ## [6] "}juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB"
    ## [7] "o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC"             
    ## [8] "csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC"             
    ## [1] 2
    ## [1] "WALKING"
    ## [1] "s`uhHcn_w@r@Q"                                         
    ## [2] "__uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV"                  
    ## [3] "y`uhHw~~v@GPIRS\\Yb@_@r@OT"                            
    ## [4] "iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@"             
    ## [5] "qkuhHsj~v@RR"                                          
    ## [6] "}juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB"
    ## [7] "o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC"             
    ## [8] "csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC"             
    ## [1] 3
    ## [1] "WALKING"
    ## [1] "s`uhHcn_w@r@Q"                                         
    ## [2] "__uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV"                  
    ## [3] "y`uhHw~~v@GPIRS\\Yb@_@r@OT"                            
    ## [4] "iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@"             
    ## [5] "qkuhHsj~v@RR"                                          
    ## [6] "}juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB"
    ## [7] "o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC"             
    ## [8] "csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC"             
    ## [1] 4
    ## [1] "WALKING"
    ## [1] "s`uhHcn_w@r@Q"                                         
    ## [2] "__uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV"                  
    ## [3] "y`uhHw~~v@GPIRS\\Yb@_@r@OT"                            
    ## [4] "iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@"             
    ## [5] "qkuhHsj~v@RR"                                          
    ## [6] "}juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB"
    ## [7] "o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC"             
    ## [8] "csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC"             
    ## [1] 5
    ## [1] "WALKING"
    ## [1] "s`uhHcn_w@r@Q"                                         
    ## [2] "__uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV"                  
    ## [3] "y`uhHw~~v@GPIRS\\Yb@_@r@OT"                            
    ## [4] "iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@"             
    ## [5] "qkuhHsj~v@RR"                                          
    ## [6] "}juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB"
    ## [7] "o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC"             
    ## [8] "csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC"             
    ## [1] 6
    ## [1] "WALKING"
    ## [1] "s`uhHcn_w@r@Q"                                         
    ## [2] "__uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV"                  
    ## [3] "y`uhHw~~v@GPIRS\\Yb@_@r@OT"                            
    ## [4] "iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@"             
    ## [5] "qkuhHsj~v@RR"                                          
    ## [6] "}juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB"
    ## [7] "o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC"             
    ## [8] "csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC"             
    ## [1] 7
    ## [1] "WALKING"
    ## [1] "s`uhHcn_w@r@Q"                                         
    ## [2] "__uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV"                  
    ## [3] "y`uhHw~~v@GPIRS\\Yb@_@r@OT"                            
    ## [4] "iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@"             
    ## [5] "qkuhHsj~v@RR"                                          
    ## [6] "}juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB"
    ## [7] "o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC"             
    ## [8] "csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC"             
    ## [1] 8
    ## [1] "WALKING"
    ## [1] "s`uhHcn_w@r@Q"                                         
    ## [2] "__uhHun_w@N~B@hAGXE\\EZUnBEVCLGXEVIV"                  
    ## [3] "y`uhHw~~v@GPIRS\\Yb@_@r@OT"                            
    ## [4] "iduhHey~v@Ob@Ur@Od@[vAOj@KZMVGNOXi@v@i@x@"             
    ## [5] "qkuhHsj~v@RR"                                          
    ## [6] "}juhH_j~v@W`@_@t@kBbDm@hAEFYn@k@nAkAtBi@p@g@d@e@b@oBdB"
    ## [7] "o}uhHyp}v@`@fBJ^VtAZxA\\hBrA|E^pBj@zCj@lC"             
    ## [8] "csuhH}o|v@IDMHc@V_BbAeEnCiBtAy@n@cDjBsDbC"             
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJeRNiyj_bmUcRxi8Gu8xFFPk
    ## 2              OK ChIJp4vo87TbmUcRQM4JL5Zu4F8
    ##                                           types
    ## 1                                street_address
    ## 2 establishment, gym, health, point_of_interest
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             48.78065             9.175461             48.76433
    ##   bounds.southwest.lng                                     copyrights
    ## 1             9.159265 Map data ©2018 GeoBasis-DE/BKG (©2009), Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     legs
    ## 1 8:49pm, Europe/Berlin, 1537469367, 8:34pm, Europe/Berlin, 1537468494, 2.8 km, 2836, 15 mins, 873, Marienplatz 3-5, 70178 Stuttgart, Germany, 48.7643321, 9.1675391, Johannesstraße 76, 70176 Stuttgart, Germany, 48.7806502, 9.1592646, 0.5 km, 2.3 km, 43 m, 533, 2260, 43, 6 mins, 8 mins, 1 min, 365, 480, 27, 48.7763826, 48.7643591, 48.7643321, 9.1621163, 9.168137, 9.1675391, Walk to Schloss-/Johannesstraße, Subway towards Südheimer Platz, Walk to Marienplatz 3-5, 70178 Stuttgart, Germany, anvhHk|{v@rDcCbDkBx@o@hBuAdEoC~AcAb@WNd@, esuhHmn|v@{C_g@fMeVr\\_S|b@vl@, ghshH{s}v@DvB, 48.7806502, 48.7763453, 48.7643591, 9.1592646, 9.1621488, 9.168137, 0.5 km, 16 m, 517, 16, 6 mins, 1 min, 351, 14, 48.7764563, 48.7763826, 9.1623108, 9.1621163, Head <b>southeast</b> on <b>Johannesstraße</b> toward <b>Rosenbergstraße</b>, Turn <b>right</b> onto <b>Schloßstraße</b><div style="font-size:0.9em">Destination will be on the left</div>, anvhHk|{v@rDcCbDkBx@o@hBuAdEoC~AcAb@W, {suhHmo|v@Nd@, 48.7806502, 48.7764563, 9.1592646, 9.1623108, WALKING, WALKING, NA, turn-right, 43 m, 43, 1 min, 27, 48.7643321, 9.1675391, ghshH{s}v@DvB, 48.7643591, 9.168137, WALKING, WALKING, TRANSIT, WALKING, NA, 48.7643591, NA, NA, 9.168137, NA, NA, Marienplatz, NA, NA, 8:49pm, NA, NA, Europe/Berlin, NA, NA, 1537469340, NA, NA, 48.7763453, NA, NA, 9.1621488, NA, NA, Schloss-/Johannesstraße, NA, NA, 8:41pm, NA, NA, Europe/Berlin, NA, NA, 1537468860, NA, NA, Südheimer Platz, NA, VVS, 011 49 711 66060, http://www.vvs.de/, NA, #8bc34a, NA, NA, Heslach Vogelrain - Rotebühlplatz - Vogelsang, NA, NA, U34, NA, NA, #000000, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/de-metro.png, NA, NA, Subway, NA, NA, SUBWAY, NA, NA, 4, NA
    ##                                                      points summary
    ## 1 anvhHk|{v@rDcCbDkBbDeCdHsEb@WNd@DE{C_g@fMeVr\\_S|b@vl@DvB        
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "anvhHk|{v@rDcCbDkBx@o@hBuAdEoC~AcAb@WNd@"
    ## [2] "esuhHmn|v@{C_g@fMeVr\\_S|b@vl@"          
    ## [3] "ghshH{s}v@DvB"                           
    ## [1] 2
    ## [1] "TRANSIT"
    ## [1] "anvhHk|{v@rDcCbDkBx@o@hBuAdEoC~AcAb@WNd@"
    ## [2] "esuhHmn|v@{C_g@fMeVr\\_S|b@vl@"          
    ## [3] "ghshH{s}v@DvB"                           
    ## [1] 3
    ## [1] "WALKING"
    ## [1] "anvhHk|{v@rDcCbDkBx@o@hBuAdEoC~AcAb@WNd@"
    ## [2] "esuhHmn|v@{C_g@fMeVr\\_S|b@vl@"          
    ## [3] "ghshH{s}v@DvB"                           
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJp4vo87TbmUcRQM4JL5Zu4F8
    ## 2              OK ChIJeRNiyj_bmUcRxi8Gu8xFFPk
    ##                                           types
    ## 1 establishment, gym, health, point_of_interest
    ## 2                                street_address
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             48.78065             9.169136             48.76433
    ##   bounds.southwest.lng                                     copyrights
    ## 1             9.159265 Map data ©2018 GeoBasis-DE/BKG (©2009), Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             legs
    ## 1 8:47pm, Europe/Berlin, 1537469221, 8:37pm, Europe/Berlin, 1537468663, 2.1 km, 2095, 9 mins, 558, Johannesstraße 76, 70176 Stuttgart, Germany, 48.7806502, 9.1592646, Marienplatz 3-5, 70178 Stuttgart, Germany, 48.7643321, 9.1675391, 25 m, 1.9 km, 0.1 km, 25, 1927, 143, 1 min, 7 mins, 2 mins, 17, 420, 121, 48.7645384, 48.7799269, 48.7806502, 9.167687, 9.1602827, 9.1592646, Walk to Marienplatz, Bus towards Berliner Platz (Liederhalle), Walk to Johannesstraße 76, 70176 Stuttgart, Germany, ahshHcp}v@i@], kishHaq}v@cVqFmMo@yO|JaTd^wSfK, givhH}b|v@XlAsDbC, 48.7643321, 48.7645384, 48.7798845, 9.1675391, 9.167687, 9.1603145, 25 m, 25, 1 min, 17, 48.7645384, 9.167687, ahshHcp}v@i@], 48.7643321, 9.1675391, WALKING, 33 m, 0.1 km, 33, 110, 1 min, 2 mins, 28, 93, 48.7797544, 48.7806502, 9.1599154, 9.1592646, Head <b>southwest</b> on <b>Rosenbergstraße</b> toward <b>Johannesstraße</b>, Turn <b>right</b> onto <b>Johannesstraße</b>, givhH}b|v@XlA, mhvhHo`|v@sDbC, 48.7798845, 48.7797544, 9.1603145, 9.1599154, WALKING, WALKING, NA, turn-right, WALKING, TRANSIT, WALKING, NA, 48.7799269, NA, NA, 9.1602827, NA, NA, Rosenberg-/Johannesstraße, NA, NA, 8:45pm, NA, NA, Europe/Berlin, NA, NA, 1537469100, NA, NA, 48.7645384, NA, NA, 9.167687, NA, NA, Marienplatz, NA, NA, 8:38pm, NA, NA, Europe/Berlin, NA, NA, 1537468680, NA, NA, Berliner Platz (Liederhalle), NA, VVS, 011 49 711 66060, http://www.vvs.de/, NA, #d50000, NA, NA, Lerchenrainschule - Marienplatz - Berliner Platz, NA, NA, 41, NA, NA, #ffffff, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png, NA, NA, Bus, NA, NA, BUS, NA, NA, 5, NA
    ##                                       points summary
    ## 1 ahshHcp}v@i@]cVqFmMo@yO|JaTd^wSfKHEXlAsDbC        
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "ahshHcp}v@i@]"                  "kishHaq}v@cVqFmMo@yO|JaTd^wSfK"
    ## [3] "givhH}b|v@XlAsDbC"             
    ## [1] 2
    ## [1] "TRANSIT"
    ## [1] "ahshHcp}v@i@]"                  "kishHaq}v@cVqFmMo@yO|JaTd^wSfK"
    ## [3] "givhH}b|v@XlAsDbC"             
    ## [1] 3
    ## [1] "WALKING"
    ## [1] "ahshHcp}v@i@]"                  "kishHaq}v@cVqFmMo@yO|JaTd^wSfK"
    ## [3] "givhH}b|v@XlAsDbC"             
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJeRNiyj_bmUcRxi8Gu8xFFPk
    ## 2              OK ChIJWefoIkbbmUcRD3XeZ1yWDyk
    ##                                          types
    ## 1                               street_address
    ## 2 cafe, establishment, food, point_of_interest
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             48.78065              9.16806             48.77387
    ##   bounds.southwest.lng                                     copyrights
    ## 1             9.159265 Map data ©2018 GeoBasis-DE/BKG (©2009), Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              legs
    ## 1 1.1 km, 1139, 14 mins, 823, Herzogstraße, 70176 Stuttgart, Germany, 48.7738655, 9.1680605, Johannesstraße 76, 70176 Stuttgart, Germany, 48.7806502, 9.1592646, 0.4 km, 0.2 km, 0.4 km, 0.1 km, 436, 168, 394, 141, 5 mins, 2 mins, 5 mins, 2 mins, 288, 114, 323, 98, 48.7771198, 48.7775642, 48.7743781, 48.7738655, 9.1618468, 9.1640322, 9.1663488, 9.1680605, Head <b>southeast</b> on <b>Johannesstraße</b> toward <b>Rosenbergstraße</b>, Turn <b>left</b> onto <b>Breitscheidstraße</b>, Turn <b>right</b> onto <b>Silberburgstraße</b>, At the roundabout, take the <b>2nd</b> exit onto <b>Herzogstraße</b>, anvhHk|{v@rDcCbDkBx@o@hBuAdEoC, _xuhHql|v@wAsL, wzuhHez|v@x@e@j@[JGHIn@]~@m@lE{C`EsC, {fuhHuh}v@?MBGD?B@vAaI, 48.7806502, 48.7771198, 48.7775642, 48.7743781, 9.1592646, 9.1618468, 9.1640322, 9.1663488, WALKING, WALKING, WALKING, WALKING, NA, turn-left, turn-right, roundabout-right
    ##                                                 points
    ## 1 anvhHk|{v@rDcCbDkBbDeCdEoCwAsLdBaAdC}AnKoH?MBGH@vAaI
    ##                               summary
    ## 1 Johannesstraße and Silberburgstraße
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "anvhHk|{v@rDcCbDkBx@o@hBuAdEoC"      
    ## [2] "_xuhHql|v@wAsL"                      
    ## [3] "wzuhHez|v@x@e@j@[JGHIn@]~@m@lE{C`EsC"
    ## [4] "{fuhHuh}v@?MBGD?B@vAaI"              
    ## [1] 2
    ## [1] "WALKING"
    ## [1] "anvhHk|{v@rDcCbDkBx@o@hBuAdEoC"      
    ## [2] "_xuhHql|v@wAsL"                      
    ## [3] "wzuhHez|v@x@e@j@[JGHIn@]~@m@lE{C`EsC"
    ## [4] "{fuhHuh}v@?MBGD?B@vAaI"              
    ## [1] 3
    ## [1] "WALKING"
    ## [1] "anvhHk|{v@rDcCbDkBx@o@hBuAdEoC"      
    ## [2] "_xuhHql|v@wAsL"                      
    ## [3] "wzuhHez|v@x@e@j@[JGHIn@]~@m@lE{C`EsC"
    ## [4] "{fuhHuh}v@?MBGD?B@vAaI"              
    ## [1] 4
    ## [1] "WALKING"
    ## [1] "anvhHk|{v@rDcCbDkBx@o@hBuAdEoC"      
    ## [2] "_xuhHql|v@wAsL"                      
    ## [3] "wzuhHez|v@x@e@j@[JGHIn@]~@m@lE{C`EsC"
    ## [4] "{fuhHuh}v@?MBGD?B@vAaI"              
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJWefoIkbbmUcRD3XeZ1yWDyk
    ## 2              OK ChIJhT8GpkvbmUcRL-kzweJUcZE
    ##                                          types
    ## 1 cafe, establishment, food, point_of_interest
    ## 2                                      premise
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             48.77444             9.177555             48.77303
    ##   bounds.southwest.lng                                     copyrights
    ## 1              9.16806 Map data ©2018 GeoBasis-DE/BKG (©2009), Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       legs
    ## 1 0.8 km, 813, 10 mins, 595, Eberhardstraße 10, 70173 Stuttgart, Germany, 48.7733781, 9.1774613, Herzogstraße, 70176 Stuttgart, Germany, 48.7738655, 9.1680605, 73 m, 54 m, 14 m, 49 m, 18 m, 0.2 km, 0.1 km, 7 m, 90 m, 0.2 km, 29 m, 73, 54, 14, 49, 18, 170, 113, 7, 90, 196, 29, 1 min, 1 min, 1 min, 1 min, 1 min, 2 mins, 1 min, 1 min, 1 min, 2 mins, 1 min, 47, 35, 14, 51, 18, 123, 75, 5, 64, 144, 19, 48.7735844, 48.7738057, 48.7737745, 48.7739472, 48.7740752, 48.774443, 48.7739191, 48.7739671, 48.7734128, 48.7731235, 48.7733781, 9.1689511, 9.1696011, 9.1697838, 9.1704029, 9.1705511, 9.1727239, 9.1740493, 9.1741101, 9.1749992, 9.1775547, 9.1774613, Head <b>southeast</b> on <b>Herzogstraße</b> toward <b>Rotebühlstraße</b>, Turn <b>left</b> onto <b>Rotebühlstraße</b>, Slight <b>right</b> onto <b>Paulinenstraße</b>, Slight <b>left</b> onto <b>Rotebühlstraße</b>, Continue onto <b>Rotebühlpl.</b>/<b>B27a</b>, Turn <b>right</b> onto <b>Rotebühlpl.</b>, Turn <b>right</b> to stay on <b>Rotebühlpl.</b>, Turn <b>left</b> onto <b>Königstraße</b>, Turn <b>right</b> to stay on <b>Königstraße</b>, Continue onto <b>Eberhardstraße</b>, Turn <b>left</b> onto <b>Töpferstraße</b><div style="font-size:0.9em">Destination will be on the right</div>, ucuhHks}v@^qBDWDMDIFO, {auhH}x}v@Ka@UaAK], icuhH_}}v@@Q@KBE, acuhHc~}v@Kk@CSEQGYEO, eduhH_b~v@Y], _euhH}b~v@FQBO@K?M?MAK_@cDs@wD, gguhHop~v@T{@Ru@T_ATq@Pe@, _duhHyx~v@CEEE, iduhHey~v@NU^s@Xc@R]HSFQ, y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C, __uhHun_w@s@P, 48.7738655, 48.7735844, 48.7738057, 48.7737745, 48.7739472, 48.7740752, 48.774443, 48.7739191, 48.7739671, 48.7734128, 48.7731235, 9.1680605, 9.1689511, 9.1696011, 9.1697838, 9.1704029, 9.1705511, 9.1727239, 9.1740493, 9.1741101, 9.1749992, 9.1775547, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, WALKING, NA, turn-left, turn-slight-right, turn-slight-left, NA, turn-right, turn-right, turn-left, turn-right, NA, turn-left
    ##                                                                                            points
    ## 1 ucuhHks}v@d@iCJWFOKa@a@_BB]BEKk@Ie@Mi@Y]FQD[?[a@oDs@wDT{@h@uBf@wAIK|AkCPe@No@f@oDJy@FYAiAO_Cs@P
    ##       summary
    ## 1 Rotebühlpl.
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 2
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 3
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 4
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 5
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 6
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 7
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 8
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 9
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 10
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## [1] 11
    ## [1] "WALKING"
    ##  [1] "ucuhHks}v@^qBDWDMDIFO"              
    ##  [2] "{auhH}x}v@Ka@UaAK]"                 
    ##  [3] "icuhH_}}v@@Q@KBE"                   
    ##  [4] "acuhHc~}v@Kk@CSEQGYEO"              
    ##  [5] "eduhH_b~v@Y]"                       
    ##  [6] "_euhH}b~v@FQBO@K?M?MAK_@cDs@wD"     
    ##  [7] "gguhHop~v@T{@Ru@T_ATq@Pe@"          
    ##  [8] "_duhHyx~v@CEEE"                     
    ##  [9] "iduhHey~v@NU^s@Xc@R]HSFQ"           
    ## [10] "y`uhHw~~v@HWDWFYBMDWToBD[D]FYAiAO_C"
    ## [11] "__uhHun_w@s@P"                      
    ## $available_travel_modes
    ## [1] "DRIVING"   "WALKING"   "BICYCLING"
    ## 
    ## $geocoded_waypoints
    ## data frame with 0 columns and 2 rows
    ## 
    ## $routes
    ## list()
    ## 
    ## $status
    ## [1] "ZERO_RESULTS"
    ## 
    ## $available_travel_modes
    ## [1] "DRIVING"   "WALKING"   "BICYCLING"
    ## 
    ## $geocoded_waypoints
    ## data frame with 0 columns and 2 rows
    ## 
    ## $routes
    ## list()
    ## 
    ## $status
    ## [1] "ZERO_RESULTS"
    ## 
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJR0lA1VBmwokR8BGfSBOyT-w
    ## 2              OK ChIJQXbSFqZbwokRf-yZPR9xVxU
    ##                                       types
    ## 1 airport, establishment, point_of_interest
    ## 2  establishment, health, point_of_interest
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1              40.6999            -73.77814             40.64131
    ##   bounds.southwest.lng            copyrights
    ## 1            -73.95664 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            legs
    ## 1 3:41pm, America/New_York, 1537472482, 2:39pm, America/New_York, 1537468761, 22.6 km, 22609, 1 hour 2 mins, 3721, 645 Park Pl, Brooklyn, NY 11216, USA, 40.674194, -73.9566425, John F. Kennedy International Airport, Queens, NY 11430, USA, 40.6413111, -73.7781391, 0.7 km, 8.5 km, 73 m, 12.3 km, 1.1 km, 679, 8479, 73, 12270, 1108, 7 mins, 13 mins, 1 min, 14 mins, 15 mins, 413, 760, 54, 840, 896, 40.6472208, 40.6987644, 40.6999009, 40.67838, 40.674194, -73.7801676, -73.8088544, -73.8074577, -73.94822, -73.9566425, Walk to JFK Terminal 5, Light rail towards Jamaica - Airport, Walk to Jamaica, Train towards Atlantic Terminal, Walk to 645 Park Pl, Brooklyn, NY 11216, USA, ew`wFjxhaM}c@tK, myawF~biaMiEfIOZK^I`@ETe@xEa@bEEb@Ab@Ab@@b@@`@Db@Fb@F^J`@L^L\\NXj@dANZPZN\\L\\L\\JXtB~G~@vCJ\\Pb@P\\P\\PTLRPTNVHNHNN\\L\\J`@H`@@JFb@B`@B`@VlERnF@L@b@@b@@b@@b@?X?V@jB?T@`@?^?TA\\Ab@Ab@Ab@Cb@C`@Eb@Eb@E`@G`@Gb@I`@I^I`@I`@K^M^K^M\\M^O\\OZO\\OZQZQZQXSXSVSVQTSRYZuAzAUVQRSTUTUTUTUTURUTURWTURURWRURWRURWPWRUPWPWPWPuCrBQLQJQLWPWNWNMHUL_E|BKFMFKFKFKFQHWLYLYLWJYJYJ[HYHYFYH[DYF[Da@D_@D[@[?[AYA[EYE[GYIYIYMWMYOYSWSiDqCOOSWQ[M_@gAcEM]Q[SWWSWM[GYCsBC}CCwGEgF?UAYA[C[CYC[EYE[EYE[EYG[GYGYI[IYIYIYIYKYKYKYMWKYMYOWMYOWMw@c@UMUKUMUKYOYKYKYKYI[IYGYG[EYEQCSAQAQCQAQ?QAQAQ?QAQ?YA[A[?[AY?[?[?Y?[?[?[?Y@[?[?Y@[@[?[@Y@[BY@YB[BYDWB[DYFYD[FYH[FYHYHYHYJYHs@XoBt@aBl@ex@lZYLUHYJYJWLYLYJYLWLYLYLWLYLkXnMMFWLYLWLYL_VxK[LWLYNWLYNWLYNWLYLYF[D[@YC[GWKYOUUSWQ[M]M_@Ia@I_@Ia@Ia@GYIa@K_@Ka@I_@M_@eC}I, oalwFvmnaM[J_Bn@, oclwFhvnaMFCdBnJHn@F`ANjCHj@\\rCHt@\\`B`@lBFPPf@r@rCDNn@dCx@jDpE`Vh@vCZbBZbAlElUjChNxAxHtB`LdB`JfDrQnAzGzDjSnBlKlB~JfC`NhBzJhCxMzBpLdEvTrBxKl@~CTrAZfBrCfOhC`NbCrMhDpQTjAlIxc@f@fCZdBvCtOd@`CNz@rAdHdBfJRdAh@`DlAlIF`@|@rHHr@t@tHXhDH~@f@|HDt@NrDPrFJrDJjI@lC?tBAj@C`@Cn@AZOrBKzAO`CG`AI~ACbAAl@GhCc@fUa@pQo@`[Y|JIvEQrHE`BCv@Av@EnAG`CGfDEjBAb@Cv@ErBGrCGdCAd@Av@Cv@A|@InDK`ECjAClAATKfGGfC?FEfBIhDMhGAZCxAEz@KbGErBAXEdBIzCMnGALAr@At@KfEKrF?JEzACn@MfFI`DA\\CpAC`AEfC@?, _`hwFpejbMEpAARWdM?PCb@?NCVABARCTIt@CRi@rECRk@lERAFARChBQb@DLBjCp@JBjCp@LD`Dx@LD`Dz@LBbDv@, 40.6413111, 40.6467889, 40.6992838, 40.6996, 40.678565, -73.7781391, -73.7798408, -73.8071575, -73.80853, -73.9492063, 0.7 km, 679, 7 mins, 413, 40.6472208, -73.7801676, ew`wFjxhaM}c@tK, 40.6413111, -73.7781391, WALKING, 73 m, 73, 1 min, 54, 40.6999009, -73.8074577, Head <b>north</b> on <b>Sutphin Blvd</b>, oalwFvmnaM[J_Bn@, 40.6992838, -73.8071575, WALKING, 0.5 km, 0.6 km, 522, 586, 7 mins, 8 mins, 422, 474, 40.6792193, 40.674194, -73.9552366, -73.9566425, Head <b>west</b> on <b>Atlantic Ave</b> toward <b>James E. Davis Ave</b>/<b>Nostrand Ave</b><div style="font-size:0.9em">Pass by Advance Auto Parts (on the right in 300&nbsp;m)</div>, Turn <b>left</b> onto <b>Franklin Ave</b>, _`hwFpejbMEpAARWdM?PCb@?NCVABARCTIt@CRi@rECRk@lERA, cdhwFfkkbMFARChBQb@DLBjCp@JBjCp@LD`Dx@LD`Dz@LBbDv@, 40.678565, 40.6792193, -73.9492063, -73.9552366, WALKING, WALKING, NA, turn-left, WALKING, TRANSIT, WALKING, TRANSIT, WALKING, NA, 40.6987644, NA, 40.67838, NA, NA, -73.8088544, NA, -73.94822, NA, NA, Jamaica Station (AirTrain), NA, Nostrand Av, NA, NA, 3:08pm, NA, 3:27pm, NA, NA, America/New_York, NA, America/New_York, NA, NA, 1537470534, NA, 1537471620, NA, NA, 40.6467889, NA, 40.6996, NA, NA, -73.7798408, NA, -73.80853, NA, NA, JFK Terminal 5, NA, Jamaica, NA, NA, 2:56pm, NA, 3:13pm, NA, NA, America/New_York, NA, America/New_York, NA, NA, 1537469774, NA, 1537470780, NA, NA, Jamaica - Airport, NA, Atlantic Terminal, NA, NA, 600, NA, NA, NA, The Port Authority of NY & NJ, http://www.panynj.gov/airports, Long Island Rail Road, 1 (718) 558-7400, http://web.mta.info/lirr, NA, #f44336, NA, #6e3219, NA, NA, AirTrain JFK Red, NA, Far Rockaway, NA, NA, #ffffff, NA, #ffffff, NA, NA, http://www.panynj.gov/airports/jfk-airtrain.html, NA, NA, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/tram2.png, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/rail2.png, NA, NA, Light rail, NA, Train, NA, NA, TRAM, NA, HEAVY_RAIL, NA, NA, 4, NA, 2, NA
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         points
    ## 1 ew`wFjxhaM}c@tKtAaAyEbJU`Ak@nFg@fFCfABdALfAR`AZ|@|AvCv@rBrExNb@z@^h@t@lA\\z@TbAPrBj@|LBp@DdCBzDCvBKlCYjCe@fCo@`C{@vBcApBmAbBuC`DiDlDuDbD{AjA}EhDaDpBgH|DeBr@iBf@kB\\aAJw@@u@Cu@Ku@Qs@Wq@]q@g@yDaDe@s@uAcF_@y@k@k@s@UmCGuLI}FAu@EkBSkBYkBc@gBi@eBq@eB{@{BkA_Bu@iBk@iB[iAKgAE}DG{E@mBBkBHgBPkBZiBd@aCx@sbAn_@kElBkZrNmXbMcBz@cBx@u@Lu@As@So@e@e@s@[}@g@eCi@}B}C}KgBqI[J_Bn@z@tEFCdBnJPpBNjCHj@f@hE~@nEXx@bDtMzFxZZbBZbAxIvd@nEzUxO|y@nMjr@~P|}@rFbZlMrq@xWhvA|@fFtAnJfAfJnA~Mp@|JThF\\fLLxMA`DGpAm@lJQ`DEpB}BdhAc@tQWtKS`Ik@bX_Bxv@YlM_@~O[dPW~JSrICfCc@dEEpAYxMCt@G~@{@rHo@`FZC|BUp@HpHlBbOvD
    ##   summary
    ## 1        
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "ew`wFjxhaM}c@tK"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    ## [2] "myawF~biaMiEfIOZK^I`@ETe@xEa@bEEb@Ab@Ab@@b@@`@Db@Fb@F^J`@L^L\\NXj@dANZPZN\\L\\L\\JXtB~G~@vCJ\\Pb@P\\P\\PTLRPTNVHNHNN\\L\\J`@H`@@JFb@B`@B`@VlERnF@L@b@@b@@b@@b@?X?V@jB?T@`@?^?TA\\Ab@Ab@Ab@Cb@C`@Eb@Eb@E`@G`@Gb@I`@I^I`@I`@K^M^K^M\\M^O\\OZO\\OZQZQZQXSXSVSVQTSRYZuAzAUVQRSTUTUTUTUTURUTURWTURURWRURWRURWPWRUPWPWPWPuCrBQLQJQLWPWNWNMHUL_E|BKFMFKFKFKFQHWLYLYLWJYJYJ[HYHYFYH[DYF[Da@D_@D[@[?[AYA[EYE[GYIYIYMWMYOYSWSiDqCOOSWQ[M_@gAcEM]Q[SWWSWM[GYCsBC}CCwGEgF?UAYA[C[CYC[EYE[EYE[EYG[GYGYI[IYIYIYIYKYKYKYMWKYMYOWMYOWMw@c@UMUKUMUKYOYKYKYKYI[IYGYG[EYEQCSAQAQCQAQ?QAQAQ?QAQ?YA[A[?[AY?[?[?Y?[?[?[?Y@[?[?Y@[@[?[@Y@[BY@YB[BYDWB[DYFYD[FYH[FYHYHYHYJYHs@XoBt@aBl@ex@lZYLUHYJYJWLYLYJYLWLYLYLWLYLkXnMMFWLYLWLYL_VxK[LWLYNWLYNWLYNWLYLYF[D[@YC[GWKYOUUSWQ[M]M_@Ia@I_@Ia@Ia@GYIa@K_@Ka@I_@M_@eC}I"
    ## [3] "oalwFvmnaM[J_Bn@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    ## [4] "oclwFhvnaMFCdBnJHn@F`ANjCHj@\\rCHt@\\`B`@lBFPPf@r@rCDNn@dCx@jDpE`Vh@vCZbBZbAlElUjChNxAxHtB`LdB`JfDrQnAzGzDjSnBlKlB~JfC`NhBzJhCxMzBpLdEvTrBxKl@~CTrAZfBrCfOhC`NbCrMhDpQTjAlIxc@f@fCZdBvCtOd@`CNz@rAdHdBfJRdAh@`DlAlIF`@|@rHHr@t@tHXhDH~@f@|HDt@NrDPrFJrDJjI@lC?tBAj@C`@Cn@AZOrBKzAO`CG`AI~ACbAAl@GhCc@fUa@pQo@`[Y|JIvEQrHE`BCv@Av@EnAG`CGfDEjBAb@Cv@ErBGrCGdCAd@Av@Cv@A|@InDK`ECjAClAATKfGGfC?FEfBIhDMhGAZCxAEz@KbGErBAXEdBIzCMnGALAr@At@KfEKrF?JEzACn@MfFI`DA\\CpAC`AEfC@?"                                                                                                                                                                                                                                                                                                                  
    ## [5] "_`hwFpejbMEpAARWdM?PCb@?NCVABARCTIt@CRi@rECRk@lERAFARChBQb@DLBjCp@JBjCp@LD`Dx@LD`Dz@LBbDv@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    ## [1] 2
    ## [1] "TRANSIT"
    ## [1] "ew`wFjxhaM}c@tK"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    ## [2] "myawF~biaMiEfIOZK^I`@ETe@xEa@bEEb@Ab@Ab@@b@@`@Db@Fb@F^J`@L^L\\NXj@dANZPZN\\L\\L\\JXtB~G~@vCJ\\Pb@P\\P\\PTLRPTNVHNHNN\\L\\J`@H`@@JFb@B`@B`@VlERnF@L@b@@b@@b@@b@?X?V@jB?T@`@?^?TA\\Ab@Ab@Ab@Cb@C`@Eb@Eb@E`@G`@Gb@I`@I^I`@I`@K^M^K^M\\M^O\\OZO\\OZQZQZQXSXSVSVQTSRYZuAzAUVQRSTUTUTUTUTURUTURWTURURWRURWRURWPWRUPWPWPWPuCrBQLQJQLWPWNWNMHUL_E|BKFMFKFKFKFQHWLYLYLWJYJYJ[HYHYFYH[DYF[Da@D_@D[@[?[AYA[EYE[GYIYIYMWMYOYSWSiDqCOOSWQ[M_@gAcEM]Q[SWWSWM[GYCsBC}CCwGEgF?UAYA[C[CYC[EYE[EYE[EYG[GYGYI[IYIYIYIYKYKYKYMWKYMYOWMYOWMw@c@UMUKUMUKYOYKYKYKYI[IYGYG[EYEQCSAQAQCQAQ?QAQAQ?QAQ?YA[A[?[AY?[?[?Y?[?[?[?Y@[?[?Y@[@[?[@Y@[BY@YB[BYDWB[DYFYD[FYH[FYHYHYHYJYHs@XoBt@aBl@ex@lZYLUHYJYJWLYLYJYLWLYLYLWLYLkXnMMFWLYLWLYL_VxK[LWLYNWLYNWLYNWLYLYF[D[@YC[GWKYOUUSWQ[M]M_@Ia@I_@Ia@Ia@GYIa@K_@Ka@I_@M_@eC}I"
    ## [3] "oalwFvmnaM[J_Bn@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    ## [4] "oclwFhvnaMFCdBnJHn@F`ANjCHj@\\rCHt@\\`B`@lBFPPf@r@rCDNn@dCx@jDpE`Vh@vCZbBZbAlElUjChNxAxHtB`LdB`JfDrQnAzGzDjSnBlKlB~JfC`NhBzJhCxMzBpLdEvTrBxKl@~CTrAZfBrCfOhC`NbCrMhDpQTjAlIxc@f@fCZdBvCtOd@`CNz@rAdHdBfJRdAh@`DlAlIF`@|@rHHr@t@tHXhDH~@f@|HDt@NrDPrFJrDJjI@lC?tBAj@C`@Cn@AZOrBKzAO`CG`AI~ACbAAl@GhCc@fUa@pQo@`[Y|JIvEQrHE`BCv@Av@EnAG`CGfDEjBAb@Cv@ErBGrCGdCAd@Av@Cv@A|@InDK`ECjAClAATKfGGfC?FEfBIhDMhGAZCxAEz@KbGErBAXEdBIzCMnGALAr@At@KfEKrF?JEzACn@MfFI`DA\\CpAC`AEfC@?"                                                                                                                                                                                                                                                                                                                  
    ## [5] "_`hwFpejbMEpAARWdM?PCb@?NCVABARCTIt@CRi@rECRk@lERAFARChBQb@DLBjCp@JBjCp@LD`Dx@LD`Dz@LBbDv@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    ## [1] 3
    ## [1] "WALKING"
    ## [1] "ew`wFjxhaM}c@tK"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    ## [2] "myawF~biaMiEfIOZK^I`@ETe@xEa@bEEb@Ab@Ab@@b@@`@Db@Fb@F^J`@L^L\\NXj@dANZPZN\\L\\L\\JXtB~G~@vCJ\\Pb@P\\P\\PTLRPTNVHNHNN\\L\\J`@H`@@JFb@B`@B`@VlERnF@L@b@@b@@b@@b@?X?V@jB?T@`@?^?TA\\Ab@Ab@Ab@Cb@C`@Eb@Eb@E`@G`@Gb@I`@I^I`@I`@K^M^K^M\\M^O\\OZO\\OZQZQZQXSXSVSVQTSRYZuAzAUVQRSTUTUTUTUTURUTURWTURURWRURWRURWPWRUPWPWPWPuCrBQLQJQLWPWNWNMHUL_E|BKFMFKFKFKFQHWLYLYLWJYJYJ[HYHYFYH[DYF[Da@D_@D[@[?[AYA[EYE[GYIYIYMWMYOYSWSiDqCOOSWQ[M_@gAcEM]Q[SWWSWM[GYCsBC}CCwGEgF?UAYA[C[CYC[EYE[EYE[EYG[GYGYI[IYIYIYIYKYKYKYMWKYMYOWMYOWMw@c@UMUKUMUKYOYKYKYKYI[IYGYG[EYEQCSAQAQCQAQ?QAQAQ?QAQ?YA[A[?[AY?[?[?Y?[?[?[?Y@[?[?Y@[@[?[@Y@[BY@YB[BYDWB[DYFYD[FYH[FYHYHYHYJYHs@XoBt@aBl@ex@lZYLUHYJYJWLYLYJYLWLYLYLWLYLkXnMMFWLYLWLYL_VxK[LWLYNWLYNWLYNWLYLYF[D[@YC[GWKYOUUSWQ[M]M_@Ia@I_@Ia@Ia@GYIa@K_@Ka@I_@M_@eC}I"
    ## [3] "oalwFvmnaM[J_Bn@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    ## [4] "oclwFhvnaMFCdBnJHn@F`ANjCHj@\\rCHt@\\`B`@lBFPPf@r@rCDNn@dCx@jDpE`Vh@vCZbBZbAlElUjChNxAxHtB`LdB`JfDrQnAzGzDjSnBlKlB~JfC`NhBzJhCxMzBpLdEvTrBxKl@~CTrAZfBrCfOhC`NbCrMhDpQTjAlIxc@f@fCZdBvCtOd@`CNz@rAdHdBfJRdAh@`DlAlIF`@|@rHHr@t@tHXhDH~@f@|HDt@NrDPrFJrDJjI@lC?tBAj@C`@Cn@AZOrBKzAO`CG`AI~ACbAAl@GhCc@fUa@pQo@`[Y|JIvEQrHE`BCv@Av@EnAG`CGfDEjBAb@Cv@ErBGrCGdCAd@Av@Cv@A|@InDK`ECjAClAATKfGGfC?FEfBIhDMhGAZCxAEz@KbGErBAXEdBIzCMnGALAr@At@KfEKrF?JEzACn@MfFI`DA\\CpAC`AEfC@?"                                                                                                                                                                                                                                                                                                                  
    ## [5] "_`hwFpejbMEpAARWdM?PCb@?NCVABARCTIt@CRi@rECRk@lERAFARChBQb@DLBjCp@JBjCp@LD`Dx@LD`Dz@LBbDv@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    ## [1] 4
    ## [1] "TRANSIT"
    ## [1] "ew`wFjxhaM}c@tK"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    ## [2] "myawF~biaMiEfIOZK^I`@ETe@xEa@bEEb@Ab@Ab@@b@@`@Db@Fb@F^J`@L^L\\NXj@dANZPZN\\L\\L\\JXtB~G~@vCJ\\Pb@P\\P\\PTLRPTNVHNHNN\\L\\J`@H`@@JFb@B`@B`@VlERnF@L@b@@b@@b@@b@?X?V@jB?T@`@?^?TA\\Ab@Ab@Ab@Cb@C`@Eb@Eb@E`@G`@Gb@I`@I^I`@I`@K^M^K^M\\M^O\\OZO\\OZQZQZQXSXSVSVQTSRYZuAzAUVQRSTUTUTUTUTURUTURWTURURWRURWRURWPWRUPWPWPWPuCrBQLQJQLWPWNWNMHUL_E|BKFMFKFKFKFQHWLYLYLWJYJYJ[HYHYFYH[DYF[Da@D_@D[@[?[AYA[EYE[GYIYIYMWMYOYSWSiDqCOOSWQ[M_@gAcEM]Q[SWWSWM[GYCsBC}CCwGEgF?UAYA[C[CYC[EYE[EYE[EYG[GYGYI[IYIYIYIYKYKYKYMWKYMYOWMYOWMw@c@UMUKUMUKYOYKYKYKYI[IYGYG[EYEQCSAQAQCQAQ?QAQAQ?QAQ?YA[A[?[AY?[?[?Y?[?[?[?Y@[?[?Y@[@[?[@Y@[BY@YB[BYDWB[DYFYD[FYH[FYHYHYHYJYHs@XoBt@aBl@ex@lZYLUHYJYJWLYLYJYLWLYLYLWLYLkXnMMFWLYLWLYL_VxK[LWLYNWLYNWLYNWLYLYF[D[@YC[GWKYOUUSWQ[M]M_@Ia@I_@Ia@Ia@GYIa@K_@Ka@I_@M_@eC}I"
    ## [3] "oalwFvmnaM[J_Bn@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    ## [4] "oclwFhvnaMFCdBnJHn@F`ANjCHj@\\rCHt@\\`B`@lBFPPf@r@rCDNn@dCx@jDpE`Vh@vCZbBZbAlElUjChNxAxHtB`LdB`JfDrQnAzGzDjSnBlKlB~JfC`NhBzJhCxMzBpLdEvTrBxKl@~CTrAZfBrCfOhC`NbCrMhDpQTjAlIxc@f@fCZdBvCtOd@`CNz@rAdHdBfJRdAh@`DlAlIF`@|@rHHr@t@tHXhDH~@f@|HDt@NrDPrFJrDJjI@lC?tBAj@C`@Cn@AZOrBKzAO`CG`AI~ACbAAl@GhCc@fUa@pQo@`[Y|JIvEQrHE`BCv@Av@EnAG`CGfDEjBAb@Cv@ErBGrCGdCAd@Av@Cv@A|@InDK`ECjAClAATKfGGfC?FEfBIhDMhGAZCxAEz@KbGErBAXEdBIzCMnGALAr@At@KfEKrF?JEzACn@MfFI`DA\\CpAC`AEfC@?"                                                                                                                                                                                                                                                                                                                  
    ## [5] "_`hwFpejbMEpAARWdM?PCb@?NCVABARCTIt@CRi@rECRk@lERAFARChBQb@DLBjCp@JBjCp@LD`Dx@LD`Dz@LBbDv@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    ## [1] 5
    ## [1] "WALKING"
    ## [1] "ew`wFjxhaM}c@tK"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    ## [2] "myawF~biaMiEfIOZK^I`@ETe@xEa@bEEb@Ab@Ab@@b@@`@Db@Fb@F^J`@L^L\\NXj@dANZPZN\\L\\L\\JXtB~G~@vCJ\\Pb@P\\P\\PTLRPTNVHNHNN\\L\\J`@H`@@JFb@B`@B`@VlERnF@L@b@@b@@b@@b@?X?V@jB?T@`@?^?TA\\Ab@Ab@Ab@Cb@C`@Eb@Eb@E`@G`@Gb@I`@I^I`@I`@K^M^K^M\\M^O\\OZO\\OZQZQZQXSXSVSVQTSRYZuAzAUVQRSTUTUTUTUTURUTURWTURURWRURWRURWPWRUPWPWPWPuCrBQLQJQLWPWNWNMHUL_E|BKFMFKFKFKFQHWLYLYLWJYJYJ[HYHYFYH[DYF[Da@D_@D[@[?[AYA[EYE[GYIYIYMWMYOYSWSiDqCOOSWQ[M_@gAcEM]Q[SWWSWM[GYCsBC}CCwGEgF?UAYA[C[CYC[EYE[EYE[EYG[GYGYI[IYIYIYIYKYKYKYMWKYMYOWMYOWMw@c@UMUKUMUKYOYKYKYKYI[IYGYG[EYEQCSAQAQCQAQ?QAQAQ?QAQ?YA[A[?[AY?[?[?Y?[?[?[?Y@[?[?Y@[@[?[@Y@[BY@YB[BYDWB[DYFYD[FYH[FYHYHYHYJYHs@XoBt@aBl@ex@lZYLUHYJYJWLYLYJYLWLYLYLWLYLkXnMMFWLYLWLYL_VxK[LWLYNWLYNWLYNWLYLYF[D[@YC[GWKYOUUSWQ[M]M_@Ia@I_@Ia@Ia@GYIa@K_@Ka@I_@M_@eC}I"
    ## [3] "oalwFvmnaM[J_Bn@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    ## [4] "oclwFhvnaMFCdBnJHn@F`ANjCHj@\\rCHt@\\`B`@lBFPPf@r@rCDNn@dCx@jDpE`Vh@vCZbBZbAlElUjChNxAxHtB`LdB`JfDrQnAzGzDjSnBlKlB~JfC`NhBzJhCxMzBpLdEvTrBxKl@~CTrAZfBrCfOhC`NbCrMhDpQTjAlIxc@f@fCZdBvCtOd@`CNz@rAdHdBfJRdAh@`DlAlIF`@|@rHHr@t@tHXhDH~@f@|HDt@NrDPrFJrDJjI@lC?tBAj@C`@Cn@AZOrBKzAO`CG`AI~ACbAAl@GhCc@fUa@pQo@`[Y|JIvEQrHE`BCv@Av@EnAG`CGfDEjBAb@Cv@ErBGrCGdCAd@Av@Cv@A|@InDK`ECjAClAATKfGGfC?FEfBIhDMhGAZCxAEz@KbGErBAXEdBIzCMnGALAr@At@KfEKrF?JEzACn@MfFI`DA\\CpAC`AEfC@?"                                                                                                                                                                                                                                                                                                                  
    ## [5] "_`hwFpejbMEpAARWdM?PCb@?NCVABARCTIt@CRi@rECRk@lERAFARChBQb@DLBjCp@JBjCp@LD`Dx@LD`Dz@LBbDv@"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJQXbSFqZbwokRf-yZPR9xVxU
    ## 2              OK ChIJqW59OnZcwokRp_crqfyJcGk
    ##                                      types
    ## 1 establishment, health, point_of_interest
    ## 2                                  premise
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1               40.682            -73.93073              40.6742
    ##   bounds.southwest.lng            copyrights
    ## 1            -73.95795 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  legs
    ## 1 3:01pm, America/New_York, 1537470104, 2:33pm, America/New_York, 1537468437, 3.7 km, 3739, 28 mins, 1667, 285 MacDonough St, Brooklyn, NY 11233, USA, 40.682002, -73.9348096, 645 Park Pl, Brooklyn, NY 11216, USA, 40.6742034, -73.9566878, 0.1 km, 0.7 km, 0.1 km, 2.2 km, 0.6 km, 147, 667, 122, 2219, 584, 2 mins, 2 mins, 2 mins, 5 mins, 8 mins, 122, 120, 123, 270, 456, 40.67477, 40.680595, 40.681381, 40.679363, 40.682002, -73.957626, -73.955826, -73.956848, -73.930733, -73.9348096, Walk to Park Pl, Subway towards Franklin Av, Walk to Franklin Av, Subway towards Euclid Av, Walk to 285 MacDonough St, Brooklyn, NY 11233, USA, wdgwFhtkbMm@vEGb@KCo@{@, ihgwFdzkbMc\\qIGAEAIAEAGAE?GAGAE?GAG?E?I?EAG?yBC, wlhwF|nkbM{CjE, sqhwFhukbMzBmQDW@UDWBSBUBU@UBQ?UBS@S@S@Q?S@QR_KfBwz@nBi~@, _ehwF`rfbMa@hGJ@?RGpCIpDEdBi@HM@gAR{@JO@cCXMBcCX, 40.6742034, 40.67477, 40.680595, 40.681381, 40.679363, -73.9566878, -73.957626, -73.955826, -73.956848, -73.930733, 0.1 km, 36 m, 111, 36, 1 min, 1 min, 83, 39, 40.6744657, 40.67477, -73.9579521, -73.957626, Head <b>west</b> on <b>Park Pl</b> toward <b>Classon Ave</b>, Take entrance <span class="location">Franklin Ave & Park Pl at NW corner</span>, wdgwFhtkbMm@vEGb@, yfgwF`|kbMo@{@, 40.6742034, 40.6745345, -73.9566878, -73.9579269, WALKING, WALKING, 0.1 km, 122, 2 mins, 123, 40.681381, -73.956848, wlhwF|nkbM{CjE, 40.680595, -73.955826, WALKING, 0.1 km, 0.2 km, 0.3 km, 113, 192, 279, 2 mins, 2 mins, 3 mins, 111, 138, 207, 40.6795274, 40.679591, 40.682002, -73.9320617, -73.934305, -73.9348096, Take exit <span class="location">Stuyvesant Ave & Fulton St at NW corner</span>, Head <b>west</b> on <b>Fulton St</b> toward <b>Schenectady Ave</b>, Turn <b>right</b> onto <b>Lewis Ave</b>, _ehwF`rfbMa@hG, uehwFlzfbM?RGpCIpDEdB, mfhwFjhgbMi@HM@gAR{@JO@cCXMBcCX, 40.679363, 40.6794657, 40.679591, -73.930733, -73.9320677, -73.934305, WALKING, WALKING, WALKING, NA, NA, turn-right, WALKING, TRANSIT, WALKING, TRANSIT, WALKING, NA, 40.680595, NA, 40.679363, NA, NA, -73.955826, NA, -73.930733, NA, NA, Franklin Av, NA, Utica Av, NA, NA, 2:38pm, NA, 2:54pm, NA, NA, America/New_York, NA, America/New_York, NA, NA, 1537468680, NA, 1537469648, NA, NA, 40.67477, NA, 40.681381, NA, NA, -73.957626, NA, -73.956848, NA, NA, Park Pl, NA, Franklin Av, NA, NA, 2:36pm, NA, 2:49pm, NA, NA, America/New_York, NA, America/New_York, NA, NA, 1537468560, NA, 1537469378, NA, NA, Franklin Av, NA, Euclid Av, NA, MTA New York City Transit, 1 (718) 330-1234, http://www.mta.info/, MTA New York City Transit, 1 (718) 330-1234, http://www.mta.info/, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/us-ny-mta/S.png, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/us-ny-mta/C.png, NA, NA, Franklin Avenue Shuttle, NA, 8 Avenue Local, NA, NA, S, NA, C, NA, NA, http://web.mta.info/nyct/service/pdf/tscur.pdf, NA, http://web.mta.info/nyct/service/pdf/tccur.pdf, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png, NA, NA, Subway, NA, Subway, NA, NA, SUBWAY, NA, SUBWAY, NA, NA, NA, NA, #3949ab, NA, NA, NA, NA, #ffffff, NA, NA, 1, NA, 3, NA
    ##                                                                              points
    ## 1 wdgwFhtkbMu@zFKCo@{@k\\sI]G[CgDG{CjEzBmQPyALsAFqAnFygCa@hGJ@?RQbIEdBi@HuATkALuGv@
    ##   summary
    ## 1        
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "wdgwFhtkbMm@vEGb@KCo@{@"                                  
    ## [2] "ihgwFdzkbMc\\qIGAEAIAEAGAE?GAGAE?GAG?E?I?EAG?yBC"         
    ## [3] "wlhwF|nkbM{CjE"                                           
    ## [4] "sqhwFhukbMzBmQDW@UDWBSBUBU@UBQ?UBS@S@S@Q?S@QR_KfBwz@nBi~@"
    ## [5] "_ehwF`rfbMa@hGJ@?RGpCIpDEdBi@HM@gAR{@JO@cCXMBcCX"         
    ## [1] 2
    ## [1] "TRANSIT"
    ## [1] "wdgwFhtkbMm@vEGb@KCo@{@"                                  
    ## [2] "ihgwFdzkbMc\\qIGAEAIAEAGAE?GAGAE?GAG?E?I?EAG?yBC"         
    ## [3] "wlhwF|nkbM{CjE"                                           
    ## [4] "sqhwFhukbMzBmQDW@UDWBSBUBU@UBQ?UBS@S@S@Q?S@QR_KfBwz@nBi~@"
    ## [5] "_ehwF`rfbMa@hGJ@?RGpCIpDEdBi@HM@gAR{@JO@cCXMBcCX"         
    ## [1] 3
    ## [1] "WALKING"
    ## [1] "wdgwFhtkbMm@vEGb@KCo@{@"                                  
    ## [2] "ihgwFdzkbMc\\qIGAEAIAEAGAE?GAGAE?GAG?E?I?EAG?yBC"         
    ## [3] "wlhwF|nkbM{CjE"                                           
    ## [4] "sqhwFhukbMzBmQDW@UDWBSBUBU@UBQ?UBS@S@S@Q?S@QR_KfBwz@nBi~@"
    ## [5] "_ehwF`rfbMa@hGJ@?RGpCIpDEdBi@HM@gAR{@JO@cCXMBcCX"         
    ## [1] 4
    ## [1] "TRANSIT"
    ## [1] "wdgwFhtkbMm@vEGb@KCo@{@"                                  
    ## [2] "ihgwFdzkbMc\\qIGAEAIAEAGAE?GAGAE?GAG?E?I?EAG?yBC"         
    ## [3] "wlhwF|nkbM{CjE"                                           
    ## [4] "sqhwFhukbMzBmQDW@UDWBSBUBU@UBQ?UBS@S@S@Q?S@QR_KfBwz@nBi~@"
    ## [5] "_ehwF`rfbMa@hGJ@?RGpCIpDEdBi@HM@gAR{@JO@cCXMBcCX"         
    ## [1] 5
    ## [1] "WALKING"
    ## [1] "wdgwFhtkbMm@vEGb@KCo@{@"                                  
    ## [2] "ihgwFdzkbMc\\qIGAEAIAEAGAE?GAGAE?GAG?E?I?EAG?yBC"         
    ## [3] "wlhwF|nkbM{CjE"                                           
    ## [4] "sqhwFhukbMzBmQDW@UDWBSBUBU@UBQ?UBS@S@S@Q?S@QR_KfBwz@nBi~@"
    ## [5] "_ehwF`rfbMa@hGJ@?RGpCIpDEdBi@HM@gAR{@JO@cCXMBcCX"         
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJ7ULOoIBcwokR0J4H47hpXOw
    ## 2              OK ChIJQxkgBUlawokRwli54ANSXM4
    ##                                                            types
    ## 1 bus_station, establishment, point_of_interest, transit_station
    ## 2                               establishment, point_of_interest
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             40.69376            -73.93117             40.66867
    ##   bounds.southwest.lng            copyrights
    ## 1            -73.99047 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             legs
    ## 1 2:55pm, America/New_York, 1537469741, 2:38pm, America/New_York, 1537468717, 6.3 km, 6319, 17 mins, 1024, 198 Montague St, Brooklyn, NY 11201, USA, 40.6937566, -73.9904735, Eastern Py/Utica Av, Brooklyn, NY 11213, USA, 40.668759, -73.9311715, 0.2 km, 6.0 km, 0.2 km, 165, 5992, 162, 2 mins, 14 mins, 3 mins, 143, 810, 161, 40.668896, 40.692406, 40.6937566, -73.932945, -73.99015, -73.9904735, Walk to Utica Avenue Subway Station, Subway towards Woodlawn, Walk to 198 Montague St, Brooklyn, NY 11201, USA, wbfwFxtfbMP@EdCA?e@xE, scfwFz_gbM?@cBpx@yAzr@MxF_@vQAv@Et@Gv@Ix@}AjMeG`f@yDpXE^I\\K`@KZQ`@QZUZ]^WRwHxF}a@hXaU`O{GnEmNbJm@^IHKFKFKJIFGJIJKJGLGNGLENEPGNENuGpTiIvXAHCHAHCHAJCHALCJALALCL?NCLAPCN, qvjwFlerbMaD]kAz@_@`@, 40.668759, 40.668896, 40.692406, -73.9311715, -73.932945, -73.99015, 10 m, 61 m, 94 m, 10, 61, 94, 1 min, 1 min, 2 mins, 7, 44, 92, 40.6686678, 40.6687011, 40.668896, -73.931179, -73.931848, -73.932945, Head <b>south</b> on <b>Utica Ave</b>, Turn <b>right</b>, Take entrance <span class="location">Utica Ave & Eastern Pkwy at SW corner</span>, wbfwFxtfbMP@, ebfwFztfbMEdC, mbfwF`yfbMe@xE, 40.668759, 40.6686678, 40.66871, -73.9311715, -73.931179, -73.9318472, WALKING, WALKING, WALKING, NA, turn-right, NA, 91 m, 48 m, 23 m, 91, 48, 23, 2 mins, 1 min, 1 min, 92, 50, 19, 40.693218, 40.6935955, 40.6937566, -73.989998, -73.9902971, -73.9904735, qvjwFlerbMaD], s{jwFndrbMkAz@, _~jwFjfrbM_@`@, 40.692406, 40.693218, 40.6935955, -73.99015, -73.989998, -73.9902971, WALKING, WALKING, WALKING, NA, Take exit <span class="location">Court St & Montague St at SE corner</span>, NA, WALKING, TRANSIT, WALKING, NA, 40.692406, NA, NA, -73.99015, NA, NA, Borough Hall, NA, NA, 2:53pm, NA, NA, America/New_York, NA, NA, 1537469580, NA, NA, 40.668896, NA, NA, -73.932945, NA, NA, Utica Avenue Subway Station, NA, NA, 2:41pm, NA, NA, America/New_York, NA, NA, 1537468860, NA, NA, Woodlawn, NA, MTA New York City Transit, 1 (718) 330-1234, http://www.mta.info/, NA, #00933c, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/us-ny-mta/4.png, NA, NA, Lexington Avenue Express, NA, NA, 4, NA, NA, #ffffff, NA, NA, http://web.mta.info/nyct/service/pdf/t4cur.pdf, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png, NA, NA, Subway, NA, NA, SUBWAY, NA, NA, 4, NA
    ##                                                                                                                   points
    ## 1 wbfwFxtfbMP@EdCg@xEkEhtBa@nSMlBgBdOeG`f@_EpYU~@]|@g@v@u@r@wHxF}a@hXaU`O{GnEePlKm@b@e@p@[~@mRho@Kf@Kn@Gx@In@aD]kAz@_@`@
    ##   summary
    ## 1        
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "wbfwFxtfbMP@EdCA?e@xE"                                                                                                                                                  
    ## [2] "scfwFz_gbM?@cBpx@yAzr@MxF_@vQAv@Et@Gv@Ix@}AjMeG`f@yDpXE^I\\K`@KZQ`@QZUZ]^WRwHxF}a@hXaU`O{GnEmNbJm@^IHKFKFKJIFGJIJKJGLGNGLENEPGNENuGpTiIvXAHCHAHCHAJCHALCJALALCL?NCLAPCN"
    ## [3] "qvjwFlerbMaD]kAz@_@`@"                                                                                                                                                  
    ## [1] 2
    ## [1] "TRANSIT"
    ## [1] "wbfwFxtfbMP@EdCA?e@xE"                                                                                                                                                  
    ## [2] "scfwFz_gbM?@cBpx@yAzr@MxF_@vQAv@Et@Gv@Ix@}AjMeG`f@yDpXE^I\\K`@KZQ`@QZUZ]^WRwHxF}a@hXaU`O{GnEmNbJm@^IHKFKFKJIFGJIJKJGLGNGLENEPGNENuGpTiIvXAHCHAHCHAJCHALCJALALCL?NCLAPCN"
    ## [3] "qvjwFlerbMaD]kAz@_@`@"                                                                                                                                                  
    ## [1] 3
    ## [1] "WALKING"
    ## [1] "wbfwFxtfbMP@EdCA?e@xE"                                                                                                                                                  
    ## [2] "scfwFz_gbM?@cBpx@yAzr@MxF_@vQAv@Et@Gv@Ix@}AjMeG`f@yDpXE^I\\K`@KZQ`@QZUZ]^WRwHxF}a@hXaU`O{GnEmNbJm@^IHKFKFKJIFGJIJKJGLGNGLENEPGNENuGpTiIvXAHCHAHCHAJCHALCJALALCL?NCLAPCN"
    ## [3] "qvjwFlerbMaD]kAz@_@`@"                                                                                                                                                  
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJ30CeDUlawokRSWYiXbLQNR8
    ## 2              OK ChIJLwg3xVJawokRNd0bt0F7Qr8
    ##                                                            types
    ## 1                               establishment, point_of_interest
    ## 2 bus_station, establishment, point_of_interest, transit_station
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             40.69376            -73.98397             40.68423
    ##   bounds.southwest.lng            copyrights
    ## 1            -73.99329 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   legs
    ## 1 1.6 km, 1584, 19 mins, 1159, Bergen St/Nevins St, Brooklyn, NY 11217, USA, 40.6842308, -73.9839732, Cadman Plaza West & Montague St, United States, 40.6937608, -73.9905206, 0.7 km, 0.9 km, 700, 884, 8 mins, 11 mins, 508, 651, 40.6878511, 40.6842308, -73.9932047, -73.9839732, Head <b>south</b> on <b>Court St</b> toward <b>Remsen St</b><div style="font-size:0.9em">Pass by Starbucks (on the left in 600&nbsp;m)</div>, Turn <b>left</b> onto <b>Bergen St</b>, __kwFvgrbMRBZ?PH`A\\JDd@Pv@\\JFjDrALFlBt@LDrBt@LDpBt@PF~Ap@PFLF~Al@VJLDzAj@DQ, aziwFnxrbMbB{FDOdBiGDIFObDkLDQ~CwKDQdD}K, 40.6937608, 40.6878511, -73.9905206, -73.9932047, WALKING, WALKING, NA, turn-left
    ##                                                       points
    ## 1 __kwFvgrbMn@BrAf@tB|@tHvCdGxB~EnBd@PzAj@DQhBkGjBsGpIeZjDoL
    ##                  summary
    ## 1 Court St and Bergen St
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "__kwFvgrbMRBZ?PH`A\\JDd@Pv@\\JFjDrALFlBt@LDrBt@LDpBt@PF~Ap@PFLF~Al@VJLDzAj@DQ"
    ## [2] "aziwFnxrbMbB{FDOdBiGDIFObDkLDQ~CwKDQdD}K"                                     
    ## [1] 2
    ## [1] "WALKING"
    ## [1] "__kwFvgrbMRBZ?PH`A\\JDd@Pv@\\JFjDrALFlBt@LDrBt@LDpBt@PF~Ap@PFLF~Al@VJLDzAj@DQ"
    ## [2] "aziwFnxrbMbB{FDOdBiGDIFObDkLDQ~CwKDQdD}K"                                     
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJQXbSFqZbwokRf-yZPR9xVxU
    ## 2              OK ChIJFcGUwlRawokRKUna3pQXa-o
    ##                                      types
    ## 1 establishment, health, point_of_interest
    ## 2                           street_address
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             40.67961             -73.9567              40.6733
    ##   bounds.southwest.lng            copyrights
    ## 1            -73.98457 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    legs
    ## 1 2.7 km, 2685, 9 mins, 560, 209 3rd Ave, Brooklyn, NY 11217, USA, 40.679612, -73.98457, 645 Park Pl, Brooklyn, NY 11216, USA, 40.6741687, -73.9567003, 0.1 km, 1.9 km, 0.2 km, 0.5 km, 100, 1944, 170, 471, 1 min, 6 mins, 1 min, 1 min, 23, 387, 62, 88, 40.6732995, 40.6790438, 40.677681, 40.679612, -73.957021, -73.9786739, -73.9795997, -73.98457, Head <b>south</b> on <b>Franklin Ave</b> toward <b>Sterling Pl</b>, Turn <b>right</b> onto <b>Sterling Pl</b>, Turn <b>left</b> onto <b>5th Ave</b>, Turn <b>right</b> onto <b>Degraw St</b>/<b>Robert PH Diaz Way</b>, qdgwFjtkbMlD~@, c_gwFjvkbMk@jEEZCLuAhLqBfPqCvTe@rDu@`G]hCcB~MGZEPK\\kBvGcErNi@`ByCnK, _chwFt}obM~BtAPL|BtA, ozgwFncpbMcEvNIXsDnM, 40.6741687, 40.6732995, 40.6790438, 40.677681, -73.9567003, -73.957021, -73.9786739, -73.9795997, BICYCLING, BICYCLING, BICYCLING, BICYCLING, NA, turn-right, turn-left, turn-right
    ##                                                   points     summary
    ## 1 qdgwFjtkbMlD~@k@jEIh@_K|x@_Ef[aIzXcEpNpCbB|BtAcEvN}DhN Sterling Pl
    ##                                                                                                           warnings
    ## 1 Bicycling directions are in beta. Use caution – This route may contain streets that aren't suited for bicycling.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "BICYCLING"
    ## [1] "qdgwFjtkbMlD~@"                                                      
    ## [2] "c_gwFjvkbMk@jEEZCLuAhLqBfPqCvTe@rDu@`G]hCcB~MGZEPK\\kBvGcErNi@`ByCnK"
    ## [3] "_chwFt}obM~BtAPL|BtA"                                                
    ## [4] "ozgwFncpbMcEvNIXsDnM"                                                
    ## [1] 2
    ## [1] "BICYCLING"
    ## [1] "qdgwFjtkbMlD~@"                                                      
    ## [2] "c_gwFjvkbMk@jEEZCLuAhLqBfPqCvTe@rDu@`G]hCcB~MGZEPK\\kBvGcErNi@`ByCnK"
    ## [3] "_chwFt}obM~BtAPL|BtA"                                                
    ## [4] "ozgwFncpbMcEvNIXsDnM"                                                
    ## [1] 3
    ## [1] "BICYCLING"
    ## [1] "qdgwFjtkbMlD~@"                                                      
    ## [2] "c_gwFjvkbMk@jEEZCLuAhLqBfPqCvTe@rDu@`G]hCcB~MGZEPK\\kBvGcErNi@`ByCnK"
    ## [3] "_chwFt}obM~BtAPL|BtA"                                                
    ## [4] "ozgwFncpbMcEvNIXsDnM"                                                
    ## [1] 4
    ## [1] "BICYCLING"
    ## [1] "qdgwFjtkbMlD~@"                                                      
    ## [2] "c_gwFjvkbMk@jEEZCLuAhLqBfPqCvTe@rDu@`G]hCcB~MGZEPK\\kBvGcErNi@`ByCnK"
    ## [3] "_chwFt}obM~BtAPL|BtA"                                                
    ## [4] "ozgwFncpbMcEvNIXsDnM"                                                
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJmzo3xFFawokRRYfb3ArbVmc
    ## 2              OK ChIJkR362K5bwokRK9tLi_3CZjg
    ##                                                               types
    ## 1 establishment, point_of_interest, subway_station, transit_station
    ## 2                                                    street_address
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             40.68668            -73.97457              40.6807
    ##   bounds.southwest.lng            copyrights
    ## 1            -73.99086 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             legs
    ## 1 1.6 km, 1586, 21 mins, 1237, 67 6th Ave, Brooklyn, NY 11217, USA, 40.6806989, -73.9745659, Bergen St, Brooklyn, NY 11201, USA, 40.6860656, -73.9908607, 81 m, 1.5 km, 81, 1505, 1 min, 20 mins, 62, 1175, 40.6866797, 40.6806989, -73.9904472, -73.9745659, Head <b>northeast</b> on <b>Smith St</b> toward <b>Bergen St</b>, Turn <b>right</b> onto <b>Bergen St</b>, }niwFzirbMyBqA, wriwFhgrbMbDmLFO|CyKDOdD}KFQpCsJDQRq@zB}H^oADQBGDQzDeNDOV}@zAoFBM@I@KBc@BW@O@I@MHq@, 40.6860656, 40.6866797, -73.9908607, -73.9904472, WALKING, WALKING, NA, turn-right
    ##                                     points   summary
    ## 1 }niwFzirbMyBqAbDmLdDiLdIsX`Kc^|BkIJqANyA Bergen St
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "}niwFzirbMyBqA"                                                                     
    ## [2] "wriwFhgrbMbDmLFO|CyKDOdD}KFQpCsJDQRq@zB}H^oADQBGDQzDeNDOV}@zAoFBM@I@KBc@BW@O@I@MHq@"
    ## [1] 2
    ## [1] "WALKING"
    ## [1] "}niwFzirbMyBqA"                                                                     
    ## [2] "wriwFhgrbMbDmLFO|CyKDOdD}KFQpCsJDQRq@zB}H^oADQBGDQzDeNDOV}@zAoFBM@I@KBc@BW@O@I@MHq@"
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJeTL_3q5bwokRnNvXieJC6ZE
    ## 2              OK ChIJQXbSFqZbwokRf-yZPR9xVxU
    ##                                      types
    ## 1         establishment, point_of_interest
    ## 2 establishment, health, point_of_interest
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             40.68083            -73.95667             40.67068
    ##   bounds.southwest.lng            copyrights
    ## 1            -73.97529 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               legs
    ## 1 2:44pm, America/New_York, 1537469083, 2:33pm, America/New_York, 1537468385, 2.5 km, 2459, 12 mins, 698, 645 Park Pl, Brooklyn, NY 11216, USA, 40.6741246, -73.9566673, 6th Ave &, Bergen St, Brooklyn, NY 11217, United States, 40.6806897, -73.9745184, 84 m, 2.0 km, 0.4 km, 84, 1963, 412, 1 min, 6 mins, 5 mins, 73, 330, 293, 40.680828, 40.670681, 40.6741246, -73.975098, -73.95813, -73.9566673, Walk to Bergen Street Station, Subway towards New Lots Av, Walk to 645 Park Pl, Brooklyn, NY 11216, USA, imhwFvcobMKz@ALAHANCVCXPBSe@, enhwFjgobM|a@iXvHyFVS\\_@T[P[Pa@J[Ja@H]D_@xDqXdGaf@, wnfwFh}kbMu@iAAJiBe@MEaDy@MEcDy@KE_Dy@, 40.6806897, 40.680828, 40.670681, -73.9745184, -73.975098, -73.95813, 65 m, 19 m, 65, 19, 1 min, 1 min, 55, 18, 40.6808164, 40.680828, -73.9752696, -73.975098, Head <b>west</b> on <b>Bergen St</b> toward <b>Flatbush Ave</b><div style="font-size:0.9em">Destination will be on the left</div>, Take entrance <span class="location">Flatbush Ave & Bergen St at SW corner</span>, imhwFvcobMKz@ALAHANCVCX, qmhwFphobMSe@, 40.6806897, 40.680729, -73.9745184, -73.9752854, WALKING, WALKING, 43 m, 0.4 km, 43, 369, 1 min, 4 mins, 41, 252, 40.6709479, 40.6741246, -73.9577555, -73.9566673, Take exit <span class="location">Franklin Ave & Eastern Pkwy at NE corner</span>, Head <b>north</b> on <b>Franklin Ave</b> toward <b>Lincoln Pl</b>, wnfwFh}kbMu@iA, opfwFj{kbMiBe@MEaDy@MEcDy@KE_Dy@, 40.670681, 40.6709623, -73.95813, -73.9578221, WALKING, WALKING, WALKING, TRANSIT, WALKING, NA, 40.670681, NA, NA, -73.95813, NA, NA, Franklin Av, NA, NA, 2:39pm, NA, NA, America/New_York, NA, NA, 1537468789, NA, NA, 40.680828, NA, NA, -73.975098, NA, NA, Bergen Street Station, NA, NA, 2:34pm, NA, NA, America/New_York, NA, NA, 1537468459, NA, NA, New Lots Av, NA, MTA New York City Transit, 1 (718) 330-1234, http://www.mta.info/, NA, #e53935, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/us-ny-mta/3.png, NA, NA, 7 Avenue Express, NA, NA, 3, NA, NA, http://web.mta.info/nyct/service/pdf/t3cur.pdf, NA, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png, NA, NA, Subway, NA, NA, SUBWAY, NA, NA, 3, NA
    ##                                                                         points
    ## 1 imhwFvcobMQbBGp@PBSe@|a@iXvHyFt@s@f@w@\\}@T_A~DqYdGaf@u@iAAJiBe@oD_AqD_AkD_A
    ##   summary
    ## 1        
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "imhwFvcobMKz@ALAHANCVCXPBSe@"                       
    ## [2] "enhwFjgobM|a@iXvHyFVS\\_@T[P[Pa@J[Ja@H]D_@xDqXdGaf@"
    ## [3] "wnfwFh}kbMu@iAAJiBe@MEaDy@MEcDy@KE_Dy@"             
    ## [1] 2
    ## [1] "TRANSIT"
    ## [1] "imhwFvcobMKz@ALAHANCVCXPBSe@"                       
    ## [2] "enhwFjgobM|a@iXvHyFVS\\_@T[P[Pa@J[Ja@H]D_@xDqXdGaf@"
    ## [3] "wnfwFh}kbMu@iAAJiBe@MEaDy@MEcDy@KE_Dy@"             
    ## [1] 3
    ## [1] "WALKING"
    ## [1] "imhwFvcobMKz@ALAHANCVCXPBSe@"                       
    ## [2] "enhwFjgobM|a@iXvHyFVS\\_@T[P[Pa@J[Ja@H]D_@xDqXdGaf@"
    ## [3] "wnfwFh}kbMu@iAAJiBe@MEaDy@MEcDy@KE_Dy@"             
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJke8-PXVbwokRUYpPjrGVyao
    ## 2              OK ChIJuwazLZ9ZwokRoDhp6p5_XCo
    ##                                                               types
    ## 1 establishment, point_of_interest, subway_station, transit_station
    ## 2                            establishment, park, point_of_interest
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             40.73475            -73.95813             40.67068
    ##   bounds.southwest.lng            copyrights
    ## 1            -74.01466 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        legs
    ## 1 2:55pm, America/New_York, 1537469754, 2:32pm, America/New_York, 1537468332, 10.7 km, 10665, 24 mins, 1422, Union Square Park, 201 Park Ave S, New York, NY 10003, USA, 40.7347511, -73.990714, Franklin Av, Brooklyn, NY 11225, USA, 40.670681, -73.95813, 10.6 km, 80 m, 10585, 80, 23 mins, 1 min, 1350, 71, 40.734673, 40.7347511, -73.989952, -73.990714, Subway towards Eastchester - Dyre Av, Walk to Union Square Park, 201 Park Ave S, New York, NY 10003, USA, wnfwFh}kbMeG`f@yDpXE^I\\K`@KZQ`@QZUZ]^WRwHxF}a@hXaU`O{GnEmNbJm@^IHKFKFKJIFGJIJKJGLGNGLENEPGNENuGpTiIvXAHCHAHCHAJCHALCJALALCL?NCLAPCNsCx]iClWGj@cAdG]tBe@xCc@vCa@|Bk@lCo@xBk@tBk@rBq@vAo]rf@uE|GSZYXWRYPYN[JYH[D[@]?_@C]Ea@I_@K_@MiCgAA?m@[WOYQcM{JqPuMiDsCCCCCAEEECCAECEACCEAECEAGAEAGAEwCaRCKCIAIAKEICICGCIEGCEEGEGEEEGEEeBcByCkCIEGEGEGEICICGEGAICIAICKAI?I?K?aDUE?GAE?EAEAEAGAECEACCGCCCEAEEECqQuOyFcF_LaJACAAAACAAAAAAACAAAA?AACCA?CAAAAACAAACAC?AAAACAA?C?AAAAAAC?yC{@A?GCEACAECCACAECCCEACCCCECCCECaMoJwGoEyLwJEEIGEGGGGGGGGIEGEGGIEIGIEIGICKGMIKIKKIIIKIKIKGMGMEMEOEMCOCQAkNwBOAK?M?OAM?O?M@Q?O@O@Q@O@QBQBQB, u~rwFddrbMZbAEEY|@KZ, 40.670681, 40.734673, -73.95813, -73.989952, 40.734673, NA, -73.989952, NA, 14 Street - Union Square Station, NA, 2:54pm, NA, America/New_York, NA, 1537469682, NA, 40.670681, NA, -73.95813, NA, Franklin Av, NA, 2:32pm, NA, America/New_York, NA, 1537468332, NA, Eastchester - Dyre Av, NA, MTA New York City Transit, 1 (718) 330-1234, http://www.mta.info/, #00933c, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/us-ny-mta/5.png, NA, Lexington Avenue Express, NA, 5, NA, #ffffff, NA, http://web.mta.info/nyct/service/pdf/t5cur.pdf, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png, NA, Subway, NA, SUBWAY, NA, 8, NA, TRANSIT, WALKING, 32 m, 48 m, 32, 48, 1 min, 1 min, 37, 34, 40.7345253, 40.7347511, -73.9902879, -73.990714, Take exit <span class="location">4th Ave & 14th St at SW corner</span>, Head <b>northwest</b> on <b>E 14th St</b> toward <b>Broadway</b>, u~rwFddrbMZbA, _~rwFbfrbMY|@KZ, 40.734673, 40.7345579, -73.989952, -73.9902636, WALKING, WALKING
    ##                                                                                                                                                                                                                                                                                                          points
    ## 1 wnfwFh}kbMeG`f@_EpYU~@]|@g@v@u@r@wHxF}a@hXaU`OiWrPoAx@URQVSXO\\Y`AeR|n@Kh@It@I|@CNsCx]iClWkApHcAnGeAtGk@lCo@xBwAhFq@vAo]rf@iFxHq@l@s@`@u@Tw@F}@C_AO_AYyDcBq@a@cM{JqPuMmDwCOSKUIY_D{RMi@Qc@U[qBqBsD}Cc@Se@Kk@AuDWYGWMUOkYyVaLeJIGSMWMUIiDaAQIg@]aMoJwGoE_M}J_@_@w@iA]o@k@i@WQ[M]K]G}NyB[A{@A_ADeAJQBZbAEEY|@KZ
    ##   summary
    ## 1        
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "TRANSIT"
    ## [1] "wnfwFh}kbMeG`f@yDpXE^I\\K`@KZQ`@QZUZ]^WRwHxF}a@hXaU`O{GnEmNbJm@^IHKFKFKJIFGJIJKJGLGNGLENEPGNENuGpTiIvXAHCHAHCHAJCHALCJALALCL?NCLAPCNsCx]iClWGj@cAdG]tBe@xCc@vCa@|Bk@lCo@xBk@tBk@rBq@vAo]rf@uE|GSZYXWRYPYN[JYH[D[@]?_@C]Ea@I_@K_@MiCgAA?m@[WOYQcM{JqPuMiDsCCCCCAEEECCAECEACCEAECEAGAEAGAEwCaRCKCIAIAKEICICGCIEGCEEGEGEEEGEEeBcByCkCIEGEGEGEICICGEGAICIAICKAI?I?K?aDUE?GAE?EAEAEAGAECEACCGCCCEAEEECqQuOyFcF_LaJACAAAACAAAAAAACAAAA?AACCA?CAAAAACAAACAC?AAAACAA?C?AAAAAAC?yC{@A?GCEACAECCACAECCCEACCCCECCCECaMoJwGoEyLwJEEIGEGGGGGGGGIEGEGGIEIGIEIGICKGMIKIKKIIIKIKIKGMGMEMEOEMCOCQAkNwBOAK?M?OAM?O?M@Q?O@O@Q@O@QBQBQB"
    ## [2] "u~rwFddrbMZbAEEY|@KZ"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    ## [1] 2
    ## [1] "WALKING"
    ## [1] "wnfwFh}kbMeG`f@yDpXE^I\\K`@KZQ`@QZUZ]^WRwHxF}a@hXaU`O{GnEmNbJm@^IHKFKFKJIFGJIJKJGLGNGLENEPGNENuGpTiIvXAHCHAHCHAJCHALCJALALCL?NCLAPCNsCx]iClWGj@cAdG]tBe@xCc@vCa@|Bk@lCo@xBk@tBk@rBq@vAo]rf@uE|GSZYXWRYPYN[JYH[D[@]?_@C]Ea@I_@K_@MiCgAA?m@[WOYQcM{JqPuMiDsCCCCCAEEECCAECEACCEAECEAGAEAGAEwCaRCKCIAIAKEICICGCIEGCEEGEGEEEGEEeBcByCkCIEGEGEGEICICGEGAICIAICKAI?I?K?aDUE?GAE?EAEAEAGAECEACCGCCCEAEEECqQuOyFcF_LaJACAAAACAAAAAAACAAAA?AACCA?CAAAAACAAACAC?AAAACAA?C?AAAAAAC?yC{@A?GCEACAECCACAECCCEACCCCECCCECaMoJwGoEyLwJEEIGEGGGGGGGGIEGEGGIEIGIEIGICKGMIKIKKIIIKIKIKGMGMEMEOEMCOCQAkNwBOAK?M?OAM?O?M@Q?O@O@Q@O@QBQBQB"
    ## [2] "u~rwFddrbMZbAEEY|@KZ"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    ## $geocoded_waypoints
    ##   geocoder_status                    place_id
    ## 1              OK ChIJuwazLZ9ZwokRoDhp6p5_XCo
    ## 2              OK ChIJke8-PXVbwokRUYpPjrGVyao
    ##                                                               types
    ## 1                            establishment, park, point_of_interest
    ## 2 establishment, point_of_interest, subway_station, transit_station
    ## 
    ## $routes
    ##   bounds.northeast.lat bounds.northeast.lng bounds.southwest.lat
    ## 1             40.73477            -73.95813             40.67068
    ##   bounds.southwest.lng            copyrights
    ## 1            -74.01466 Map data ©2018 Google
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        legs
    ## 1 2:52pm, America/New_York, 1537469546, 2:27pm, America/New_York, 1537468064, 10.7 km, 10665, 25 mins, 1482, Franklin Av, Brooklyn, NY 11225, USA, 40.670681, -73.95813, Union Square Park, 201 Park Ave S, New York, NY 10003, USA, 40.7347692, -73.9907561, 80 m, 10.6 km, 80, 10585, 1 min, 24 mins, 71, 1410, 40.734673, 40.670681, -73.989952, -73.95813, Walk to 14 Street - Union Square Station, Subway towards Flatbush Av - Brooklyn College, i_swFfirbMNe@X}@DD[cA, u~rwFddrbMPCPCPCNAPANANAP?LAN?L?N@L?J?N@jNvBP@NBLBNDLDLDLFJFJHJHHHJHHJHJFLBJFHDHFHDHFHDFDFFHFFFFFFDFHFDDxLvJvGnE`MnJDBBBDBBBBBD@BBDBB@B@DBB@D@FB@?xCz@B?@@@@@@B?@?B@@@@@B?B@@@B@@@@@B@@?BB@@@?@@B@@@@@@@B@@@@@@B~K`JxFbFpQtODBDDD@BBFBBBD@DBF@D@D@D@D?F@D?`DTJ?H?H?J@HBH@HBF@FDHBHBFDFDFDHDxCjCdBbBDDDFDDDFDFBDDFBHBFBHDH@J@HBHBJvC`R@D@F@D@FBD@DBD@BBD@DBBDD@DBBBBhDrCpPtMbMzJXPVNl@Z@?hCfA^L^J`@H\\D^B\\?ZAZEXIZKXOXQVSXYR[tE}Gn]sf@p@wAj@sBj@uBn@yBj@mC`@}Bb@wCd@yC\\uBbAeGFk@hCmWrCy]BO@QBM?OBM@M@MBK@MBI@KBI@IBI@IhIwXtGqTDOFODQDOFMFOFMJKHKFKHGJKJGJGHIl@_@lNcJzGoE`UaO|a@iXvHyFVS\\_@T[P[Pa@J[Ja@H]D_@xDqXdGaf@, 40.7347692, 40.734673, -73.9907561, -73.989952, 48 m, 32 m, 48, 32, 1 min, 1 min, 34, 37, 40.7345579, 40.734673, -73.9902636, -73.989952, Head <b>southeast</b> on <b>E 14th St</b><div style="font-size:0.9em">Destination will be on the right</div>, Take entrance <span class="location">4th Ave & 14th St at SW corner</span>, i_swFfirbMNe@X}@, y}rwFhfrbM[cA, 40.7347692, 40.7345253, -73.9907561, -73.9902879, WALKING, WALKING, WALKING, TRANSIT, NA, 40.670681, NA, -73.95813, NA, Franklin Av, NA, 2:52pm, NA, America/New_York, NA, 1537469546, NA, 40.734673, NA, -73.989952, NA, 14 Street - Union Square Station, NA, 2:28pm, NA, America/New_York, NA, 1537468136, NA, Flatbush Av - Brooklyn College, MTA New York City Transit, 1 (718) 330-1234, http://www.mta.info/, NA, #00933c, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/us-ny-mta/5.png, NA, Lexington Avenue Express, NA, 5, NA, #ffffff, NA, http://web.mta.info/nyct/service/pdf/t5cur.pdf, NA, //maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png, NA, Subway, NA, SUBWAY, NA, 8
    ##                                                                                                                                                                                                                                                                                                     points
    ## 1 i_swFfirbMh@cBDD[cAb@GbAI~@Cv@@zNxB`@Dx@Tp@b@h@j@Xl@Zd@\\`@\\\\xLvJvGnEfMrJPNRJRHfD~@RJVJRNHH~K`JxFbFvQxOVNVJVDzDVh@Db@Lb@RjDvCvBvBT\\Pd@Jj@|CtRJXZf@zUhR|MlKdAj@jDtA`AT|@Hx@At@Ot@[p@e@l@u@dd@qo@p@wAj@sBzAoFj@mC`@}BhAqH`B{JpCyXxC{^Hy@Jq@Ji@fRco@Z_AN]TWPSVSbAq@hWsP~w@kh@nImGr@{@b@}@V}@N}@xDqXdGaf@
    ##   summary
    ## 1        
    ##                                                                                                    warnings
    ## 1 Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.
    ##   waypoint_order
    ## 1           NULL
    ## 
    ## $status
    ## [1] "OK"
    ## 
    ## [1] 1
    ## [1] "WALKING"
    ## [1] "i_swFfirbMNe@X}@DD[cA"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    ## [2] "u~rwFddrbMPCPCPCNAPANANAP?LAN?L?N@L?J?N@jNvBP@NBLBNDLDLDLFJFJHJHHHJHHJHJFLBJFHDHFHDHFHDFDFFHFFFFFFDFHFDDxLvJvGnE`MnJDBBBDBBBBBD@BBDBB@B@DBB@D@FB@?xCz@B?@@@@@@B?@?B@@@@@B?B@@@B@@@@@B@@?BB@@@?@@B@@@@@@@B@@@@@@B~K`JxFbFpQtODBDDD@BBFBBBD@DBF@D@D@D@D?F@D?`DTJ?H?H?J@HBH@HBF@FDHBHBFDFDFDHDxCjCdBbBDDDFDDDFDFBDDFBHBFBHDH@J@HBHBJvC`R@D@F@D@FBD@DBD@BBD@DBBDD@DBBBBhDrCpPtMbMzJXPVNl@Z@?hCfA^L^J`@H\\D^B\\?ZAZEXIZKXOXQVSXYR[tE}Gn]sf@p@wAj@sBj@uBn@yBj@mC`@}Bb@wCd@yC\\uBbAeGFk@hCmWrCy]BO@QBM?OBM@M@MBK@MBI@KBI@IBI@IhIwXtGqTDOFODQDOFMFOFMJKHKFKHGJKJGJGHIl@_@lNcJzGoE`UaO|a@iXvHyFVS\\_@T[P[Pa@J[Ja@H]D_@xDqXdGaf@"
    ## [1] 2
    ## [1] "TRANSIT"
    ## [1] "i_swFfirbMNe@X}@DD[cA"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    ## [2] "u~rwFddrbMPCPCPCNAPANANAP?LAN?L?N@L?J?N@jNvBP@NBLBNDLDLDLFJFJHJHHHJHHJHJFLBJFHDHFHDHFHDFDFFHFFFFFFDFHFDDxLvJvGnE`MnJDBBBDBBBBBD@BBDBB@B@DBB@D@FB@?xCz@B?@@@@@@B?@?B@@@@@B?B@@@B@@@@@B@@?BB@@@?@@B@@@@@@@B@@@@@@B~K`JxFbFpQtODBDDD@BBFBBBD@DBF@D@D@D@D?F@D?`DTJ?H?H?J@HBH@HBF@FDHBHBFDFDFDHDxCjCdBbBDDDFDDDFDFBDDFBHBFBHDH@J@HBHBJvC`R@D@F@D@FBD@DBD@BBD@DBBDD@DBBBBhDrCpPtMbMzJXPVNl@Z@?hCfA^L^J`@H\\D^B\\?ZAZEXIZKXOXQVSXYR[tE}Gn]sf@p@wAj@sBj@uBn@yBj@mC`@}Bb@wCd@yC\\uBbAeGFk@hCmWrCy]BO@QBM?OBM@M@MBK@MBI@KBI@IBI@IhIwXtGqTDOFODQDOFMFOFMJKHKFKHGJKJGJGHIl@_@lNcJzGoE`UaO|a@iXvHyFVS\\_@T[P[Pa@J[Ja@H]D_@xDqXdGaf@"

#### Plot your routes

``` r
# Plot the lines
myplot = ggplot()
for(i in 8:length(routeCoords)){
  for(j in 1:length(routeCoords[[i]]$coords)){
    myplot <- myplot + geom_path(data=routeCoords[[i]]$coords[[j]], aes(lon,lat) )
  }
}
print(myplot)
```

![](README_files/figure-markdown_github/unnamed-chunk-31-1.png)

#### Plot your routes on a map

``` r
# show on map
mymap = ggplot( ) + geom_sf( data=nycBoroughs, inherit.aes = FALSE, aes(fill=BoroName))
for(i in 8:length(routeCoords)){
  for(j in 1:length(routeCoords[[i]]$coords)){
    mymap <- mymap + geom_path(data=routeCoords[[i]]$coords[[j]], aes(lon,lat))
  }
}
print(mymap)
```

![](README_files/figure-markdown_github/unnamed-chunk-32-1.png)
