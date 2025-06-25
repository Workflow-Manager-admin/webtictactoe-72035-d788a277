import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './Game';

/**
 * App component: Wraps the overall page,
 * manages theme, layout, and header/footer.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="App-header" style={{
        border: 0,
        borderBottom: '2px solid var(--primary-blue-light)',
        minHeight: 'unset',
        background: 'var(--bg-secondary)',
        fontWeight: 700,
        fontSize: '2rem',
        color: 'var(--primary-blue)',
        letterSpacing: '0.072em',
        paddingBottom: 0,
        marginBottom: '0.55rem',
        boxShadow: '0 2px 12px 0 var(--accent-highlight)',
        position: 'relative'
      }}>
        <span role="img" aria-label="tic-tac-toe" style={{
          marginRight: 8,
          filter: 'drop-shadow(0 0 4px var(--primary-blue-light))'
        }}>🎮</span>
        Tic-Tac-Toe
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={{
            position: 'absolute',
            top: 18,
            right: 24,
            padding: '7px 18px',
            background: 'var(--primary-blue)',
            border: 'none',
            color: 'var(--button-text)',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '1.02rem',
            cursor: 'pointer',
            boxShadow: '0 1.5px 5px var(--accent-highlight)',
            transition: 'background 0.18s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'var(--button-bg-hover)'}
          onMouseOut={e => e.currentTarget.style.background = 'var(--primary-blue)'}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 0',
        minHeight: '72vh',
        background: 'var(--bg-primary)'
      }}>
        <Game />
      </main>
      <footer style={{
        background: 'var(--bg-secondary)',
        color: 'var(--primary-blue-dark)',
        borderTop: '2px solid var(--primary-blue-light)',
        fontSize: '1.05rem',
        textAlign: 'center',
        padding: '1.5rem 0 1.5rem 0',
        fontWeight: 500,
        letterSpacing: 0.5,
        marginTop: '1.5rem',
        boxShadow: '0 -2px 16px 0 var(--accent-highlight)'
      }}>
        &copy; {new Date().getFullYear()} | Modern Tic-Tac-Toe &mdash; <span style={{
          color:'var(--primary-blue)', fontWeight: 700
        }}>React Light</span>
      </footer>
    </div>
  );
}

export default App;
