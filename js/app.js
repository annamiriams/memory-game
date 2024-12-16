/*-------------------------------- Constants --------------------------------*/

const turnsAvailable = 10;
const matchesAvailable = 2;

/*---------------------------- Variables (state) ----------------------------*/

// let turnsTally = 0;
// let matchesTally = 0;
// let firstCard;
// let secondCard;
// let cardFlipped = false;
// let boardFrozen = false;
// let gameOver = false;

/*------------------------ Cached Element References ------------------------*/

const cards = document.querySelectorAll('.card');
const matchSuccessMsg = document.querySelector('#match-success');
const matchesTallyIcon = document.querySelector('#matches-tally');
const turnsTallyIcon = document.querySelector('#turns-tally');
const resultsMsg = document.querySelector('#results');
const buttons = document.querySelectorAll('button');
const resetButton = document.querySelector('#reset-button');
const playButton = document.querySelector('#play-again');

/*-------------------------------- Functions --------------------------------*/

const flipCard = function () {
    if (gameOver === true) {
        return;
    }; 
    if (boardFrozen === false) {
        this.classList.add('flip');
        if (cardFlipped === false) {
            cardFlipped = true;
            firstCard = this;
            // fixes bug that allowed you to click on the same card twice and successfully find a match but it screws up clicking events after the first two cards are matched or turned back over
            // this.removeEventListener('click', flipCard);
            // freezeCards();
        }
        else {
            secondCard = this;
            cardFlipped = false;
            checkForMatch();
            incTurnsTally();
            renderResults();
        };
    };
};

const checkForMatch = function () {
    if (firstCard.id === secondCard.id) {
        matchSuccessMsg.textContent = `You found two ${firstCard.id}s!`
        freezeCards();
        incMatchesTally();
    }
    else {
        flipCardsBack();

    };
};

const freezeCards = function () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

const flipCardsBack = function () {
    boardFrozen = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        boardFrozen = false;
    }, '1400');
    // two lines necessary because of the double click match bug fix 
    // firstCard.addEventListener('click', flipCard);
    // secondCard.addEventListener('click', flipCard);
};

const incTurnsTally = function () {
    turnsTally++;
    turnsTallyIcon.textContent = `${turnsTally} / ${turnsAvailable} turns`;
};

const incMatchesTally = function () {
    matchesTally++;
    matchesTallyIcon.textContent = `${matchesTally} / ${matchesAvailable} matches`;
};

const renderResults = function () {
    if (matchesTally === matchesAvailable) {
        resultsMsg.textContent = 'You won! Play again?';
        resetButton.setAttribute('hidden', true);
        endGame();
    } else if (turnsTally === turnsAvailable) {
        resultsMsg.textContent = 'You lost! Try again?';
        endGame();
    } else {
        resultsMsg.textContent = '';
    };
};

const endGame = function () {
    gameOver = true;
    playButton.removeAttribute('hidden');
};

const resetGame = function () {
    // all of starting state was in here as a way to reset everything. and variables at the top were defined as t/f or 0.
    startingState();
    
    // starting state() replaces all commented out lines below:
    // turnsTally = 0;
    // matchesTally = 0; 
    // let gameOver = false;
    // let cardFlipped = false;
    // let boardFrozen = false; 
    // shuffleCards();
    // addEventListenersToAllCards();
    // removeFlipClassFromAllCards(); 

    // turnsTallyIcon.textContent = `${turnsTally} / ${turnsAvailable} turns`;
    // matchesTallyIcon.textContent = `${matchesTally} / ${matchesAvailable} matches`;
    // resultsMsg.textContent = '';
    // matchSuccessMsg.textContent = '';

    // look up: js pause
    // this works but it's pretty glitchy/weird looking when it shuffles and flips

    playButton.setAttribute('hidden', true);
    resetButton.removeAttribute('hidden');
};

function addEventListenersToAllCards() {
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
};

function removeFlipClassFromAllCards() {
    cards.forEach(card => {
        if (card.classList.contains('flip')) {
            card.classList.remove('flip');
        };
    });
};

const shuffleCards = function () {
    cards.forEach((card) => {
        const cardPosition = Math.floor(Math.random() * 12);
        card.style.order = cardPosition;
    });
};

// i don't think i need this called here since it's called in starting state?
// shuffleCards();

// why would i even have this? endGame is literally just written to call on another function? that seems unnecessary. it also can't go at the beginning because then the functions called within it won't work.
const startingState = function () {
    turnsTally = 0;
    matchesTally = 0;
    cardFlipped = false;
    boardFrozen = false;
    gameOver = false;
    turnsTallyIcon.textContent = `${turnsTally} / ${turnsAvailable} turns`;
    matchesTallyIcon.textContent = `${matchesTally} / ${matchesAvailable} matches`;
    resultsMsg.textContent = '';
    matchSuccessMsg.textContent = '';
    shuffleCards();
    addEventListenersToAllCards();
    removeFlipClassFromAllCards();
};

startingState();

/*----------------------------- Event Listeners -----------------------------*/

// think about adding these somehow to starting state

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
    card.addEventListener('mouseover', function () {
        this.style.cursor = 'pointer';
    });
});

buttons.forEach((button) => {
    button.addEventListener('click', resetGame);
    button.addEventListener('mouseover', function () {
        this.style.cursor = 'pointer';
    });
});