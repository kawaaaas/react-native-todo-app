import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectTag } from "../slices/todoSlice";
import tw from "tailwind-rn";
import { Title } from "../components/Title";
import { FlatList } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, TaskType } from "../types/types";
import { useGetTasks } from "../hooks/useGetTasks";
import { useToggleDeleteTask } from "../hooks/useToggleDeleteTask";
import { TaskItem } from "../components/TaskItem";

type Item = {
  item: TaskType;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "TaskList">;
};

const TaskListScreen: FC<Props> = ({ navigation }) => {
  const { tag, deleteTask, toggleCompleted } = useToggleDeleteTask();
  const { tasks, getErr } = useGetTasks();
  const tasksKeyExtractor = (item: TaskType) => item.id;
  const tasksRenderItem = ({ item }: Item) => (
    <TaskItem
      id={item.id}
      title={item.title}
      createdAt={item.createdAt}
      completed={item.completed}
      toggleCompleted={toggleCompleted}
      deleteTask={deleteTask}
    />
  );

  return (
    <SafeAreaView style={tw("flex-1")}>
      <Title first="Tasks" last={tag.name} />
      <View style={tw("items-center")}>
        <TouchableOpacity onPress={() => navigation.navigate("CreateTask")}>
          <MaterialIcons name="playlist-add" size={40} color="#5f9ea0" />
        </TouchableOpacity>
        <Text style={tw("text-gray-700 mt-2 mb-5")}>Add task</Text>
        {getErr !== "" && (
          <Text style={tw("text-red-500 my-5 font-semibold")}>{getErr}</Text>
        )}
      </View>
      <View style={[tw("flex-1 m-2")]}>
        <FlatList
          data={tasks}
          keyExtractor={tasksKeyExtractor}
          keyboardShouldPersistTaps="always"
          renderItem={tasksRenderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;
