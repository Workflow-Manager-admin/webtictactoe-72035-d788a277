import React from 'react';

// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  /**
   * Square component renders a single cell in the tic-tac-toe board.
   * @param {string|null} value - 'X', 'O', or null.
   * @param {Function} onClick - Click event handler.
   * @param {boolean} highlight - Whether to visually highlight the square.
   */
  // Modern style, light theme highlight if part of win line.
  return (
    <button
      className={`square${highlight ? ' highlight' : ''}`}
      style={{
        width: 68,
        height: 68,
        background: highlight
          ? 'linear-gradient(135deg, var(--accent-highlight) 80%, var(--win-highlight) 100%)'
          : 'var(--bg-primary)',
        border: highlight
          ? '3.4px solid var(--primary-blue-mid)'
          : '2.4px solid var(--border-color)',
        borderRadius: 12,
        fontSize: '2.2rem',
        fontWeight: 700,
        color: value === 'X' ? 'var(--primary-blue)'
              : value === 'O' ? 'var(--primary-blue-mid)'
                : 'var(--text-primary)',
        cursor: value ? 'not-allowed' : 'pointer',
        boxShadow: highlight
          ? '0 0 15px 2px var(--accent-highlight)'
          : '0 2px 8px rgba(25, 118, 210, 0.06)',
        outline: 'none',
        transition: 'all 0.2s cubic-bezier(.34,2,.6,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClick}
      disabled={Boolean(value)}
      aria-label={`Board square: ${value || 'empty'}`}
    >
      {value}
    </button>
  );
}

export default Square;
