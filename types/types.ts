export type UserType = {
  uid: string;
  email: string;
};

export type RootStackParamList = {
  Auth: undefined;
  TagList: undefined;
  CreateTag: undefined;
  TaskList: undefined;
  TaskStack: undefined;
  CreateTask: undefined;
  EditTask: undefined;
};

export type TagType = {
  id: string;
  name: string;
  createdAt: string;
};

export type TaskType = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};
