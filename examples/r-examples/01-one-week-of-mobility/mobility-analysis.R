#install.packages("devtools")
# devtools::install_github("dkahle/ggmap")
##########################
# load libraries
##########################
# tidyverse for all those helper functions
require(tidyverse)
# require lubridate for handle times
require(lubridate)
# ggplot for plotting
require(ggplot2)
# ggmap for accesss to google maps api
require(ggmap)

###################
# setup google api keys
# https://console.cloud.google.com/
# 
###################
# install.packages("googleway")
library(googleway)
## not specifying the api will add the key as your 'default'
key <- "AIzaSyBUDg2Djt93ZONs8f7lI_QBUSFpIfgHZy4"
set_key(key = key)
google_keys()

##########################
# Acquire
## read in your data
##########################
myData = read.csv("/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/examples/r-examples/01-one-week-of-mobility/Dear Data Mobility Diary - corrected (Responses) - Form Responses 1 - street_corners.csv", header=TRUE)
# print the top 6 rows
head(myData)

##########################
# Parse
## Convert your date & time "factor" types to date/time objects
##########################
# this is a good time to go to your environments tab and checkout 
# what data types R has classified your data as
NYTimeZone = "America/New_York"

# combine the dates with the start and end-times
myData$Trip_Start = paste(myData$Date, myData$Trip_Start)
myData$Trip_End = paste(myData$Date, myData$Trip_End)

# we can use the handy lubridate package to handle our dates/times
myData$Timestamp = mdy_hms(myData$Timestamp, tz = NYTimeZone)
myData$Date = mdy(myData$Date, tz = NYTimeZone)
myData$Trip_Start = mdy_hms(myData$Trip_Start, tz = NYTimeZone)
myData$Trip_End = mdy_hms(myData$Trip_End, tz = NYTimeZone)


#####
# Note: the lubridate package allowed us to roll up
# these lines of code below, to those 5 lines above
#####
# TimeStampFormat = '%m/%d/%Y %H:%M:%S'
# DateFormat = '%m/%d/%Y'
# TripTimeFormat = '%H:%M:%S %p'
# NYTimeZone = "America/New_York"
# myData$Timestamp = as.POSIXct(myData$Timestamp, 
#                               tz=NYTimeZone, 
#                               format=TimeStampFormat)
# myData$Date = as.POSIXct(myData$Date, 
#                          tz=NYTimeZone, 
#                          format=DateFormat)
# myData$Trip_Start = as.POSIXct(myData$Trip_Start, 
#                                tz=NYTimeZone, 
#                                format=TripTimeFormat)
# myData$Trip_End = as.POSIXct(myData$Trip_End, 
#                              tz=NYTimeZone, 
#                              format=TripTimeFormat)

# let's calculate the trip duration by subtracting the Trip_End from Trip_Start
# and storing it to our Trip_Duration
myData$Trip_Duration = myData$Trip_End - myData$Trip_Start 

# sort your data based on the trip end
myData = myData[order(myData$Trip_End),  ]


##########################
# Represent
## have a look at your trip duration data
##########################

# Plot your trip durations based on start and end times
ggplot(data=myData) + 
  geom_segment(aes(x=Trip_Start, 
                   y=0, 
                   xend=Trip_End, 
                   yend=0, 
                   color=Transport_Mode, size=5 ))
# use the curve geometry to make arcs rather than straight lines
ggplot(data=myData) + 
  geom_curve(aes(x=Trip_Start, 
                   y=0, 
                   xend=Trip_End, 
                   yend=0, 
                   color=Transport_Mode), 
             curvature= -1)

# Break down your mobility by day of the week
ggplot(data=myData) + geom_bar(aes(x=Date, y=Trip_Duration, fill=Transport_Mode), stat="identity")
# you can explore alternative representations like a polar chart
ggplot(data=myData) + geom_bar(aes(x=Date, y=Trip_Duration, fill=Transport_Mode), stat="identity") + coord_polar()

##########################
# Filter
## Convert your date & time "factor" types to date/time objects
##########################

##########################
# Mine
## Convert your date & time "factor" types to date/time objects
##########################

# create a summary of the time you spent for each transit mode this week
# TODO
#
#



##########################
# Parse
## Geocode locations: Get the lat/lon coordinates 
##########################
# try using the geocode() function with a few of your locations... 
# do you have enough information to return meaninful results?
# if not, you might consider creating a copy of your survey data and 
# adding in specific addresses or street corners that will allow you
# to better use the automated geocoding services
# try out the following below to get an idea...

# for example if I try to run the following, I get no results
geocode("Lercherstrasse & Johanesstrasse, Stuttgart", source="dsk")
# but if I run this with the german "und" for "and", I get the results I was expecting
geocode("Lercherstrasse and Johanesstrasse, Stuttgart, Germany",source = "dsk")

# colloquial names vs. addresses
geocode("Stuttgart Hauptbahnhof, Stuttgart, Germany", source = "dsk")
# address
geocode("Arnulf-Klett-Platz 2, 70173 Stuttgart, Germany", source = "dsk")


# notice that the geocoding for colloquial names isn't so great
geocode("Franklin Ave Subway Station, Brooklyn, NY", source = "dsk")


# Now, this is a good time to go in an add more specific geolocations 
# to your dataset. In this case, I would suggest using either the street
# corners or the addresses of the street corners 

geocode(as.character(myData[1,]$Starting_StreetCorner), source="dsk")

# startingCoords = geocode( as.character(myData$Starting_StreetCorner),source="dsk" )
# endingCoords = geocode( as.character(myData$Ending_StreetCorner),source="dsk" )

startingCoords = google_geocode( as.character(myData$Starting_StreetCorner), 
                                 key=key,simplify = TRUE)
endingCoords = google_geocode( as.character(myData$Ending_StreetCorner),
                               key=key,simplify = TRUE )


myData$Latitude_Start = startingCoords$lat
myData$Longitude_Start = startingCoords$lon
myData$Latitude_End = endingCoords$lat
myData$Longitude_End = endingCoords$lon

ggplot(data=myData[ which(myData$Date > as.POSIXct("2018-09-15", tz="America/New_York")),]) + 
  geom_segment(aes( x=Longitude_Start, 
                    y=Latitude_Start, 
                    xend=Longitude_End, 
                    yend=Latitude_End))


#########################
# Mine
## use the google routing engine to route between locations to approximate
## travel using 
#########################
# register_google()
# register_google(key = "AIzaSyD96WTAxAv-0mQTKXdeNvSjom2RS6ruO_o")

travelRoutes = route( paste(myData[1,]$Latitude_Start, myData[1,]$Longitude_Start, sep=", "),
                      paste(myData[1,]$Latitude_End,myData[1,]$Longitude_End, sep=", "),
                      mode="transit", 
                      structure = "route", output="all")

route( paste(myData[1,]$Latitude_Start, myData[1,]$Longitude_Start, sep=", "),
       paste(myData[1,]$Latitude_End,myData[1,]$Longitude_End, sep=", "),
       mode="transit", 
       structure = "route", output="all")

# test = route(from="48.7786,9.1767", to="48.78059, 9.159059", mode="transit", structure = "route")
# myData$route = list(
#   coords = list(
#     lat = test$lat,
#     lon = test$lon
#   ),
#   distance_km = sum(test$km, na.rm=TRUE),
#   distance_miles = sum(test$miles, na.rm=TRUE),
#   travel_time = sum(test$minutes, na.rm=TRUE)
# )
# 
# ggplot(data=myData) + geom_segment(aes(x=route$coords$lon, y=route$coords$lat))


test = google_directions(paste(myData[10,]$Latitude_Start, myData[10,]$Longitude_Start, sep=", "),
                  paste(myData[10,]$Latitude_End,myData[10,]$Longitude_End, sep=", "),
                  mode = "transit",
                  key = key,
                  simplify = TRUE)

test.points = decode_pl(test$routes$overview_polyline$points)
ggplot(data = test.points) + geom_line(aes(lon, lat))



mydistance10 = google_distance(as.character(myData[10,]$Starting_StreetCorner),
                               as.character(myData[10,]$Ending_StreetCorner),
                simplify = T,
                mode="transit",
                key=key)
