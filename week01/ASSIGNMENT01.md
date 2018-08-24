# ASSIGNMENT 01: Setup & Visualization Critique
**DUE:** DD MONTH YEAR, HH:MM

![image description](link/to/image)
<!-- TOC START min:1 max:3 link:true update:true -->
- [ASSIGNMENT 01: Setup & Visualization Critique](#assignment-01-setup--visualization-critique)
  - [Brief](#brief)
    - [Part 1: Setup your tools and blog](#part-1-setup-your-tools-and-blog)
    - [Part 2: Interactive Viz Critique](#part-2-interactive-viz-critique)
  - [Deliverables](#deliverables)
    - [Part 1:](#part-1)
    - [Part 2:](#part-2)
  - [Submission](#submission)
    - [Part 1:](#part-1-1)
    - [Part 2:](#part-2-1)

<!-- TOC END -->



## Brief

Hello and welcome to your first assignment! Hooray!
This is a two-part assignment. Let's go!

### Part 1: Setup your tools and blog

Let's start this week by setting up all of the tools and things we will need for this semester.
Follow the instructions below:

#### Text Editor

If the web browser becomes your canvas, your text editor will be your paint brush! You will need a place to write down, edit, and build out your ideas and code. There happen to be really awesome text editors out there now, one of which is [Atom.io](https://atom.io). There are number of other editors out there like [SublimeText](https://www.sublimetext.com/) - also a great editor and [Brackets.io](http://brackets.io/). You can take your pick.

NOTE: I will be using the Atom text editor, so any examples or little tricks or tips will be shown in relation to the Atom text editor.

#### Github Account

[Github](https://github.com) is a "social coding/development platform". While geared towards developers for building software projects, it has rapidly changed and is now being used for all sorts of purposes like hosting course syllabi ;). Anyways, Github is the platform we're going to be using to submit assignments, build projects, share links, etc.

→ If you haven't already, please create an account on [Github](https://github.com/join?source=header-home)

Now that you have an account, take a peak. You can see all sorts of project that may look like they are being written in a incomprehensible English (or other languages) and you're not completely wrong. A lot of the projects (aka repositories) are software projects that are written in all sorts of coding languages.

Notice that most, if not all, repositories have a file called `README.md`. This file gets automatically `rendered` when you first visit a project repository and contains important details about the repository like and `about section` or links to their `code of conduct` and how to `setup the project`.

You can create repositories of your own for all your projects, events your planning to organize, and even your own portfolio site and blog. Speaking of which, why don't we just create a repository just for practice.

→ 1. create a new `repository` > 2. give it a name (e.g. dsi-datavis-1 perhaps?) > 3. give it a short description > 4. make sure to ✅ `initialize this repository with a readme` > press `create repository`

Yay! You've created your first repository! 🎉 Now that wasn't so bad. Ok, we're going to do a couple things before we move on. Let's edit our `README.md` file as a way to get familiar with `markdown` - a syntax that is basically HTML but wrapped in an abstracted syntax.

→ 1. click the little pen(pencil?) in top-right corner 🖋 > and try adding the following into the now typable area on the page and click the 👁`preview changes` tab and see the magic ✨ > make sure to `commit changes` at the bottom of the page to save your changes.

```
# I'M A H1
## I'M A H2
### I'M A H3
#### I'M A H4
##### I'M A H5
###### I'M A H6

I'm a normal paragraph text.

![I'm an image](https://cataas.com/cat)

![I can even be a gif](https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif)

[links are made like this, here's the DSI homepage](https://dsi.sva.edu/)

| column 1 | column 2 | column 3 |
| -------- | ---------| -------- |
| wow!     | such!    | yay!     |
| weather! | sun!     | blue!    |

```

You've just made your first webpage! Or maybe your millionth, but who's counting! Anyways, you can see that those different symbols like the hash (`#`) modulates the header size or the combination of these symbols`![description text](link/to/image)` creates an image. Because markdown is HTML just in an abstracted syntax, you can even export markdown pages to HTML. You can keep practicing markdown and you most certainly will through out this course as you submit your assignents.

Ok in the next step we will create a [Github Gist](https://gist.github.com/)

So if a Github `repo` is for bigger projects with lots of related files, a `Gist` is a small collection - 1 to 3 files - that are meant to communicate a discrete idea or be a quick reference. Why don't you try adding a gist now.

→ 1. add a description > 2. name the file `markdown-syntax-practice.md` > add the following (below) > `create public gist`:

```
I ❤️ Dataviz
```

Notice our markdown gets rendered! You can now copy and paste that link where you want on the internet! In fact, for your assignment you're going to submit the link to this `gist` and the link to your `repo` later on. For now, keep reading.


#### Blog

Documentation is everything. You could make the coolest thing in the world, but if there's no documentation, it might never have happened. So as part of this course you have a few options for documenting your work and submitting assignments. In the end, you will just be submitting a link, so as long as it is accessible via URL, you can take your pick.

* Option 1: Use an existing blogging platform
  -
* Option 2: Use the provided Github Jekyll Template provided
  -
* Option 3: Use Github Gists
  - We just learned how to create github gists! You can submit and show your work using gists for the rest of the semester if you want a lightweight place to post and edit things.

* Setup your blog for the course - may be your own personal site or the template provided
* (optional) "forking" your blog / Setting up your blog

#### Moodboard

Part of documenting your work is also being able to cite your sources as well as inspiration. I've found that it is helpful to start early and get into the practice of doing a good job bookmarking the things that may inspire new ideas, questions, or moods.

I use a combination of the [Pocket App](https://getpocket.com/) and [Pinterest](https://www.pinterest.com/) to quickly save and keep track of things that inspire me. I've begun one here for this course [Joey's Pinterest Board](https://www.pinterest.com/josephkanglee/sva-dataviz/).

→ Create an account [Pinterest](https://pinterest.com) > create a new `Board` called `sva-dataviz`

NOTE: you may use something like [Google Keep](https://keep.google.com/u/0/) or [Evernote](https://evernote.com/) or [Dribbble](https://dribbble.com/) or any other service - even just a folder of screenshots on your computer will do. The point is to do your best to keep up with tracking your inspiration and references.



### Part 2: Interactive Viz Critique

Find a data visualization project that resonates with you.

1. Explain why you chose the visualization:
  + why is it effective/affective?
  + Why is it relevant for you?
2. Describe how the data are mapped to the visuals, here's just some questions to spark your brain:
  + What are the elements of the visualization design (e.g. form, color, typography, layout)?
  + How is the narrative and story telling shaped by the creators of the visualization? How do the data inform the format of the visualization?
  + Do you trust/distrust the visuals? Why?
  + Can you identify uncertainty in the data being presented? Are the authors forthcoming about the ways they manipulated the data, where the sources came from? Perhaps even who is funding their work and where their motivations come from?
  + Does it serve a purpose? If so, which purpose? Is it just beautiful and less substantive, or rather the opposite or both?
  + Would you improve the visualization in any way? How would you improve the visualization? (feel free to sketch out your proposal)

 Recommended: Begin by creating visualization moodboards w/ some kind of social bookmarking service (e.g. pinterest, dribble, others?) - being systematic about your collection of visualization examples will help you to begin creating an library of all the things that pique your interest. You can refer to them when you need to and


## Deliverables

### Part 1:

* Logistics and setup:
  - [ ] Github Account
  - [ ] Moodboard Account
  - [ ] Successful post to Github issues
  - [ ] Successful post to Github gists
  - [ ] Blog Setup

### Part 2:

* blog post:
  - [ ] A 2-3 paragraph blog post reflection/critique of a visualization of choice. The blog post must be posted to the web and successfully submitted to the class Github Repository

## Submission

### Part 1:

* Submit the following URL(s) to this [Github Issue for Assignment 1.1]() in the class repository:
  - Your Github Repo
  - Your Gist
  - Your Moodboard for SVA DSI


### Part 2:

* Submit the following URL(s) to this [Github Issue for Assignment 1.2]() in the class repository:
  - Link to your Blog post
