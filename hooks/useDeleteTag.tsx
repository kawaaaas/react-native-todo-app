import { View, Text } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

const useDeleteTag = () => {
  const user = useSelector(selectUser);
  const [deleteErr, setDeleteErr] = useState("");

  const deleteTag = async (idx: string) => {
    setDeleteErr("");
    try {
      await deleteDoc(doc(db, "users", user.uid, "tags", idx));
    } catch (err: any) {
      setDeleteErr(err.message);
    }
  };
  return {
    deleteTag,
    deleteErr,
  };
};

export default useDeleteTag;
