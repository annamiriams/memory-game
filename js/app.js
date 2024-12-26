/*-------------------------------- Constants --------------------------------*/

const turnsAvailable = 10;
const matchesAvailable = 6;

/*---------------------------- Variables (state) ----------------------------*/

// Initially, I had lots of global variables written up here, but I decided to add them into the startingState() function. 

/*------------------------ Cached Element References ------------------------*/

const cards = document.querySelectorAll('.card');
const matchSuccessMsg = document.querySelector('#match-success');
const matchesTallyIcon = document.querySelector('#matches-tally');
const turnsTallyIcon = document.querySelector('#turns-tally');
const resultsMsg = document.querySelector('#results');
const buttons = document.querySelectorAll('button');
const resetButton = document.querySelector('#reset-button');
const playAgainButton = document.querySelector('#play-again-button');
const modal = document.querySelector('.modal-container');
const modalX = document.querySelector('.close');
const creditsButton = document.querySelector('#credits');


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
    playAgainButton.removeAttribute('hidden');
};

const resetGame = function () {
    startingState();
    playAgainButton.setAttribute('hidden', true);
    resetButton.removeAttribute('hidden');
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

/*----------------------------- Event Listeners -----------------------------*/

addEventListener('load', (event) => {
    modal.style.display = 'flex';
});

addEventListener('mouseover', (event) => {
    modalX.style.cursor = 'pointer';
});

modalX.addEventListener('click', (event) => {
    modal.style.display = 'none';
    startingState();
});

// add event listener to close mobile modal and resetgame() when button is pressed

const helpModal = document.querySelector('.mobile-container');
const playNowButton = document.querySelectorAll('#play-now-button');

helpModal.addEventListener('click', (event) => {
    helpModal.style.display = 'none';
    startingState();
});

// add event listener for helpButton to populate instructions when hover over

const helpButton = document.querySelector('#help-button');

helpButton.addEventListener('click', (event) => {
    helpModal.style.display = 'inline'
});

// i still need to figure out how to allow for a button click to NOT reset the game...
