# The easiest way to get ggplot2 is to install the whole tidyverse:
install.packages("tidyverse")

# Load ggplot2 into your current project
require(ggplot2)

#####################################
# 1: create/load data
# first we need to load or create data to use
# in this case, we use the "runif()" function to generate
# two lists of 10 random numbers ranging from 1 to 10, one
# called "randomXs" and another called "randomYs"
#####################################
?runif # using the "?" + a function will open the "help" panel
randomXs <- runif(10, 1, 10)
randomYs <- runif(10, 1, 10)

# create a table using the "data.frame()" function and set it
# equal to a variable called "myData"
# each of our two lists above become "columns" in the new data.frame()
myData <- data.frame(x=randomXs,y=randomYs )

# alternatively if we weren't creating our data,
# you can read in data like
# myData <- read.csv("path/to/csv", header=TRUE)

#####################################
# 2; Do something with your data
# Usually you might do more complex operations on your data
# In this case, we just add another column of
# random numbers into our "myData" data.frame() and set it equal to
# a column now called "z"
#####################################
myData$z  <- runif(10, 50, 100)

# you can acccess those data in the myData object by using:
myData$x # prints all the X values
myData$y # prints all the Y values
myData$z # prints all the Z values

#####################################
# 3: Plot your data
# a simple plot using ggplot
# here the structure goes something like this:
## 3.1: create an empty plot using "ggplot( data = myData)", referencing your "myData" object
## 3.2: use the desired plotting geometry, in this case, "geom_point()", for points
## 3.3.1: you can set the x, y, position of the points, and set the "size" to our "z" value
#####################################
ggplot(data=myData) + geom_point( aes(x=x, y=y, size=z) )
