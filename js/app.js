/*-------------------------------- Constants --------------------------------*/

const turnsAvailable = 10;
const matchesAvailable = 6;

/*---------------------------- Variables (state) ----------------------------*/

let turnsTally = 0;
let matchesTally = 0;
let cardFlipped = false;
let firstCard;
let secondCard;
let boardFrozen = false;

/*------------------------ Cached Element References ------------------------*/

const cards = document.querySelectorAll('.card');
const matchSuccessMsg = document.querySelector('#match-success');
const matchesTallyIcon = document.querySelector('#matches-tally');
const turnsTallyIcon = document.querySelector('#turns-tally');
const resultsMsg = document.querySelector('#results');

/*-------------------------------- Functions --------------------------------*/

const flipCard = function () {
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
    }, '1000');
};

const incTurnsTally = function () {
    turnsTally++;
    turnsTallyIcon.textContent = `${turnsTally} / ${turnsAvailable} turns`
};

const incMatchesTally = function () {
    matchesTally++;
    matchesTallyIcon.textContent = `${matchesTally} / ${matchesAvailable} matches`
};

const renderResults = function () {
    if (matchesTally === matchesAvailable) {
        resultsMsg.textContent = 'You won! Play again?';
    } else if (turnsTally === turnsAvailable) {
        resultsMsg.textContent = 'You lost! Try again?';
    } else {
        resultsMsg.textContent = '';
    };
};

const shuffleCards = function () {
    cards.forEach((card) => {
        const cardPosition = Math.floor(Math.random() * 12);
        card.style.order = cardPosition
    });
};

shuffleCards();

/*----------------------------- Event Listeners -----------------------------*/

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
    card.addEventListener('mouseover', function() {
        this.style.cursor = 'pointer';
    });
});