require(ggplot2)

# random values
randomAnimals <- c("pandas", 
                   "frogs","frogs","frogs","frogs","frogs", 
                   "koalas", "koalas", 
                   "lizards",
                   "honey badgers", "honey badgers", "honey badgers")


# create a table
myData <- data.frame(animals=randomAnimals)
# alternatively you can read in data like
# myData <- read.csv("path/to/csv", header=TRUE)

# a simple plot - geom_dotplot just counts up your stuff! 
ggplot(data=myData ) + geom_dotplot( aes(animals) )

# OMG HOW COOL IS THAT ^^



