
# Get the filepath of the data
dataPath <- "/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/examples/r-examples/01-hello-world/temperature.csv"

myData <- read.csv(dataPath, header=TRUE)

# Print the first rows of the data
head(myData)

# data exploration!
## is there a relationship between speed and temperature?
plot(x=myData$speed,
     y=myData$thermocouple_t, "p")

## plot the geo coordinates just to check
plot(x=myData$lon, 
     y=myData$lat, "p")

## plot the relationship between altitude and speed - is there anything?
plot(x=myData$speed,
     y=myData$altitude)

## plot ambient infrared temperature to thermocouple temperature
plot(x=myData$ir_amb, 
     y=myData$thermocouple_t)

## plot reflected infrared temperature to the thermocouple temperature
plot(x=myData$ir_obj, 
     y=myData$thermocouple_t)

## interesting! as humidity decreases, temperature decreases
plot(x=myData$ada_humidity, 
     y=myData$thermocouple_t)

## there are multiple temperature sensors on the device
plot(x=myData$ada_humidity, 
     y=myData$ada_temp )

## Let's parse the time
### create a date,time column:
myData$datetime = paste( myData$date, myData$time )
### parse the datetime column first to UTC time since 
### that's how the sensor collected it
myData$datetime = as.POSIXct( myData$datetime, "%d/%m/%Y %H:%M:%OS", tz="Europe/London")
### check what's happening - good! 
head(myData) 
### Now to NYC time 
myData$datetime = as.POSIXct(format(myData$datetime, tz="America/New_York"))
head(myData) 

plot(x=myData$datetime, 
     y=myData$thermocouple_t, 
     type="p",
     main="Thermocouple temperature",
     ylab="Temperature celsius degrees",
     xlab="Time")

# plot humidity with a line showing thermocouple temperature
plot(x=myData$datetime, 
     y=myData$ada_humidity, 
     type="p",
     main="Thermocouple temperature",
     ylab="relative humidity",
     xlab="Time")
par(new=TRUE)
lines(x=myData$datetime, y=myData$thermocouple_t)
## ^^ wait why don't we see anything? oh yah because the y axes is cutting
## our line off let's try again

# change the y axis limits
## http://articles.chicagotribune.com/2009-11-15/news/0910190209_1_relative-humidity-dew-point-weather-report
plot(x=myData$datetime, 
     y=myData$ada_humidity, 
     type="p",
     main="Thermocouple temperature",
     ylab="relative humidity",
     xlab="Time",
     ylim=c(15, 100))
par(new=TRUE)
lines(x=myData$datetime, y=myData$thermocouple_t)


# plot humidity with a line showing thermocouple temperature
# except this time on top of eachother
# note that we show the yaxis on the right for temperatre
plot(x=myData$datetime, 
     y=myData$ada_humidity, 
     type="l",
     lwd="2",
     main="Thermocouple temperature vs. Relative Humidity",
     ylab="relative humidity",
     xlab="Time",
     col="blue")
par(new=TRUE)
plot(x=myData$datetime, 
     y=myData$thermocouple_t, 
     type="l",
     lwd="2",
     col="red",
     xlab="",
     ylab="",
     yaxt='n')
axis(side=4)
legend("bottomleft",
       legend = c("Relative Humidity", "Temperature"),
       col = c("blue", "red"),
       bty = "n",
       pch=c("-", "-"),
       pt.cex = 2,
       cex = 1.2,
       text.col = "black",
       horiz = F )
