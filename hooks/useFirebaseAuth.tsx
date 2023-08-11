import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase.config";

export const useFirebaseAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [authErr, setAuthErr] = useState("");

  const login = async () => {
    try {
      setAuthErr("");
      if (email !== "" && password !== "") {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setAuthErr(err.message);
      setEmail("");
      setPasssword("");
    }
  };

  const register = async () => {
    try {
      setAuthErr("");
      if (email !== "" && password !== "") {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setAuthErr(err.message);
      setEmail("");
      setPasssword("");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setAuthErr("");
  };

  return {
    isLogin,
    email,
    password,
    authErr,
    login,
    register,
    setEmail,
    setPasssword,
    toggleMode,
  };
};
