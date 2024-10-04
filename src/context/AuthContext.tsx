import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';

interface AuthContextType {
  currentUser: firebase.User | null;
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const signup = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);
  const login = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);
  const logout = () => auth.signOut();

  const value = { currentUser, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
