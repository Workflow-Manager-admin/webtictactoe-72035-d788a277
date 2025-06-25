import React, { useState } from 'react';
import Board from './Board';

// Color constants from the provided palette, fallback to CSS variables if desired
const PRIMARY = '#1976d2';
const SECONDARY = '#9c27b0';
const ACCENT = '#fbc02d';

// Util: check winner
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /**
   * Determines the winner of the game. Returns 'X', 'O', or null.
   * @param {Array} squares - The current state of the board.
   */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Helper: checks for draw
function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

// PUBLIC_INTERFACE
function Game() {
  /**
   * Renders the main Tic-Tac-Toe game, manages state for board, turn, and game status.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const draw = isDraw(squares);
  const currentPlayer = xIsNext ? 'X' : 'O';

  // PUBLIC_INTERFACE
  const handleClick = idx => {
    /**
     * Handles square click event.
     * @param {number} idx - Index of square clicked.
     */
    if (winner || squares[idx]) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    /**
     * Resets the game board to initial state.
     */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Status text
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${currentPlayer}`;
  }

  return (
    <div className="game-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'var(--bg-secondary)',
      padding: '2rem',
      borderRadius: '1.5rem',
      boxShadow: '0 6px 36px rgba(50,50,93,0.07), 0 1.5px 6px rgba(0,0,0,0.05)',
      maxWidth: 360,
      margin: 'auto'
    }}>
      <h2 style={{
        color: PRIMARY, marginBottom: '1rem', fontWeight: 700, letterSpacing: 1.2
      }}>
        Tic-Tac-Toe
      </h2>
      <div className="game-status"
        style={{
          fontSize: '1.12rem',
          fontWeight: 600,
          margin: '10px 0 15px 0',
          color: winner ? ACCENT : (draw ? SECONDARY : PRIMARY)
        }}>
        {status}
      </div>
      <Board
        squares={squares}
        winningLine={winner ? getWinningLine(squares) : null}
        onClick={handleClick}
        xIsNext={xIsNext}
      />
      <button
        type="button"
        className="reset-btn"
        style={{
          marginTop: 24,
          padding: '10px 28px',
          backgroundColor: SECONDARY,
          color: '#fff',
          fontWeight: 500,
          fontSize: '1rem',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          transition: 'background 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
        onClick={handleReset}
      >
        Reset Game
      </button>
      <footer style={{
        marginTop: '2.2rem',
        color: '#888',
        fontSize: '0.96rem'
      }}>
        <span role="img" aria-label="sparkle">✨</span> Modern Two-Player Game
      </footer>
    </div>
  );
}

// Helper to highlight winning line
function getWinningLine(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return line;
  }
  return null;
}

export default Game;
