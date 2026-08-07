/*
 * ========================================
 * MAIN - Application Entry Point
 * ========================================
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// ===== استيراد كل ملفات الـ Styles =====
import './assets/styles/reset.css';
import './assets/styles/variables.css';
import './assets/styles/typography.css';
import './assets/styles/animations.css';
import './assets/styles/scrollbar.css';
import './assets/styles/utilities.css';
import './assets/styles/light.css';
import './assets/styles/dark.css';
import './index.css';

// ===== Apply default theme from localStorage =====
const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('app-theme');
  if (storedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
};

// ===== Initialize theme =====
getInitialTheme();

// ===== Listen for system theme changes =====
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('app-theme')) {
      document.documentElement.setAttribute(
        'data-theme',
        e.matches ? 'dark' : 'light'
      );
    }
  });

// ===== Save theme to localStorage when changed =====
const observer = new MutationObserver(() => {
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme) {
    localStorage.setItem('app-theme', theme);
  }
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme'],
});

// ===== Render App =====
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);