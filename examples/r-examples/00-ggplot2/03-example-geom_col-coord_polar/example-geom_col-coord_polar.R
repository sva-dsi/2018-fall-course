require(ggplot2)

# random values
randomAnimals <- c("pandas", "frogs", "koalas", "lizards", "honey badgers")
randomCounts <- runif(5, 1, 100)

# create a table
myData <- data.frame(animals=randomAnimals,randomCount=randomCounts )
# alternatively you can read in data like
# myData <- read.csv("path/to/csv", header=TRUE)

# a simple plot - geom_col differs from geom_bar because you can
# specify which x and y values you want
# notice the addition of the coord_polar()
ggplot(data=myData ) + geom_col( aes(x= animals,y=randomCount) ) + coord_polar()

# OMG HOW COOL IS THAT ^^
