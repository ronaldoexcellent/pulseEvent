import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Crucial to prevent flickering on refresh

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Call a backend endpoint (e.g., GET /api/me) that verifies the HttpOnly cookie
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/me`, {
            withCredentials: true
        });
        setUser(response.data.user); // Store user details (id, username) in memory
      } catch (error) {
        setUser(null); // Cookie is invalid or missing
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);