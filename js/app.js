/*-------------------------------- Constants --------------------------------*/

const turnsAvailable = 10;
const matchesAvailable = 6;

/*---------------------------- Variables (state) ----------------------------*/

// startingState takes care of these variables. commented out for now in case i decide to go back to this formatting later
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
const creditsModal = document.querySelector('.close');
// const creditsButton = document.querySelector('#credits');

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
    // two lines necessary because of the double click match bug fix; except i screwed it up and this doesn't actually work!!!
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
        resultsMsg.textContent = 'Oh, flock! You lost! Try again?';
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
    startingState();
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

// this is feeling a little silly and counterintuitive? resetGame is basically just written to call on another function? that seems unnecessary. it also can't go at the beginning because then the functions called within it won't work. i need to think about whether this "cleaning up of code" is actually doing that or making it messier...
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
};

startingState();

/*----------------------------- Event Listeners -----------------------------*/

// honestly maybe scrap this. it might not be worth it and it's not working yet. don't prioritize it.
const modal = function () {
    // this isn't working how i want it to (click anywhere and it'll close, rather than on the x)
    addEventListener('click', (event) => {
        document.querySelector('.modal-container').style.display = 'none';
    });
    addEventListener('load', (event) => {
        document.querySelector('.modal-container').style.display = 'flex';
    });
    addEventListener('mouseover', (event) => {
        creditsModal.style.cursor = 'pointer';
    });
};

modal();

// const openCredits = function () {  
//     addEventListener('click', (event) => {
//         document.querySelector('.modal-container').style.display = 'flex';
//     });
//     addEventListener('mouseover', (event) => {
//         creditsModal.style.cursor = 'pointer';
//     });
// };

// creditsButton.addEventListener('click', (event) => {
//     document.querySelector('.modal-container').style.display = 'flex';
// });

// this isn't working for the credits button
// document.querySelector('#credits').addEventListener('click', function() {
//     console.log('test');
//     document.querySelector('.modal-container').style.display = 'flex';

// });

