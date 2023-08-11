import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../slices/userSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

export const useAuthState = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      setIsLoading(true);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email!,
          })
        );
      } else {
        dispatch(logout());
      }
      setIsLoading(false);
      return () => {
        unsub();
      };
    });
  }, []);

  return {
    isLoading,
    user,
  };
};
