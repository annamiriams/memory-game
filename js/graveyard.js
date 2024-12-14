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

// create variable that represents the number of turns the player plays, and that will iterate each turn (turn = 2 cards flipped)
let turnsTally = 0;
// create variable that represents the number of correct matches the player has identified, and that will iterate with each correct match made
let matchesTally = 0;
// create variable that represents whether the card flipped or not
let cardFlipped = false;
// create two variables to hold values for two flipped cards
let firstCard;
let secondCard;
// create a variable that represents whether the board is frozen or not (in other words: can more cards be clicked right now? y/n)
let boardFrozen = false;

/*------------------------ Cached Element References ------------------------*/

// create a cached element that will select all card elements
const cards = document.querySelectorAll('.card');
// used to print a message when a correct match is selected
const matchSuccessMsg = document.querySelector('#match-success');
// used to iterate each correct match
const matchesTallyIcon = document.querySelector('#matches-tally');
// used to iterated each turn taken
const turnsTallyIcon = document.querySelector('#turns-tally');
// create a cached element that used to indicate if the player has lost or won
const resultsMsg = document.querySelector('#results');

/*-------------------------------- Functions --------------------------------*/

// create function that allows player to click on each cardBack, resulting in it flipping to cardFront
const flipCard = function() {    
    // trying out a way to clean up this code after a convo with dad:    
    // if boardFrozen is false, allow flipCard to run normally, else boardFrozen is true, and flipCard should not run
    if (boardFrozen === false) {
        this.classList.add('flip');
        if (cardFlipped === false) {
            cardFlipped = true;
            firstCard = this;
        }
        else {
            secondCard = this;
            cardFlipped = false;
            checkForMatch();
            incTurnsTally();
            compare();
        };
    };
};

// commented out function below is what the above code block executes in a cleaner way

//     // we have to lock the board until the incorrect card match is done flipping back to starting position to be able to click on more cards
//     // return used here means that when flipCard is run, and if boardFrozen === true, the rest of the function will not run. 
//     if (boardFrozen === true) {
//         return;
//     }
//     //ultimately what this line is doing is saying that for each time this function is called (each time a card is clicked), "this" card adds a class called 'flip'(which is written in our css) 
//     // i originally used .toggle (to toggle between two classes) below, but by the time i ended up adding in the code .removeEventListener, i think it might make more sense to pair that with .add (add & remove fits together better than toggle & remove). so switching .toggle to .add and i seem to get the same end results.
//     this.classList.add('flip');
//     // create if statement: if cardFlipped is false (meaning card has not flipped, set it to true instead, and set firstCard = to this state (in other words: all of what just happened is going to be assigned to firstCard))
//     if (cardFlipped === false) {
//         cardFlipped = true;
//         // same kind of use of 'this' as earlier: firstCard is assigned to 'this' most recent action(s)
//         firstCard = this;
//     }
//     // assign card click to secondCard, and change cardFlipped back to false 
//     else {        
//         secondCard = this;
//         cardFlipped = false;
//     // call the function written to check whether firstCard and secondCard match, then incrememt tallies, then compare() to update the message as needed 
//         checkForMatch();
//         incTurnsTally();
//         compare();
//     };
// };

// create a function that checks if the ids of firstCard matches secondCard. if they match, the cards should remain upright. if they don't match, the cards should flip back over.
const checkForMatch = function() {
    if (firstCard.id === secondCard.id) {
        freezeCards();
        // firstCard.id doesn't seem like the best way to write that, but ultimately i want a message to display indicating that a correct match was made and i can't currently think of a more sensible way of doing it
        matchSuccessMsg.textContent = `You found two ${firstCard.id}s!`
        incMatchesTally();
        // i think i can take this out because it's already called in flipCard
        compare();
    }
    else {
        flipCardsBack();
    }
};

// create a function that is called when the ids of firstCard and secondCard match (within checkForMatch). maybe this is where i'll later add some kind of visual component to run too?
const freezeCards = function() {
    // remove eventListeners so the cards can't be flipped again (meaning they can't be turned back over again)
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

// create a function that is called when the ids of the firstCard and secondCard DO NOT match. the function should flip the two cards back over. the setTimeout() method should work here by running a function after a certain amount of time has elapsed ('1000').
const flipCardsBack = function() {
    // first freeze the board if the cards do not match. 
    boardFrozen = true;
    setTimeout(() => {
        // remove the class 'flip' so that the cards flip back over (by triggering the 180deg turn)
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        // then unfreeze the board after the cards have been flipped back to starting state, which allows two more cards to be clicked
        boardFrozen = false;
    }, '1000'); // 1000 = 1 sec
};

// create a function that increments the turns tally after any two cards are clicked and shows the results on the corresponding section
const incTurnsTally = function () {
    turnsTally++;
    turnsTallyIcon.textContent = `${turnsTally} / ${turnsAvailable} turns`
};

//create a function that increments the matches tally after a correct match is found and shows the results on the corresponding section
const incMatchesTally = function () {
    matchesTally++;
    matchesTallyIcon.textContent = `${matchesTally} / ${matchesAvailable} matches`
};

// create a function to shuffle the cards. since i used flexbox, i'm trying to  assign the cardPosition to the flex order property. i used the rock paper scissors exercise where we used the Math method to randomize the cardPosition from 12 positions total. then assigned that to the card order. 
const shuffleCards = function() {
    cards.forEach((card)=>{
        const cardPosition = Math.floor(Math.random() * 12);
        card.style.order = cardPosition
    });
};
// i'm leaving this here because i haven't quite figured out if there's a better place for it to go. i just know it needs to run. maybe at the start of the game? maybe at the start and end of each round? maybe called when "reset" is clicked? right now the cards shuffle whenever the page is refreshed.
shuffleCards();

// create function to identify game end when one of these two results has been met:
    // - the player has correctly matched all card pairs within the allotted number of turns (win): msg = "You won! Play again?"
    // - the player has met the total turns allowed without correctly matching all card pairs (lose): msg = "You lost! Try again?"
const compare = function() {
    if (matchesTally === matchesAvailable) {
        resultsMsg.textContent = 'You won! Play again?';
    } else if (turnsTally === turnsAvailable) {
        resultsMsg.textContent = 'You lost! Try again?';
    } else {
        resultsMsg.textContent = '';
    };
};

// trying to figure out how to run a function at the end of the game to freeze the board as it was last clicked, and not allow for more clicks unless "play again" has been clicked
const endGame = function () {
    freezeCards();
    boardFrozen = true;
};

/*----------------------------- Event Listeners -----------------------------*/

// create an event listener for each click, specifically on each card
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});






// extra stuff for later:

// const: create a cached element that will select the id reset-button
// function: create function that allows player to click "reset" button that returns the game board (cards and counters) to the starting position
// event listener: create an event listener for each click on "reset"

// create an event listener for each click, specifically on each button
