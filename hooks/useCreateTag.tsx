import { View, Text } from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "CreateTag">;
};

const useCreateTag = ({ navigation }: Props) => {
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [createErr, setCreateErr] = useState("");

  const createTag = async () => {
    if (name !== "") {
      setCreateErr("");
      try {
        await addDoc(collection(db, "users", user.uid, "tags"), {
          name,
          createdAt: serverTimestamp(),
        });
        setName("");
        navigation.goBack();
      } catch (err: any) {
        setName("");
        setCreateErr(err.message);
      }
    }
  };
  return {
    name,
    setName,
    createErr,
    createTag,
  };
};

export default useCreateTag;
