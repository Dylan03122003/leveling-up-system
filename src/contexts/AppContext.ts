import { RecentTaskT, TaskT } from "@/types";
import { createContext } from "react";

export type MySystemT = {
  xp: number;
  xpEarnedToday: number;
  currentTasks: TaskT[];
  recentTasks: RecentTaskT[];
};

export type AppContextType = {
  mySytem: MySystemT;
  addTask: (task: TaskT) => void;
  addMultipleTasks: (tasks: TaskT[]) => void;
  addRecentTask: (task: RecentTaskT) => void;
  markAsDone: (taskId: number) => void;
  clearAllTasks: () => void;
  deleteTask: (taskId: number) => void;
  deleteRecentTask: (taskId: number) => void;
};

export const AppContext = createContext<AppContextType | null>(null);
