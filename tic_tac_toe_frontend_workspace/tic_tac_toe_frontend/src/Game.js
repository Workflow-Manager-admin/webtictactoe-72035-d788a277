import React, { useState } from 'react';
import Board from './Board';

/* All colors sourced via CSS variables for consistency with blue theme */
const PRIMARY = 'var(--primary-blue)';
const PRIMARY_HOVER = 'var(--primary-blue-dark)';
const ACCENT = 'var(--accent-blue)';
const WIN_HIGHLIGHT = 'var(--win-highlight)';

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
      boxShadow: 'var(--blue-shadow)',
      maxWidth: 360,
      margin: 'auto'
    }}>
      <h2 style={{
        color: 'var(--primary-blue)',
        marginBottom: '1rem',
        fontWeight: 700,
        letterSpacing: 1.2,
        textShadow: '0 1px 12px var(--accent-highlight)'
      }}>
        Tic-Tac-Toe
      </h2>
      <div
        className="game-status"
        style={{
          fontSize: '1.12rem',
          fontWeight: 600,
          margin: '10px 0 15px 0',
          color: winner ? 'var(--primary-blue-dark)'
                : (draw ? 'var(--primary-blue-mid)' : 'var(--primary-blue)'),
          background: winner ? 'var(--win-highlight)' : 'transparent',
          borderRadius: 6,
          padding: '3px 8px'
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
          backgroundColor: 'var(--primary-blue)',
          color: 'var(--button-text)',
          fontWeight: 600,
          fontSize: '1.07rem',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          transition: 'background 0.2s, box-shadow 0.17s, color 0.12s',
          boxShadow: '0 2px 10px rgba(25,118,210,0.06)'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--button-bg-hover)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--primary-blue)'}
        onClick={handleReset}
      >
        Reset Game
      </button>
      <footer style={{
        marginTop: '2.2rem',
        color: 'var(--primary-blue-mid)',
        fontSize: '0.97rem'
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
