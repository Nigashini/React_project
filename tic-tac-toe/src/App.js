import React, { useState } from 'react';
import './index.css';

function Square({ value, onClick, highlight }) {
  return (
    <button className={`square ${highlight ? 'highlight' : ''}`} onClick={onClick}>
      {value}
    </button>
  );
}

function Modal({ winner, onRestart }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>🎉 Congratulations! 🎉</h2>
        <p>{winner} Wins the Game!</p>
        <button className="restart" onClick={onRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = isX ? 'X' : 'O';
    setSquares(nextSquares);
    setIsX(!isX);

    const result = calculateWinner(nextSquares);
    if (result) {
      setWinner(result);
    } else if (!nextSquares.includes(null)) {
      alert("It's a draw!!");
    }
  };

  const calculateWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsX(true);
    setWinner(null);
  };

  const status = winner ? `Winner: ${winner}` : `Next Player: ${isX ? 'X' : 'O'}`;

  return (
    <div className="board-container">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
      <button className="restart" onClick={handleRestart}>
        Restart Game
      </button>
      {winner && <Modal winner={winner} onRestart={handleRestart} />}
    </div>
  );
};

export default Board;
