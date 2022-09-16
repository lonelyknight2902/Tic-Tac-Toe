const player = (number) => {
  if (number == 1) return { number, symbol: "X" };
  return { number, symbol: "O" };
};

const gameBoard = (() => {
  let _array = new Array(9);
  let _player1 = player(1);
  let _player2 = player(2);
  let _currentPlayer = _player1;
  for (let i = 0; i < 9; i++) {
    _array[i] = document.querySelector(`#cell${i + 1}`);
    _array[i].addEventListener("click", () => {
      if (_play(i, _currentPlayer.symbol)) {
        if (!_checkWinner()) {
          if (_currentPlayer == _player1) {
            _currentPlayer = _player2;
          } else {
            _currentPlayer = _player1;
          }
          displayControl.displayTurn(_currentPlayer.number);
        }
      }
    });
  }
  const _play = (position, player) => {
    if (_array[position].innerText == "") {
      _array[position].innerText = player;
      return true;
    }

    return false;
  };

  const start = () => {
    _reset();
    _currentPlayer = _player1;
    displayControl.displayTurn(_currentPlayer.number);
  };

  const _checkWinner = () => {
    if (
      (_array[0].innerText == _array[1].innerText &&
        _array[1].innerText == _array[2].innerText &&
        _array[0].innerText != "") ||
      (_array[3].innerText == _array[4].innerText &&
        _array[4].innerText == _array[5].innerText &&
        _array[3].innerText != "") ||
      (_array[6].innerText == _array[7].innerText &&
        _array[7].innerText == _array[8].innerText &&
        _array[6].innerText != "") ||
      (_array[0].innerText == _array[3].innerText &&
        _array[3].innerText == _array[6].innerText &&
        _array[0].innerText != "") ||
      (_array[1].innerText == _array[4].innerText &&
        _array[4].innerText == _array[7].innerText &&
        _array[1].innerText != "") ||
      (_array[2].innerText == _array[5].innerText &&
        _array[5].innerText == _array[8].innerText &&
        _array[2].innerText != "") ||
      (_array[0].innerText == _array[4].innerText &&
        _array[4].innerText == _array[8].innerText &&
        _array[0].innerText != "") ||
      (_array[2].innerText == _array[4].innerText &&
        _array[4].innerText == _array[6].innerText &&
        _array[2].innerText != "")
    ) {
      displayControl.displayWinner(_currentPlayer.number);
      return true;
    } else if (
      _array.every((cell) => {
        return cell.innerText != "";
      })
    ) {
      displayControl.displayTie();
      return true;
    }

    return false;
  };

  const _reset = () => {
    for (let i = 0; i < 9; i++) {
      _array[i].innerText = "";
    }
  };

  return { start };
})();

const displayControl = (() => {
  const _turn = document.querySelector(".turn");
  const displayTurn = (player) => {
    _turn.innerText = `It's player ${player}'s turn.`;
  };

  const displayWinner = (player) => {
    winner.innerText = `Player ${player} is the winner.`;
    overlay.style.display = "block";
    result.style.display = "block";
  };

  const displayTie = () => {
    winner.innerText = "It's a tie.";
    overlay.style.display = "block";
    result.style.display = "block";
  };

  return { displayTurn, displayWinner, displayTie };
})();

const overlay = document.querySelector(".overlay");
const replay = document.querySelector(".replay");
const winner = document.querySelector(".winner");
const result = document.querySelector(".result");

replay.addEventListener("click", () => {
    overlay.style.display = "none";
    result.style.display = "none";
    gameBoard.start();
});

gameBoard.start();
