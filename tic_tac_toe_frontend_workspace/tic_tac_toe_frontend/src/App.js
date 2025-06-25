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
        borderBottom: '1.8px solid #e9ecef',
        minHeight: 'unset',
        background: 'var(--bg-secondary)',
        fontWeight: 700,
        fontSize: '2rem',
        letterSpacing: '0.072em',
        paddingBottom: 0,
        marginBottom: '0.5rem'
      }}>
        <span role="img" aria-label="tic-tac-toe" style={{marginRight: 8}}>🎮</span>
        Tic-Tac-Toe
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={{position: 'absolute', top: 18, right: 24}}
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
        color: '#1976d2',
        borderTop: '1.5px solid #e9ecef',
        fontSize: '1.05rem',
        textAlign: 'center',
        padding: '1.5rem 0 1.5rem 0',
        fontWeight: 500,
        letterSpacing: 0.5,
        marginTop: '1.5rem'
      }}>
        &copy; {new Date().getFullYear()} | Modern Tic-Tac-Toe &mdash; <span style={{color:'#9c27b0'}}>React Light</span>
      </footer>
    </div>
  );
}

export default App;
