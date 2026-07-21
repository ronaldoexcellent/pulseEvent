import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ThemeContext = createContext();

export function ThemeProvider({ children, userId }) {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Apply class to <html> tag whenever darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 2. Fetch initial theme
  useEffect(() => {
    const fetchTheme = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/${userId}/theme`);
        if (response.data && response.data.theme === 'dark') {
          setDarkMode(true);
        }
      } catch (err) {
        console.error('Failed to load theme preference:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, [userId]);

  // 3. Instant Toggle
  const toggleDarkMode = async () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode); // Updates state AND triggers the useEffect above instantly

    if (!userId) return;

    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/${userId}/theme`, {
        theme: nextMode ? 'dark' : 'light'
      });
    } catch (err) {
      console.error('Failed to save theme preference:', err);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, loading }}>
      <div className="min-h-screen bg-gray-50 dark:bg-[#121216] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}