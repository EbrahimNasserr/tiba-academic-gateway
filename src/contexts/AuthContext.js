"use client";

import { createContext, useContext, useEffect, useState, useRef } from 'react';
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
  const originalFetchRef = useRef(null);

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get the ID token
          const studentToken = await firebaseUser.getIdToken(true);
          
          // Store the token in a cookie
          Cookies.set('studentToken', studentToken, { 
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          
          // Store the user object in localStorage
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            studentToken: studentToken
          };
          
          localStorage.setItem('firebaseUser', JSON.stringify(userData));
          setUser(userData);

          // Set up fetch interceptor for student API calls only
          if (!originalFetchRef.current) {
            originalFetchRef.current = window.fetch;
          }

          window.fetch = async function(url, options = {}) {
            // Convert URL to string if it's a URL object
            const urlString = typeof url === 'string' ? url : url.toString();
            
            // Only add Firebase token to student-specific endpoints
            const isStudentEndpoint = urlString.includes('/student/') || 
                                    urlString.includes('/courses/') ||
                                    urlString.includes('/lectures/') ||
                                    urlString.includes('/subjects/') ||
                                    (urlString.includes('/api/') && !urlString.includes('/auth/login'));
            
            console.log('Request URL:', urlString, 'Is Student Endpoint:', isStudentEndpoint);
            
            if (isStudentEndpoint && studentToken) {
              options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${studentToken}`
              };
            }

            return originalFetchRef.current(url, options);
          };

        } catch (error) {
          console.error("Error getting token:", error);
        }
      } else {
        // Restore original fetch when no user
        if (originalFetchRef.current) {
          window.fetch = originalFetchRef.current;
        }
        setUser(null);
        localStorage.removeItem('firebaseUser');
        Cookies.remove('studentToken');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      // Restore original fetch before signing out
      if (originalFetchRef.current) {
        window.fetch = originalFetchRef.current;
      }
      
      // Clear all auth data
      setUser(null);
      Cookies.remove('studentToken');
      localStorage.removeItem('firebaseUser');
      
      // Sign out from Firebase
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
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