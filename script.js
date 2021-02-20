'use strict';

// Selecting elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const players = document.querySelectorAll('.player');
const playerName0 = document.querySelector('#name--0');
const playerName1 = document.querySelector('#name--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const playerNameInput0 = document.querySelector('.player0--name').value;
const playerNameInput1 = document.querySelector('.player1--name').value;
const btnPlayersInput = document.querySelector('.btn--players--input');
const playerNamesInputs = document.querySelectorAll('.player--name');
const result = document.querySelectorAll('.result');

let totalScores, currentScore, activePlayer, playing;

// Starting page
const init = () => {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  for (let i = 0; i < result.length; i++) {
    result[i].classList.add('hidden');
    players[i].classList.remove(`player--winner`);
  }

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
};

init();

// Make Submit button clickable
const clickableBtn = () => {
  if (!playerNameInput0 && !playerNameInput1) {
    btnPlayersInput.classList.remove('unclickable');
  }
};

// Getting the players names
btnPlayersInput.addEventListener('click', () => {
  for (let i = 0; i < playerNamesInputs.length; i++) {
    playerName0.textContent = playerNamesInputs[0].value;
    playerName1.textContent = playerNamesInputs[1].value;
  }
  closeModal();
});

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

document.addEventListener('keydown', e => {
  if (
    e.key === 'Enter' &&
    !modal.classList.contains('hidden') &&
    !document.querySelector('.player0--name').value &&
    !document.querySelector('.player1--name').value
  ) {
    alert(`Both fields must be filled`);
  } else if (
    e.key === 'Enter' &&
    !modal.classList.contains('hidden') &&
    document.querySelector('.player0--name').value &&
    document.querySelector('.player1--name').value
  ) {
    closeModal();
    document.activeElement.blur();
    for (let i = 0; i < playerNamesInputs.length; i++) {
      playerName0.textContent = playerNamesInputs[0].value;
      playerName1.textContent = playerNamesInputs[1].value;
    }
  }
});

// Switch player function
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling the dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // Generate a random dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    // Display dice
    diceEl.classList.remove('hidden');
    // Display correct dice image
    diceEl.src = `dice-${diceNum}.png`;

    // Check for rolled 1
    if (diceNum !== 1) {
      // Add dice to current score
      currentScore += diceNum;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to active player's score
    totalScores[activePlayer] += currentScore;
    // totalScore[1] = totalScore + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    // 2. Check if player's score si >= 100
    if (totalScores[activePlayer] >= 10) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.result--${activePlayer}`)
        .classList.toggle('player-winner');

      document
        .querySelector(`.result--${activePlayer}`)
        .classList.remove('hidden');
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  init();
});
