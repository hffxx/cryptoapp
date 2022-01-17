import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        balance: 1000000,
      });
    });
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    return auth.signOut();
  };
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log();
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
