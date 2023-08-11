import {
  View,
  Text,
  Alert,
  Touchable,
  TouchableOpacityComponent,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../slices/userSlice";
import { auth } from "../firebase.config";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "../components/IconButton";
import { Title } from "../components/Title";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, TagType } from "../types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGetTags from "../hooks/useGetTags";
import { TagCard } from "../components/TagCard";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "TagList">;
};

type Item = {
  item: Omit<TagType, "createdAt">;
};

const TagListScreen = ({ navigation }: Props) => {
  const { tags, getErr, isLoading } = useGetTags();
  const tagsKeyExtractor = (item: Omit<TagType, "createdAt">) => item.id;
  const tagsRenderItem = ({ item }: Item) => (
    <TagCard id={item.id} name={item.name} />
  );
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
    } catch {
      Alert.alert("logout error");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[tw("flex-1 items-center justify-center")]}>
        <ActivityIndicator size="large" color="gray" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw("flex-1 bg-gray-100 items-center")}>
      <Title first="Tag" last="List" />
      <TouchableOpacity
        style={tw("mt-2")}
        onPress={() => navigation.navigate("CreateTag")}
      >
        <MaterialCommunityIcons name="tag-plus" size={40} color="#5f9ea0" />
      </TouchableOpacity>
      <Text style={tw("text-gray-700 mt-2 mb-5")}>Add tag</Text>
      <View style={[tw("flex-1 m-2")]}>
        <FlatList
          data={tags}
          keyExtractor={tagsKeyExtractor}
          keyboardShouldPersistTaps="always"
          renderItem={tagsRenderItem}
        />
      </View>
      <TouchableOpacity onPress={signOut}>
        <Text style={tw("text-gray-700 mt-2 mb-5")}>signout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TagListScreen;
