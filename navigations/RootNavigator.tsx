import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useAuthState } from "../hooks/useAuthState";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";
import TagStackNavigator from "./TagStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const RootNavigator = () => {
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return (
      <SafeAreaView style={[tw("flex-1 items-center justify-center")]}>
        <ActivityIndicator size="large" color="gray" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      {user.uid ? <TagStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
