require(ggplot2)

# random values
randomAnimals <- c("pandas", "frogs", "koalas", "lizards", "honey badgers")
randomCounts <- runif(5, 1, 100)

# create a table
myData <- data.frame(animals=randomAnimals,randomCount=randomCounts )
# alternatively you can read in data like
# myData <- read.csv("path/to/csv", header=TRUE)

# a simple plot
ggplot(data=myData ) + geom_point( aes(x= animals,y=randomCount, size=4) ) + geom_segment( aes(x=animals, y=0, xend= animals,yend=randomCount, size=1) )

# OMG HOW COOL IS THAT ^^



