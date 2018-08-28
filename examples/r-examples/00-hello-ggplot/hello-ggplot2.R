install.packages("ggplot2")
install.packages("ggmap")
require("ggplot2")
require("ggmap")

# Get the filepath of the data
dataPath <- "/Users/joeyklee/Code/src/github/sva-dsi/2018-fall-course/examples/r-examples/00-hello-world/temperature.csv"

myData <- read.csv(dataPath, header=TRUE)

# wow!
ggplot(myData, aes(x=ada_humidity, y=thermocouple_t)) +
  geom_point(shape=1) +    # Use hollow circles
  geom_smooth(method=lm)   # Add linear regression line 
                            #  (by default includes 95% confidence region)


# how about a map

# top left: 40.677410, -73.987628
# bottom right: 40.645638, -73.942735

prospectPark <- get_map("Prospect Park, Brooklyn", zoom=14)
p <- ggmap(prospectPark)
#ggplot(p)
# p + geom_point(data=myData, aes(x=lon, y=lat, size = thermocouple_t))

p + geom_point(data=myData, aes(x=lon, y=lat, color = thermocouple_t))
