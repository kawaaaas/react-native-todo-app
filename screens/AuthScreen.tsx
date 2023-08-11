import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { FontAwesome } from "@expo/vector-icons";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";

const AuthScreen = () => {
  const {
    isLogin,
    email,
    password,
    authErr,
    login,
    register,
    setEmail,
    setPasssword,
    toggleMode,
  } = useFirebaseAuth();

  return (
    <SafeAreaView
      style={[tw("flex-1 pt-16 items-center"), { backgroundColor: "#008b8b" }]}
    >
      <FontAwesome name="tasks" size={50} color="white" />
      <Text style={[tw("text-2xl text-white font-semibold mt-2 mb-5")]}>
        {isLogin ? "Login" : "SignUp"}
      </Text>
      <InputField
        leftIcon="email"
        placeholder="Enter Email"
        autoFocus
        value={email}
        onChangeText={(text: string) => setEmail(text)}
      />
      <InputField
        leftIcon="lock"
        placeholder="Enter Password"
        secureTextEntry
        textContentType="password"
        value={password}
        onChangeText={(text: string) => setPasssword(text)}
      />
      {authErr !== "" ? (
        <Text style={[tw("text-yellow-300 font-semibold my-3")]}>
          {authErr}
        </Text>
      ) : undefined}
      <Button
        onPress={isLogin ? login : register}
        title={isLogin ? "login" : "register"}
      />
      <Text style={[tw("text-white font-base mb-3")]}>
        {isLogin ? "Create a new account?" : "Login?"}
      </Text>
      <IconButton name="retweet" size={24} color="#fff" onPress={toggleMode} />
    </SafeAreaView>
  );
};

export default AuthScreen;
