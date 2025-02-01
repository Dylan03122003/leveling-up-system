import { TaskT } from "@/types";
import { createContext } from "react";

export type MySystemT = {
  xp: number;
  xpEarnedToday: number;
  currentTasks: TaskT[];
};

export type AppContextType = {
  mySytem: MySystemT;
  addTask: (task: TaskT) => void;
  markAsDone: (taskId: number) => void;
  clearAllTasks: () => void;
  deleteTask: (taskId: number) => void;
};

export const AppContext = createContext<AppContextType | null>(null);
