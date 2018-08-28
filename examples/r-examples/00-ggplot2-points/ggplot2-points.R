require(ggplot2)

# 100 random numbers
?runif
randomXs <- runif(10, 1, 10)
randomYs <- runif(10, 1, 10)

# create a table
myData <- data.frame(x=randomXs,y=randomYs )
# alternatively you can read in data like
# myData <- read.csv("path/to/csv", header=TRUE)

# add a z
myData$z  <- runif(10, 50, 100)

# a simple plot
ggplot(data=myData) + geom_point( aes(x=x, y=y, size=z) )



