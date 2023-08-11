import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { TagType } from "../types/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { format } from "date-fns";

const useGetTags = () => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<TagType[]>();
  const [getErr, setGetErr] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "users", user.uid, "tags"),
      orderBy("createdAt", "desc")
    );
    setGetErr("");
    setIsLoading(true);

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setTags(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                name: doc.data().name,
                createdAt: format(
                  doc.data({ serverTimestamps: "estimate" }).createdAt.toDate(),
                  "yyyy-MM-dd HH:mm"
                ),
              } as TagType)
          )
        );
        setIsLoading(false);
      },
      (err: any) => {
        setGetErr(err.message);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return {
    tags,
    isLoading,
    getErr,
  };
};

export default useGetTags;
