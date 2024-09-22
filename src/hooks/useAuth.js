import { useState, useEffect } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('https://clientprofile.afrahfitness.com/api/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email, password }),
      });
  
      const result = await response.json();
  
      if (result.status === 'success') {
        setIsAuthenticated(true);
        const user = { email };
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return result; // Return success
      } else {
        return { status: 'error', message: 'Invalid credentials' }; // Return error
      }
    } catch (error) {
      return { status: 'error', message: 'An error occurred' }; // Handle fetch error
    }
  };
  
  

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return { isAuthenticated, login, logout, user };
}
