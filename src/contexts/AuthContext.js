"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('firebaseUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the ID token
          const token = await user.getIdToken(true);
          
          // Store the token in a cookie
          Cookies.set('token', token, { 
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          
          // Store the user object in localStorage
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            token: token
          };
          
          localStorage.setItem('firebaseUser', JSON.stringify(userData));
          setUser(userData);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Add an interceptor to add the token to all requests
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('firebaseUser');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          const token = userData.token;
          
          // Add the token to all fetch requests
          const originalFetch = window.fetch;
          window.fetch = function (...args) {
            const [resource, config] = args;
            const newConfig = {
              ...config,
              headers: {
                ...config?.headers,
                Authorization: `Bearer ${token}`,
              },
            };
            return originalFetch(resource, newConfig);
          };
        } catch (error) {
          console.error("Error setting up fetch interceptor:", error);
        }
      }
    }
  }, [user]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Clear all auth data
      Cookies.remove('token');
      localStorage.removeItem('firebaseUser');
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 