########################################
# Example script to open up a csv file exported
# from google forms
########################################

### get the file path of your file ###
# TIP: http://osxdaily.com/2013/06/19/copy-file-folder-path-mac-os-x/
myDataPath = "/Users/joeyklee/Downloads/Dear Data Mobility Diary.csv"

### read your data into R ###
# here we explictly say we have a Header row and that our 
# data are separated by a comma 
myData = read.csv(myDataPath, header=TRUE, sep = ",")

### convert your datetime columns (optional) ###
# by default R doesn't recognize our date/time columns
# we can convert them using POSIX.ct
myData$Timestamp = as.POSIXct(myData$Timestamp, "%Y/%m/%d %H:%M:%S", tz="America/New_York")

# convert the date
myData$Date = as.POSIXct(myData$Date, "%Y-%m-%d",  tz="America/New_York")
# format the time column
myData$Trip_Start = as.POSIXct(myData$Trip_Start, format="%H:%M", tz="America/New_York")
# format the time column
myData$Trip_End = as.POSIXct(myData$Trip_End, format="%H:%M", tz="America/New_York")
# now you can do operations like get the duration of the trip
myData$Trip_Duration = myData$Trip_Start - myData$Trip_End