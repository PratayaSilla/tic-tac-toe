import { useState } from 'react';
import './App.css';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const gameEnded = winner || isDraw;

  function handleClick(index) {
    if (squares[index] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function getEndMessage() {
    if (winner) return `🎉 Winner: ${winner}`;
    if (isDraw) return "🤝 It's a draw!";
    return '';
  }

  return (
    <div className="main-container">
      <div className={`game-container ${gameEnded ? 'blurred' : ''}`}>
        <h1>Tic Tac Toe</h1>
        <div className="status">Next Player: {xIsNext ? 'X' : 'O'}</div>
        <div className="board">
          {squares.map((square, i) => (
            <button
              key={i}
              className="square"
              onClick={() => handleClick(i)}
            >
              {square}
            </button>
          ))}
        </div>
        <button className="restart-button" onClick={restartGame}>
          🔄 Restart
        </button>
      </div>

      {gameEnded && (
        <div className="overlay">
          <div className="modal">
            <h2>{getEndMessage()}</h2>
            <button className="restart-button" onClick={restartGame}>
              🔁 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  for (let combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default App;
