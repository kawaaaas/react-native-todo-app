import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useCreateTag from "../hooks/useCreateTag";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import { AntDesign } from "@expo/vector-icons";
import { Title } from "../components/Title";
import { InputField } from "../components/InputField";
import { IconButton } from "../components/IconButton";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "CreateTag">;
};

const CreateTagScreen = ({ navigation }: Props) => {
  const { createErr, name, setName, createTag } = useCreateTag({
    navigation,
  });
  return (
    <SafeAreaView style={[tw("flex-1 bg-gray-100 items-center")]}>
      <View style={[tw("flex-row px-4 justify-between w-full")]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={25} color="gray" />
        </TouchableOpacity>
        <View />
      </View>
      <Title first="New" last="Tag" />
      <InputField
        leftIcon={"tag"}
        placeholder="Tag Name"
        autoFocus
        value={name}
        onChangeText={(text: string) => setName(text)}
      />
      <IconButton name={"plus"} size={20} color={"gray"} onPress={createTag} />
      {createErr !== "" && (
        <Text style={tw("text-red-500 my-3 font-semibold")}>{createErr}</Text>
      )}
    </SafeAreaView>
  );
};

export default CreateTagScreen;
