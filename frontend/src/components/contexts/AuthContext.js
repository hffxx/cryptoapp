import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setcurrentUserData] = useState();
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(true);
  const signup = (email, password, nick) => {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        nick,
        email,
        password,
        id: cred.user.uid,
        createdAt: new Date(),
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
  const getUserData = (user) => {
    if (currentUser) {
      return db
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          setcurrentUserData(doc.data());
        });
    }
    return;
  };
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUserList(snapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    getUserData(currentUser);
  }, [currentUser]);
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    currentUserData,
    userList,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
