export const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }

  return 'light'; // Default to light if no access to window
};