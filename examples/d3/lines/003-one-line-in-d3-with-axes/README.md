<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Your-Awesome-project-title](#your-awesome-project-title)
	- [About](#about)
	- [Setup](#setup)
		- [STEP 0: Install Nodejs](#step-0-install-nodejs)
			- [MacOS](#macos)
			- [Windows](#windows)
		- [STEP 1: Installing a simple web server with nodejs](#step-1-installing-a-simple-web-server-with-nodejs)
		- [STEP 2: Run the web server](#step-2-run-the-web-server)

<!-- /TOC -->


# Your-Awesome-project-title

## About

A description of your awesome project

## Setup

### STEP 0: Install Nodejs

Find your operating system:

> I assume if you're using linux or something else, probably you know how to do this already.

#### MacOS

Open up your terminal:

first install homebrew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

then: Install Node.js
```
brew install node
```

#### Windows

* Install Nodejs at: https://nodejs.org/en/download/ (further instructions here: http://blog.teamtreehouse.com/install-node-js-npm-windows)


### STEP 1: Installing a simple web server with nodejs
```
npm intall -g http-server
```

### STEP 2: Run the web server
```
cd d3-project-template
http-server
```
open up your web browser: localhost:8080 (or whatever the port assigns to)
