export const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    console.log("device theme", prefersDarkScheme.matches)
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }

  return 'light'; // Default to light if no access to window
};