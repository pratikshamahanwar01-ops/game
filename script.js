const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameOver = false;

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

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', startGame);

function handleClick(e) {
  const cell = e.target;
  if (isGameOver) return;

  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapPlayer();
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function endGame(draw) {
  isGameOver = true;
  if (draw) {
    messageElement.textContent = "It's a Draw!";
  } else {
    messageElement.textContent = `${currentPlayer} Wins!`;
  }
}

function swapPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function startGame() {
  currentPlayer = 'X';
  isGameOver = false;
  messageElement.textContent = '';
  cells.forEach(cell => {
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
}
