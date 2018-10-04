# running a simple web server for your p5js projects

<!-- TOC START min:1 max:3 link:true update:true -->
- [running a simple web server for your p5js projects](#running-a-simple-web-server-for-your-p5js-projects)
  - [Remember how we learned about how the internet works?](#remember-how-we-learned-about-how-the-internet-works)
  - [Now, why is this important for us?](#now-why-is-this-important-for-us)
  - [How do we install a local web server?](#how-do-we-install-a-local-web-server)
    - [on mac:](#on-mac)
    - [on windows:](#on-windows)
  - [How do we run a local web server?](#how-do-we-run-a-local-web-server)
  - [How do I stop the webserver???](#how-do-i-stop-the-webserver)

<!-- TOC END -->



## Remember how we learned about how the internet works?

- You have a a client (your browser or your friend's browser)
- you type in a url
- you make a **request** to a server
- the server **responds** to that request by sending it stuff like data, or an set of **html, css, and javascript** to be executed in the client that requested it (e.g. you or your friend's browser)

## Now, why is this important for us?

- we love p5.js and sometimes we need to run a `web server` so that we can serve up our cool `html, css, and javascript` files as well as any images or data that are part of our p5.js projects

## How do we install a local web server?


- there are heaps of ways to do this, but the method we are going to use involves a few steps. Ready?
- we are going to use this tool for our local web serving needs: https://www.npmjs.com/package/http-server

### on mac:


#### install the homebrew package manager for mac
open up your terminal. Copy and paste the following and press enter:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


#### install Node.js using homebrew - a server side programming language/environment
After that finishes installing (you may be prompted to install things like XCode in the process), then copy and paste the following:

```
brew install node
```

#### install http-server - a CLI that allows you create a simple local web server

Once that finishes, copy and paste. Install the nodejs http-server tool:

```
npm install -g http-server
```


### on windows:

- download and install nodejs: https://nodejs.org/en/download/
- Follow the instructions here: https://blog.teamtreehouse.com/install-node-js-npm-windows
- Once nodejs and npm are installed, open up your nodejs command line prompt and type:

```
npm install -g http-server
```


## How do we run a local web server?

Now that we've installed nodejs and the http-server CLI tool on our systems, open up your terminal(mac)/commandline(windows):

first change the current directory of your terminal with the `cd` command followed by the folder path

```
cd <the/folder/path/of/your/p5.js/project>
```

then run the web server:

```
http-server
```

now you can copy and paste where your files are being served by going to:

```
http://127.0.0.1:8080
```

NOTE: your url might be different depending on if you have different webservers running


## How do I stop the webserver???

on both windows and mac:

```

[control] + c

```
