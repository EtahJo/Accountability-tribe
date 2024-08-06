"use client"

interface ThemeToggleProps{
  isDark:boolean;
  toggleTheme:()=>void
}
const ThemeToggle = ({toggleTheme,isDark}:ThemeToggleProps) => {
  return (
    <button onClick={toggleTheme} className="p-2 border rounded">
      Switch to {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggle;