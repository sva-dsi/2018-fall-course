# Setup

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

##########################
# load libraries
##########################
# tidyverse for all those helper functions
require(tidyverse)
# require lubridate for handle times
require(lubridate)
# ggplot for plotting
require(ggplot2)
# ggmap to plot on tiled maps easily
require(ggmap)
# sf for working with spatial data
require(sf)
# plyr for data handling functions
require(plyr)
# googleway for access to the google api
library(googleway)



###################
# setup google api keys
# https://console.cloud.google.com/
# go through with setting up your api keys
# note: in order to go above the 1 request quota, you need to enter in billing info
###################

# not specifying the api will add the key as your 'default'
# TODO: MAKE SURE TO UPDATE THIS TO YOUR OWN API KEY OR ELSE
# YOU WONT BE ABLE TO MAKE QUERIES TO THE GOOGLE API
# Here's my public API KEY
key = "AIzaSyD0Dod_SussEiR3IaA90oLiviVIgF9uMW0"
# set your key
set_key(key = key)
# check your api key
google_keys()



####################################################
# Acquire
## read in your data
####################################################
myDataPath = "/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/examples/r-examples/01-one-week-of-mobility/Dear Data Mobility Diary - corrected (Responses) - Form Responses 1 - street_corners.csv"
myData = read.csv(myDataPath, header=TRUE)
# print the top 6 rows
head(myData)

# we're going to need this for later
nycBoroughs = read_sf("https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson")


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



####################################################
# Calculate trip duration
# Since we are using datetime objects we can simply
# just subtract Trip_End from Trip_Start
####################################################

# let's calculate the trip duration by subtracting the Trip_End from Trip_Start
# and storing it to our Trip_Duration
myData$Trip_Duration = myData$Trip_End - myData$Trip_Start



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


####################################################
# Represent I
## have a look at your trip duration data
####################################################

# Plot your trip durations based on start and end times
ggplot(data=myData) +
  geom_segment(aes(x=Trip_Start,
                   y=0,
                   xend=Trip_End,
                   yend=0,
                   color=Transport_Mode, size=5))

# use the curve geometry to make arcs rather than straight lines
ggplot(data=myData) +
  geom_curve(aes(x=Trip_Start,
                 y=0,
                 xend=Trip_End,
                 yend=0,
                 color=Transport_Mode),
             curvature= -1)

# Break down your mobility by day of the week
ggplot(data=myData) +
  geom_bar(aes(x=Date,
               y=Trip_Duration,
               fill=Transport_Mode),
           stat="identity")
# You can use facet_wrap to create small multiples
ggplot(data=myData) +
  geom_bar(aes( x=Transport_Mode,
                y=Trip_Duration),
           stat="identity") +
  facet_wrap(~Date)

# you can explore alternative representations like a polar chart
ggplot(data=myData) +
  geom_bar(aes(x=Date,
               y=Trip_Duration,
               fill=Transport_Mode),
           stat="identity") +
  coord_polar()

# You can use facet_wrap to create small multiples
ggplot(data=myData) +
  geom_bar(aes( x=Transport_Mode,
                y=Trip_Duration),
           stat="identity") +
  coord_polar() +
  facet_wrap(~Date)


# TODO: create a summary of the time you spent for each transit mode this week



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

# notice if we now put a 3 we get the 3rd starting streetCorner:
print(as.character(myData[3,]$Starting_StreetCorner))
# notice if we now put a 3:6 we get the 3rd through the 6th starting streetCorner:
print(as.character(myData[3:6,]$Starting_StreetCorner))

####################################################
# QUICK INTERLUDE: A note on for loops ^^^^^^^^^
####################################################


####################################################
# Acquire
# Geocode locations: Get the lat/lon coordinates
# if your "Starting_From" and "Ending_At" columns
# aren't very useful or purposefully obscure
# you will have to go through your data and
# add a new set of columns like "Starting_StreetCorner"
# and "Ending_StringCorner" as a way to better automate
# the retrieval of the lat/lon coordinates
####################################################

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

# plot an "origin-destination" matrix of your data
ggplot(data=myData[ which(myData$Date > as.POSIXct("2018-09-15", tz="America/New_York")),]) +
  geom_segment(aes( x=Google_Longitude_Start,
                    y=Google_Latitude_Start,
                    xend=Google_Longitude_End,
                    yend=Google_Latitude_End))


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
myGreetingFunction("Bonjour", "SVA")
myGreetingFunction("Hello", "DSI")

# see how we can also now shove in lists of data to output our greetings
myGreetingFunction( c("hello", "goodbye", "adieu"), c("joey", "sva", "dsi") )


# how about a function that makes random line plots?
randomPlotter = function(){
  xs <- runif(100, 10, 100)
  ys <- runif(100, 10, 100)

  return(
    ggplot() + geom_line( aes(x=xs, y=ys) )
  )
}
print(randomPlotter())





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
                                       departure_time=myData[i,]$Trip_Start,
                                       key=key)

  # store the results to the respective list in the travelDistances dataset
  travelDistances$origin = c(travelDistances$origin, calculatedDistance$origin_addresses)
  travelDistances$destination = c(travelDistances$destination, calculatedDistance$destination_addresses)

  print(calculatedDistance)
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

# Store the data from travelDistances to to myData
myData$origin_address =  travelDistances$origin
myData$destination_address =  travelDistances$destination
myData$distance_meters =  travelDistances$distance_meters
myData$duration_seconds =  travelDistances$duration_seconds

# print a summary of your travel distance
summary(myData$distance_meters)

# print a summary of your travel time
summary(myData$duration_seconds)


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

#######
# MY TOTAL CO2 EMISSIONS WERE
# 3954.394 GRAMS
#######
# use na.rm=TRUE to remove the NAs from the sum or else it won't run
sum(myData$co2_emissions, na.rm=TRUE)




####################################################
# OD Matrix
# show co2 impact of trips
####################################################

# map values to another range
linMap <- function(x, from, to){
  return( (x - min(x, na.rm=T)) / max(x - min(x, na.rm=T), na.rm=T) * (to - from) + from )
}

# plot Origin Desination Arcs
ggplot(data= myData[8:16,]) +
  geom_curve(aes(x=Google_Longitude_Start,
                   y=Google_Latitude_Start,
                   xend=Google_Longitude_End,
                   yend=Google_Latitude_End,col=as.character(Date) ),
               size= linMap(myData[8:16,]$co2_emissions, 1, 4) )


# plot O-D Arcs on a map
ggplot() +
  geom_sf( data=nycBoroughs, inherit.aes = FALSE) +
  geom_curve(data=myData[8:16,], aes(x=Longitude_Start,
                 y=Latitude_Start,
                 xend=Longitude_End,
                 yend=Latitude_End,col=as.character(Date) ),
             size= linMap(myData[8:16,]$co2_emissions, 1, 4) ) +
  coord_sf(ylim=c(40.6,40.8))



########################
# Write your Data out to a file to save
########################
outputDataFileName = "/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/examples/r-examples/01-one-week-of-mobility/mobility-data-processed.csv"
write.csv(myData, file = outputDataFileName)



#########################
# CHALLENGE!
# We used a super rough estimate above that assumed our trips were more
# or less unimodal, or using only 1 mode of transit
# here we can stratify our travel into steps like walking + subway + walking
# use the google routing engine to route between
# locations to approximate how you traveled from
# A to B
#########################

# test to google_directions function
selectedRow = 9
test = google_directions(paste(myData[selectedRow,]$Google_Latitude_Start, myData[selectedRow,]$Google_Longitude_Start, sep=", "),
                         paste(myData[selectedRow,]$Google_Latitude_End,myData[selectedRow,]$Google_Longitude_End, sep=", "),
                         mode = myData[selectedRow,]$google_transit_mode,
                         key = key,
                         departure_time=myData[selectedRow,]$Trip_Start,
                         simplify = TRUE)

# get the steps
# stratify the trip based on
test
test$routes[3]$legs[[1]]$steps[[1]]$travel_mode
length(test$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]])
test$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]]
test.points1 = decode_pl(test$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]][1])
test.points2 = decode_pl(test$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]][2])
test.points3 = decode_pl(test$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]][3])
test.points4 = decode_pl(test$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]][4])
test.points5 = decode_pl(test$routes[3]$legs[[1]]$steps[[1]]$polyline[[1]][5])

ggplot() +
  geom_line(data=test.points1, aes(lon, lat) ) +
  geom_line(data=test.points2, aes(lon, lat) ) +
  geom_line(data=test.points3, aes(lon, lat) ) +
  geom_line(data=test.points4, aes(lon, lat) ) +
  geom_line(data=test.points5, aes(lon, lat) )

test.points = decode_pl(test$routes$overview_polyline$points)
ggplot(data=test.points) + geom_line(aes(lon, lat))

# Now! get the steps for each
# for each trip,
# get the steps it takes
# store the coordinates for each step of the trip

routeCoords = list()
for(i in 1:length(myData$Latitude_Start) ){
  # use your coordinates to make the routing
  # use paste to create a "lat, lon" character string
  startingCoords = paste(myData[i,]$Latitude_Start, myData[i,]$Longitude_Start, sep=", ")
  endingCoords = paste(myData[i,]$Latitude_End, myData[i,]$Longitude_End, sep=", ")

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




# Plot the lines
myplot = ggplot()
for(i in 8:length(routeCoords)){
  for(j in 1:length(routeCoords[[i]]$coords)){
    myplot <- myplot + geom_path(data=routeCoords[[i]]$coords[[j]], aes(lon,lat) )
  }
}
print(myplot)

# show on map
mymap = ggplot( ) + geom_sf( data=nycBoroughs, inherit.aes = FALSE, aes(fill=BoroName))
for(i in 16:length(routeCoords)){
  for(j in 1:length(routeCoords[[i]]$coords)){
    mymap <- mymap + geom_path(data=routeCoords[[i]]$coords[[j]], aes(lon,lat))
  }
}
print(mymap)


#################################################
# debug this!
#################################################
# Now! get the steps for each
# for each trip,
# get the steps it takes
# store the coordinates for each step of the trip

routeCoords2 = list()
for(i in 1:length(myData$Latitude_Start) ){
  # use your coordinates to make the routing
  # use paste to create a "lat, lon" character string
  startingCoords = paste(myData[i,]$Latitude_Start, myData[i,]$Longitude_Start, sep=", ")
  endingCoords = paste(myData[i,]$Latitude_End, myData[i,]$Longitude_End, sep=", ")

  # retrieve the route
  route = google_directions(startingCoords,
                            endingCoords,
                            myData[i,]$google_transit_mode,
                            key = key,
                            departure_time="now",
                            simplify = TRUE)

  if(route$status != "ZERO_RESULTS"){
      routePts = decode_pl(route$routes$overview_polyline$points)
  } else{
    routePts = data.frame( lon= c(0), lat=c(0))
  }

  routeCoords2[[i]] = routePts
}

# plot the points without a map
myplot = ggplot()
for(i in 8:length(routeCoords2)){
  myplot <- myplot + geom_path(data=routeCoords2[[i]], aes(lon,lat) )
}
print(myplot)

# show on map
mymap = ggplot( ) + geom_sf( data=nycBoroughs, inherit.aes = FALSE) + coord_sf(ylim=c(40.6,40.8))
for(i in 8:length(routeCoords2)){
  mymap <- mymap + geom_path(data=routeCoords2[[i]], aes(x=lon,
                                 y=lat,
                                 col="red"))
}

print(mymap)
