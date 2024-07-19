"use client"
import React, { useState } from 'react';
import Board from '../Board/Board';

interface History {
  squares: (string | null)[];
}

const Game: React.FC = () => {
  const [history, setHistory] = useState<History[]>([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="game-board mb-4">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info flex flex-col items-center mt-4 pt-4">
        <div className="mb-2 text-lg font-semibold">{status}</div>
        <ol className="text-center list-none">
          {history.map((step, move) => {
            const desc = move ? 'Move #' + move : 'Start';
            return (
              <li key={move} className="mb-1">
                <button
                  className="px-2 py-1 border border-gray-400 rounded hover:bg-sky-400"
                  onClick={() => jumpTo(move)}
                >
                  {desc}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-700"
        onClick={() => {
          setHistory([{ squares: Array(9).fill(null) }]);
          setStepNumber(0);
          setXIsNext(true);
        }}
      >
        Reset
      </button>
    </div>
  );
};

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
