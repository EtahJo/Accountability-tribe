"use client"
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if a theme preference is saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} className="p-2 border rounded">
      Switch to {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggle;