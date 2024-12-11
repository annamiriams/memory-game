/*
As a player, I want to see a landing page when I arrive on the game’s website to know that I’m ready to play the game.
As a player, I want to clearly see the instructions for the game presented, and then be able to click “x” to minimize those instructions. 
As a player, I want to click on a “help” icon so that I can reread the instructions as needed throughout the game.
As a player, I want to click on a “play” button so that I can start the game.
As a player, I want to click on a card so that it flips over and reveals what is on the other side. 
As a player, I want to see that two cards can remain flipped over at once, and then turn back over if they don’t match.
As a player, I want to see visual feedback on the page when I have correctly selected two cards that match, and then to see that the two matched cards remain face up as I proceed with the game.
As a player, I want to see the “turns” icon iterate so that I can track how many turns I have made and how many turns I have remaining. 
As a player, I want to see the “matches” icon iterate so that I can track how many card pairs I have correctly selected.
As a player, I want to see visual feedback on the page when I have correctly selected all matching cards within the allotted time or total number of turns (thereby winning the game).
As a player, I want to see visual feedback on the page when I have not correctly selected all matching cards within the allotted time or total number of turns (thereby losing the game).
As a player, whether I win or lose, I want to be able to click a “play again” button to restart the game.
As a player, I want to click a “reset” button in the middle of the game so that I can reset the game to starting state. 
*/



/*-------------------------------- Constants --------------------------------*/

// create constant to hold the total number of turns available to the player for each game
const turnsAvailable = 10;
// create constant to hold the total number of possible matches
const matchesAvailable = 6;


/*---------------------------- Variables (state) ----------------------------*/

// create variables that shows the initialized state of the game:

// create variable that represent the number of turns the player plays, and that will iterate each turn
let turnsCount;
// create variable that represent the number of correct matches the player has identified, and that will iterate with each correct match made
let matchesCount;
// create variable that will display a message upon winning or losing
let msg;

/*------------------------ Cached Element References ------------------------*/

// create a cached element that will hold the display message to indicate if the player has lost or won
const resultsDisplay = document.querySelector('#results-display');
// create a cached element that will select all card elements
const card = document.querySelectorAll('.card')

/*-------------------------------- Functions --------------------------------*/

// create function that allows player to click "play" button and start the game, thereby initiating turn counter and matches counter
// create function that allows player to click "reset" button that returns the game board (cards and counters) to the starting position

// create function that allows player to click on each cardBack, resulting in it flipping to cardFront
function flipCard() {
    this.classList.toggle('flip');
}

// create function to identify game end when one of these two results has been met:
    // - the player has correctly matched all card pairs within the allotted number of turns (win)
    // - the player has met the total turns allowed without correctly matching all card pairs (lose)
// create function that upon game end, updates resultsDisplay to indicate either:
    // msg = "You won! Play again?"
    // msg = "You lost! Try again?"
// create function that adds one count to the turn counter when the player clicks on two cards
// create function that adds one count to the matches counter when the player correctly clicks on two cards with the same image on cardBack

/*----------------------------- Event Listeners -----------------------------*/

// create an event listener for each click, specifically on each card
card.forEach((card) => {
    card.addEventListener('click', flipCard)
});

// create an event listener for each click, specifically on each button


