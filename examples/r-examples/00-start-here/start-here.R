###########################################
# Visual Encoding Exercise
# by: @joeyklee
# 
# NOTES: Hello! This may be one of your very first experience with R! Welcome!
###########################################

# We generally always start with data
# Usually we will read data in from an external source
# BUT today we will enter in our data as you see below
# `c` stands for, "concatenate" or "link (things) together in a chain or series"
# "=" equals is pretty much the same as "<-" in R 

# months represented by numbers
months = c(1,2,3,4,5,6,7,8,9,10,11,12)
# months represented by their string name
monthsString = c("January", "February", "March", "April", 
                 "May", "June", "July", "August", "September",
                 "October", "November", "December")

# NYC Average Temperatures in 2018


mydata = read.csv("/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/data/NOAA-NYC-Central-Park-Weather-200801_201808/1450774.csv", header=T) 

head(mydata)
colnames(mydata)

mydata$DATE <- as.POSIXct(mydata$DATE)

columnsOfInterest = c("STATION","NAME","LATITUDE","LONGITUDE","ELEVATION","DATE", "AWND","PRCP","SNOW","TMAX" ,"TMIN")

daily2017 <- subset(mydata, mydata$DATE >= as.POSIXct("2017-01-01") & mydata$DATE <= as.POSIXct("2017-12-31"), columnsOfInterest)


months = as.POSIXct(c("2017-01","2017-02","2017-03","2017-04","2017-05","2017-06","2017-07","2017-08","2017-09","2017-10","2017-11","2017-12"), format="%Y-%m")
monthly2017 <- data.frame()
colnames(monthly2017) <- c("TMAX", "TMIN", "PRCP_MIN", "PRCP_MAX", "DATE")

monthly2017 <- data.frame(months)
monthly2017$TMAX = c() 
monthly2017$TMIN = c() 
monthly2017$PRCP_MIN = c() 
monthly2017$PRCP_MAX = c() 


plot(test$DATE, test$PRCP)
plot(test$DATE, test$SNOW)

plot(test$DATE, test$TMAX)

plot(test$DATE, test$TMAX, type="l", ylim=c(-10, 44), col="red" )
lines(test$DATE, test$TMIN, type="l", col="blue")




# position


# length


# shape


# area


# hue


# saturation


