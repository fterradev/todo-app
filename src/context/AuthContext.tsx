import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';

interface AuthContextType {
  ready: boolean;
  currentUser: firebase.User | null;
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setReady(true);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const signup = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);
  const login = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);
  const logout = () => auth.signOut();

  const value = { ready, currentUser, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
