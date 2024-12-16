# OH, FLOCK!

#### Locate each bird pair before the turns run out!
<img src="./img/application-overview.png" alt="An image of the OH, FLOCK! web application. On the left, the title is shown over a reset button, with instructions below. On the left, there is a turns tally, a match tally, and a board of twelve cards showing an image of a Scissor-tailed flycatcher."/>

## Description
A Wingspan-themed, single-player memory game where as the player, you flip two cards over per turn. If the cards are a match, they remain upright and you are one step closer to winning. If the cards don't match, they both flip back over again. You have ten turns total to find all matches before the game is over. Hope your memory serves you well! 

## Quick Links
* **Project planning** can be found [here](https://trello.com/b/XxLPtSdn/memory-game).
* **Wireframe** can be found [here](https://lucid.app/lucidchart/8aaecf84-a967-4391-a5d9-028f45b1acea/edit?beaconFlowId=BC1A14C6C4D919B2&invitationId=inv_2524a5b4-53ef-4e3e-a3c1-3fe477d4d70a&page=0_0#).
* **GitHub repo** can be found [here](https://github.com/annamiriams/memory-game).
* **Deployed project** link can be found [here](https://oh-flock.netlify.app/).

## Table of Contents
* [Technologies Used](#technologiesused)
* [Features](#features)
* [Design](#design)
* [Project Next Steps](#nextsteps)
* [About the Author](#author)
* [Works Cited](#workscited)

## <a name="technologiesused"></a>Technologies Used
* JavaScript
* HTML
* CSS

## <a name="design"></a>Design
* This game utilizes illustrations from the board game Wingspan. As a birdwatcher and board game enthusiast, Wingspan is one of my all time favorites. A memory game of this size is not typically considered a particularly challenging web browser game, so I attempted to make it a tad trickier by including birds with similar colored plumage. 

## <a name="nextsteps"></a>Project Next Steps
* Add more card pairs on deck, allowing the user to choose a custom-sized board (i.e. 10 pairs, 14 pairs, or 18 pairs possible).
* Replace the tally board with a timer.
* Add visual effects to pair with a matched pair, win, and/or loss.

## <a name="author"></a>About The Author
I'm new to coding, but experienced at problem-solving. I love to play games, and now I can say that I love building them! In my free time you'll find me reading, birdwatching, cooking, and spending time with my spouse, our dog, and two cats. 

## <a name="workscited"></a>Works Cited:
* **[this](https://www.w3schools.com/js/js_this.asp)**: While we did learn about the use of "this" through our modules, it was a new concept to me to use it within a function to identify firstCard or secondCard in the flipCard() function.
* **[removeEventListener()](https://www.w3schools.com/jsref/met_element_removeeventlistener.asp)**: Reading more about removing aneventListener() developed my understanding of the flexibility within the eventListener() method overall. It was helpful to use this theory in my app so that I could disable and enable the ability to click on cards. Removing an eventListener() was of course paired with increased understanding of **[adding them](https://www.w3schools.com/jsref/met_element_addeventlistener.asp)**. It would be helpful if there was a built in method in JavaScript to identify whether an element has an eventListener() already assigned in order to use that information in an if statement. For example: 
```
if (card.hasEventListener) {
    card.removeEventListener;
};
```
* **[setTimeout()](https://www.w3schools.com/jsref/met_win_settimeout.asp)**: I wanted a smooth transition when cards were flipped over, so used setTimeout() to accomplish this. I found this was also an easy way to make a simple game a little more difficult by having a shorter transition time. 
* **[Removing class names](https://www.w3schools.com/howto/howto_js_remove_class.asp)**: In order to even get cards to flip over, I needed to learn more about adding and removing class names, specifically 'flip.' 
* **[transform](https://www.w3schools.com/jsref/prop_style_transform.asp)**: I used transform to rotate two elements by 180deg. First, I needed to create a life-like card: I added the front of the card (the Scissor-Tailed Flycatcher) and then the back of the card (say, a Killdeer). Initially, these images are simply stacked on top of one another. In order to create a life-like card, the back image of a Killdeer needs to be flipped by 180deg; thus, we have a true card with a front and back image. Then, transform needed to be used again when adding/removing the flip class to allow each card unit to be flipped over as needed.
cardBack (showing one bird of a pair) needed to be rotated in order to act like a traditional card back.
* **[preserve-3d](https://www.w3schools.com/cssref/css3_pr_transform-style.php)**: In combination with transform, I used preserve-3d in my CSS to ensure that when a card was flipped, the transformation itself is still 3D. These concepts, along with setTimeout() made for a smooth transition each card flip.
* **[hidden](https://www.w3schools.com/tags/att_hidden.asp)**: I wanted a 'reset' button to show throughout game play, but disappear at game end, as well as a 'play again' button to show on the screen at game end but be hidden throughout game play. I looked into using the 'hidden' attribute, along with **[removeAttribute()](https://www.w3schools.com/jsref/met_element_removeattribute.asp)** and **[setAttribute()](https://www.w3schools.com/jsref/met_element_setattribute.asp)** to accomplish this.
* **[Math.floor](https://www.w3schools.com/js/js_random.asp)** and **[Math.random()](https://www.w3schools.com/js/js_math.asp)**: I needed to find a way to shuffle the cards before each game. Because of the rock, paper, scissors lab, I'd been introduced to this concept. I combined the randomization of 12 cards with the **[style.order]*(https://www.w3schools.com/jsref/prop_style_order.asp)** property. All of this was housed within the shuffledCards() function, which is called on at every startingState().
* **[Modals](https://www.w3schools.com/howto/howto_css_modals.asp)**: On page load, I wanted some kind of banner to display that showed either the game's instructions or the artwork credits. I decided on the latter so the former could be displayed throughout game play for ease of access. **[This video](https://www.youtube.com/watch?v=gLWIYk0Sd38)** was helpful in understanding and building a modal. This **[Geeks for Geeks article](https://www.geeksforgeeks.org/difference-between-addeventlistener-and-onclick-in-javascript/)** helped me figure out whether to use onclick or an eventListener() for the modal.
* **[min-height: 100vh](https://www.shecodes.io/athena/4773-what-is-the-meaning-of-min-height-100vh-in-css)**: I understand this conceptually now because of the article, but still struggle to see it's effects on my application. Ultimately, I included this concept in my code, but I'm not convinced it's fully working how I expect it to and would like to keep working at it! 
* **[grid-template-columns](https://www.w3schools.com/cssref/pr_grid-template-columns.php)**: This was instrumental in figuring out how to layout the cards within the board-container. 
* **[:active](https://www.youtube.com/watch?v=eMhiMsEC9Uk&list=PLLX1I3KXZ-YH-woTgiCfONMya39-Ty8qw)**: This tutorial helped me figure out how to create a visual component for the flipCard() function. I love seeing the card press back slightly before bouncing forward into the flip. 
* In addition to all of the concepts described above, the following youtube tutorials were so helpful in understanding the varying methods used to create memory game applications:
  * **[Learn Vanilla Javascript: Memory Game Tutorial from Code Sketch](https://www.youtube.com/watch?v=eMhiMsEC9Uk&list=PLLX1I3KXZ-YH-woTgiCfONMya39-Ty8qw)**: Finding this tutorial was reassuring in the way that it confirmed I was on the right track with my code.
  * **[CSS Flip Card Effect from Arjun Khara](https://www.youtube.com/watch?v=OV8MVmtgmoY)**: This provided a basic understanding of creating a card flip method. 
  * **[How to Code a Card Matching Game from Web Dev Simplified](https://www.youtube.com/watch?v=28VfzEiJgy4)**: This tutorial really helped me understand how flexbox and grid could be used to make a game board. 
  * Tutorials from **[PortEXE](https://www.youtube.com/watch?v=3uuQ3g92oPQ)**, **[developedbyed](https://www.youtube.com/watch?v=-tlb4tv4mC4)**, and **[JavaScript Academy](https://www.youtube.com/watch?v=xWdkt6KSirw&t=430s)** showed me just how many other ways there are to write an application for a memory game and how much I still have to learn.
