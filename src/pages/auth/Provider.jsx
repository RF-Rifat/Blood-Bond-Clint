import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";
import auth from "./firebase";

export const AuthProvider = createContext(null);

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartNum, setCartNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const signWithGooglePop = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const signWithGitHubPop = () => {
    return signInWithPopup(auth, gitHubProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      // if (currentUser) {
      //   axios
      //     .post("https://trendy-server.vercel.app/jwt", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log("token response", res.data);
      //     });
      // } else {
      //   axios
      //     .post("https://trendy-server.vercel.app/logout", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //     });
      // }
    });
    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  const AuthData = {
    createUser,
    loading,
    login,
    logOut,
    signWithGooglePop,
    user,
    signWithGitHubPop,
    updateUser,
    setCartNum,
    cartNum,
  };

  return (
    <AuthProvider.Provider value={AuthData}>{children}</AuthProvider.Provider>
  );
};

export default Provider;
