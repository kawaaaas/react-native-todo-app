import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { RootStackParamList } from "../types/types";
import TaskListScreen from "../screens/TaskListScreen";
import { CreateTaskScreen } from "../screens/CreateTaskScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const TaskStackNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="TaskList">
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TaskList" component={TaskListScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: "modal",
        }}
      >
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
