import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType, TagType } from "../types/types";
import { RootState } from "../store";

type State = {
  editedTask: Omit<TaskType, "completed" | "createdAt">;
  selectedTag: Omit<TagType, "createdAt">;
};

const initialState: State = {
  editedTask: { id: "", title: "" },
  selectedTag: { id: "", name: "" },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setEditedTask: (
      state,
      action: PayloadAction<Omit<TaskType, "completed" | "createdAt">>
    ) => {
      state.editedTask = action.payload;
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask;
    },
    setSelectedTag: (
      state,
      action: PayloadAction<Omit<TagType, "createdAt">>
    ) => {
      state.selectedTag = action.payload;
    },
    resetSelectedTag: (state) => {
      state.selectedTag = initialState.selectedTag;
    },
  },
});
export const {
  setEditedTask,
  resetEditedTask,
  setSelectedTag,
  resetSelectedTag,
} = todoSlice.actions;

export const selectEditedTask = (state: RootState) => state.todo.editedTask;
export const selectTag = (state: RootState) => state.todo.selectedTag;

export default todoSlice.reducer;
