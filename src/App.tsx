/*
 * ========================================
 * APP - Main Application Entry Point
 * ========================================
 */

import { useState, useEffect } from 'react';

const App = () => {
  // ===== State for theme =====
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('app-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // ===== Apply theme to HTML element =====
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // ===== Toggle theme =====
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-background, #f8fafc)',
        color: 'var(--color-text, #0f172a)',
        padding: '2rem',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          background: 'var(--color-card, #ffffff)',
          borderRadius: 'var(--radius-lg, 12px)',
          border: '1px solid var(--color-border, #e2e8f0)',
          marginBottom: '2rem',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--font-size-xl, 20px)',
            fontWeight: 'var(--font-weight-bold, 700)',
          }}
        >
          🚀 Dashboard Starter Kit
        </h1>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span
            style={{
              fontSize: 'var(--font-size-sm, 14px)',
              color: 'var(--color-text-secondary, #475569)',
            }}
          >
            {theme === 'light' ? '☀️' : '🌙'}
          </span>
          <button
            onClick={toggleTheme}
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--color-primary, #3b82f6)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-md, 8px)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm, 14px)',
              fontWeight: 'var(--font-weight-medium, 500)',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🌓 Toggle Theme
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {[
            { title: 'Total Users', value: '1,234', emoji: '👥' },
            { title: 'Revenue', value: '$12,345', emoji: '💰' },
            { title: 'Orders', value: '567', emoji: '📦' },
            { title: 'Active', value: '89%', emoji: '📈' },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                background: 'var(--color-card, #ffffff)',
                borderRadius: 'var(--radius-lg, 12px)',
                border: '1px solid var(--color-border, #e2e8f0)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}
              >
                <p
                  style={{
                    color: 'var(--color-text-secondary, #475569)',
                    fontSize: 'var(--font-size-sm, 14px)',
                  }}
                >
                  {stat.title}
                </p>
                <span style={{ fontSize: 'var(--font-size-xl, 20px)' }}>
                  {stat.emoji}
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'var(--font-size-2xl, 24px)',
                  fontWeight: 'var(--font-weight-bold, 700)',
                  color: 'var(--color-text, #0f172a)',
                }}
              >
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Welcome Message */}
        <div
          style={{
            padding: '2rem',
            background: 'var(--color-card, #ffffff)',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid var(--color-border, #e2e8f0)',
            textAlign: 'center',
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <h2
            style={{
              fontSize: 'var(--font-size-xl, 20px)',
              marginBottom: '0.5rem',
              color: 'var(--color-text, #0f172a)',
            }}
          >
            Welcome to your Dashboard! 🎉
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary, #475569)',
              fontSize: 'var(--font-size-md, 16px)',
            }}
          >
            This is a modular React Dashboard Starter Kit.
            <br />
            Start building your amazing application.
          </p>
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--color-primary-light, #eff6ff)',
                color: 'var(--color-primary, #3b82f6)',
                borderRadius: 'var(--radius-full, 9999px)',
                fontSize: 'var(--font-size-sm, 14px)',
              }}
            >
              ⚛️ React
            </span>
            <span
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--color-success-light, #f0fdf4)',
                color: 'var(--color-success, #22c55e)',
                borderRadius: 'var(--radius-full, 9999px)',
                fontSize: 'var(--font-size-sm, 14px)',
              }}
            >
              📘 TypeScript
            </span>
            <span
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--color-warning-light, #fefce8)',
                color: 'var(--color-warning, #eab308)',
                borderRadius: 'var(--radius-full, 9999px)',
                fontSize: 'var(--font-size-sm, 14px)',
              }}
            >
              🎨 Modular
            </span>
            <span
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--color-info-light, #eff6ff)',
                color: 'var(--color-info, #3b82f6)',
                borderRadius: 'var(--radius-full, 9999px)',
                fontSize: 'var(--font-size-sm, 14px)',
              }}
            >
              ⚡ Vite
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          marginTop: '2rem',
          padding: '1rem 1.5rem',
          textAlign: 'center',
          color: 'var(--color-text-muted, #94a3b8)',
          fontSize: 'var(--font-size-sm, 14px)',
          borderTop: '1px solid var(--color-border, #e2e8f0)',
          transition: 'border-color 0.3s ease',
        }}
      >
        © {new Date().getFullYear()} Dashboard Starter Kit. Built with ❤️
        <br />
        <span style={{ fontSize: 'var(--font-size-xs, 12px)' }}>
          Current Theme: {theme}
        </span>
      </footer>
    </div>
  );
};

export default App;