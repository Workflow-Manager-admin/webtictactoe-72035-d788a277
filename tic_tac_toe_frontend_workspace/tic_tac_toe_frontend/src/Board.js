import React from 'react';
import Square from './Square';

const GRID = [
  [0,1,2],
  [3,4,5],
  [6,7,8]
];

// PUBLIC_INTERFACE
function Board({ squares, onClick, winningLine }) {
  /**
   * Board component renders the tic-tac-toe grid.
   * @param {Array} squares - Current state of the board.
   * @param {Function} onClick - Click handler for squares.
   * @param {Array|null} winningLine - Indices of the winning line for highlight.
   */
  return (
    <div className="board"
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(3, 1fr)',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        margin: 'auto',
        width: 228,
        background: 'var(--bg-primary)',
        borderRadius: 12,
        boxShadow: '0 1.5px 8px rgba(50,50,93,0.10)'
      }}
    >
      {GRID.flat().map(idx => (
        <Square
          key={idx}
          value={squares[idx]}
          onClick={() => onClick(idx)}
          highlight={winningLine && winningLine.includes(idx)}
        />
      ))}
    </div>
  );
}

export default Board;
