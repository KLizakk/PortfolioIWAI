import React, { useState, useEffect, useRef } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [timeLeft, setTimeLeft] = useState({ X: 60, O: 60 });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (gameStarted && !gameOver) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = { ...prev, [currentPlayer]: prev[currentPlayer] - 1 };
          if (newTime[currentPlayer] <= 0) {
            clearInterval(intervalRef.current);
            setGameOver(true);
            alert(`Player ${currentPlayer} ran out of time!`);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [currentPlayer, gameOver, gameStarted]);

  const handleClick = (index) => {
    if (gameStarted && !gameOver && !board[index]) {
      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (checkWinner(newBoard)) {
        setGameOver(true);
        clearInterval(intervalRef.current);
        alert(`Player ${currentPlayer} wins!`);
      } else if (newBoard.every((cell) => cell)) {
        setGameOver(true);
        clearInterval(intervalRef.current);
        alert('Draw!');
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const checkWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setTimeLeft({ X: 60, O: 60 });
    setGameOver(false);
    setGameStarted(false);
  };

  return (
    <div className="tic-tac-toe">
      <h2>Tic Tac Toe</h2>
      <div className="timers">
        <div>Player X: {timeLeft.X}s</div>
        <div>Player O: {timeLeft.O}s</div>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      {!gameStarted && !gameOver && (
        <button onClick={startGame}>Start Game</button>
      )}
      {gameOver && (
        <button onClick={restartGame}>
          Restart Game
        </button>
      )}
    </div>
  );
}

export default TicTacToe;
