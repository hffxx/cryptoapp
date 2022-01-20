import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserId, setcurrentUserId] = useState();
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
    return auth.signInWithEmailAndPassword(email, password).then((cred) => {
      setcurrentUserId(cred.user.uid);
    });
  };
  const logout = () => {
    return auth.signOut().then(() => {
      setcurrentUserId();
    });
  };
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUserList(snapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("users", currentUser?.uid)
  //     .onSnapshot((snapshot) => {
  //       setcurrentUserData(...snapshot.docs.map((doc) => doc.data()));
  //     });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setcurrentUserId(user?.uid);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUserId)
        .get()
        .then((doc) => {
          setcurrentUserData(doc.data());
        });
    } else {
      setcurrentUserData();
    }
  }, [currentUserId]);
  console.log(currentUserData);
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
