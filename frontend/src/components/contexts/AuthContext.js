import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const signup = (email, password, nick) => {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        nick,
        id: cred.user.uid,
        balance: 1000000,
        coins: [],
        history: [],
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
  const getBalance = (user) => {
    if (currentUser) {
      return db
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          setBalance(doc.data().balance);
        });
    }
  };
  useEffect(() => {
    getBalance(currentUser);
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
    balance,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
