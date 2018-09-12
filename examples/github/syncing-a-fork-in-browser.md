# Syncing a fork in Github

Hello! If you're watching this, you probably want to know how to sync a forked repository from the place you forked it from.

Ok cool! So how does this look like? Let's have a look.

Right now, the user JozoTexino will fork the SVA-DSI/2018-fall-course repository 👉

Notice, JozoTexino now has the repo:
`JozoTexino/2018-fall-course`


Excellent! now we have a copy of the `2018-fall-course` BUT BUT BUT it is a copy of that project AT A PARTICULAR POINT IN TIME!


If JozoTexino wants to have the latest updates of that repository, JozoTexino will have to pull in those changes.


SO let's switch gears for 1 second. Let's say now that the owner of the repository `sva-dsi` makes some changes (e.g. the syllabus gets updated). Let's do that now 👉

Now `sva-dsi` will change the README.

Alright. So now in order for JozoTexino to get the update, JozoTexino will need to follow this procedure.

first go to the `compare` button


Notice we now have a section where we can compare the "base fork" with the "head fork". Notice there is an arrow ⬅️
showing which direction we are comparing.

What we need to do is "switch the base".

You can see that the base fork has changed and we don't see any errors.



you can see down here what was removed from the main fork of the repository.



now we will click "create pull request" 👉

now merge the pull request


now you can see we don't have that comment anymore :)


So that's it! If you want to pull in the changes that have occured since you last forked a repository, you can:

1. click compare
2. "switch the base"
3. pull request
4. merge pull request
5. and voila!
