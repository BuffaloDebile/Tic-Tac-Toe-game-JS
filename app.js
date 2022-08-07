let currentPlayer = 'X';

const info = document.querySelector('.info');
const containerBtn = document.querySelector('.container-btn');
info.textContent = `${currentPlayer} should play`;

const cells = document.querySelectorAll('.cell');

cells.forEach((cell) => cell.addEventListener('click', handleClick));

const currentGame = ['', '', '', '', '', '', '', '', ''];
let lock = false;

function handleClick(e) {
  const clickedBox = e.target;
  const boxIndex = clickedBox.getAttribute('data-index');

  if (currentGame[boxIndex] !== '' || lock) return;

  currentGame[boxIndex] = currentPlayer;
  clickedBox.textContent = currentPlayer;

  verification();
}

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function verification() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const CombinationToCheck = winningCombinations[i];

    let a = currentGame[CombinationToCheck[0]];
    let b = currentGame[CombinationToCheck[1]];
    let c = currentGame[CombinationToCheck[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    } else if (a === b && b === c) {
      info.textContent = ` Congrats ! Player ${currentPlayer} won ! Press restart to start again`;
      containerBtn.style.display = 'flex';
      lock = true;
      return;
    }
  }

  //tie game, all boxes ticked without a winner

  if (!currentGame.includes('')) {
    info.textContent = 'Tie game ! Press restart to try again.';
    containerBtn.style.display = 'flex';
    lock = true;
    return;
  }
  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  info.textContent = `${currentPlayer} should play`;
}

function refreshPage() {
  window.location.reload();
}
