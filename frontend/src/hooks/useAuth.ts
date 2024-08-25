import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    firstname: string;
    email: string;
}

interface AuthError{
    message: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get<User>('http://localhost:8000/accounts/me/', {
            headers: { Authorization: `Token ${token}` },
          });
          setUser(response.data);
        }
      } catch (err: any) {
        setError({ message: err.message || 'An error occurred' });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useAuth;
